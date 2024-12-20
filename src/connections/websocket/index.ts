import Log from 'simpleLogger';
import { WebSocketServer } from 'ws';
import Router from './router.js';
import * as enums from '../../enums/index.js';
import * as errors from '../../errors/index.js';
import getConfig from '../../tools/configLoader.js';
import State from '../../tools/state.js';
import type * as types from './types/index.js';
import type { ESocketType } from '../../enums/index.js';
import type { IFullError } from '../../types/index.js';

export default class WebsocketServer {
  private readonly _router: Router;
  protected _server: WebSocketServer | null = null;

  constructor() {
    this._router = new Router();
  }

  get server(): WebSocketServer {
    return this._server!;
  }

  protected set server(value: WebSocketServer) {
    this._server = value;
  }

  private accessor users: types.ISocketUser[] = [];
  private accessor heartbeat: NodeJS.Timer | undefined;

  get router(): Router {
    return this._router;
  }

  init(): void {
    this.server = new WebSocketServer({
      port: getConfig().socketPort,
    });
    Log.log('Socket', `Started socket on port ${getConfig().socketPort}`);
    this.startListeners();
    this.startHeartbeat();
  }

  close(): void {
    if (this.server) {
      this.server.close();
    }
    this.users.forEach((u) => {
      u.clients.forEach((c) => {
        c.close(1000, JSON.stringify(new errors.InternalError()));
        this.userDisconnected(c);
      });
    });
  }

  startListeners(): void {
    this.server.on('connection', (ws: types.ISocket, req) => {
      this.errorWrapper(() => this.onUserConnected(ws, req.headers.cookie), ws);
    });
    this.server.on('error', (err) => this.handleServerError(err));
    this.server.on('close', () => Log.log('Websocket', 'Server closed'));
  }

  sendToUser(userId: string, payload: unknown, type: ESocketType = enums.ESocketType.ChatMessage): void {
    const formatted: types.ISocketOutMessage = { type, payload };
    const target = this.users.find((e) => {
      return e.userId === userId;
    });

    if (target) target.clients.forEach((c) => c.send(JSON.stringify(formatted)));
  }

  isOnline(user: string): boolean {
    const exist = this.users.find((u) => {
      return u.userId === user;
    });
    return exist !== undefined;
  }

  updateState(userId: string): void {
    const user = this.users.find((u) => u.userId === userId);
    if (user) {
      State.redis
        .getCachedUser(userId)
        .then((cache) => {
          user.clients.forEach((c) => {
            if (cache) c.profile = cache.profile;
          });
        })
        .catch((err) => {
          Log.error('User cache', err);
          throw new Error('Cannot find user cache');
        });
    }
  }

  protected userDisconnected(ws: types.ISocket): void {
    if (!ws.userId) return;
    this.users = this.users.filter((u) => {
      return u.userId !== ws.userId;
    });
  }

  private onUserConnected(ws: types.ISocket, cookies: string | undefined): void {
    this.preValidateUser(ws, { cookies })
      .then(() => {
        ws.on('message', (message: string) => this.errorWrapper(() => this.handleUserMessage(message, ws), ws));
        ws.on('ping', () => this.errorWrapper(() => this.ping(ws), ws));
        ws.on('pong', () => this.errorWrapper(() => this.pong(ws), ws));
        ws.on('error', (error) => this.router.handleError(error as IFullError, ws));
        ws.on('close', () => this.userDisconnected(ws));
      })
      .catch((err) => {
        Log.error("Couldn't validate user token in websocket", err);
        ws.close(
          1000,
          JSON.stringify({
            type: enums.ESocketType.Error,
            payload: new errors.UnauthorizedError(),
          }),
        );
      });
  }

  protected errorWrapper(callback: () => void, ws: types.ISocket): void {
    try {
      callback();
    } catch (err) {
      this.router.handleError(err as IFullError, ws);
    }
  }

  private startHeartbeat(): void {
    this.heartbeat = setInterval(() => {
      this.users.forEach((u) =>
        u.clients.forEach((c) => {
          if (u.retry >= 10) {
            Log.warn('Websocket', `Client ${u.userId} not responding. Disconnecting`);
            this.userDisconnected(c);
          } else {
            u.retry++;
            c.ping();
          }
        }),
      );
    }, 5000);
  }

  private async preValidateUser(
    ws: types.ISocket,
    auth: {
      cookies: string | undefined;
    },
  ): Promise<void> {
    const unauthorizedErrorMessage = JSON.stringify({
      type: enums.ESocketType.Error,
      payload: new errors.UnauthorizedError(),
    });

    if (!auth.cookies) {
      ws.close(1000, unauthorizedErrorMessage);
      return;
    }

    const preparedCookie = auth.cookies
      .split(';')
      .map((e) => e.split('='))
      .find((e) => e[0]!.trim() === 'monsters.uid');

    if (!preparedCookie || preparedCookie.length === 0) {
      ws.close(1000, unauthorizedErrorMessage);
      return;
    }
    const access = preparedCookie[1];

    if (!access) {
      Log.error('Websocket', 'Client connected without providing login token');
      ws.close(1000, unauthorizedErrorMessage);
      return;
    }

    await this.validateUser(ws, access);
  }

  private async validateUser(_ws: types.ISocket, _access: string): Promise<void> {
    // const payload = await validateToken(access);
    // this.initializeUser(ws);
    // if (ws.ttl) clearTimeout(ws.ttl);
    //
    // if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'testDev') {
    //  const cachedToken = await State.redis.getOidcHash(`oidc:AccessToken:${payload.jti}`, payload.jti);
    //
    //  if (!cachedToken) {
    //    Log.error(
    //      'User tried to log in using token, which does not exists in redis. Might just expired between validation and redis',
    //    );
    //    throw new errors.IncorrectTokenError();
    //  }
    //  const t = JSON.parse(cachedToken) as AdapterPayload;
    //  if (Date.now() - new Date((t.exp as number) * 1000).getTime() > 0) {
    //    Log.error('User tried to log in using expired token, which for some reason is in redis', {
    //      token: payload.jti,
    //    });
    //    throw new errors.IncorrectTokenError();
    //  }
    // }
    //
    // ws.userId = payload.accountId;
    // const user = await State.redis.getCachedUser(payload.accountId);
    // if (user) {
    //  ws.profile = user.profile;
    // } else {
    //  const account = (
    //    await ws.reqController.user.getDetails([new UserDetailsDto({ id: payload.accountId })], {
    //      userId: payload.accountId,
    //      tempId: '',
    //    })
    //  ).payload[0] as IUserEntity;
    //  const profile = (
    //    await ws.reqController.profile.get(new GetProfileDto(payload.accountId), {
    //      userId: payload.accountId,
    //      tempId: '',
    //    })
    //  ).payload;
    //
    //  if (!profile || !account) {
    //    Log.error(
    //      'Token validation',
    //      'User tried to log in using token, that got validated, but there is no user or profile related to token. Is token fake ?',
    //    );
    //    ws.close(
    //      1000,
    //      JSON.stringify({
    //        type: enums.ESocketType.Error,
    //        payload: new errors.UnauthorizedError(),
    //      }),
    //    );
    //    return;
    //  }
    //
    //  await State.redis.addCachedUser({ account, profile });
    //  ws.profile = profile;
    // }
    //
    // const isAlreadyOnline = this.users.findIndex((u) => {
    //  return u.userId === payload.accountId;
    // });
    //
    // // #TODO This is broken and incorrectly sends messages back to user, who is logged in on 2 devices
    // if (isAlreadyOnline > -1) {
    //  this._users[isAlreadyOnline] = {
    //    ...this.users[isAlreadyOnline],
    //    userId: this.users[isAlreadyOnline]!.userId,
    //    clients: [...this.users[isAlreadyOnline]!.clients, ws],
    //    retry: this.users[isAlreadyOnline]!.retry,
    //  };
    //  return;
    // }
    //
    // this._users.push({ clients: [ws], userId: payload.accountId, retry: 0 });
  }

  // private initializeUser(ws: types.ISocket): void {
  //  ws.reqController = new ReqController();
  // }

  private handleUserMessage(mess: string, ws: types.ISocket): void {
    let message: Partial<types.ISocketInMessage> = { payload: undefined, subTarget: undefined!, target: undefined! };

    if (mess.toString() === 'ping') return this.pong(ws);

    try {
      message = JSON.parse(mess) as types.ISocketInMessage;
    } catch (_err) {
      return this.router.handleError(new errors.IncorrectBodyTypeError(), ws);
    }

    Log.log('Socket', 'Got new message', message);

    switch (message.target) {
      case enums.ESocketTargets.Chat:
        return this.router.handleChatMessage(message as types.ISocketInMessage, ws);
      default:
        return this.router.handleError(new errors.IncorrectTargetError(), ws);
    }
  }

  private ping(ws: types.ISocket): void {
    ws.pong();
  }

  private pong(ws: types.ISocket): void {
    const index = this.users.findIndex((u) => u.userId === ws.userId);
    if (index < 0) {
      Log.error('Websocket', 'Received ping from connection, which is not registered in users object');
    } else {
      this.users[index]!.retry = 0;
    }
  }

  private handleServerError(err: Error): void {
    const error = err as IFullError;
    Log.error('Socket', error.message, error.stack);
    this.close();
  }
}
