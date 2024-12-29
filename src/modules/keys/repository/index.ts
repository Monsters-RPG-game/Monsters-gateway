import AbstractRepository from '../../../tools/abstractions/repository.js';
import type AddKey from './add.js';
import type { IKeyRepository } from './types.js';
import type Key from '../../../connections/mongo/models/keys.js';
import type { IKey } from '../../../connections/mongo/types/index.js';
import type * as enums from '../../../enums/index.js';
import type { JWK } from 'jose';

export default class KeyRepository
  extends AbstractRepository<IKey, typeof Key, enums.EModules.Key>
  implements IKeyRepository
{
  async getAll(): Promise<JWK[]> {
    return this.model.find().select({ __v: false }).lean();
  }

  override async add(data: AddKey): Promise<string> {
    const newElement = new this.model(data.key);
    const callback = await newElement.save();
    return callback._id.toString();
  }
}
