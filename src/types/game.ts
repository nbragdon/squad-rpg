import { EquipmentItem, EquipmentType, InventoryItem } from "./inventory";
import { Rarity } from "./rarity";

export interface GameMode {
  id: string;
  name: string;
  description: string;
  type: "story" | "daily" | "dungeon" | "pvp" | "event";
  energyCost: number;
  rewards: Reward[];
}

export interface Reward {
  type: "currency" | "material" | "character" | "gear";
  id: string;
  amount: number;
  rarity?: Rarity;
}

export interface EquippedItems {
  [EquipmentType.weapon]: string | undefined;
  [EquipmentType.armor]: string | undefined;
  [EquipmentType.trinket]: [string | undefined, string | undefined];
}

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
  unlockedCharacters: string[]; // List of owned character IDs
  equipment: { [key in string]: EquipmentItem }; // Player's inventory
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
