import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import GetProfileDto from './modules/profile/get/dto.js';
import UserDetailsDto from './modules/user/details/dto.js';
import ReqHandler from './reqHandler.js';
import * as errors from '../errors/index.js';
import handleErr from '../errors/utils.js';
import State from '../state.js';
import getConfig from '../tools/configLoader.js';
import Log from '../tools/logger/index.js';
import errLogger from '../tools/logger/logger.js';
import { validateToken } from '../tools/token.js';
import type { IProfileEntity } from './modules/profile/entity.d.js';
import type { IUserEntity } from './modules/user/entity.d.js';
import type * as types from '../types/index.d.js';
import type { Express } from 'express';

export default class Middleware {
  static userValidation(app: Express): void {
    app.use(async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
      if (Middleware.shouldSkipUserValidation(req)) {
        return next();
      }

      try {
        const token =
          ((req.cookies as Record<string, string>)['monsters.uid'] as string) ??
          (req.headers.authorization !== undefined
            ? (req.headers.authorization.split('Bearer')?.[1] ?? '').trim()
            : undefined);
        const userToken = await validateToken(token);
        res.locals.userId = userToken.accountId;
      } catch (err) {
        // Access token is invalid. Check if session is valid
        const sessionId = (req.cookies as Record<string, string>)._session as string;
        const userSession = await State.provider.Session.find(sessionId);

        if (!userSession) {
          Log.error('Token validation error', 'No token nor session');
          return handleErr(new errors.UnauthorizedError(), res);
        }

        res.locals.userId = userSession.accountId;
      }

      return next();
    });
  }

  static setNoCache(_req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.set('cache-control', 'no-store');
    next();
  }

  static async initUserProfile(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    if (Middleware.shouldSkipUserValidation(req)) {
      return next();
    }

    try {
      const userId = res.locals.userId as string;
      // Validate if profile is initialized
      let user = await State.redis.getCachedUser(userId);

      if (!user) {
        user = await Middleware.fetchUserProfile(res, userId);
      }

      res.locals.profile = user.profile;
      res.locals.user = user.account;

      return next();
    } catch (err) {
      return handleErr(err as types.IFullError, res);
    }
  }

  static async userProfileValidation(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<void> {
    if (Middleware.shouldSkipUserValidation(req)) {
      return next();
    }

    try {
      let { profile } = res.locals as types.IUsersTokens;
      if (!profile) {
        const user = await Middleware.fetchUserProfile(res, (res.locals as types.IUsersTokens).userId as string);
        // eslint-disable-next-line prefer-destructuring
        profile = user.profile;
      }

      if (!profile?.initialized) {
        throw new errors.ProfileNotInitialized();
      }

      return next();
    } catch (err) {
      return handleErr(new errors.ProfileNotInitialized(), res);
    }
  }

  private static shouldSkipUserValidation(req: express.Request): boolean {
    // Disable token validation for oidc routes
    const oidcRoutes = ['.well-known', 'me', 'auth', 'token', 'session', 'certs'];
    const splitRoute = req.path.split('/');
    return splitRoute.length > 1 && oidcRoutes.includes(splitRoute[1] as string);
  }

  private static async fetchUserProfile(res: express.Response, userId: string): Promise<types.ICachedUser> {
    const reqHandler = new ReqHandler();
    const user: types.ICachedUser = { account: undefined, profile: undefined };

    user.account = (
      await reqHandler.user.getDetails([new UserDetailsDto({ id: userId })], {
        userId,
        tempId: (res.locals.tempId ?? '') as string,
      })
    ).payload[0];
    user.profile = (
      await reqHandler.profile.get(new GetProfileDto(userId), {
        userId,
        tempId: (res.locals.tempId ?? '') as string,
      })
    ).payload;

    if (!user.profile || !user.account) {
      Log.error(
        'Token validation',
        'User tried to log in using token, that got validated, but there is no user related to token. Is token fake ?',
      );
      throw new errors.IncorrectTokenError();
    }
    await State.redis.addCachedUser(user as { account: IUserEntity; profile: IProfileEntity });
    return user;
  }

  generateMiddleware(app: Express): void {
    app.use(express.json({ limit: '500kb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(
      cors({
        origin: getConfig().corsOrigin,
        credentials: true,
      }),
    );
    const helmetDirectives = helmet.contentSecurityPolicy.getDefaultDirectives();
    const allowedUrls = [
      Array.isArray(getConfig().corsOrigin) ? [...getConfig().corsOrigin] : getConfig().corsOrigin,
    ].flat();
    app.use(
      helmet({
        contentSecurityPolicy: {
          useDefaults: false,
          directives: {
            ...helmetDirectives,
            'form-action': ["'self'", ...allowedUrls],
            'script-src': ["'self'", "'unsafe-inline'"],
            'default-src': ["'self'", 'data:'],
            'frame-ancestors': ["'self'", ...allowedUrls],
            'frame-src': ["'self'", ...allowedUrls],
            'connect-src': ["'self'", ...allowedUrls],
          },
        },
      }),
    );

    app.use((_req: express.Request, res, next: express.NextFunction) => {
      res.header('Content-Type', 'application/json;charset=UTF-8');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    app.use(
      session({
        secret: getConfig().session.secret,
        resave: false,
        rolling: false,
        saveUninitialized: false,
        cookie: {
          secure: getConfig().session.secured,
          maxAge: 60 * 60 * 1000,
        },
        name: 'monsters.sid',
      }),
    );
    app.set('views', 'public');
    app.use('/public', express.static('public/static'));
    app.get('/favicon.ico', (_req, res) => {
      res.status(404).send();
    });
    app.set('view engine', 'ejs');

    app.use((req, _res, next) => {
      try {
        const logBody: Record<string, string | Record<string, string>> = {
          method: req.method,
          path: req.path,
          ip: req.ip as string,
        };
        if (req.query) logBody.query = JSON.stringify(req.query);
        if (
          req.body !== undefined &&
          typeof req.body === 'object' &&
          Object.keys(req.body as Record<string, string>).length > 0
        ) {
          if (req.path.includes('interaction') || req.path.includes('register')) {
            logBody.body = { ...(req.body as Record<string, string>) };

            if (logBody.body.password) {
              logBody.body.password = '***';
            }
          } else {
            logBody.body = req.body as Record<string, string>;
          }
        }

        Log.log('New req', logBody);
        next();
      } catch (err) {
        Log.error('Middleware validation', err);
      }
    });
  }

  generateOidcMiddleware(app: Express): void {
    app.use(State.provider.callback());
  }

  generateErrHandler(app: Express): void {
    app.use(
      (
        err: express.Errback | types.IFullError,
        req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
      ) => {
        errLogger
          .error('Caught new generic error')
          .error(`Caused by ${req.ip ?? 'unknown ip'}`)
          .error(JSON.stringify(err));
        const error = err as types.IFullError;

        if (error.message.includes('is not valid JSON')) {
          Log.error('Middleware', 'Received req is not of json type', error.message, error.stack);
          const { message, name, status } = new errors.IncorrectDataType();
          return res.status(status).json({ message, name });
        }
        if (error.name === 'SyntaxError') {
          Log.error('Middleware', 'Generic err', error.message, error.stack);
          const { message, code, name, status } = new errors.InternalError();
          return res.status(status).json({ message, code, name });
        }
        if (error.code !== undefined) {
          const { message, code, name, status } = error;
          return res.status(status).json({ message, code, name });
        }
        Log.error('Middleware', 'Generic err', error.message, error.stack);
        const { message, code, name, status } = new errors.InternalError();
        return res.status(status).json({ message, code, name });
      },
    );
  }

  initializeHandler(app: express.Express): void {
    app.use((_req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.locals.reqHandler = new ReqHandler();
      next();
    });
  }
}
