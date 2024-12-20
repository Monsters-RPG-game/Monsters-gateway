import type { IAttackDto } from '../../../../../modules/fights/subModules/attack/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IAttackReq = express.Request<unknown, unknown, IAttackDto, IQuery>;
