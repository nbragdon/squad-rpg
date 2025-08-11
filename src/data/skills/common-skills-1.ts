import { AffinityType } from "../../types/affinity";
import {
  AdjustmentDirection,
  AdjustStatSkillEffect,
  ApplyBleedStatusEffectSkillEffect,
  ApplyPoisonStatusEffectSkillEffect,
  ApplyShieldStatusEffectSkillEffect,
  ApplyShockStatusEffectSkillEffect,
  ApplyStatusEffectSkillEffect,
  CleansableEffect,
  CleanseSkillEffect,
  DamageSkillEffect,
  HealSkillEffect,
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
  affinities: [AffinityType.beast],
  damageMultiplier: 1.8,
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
  id: "stone_skin_defense_boost",
  name: "Stone Skin Defense Boost",
  affinities: [AffinityType.gem],
  targetType: TargetType.self,
  duration: 4,
  type: SkillEffectType.adjustStat,
  stat: StatType.defense,
  direction: AdjustmentDirection.increase,
  modifierValue: 35,
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
  affinities: [AffinityType.void],
  damageMultiplier: 0.8,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined, // No duration for damage effects
};

const VenomDaggerApplyStatusEffect: ApplyPoisonStatusEffectSkillEffect = {
  id: "venom_dagger_apply_status_effect",
  name: "Venom Dagger Poison",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.poison,
  targetType: TargetType.randomEnemy,
  affinities: [AffinityType.void],
  stat: StatType.speed,
  duration: 3,
  stackable: false,
  value: 0.2,
  modifierType: ModifierType.Percentage,
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
  affinities: [AffinityType.void],
  damageMultiplier: 1.1,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined, // No duration for damage effects
};

export const QuickStabSkill: Skill = {
  id: "quick_stab",
  name: "Quick Stab",
  cost: 5,
  costStat: StatType.energy,
  effects: [QuickStabDamageEffect],
};
//-----------------------------------------------------------------------------

// Thunder Clap ---------------------------------------------------------------

const ThunderClapDamageEffect: DamageSkillEffect = {
  id: "thunder_clap_damage_effect",
  name: "Thunder Clap Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos],
  damageMultiplier: 1.2,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
  duration: undefined, // No duration for damage effects
};

const ThunderClapApplyStatusEffect: ApplyShockStatusEffectSkillEffect = {
  id: "thunder_clap_apply_status_effect",
  name: "Thunder Clap Shock",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.shock,
  targetType: TargetType.allEnemies,
  affinities: [AffinityType.chaos],
  value: 3,
  stackable: true,
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
  affinities: [AffinityType.knowledge],
  damageMultiplier: 0.8,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
  duration: undefined, // No duration for damage effects
};

const ArcaneBoltAdjustStatEffect: AdjustStatSkillEffect = {
  id: "arcane_bolt_adjust_stat_effect",
  name: "Arcane Bolt Gain Energy",
  affinities: [AffinityType.knowledge],
  targetType: TargetType.self,
  duration: 1,
  type: SkillEffectType.adjustStat,
  stat: StatType.energyGain,
  direction: AdjustmentDirection.increase,
  modifierValue: 150,
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

// Quick Heal ---------------------------------------------------------------

const QuickHealHealEffect: HealSkillEffect = {
  id: "quick_heal_heal_effect",
  name: "Quick Heal Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.radiance],
  healMultiplier: 0.6,
  healStat: StatType.magic,
  targetType: TargetType.lowestHealthAlly,
  duration: undefined,
};

export const QuickHealSkill: Skill = {
  id: "quick_heal",
  name: "Quick Heal",
  cost: 10,
  costStat: StatType.energy,
  effects: [QuickHealHealEffect],
};
//-----------------------------------------------------------------------------

// Holy Light ---------------------------------------------------------------

const HolyLightHealEffect: HealSkillEffect = {
  id: "holy_light_heal_effect",
  name: "Holy Light Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.radiance],
  healMultiplier: 0.8,
  healStat: StatType.magic,
  targetType: TargetType.lowestHealthAlly,
  duration: undefined,
};

const HolyLightCleanseEffect: CleanseSkillEffect = {
  id: "holy_light_cleanse_effect",
  name: "Holy Light Heal",
  type: SkillEffectType.cleanse,
  affinities: [AffinityType.radiance],
  cleansableEffect: CleansableEffect.statusEffect,
  count: 1,
  targetType: TargetType.lowestHealthAlly,
};

export const HolyLightSkill: Skill = {
  id: "holy_light",
  name: "Holy Light",
  cost: 25,
  costStat: StatType.energy,
  effects: [HolyLightHealEffect, HolyLightCleanseEffect],
};
//-----------------------------------------------------------------------------

// Crippling Shot ---------------------------------------------------------------

const CripplingShotDamageEffect: DamageSkillEffect = {
  id: "crippling_shot_damage_effect",
  name: "Crippling Shot Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast],
  damageMultiplier: 1,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.lowestHealthEnemy,
  duration: undefined, // No duration for damage effects
};

const CripplingShotAdjustStatEffect: AdjustStatSkillEffect = {
  id: "crippling_shot_adjust_stat_effect",
  name: "Crippling Shot Reduce Defense",
  affinities: [AffinityType.beast],
  targetType: TargetType.lowestHealthEnemy,
  duration: 2,
  type: SkillEffectType.adjustStat,
  userStat: StatType.strength,
  stat: StatType.defense,
  direction: AdjustmentDirection.decrease,
  modifierValue: 40,
};

export const CripplingShotSkill: Skill = {
  id: "crippling_shot",
  name: "Crippling Shot",
  cost: 20,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [CripplingShotDamageEffect, CripplingShotAdjustStatEffect],
};
//-----------------------------------------------------------------------------

// Deep Gash ---------------------------------------------------------------

const DeepGashDamageEffect: DamageSkillEffect = {
  id: "deep_gash_damage_effect",
  name: "Deep Gash Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast],
  damageMultiplier: 1.2,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined, // No duration for damage effects
};

const DeepGashApplyStatusEffect: ApplyBleedStatusEffectSkillEffect = {
  id: "deep_gash_apply_status_effect",
  name: "Deep Gash Bleed",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.bleed,
  targetType: TargetType.randomEnemy,
  affinities: [AffinityType.beast],
  value: 3,
  stackable: true,
};

export const DeepGashSkill: Skill = {
  id: "deep_gash",
  name: "Deep Gash",
  cost: 20,
  costStat: StatType.energy,
  effects: [DeepGashDamageEffect, DeepGashApplyStatusEffect],
};
//-----------------------------------------------------------------------------

// Spirit Ward -----------------------------------------------------------------
const SpiritWardAdjustStatEffect: AdjustStatSkillEffect = {
  id: "spirit_ward_adjusted_stat_effect",
  name: "Spirit Ward Magic Defense Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.spirit],
  targetType: TargetType.allAllies,
  userStat: StatType.magic,
  stat: StatType.magicDefense,
  direction: AdjustmentDirection.increase,
  modifierValue: 50,
  duration: 4,
};

export const SpiritWardSkill: Skill = {
  id: "spirit_ward",
  name: "Spirit Ward",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [SpiritWardAdjustStatEffect],
};
//-----------------------------------------------------------------------------

// Ethereal Barrier - gives all allies shield status effect
//-----------------------------------------------------------------------------
const EtherealBarrierApplyStatusEffect: ApplyShieldStatusEffectSkillEffect = {
  id: "ethereal_barrier_apply_status_effect",
  name: "Ethereal Barrier Shield",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.spirit],
  targetType: TargetType.allAllies,
  statusEffectType: StatusEffectType.shield,
  value: 0.5,
  stackable: true,
  stat: StatType.magic,
};

export const EtherealBarrierSkill: Skill = {
  id: "ethereal_barrier",
  name: "Ethereal Barrier",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [EtherealBarrierApplyStatusEffect],
};
//-----------------------------------------------------------------------------

// Shadow Slash - deals high damage and increases crit damage on self
//-----------------------------------------------------------------------------
const ShadowSlashDamageEffect: DamageSkillEffect = {
  id: "shadow_slash_damage_effect",
  name: "Shadow Slash Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.void],
  damageMultiplier: 2.0,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const ShadowSlashSelfCritDamageBoost: AdjustStatSkillEffect = {
  id: "shadow_slash_adjust_stat_effect",
  name: "Shadow Slash Crit Damage Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.void],
  targetType: TargetType.self,
  stat: StatType.critDamage,
  direction: AdjustmentDirection.increase,
  modifierValue: 70,
  duration: 3,
};

export const ShadowSlashSkill: Skill = {
  id: "shadow_slash",
  name: "Shadow Slash",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [ShadowSlashSelfCritDamageBoost, ShadowSlashDamageEffect],
};
//-----------------------------------------------------------------------------

// 6) Shadow Step - increases speed and crit chance on self
//-----------------------------------------------------------------------------
const ShadowStepSpeedBoost: AdjustStatSkillEffect = {
  id: "shadow_step_speed_boost",
  name: "Shadow Step Speed Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.void],
  targetType: TargetType.self,
  stat: StatType.speed,
  direction: AdjustmentDirection.increase,
  modifierValue: 50,
  duration: 3,
};

const ShadowStepCritChanceBoost: AdjustStatSkillEffect = {
  id: "shadow_step_crit_boost",
  name: "Shadow Step Crit Chance Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.void],
  targetType: TargetType.self,
  stat: StatType.critChance,
  direction: AdjustmentDirection.increase,
  modifierValue: 150,
  duration: 3,
};

export const ShadowStepSkill: Skill = {
  id: "shadow_step",
  name: "Shadow Step",
  cost: 15,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [ShadowStepSpeedBoost, ShadowStepCritChanceBoost],
};
//-----------------------------------------------------------------------------

// Piercing Arrow - reduces defense by a significant amount for 1 turn, then deals damage
//-----------------------------------------------------------------------------
const PiercingArrowDefenseDebuff: AdjustStatSkillEffect = {
  id: "piercing_arrow_adjust_stat_effect",
  name: "Piercing Arrow Defense Reduction",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.textile],
  targetType: TargetType.randomEnemy, // Or randomEnemy
  stat: StatType.defense,
  direction: AdjustmentDirection.decrease,
  modifierValue: 70,
  duration: 1,
};

const PiercingArrowDamageEffect: DamageSkillEffect = {
  id: "piercing_arrow_damage_effect",
  name: "Piercing Arrow Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.textile],
  damageMultiplier: 1.5,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

export const PiercingArrowSkill: Skill = {
  id: "piercing_arrow",
  name: "Piercing Arrow",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [PiercingArrowDefenseDebuff, PiercingArrowDamageEffect],
};
//-----------------------------------------------------------------------------

// 5) Pin Down - deals damage and reduces target's speed
//-----------------------------------------------------------------------------
const PinDownDamageEffect: DamageSkillEffect = {
  id: "pin_down_damage_effect",
  name: "Pin Down Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast], // Example affinity
  damageMultiplier: 1.1,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const PinDownSpeedDebuff: AdjustStatSkillEffect = {
  id: "pin_down_adjust_stat_effect",
  name: "Pin Down Speed Reduction",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.beast],
  targetType: TargetType.randomEnemy,
  stat: StatType.speed,
  userStat: StatType.strength,
  direction: AdjustmentDirection.decrease,
  modifierValue: 35,
  duration: 3,
};

export const PinDownSkill: Skill = {
  id: "pin_down",
  name: "Pin Down",
  cost: 15,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [PinDownDamageEffect, PinDownSpeedDebuff],
};
//-----------------------------------------------------------------------------
