import Validation from '../../../tools/validation/index.js';
import type { IGetIntentResponseNpcDto } from './types.js';

export default class GetIntentResponseDto implements IGetIntentResponseNpcDto {
  npcId: string;
  intent: string;

  constructor(data: IGetIntentResponseNpcDto) {
    this.intent = data.intent;
    this.npcId = data.npcId;
  }
  validate(): void {
    new Validation(this.intent, 'intent').isDefined();
    new Validation(this.npcId, 'npcId').isDefined();
  }
}
