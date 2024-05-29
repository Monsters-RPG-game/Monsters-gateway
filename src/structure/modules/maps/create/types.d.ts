import type { IMapEntity } from '../entity';

export type ICreateMapDto = Omit<IMapEntity, '_id'>;
