import type { IGetFightDto } from './types.d.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IGetFightDto:
 *       type: object
 *       properties:
 *         target:
 *           type: string
 *         page:
 *           type: number
 */
export default class GetFightDto implements IGetFightDto {
  owner: string;
  active: boolean;
  page: number | undefined;

  constructor(body: IGetFightDto, owner: string) {
    this.page = body.page;
    this.active = body.active;
    this.owner = owner;
  }
}
