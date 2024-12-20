import type { IGetNpcStoryDto } from '../../../../../modules/story/subModules/getNpcStory/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IGetNpcStoryReq = express.Request<unknown, unknown, unknown, IGetNpcStoryDto & IQuery>;
