import type { ILine, IStage } from './types.d.ts';

export interface INpcStoryEntity {
  _id: string;
  name: string;
  npcId: string;
  lines: ILine[];
}

export interface INarratorEntity {
  _id: string;
  episode: number;
  stages: IStage[];
}

export interface IUserCompletionEntity {
  _id: string;
  userId: string;
  stage: number;
  episode: number;
  chapter: number;
}
