import type { ISingleSkillEntity } from '../singleSkill/entity';

export interface ISkillsEntity {
  _id: string;
  owner: string;
  skills: ISingleSkillEntity[];
}
