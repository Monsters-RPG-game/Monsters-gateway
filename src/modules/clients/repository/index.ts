import AbstractRepository from '../../../tools/abstracts/repository.js';
import type Client from './model.js';
import type { IClient, IClientEntity, IClientRepository } from './types.js';
import type * as enums from '../../../enums/index.js';
import type mongoose from 'mongoose';
import type { FilterQuery } from 'mongoose';

export default class ClientsRepository
  extends AbstractRepository<IClient, typeof Client, enums.ELocalModules.Client>
  implements IClientRepository
{
  async getByName(clientId: string): Promise<IClientEntity | null> {
    return this.model
      .findOne({ clientId } as FilterQuery<Record<string, string | mongoose.Types.ObjectId>>)
      .select({ __v: false })
      .lean();
  }
}
