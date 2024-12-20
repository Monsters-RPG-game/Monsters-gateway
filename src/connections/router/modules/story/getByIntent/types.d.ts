import type { IGetByIntentDto } from '../../../../../modules/story/subModules/getByIntent/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IGetByIntentReq = express.Request<unknown, unknown, unknown, IGetByIntentDto & IQuery>;
