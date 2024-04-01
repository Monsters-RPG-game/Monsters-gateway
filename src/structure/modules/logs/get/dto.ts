import type { IGetLogDto } from './types.d.js';

export default class GetLogDto implements IGetLogDto {
  lastId?: string;

  constructor(lastId: string | undefined) {
    this.lastId = lastId;
  }
}
