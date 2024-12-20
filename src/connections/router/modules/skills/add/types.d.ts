import type { IAddSkillsDto } from '../../../../../modules/skills/subModules/add/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IAddSkillsReq = express.Request<unknown, unknown, IAddSkillsDto, IQuery>;
