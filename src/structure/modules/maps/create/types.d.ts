import type { IMapEntity } from '../get/types.js';

export type ICreateMapDto = Omit<IMapEntity, '_id'>;
