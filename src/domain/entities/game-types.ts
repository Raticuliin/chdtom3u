export interface Game {
  name: string;
  isMultidisc: boolean;
  discs: string[];
  status: 'pending' | 'organized';
}

export type GroupingStrategy = 'safe' | 'aggressive';
