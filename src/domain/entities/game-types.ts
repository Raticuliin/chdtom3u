export interface Game {
  name: string;
  isMultidisc: boolean;
  discs: string[];
}

export type GroupingStrategy = 'safe' | 'aggressive';
