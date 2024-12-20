import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type ILeaveFightReq = express.Request<unknown, unknown, unknown, IQuery>;
