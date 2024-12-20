import type { IAddCharacterDto } from '../../../../../modules/npc/subModules/add/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IAddCharacterReq = express.Request<unknown, unknown, IAddCharacterDto, IQuery>;
