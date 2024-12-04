import type * as enums from '../../../enums/skills.js';

export interface IAddSingleSkillDto {
  name: string;
  power: number;
  type: enums.ESkillsType;
  target: enums.ESkillTarget;
}
