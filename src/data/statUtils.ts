import { CharacterBase } from "../types/character";
import { Rarity } from "../types/rarity";
import { AllStats, StatType } from "../types/stats";
import { BASELINE } from "./statBaselines";

const STAT_GROWTH_PER_LEVEL = 1.05;

// Shard bonus per rarity
const SHARD_BONUS: Record<Rarity, number> = {
  [Rarity.COMMON]: 0.01,
  [Rarity.UNCOMMON]: 0.02,
  [Rarity.RARE]: 0.05,
  [Rarity.EPIC]: 0.1,
  [Rarity.LEGENDARY]: 0.15,
};

export interface CalculableStats {
  stats: AllStats;
  level: number;
  rarity: Rarity;
  shards?: number;
}

// Calculate stat for a character (player or enemy)
export function calculateStat(
  statType: StatType,
  calculableStats: CalculableStats,
): number {
  // Level scaling
  let stat =
    calculableStats.stats[statType] *
    Math.pow(STAT_GROWTH_PER_LEVEL, calculableStats.level - 1);
  // Shard bonus (player only)
  stat *=
    1 + (calculableStats.shards || 0) * SHARD_BONUS[calculableStats.rarity];
  // Equipment bonus (player only)
  return Math.round(stat);
}

// For enemies: only base, level, rarity
export function calculateEnemyStat(
  base: number,
  level: number,
  rarity: Rarity,
) {
  return Math.round(base * Math.pow(STAT_GROWTH_PER_LEVEL, level - 1));
}

// Utility to get base stats for a character by rarity
export function getBaseStats(character: CharacterBase) {
  return BASELINE[character.rarity.toUpperCase() as keyof typeof BASELINE];
}

// Damage calculation (defense scaling)
// Suggestion: Use a more impactful formula
// New: damage = attack * (100 / (100 + defense * 2))
export function calculateDamage(attack: number, defense: number) {
  return Math.max(1, Math.round(attack * (100 / (100 + defense * 2))));
}
