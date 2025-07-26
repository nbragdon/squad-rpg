import { Rarity } from "./rarity";

export interface GameMode {
    id: string;
    name: string;
    description: string;
    type: 'story' | 'daily' | 'dungeon' | 'pvp' | 'event';
    energyCost: number;
    rewards: Reward[];
}

export interface Reward {
    type: 'currency' | 'material' | 'character' | 'gear';
    id: string;
    amount: number;
    rarity?: Rarity;
}

export interface CharacterProgress {
    level: number;
    xp: number;
    xpToNextLevel: number;
    shards: number;
}

export interface PlayerProgress {
    level: number;
    experience: number;
    crystals: number; // Renamed from currency
    energy: number;
    maxEnergy: number;

    soloProgress: number; // Highest unlocked solo stage (1 = chapter 1 stage 1)
    unlockedCharacters: string[]; // List of owned character IDs
    inventory: InventoryItem[]; // Player's inventory
    characterProgress?: {
        [characterId: string]: CharacterProgress
    };
}

export interface InventoryItem {
    id: string;
    type: 'material' | 'gear' | 'consumable' | 'weapon' | 'armor' | 'trinket';
    name: string;
    quantity: number;
    rarity: Rarity;
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
    currency: 'gems' | 'coins';
}
