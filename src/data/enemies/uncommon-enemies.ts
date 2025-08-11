import { AffinityType } from "../../types/affinity";
import { EnemyCharacter } from "../../types/enemy";
import { Rarity } from "../../types/rarity";
import {
  AdjustmentDirection,
  AdjustStatSkillEffect,
  ApplyBurnStatusEffectSkillEffect,
  ApplyStunStatusEffectSkillEffect,
  DamageSkillEffect,
  Skill,
  SkillEffectType,
  TargetType,
  ApplyStatusEffectSkillEffect,
} from "../../types/skillTypes";
import { StatType } from "../../types/stats";
import { StatusEffectType } from "../../types/statusEffects";
import { BASELINE } from "../statBaselines";

//----------------------------------------------------------------------------
// Uncommon Enemies
//----------------------------------------------------------------------------

// 1) Cursed Archer - A shadowy archer that deals damage and silences enemies.
const CursedArrowEffect: DamageSkillEffect = {
  id: "cursed_arrow_damage_effect",
  name: "Cursed Arrow Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.void],
  damageMultiplier: 1.5,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
};

const CursedArrowSilenceEffect: ApplyStatusEffectSkillEffect = {
  id: "cursed_arrow_silence_effect",
  name: "Cursed Arrow Silence",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.silence,
  value: 2,
  stackable: true,
};

export const ENEMY_CURSED_ARCHER: EnemyCharacter = {
  id: "cursed_archer",
  name: "Cursed Archer",
  rarity: Rarity.UNCOMMON,
  strongAffinities: [AffinityType.void],
  weakAffinities: [AffinityType.radiance, AffinityType.spirit],
  stats: {
    [StatType.health]: BASELINE.UNCOMMON[StatType.health] - 10,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain],
    [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 40,
    [StatType.defense]: BASELINE.UNCOMMON[StatType.defense],
    [StatType.magic]: BASELINE.UNCOMMON[StatType.magic],
    [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense],
    [StatType.speed]: BASELINE.UNCOMMON[StatType.speed] + 40,
    [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance] + 15,
    [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage] + 10,
  },
  skills: [
    {
      id: "cursed_arrow",
      name: "Cursed Arrow",
      cost: 30,
      costStat: StatType.energy,
      effects: [CursedArrowEffect, CursedArrowSilenceEffect],
    } as Skill,
  ],
};

// 2) Stone Golem - A slow but powerful golem that increases its own defense.
const HardenEffect: AdjustStatSkillEffect = {
  id: "harden_stat_adjustment_effect",
  name: "Harden Stat Adjustment",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem],
  stat: StatType.defense,
  modifierValue: 100,
  duration: 4,
  targetType: TargetType.self,
  direction: AdjustmentDirection.increase,
};

const HardenTauntEffect: ApplyStatusEffectSkillEffect = {
  id: "harden_taunt_effect",
  name: "Harden Taunt",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem],
  targetType: TargetType.self,
  statusEffectType: StatusEffectType.taunt,
  value: 3,
  stackable: true,
};

export const ENEMY_STONE_GOLEM: EnemyCharacter = {
  id: "stone_golem",
  name: "Stone Golem",
  rarity: Rarity.UNCOMMON,
  strongAffinities: [AffinityType.gem],
  weakAffinities: [AffinityType.chaos, AffinityType.spirit],
  stats: {
    [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 50,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain],
    [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 10,
    [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 50,
    [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] - 20,
    [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] - 10,
    [StatType.speed]: BASELINE.UNCOMMON[StatType.speed] - 20,
    [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
    [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
  },
  skills: [
    {
      id: "harden",
      name: "Harden",
      cost: 30,
      cooldownTurns: 5,
      costStat: StatType.energy,
      effects: [HardenEffect, HardenTauntEffect],
    } as Skill,
  ],
};

// 3) Siren - A magical creature that confuses a single enemy.
const AlluringMelodyEffect: ApplyStatusEffectSkillEffect = {
  id: "alluring_melody_effect",
  name: "Alluring Melody",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.radiance],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.confusion,
  value: 2,
  stackable: true,
};

const AlluringMelodyDamageEffect: DamageSkillEffect = {
  id: "alluring_melody_damage_effect",
  name: "Alluring Melody Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.radiance],
  damageMultiplier: 1.6,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
};

export const ENEMY_SIREN: EnemyCharacter = {
  id: "siren",
  name: "Siren",
  rarity: Rarity.UNCOMMON,
  strongAffinities: [AffinityType.radiance],
  weakAffinities: [AffinityType.void, AffinityType.chaos],
  stats: {
    [StatType.health]: BASELINE.UNCOMMON[StatType.health] - 15,
    [StatType.energy]: 5,
    [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain] + 5,
    [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] - 20,
    [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] - 10,
    [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] + 45,
    [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] + 35,
    [StatType.speed]: BASELINE.UNCOMMON[StatType.speed] + 25,
    [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance] + 5,
    [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage] + 10,
  },
  skills: [
    {
      id: "alluring_melody",
      name: "Alluring Melody",
      cost: 35,
      costStat: StatType.energy,
      effects: [AlluringMelodyEffect, AlluringMelodyDamageEffect],
    } as Skill,
  ],
};

// 4) Sand Scorpion - A speedy scorpion that can apply brittle to enemies.
const SandStingDamageEffect: DamageSkillEffect = {
  id: "sand_sting_damage_effect",
  name: "Sand Sting Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast],
  damageMultiplier: 1.7,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
};

const SandStingBrittleEffect: ApplyStatusEffectSkillEffect = {
  id: "sand_sting_brittle_effect",
  name: "Sand Sting Brittle",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.beast],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.brittle,
  value: 30,
  stackable: true,
};

export const ENEMY_SAND_SCORPION: EnemyCharacter = {
  id: "sand_scorpion",
  name: "Sand Scorpion",
  rarity: Rarity.UNCOMMON,
  strongAffinities: [AffinityType.beast],
  weakAffinities: [AffinityType.radiance, AffinityType.textile],
  stats: {
    [StatType.health]: BASELINE.UNCOMMON[StatType.health],
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain] + 2,
    [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 35,
    [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 10,
    [StatType.magic]: BASELINE.UNCOMMON[StatType.magic],
    [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] + 10,
    [StatType.speed]: BASELINE.UNCOMMON[StatType.speed] + 30,
    [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance] + 15,
    [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage] + 10,
  },
  skills: [
    {
      id: "sand_sting",
      name: "Sand Sting",
      cost: 35,
      costStat: StatType.energy,
      effects: [SandStingDamageEffect, SandStingBrittleEffect],
    } as Skill,
  ],
};

// 5) Phantom - An ethereal enemy that deals magic damage and lowers the target's magic defense.
const SpectralTouchDamageEffect: DamageSkillEffect = {
  id: "spectral_touch_damage_effect",
  name: "Spectral Touch Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.spirit],
  damageMultiplier: 1.6,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
};

const SpectralTouchDebuff: AdjustStatSkillEffect = {
  id: "spectral_touch_debuff_effect",
  name: "Spectral Touch Debuff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.spirit],
  targetType: TargetType.randomEnemy,
  stat: StatType.magicDefense,
  direction: AdjustmentDirection.decrease,
  modifierValue: 40,
  duration: 3,
};

export const ENEMY_PHANTOM: EnemyCharacter = {
  id: "phantom",
  name: "Phantom",
  rarity: Rarity.UNCOMMON,
  strongAffinities: [AffinityType.spirit],
  weakAffinities: [AffinityType.void, AffinityType.chaos],
  stats: {
    [StatType.health]: BASELINE.UNCOMMON[StatType.health] - 15,
    [StatType.energy]: 10,
    [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain] + 4,
    [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] - 20,
    [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] - 15,
    [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] + 40,
    [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] + 30,
    [StatType.speed]: BASELINE.UNCOMMON[StatType.speed] + 15,
    [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
    [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
  },
  skills: [
    {
      id: "spectral_touch",
      name: "Spectral Touch",
      cost: 30,
      costStat: StatType.energy,
      effects: [SpectralTouchDamageEffect, SpectralTouchDebuff],
    } as Skill,
  ],
};

// 6) Wyrmling - A young dragon that breathes fire, dealing burn damage to all enemies.
const FlameBreathDamageEffect: DamageSkillEffect = {
  id: "flame_breath_damage_effect",
  name: "Flame Breath Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos],
  damageMultiplier: 1.4,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
};

const FlameBreathBurnEffect: ApplyBurnStatusEffectSkillEffect = {
  id: "flame_breath_burn_effect",
  name: "Flame Breath Burn",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.burn,
  value: 15,
  stackable: true,
};

export const ENEMY_WYRMLING: EnemyCharacter = {
  id: "wyrmling",
  name: "Wyrmling",
  rarity: Rarity.UNCOMMON,
  strongAffinities: [AffinityType.chaos],
  weakAffinities: [AffinityType.radiance, AffinityType.spirit],
  stats: {
    [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 10,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain],
    [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 20,
    [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 20,
    [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] + 30,
    [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] + 20,
    [StatType.speed]: BASELINE.UNCOMMON[StatType.speed] + 10,
    [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
    [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
  },
  skills: [
    {
      id: "flame_breath",
      name: "Flame Breath",
      cost: 35,
      costStat: StatType.energy,
      effects: [FlameBreathDamageEffect, FlameBreathBurnEffect],
    } as Skill,
  ],
};

// 7) Rogue Scout - A tricky scout that disarms and damages a single enemy.
const DisarmingStrikeDamageEffect: DamageSkillEffect = {
  id: "disarming_strike_damage_effect",
  name: "Disarming Strike Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.textile],
  damageMultiplier: 1.4,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
};

const DisarmingStrikeDisarmEffect: ApplyStatusEffectSkillEffect = {
  id: "disarming_strike_disarm_effect",
  name: "Disarming Strike Disarm",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.textile],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.disarm,
  value: 2,
  stackable: true,
};

export const ENEMY_ROGUE_SCOUT: EnemyCharacter = {
  id: "rogue_scout",
  name: "Rogue Scout",
  rarity: Rarity.UNCOMMON,
  strongAffinities: [AffinityType.textile],
  weakAffinities: [AffinityType.gem, AffinityType.void],
  stats: {
    [StatType.health]: BASELINE.UNCOMMON[StatType.health] - 20,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain] + 2,
    [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 35,
    [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] - 10,
    [StatType.magic]: BASELINE.UNCOMMON[StatType.magic],
    [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense],
    [StatType.speed]: BASELINE.UNCOMMON[StatType.speed] + 40,
    [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance] + 15,
    [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage] + 15,
  },
  skills: [
    {
      id: "disarming_strike",
      name: "Disarming Strike",
      cost: 35,
      costStat: StatType.energy,
      effects: [DisarmingStrikeDamageEffect, DisarmingStrikeDisarmEffect],
    } as Skill,
  ],
};

// 8) Scholar Scribe - A wise scholar that can confuse a single enemy.
const KnowledgeDrainDamageEffect: DamageSkillEffect = {
  id: "knowledge_drain_damage_effect",
  name: "Knowledge Drain Damage Effect",
  type: SkillEffectType.damage,
  affinities: [AffinityType.knowledge],
  damageMultiplier: 1.5,
  damageStat: StatType.magic,
  defenseStat: StatType.magic,
  targetType: TargetType.randomEnemy,
};

const KnowledgeDrainDebuff: AdjustStatSkillEffect = {
  id: "KnowledgeDrain_debuff_effect",
  name: "Knowledge Drain Debuff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.knowledge],
  targetType: TargetType.randomEnemy,
  userStat: StatType.magic,
  stat: StatType.magic,
  direction: AdjustmentDirection.decrease,
  modifierValue: 40,
  duration: 3,
};

const KnowledgeDrainBuff: AdjustStatSkillEffect = {
  id: "KnowledgeDrain_buff_effect",
  name: "Knowledge Drain Buff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.knowledge],
  targetType: TargetType.self,
  userStat: StatType.magic,
  stat: StatType.magic,
  direction: AdjustmentDirection.increase,
  modifierValue: 40,
  duration: 3,
};

export const ENEMY_SCHOLAR_SCRIBE: EnemyCharacter = {
  id: "scholar_scribe",
  name: "Scholar Scribe",
  rarity: Rarity.UNCOMMON,
  strongAffinities: [AffinityType.knowledge],
  weakAffinities: [AffinityType.beast, AffinityType.chaos],
  stats: {
    [StatType.health]: BASELINE.UNCOMMON[StatType.health] - 10,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain] + 4,
    [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] - 25,
    [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] - 5,
    [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] + 40,
    [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] + 20,
    [StatType.speed]: BASELINE.UNCOMMON[StatType.speed],
    [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
    [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
  },
  skills: [
    {
      id: "knowledge_drain",
      name: "Knowledge Drain",
      cost: 35,
      costStat: StatType.energy,
      effects: [
        KnowledgeDrainDamageEffect,
        KnowledgeDrainDebuff,
        KnowledgeDrainBuff,
      ],
    } as Skill,
  ],
};

// 9) Thunder Drake - A small drake that can shock and damage a single enemy.
const StaticShockDamageEffect: DamageSkillEffect = {
  id: "static_shock_damage_effect",
  name: "Static Shock Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.radiance],
  damageMultiplier: 1.4,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
};

const StaticShockStatusEffect: ApplyStatusEffectSkillEffect = {
  id: "static_shock_status_effect",
  name: "Static Shock",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.radiance],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.shock,
  value: 3,
  stackable: true,
};

export const ENEMY_THUNDER_DRAKE: EnemyCharacter = {
  id: "thunder_drake",
  name: "Thunder Drake",
  rarity: Rarity.UNCOMMON,
  strongAffinities: [AffinityType.radiance],
  weakAffinities: [AffinityType.gem, AffinityType.knowledge],
  stats: {
    [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 15,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain] + 2,
    [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 10,
    [StatType.defense]: BASELINE.UNCOMMON[StatType.defense],
    [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] + 25,
    [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] + 25,
    [StatType.speed]: BASELINE.UNCOMMON[StatType.speed] + 15,
    [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance] + 5,
    [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
  },
  skills: [
    {
      id: "static_shock",
      name: "Static Shock",
      cost: 30,
      costStat: StatType.energy,
      effects: [StaticShockDamageEffect, StaticShockStatusEffect],
    } as Skill,
  ],
};

// 10) Mountain Bear - A large, tanky bear that can stun a single enemy.
const BearStompDamageEffect: DamageSkillEffect = {
  id: "bear_stomp_damage_effect",
  name: "Bear Stomp Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast],
  damageMultiplier: 1.2,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
};

const BearStompAoeDamageEffect: DamageSkillEffect = {
  id: "bear_stomp_aoe_damage_effect",
  name: "Bear Stomp Aoe Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast],
  damageMultiplier: 0.6,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.allEnemies,
};

const BearStompStunEffect: ApplyStunStatusEffectSkillEffect = {
  id: "bear_stomp_stun_effect",
  name: "Bear Stomp Stun",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.beast],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.stun,
  value: 1,
  stackable: true,
};

export const ENEMY_MOUNTAIN_BEAR: EnemyCharacter = {
  id: "mountain_bear",
  name: "Mountain Bear",
  rarity: Rarity.UNCOMMON,
  strongAffinities: [AffinityType.beast],
  weakAffinities: [AffinityType.textile, AffinityType.void],
  stats: {
    [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 50,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain],
    [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 30,
    [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 30,
    [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] - 30,
    [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] - 15,
    [StatType.speed]: BASELINE.UNCOMMON[StatType.speed] - 10,
    [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
    [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
  },
  skills: [
    {
      id: "bear_stomp",
      name: "Bear Stomp",
      cost: 45,
      costStat: StatType.energy,
      effects: [
        BearStompDamageEffect,
        BearStompAoeDamageEffect,
        BearStompStunEffect,
      ],
    } as Skill,
  ],
};

// Optional: export all as an array for convenience
export const UNCOMMON_ENEMIES = [
  ENEMY_CURSED_ARCHER,
  ENEMY_STONE_GOLEM,
  ENEMY_SIREN,
  ENEMY_SAND_SCORPION,
  ENEMY_PHANTOM,
  ENEMY_WYRMLING,
  ENEMY_ROGUE_SCOUT,
  ENEMY_SCHOLAR_SCRIBE,
  ENEMY_THUNDER_DRAKE,
  ENEMY_MOUNTAIN_BEAR,
];
