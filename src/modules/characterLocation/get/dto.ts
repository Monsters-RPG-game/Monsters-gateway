import { NoDataProvidedError } from '../../../errors/index.js';
import Validation from '../../../tools/validation/index.js';
import type { IGetCharacterLocationDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     IGetCharacterLocationDto:
 *     parameters:
 *      - in: query
 *        name: character
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: id
 *        required: false
 *        schema:
 *          type: string
 */
export default class GetCharacterLocationDto implements IGetCharacterLocationDto {
  character?: string;
  id?: string;

  constructor(data: IGetCharacterLocationDto) {
    this.character = data.character;
    this.id = data.id;

    this.validate();
  }

  private validate(): void {
    if (this.character) new Validation(this.character, 'character').isDefined();
    if (this.id) new Validation(this.id, 'id').isDefined();

    if (this.id === undefined && this.character === undefined) throw new NoDataProvidedError();
  }
}
