import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import fakeData from '../../fakeData.json';
import Utils from '../../utils/utils';
import * as enums from '../../../src/enums';
import { ISocketInMessage, ISocketOutMessage } from '../../../src/connections/websocket/types';
import State from '../../../src/state';
import * as errors from '../../../src/errors';
import SocketServer from '../../utils/mocks/websocket';
import MocSocket, { IClient } from 'moc-socket';
import { FakeBroker } from '../../utils/mocks';
import { IFullError } from '../../../src/types';
import { IUserEntity } from '../../../src/structure/modules/user/entity';
import { fakeAccessToken } from '../../utils';

describe('Socket - generic tests', () => {
  const fakeBroker = State.broker as FakeBroker;
  const utils = new Utils();
  let server: MocSocket;
  let client: IClient;
  const fakeUser = fakeData.users[0] as IUserEntity;
  const fakeUser2 = fakeData.users[1] as IUserEntity;
  let clientOptions: Record<string, unknown>;
  let client2Options: Record<string, unknown>;
  const message: ISocketInMessage = {
    payload: { message: 'asd', target: fakeUser2._id },
    subTarget: enums.EMessageSubTargets.Send,
    target: enums.ESocketTargets.Chat,
  };

  beforeAll(async () => {
    const loginToken1 = fakeAccessToken(fakeUser._id, 1);
    const loginToken2 = fakeAccessToken(fakeUser2._id, 2);

    await State.redis.addOidc(loginToken1.key, loginToken1.key, loginToken1.body);
    await State.redis.addOidc(loginToken2.key, loginToken2.key, loginToken2.body);

    clientOptions = {
      headers: { Authorization: `Bearer ${loginToken1.key}` },
    };
    client2Options = {
      headers: { Authorization: `Bearer ${loginToken2.key}` },
    };
 
    // Well. ESM borked plenty of stuff for reasons unknown to me...
    server = new (MocSocket as unknown as { default: typeof MocSocket }).default((State.socket as SocketServer).server);
    client = server.createClient();
    await client.connect(clientOptions);
  });

  afterAll(() => {
    client?.disconnect();
    State.keys = { keys: [] };
  });

  describe('Should throw', () => {
    describe('Not logged in', () => {
      it(`User not logged in`, async () => {
        const client2 = server.createClient();
        await client2.connect();

        // Validate user method is not able to react this fast
        await utils.sleep(100);
        const message = (client2.getLastMessages() as ISocketOutMessage[])[0] as ISocketOutMessage;

        const { name } = message.payload as IFullError;
        const targetErr = new errors.UnauthorizedError();

        expect(name).toEqual(targetErr.name);
        client2.disconnect();
      });
    });

    describe('No data passed', () => {
      it(`Target not provided`, async () => {
        const clone = structuredClone(message);
        clone.target = undefined!;

        const m = (await client.sendAsyncMessage(clone)) as ISocketOutMessage;
        const { name } = m.payload as IFullError;
        const targetErr = new errors.IncorrectTargetError();

        expect(name).toEqual(targetErr.name);
      });

      it(`SubTarget not provided`, async () => {
        const clone = structuredClone(message);
        clone.subTarget = undefined!;

        const m = (await client.sendAsyncMessage(clone)) as ISocketOutMessage;
        const { name } = m.payload as IFullError;
        const targetErr = new errors.IncorrectTargetError();

        expect(name).toEqual(targetErr.name);
      });

      it(`Payload not provided`, async () => {
        const clone = structuredClone(message);
        delete clone.payload;

        const m = (await client.sendAsyncMessage(clone)) as ISocketOutMessage;
        const { name } = m.payload as IFullError;
        const targetErr = new errors.MissingArgError('payload');

        expect(name).toEqual(targetErr.name);
      });

      it(`Payload - target not provided`, async () => {
        const clone = structuredClone(message);
        delete clone.payload.target;

        const m = (await client.sendAsyncMessage(clone)) as ISocketOutMessage;
        const { name } = m.payload as IFullError;
        const targetErr = new errors.MissingArgError('target');

        expect(name).toEqual(targetErr.name);
      });

      it(`Payload - message not provided`, async () => {
        const clone = structuredClone(message);
        delete clone.payload.message;

        const m = (await client.sendAsyncMessage(clone)) as ISocketOutMessage;
        const { name } = m.payload as IFullError;
        const targetErr = new errors.MissingArgError('message');

        expect(name).toEqual(targetErr.name);
      });

      it(`Target user does not exist`, async () => {
        const targetErr = new errors.IncorrectArgTypeError('receiver') as unknown as Record<string, unknown>;

        const clone = structuredClone(message);
        clone.payload.target = 'a';

        fakeBroker.actions.push({
          shouldFail: true,
          returns: { payload: targetErr, target: enums.EMessageTypes.Send },
        });

        const m = (await client.sendAsyncMessage(clone)) as ISocketOutMessage;
        const { name } = m.payload as IFullError;

        expect(name).toEqual(targetErr.name);
      });
    });

    describe('Incorrect data', () => {
      it(`Message too long`, async () => {
        const targetErr = new errors.IncorrectArgLengthError('body', 2, 1000) as unknown as Record<string, unknown>;

        const clone = structuredClone(message);
        for (let x = 0; x < 1000; x++) {
          clone.payload.message += 'A';
        }

        fakeBroker.actions.push({
          shouldFail: true,
          returns: { payload: targetErr, target: enums.EMessageTypes.Send },
        });

        const m = (await client.sendAsyncMessage(clone)) as ISocketOutMessage;
        const { name } = m.payload as IFullError;

        expect(name).toEqual(targetErr.name);
      });

      it(`Target id is not mongoose id`, async () => {
        const targetErr = new errors.IncorrectArgTypeError('') as unknown as Record<string, unknown>;

        const clone = structuredClone(message);
        clone.payload.target = 'a';

        fakeBroker.actions.push({
          shouldFail: true,
          returns: { payload: targetErr, target: enums.EMessageTypes.Send },
        });

        const m = (await client.sendAsyncMessage(clone)) as ISocketOutMessage;
        const { name } = m.payload as IFullError;

        expect(name).toEqual(targetErr.name);
      });
    });
  });

  describe('Should pass', () => {
    it(`Message sent`, async () => {
      const client2 = server.createClient();
      await client2.connect(client2Options);

      fakeBroker.actions.push({
        shouldFail: false,
        returns: {
          payload: {},
          target: enums.EMessageTypes.Send,
        },
      });

      await client.sendAsyncMessage(message);
      await utils.sleep(100);

      const m = (client2.getLastMessages(1) as ISocketOutMessage[])[0] as ISocketOutMessage;

      const { payload, type } = m;

      expect(type).toEqual(enums.ESocketType.ChatMessage.toString());
      expect(payload).toEqual(message.payload.message);

      client2.disconnect();
    });
  });
});
