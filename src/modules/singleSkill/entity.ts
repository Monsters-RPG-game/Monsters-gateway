import type { ESkillsType, ESkillTarget } from '../../enums/index.js';

export interface ISingleSkillEntity {
  _id: string;
  name: string;
  power: number;
  type: ESkillsType;
  target: ESkillTarget;
}
