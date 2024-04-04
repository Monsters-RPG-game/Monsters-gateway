import type { IGetFightDto } from './types.d.js';

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
