import type { IGetFightLogsDto } from '../../../../../modules/fights/subModules/getLogs/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IGetFightLogsReq = express.Request<unknown, unknown, IGetFightLogsDto, IQuery>;
