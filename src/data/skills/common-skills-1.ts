import { AffinityType } from "../../types/affinity";
import {
  AdjustStatSkillEffect,
  ApplyStatusEffectSkillEffect,
  DamageSkillEffect,
  ModifierType,
  Skill,
  SkillEffectType,
  TargetType,
} from "../../types/skillTypes";
import { StatType } from "../../types/stats";
import { StatusEffectType } from "../../types/statusEffects";

// Heel Smash ---------------------------------------------------------------

const HeelSmashEffect: DamageSkillEffect = {
  id: "heel_smash_damage_effect",
  name: "Heel Smash Damage",
  type: SkillEffectType.damage,
  affinity: AffinityType.beast,
  damageMultiplier: 1.5,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined, // No duration for damage effects
};

export const HeelSmashSkill: Skill = {
  id: "heel_smash",
  name: "Heel Smash",
  cost: 25,
  costStat: StatType.energy,
  effects: [HeelSmashEffect],
};
//-----------------------------------------------------------------------------

// Stone Skin ---------------------------------------------------------------
const StoneSkinEffect: AdjustStatSkillEffect = {
  id: "heel_smash_damage_effect",
  name: "Heel Smash Damage",
  affinity: AffinityType.gem,
  targetType: TargetType.self,
  duration: 3,
  type: SkillEffectType.adjustStat,
  stat: StatType.defense,
  modifierType: ModifierType.Flat,
  modifierValue: 50,
};

export const StoneSkinSkill: Skill = {
  id: "stone_skin",
  name: "Stone Skin",
  cost: 20,
  costStat: StatType.energy,
  effects: [StoneSkinEffect],
};
//-----------------------------------------------------------------------------

// Venom Dagger ---------------------------------------------------------------

const VenomDaggerDamageEffect: DamageSkillEffect = {
  id: "venom_dagger_damage_effect",
  name: "Venom Dagger Damage",
  type: SkillEffectType.damage,
  affinity: AffinityType.void,
  damageMultiplier: 0.8,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined, // No duration for damage effects
};

const VenomDaggerApplyStatusEffect: ApplyStatusEffectSkillEffect = {
  id: "venom_dagger_apply_status_effect",
  name: "Venom Dagger Poison",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.poison,
  targetType: TargetType.randomEnemy,
  affinity: AffinityType.void,
  duration: 3,
  stackable: false,
  value: 30,
};

export const VenomDaggerSkill: Skill = {
  id: "venom_dagger",
  name: "Venom Dagger",
  cost: 20,
  costStat: StatType.energy,
  effects: [VenomDaggerDamageEffect, VenomDaggerApplyStatusEffect],
};
//-----------------------------------------------------------------------------

// Quick Stab ---------------------------------------------------------------

const QuickStabDamageEffect: DamageSkillEffect = {
  id: "quick_stab_damage_effect",
  name: "Quick Stab Damage",
  type: SkillEffectType.damage,
  affinity: AffinityType.void,
  damageMultiplier: 1.1,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined, // No duration for damage effects
};

export const QuickStabSkill: Skill = {
  id: "quick_stab",
  name: "Quick Stab",
  cost: 10,
  costStat: StatType.energy,
  effects: [QuickStabDamageEffect],
};
//-----------------------------------------------------------------------------

// Thunder Clap ---------------------------------------------------------------

const ThunderClapDamageEffect: DamageSkillEffect = {
  id: "thunder_clap_damage_effect",
  name: "Thunder Clap Damage",
  type: SkillEffectType.damage,
  affinity: AffinityType.chaos,
  damageMultiplier: 1.2,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
  duration: undefined, // No duration for damage effects
};

const ThunderClapApplyStatusEffect: ApplyStatusEffectSkillEffect = {
  id: "thunder_clap_apply_status_effect",
  name: "Thunder Clap Shock",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.shock,
  targetType: TargetType.allEnemies,
  affinity: AffinityType.chaos,
  duration: 3,
  stackable: false,
};

export const ThunderClapSkill: Skill = {
  id: "thunder_clap",
  name: "Thunder Clap",
  cost: 30,
  costStat: StatType.energy,
  effects: [ThunderClapDamageEffect, ThunderClapApplyStatusEffect],
};
//-----------------------------------------------------------------------------

// Arcane Bolt ---------------------------------------------------------------

const ArcaneBoltDamageEffect: DamageSkillEffect = {
  id: "arcane_bolt_damage_effect",
  name: "Arcane Bolt Damage",
  type: SkillEffectType.damage,
  affinity: AffinityType.knowledge,
  damageMultiplier: 0.8,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
  duration: undefined, // No duration for damage effects
};

const ArcaneBoltAdjustStatEffect: AdjustStatSkillEffect = {
  id: "arcane_bolt_adjust_stat_effect",
  name: "Arcane Bolt Gain Energy",
  affinity: AffinityType.knowledge,
  targetType: TargetType.self,
  duration: 1,
  type: SkillEffectType.adjustStat,
  stat: StatType.energyGain,
  modifierType: ModifierType.Flat,
  modifierValue: 15,
};

export const ArcaneBoltSkill: Skill = {
  id: "arcane_bolt",
  name: "Arcane Bolt",
  cost: 0,
  costStat: StatType.energy,
  cooldownTurns: 2,
  effects: [ArcaneBoltDamageEffect, ArcaneBoltAdjustStatEffect],
};
//-----------------------------------------------------------------------------
