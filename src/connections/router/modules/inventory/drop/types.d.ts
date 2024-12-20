import type { IDropItemDto } from '../../../../../modules/inventory/subModules/drop/types.js';
import type { IQuery } from '../../../../../types/requests.js';
import type express from 'express';

export type IDropItemReq = express.Request<unknown, unknown, IDropItemDto, IQuery>;
