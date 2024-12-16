import AbstractRepository from '../../../tools/abstracts/repository.js';
import type Key from './model.js';
import type { IKeyRepository, IKey, IKeyEntity } from './types.js';
import type * as enums from '../../../enums/index.js';

export default class KeyRepository
  extends AbstractRepository<IKey, typeof Key, enums.ELocalModules.Key>
  implements IKeyRepository
{
  async getAll(): Promise<IKeyEntity[]> {
    return this.model.find().select({ __v: false }).lean();
  }
}
