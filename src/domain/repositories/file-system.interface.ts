import type { Game } from '../entities/game-types';

export interface IFileSystem {
  scanDirectory(): Promise<string[]>;
  organizeGame(game: Game, m3uContent: string): Promise<void>;
}
