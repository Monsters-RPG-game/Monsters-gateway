import type { IGetPartyDto } from '../../../../../modules/party/subModules/get/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IGetPartyReq = express.Request<unknown, unknown, unknown, IGetPartyDto & IQuery>;
