import type { IGetLogDto } from './types.d.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IGetLogDto:
 *       parameters:
 *         - in: query
 *           name: lastId
 *           required: false
 *           schema:
 *             type: string
 */
export default class GetLogDto implements IGetLogDto {
  lastId?: string;

  constructor(lastId: string | undefined) {
    this.lastId = lastId;
  }
}
