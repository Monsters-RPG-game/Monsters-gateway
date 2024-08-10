import Validation from '../../../../tools/validation/index.js';
import type { IGetDetailedNarratorStoryDto } from './types';

export default class GetDetailedNarratorStoryDto implements IGetDetailedNarratorStoryDto {
  episodeNumber: number;
  stageNumber: number;
  chapterNumber: number;

  constructor(data: IGetDetailedNarratorStoryDto) {
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
