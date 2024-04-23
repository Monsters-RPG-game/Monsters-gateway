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
  id: string;

  constructor(data: ICharacterStatsDto) {
    this.id = data.id;

    this.validate();
  }

  validate(): void {
    new Validation(this.id, 'id').isDefined();
  }
}
