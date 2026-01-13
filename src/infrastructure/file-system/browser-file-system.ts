import type { Game } from '../../domain/entities/game-types';
import type { IFileSystem } from '../../domain/repositories/file-system.interface';

export const createBrowserFileSystem = (): IFileSystem => {
  let rootHandle: FileSystemDirectoryHandle | null = null;
  const fileHandles: Map<string, FileSystemFileHandle> = new Map();

  return {
    async scanDirectory(): Promise<string[]> {
      try {
        rootHandle = await window.showDirectoryPicker({
          mode: 'readwrite',
        });

        fileHandles.clear();
        const fileNames: string[] = [];

        for await (const entry of rootHandle.values()) {
          if (entry.kind === 'file' && entry.name.toLowerCase().endsWith('.chd')) {
            fileHandles.set(entry.name, entry);
            fileNames.push(entry.name);
          }
        }

        return fileNames;
      } catch (error) {
        console.error('Error on scanDirectory: ', error);
        return [];
      }
    },

    async organizeGame(game: Game, m3uContent: string): Promise<void> {
      if (!rootHandle) {
        throw new Error('Select a folder first.');
      }

      try {
        // 1. Crear subcarpeta
        const gameFolderHandle = await rootHandle.getDirectoryHandle(`${game.name}.m3u`, {
          create: true,
        });

        // 2. Crear el archivo .m3u dentro de la carpeta
        const m3uFileHandle = await gameFolderHandle.getFileHandle(`${game.name}.m3u`, {
          create: true,
        });

        // 3. Escribir contenido del .m3u
        const writable = await m3uFileHandle.createWritable();
        await writable.write(m3uContent);
        await writable.close();

        // 4. Mover los archivos .chd
        for (const fileName of game.discs) {
          const fileHandle = fileHandles.get(fileName);

          if (fileHandle) {
            await (fileHandle as any).move(gameFolderHandle);
          }
        }
      } catch (error) {
        console.error(`Error while organizing game ${game.name}: `, error);
        throw error;
      }
    },
  };
};
