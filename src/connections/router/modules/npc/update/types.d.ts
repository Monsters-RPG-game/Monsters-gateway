import type { IUpdateCharacterDto } from '../../../../../modules/npc/subModules/update/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IUpdateCharacterReq = express.Request<unknown, unknown, IUpdateCharacterDto, IQuery>;
