export interface IChapter {
  chapter: number;
  line: string;
}

export interface IStage {
  stageNumber: number;
  chapters: IChapter[];
}
export interface ILine {
  intent: string;
  line: string;
}
