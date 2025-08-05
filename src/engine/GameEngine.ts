import { generateBaseCharacterProgress } from "data/characters";
import { BattleEngine } from "../battle/battleEngine";
import { PlayerProgress } from "../types/game";
import { EquipmentType } from "../types/inventory";
import { Rarity } from "../types/rarity";

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
      coins: 0,
      crystals: 0,
      equipment: {},
      inventory: {},
      autoBattle: false,
      soloProgress: 1,
      titanProgress: {
        [Rarity.COMMON]: 0,
        [Rarity.UNCOMMON]: 0,
        [Rarity.RARE]: 0,
        [Rarity.EPIC]: 0,
        [Rarity.LEGENDARY]: 0,
      },
      dungeonProgress: {
        [Rarity.COMMON]: {
          [EquipmentType.weapon]: false,
          [EquipmentType.armor]: false,
          [EquipmentType.trinket]: false,
        },
        [Rarity.UNCOMMON]: {
          [EquipmentType.weapon]: false,
          [EquipmentType.armor]: false,
          [EquipmentType.trinket]: false,
        },
        [Rarity.RARE]: {
          [EquipmentType.weapon]: false,
          [EquipmentType.armor]: false,
          [EquipmentType.trinket]: false,
        },
        [Rarity.EPIC]: {
          [EquipmentType.weapon]: false,
          [EquipmentType.armor]: false,
          [EquipmentType.trinket]: false,
        },
        [Rarity.LEGENDARY]: {
          [EquipmentType.weapon]: false,
          [EquipmentType.armor]: false,
          [EquipmentType.trinket]: false,
        },
      },
      unlockedCharacters: ["ironfoot"],
      characterProgress: {
        ironfoot: generateBaseCharacterProgress(),
      },
    },
    battleEngine: null,
    storyProgress: 1,
  };
}
