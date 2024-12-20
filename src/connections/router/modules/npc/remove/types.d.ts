import type { IRemoveCharacterDto } from '../../../../../modules/npc/subModules/remove/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IRemoveCharacterReq = express.Request<unknown, unknown, IRemoveCharacterDto, IQuery>;
