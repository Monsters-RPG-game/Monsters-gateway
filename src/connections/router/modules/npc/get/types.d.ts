import type { IGetCharacterDto } from '../../../../../modules/npc/subModules/get/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IGetCharacterReq = express.Request<unknown, unknown, unknown, IGetCharacterDto & IQuery>;
