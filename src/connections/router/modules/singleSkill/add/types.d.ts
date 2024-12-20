import type { IAddSingleSkillDto } from '../../../../../modules/singleSkill/subModules/add/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IAddSingleSkillReq = express.Request<unknown, unknown, IAddSingleSkillDto, IQuery>;
