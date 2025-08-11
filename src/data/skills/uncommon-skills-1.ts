import { AffinityType } from "types/affinity";
import {
  DamageSkillEffect,
  SkillEffectType,
  TargetType,
  AdjustStatSkillEffect,
  ModifierType,
  Skill,
  ApplyStatusEffectSkillEffect,
  HealSkillEffect,
  CleanseSkillEffect,
  CleansableEffect,
  AdjustmentDirection,
  ApplyBurnStatusEffectSkillEffect,
  ApplyShieldStatusEffectSkillEffect,
  ApplyBrittleStatusEffectSkillEffect,
  ApplyBleedStatusEffectSkillEffect,
  ApplyConfusionStatusEffectSkillEffect,
  ApplyPoisonStatusEffectSkillEffect,
  ApplyStunStatusEffectSkillEffect,
  ApplyDisarmStatusEffectSkillEffect,
} from "types/skillTypes";
import { StatType } from "types/stats";
import { StatusEffectType } from "types/statusEffects";

// Steel Breaker - deals damage and reduces defense
//-----------------------------------------------------------------------------
const SteelBreakerDamageEffect: DamageSkillEffect = {
  id: "steel_breaker_damage_effect",
  name: "Steel Breaker Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.gem],
  damageMultiplier: 1.5,
  damageStat: StatType.defense,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const SteelBreakerDefenseDebuff: AdjustStatSkillEffect = {
  id: "steel_breaker_defense_debuff",
  name: "Steel Breaker Defense Reduction",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem],
  targetType: TargetType.randomEnemy,
  stat: StatType.defense,
  direction: AdjustmentDirection.decrease,
  modifierValue: 30, // Reduce defense by 30%
  duration: 3,
};

export const SteelBreakerSkill: Skill = {
  id: "steel_breaker",
  name: "Steel Breaker",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [SteelBreakerDamageEffect, SteelBreakerDefenseDebuff],
};
//-----------------------------------------------------------------------------

// Burning Blade - deals damage and applies Burn
//-----------------------------------------------------------------------------
const BurningBladeDamageEffect: DamageSkillEffect = {
  id: "burning_blade_damage_effect",
  name: "Burning Blade Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.gem],
  damageMultiplier: 1.2,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const BurningBladeApplyBurn: ApplyBurnStatusEffectSkillEffect = {
  id: "burning_blade_apply_burn",
  name: "Burning Blade Burn",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.burn,
  value: 15,
  stackable: true,
};

export const BurningBladeSkill: Skill = {
  id: "burning_blade",
  name: "Burning Blade",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [BurningBladeDamageEffect, BurningBladeApplyBurn],
};
//-----------------------------------------------------------------------------

// Frost Guardian - increases defense and gives shield
//-----------------------------------------------------------------------------
const FrostGuardianDefenseBoost: AdjustStatSkillEffect = {
  id: "frost_guard_defense_boost",
  name: "Frost Guardian Defense Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem],
  targetType: TargetType.self,
  stat: StatType.defense,
  direction: AdjustmentDirection.increase,
  modifierValue: 50,
  duration: 4,
};

const FrostGuardianApplyShield: ApplyShieldStatusEffectSkillEffect = {
  id: "frost_guard_shield_boost",
  name: "Frost Guardian Shield",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem],
  targetType: TargetType.self,
  statusEffectType: StatusEffectType.shield,
  value: 0.8,
  stackable: true,
  stat: StatType.defense,
};

export const FrostGuardianSkill: Skill = {
  id: "frost_guardian",
  name: "Frost Guardian",
  cost: 30,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [FrostGuardianDefenseBoost, FrostGuardianApplyShield],
};
//-----------------------------------------------------------------------------

// Icicle Shield - gives shield and reduces speed on self (debuff)
//-----------------------------------------------------------------------------
const IcicleShieldApplyShield: ApplyShieldStatusEffectSkillEffect = {
  id: "icicle_shield_apply_shield",
  name: "Icicle Shield",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem],
  targetType: TargetType.self,
  statusEffectType: StatusEffectType.shield,
  value: 0.65,
  stackable: true,
  stat: StatType.defense,
};

const IcicleShieldApplyBrittle: ApplyBrittleStatusEffectSkillEffect = {
  id: "icicle_shield_apply_brittle",
  name: "Icicle Shield",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.brittle,
  value: 20,
  stackable: true,
};

export const IcicleShieldSkill: Skill = {
  id: "icicle_shield",
  name: "Icicle Shield",
  cost: 20,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [IcicleShieldApplyShield, IcicleShieldApplyBrittle],
};
//-----------------------------------------------------------------------------

// Pyre Blast - AoE magic damage and applies Burn
//-----------------------------------------------------------------------------
const PyreBlastDamageEffect: DamageSkillEffect = {
  id: "pyre_blast_damage_effect",
  name: "Pyre Blast Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.knowledge],
  damageMultiplier: 1.1,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
  duration: undefined,
};

const PyreBlastApplyBurn: ApplyBurnStatusEffectSkillEffect = {
  id: "pyre_blast_apply_burn",
  name: "Pyre Blast Burn",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.knowledge],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.burn,
  value: 12,
  stackable: true,
};

export const PyreBlastSkill: Skill = {
  id: "pyre_blast",
  name: "Pyre Blast",
  cost: 15,
  costStat: StatType.energy,
  cooldownTurns: 4,
  effects: [PyreBlastDamageEffect, PyreBlastApplyBurn],
};
//-----------------------------------------------------------------------------

// Fire Wall - applies Burn and reduces defense on all enemies
//-----------------------------------------------------------------------------
const FireWallApplyBurn: ApplyBurnStatusEffectSkillEffect = {
  id: "fire_wall_apply_burn",
  name: "Fire Wall Burn",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.knowledge],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.burn,
  value: 12,
  stackable: true,
};

const FireWallApplyShield: ApplyShieldStatusEffectSkillEffect = {
  id: "fire_wall_apply_shield",
  name: "Fire Wall Apply Shield",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.knowledge],
  targetType: TargetType.allAllies,
  statusEffectType: StatusEffectType.shield,
  value: 0.4,
  stackable: true,
  stat: StatType.magic,
};

export const FireWallSkill: Skill = {
  id: "fire_wall",
  name: "Fire Wall",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [FireWallApplyBurn, FireWallApplyShield],
};
//-----------------------------------------------------------------------------

// Ice Blast - magic damage and applies Slow
//-----------------------------------------------------------------------------
const IceBlastDamageEffect: DamageSkillEffect = {
  id: "ice_blast_damage_effect",
  name: "Ice Blast Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.spirit],
  damageMultiplier: 1.3,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const IceBlastApplyBrittle: ApplyBrittleStatusEffectSkillEffect = {
  id: "ice_blast_apply_brittle",
  name: "Ice Blast Brittle",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.spirit],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.brittle,
  value: 20,
  stackable: true,
};

export const IceBlastSkill: Skill = {
  id: "ice_blast",
  name: "Ice Blast",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [IceBlastDamageEffect, IceBlastApplyBrittle],
};
//-----------------------------------------------------------------------------

// Cryo Spike - magic damage and applies Brittle
//-----------------------------------------------------------------------------
const CryoSpikeApplyBrittle: ApplyBrittleStatusEffectSkillEffect = {
  id: "cryo_spike_apply_brittle",
  name: "Cryo Spike Brittle",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.spirit],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.brittle,
  value: 80,
  stackable: true,
};

export const CryoSpikeSkill: Skill = {
  id: "cryo_spike",
  name: "Cryo Spike",
  cost: 15,
  costStat: StatType.energy,
  cooldownTurns: 3,
  effects: [CryoSpikeApplyBrittle],
};
//-----------------------------------------------------------------------------

// Radiant Ward - increases magic defense and heals self
//-----------------------------------------------------------------------------
const RadiantWardMagicDefenseBoost: AdjustStatSkillEffect = {
  id: "radiant_ward_magic_defense_boost",
  name: "Radiant Ward Magic Defense Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.radiance],
  targetType: TargetType.allAllies,
  userStat: StatType.magic,
  stat: StatType.magicDefense,
  direction: AdjustmentDirection.increase,
  modifierValue: 55,
  duration: 4,
};

const RadiantWardHealEffect: HealSkillEffect = {
  id: "radiant_ward_heal_effect",
  name: "Radiant Ward Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.radiance],
  healMultiplier: 0.8,
  healStat: StatType.magic,
  targetType: TargetType.allAllies,
  duration: undefined,
};

export const RadiantWardSkill: Skill = {
  id: "radiant_ward",
  name: "Radiant Ward",
  cost: 35,
  costStat: StatType.energy,
  cooldownTurns: 3,
  effects: [RadiantWardMagicDefenseBoost, RadiantWardHealEffect],
};
//-----------------------------------------------------------------------------

// Radiant Rays - AoE magic damage and cleanses debuffs from allies
//-----------------------------------------------------------------------------
const RadiantRaysDamageEffect: DamageSkillEffect = {
  id: "radiant_rays_damage_effect",
  name: "Radiant Rays Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.radiance],
  damageMultiplier: 1.3,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
  duration: undefined,
};

const RadiantRaysCleanseEffect: CleanseSkillEffect = {
  id: "radiant_rays_cleanse_effect",
  name: "Radiant Rays Cleanse",
  type: SkillEffectType.cleanse,
  affinities: [AffinityType.radiance],
  cleansableEffect: CleansableEffect.all,
  count: 2,
  targetType: TargetType.allAllies,
};

export const RadiantRaysSkill: Skill = {
  id: "radiant_rays",
  name: "Radiant Rays",
  cost: 30,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [RadiantRaysDamageEffect, RadiantRaysCleanseEffect],
};
//-----------------------------------------------------------------------------

// Shadow Heal - heals target with a bleed trade-off
//-----------------------------------------------------------------------------
const ShadowHealEffect: HealSkillEffect = {
  id: "shadow_heal_heal_effect",
  name: "Shadow Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.void],
  healMultiplier: 1.8,
  healStat: StatType.magic,
  targetType: TargetType.lowestHealthAlly,
  duration: undefined,
};

const ShadowHealTargetBleed: ApplyBleedStatusEffectSkillEffect = {
  id: "shadow_heal_apply_bleed",
  name: "Shadow Heal Self Bleed",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void],
  targetType: TargetType.lowestHealthAlly,
  statusEffectType: StatusEffectType.bleed,
  value: 3,
  stackable: true,
};

export const ShadowHealSkill: Skill = {
  id: "shadow_heal",
  name: "Shadow Heal",
  cost: 20,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [ShadowHealEffect, ShadowHealTargetBleed],
};
//-----------------------------------------------------------------------------

// Mind Corruption - magic damage and applies Confusion
//-----------------------------------------------------------------------------
const MindCorruptionDamageEffect: DamageSkillEffect = {
  id: "mind_corruption",
  name: "Mind Corruption Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.void],
  damageMultiplier: 1.2,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const MindCorruptionApplyConfusion: ApplyConfusionStatusEffectSkillEffect = {
  id: "mind_corruption_apply_confusion",
  name: "Mind Corruption Confusion",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.confusion,
  value: 1,
  stackable: true,
};

export const MindCorruptionSkill: Skill = {
  id: "mind_corruption",
  name: "Mind Corruption",
  cost: 20,
  costStat: StatType.energy,
  cooldownTurns: 2,
  effects: [MindCorruptionDamageEffect, MindCorruptionApplyConfusion],
};
//-----------------------------------------------------------------------------

// Life Drain - magic damage and heals self for a portion
//-----------------------------------------------------------------------------
const LifeDrainDamageEffect: DamageSkillEffect = {
  id: "life_drain_damage_effect",
  name: "Life Drain Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.void],
  damageMultiplier: 1.2,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const LifeDrainSelfHeal: HealSkillEffect = {
  id: "life_drain_self_heal",
  name: "Life Drain Self Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.void],
  healMultiplier: 0.6,
  healStat: StatType.magic,
  targetType: TargetType.self,
  duration: undefined,
};

export const LifeDrainSkill: Skill = {
  id: "life_drain",
  name: "Life Drain",
  cost: 30,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [LifeDrainDamageEffect, LifeDrainSelfHeal],
};
//-----------------------------------------------------------------------------

// Terrible Toxin - applies Poison and reduces defense
//-----------------------------------------------------------------------------
const TerribleToxinApplyPoison: ApplyPoisonStatusEffectSkillEffect = {
  id: "terrible_toxin_apply_poison",
  name: "Terrible Toxin Poison",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.poison,
  stat: StatType.magic,
  value: 0.8, // Poison damage per turn
  duration: 2,
  stackable: false,
};

const TerribleToxinMagicDefenseDebuff: AdjustStatSkillEffect = {
  id: "terrible_toxin_magic_defense_debuff",
  name: "Terrible Toxin Magic Defense Reduction",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.void],
  targetType: TargetType.randomEnemy,
  stat: StatType.magicDefense,
  direction: AdjustmentDirection.decrease,
  modifierValue: 35,
  duration: 3,
};

export const TerribleToxinSkill: Skill = {
  id: "terrible_toxin",
  name: "Terrible Toxin",
  cost: 30,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [TerribleToxinApplyPoison, TerribleToxinMagicDefenseDebuff],
};
//-----------------------------------------------------------------------------

// Fiery Rage - increases strength and crit chance on self
//-----------------------------------------------------------------------------
const FieryRageStrengthBoost: AdjustStatSkillEffect = {
  id: "fiery_rage_strength_boost",
  name: "Fiery Rage Strength Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.chaos],
  targetType: TargetType.self,
  stat: StatType.strength,
  direction: AdjustmentDirection.increase,
  modifierValue: 50,
  duration: 3,
};

const FieryRageCritChanceBoost: AdjustStatSkillEffect = {
  id: "fiery_rage_crit_chance_boost",
  name: "Fiery Rage Crit Chance Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.chaos],
  targetType: TargetType.self,
  stat: StatType.critChance,
  direction: AdjustmentDirection.increase,
  modifierValue: 200,
  duration: 3,
};

export const FieryRageSkill: Skill = {
  id: "fiery_rage",
  name: "Fiery Rage",
  cost: 20,
  costStat: StatType.energy,
  cooldownTurns: 2,
  effects: [FieryRageStrengthBoost, FieryRageCritChanceBoost],
};
//-----------------------------------------------------------------------------

// Infernal Chains - deals damage and applies Stun
//-----------------------------------------------------------------------------
const InfernalChainsDamageEffect: DamageSkillEffect = {
  id: "infernal_chains_damage_effect",
  name: "Infernal Chains Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos],
  damageMultiplier: 1.4,
  damageStat: StatType.strength,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const InfernalChainsApplyStun: ApplyStunStatusEffectSkillEffect = {
  id: "infernal_chains_apply_stun",
  name: "Infernal Chains Stun",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.stun,
  value: 1,
  stackable: true,
};

export const InfernalChainsSkill: Skill = {
  id: "infernal_chains",
  name: "Infernal Chains",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 4,
  effects: [InfernalChainsDamageEffect, InfernalChainsApplyStun],
};
//-----------------------------------------------------------------------------

// Dark Flame - magic damage, applies Burn and Bleed
//-----------------------------------------------------------------------------
const DarkFlameDamageEffect: DamageSkillEffect = {
  id: "dark_flame_damage_effect",
  name: "Dark Flame Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos],
  damageMultiplier: 1.3,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const DarkFlameApplyBurn: ApplyBurnStatusEffectSkillEffect = {
  id: "dark_flame_apply_burn",
  name: "Dark Flame Burn",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.burn,
  value: 10,
  stackable: true,
};

const DarkFlameApplyBleed: ApplyBleedStatusEffectSkillEffect = {
  id: "dark_flame_apply_bleed",
  name: "Dark Flame Bleed",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.bleed,
  value: 3,
  stackable: true,
};

export const DarkFlameSkill: Skill = {
  id: "dark_flame",
  name: "Dark Flame",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [DarkFlameDamageEffect, DarkFlameApplyBurn, DarkFlameApplyBleed],
};
//-----------------------------------------------------------------------------

// Burning Corruption - applies Burn and Poison
//-----------------------------------------------------------------------------
const BurningCorruptionApplyBurn: ApplyBurnStatusEffectSkillEffect = {
  id: "burning_corruption_apply_burn",
  name: "Burning Corruption Burn",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.burn,
  value: 10,
  stackable: true,
};

const BurningCorruptionApplyPoison: ApplyPoisonStatusEffectSkillEffect = {
  id: "burning_corruption_apply_poison",
  name: "Burning Corruption Poison",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.poison,
  modifierType: ModifierType.Percentage,
  stat: StatType.magic,
  value: 0.6,
  duration: 3,
  stackable: false,
};

export const BurningCorruptionSkill: Skill = {
  id: "burning_corruption",
  name: "Burning Corruption",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [BurningCorruptionApplyBurn, BurningCorruptionApplyPoison],
};
//-----------------------------------------------------------------------------

// Blood Pact - increases strength on self, takes damage
//-----------------------------------------------------------------------------
const BloodPactStrengthBoost: AdjustStatSkillEffect = {
  id: "blood_pact_strength_boost",
  name: "Blood Pact Strength Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.beast],
  targetType: TargetType.self,
  userStat: StatType.health,
  stat: StatType.strength,
  direction: AdjustmentDirection.increase,
  modifierValue: 25,
  duration: 4,
};

const BloodPactEnergyGainBoost: AdjustStatSkillEffect = {
  id: "blood_pact_energy_gain_boost",
  name: "Blood Pact Energy Gain Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.beast],
  targetType: TargetType.self,
  stat: StatType.energyGain,
  direction: AdjustmentDirection.increase,
  modifierValue: 100,
  duration: 2,
};

const BloodPactSelfDamage: DamageSkillEffect = {
  id: "blood_pact_self_damage",
  name: "Blood Pact Self Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast],
  damageMultiplier: 0.25, // Deals 20% of strength as damage to self
  damageStat: StatType.health, // Use strength to calculate self-damage
  defenseStat: StatType.health, // Not directly used for self-damage in this context, but required by type
  targetType: TargetType.self,
  duration: undefined,
};

export const BloodPactSkill: Skill = {
  id: "blood_pact",
  name: "Blood Pact",
  cost: 0, // No energy cost, but health cost
  costStat: StatType.energy, // Still use energy for consistency, but the damage effect is the real cost
  cooldownTurns: 2,
  effects: [
    BloodPactStrengthBoost,
    BloodPactEnergyGainBoost,
    BloodPactSelfDamage,
  ],
};
//-----------------------------------------------------------------------------

// Sanguinate - deals damage and heals self for a portion
//-----------------------------------------------------------------------------
const SanguinateDamageEffect: DamageSkillEffect = {
  id: "sanguinate_damage_effect",
  name: "Sanguinate Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast],
  damageMultiplier: 1.0,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const SanguinateSelfHeal: HealSkillEffect = {
  id: "sanguinate_self_heal",
  name: "Sanguinate Self Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.beast],
  healMultiplier: 0.3,
  healStat: StatType.strength,
  targetType: TargetType.self,
  duration: undefined,
};

const SanguinateEnergyGainDebuff: AdjustStatSkillEffect = {
  id: "sanguinate_energy_gain_debuff",
  name: "Sanguinate Strength Debuff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.beast],
  targetType: TargetType.randomEnemy,
  stat: StatType.energyGain,
  direction: AdjustmentDirection.decrease,
  modifierValue: 40,
  duration: 3,
};

export const SanguinateSkill: Skill = {
  id: "sanguinate",
  name: "Sanguinate",
  cost: 30,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [
    SanguinateDamageEffect,
    SanguinateEnergyGainDebuff,
    SanguinateSelfHeal,
  ],
};
//-----------------------------------------------------------------------------

// Break Weapon - reduces strength and applies Disarm
//-----------------------------------------------------------------------------
const BreakWeaponApplyDisarm: ApplyDisarmStatusEffectSkillEffect = {
  id: "break_weapon_disarm",
  name: "Break Weapon Disarm",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.textile],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.disarm, // Assuming 'disarm' is a defined StatusEffectType
  value: 2,
  stackable: true,
};

export const BreakWeaponSkill: Skill = {
  id: "break_weapon",
  name: "Break Weapon",
  cost: 15,
  costStat: StatType.energy,
  cooldownTurns: 3,
  effects: [BreakWeaponApplyDisarm],
};
//-----------------------------------------------------------------------------

// Targeted Strike - deals high damage to lowest health enemy
//-----------------------------------------------------------------------------
const TargetedStrikeDamageEffect: DamageSkillEffect = {
  id: "targeted_strike_damage_effect",
  name: "Targeted Strike Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.textile],
  damageMultiplier: 2.2,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.lowestHealthEnemy,
  duration: undefined,
};

export const TargetedStrikeSkill: Skill = {
  id: "targeted_strike",
  name: "Targeted Strike",
  cost: 30,
  costStat: StatType.energy,
  cooldownTurns: 4,
  effects: [TargetedStrikeDamageEffect],
};
//-----------------------------------------------------------------------------
