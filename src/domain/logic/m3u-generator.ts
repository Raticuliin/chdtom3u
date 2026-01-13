import type { Game } from '../entities/game-types';
export function generateM3u(game: Game): string {
  return game.discs
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .join('\n');
}
