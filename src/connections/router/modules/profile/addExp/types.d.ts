import type { IAddExpDto } from '../../../../../modules/profile/subModules/addExp/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IAddExpReq = express.Request<unknown, unknown, IAddExpDto, IQuery>;
