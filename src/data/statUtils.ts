import { BattleCharacter } from "../battle/battleTypes";
import { AffinityType } from "../types/affinity";
import { Rarity } from "../types/rarity";
import { AdjustStatSkillEffect, ModifierType } from "../types/skillTypes";
import { AllStats, StatType } from "../types/stats";
import { StatusEffectType } from "../types/statusEffects";

const AFFINITY_DAMAGE_MULT = 1.25;
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
  statusEffects?: {
    [key in StatusEffectType]?: {
      type: StatusEffectType;
      duration: number;
      value: number;
    };
  };
  statAdjustments?: AdjustStatSkillEffect[];
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

export function adjustedStat(
  statType: StatType,
  calculableStats: CalculableStats,
) {
  let stat = calculableStats.stats[statType];
  if (calculableStats.statAdjustments) {
    // Apply stat adjustments
    for (const adjustment of calculableStats.statAdjustments) {
      if (adjustment.stat === statType) {
        if (adjustment.modifierType === ModifierType.Flat) {
          stat += adjustment.modifierValue;
        } else if (adjustment.modifierType === ModifierType.Percentage) {
          stat *= 1 + adjustment.modifierValue;
        }
      }
    }
  }

  return Math.round(stat);
}

/**
 * Determines if a critical hit occurs based on the provided critical chance.
 * @param critChance The critical hit chance as a number between 0 and 100.
 * @returns True if a critical hit occurs, false otherwise.
 */
export function didCrit(critChance: number): boolean {
  // Generate a random number between 0 (inclusive) and 100 (exclusive)
  const randomNumber = Math.random() * 100;
  // A critical hit occurs if the random number is less than the critChance
  return randomNumber < critChance;
}

// Damage calculation (defense scaling)
// Suggestion: Use a more impactful formula
// New: damage = attack * (100 / (100 + defense * 2))
export function calculateDamage(
  attacker: BattleCharacter,
  target: BattleCharacter,
  attackStat: StatType,
  defenseStat: StatType,
  damageAffinity: AffinityType[],
  battleLog?: string[],
): number {
  const attackVal = calculateStat(attackStat, attacker);
  const defenseVal = calculateStat(defenseStat, target);
  let dmg = attackVal * (100 / (100 + defenseVal * 2));
  // affinity bonus
  damageAffinity.forEach((a) => {
    if (attacker.weakAffinities.includes(a)) {
      dmg *= AFFINITY_DAMAGE_MULT;
    }
  });
  // crit
  const isShocked = target.statusEffects?.[StatusEffectType.shock];
  if (!isShocked && didCrit(attacker.stats[StatType.critChance])) {
    dmg *= 1 + attacker.stats[StatType.critDamage];
    if (battleLog) {
      battleLog.push(`${attacker.name} crits ${target.name}!`);
    }
  }
  return Math.max(1, Math.round(dmg));
}
