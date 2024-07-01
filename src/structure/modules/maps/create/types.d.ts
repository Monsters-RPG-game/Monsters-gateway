import type { IMapEntity } from '../entity.d.ts';

export type ICreateMapDto = Omit<IMapEntity, '_id'>;
