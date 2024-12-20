import type { IUseItemDto } from '../../../../../modules/inventory/subModules/use/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IUseItemReq = express.Request<unknown, unknown, IUseItemDto, IQuery>;
