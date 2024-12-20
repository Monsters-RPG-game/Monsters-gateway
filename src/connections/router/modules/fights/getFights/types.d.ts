import type { IGetFightDto } from '../../../../../modules/fights/subModules/getFight/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IGetFightReq = express.Request<unknown, unknown, IGetFightDto, IQuery>;
