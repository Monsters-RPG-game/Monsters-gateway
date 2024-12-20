import SendMessagesDto from './dto.js';
import { ESocketType } from '../../../../enums/socket.js';
import { NoUserWithProvidedName } from '../../../../errors/index.js';
import AbstractController from '../../../../tools/abstractions/controller.js';
import State from '../../../../tools/state.js';
import UserDetailsDto from '../../../users/subModules/details/dto.js';
import type * as types from '../../../../types/index.js';

export default class SendMessagesController extends AbstractController<void> {
  override async execute(data: SendMessagesDto, res: types.IResponse): Promise<void> {
    const { reqController, tempId, userId } = res.locals;

    const users = await reqController.user.getDetails(
      [new UserDetailsDto({ name: data.receiver }), new UserDetailsDto({ id: userId })],
      { userId, tempId },
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
          receiver: receiver._id as string,
        },
        userId as string,
      ),
      { userId, tempId },
    );

    State.socket.sendToUser(
      receiver._id as string,
      { body: data.body, sender: sender?.login, receiver: sender?.login },
      ESocketType.Message,
    );
  }
}
