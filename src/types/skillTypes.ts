import { AffinityType } from "./affinity";
import { StatType } from "./stats";
import { StatusEffectType } from "./statusEffects";

// Enums for fixed string sets
export enum SkillEffectType {
  damage = "damage",
  heal = "heal",
  applyStatusEffect = "applyStatusEffect",
  adjustStat = "adjustStat",
}

export enum TargetType {
  self = "self",
  randomAlly = "randomAlly",
  allAllies = "allAllies",
  randomEnemy = "randomEnemy",
  allEnemies = "allEnemies",
  lowestHealthAlly = "lowestHealthAlly",
  lowestHealthEnemy = "lowestHealthEnemy",
}

export enum ModifierType {
  Flat = "flat",
  Percentage = "percentage",
}

export interface SkillEffect {
  id: string;
  name: string;
  type: SkillEffectType;
  affinities: AffinityType[];
  targetType: TargetType;
}

export interface DamageSkillEffect extends SkillEffect {
  type: SkillEffectType.damage;
  damageMultiplier: number;
  damageStat: StatType;
  defenseStat: StatType;
  duration?: number; // Optional duration for damage over time effects
}

export interface HealSkillEffect extends SkillEffect {
  type: SkillEffectType.heal;
  healMultiplier: number;
  healStat: StatType;
  duration?: number; // Optional duration for damage over time effects
}

export interface ApplyStatusEffectSkillEffect extends SkillEffect {
  type: SkillEffectType.applyStatusEffect;
  statusEffectType: StatusEffectType;
  modifierType?: ModifierType;
  stat?: StatType;
  value?: number; // Optional value for the status effect
  duration?: number; // Optional duration for damage over time effects
  stackable?: boolean; // Whether the status effect can stack
}

export interface ApplyPoisonStatusEffectSkillEffect
  extends ApplyStatusEffectSkillEffect {
  statusEffectType: StatusEffectType.poison;
  stat: StatType;
  value: number; // Optional value for the status effect
  duration: number; // Optional duration for damage over time effects
  stackable: false;
}

export interface ApplyBurnStatusEffectSkillEffect
  extends ApplyStatusEffectSkillEffect {
  statusEffectType: StatusEffectType.burn;
  value: number; // Optional value for the status effect
  duration: undefined; // Optional duration for damage over time effects
  stackable: true;
}

export interface ApplyShockStatusEffectSkillEffect
  extends ApplyStatusEffectSkillEffect {
  statusEffectType: StatusEffectType.shock;
  value: number; // Optional value for the status effect
  duration: undefined; // Optional duration for damage over time effects
  stackable: true;
}

export interface ApplyBleedStatusEffectSkillEffect
  extends ApplyStatusEffectSkillEffect {
  statusEffectType: StatusEffectType.bleed;
  value: number; // Optional value for the status effect
  duration: undefined; // Optional duration for damage over time effects
  stackable: true;
}

export interface ApplyBrittleStatusEffectSkillEffect
  extends ApplyStatusEffectSkillEffect {
  statusEffectType: StatusEffectType.brittle;
  value: number; // Optional value for the status effect
  duration: undefined; // Optional duration for damage over time effects
  stackable: true;
}

export interface ApplyStunStatusEffectSkillEffect
  extends ApplyStatusEffectSkillEffect {
  statusEffectType: StatusEffectType.stun;
  value: number; // Optional value for the status effect
  duration: undefined; // Optional duration for damage over time effects
  stackable: false;
}

export interface AdjustStatSkillEffect extends SkillEffect {
  type: SkillEffectType.adjustStat;
  stat: StatType;
  modifierType: ModifierType;
  modifierValue: number;
  duration?: number; // Optional duration for damage over time effects
}

export interface Skill {
  id: string;
  name: string;
  cost: number;
  costStat: StatType;
  cooldownTurns?: number; // Optional cooldown turns
  effects: SkillEffect[];
}
