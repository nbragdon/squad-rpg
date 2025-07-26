import { BattleEngine } from "../battle/battleEngine";
import { PlayerProgress } from "../types/game";

export interface GameEngine {
  player: PlayerProgress & {
    id: string;
    name: string;
    autoBattle: boolean;
    // Add more player properties as needed
  };
  battleEngine: BattleEngine | null;
  // Add more top-level game state as needed
  // e.g. storyProgress, unlockedCharacters, etc.
  storyProgress: number;
  // ...
}

export function createDefaultGameEngine(): GameEngine {
  return {
    player: {
      id: "player_1",
      name: "Player",
      crystals: 0,
      inventory: [],
      autoBattle: false,
      soloProgress: 1,
      unlockedCharacters: ["ironfoot"],
      characterProgress: {
        ironfoot: {
          level: 1,
          xp: 0,
          xpToNextLevel: 100,
          shards: 0,
        },
      },
    },
    battleEngine: null,
    storyProgress: 1,
  };
}
