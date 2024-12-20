import type { ICreateFight } from '../../../../../modules/fights/subModules/debug/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IDebugReq = express.Request<unknown, unknown, ICreateFight, IQuery>;
