import type { IGetByStageDto } from '../../../../../modules/story/subModules/getByStage/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IGetByStageReq = express.Request<unknown, unknown, unknown, IGetByStageDto & IQuery>;
