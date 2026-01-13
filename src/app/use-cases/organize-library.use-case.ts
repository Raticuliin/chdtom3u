import { parseGames } from '../../domain/logic/game-parser';
import { generateM3u } from '../../domain/logic/m3u-generator';
import type { IFileSystem } from '../../domain/repositories/file-system.interface';

export const createOrganizeLibrary = (fileSystem: IFileSystem) => {
  return async (discPattern: string) => {
    const fileNames = await fileSystem.scanDirectory();

    if (fileNames.length === 0) return;

    const games = parseGames(discPattern, fileNames);

    for (const game of games) {
      const m3uContent = generateM3u(game);

      await fileSystem.organizeGame(game, m3uContent);
    }
  };
};
