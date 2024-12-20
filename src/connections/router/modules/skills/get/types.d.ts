import type { IGetSkillsDto } from '../../../../../modules/skills/subModules/get/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IGetSkillsReq = express.Request<unknown, unknown, unknown, IGetSkillsDto & IQuery>;
