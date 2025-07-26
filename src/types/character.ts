import { AffinityType } from "./affinity";
import { InventoryItem } from "./game";
import { Rarity } from "./rarity";
import { Skill } from "./skillTypes";
import { AllStats } from "./stats";

export interface CharacterBase {
    id: string;
    name: string;
    strongAffinities: AffinityType[];
    weakAffinities: AffinityType[];
    rarity: Rarity;
    stats: AllStats;
    skills: Skill[];
    ultimateSkill: Skill;
}

// The player's owned character (in collection, with progression)
export interface PlayerCharacter extends CharacterBase {
    level: number;
    xp: number; // Current XP
    xpToNextLevel: number; // XP required for next level
    shards: number;
    equippedWeapon?: InventoryItem | null;
    equippedArmor?: InventoryItem | null;
    equippedTrinkets?: [InventoryItem | null, InventoryItem | null];
}