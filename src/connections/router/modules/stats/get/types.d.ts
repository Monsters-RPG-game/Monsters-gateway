import type { ICharacterStatsDto } from '../../../../../modules/stats/subModules/get/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IGetStatsReq = express.Request<unknown, unknown, ICharacterStatsDto, IQuery>;
