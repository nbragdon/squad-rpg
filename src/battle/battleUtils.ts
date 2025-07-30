import { ApplyStatusEffectSkillEffect, ModifierType } from "types/skillTypes";
import { AllStats, StatType } from "types/stats";
import { StatusEffectType } from "types/statusEffects";
import { PlayerCharacter } from "../types/character";
import { EnemyCharacter } from "../types/enemy";
import { BattleCharacter } from "./battleTypes";
import { calculateStat } from "data/statUtils";

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
    default:
      return 1;
  }
}

export function getStatusEffectValue(
  attacker: BattleCharacter,
  statusEffect: ApplyStatusEffectSkillEffect,
): number {
  if (statusEffect.statusEffectType === StatusEffectType.poison) {
    let dmg = 0;
    if (statusEffect.modifierType === ModifierType.Percentage) {
      dmg = Math.floor(
        attacker.stats[statusEffect.stat || StatType.magic] *
          (statusEffect.value || 0),
      );
    } else {
      dmg = statusEffect.value || 0;
    }
    console.log(attacker, statusEffect, dmg);
    return dmg;
  }
  return statusEffect.value || 0;
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
