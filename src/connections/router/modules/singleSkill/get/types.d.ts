import type { IGetSingleSkillDto } from '../../../../../modules/singleSkill/subModules/get/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IGetSingleSkillReq = express.Request<unknown, unknown, unknown, IGetSingleSkillDto & IQuery>;
