import type { ISingleSkillDetailed } from './subModules/getDetailed/types.js';

export interface ISingleSkillEntity {
  _id: string;
  singleSkillId: string;
}

export interface ISkillsEntity {
  _id: string;
  owner: string;
  skills: ISingleSkillEntity[];
}

export interface IDetailedSkillsEntity {
  _id: string;
  owner: string;
  singleSkills: ISingleSkillDetailed[];
}
