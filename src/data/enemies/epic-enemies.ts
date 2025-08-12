import { AffinityType } from "../../types/affinity";
import { EnemyCharacter } from "../../types/enemy";
import { Rarity } from "../../types/rarity";
import {
  AdjustmentDirection,
  AdjustStatSkillEffect,
  ApplyBurnStatusEffectSkillEffect,
  ApplyBleedStatusEffectSkillEffect,
  ApplyBrittleStatusEffectSkillEffect,
  ApplyPoisonStatusEffectSkillEffect,
  ApplySlowStatusEffectSkillEffect,
  DamageSkillEffect,
  HealSkillEffect,
  Skill,
  SkillEffectType,
  TargetType,
  ApplyStatusEffectSkillEffect,
  CleansableEffect,
  CleanseSkillEffect,
} from "../../types/skillTypes";
import { StatType } from "../../types/stats";
import { StatusEffectType } from "../../types/statusEffects";
import { BASELINE } from "../statBaselines";

//----------------------------------------------------------------------------
// Epic Enemies
//----------------------------------------------------------------------------

// 1) Temporal Horror - A monstrous entity that bends time to attack enemies and slow them down.
const TimeWarpDamageEffect: DamageSkillEffect = {
  id: "time_warp_damage_effect",
  name: "Time Warp Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.knowledge, AffinityType.void],
  damageMultiplier: 1.8,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
};

const TimeWarpSlowEffect: ApplySlowStatusEffectSkillEffect = {
  id: "time_warp_slow_effect",
  name: "Time Warp Slow",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.knowledge, AffinityType.void],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.slow,
  value: 20,
  stackable: true,
};

export const ENEMY_TEMPORAL_HORROR: EnemyCharacter = {
  id: "temporal_horror",
  name: "Temporal Horror",
  rarity: Rarity.EPIC,
  strongAffinities: [AffinityType.knowledge, AffinityType.void],
  weakAffinities: [AffinityType.chaos, AffinityType.radiance],
  stats: {
    [StatType.health]: BASELINE.EPIC[StatType.health] + 50,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.EPIC[StatType.energyGain] + 3,
    [StatType.strength]: BASELINE.EPIC[StatType.strength] - 30,
    [StatType.defense]: BASELINE.EPIC[StatType.defense] + 40,
    [StatType.magic]: BASELINE.EPIC[StatType.magic] + 45,
    [StatType.magicDefense]: BASELINE.EPIC[StatType.magicDefense] + 40,
    [StatType.speed]: BASELINE.EPIC[StatType.speed] + 10,
    [StatType.critChance]: BASELINE.EPIC[StatType.critChance],
    [StatType.critDamage]: BASELINE.EPIC[StatType.critDamage],
  },
  skills: [
    {
      id: "time_warp",
      name: "Time Warp",
      cost: 50,
      costStat: StatType.energy,
      cooldownTurns: 4,
      effects: [TimeWarpDamageEffect, TimeWarpSlowEffect],
    } as Skill,
  ],
};

// 2) Inferno Dragon - A colossal dragon that burns all enemies.
const DragonsInfernoDamageEffect: DamageSkillEffect = {
  id: "dragons_inferno_damage_effect",
  name: "Dragon's Inferno Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos, AffinityType.beast],
  damageMultiplier: 1.75,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
};

const DragonsInfernoBurnEffect: ApplyBurnStatusEffectSkillEffect = {
  id: "dragons_inferno_burn_effect",
  name: "Dragon's Inferno Burn",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos, AffinityType.beast],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.burn,
  value: 15,
  stackable: true,
};

const DragonsInfernoAttackReductionEffect: AdjustStatSkillEffect = {
  id: "shadow_shroud_attack_reduction_effect",
  name: "Shadow Shroud Attack Reduction",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.textile],
  targetType: TargetType.allEnemies,
  userStat: StatType.magic,
  stat: StatType.strength,
  direction: AdjustmentDirection.decrease,
  modifierValue: 0.25,
  duration: 3,
};

export const ENEMY_INFERNO_DRAGON: EnemyCharacter = {
  id: "inferno_dragon",
  name: "Inferno Dragon",
  rarity: Rarity.EPIC,
  strongAffinities: [AffinityType.chaos, AffinityType.beast],
  weakAffinities: [AffinityType.radiance, AffinityType.gem],
  stats: {
    [StatType.health]: BASELINE.EPIC[StatType.health] + 100,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.EPIC[StatType.energyGain] + 4,
    [StatType.strength]: BASELINE.EPIC[StatType.strength] + 20,
    [StatType.defense]: BASELINE.EPIC[StatType.defense] + 20,
    [StatType.magic]: BASELINE.EPIC[StatType.magic] + 60,
    [StatType.magicDefense]: BASELINE.EPIC[StatType.magicDefense] + 30,
    [StatType.speed]: BASELINE.EPIC[StatType.speed] - 20,
    [StatType.critChance]: BASELINE.EPIC[StatType.critChance] + 15,
    [StatType.critDamage]: BASELINE.EPIC[StatType.critDamage] + 25,
  },
  skills: [
    {
      id: "dragons_inferno",
      name: "Dragon's Inferno",
      cost: 60,
      costStat: StatType.energy,
      effects: [
        DragonsInfernoDamageEffect,
        DragonsInfernoBurnEffect,
        DragonsInfernoAttackReductionEffect,
      ],
    } as Skill,
  ],
};

// 3) Eldritch Abomination - A chaotic entity that applies poison to all enemies.
const CosmicCorruptionDamageEffect: DamageSkillEffect = {
  id: "cosmic_corruption_damage_effect",
  name: "Cosmic Corruption Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos, AffinityType.textile],
  damageMultiplier: 1.75,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.allEnemies,
};

const CosmicCorruptionPoisonEffect: ApplyPoisonStatusEffectSkillEffect = {
  id: "cosmic_corruption_poison_effect",
  name: "Cosmic Corruption Poison",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos, AffinityType.textile],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.poison,
  stat: StatType.strength,
  value: 0.35,
  duration: 3,
  stackable: false,
};

const CosmicCorruptionDefenseDebuff: AdjustStatSkillEffect = {
  id: "cosmic_corruption_defense_debuff",
  name: "Cosmic Corruption Defense Debuff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.chaos, AffinityType.textile],
  targetType: TargetType.allEnemies,
  stat: StatType.defense,
  direction: AdjustmentDirection.decrease,
  modifierValue: 30,
  duration: 3,
};

export const ENEMY_ELDRITCH_ABOMINATION: EnemyCharacter = {
  id: "eldritch_abomination",
  name: "Eldritch Abomination",
  rarity: Rarity.EPIC,
  strongAffinities: [AffinityType.chaos, AffinityType.textile],
  weakAffinities: [AffinityType.knowledge, AffinityType.radiance],
  stats: {
    [StatType.health]: BASELINE.EPIC[StatType.health] + 80,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.EPIC[StatType.energyGain] + 4,
    [StatType.strength]: BASELINE.EPIC[StatType.strength] + 40,
    [StatType.defense]: BASELINE.EPIC[StatType.defense] + 30,
    [StatType.magic]: BASELINE.EPIC[StatType.magic] + 30,
    [StatType.magicDefense]: BASELINE.EPIC[StatType.magicDefense] + 20,
    [StatType.speed]: BASELINE.EPIC[StatType.speed] - 10,
    [StatType.critChance]: BASELINE.EPIC[StatType.critChance] + 10,
    [StatType.critDamage]: BASELINE.EPIC[StatType.critDamage] + 10,
  },
  skills: [
    {
      id: "cosmic_corruption",
      name: "Cosmic Corruption",
      cost: 65,
      cooldownTurns: 3,
      costStat: StatType.energy,
      effects: [
        CosmicCorruptionDamageEffect,
        CosmicCorruptionPoisonEffect,
        CosmicCorruptionDefenseDebuff,
      ],
    } as Skill,
  ],
};

// 4) Storm Elemental - A swift elemental that shocks a random enemy.
const StaticDischargeDamageEffect: DamageSkillEffect = {
  id: "static_discharge_damage_effect",
  name: "Static Discharge Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.spirit, AffinityType.radiance],
  damageMultiplier: 2.1,
  damageStat: StatType.speed,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
};

const StaticDischargeShockEffect: ApplyStatusEffectSkillEffect = {
  id: "static_discharge_shock_effect",
  name: "Static Discharge Shock",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.spirit, AffinityType.radiance],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.shock,
  value: 3,
  stackable: true,
};

const StaticDischargeCleanseSelf: CleanseSkillEffect = {
  id: "static_discharge_cleanse_self",
  name: "Static Discharge Cleanse Self",
  type: SkillEffectType.cleanse,
  affinities: [AffinityType.spirit, AffinityType.radiance],
  targetType: TargetType.self,
  cleansableEffect: CleansableEffect.all,
  count: "all",
};

export const ENEMY_STORM_ELEMENTAL: EnemyCharacter = {
  id: "storm_elemental",
  name: "Storm Elemental",
  rarity: Rarity.EPIC,
  strongAffinities: [AffinityType.spirit, AffinityType.radiance],
  weakAffinities: [AffinityType.textile, AffinityType.gem],
  stats: {
    [StatType.health]: BASELINE.EPIC[StatType.health] - 20,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.EPIC[StatType.energyGain] + 4,
    [StatType.strength]: BASELINE.EPIC[StatType.strength] + 20,
    [StatType.defense]: BASELINE.EPIC[StatType.defense] - 10,
    [StatType.magic]: BASELINE.EPIC[StatType.magic] + 20,
    [StatType.magicDefense]: BASELINE.EPIC[StatType.magicDefense] + 30,
    [StatType.speed]: BASELINE.EPIC[StatType.speed] + 70,
    [StatType.critChance]: BASELINE.EPIC[StatType.critChance] + 25,
    [StatType.critDamage]: BASELINE.EPIC[StatType.critDamage] + 20,
  },
  skills: [
    {
      id: "static_discharge",
      name: "Static Discharge",
      cost: 55,
      costStat: StatType.energy,
      effects: [
        StaticDischargeDamageEffect,
        StaticDischargeShockEffect,
        StaticDischargeCleanseSelf,
      ],
    } as Skill,
  ],
};

// 5) Mountain Shambler - A terrifying monster made of rock that applies brittle to all enemies.
const GeodeBurstDamageEffect: DamageSkillEffect = {
  id: "geode_burst_damage_effect",
  name: "Geode Burst Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.gem, AffinityType.textile],
  damageMultiplier: 1.5,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.allEnemies,
};

const GeodeBurstBrittleEffect: ApplyBrittleStatusEffectSkillEffect = {
  id: "geode_burst_brittle_effect",
  name: "Geode Burst Brittle",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem, AffinityType.textile],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.brittle,
  value: 45,
  duration: 3,
  stackable: true,
};

const GeodeBurstDamage2Effect: DamageSkillEffect = {
  id: "geode_burst_damage2_effect",
  name: "Geode Burst Damage2",
  type: SkillEffectType.damage,
  affinities: [AffinityType.gem, AffinityType.textile],
  damageMultiplier: 1.2,
  damageStat: StatType.defense,
  defenseStat: StatType.defense,
  targetType: TargetType.allEnemies,
};

const GeodeBurstHealSelf: HealSkillEffect = {
  id: "geode_burst_heal_self",
  name: "Geode Burst Heal Self",
  type: SkillEffectType.heal,
  affinities: [AffinityType.gem, AffinityType.textile],
  targetType: TargetType.self,
  healMultiplier: 0.5,
  healStat: StatType.defense,
};

export const ENEMY_MOUNTAIN_SHAMBLER: EnemyCharacter = {
  id: "mountain_shambler",
  name: "Mountain Shambler",
  rarity: Rarity.EPIC,
  strongAffinities: [AffinityType.gem, AffinityType.textile],
  weakAffinities: [AffinityType.spirit, AffinityType.chaos],
  stats: {
    [StatType.health]: BASELINE.EPIC[StatType.health] + 120,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.EPIC[StatType.energyGain] - 1,
    [StatType.strength]: BASELINE.EPIC[StatType.strength] + 50,
    [StatType.defense]: BASELINE.EPIC[StatType.defense] + 60,
    [StatType.magic]: BASELINE.EPIC[StatType.magic] - 30,
    [StatType.magicDefense]: BASELINE.EPIC[StatType.magicDefense] - 20,
    [StatType.speed]: BASELINE.EPIC[StatType.speed] - 50,
    [StatType.critChance]: BASELINE.EPIC[StatType.critChance] + 5,
    [StatType.critDamage]: BASELINE.EPIC[StatType.critDamage],
  },
  skills: [
    {
      id: "geode_burst",
      name: "Geode Burst",
      cost: 65,
      costStat: StatType.energy,
      effects: [
        GeodeBurstDamageEffect,
        GeodeBurstBrittleEffect,
        GeodeBurstDamage2Effect,
        GeodeBurstHealSelf,
      ],
    } as Skill,
  ],
};

// 6) Soulflame Phoenix - A radiant bird that burns all enemies.
const RebirthsEmbraceBurnEffect: ApplyBurnStatusEffectSkillEffect = {
  id: "rebirths_embrace_burn_effect",
  name: "Rebirth's Embrace Burn",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.burn,
  value: 12,
  stackable: true,
};

const RebirthsEmbraceHealAllies: HealSkillEffect = {
  id: "rebirths_embrace_heal_allies",
  name: "Rebirth's Embrace Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  targetType: TargetType.allAllies,
  healMultiplier: 0.7,
  healStat: StatType.magic,
};

const RebirthsEmbraceCleanseAllies: CleanseSkillEffect = {
  id: "rebirths_embrace_cleanse_allies",
  name: "Rebirth's Embrace Cleanse",
  type: SkillEffectType.cleanse,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  targetType: TargetType.allAllies,
  cleansableEffect: CleansableEffect.all,
  count: 2,
};

export const ENEMY_SOULFLAME_PHOENIX: EnemyCharacter = {
  id: "soulflame_phoenix",
  name: "Soulflame Phoenix",
  rarity: Rarity.EPIC,
  strongAffinities: [AffinityType.radiance, AffinityType.spirit],
  weakAffinities: [AffinityType.void, AffinityType.chaos],
  stats: {
    [StatType.health]: BASELINE.EPIC[StatType.health] - 20,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.EPIC[StatType.energyGain] + 5,
    [StatType.strength]: BASELINE.EPIC[StatType.strength] - 25,
    [StatType.defense]: BASELINE.EPIC[StatType.defense] - 20,
    [StatType.magic]: BASELINE.EPIC[StatType.magic] + 70,
    [StatType.magicDefense]: BASELINE.EPIC[StatType.magicDefense] + 40,
    [StatType.speed]: BASELINE.EPIC[StatType.speed] + 40,
    [StatType.critChance]: BASELINE.EPIC[StatType.critChance] + 20,
    [StatType.critDamage]: BASELINE.EPIC[StatType.critDamage] + 20,
  },
  skills: [
    {
      id: "rebirths_embrace",
      name: "Rebirth's Embrace",
      cost: 65,
      costStat: StatType.energy,
      cooldownTurns: 3,
      effects: [
        RebirthsEmbraceBurnEffect,
        RebirthsEmbraceHealAllies,
        RebirthsEmbraceCleanseAllies,
      ],
    } as Skill,
  ],
};

// 7) Abyssal Kraken - A monstrous beast that deals bleed damage to all enemies.
const TidalCrushDamageEffect: DamageSkillEffect = {
  id: "tidal_crush_damage_effect",
  name: "Tidal Crush Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast, AffinityType.void],
  damageMultiplier: 1.75,
  damageStat: StatType.magicDefense,
  defenseStat: StatType.defense,
  targetType: TargetType.allEnemies,
};

const TidalCrushBleedEffect: ApplyBleedStatusEffectSkillEffect = {
  id: "tidal_crush_bleed_effect",
  name: "Tidal Crush Bleed",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.beast, AffinityType.void],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.bleed,
  value: 3,
  stackable: true,
};

const TidalCrushSpeedDebuff: AdjustStatSkillEffect = {
  id: "tidal_crush_speed_debuff",
  name: "Tidal Crush Speed Debuff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.beast, AffinityType.void],
  targetType: TargetType.allEnemies,
  stat: StatType.speed,
  direction: AdjustmentDirection.decrease,
  modifierValue: 35,
  duration: 4,
};

export const ENEMY_ABYSSAL_KRAKEN: EnemyCharacter = {
  id: "abyssal_kraken",
  name: "Abyssal Kraken",
  rarity: Rarity.EPIC,
  strongAffinities: [AffinityType.beast, AffinityType.void],
  weakAffinities: [AffinityType.radiance, AffinityType.gem],
  stats: {
    [StatType.health]: BASELINE.EPIC[StatType.health] + 110,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.EPIC[StatType.energyGain],
    [StatType.strength]: BASELINE.EPIC[StatType.strength] + 55,
    [StatType.defense]: BASELINE.EPIC[StatType.defense] + 35,
    [StatType.magic]: BASELINE.EPIC[StatType.magic] - 20,
    [StatType.magicDefense]: BASELINE.EPIC[StatType.magicDefense] + 50,
    [StatType.speed]: BASELINE.EPIC[StatType.speed] - 30,
    [StatType.critChance]: BASELINE.EPIC[StatType.critChance],
    [StatType.critDamage]: BASELINE.EPIC[StatType.critDamage] + 10,
  },
  skills: [
    {
      id: "tidal_crush",
      name: "Tidal Crush",
      cost: 60,
      costStat: StatType.energy,
      effects: [
        TidalCrushDamageEffect,
        TidalCrushBleedEffect,
        TidalCrushSpeedDebuff,
      ],
    } as Skill,
  ],
};

// 8) Arcane Construct - A magical golem that applies brittle to a random enemy.
const PrismaticBlastDamageEffect: DamageSkillEffect = {
  id: "prismatic_blast_damage_effect",
  name: "Prismatic Blast Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.gem, AffinityType.knowledge],
  damageMultiplier: 2.1,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
};

const PrismaticBlastBrittleEffect: ApplyBrittleStatusEffectSkillEffect = {
  id: "prismatic_blast_brittle_effect",
  name: "Prismatic Blast Brittle",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem, AffinityType.knowledge],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.brittle,
  value: 45,
  stackable: true,
};

const PrismaticBlastMagicBuff: AdjustStatSkillEffect = {
  id: "prismatic_blast_magic_buff",
  name: "Prismatic Blast Magic Buff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem, AffinityType.knowledge],
  targetType: TargetType.self,
  stat: StatType.magic,
  direction: AdjustmentDirection.increase,
  modifierValue: 35,
  duration: 4,
};

export const ENEMY_ARCANE_CONSTRUCT: EnemyCharacter = {
  id: "arcane_construct",
  name: "Arcane Construct",
  rarity: Rarity.EPIC,
  strongAffinities: [AffinityType.gem, AffinityType.knowledge],
  weakAffinities: [AffinityType.chaos, AffinityType.textile],
  stats: {
    [StatType.health]: BASELINE.EPIC[StatType.health] + 80,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.EPIC[StatType.energyGain],
    [StatType.strength]: BASELINE.EPIC[StatType.strength] + 20,
    [StatType.defense]: BASELINE.EPIC[StatType.defense] + 60,
    [StatType.magic]: BASELINE.EPIC[StatType.magic] + 20,
    [StatType.magicDefense]: BASELINE.EPIC[StatType.magicDefense] + 20,
    [StatType.speed]: BASELINE.EPIC[StatType.speed] - 10,
    [StatType.critChance]: BASELINE.EPIC[StatType.critChance] + 10,
    [StatType.critDamage]: BASELINE.EPIC[StatType.critDamage],
  },
  skills: [
    {
      id: "prismatic_blast",
      name: "Prismatic Blast",
      cost: 55,
      costStat: StatType.energy,
      effects: [
        PrismaticBlastDamageEffect,
        PrismaticBlastBrittleEffect,
        PrismaticBlastMagicBuff,
      ],
    } as Skill,
  ],
};

// 9) Whisperfang Stalker - A terrifying beast that deals bleed damage to the lowest health enemy.
const SilentPounceDamageEffect: DamageSkillEffect = {
  id: "silent_pounce_damage_effect",
  name: "Silent Pounce Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast, AffinityType.textile],
  damageMultiplier: 1.85,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.lowestHealthEnemy,
};

const SilentPounceBleedEffect: ApplyBleedStatusEffectSkillEffect = {
  id: "silent_pounce_bleed_effect",
  name: "Silent Pounce Bleed",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.beast, AffinityType.textile],
  targetType: TargetType.lowestHealthEnemy,
  statusEffectType: StatusEffectType.bleed,
  value: 2,
  stackable: true,
};

const SilentPounceCritBuff: AdjustStatSkillEffect = {
  id: "silent_pounce_crit_buff",
  name: "Silent Pounce Crit Buff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.beast, AffinityType.textile],
  targetType: TargetType.self,
  stat: StatType.critChance,
  direction: AdjustmentDirection.increase,
  modifierValue: 150,
  duration: 4,
};

export const ENEMY_WHISPERFANG_STALKER: EnemyCharacter = {
  id: "whisperfang_stalker",
  name: "Whisperfang Stalker",
  rarity: Rarity.EPIC,
  strongAffinities: [AffinityType.beast, AffinityType.textile],
  weakAffinities: [AffinityType.radiance, AffinityType.knowledge],
  stats: {
    [StatType.health]: BASELINE.EPIC[StatType.health] - 20,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.EPIC[StatType.energyGain] + 4,
    [StatType.strength]: BASELINE.EPIC[StatType.strength] + 60,
    [StatType.defense]: BASELINE.EPIC[StatType.defense] + 10,
    [StatType.magic]: BASELINE.EPIC[StatType.magic] - 10,
    [StatType.magicDefense]: BASELINE.EPIC[StatType.magicDefense] - 10,
    [StatType.speed]: BASELINE.EPIC[StatType.speed] + 60,
    [StatType.critChance]: BASELINE.EPIC[StatType.critChance] + 30,
    [StatType.critDamage]: BASELINE.EPIC[StatType.critDamage] + 30,
  },
  skills: [
    {
      id: "silent_pounce",
      name: "Silent Pounce",
      cost: 60,
      costStat: StatType.energy,
      effects: [
        SilentPounceDamageEffect,
        SilentPounceBleedEffect,
        SilentPounceCritBuff,
      ],
    } as Skill,
  ],
};

// 10) Spectral Archmage - A powerful mage that deals massive damage to all enemies and slows them.
const EtherealRuptureDamageEffect: DamageSkillEffect = {
  id: "ethereal_rupture_damage_effect",
  name: "Ethereal Rupture Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.spirit, AffinityType.knowledge],
  damageMultiplier: 2.1,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
};

const EtherealRuptureMagicEnergyGainDebuff: AdjustStatSkillEffect = {
  id: "ethereal_rupture_energy_gain_debuff",
  name: "Ethereal Rupture Energy Gain Debuff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.spirit, AffinityType.knowledge],
  targetType: TargetType.allEnemies,
  stat: StatType.energyGain,
  direction: AdjustmentDirection.decrease,
  modifierValue: 50,
  duration: 3,
};

const EtherealRuptureMagicDefenseDebuff: AdjustStatSkillEffect = {
  id: "ethereal_rupture_magic_defense_debuff",
  name: "Ethereal Rupture Magic Defense Debuff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.spirit, AffinityType.knowledge],
  targetType: TargetType.allEnemies,
  stat: StatType.magicDefense,
  direction: AdjustmentDirection.decrease,
  modifierValue: 30,
  duration: 3,
};

export const ENEMY_SPECTRAL_ARCHMAGE: EnemyCharacter = {
  id: "spectral_archmage",
  name: "Spectral Archmage",
  rarity: Rarity.EPIC,
  strongAffinities: [AffinityType.spirit, AffinityType.knowledge],
  weakAffinities: [AffinityType.beast, AffinityType.textile],
  stats: {
    [StatType.health]: BASELINE.EPIC[StatType.health] - 40,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.EPIC[StatType.energyGain] + 8,
    [StatType.strength]: BASELINE.EPIC[StatType.strength] - 40,
    [StatType.defense]: BASELINE.EPIC[StatType.defense] - 30,
    [StatType.magic]: BASELINE.EPIC[StatType.magic] + 80,
    [StatType.magicDefense]: BASELINE.EPIC[StatType.magicDefense] + 50,
    [StatType.speed]: BASELINE.EPIC[StatType.speed] + 30,
    [StatType.critChance]: BASELINE.EPIC[StatType.critChance] + 20,
    [StatType.critDamage]: BASELINE.EPIC[StatType.critDamage] + 30,
  },
  skills: [
    {
      id: "ethereal_rupture",
      name: "Ethereal Rupture",
      cost: 75,
      costStat: StatType.energy,
      cooldownTurns: 4,
      effects: [
        EtherealRuptureDamageEffect,
        EtherealRuptureMagicEnergyGainDebuff,
        EtherealRuptureMagicDefenseDebuff,
      ],
    } as Skill,
  ],
};

// Optional: export all as an array for convenience
export const EPIC_ENEMIES = [
  ENEMY_TEMPORAL_HORROR,
  ENEMY_INFERNO_DRAGON,
  ENEMY_ELDRITCH_ABOMINATION,
  ENEMY_STORM_ELEMENTAL,
  ENEMY_MOUNTAIN_SHAMBLER,
  ENEMY_SOULFLAME_PHOENIX,
  ENEMY_ABYSSAL_KRAKEN,
  ENEMY_ARCANE_CONSTRUCT,
  ENEMY_WHISPERFANG_STALKER,
  ENEMY_SPECTRAL_ARCHMAGE,
];
