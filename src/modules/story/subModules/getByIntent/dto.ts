import Validation from '../../../../tools/validation.js';
import type { IGetByIntentDto } from './types.js';

export default class GetByIntentDto implements IGetByIntentDto {
  npcId: string;
  intent: string;

  constructor(data: IGetByIntentDto) {
    this.intent = data.intent;
    this.npcId = data.npcId;
  }

  validate(): void {
    new Validation(this.intent, 'intent').isDefined();
    new Validation(this.npcId, 'npcId').isDefined();
  }
}
