import type { IAddProfileDto } from '../../../../../modules/profile/subModules/add/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IAddProfileReq = express.Request<unknown, unknown, IAddProfileDto, IQuery>;
