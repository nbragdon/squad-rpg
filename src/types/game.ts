import {
  EquipmentItem,
  EquipmentType,
  EquippedItems,
  InventoryItem,
} from "./inventory";
import { Rarity } from "./rarity";

export interface CharacterProgress {
  level: number;
  xp: number;
  shards: number;
  equipedItems: EquippedItems;
}

export interface PlayerProgress {
  coins: number;
  crystals: number; // Renamed from currency
  soloProgress: number; // Highest unlocked solo stage (1 = chapter 1 stage 1)
  dungeonProgress: {
    [key in Rarity]: {
      [key in EquipmentType]: boolean;
    };
  };
  titanProgress: {
    [key in Rarity]: number;
  };
  unlockedCharacters: string[]; // List of owned character IDs
  equipment: { [key in string]: EquipmentItem }; // Player's inventory
  inventory: { [key in string]: InventoryItem };
  characterProgress?: {
    [characterId: string]: CharacterProgress;
  };
}

export interface GachaPool {
  id: string;
  name: string;
  characters: {
    characterId: string;
    dropRate: number;
    rarity: Rarity;
  }[];
  cost: number;
  currency: "gems" | "coins";
}
