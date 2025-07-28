import { ApplyStatusEffectSkillEffect } from "types/skillTypes";
import { StatType } from "types/stats";
import { StatusEffectType } from "types/statusEffects";
import { PlayerCharacter } from "../types/character";
import { EnemyCharacter } from "../types/enemy";
import { BattleCharacter } from "./battleTypes";

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
    const dmg = Math.floor(
      attacker.stats[statusEffect.stat || StatType.magic] *
        (statusEffect.value || 0),
    );
    return dmg;
  }
  return statusEffect.value || 0;
}
