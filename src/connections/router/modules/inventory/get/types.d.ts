import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IGetItemReq = express.Request<unknown, unknown, undefined, IQuery>;
