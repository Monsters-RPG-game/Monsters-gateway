import Validation from '../../../../tools/validation.js';
import type { IGetByStageDto } from './types.js';

export default class GetByStageDto implements IGetByStageDto {
  episodeNumber: number;
  stageNumber: number;
  chapterNumber: number;

  constructor(data: IGetByStageDto) {
    this.episodeNumber = data.episodeNumber;
    this.stageNumber = data.stageNumber;
    this.chapterNumber = data.chapterNumber;

    this.validate();
  }
  validate(): void {
    new Validation(this.episodeNumber, 'episodeNumber').isDefined();
    new Validation(this.stageNumber, 'stageNumber').isDefined();
    new Validation(this.chapterNumber, 'chapterNumber').isDefined();
  }
}
