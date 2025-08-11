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
} from "types/skillTypes";
import { StatType } from "types/stats";
import { StatusEffectType } from "types/statusEffects";

// =================================================================================
// Timeshaper Skills
// =================================================================================

// Timeshift - deals magic damage, and grants the user a haste buff
// ---------------------------------------------------------------------------------
const TimeshiftDamageEffect: DamageSkillEffect = {
  id: "timeshift_damage_effect",
  name: "Timeshift Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.void, AffinityType.spirit],
  damageMultiplier: 1.5,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const TimeshiftHasteBuff: ApplyStatusEffectSkillEffect = {
  id: "timeshift_haste_buff",
  name: "Timeshift Haste",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void, AffinityType.spirit],
  targetType: TargetType.self,
  statusEffectType: StatusEffectType.haste,
  value: 20,
  stackable: true,
};

const TimeshiftSlowDebuff: ApplyStatusEffectSkillEffect = {
  id: "timeshift_slow_debuff",
  name: "Timeshift Slow",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void, AffinityType.spirit],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.slow,
  value: 20, // 20% speed increase
  stackable: true,
};

export const TimeshiftSkill: Skill = {
  id: "timeshift",
  name: "Timeshift",
  cost: 25,
  costStat: StatType.energy,
  effects: [TimeshiftDamageEffect, TimeshiftHasteBuff, TimeshiftSlowDebuff],
};

// Temporal Warp - applies a slow debuff to all enemies and a haste buff to all allies
// ---------------------------------------------------------------------------------
const TemporalWarpSlowDebuff: ApplyStatusEffectSkillEffect = {
  id: "temporal_warp_slow_debuff",
  name: "Temporal Warp Slow",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void, AffinityType.spirit],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.slow,
  value: 20,
  stackable: true,
};

const TemporalWarpHasteBuff: ApplyStatusEffectSkillEffect = {
  id: "temporal_warp_haste_buff",
  name: "Temporal Warp Haste",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void, AffinityType.spirit],
  targetType: TargetType.allAllies,
  statusEffectType: StatusEffectType.haste,
  value: 20,
  stackable: true,
};

export const TemporalWarpSkill: Skill = {
  id: "temporal_warp",
  name: "Temporal Warp",
  cost: 40,
  costStat: StatType.energy,
  cooldownTurns: 4,
  effects: [TemporalWarpSlowDebuff, TemporalWarpHasteBuff],
};

// Chrono Blast - ultimate skill, deals massive magic damage to a single enemy and stuns them
// ---------------------------------------------------------------------------------
const ChronoBlastDamageEffect: DamageSkillEffect = {
  id: "chrono_blast_damage_effect",
  name: "Chrono Blast Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.void, AffinityType.spirit],
  damageMultiplier: 3.5,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const ChronoBlastStunEffect: ApplyStatusEffectSkillEffect = {
  id: "chrono_blast_stun_effect",
  name: "Chrono Blast Stun",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.stun,
  value: 1, // Stun for 1 turn
  stackable: false,
  duration: 1,
};

export const ChronoBlastSkill: Skill = {
  id: "chrono_blast",
  name: "Chrono Blast",
  cost: 100,
  costStat: StatType.energy,
  cooldownTurns: 8,
  effects: [ChronoBlastDamageEffect, ChronoBlastStunEffect],
};

// =================================================================================
// Starcaller Skills
// =================================================================================

// Gravity Well - deals magic damage and applies a slow and stun debuff to a random enemy
// ---------------------------------------------------------------------------------
const GravityWellDamageEffect: DamageSkillEffect = {
  id: "gravity_well_damage_effect",
  name: "Gravity Well Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.radiance, AffinityType.knowledge],
  damageMultiplier: 2.0,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const GravityWellStunEffect: ApplyStatusEffectSkillEffect = {
  id: "gravity_well_stun_effect",
  name: "Gravity Well Stun",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.radiance, AffinityType.knowledge],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.stun,
  value: 1,
  stackable: true,
};

export const GravityWellSkill: Skill = {
  id: "gravity_well",
  name: "Gravity Well",
  cost: 55,
  costStat: StatType.energy,
  cooldownTurns: 3,
  effects: [GravityWellDamageEffect, GravityWellStunEffect],
};

// Cosmic Shatter - deals magic damage to all enemies, ignoring some magic defense
// ---------------------------------------------------------------------------------
const CosmicShatterDamageEffect: DamageSkillEffect = {
  id: "cosmic_shatter_damage_effect",
  name: "Cosmic Shatter Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.radiance, AffinityType.knowledge],
  damageMultiplier: 1.7,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
  duration: undefined,
};

const CosmicShatterSilenceDebuff: ApplyStatusEffectSkillEffect = {
  id: "cosmic_shatter_slow_debuff",
  name: "Cosmic Shatter Silence",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.radiance, AffinityType.knowledge],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.silence,
  duration: 2,
};

export const CosmicShatterSkill: Skill = {
  id: "cosmic_shatter",
  name: "Cosmic Shatter",
  cost: 45,
  costStat: StatType.energy,
  cooldownTurns: 5,
  effects: [CosmicShatterDamageEffect, CosmicShatterSilenceDebuff],
};

// Astral Shift - ultimate skill, deals massive damage to all enemies and heals all allies
// ---------------------------------------------------------------------------------
const AstralShiftDamageEffect: DamageSkillEffect = {
  id: "astral_shift_damage_effect",
  name: "Astral Shift Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.radiance, AffinityType.knowledge],
  damageMultiplier: 2.8,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
  duration: undefined,
};

const AstralShiftHealEffect: HealSkillEffect = {
  id: "astral_shift_heal_effect",
  name: "Astral Shift Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.radiance],
  healMultiplier: 1.5,
  healStat: StatType.magic,
  targetType: TargetType.allAllies,
  duration: undefined,
};

export const AstralShiftSkill: Skill = {
  id: "astral_shift",
  name: "Astral Shift",
  cost: 100,
  costStat: StatType.energy,
  cooldownTurns: 8,
  effects: [AstralShiftDamageEffect, AstralShiftHealEffect],
};

// =================================================================================
// Soul Reaper Skills
// =================================================================================

// Soul Drain - deals magic damage and heals the user for a portion of the damage dealt
// ---------------------------------------------------------------------------------
const SoulDrainDamageEffect: DamageSkillEffect = {
  id: "soul_drain_damage_effect",
  name: "Soul Drain Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos, AffinityType.spirit],
  damageMultiplier: 1.5,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const SoulDrainHealthBoost: AdjustStatSkillEffect = {
  id: "soul_drain_health_boost",
  name: "Soul Drain Health Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.chaos, AffinityType.spirit],
  targetType: TargetType.self,
  stat: StatType.health,
  direction: AdjustmentDirection.increase,
  modifierValue: 25,
  duration: 3,
};

const SoulDrainHealthDecrease: AdjustStatSkillEffect = {
  id: "soul_drain_health_decrease",
  name: "Soul Drain Health Decrease",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.chaos, AffinityType.spirit],
  targetType: TargetType.randomEnemy,
  stat: StatType.health,
  direction: AdjustmentDirection.decrease,
  modifierValue: 25,
  duration: 3,
};

export const SoulDrainSkill: Skill = {
  id: "soul_drain",
  name: "Soul Drain",
  cost: 30,
  costStat: StatType.energy,
  effects: [
    SoulDrainDamageEffect,
    SoulDrainHealthBoost,
    SoulDrainHealthDecrease,
  ],
};

// Soul Rend - deals physical damage to an enemy and applies a bleed status effect
// ---------------------------------------------------------------------------------
const SoulRendDamageEffect: DamageSkillEffect = {
  id: "soul_rend_damage_effect",
  name: "Soul Rend Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos, AffinityType.spirit],
  damageMultiplier: 1.8,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const SoulRendBleedEffect: ApplyStatusEffectSkillEffect = {
  id: "soul_rend_bleed_effect",
  name: "Soul Rend Bleed",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.bleed,
  value: 15, // Bleed damage per turn
  stackable: true,
  duration: 3,
};

const SoulRendShockEffect: ApplyStatusEffectSkillEffect = {
  id: "soul_rend_shock_effect",
  name: "Soul Rend Shock",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.shock,
  duration: 2,
};

const SoulRendDisarmEffect: ApplyStatusEffectSkillEffect = {
  id: "soul_rend_disarm_effect",
  name: "Soul Rend Disarm",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.disarm,
  value: 1,
  stackable: true,
};

export const SoulRendSkill: Skill = {
  id: "soul_rend",
  name: "Soul Rend",
  cost: 45,
  cooldownTurns: 3,
  costStat: StatType.energy,
  effects: [
    SoulRendDamageEffect,
    SoulRendBleedEffect,
    SoulRendShockEffect,
    SoulRendDisarmEffect,
  ],
};

// Reap Soul - ultimate skill, deals massive damage to the lowest health enemy and cleanses all status effects from the user
// ---------------------------------------------------------------------------------
const ReapSoulDamageEffect: DamageSkillEffect = {
  id: "reap_soul_damage_effect",
  name: "Reap Soul Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos, AffinityType.spirit],
  damageMultiplier: 4.0,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.lowestHealthEnemy,
};

const ReapSoulCleanseEffect: CleanseSkillEffect = {
  id: "reap_soul_cleanse_effect",
  name: "Reap Soul Cleanse",
  type: SkillEffectType.cleanse,
  affinities: [AffinityType.spirit],
  targetType: TargetType.self,
  cleansableEffect: CleansableEffect.all,
  count: "all",
};

export const ReapSoulSkill: Skill = {
  id: "reap_soul",
  name: "Reap Soul",
  cost: 100,
  costStat: StatType.energy,
  cooldownTurns: 8,
  effects: [ReapSoulDamageEffect, ReapSoulCleanseEffect],
};

// =================================================================================
// Mycelial Terror Skills
// =================================================================================

// Malignant Growth - applies poison to all enemies and heals the user
// ---------------------------------------------------------------------------------
const MalignantGrowthPoisonEffect: ApplyStatusEffectSkillEffect = {
  id: "malignant_growth_poison_effect",
  name: "Malignant Growth Poison",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.beast, AffinityType.textile],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.poison,
  value: 0.6, // Poison damage per turn
  duration: 3,
};

const MalignantGrowthHealEffect: HealSkillEffect = {
  id: "malignant_growth_heal_effect",
  name: "Malignant Growth Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.beast, AffinityType.textile],
  healMultiplier: 0.7,
  healStat: StatType.defense,
  targetType: TargetType.self,
  duration: undefined,
};

export const MalignantGrowthSkill: Skill = {
  id: "malignant_growth",
  name: "Malignant Growth",
  cost: 40,
  costStat: StatType.energy,
  effects: [MalignantGrowthPoisonEffect, MalignantGrowthHealEffect],
};

// Fungal Spores - applies confusion to a random enemy and silences them
// ---------------------------------------------------------------------------------
const FungalSporesConfusionEffect: ApplyStatusEffectSkillEffect = {
  id: "fungal_spores_confusion_effect",
  name: "Fungal Spores Confusion",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.beast],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.confusion,
  value: 2,
  stackable: true,
};

const FungalSporesSilenceEffect: ApplyStatusEffectSkillEffect = {
  id: "fungal_spores_silence_effect",
  name: "Fungal Spores Silence",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.textile],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.silence,
  value: 2,
  stackable: true,
};

export const FungalSporesSkill: Skill = {
  id: "fungal_spores",
  name: "Fungal Spores",
  cost: 20,
  costStat: StatType.energy,
  cooldownTurns: 3,
  effects: [FungalSporesConfusionEffect, FungalSporesSilenceEffect],
};

// Contagion - ultimate skill, deals damage over time to all enemies and spreads all debuffs from the user to all enemies
// ---------------------------------------------------------------------------------
const ContagionPoisonEffect: ApplyStatusEffectSkillEffect = {
  id: "contagion_poison_effect",
  name: "Contagion Poison",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.beast, AffinityType.textile],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.poison,
  value: 20, // Poison damage per turn
  stackable: true,
  duration: 4,
};

const ContagionBleedEffect: ApplyStatusEffectSkillEffect = {
  id: "contagion_bleed_effect",
  name: "Contagion Bleed",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.beast, AffinityType.textile],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.bleed,
  value: 20, // Bleed damage per turn
  stackable: true,
  duration: 4,
};

export const ContagionSkill: Skill = {
  id: "contagion",
  name: "Contagion",
  cost: 100,
  costStat: StatType.energy,
  cooldownTurns: 8,
  effects: [ContagionPoisonEffect, ContagionBleedEffect],
};

// =================================================================================
// Reality Bender Skills
// =================================================================================

// Warped Reality - applies a confusion effect on all enemies and reduces their critChance
// ---------------------------------------------------------------------------------
const WarpedRealityDamageEffect: DamageSkillEffect = {
  id: "warped_reality_damage_effect",
  name: "Warped Reality Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos, AffinityType.knowledge],
  damageMultiplier: 0.8,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.allEnemies,
};
const WarpedRealityConfusionEffect: ApplyStatusEffectSkillEffect = {
  id: "warped_reality_confusion_effect",
  name: "Warped Reality Confusion",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos, AffinityType.knowledge],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.confusion,
  value: 1,
  stackable: true,
};

const WarpedRealityShockEffect: ApplyStatusEffectSkillEffect = {
  id: "warped_reality_confusion_effect",
  name: "Warped Reality Confusion",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos, AffinityType.knowledge],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.shock,
  value: 3,
  stackable: true,
};

export const WarpedRealitySkill: Skill = {
  id: "warped_reality",
  name: "Warped Reality",
  cost: 40,
  costStat: StatType.energy,
  cooldownTurns: 3,
  effects: [
    WarpedRealityDamageEffect,
    WarpedRealityConfusionEffect,
    WarpedRealityShockEffect,
  ],
};

// Dimensional Rift - deals magic damage to a random enemy, and has a chance to stun them
// ---------------------------------------------------------------------------------
const DimensionalRiftDamageEffect: DamageSkillEffect = {
  id: "dimensional_rift_damage_effect",
  name: "Dimensional Rift Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos, AffinityType.knowledge],
  damageMultiplier: 2.1,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const DimensionalRiftBrittleEffect: ApplyStatusEffectSkillEffect = {
  id: "dimensional_rift_brittle_effect",
  name: "Dimensional Rift Brittle",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos, AffinityType.knowledge],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.brittle,
  value: 35,
  stackable: true,
};

export const DimensionalRiftSkill: Skill = {
  id: "dimensional_rift",
  name: "Dimensional Rift",
  cost: 45,
  cooldownTurns: 2,
  costStat: StatType.energy,
  effects: [DimensionalRiftDamageEffect, DimensionalRiftBrittleEffect],
};

// Eldritch Torrent - ultimate skill, deals massive magic damage to all enemies, and applies a burn effect
// ---------------------------------------------------------------------------------
const EldritchTorrentDamageEffect: DamageSkillEffect = {
  id: "eldritch_torrent_damage_effect",
  name: "Eldritch Torrent Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos, AffinityType.knowledge],
  damageMultiplier: 3.0,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
  duration: undefined,
};

const EldritchTorrentBurnEffect: ApplyStatusEffectSkillEffect = {
  id: "eldritch_torrent_burn_effect",
  name: "Eldritch Torrent Burn",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.burn,
  value: 20,
  stackable: true,
  duration: 3,
};

export const EldritchTorrentSkill: Skill = {
  id: "eldritch_torrent",
  name: "Eldritch Torrent",
  cost: 100,
  costStat: StatType.energy,
  cooldownTurns: 8,
  effects: [EldritchTorrentDamageEffect, EldritchTorrentBurnEffect],
};
