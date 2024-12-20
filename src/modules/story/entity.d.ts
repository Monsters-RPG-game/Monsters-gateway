import type { ILine, IStage } from './types.js';

export interface INpcStoryEntity {
  _id: string;
  name: string;
  npcId: string;
  lines: ILine[];
}

export interface INarratorStoryEntity {
  _id: string;
  episode: number;
  stages: IStage[];
}
