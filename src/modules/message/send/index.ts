import SendMessagesDto from './dto.js';
import { ESocketType } from '../../../enums/index.js';
import { NoUserWithProvidedName } from '../../../errors/index.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import State from '../../../tools/state.js';
import UserDetailsDto from '../../user/details/dto.js';
import type { ISendMessageDto } from './types.js';
import type { IUsersTokens } from '../../../types/index.js';
import type express from 'express';

export default class MessagesRouter extends RouterFactory {
  async post(req: express.Request, res: express.Response): Promise<void> {
    const locals = res.locals as IUsersTokens;
    const { reqController } = locals;

    const data = new SendMessagesDto(
      {
        ...req.body,
      } as ISendMessageDto,
      locals.userId!,
    );

    const users = await reqController.user.getDetails(
      [new UserDetailsDto({ name: (req.body as ISendMessageDto).receiver }), new UserDetailsDto({ id: locals.userId })],
      { userId: locals.userId, tempId: locals.tempId },
    );
    if (!users || users.payload.length === 0) {
      throw new NoUserWithProvidedName();
    }
    const receiver = users.payload.find((u) => u.login === data.receiver);
    const sender = users.payload.find((u) => u._id === data.sender);
    if (!receiver) {
      throw new NoUserWithProvidedName();
    }

    await reqController.message.send(
      new SendMessagesDto(
        {
          body: data.body,
          sender: data.receiver,
          receiver: receiver?._id,
        },
        locals.userId!,
      ),
      { userId: locals.userId, tempId: locals.tempId },
    );
    State.socket.sendToUser(
      receiver._id,
      { body: data.body, sender: sender?.login, receiver: sender?.login },
      ESocketType.Message,
    );
  }
}
