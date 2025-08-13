import { ApplyStatusEffectSkillEffect, ModifierType } from "types/skillTypes";
import { AllStats, StatType } from "types/stats";
import { StatusEffectType } from "types/statusEffects";
import { PlayerCharacter } from "../types/character";
import { EnemyCharacter } from "../types/enemy";
import { BattleCharacter } from "./battleTypes";
import { calculateStat } from "data/statUtils";

export const STATUS_EFFECT_VALUE_MAX: {
  [key in StatusEffectType]: number | undefined;
} = {
  [StatusEffectType.burn]: 20,
  [StatusEffectType.brittle]: undefined,
  [StatusEffectType.poison]: undefined,
  [StatusEffectType.shock]: undefined,
  [StatusEffectType.bleed]: undefined,
  [StatusEffectType.stun]: 1,
  [StatusEffectType.silence]: 3,
  [StatusEffectType.taunt]: 3,
  [StatusEffectType.shield]: undefined,
  [StatusEffectType.haste]: 30,
  [StatusEffectType.slow]: 30,
  [StatusEffectType.confusion]: 3,
  [StatusEffectType.disarm]: 3,
  [StatusEffectType.coins]: undefined,
};

export function isPlayerCharacter(
  char: PlayerCharacter | BattleCharacter | EnemyCharacter,
): char is PlayerCharacter | BattleCharacter {
  return (char as PlayerCharacter).xp !== undefined;
}

export function isEnemyCharacter(
  char: PlayerCharacter | BattleCharacter | EnemyCharacter,
): char is EnemyCharacter {
  // Remove invalid property checks, just check for skills and lack of xp
  return (
    (char as EnemyCharacter).skills !== undefined &&
    (char as any).xp === undefined
  );
}

export function getStackableStatusEffectReductionAmount(
  statusEffect: StatusEffectType,
  value: number,
): number {
  switch (statusEffect) {
    case StatusEffectType.burn:
      return Math.ceil(value / 2);
    case StatusEffectType.brittle:
      return Math.ceil(value / 4);
    case StatusEffectType.stun:
      return value;
    case StatusEffectType.slow:
      return Math.min(value, 5);
    case StatusEffectType.shield:
      return Math.ceil(value / 10);
    case StatusEffectType.coins:
      return 0;
    default:
      return 1;
  }
}

export function getStatusEffectValue(
  attacker: BattleCharacter,
  statusEffect: ApplyStatusEffectSkillEffect,
): number {
  if (statusEffect.statusEffectType === StatusEffectType.poison) {
    return Math.floor(
      attacker.stats[statusEffect.stat || StatType.magic] *
        (statusEffect.value || 0),
    );
  }
  if (statusEffect.statusEffectType === StatusEffectType.shield) {
    if (statusEffect.stat) {
      return Math.round(
        attacker.stats[statusEffect.stat] * (statusEffect.value || 0),
      );
    } else {
      return Math.round(statusEffect.value || 0);
    }
  }
  if (statusEffect.stackable === true) {
    return Math.min(
      (attacker.statusEffects[statusEffect.statusEffectType]?.value || 0) +
        (statusEffect.value || 0),
      STATUS_EFFECT_VALUE_MAX[statusEffect.statusEffectType] ||
        Number.POSITIVE_INFINITY,
    );
  }
  return Math.min(
    statusEffect.value || 0,
    STATUS_EFFECT_VALUE_MAX[statusEffect.statusEffectType] ||
      Number.POSITIVE_INFINITY,
  );
}

export function getCalculatedStats(battleCharacter: BattleCharacter): AllStats {
  return {
    [StatType.magic]: calculateStat(StatType.magic, battleCharacter),
    [StatType.energy]: calculateStat(StatType.energy, battleCharacter),
    [StatType.strength]: calculateStat(StatType.strength, battleCharacter),
    [StatType.defense]: calculateStat(StatType.defense, battleCharacter),
    [StatType.speed]: calculateStat(StatType.speed, battleCharacter),
    [StatType.health]: calculateStat(StatType.health, battleCharacter),
    [StatType.magicDefense]: calculateStat(
      StatType.magicDefense,
      battleCharacter,
    ),
    [StatType.energyGain]: calculateStat(StatType.energyGain, battleCharacter),
    [StatType.critChance]: calculateStat(StatType.critChance, battleCharacter),
    [StatType.critDamage]: calculateStat(StatType.critDamage, battleCharacter),
  };
}
