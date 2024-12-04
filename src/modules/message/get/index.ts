import GetMessagesDto from './dto.js';
import RouterFactory from '../../../tools/abstracts/router.js';
import UserDetailsDto from '../../user/details/dto.js';
import type * as types from './types.js';
import type { IUsersTokens } from '../../../types/index.js';
import type express from 'express';

export default class MessagesRouter extends RouterFactory {
  async get(
    req: express.Request,
    res: express.Response,
  ): Promise<Record<string, types.IPreparedMessagesBody> | types.IFullMessageEntity[]> {
    const locals = res.locals as IUsersTokens;
    const { reqController } = locals;

    let data = new GetMessagesDto(Number(req.query.page));

    if (req.query.target) {
      data = new GetMessagesDto(Number(req.query.page), req.query.target as string);
    }

    const messages = (
      await reqController.message.get(data, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;

    if (Array.isArray(messages)) {
      const userIds = messages.map((m) => (m.receiver === locals.userId ? m.sender : m.receiver));
      const cleaned = [...new Set(userIds), locals.userId].map((id) => new UserDetailsDto({ id }));
      const users = (
        await reqController.user.getDetails(cleaned, {
          userId: locals.userId,
          tempId: locals.tempId,
        })
      ).payload;
      return messages.map((m) => {
        return {
          ...m,
          receiver: users.find((e) => e._id === m.receiver)?.login ?? 'Removed account',
          sender: users.find((e) => e._id === m.sender)?.login ?? 'Removed account',
        };
      });
    }
    const userIds = Object.values(messages).map((m) => {
      return m.receiver === locals.userId ? m.sender : m.receiver;
    });
    const cleaned = [...new Set(userIds), locals.userId].map((id) => new UserDetailsDto({ id }));
    const users = (
      await reqController.user.getDetails(cleaned, {
        userId: locals.userId,
        tempId: locals.tempId,
      })
    ).payload;
    const prepared: Record<string, types.IPreparedMessagesBody> = {};
    Object.entries(messages).forEach(([k, v]) => {
      prepared[k] = {
        ...v,
        receiver: users.find((e) => e._id === v.receiver)?.login ?? 'Removed account',
        sender: users.find((e) => e._id === v.sender)?.login ?? 'Removed account',
      };
    });

    return prepared;
  }
}
