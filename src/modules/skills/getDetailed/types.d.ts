import type * as enums from '../../../enums/index.js';
export interface IGetDetailedSkillsDto {
  id: string;
}
export interface ISingleSkillDetailed {
  _id: string;
  name: string;
  power: number;
  type: enums.ESkillsType;
  target: enums.ESkillTarget;
}

export interface ISkillsEntityDetailed {
  _id: string;
  owner: string;
  singleSkills: ISingleSkillDetailed[];
}
