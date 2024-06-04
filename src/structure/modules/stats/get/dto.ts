import Validation from '../../../../tools/validation/index.js';
import type { ICharacterStatsDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     ICharacterStatsDto:
 *     parameters:
 *      - in: query
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 */
export default class CharacterStatsDto implements ICharacterStatsDto {
  id?: string;
  character?: string;
  lvl?: number;

  constructor(data: ICharacterStatsDto) {
    this.id = data.id;
    this.character = data.character;
    this.lvl = data.lvl;

    this.validate();
  }

  validate(): void {
    if (!this.character || this.id) new Validation(this.id, 'id').isDefined();
    if (this.character) {
      new Validation(this.character, 'character').isDefined();
      new Validation(this.lvl, 'lvl').isDefined();
    }
  }
}
