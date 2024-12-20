import type { IGetNarratorStoryDto } from '../../../../../modules/story/subModules/getNarratorStory/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IGetNarratorStoryReq = express.Request<unknown, unknown, unknown, IGetNarratorStoryDto & IQuery>;
