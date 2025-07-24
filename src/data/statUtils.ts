import { CharacterBase, Rarity } from '../types/game';
import { STAT_GROWTH_PER_LEVEL } from './leveling';
import { BASELINE } from './statBaselines';

// Shard bonus per rarity
const SHARD_BONUS: Record<Rarity, number> = {
    [Rarity.COMMON]: 0.01,
    [Rarity.UNCOMMON]: 0.02,
    [Rarity.RARE]: 0.05,
    [Rarity.EPIC]: 0.10,
    [Rarity.LEGENDARY]: 0.15
};

// Calculate stat for a character (player or enemy)
export function calculateStat({
    base,
    level = 1,
    shards = 0,
    rarity,
    equipmentBonus = 0
}: {
    base: number,
    level?: number,
    shards?: number,
    rarity: Rarity,
    equipmentBonus?: number
}) {
    // Level scaling
    let stat = base * Math.pow(STAT_GROWTH_PER_LEVEL, (level - 1));
    // Shard bonus (player only)
    stat *= (1 + (shards || 0) * SHARD_BONUS[rarity]);
    // Equipment bonus (player only)
    stat *= (1 + (equipmentBonus || 0));
    return Math.round(stat);
}

// For enemies: only base, level, rarity
export function calculateEnemyStat(base: number, level: number, rarity: Rarity) {
    return Math.round(base * Math.pow(STAT_GROWTH_PER_LEVEL, (level - 1)));
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
