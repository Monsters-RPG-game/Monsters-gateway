import type { IUseSkillDto } from '../../../../../modules/fights/subModules/useSkill/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IUseSkillReq = express.Request<unknown, unknown, IUseSkillDto, IQuery>;
