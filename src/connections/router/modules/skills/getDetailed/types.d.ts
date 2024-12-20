import type { IGetDetailedSkillsDto } from '../../../../../modules/skills/subModules/getDetailed/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IGetDetailedSkillsReq = express.Request<unknown, unknown, unknown, IGetDetailedSkillsDto & IQuery>;
