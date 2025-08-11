import { AffinityType } from "../../types/affinity";
import { EnemyCharacter } from "../../types/enemy";
import { Rarity } from "../../types/rarity";
import {
  AdjustmentDirection,
  AdjustStatSkillEffect,
  ApplyBurnStatusEffectSkillEffect,
  ApplyPoisonStatusEffectSkillEffect,
  ApplyStunStatusEffectSkillEffect,
  DamageSkillEffect,
  HealSkillEffect,
  Skill,
  SkillEffectType,
  TargetType,
  ApplyStatusEffectSkillEffect,
  ApplyShieldStatusEffectSkillEffect,
  ApplySilenceStatusEffectSkillEffect,
  ApplyBrittleStatusEffectSkillEffect,
  ApplyBleedStatusEffectSkillEffect,
  ApplySlowStatusEffectSkillEffect,
} from "../../types/skillTypes";
import { StatType } from "../../types/stats";
import { StatusEffectType } from "../../types/statusEffects";
import { BASELINE } from "../statBaselines";

//----------------------------------------------------------------------------
// Rare Enemies
//----------------------------------------------------------------------------

// 1) Ember Elemental - A creature of pure fire that deals heavy burn damage.
const FireballDamageEffect: DamageSkillEffect = {
  id: "fireball_damage_effect",
  name: "Fireball Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos],
  damageMultiplier: 1.8,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
};

const FireballBurnEffect: ApplyBurnStatusEffectSkillEffect = {
  id: "fireball_burn_effect",
  name: "Fireball Burn",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.burn,
  value: 15,
  stackable: true,
};

export const ENEMY_EMBER_ELEMENTAL: EnemyCharacter = {
  id: "ember_elemental",
  name: "Ember Elemental",
  rarity: Rarity.RARE,
  strongAffinities: [AffinityType.chaos],
  weakAffinities: [AffinityType.radiance],
  stats: {
    [StatType.health]: BASELINE.RARE[StatType.health] - 20,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.RARE[StatType.energyGain] + 2,
    [StatType.strength]: BASELINE.RARE[StatType.strength] - 20,
    [StatType.defense]: BASELINE.RARE[StatType.defense] - 15,
    [StatType.magic]: BASELINE.RARE[StatType.magic] + 50,
    [StatType.magicDefense]: BASELINE.RARE[StatType.magicDefense] + 30,
    [StatType.speed]: BASELINE.RARE[StatType.speed] + 10,
    [StatType.critChance]: BASELINE.RARE[StatType.critChance] + 5,
    [StatType.critDamage]: BASELINE.RARE[StatType.critDamage] + 10,
  },
  skills: [
    {
      id: "fireball",
      name: "Fireball",
      cost: 45,
      costStat: StatType.energy,
      effects: [FireballDamageEffect, FireballBurnEffect],
    } as Skill,
  ],
};

// 2) Arcane Sentinel - A magical construct that protects itself with a powerful shield.
const ArcaneShieldEffect: ApplyShieldStatusEffectSkillEffect = {
  id: "arcane_shield_effect",
  name: "Arcane Shield Effect",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.knowledge],
  targetType: TargetType.allAllies,
  statusEffectType: StatusEffectType.shield,
  value: 70,
  stackable: true,
  stat: StatType.magicDefense,
};

const ArcaneShieldDamageEffect: DamageSkillEffect = {
  id: "arcane_shield_damage_effect",
  name: "Arcane Shield Damage Effect",
  type: SkillEffectType.damage,
  affinities: [AffinityType.knowledge],
  damageMultiplier: 1.2,
  damageStat: StatType.magicDefense,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
};

export const ENEMY_ARCANE_SENTINEL: EnemyCharacter = {
  id: "arcane_sentinel",
  name: "Arcane Sentinel",
  rarity: Rarity.RARE,
  strongAffinities: [AffinityType.knowledge],
  weakAffinities: [AffinityType.chaos],
  stats: {
    [StatType.health]: BASELINE.RARE[StatType.health] + 60,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.RARE[StatType.energyGain],
    [StatType.strength]: BASELINE.RARE[StatType.strength],
    [StatType.defense]: BASELINE.RARE[StatType.defense] + 40,
    [StatType.magic]: BASELINE.RARE[StatType.magic],
    [StatType.magicDefense]: BASELINE.RARE[StatType.magicDefense] + 60,
    [StatType.speed]: BASELINE.RARE[StatType.speed] - 40,
    [StatType.critChance]: BASELINE.RARE[StatType.critChance],
    [StatType.critDamage]: BASELINE.RARE[StatType.critDamage],
  },
  skills: [
    {
      id: "arcane_shield",
      name: "Arcane Shield",
      cost: 40,
      costStat: StatType.energy,
      cooldownTurns: 4,
      effects: [ArcaneShieldEffect, ArcaneShieldDamageEffect],
    } as Skill,
  ],
};

// 3) Whispering Horror - A void creature that drains energy and silences enemies.
const CosmicWhisperDamageEffect: DamageSkillEffect = {
  id: "cosmic_whisper_damage_effect",
  name: "Cosmic Whisper Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.void],
  damageMultiplier: 1.8,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
};

const CosmicWhisperSilenceEffect: ApplySilenceStatusEffectSkillEffect = {
  id: "cosmic_whisper_silence_effect",
  name: "Cosmic Whisper Silence",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.silence,
  value: 3,
  stackable: true,
};

export const ENEMY_WHISPERING_HORROR: EnemyCharacter = {
  id: "whispering_horror",
  name: "Whispering Horror",
  rarity: Rarity.RARE,
  strongAffinities: [AffinityType.void],
  weakAffinities: [AffinityType.radiance],
  stats: {
    [StatType.health]: BASELINE.RARE[StatType.health] - 20,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.RARE[StatType.energyGain] + 4,
    [StatType.strength]: BASELINE.RARE[StatType.strength] - 15,
    [StatType.defense]: BASELINE.RARE[StatType.defense] - 20,
    [StatType.magic]: BASELINE.RARE[StatType.magic] + 50,
    [StatType.magicDefense]: BASELINE.RARE[StatType.magicDefense] + 25,
    [StatType.speed]: BASELINE.RARE[StatType.speed] + 20,
    [StatType.critChance]: BASELINE.RARE[StatType.critChance] + 20,
    [StatType.critDamage]: BASELINE.RARE[StatType.critDamage],
  },
  skills: [
    {
      id: "cosmic_whisper",
      name: "Cosmic Whisper",
      cost: 40,
      costStat: StatType.energy,
      effects: [CosmicWhisperDamageEffect, CosmicWhisperSilenceEffect],
    } as Skill,
  ],
};

// 4) Crystal Serpent - A swift snake made of crystal that applies brittle.
const CrystalFangDamageEffect: DamageSkillEffect = {
  id: "crystal_fang_damage_effect",
  name: "Crystal Fang Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.gem],
  damageMultiplier: 1.9,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
};

const CrystalFangBrittleEffect: ApplyBrittleStatusEffectSkillEffect = {
  id: "crystal_fang_brittle_effect",
  name: "Crystal Fang Brittle",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.brittle,
  value: 35,
  stackable: true,
};

export const ENEMY_CRYSTAL_SERPENT: EnemyCharacter = {
  id: "crystal_serpent",
  name: "Crystal Serpent",
  rarity: Rarity.RARE,
  strongAffinities: [AffinityType.gem],
  weakAffinities: [AffinityType.chaos],
  stats: {
    [StatType.health]: BASELINE.RARE[StatType.health] + 20,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.RARE[StatType.energyGain] + 2,
    [StatType.strength]: BASELINE.RARE[StatType.strength] + 40,
    [StatType.defense]: BASELINE.RARE[StatType.defense] + 20,
    [StatType.magic]: BASELINE.RARE[StatType.magic] - 20,
    [StatType.magicDefense]: BASELINE.RARE[StatType.magicDefense] - 10,
    [StatType.speed]: BASELINE.RARE[StatType.speed] + 20,
    [StatType.critChance]: BASELINE.RARE[StatType.critChance] + 5,
    [StatType.critDamage]: BASELINE.RARE[StatType.critDamage] + 10,
  },
  skills: [
    {
      id: "crystal_fang",
      name: "Crystal Fang",
      cost: 45,
      costStat: StatType.energy,
      effects: [CrystalFangDamageEffect, CrystalFangBrittleEffect],
    } as Skill,
  ],
};

// 5) Sun Worshipper - A fanatic that heals a random ally and damages a random enemy.
const DivineLightHealEffect: HealSkillEffect = {
  id: "divine_light_heal_effect",
  name: "Divine Light Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.radiance],
  healMultiplier: 1,
  healStat: StatType.magic,
  targetType: TargetType.lowestHealthAlly,
};

const DivineLightDamageEffect: DamageSkillEffect = {
  id: "divine_light_damage_effect",
  name: "Divine Light Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.radiance],
  damageMultiplier: 1.6,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.lowestHealthEnemy,
};

export const ENEMY_SUN_WORSHIPPER: EnemyCharacter = {
  id: "sun_worshipper",
  name: "Sun Worshipper",
  rarity: Rarity.RARE,
  strongAffinities: [AffinityType.radiance],
  weakAffinities: [AffinityType.void],
  stats: {
    [StatType.health]: BASELINE.RARE[StatType.health] - 10,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.RARE[StatType.energyGain] + 3,
    [StatType.strength]: BASELINE.RARE[StatType.strength] - 25,
    [StatType.defense]: BASELINE.RARE[StatType.defense] - 10,
    [StatType.magic]: BASELINE.RARE[StatType.magic] + 60,
    [StatType.magicDefense]: BASELINE.RARE[StatType.magicDefense] + 35,
    [StatType.speed]: BASELINE.RARE[StatType.speed] + 10,
    [StatType.critChance]: BASELINE.RARE[StatType.critChance],
    [StatType.critDamage]: BASELINE.RARE[StatType.critDamage],
  },
  skills: [
    {
      id: "divine_light",
      name: "Divine Light",
      cost: 45,
      costStat: StatType.energy,
      effects: [DivineLightHealEffect, DivineLightDamageEffect],
    } as Skill,
  ],
};

// 6) Spectral Wolf - A ghostly beast that attacks with speed and poison.
const GhostlyBiteDamageEffect: DamageSkillEffect = {
  id: "ghostly_bite_damage_effect",
  name: "Ghostly Bite Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.spirit],
  damageMultiplier: 1.8,
  damageStat: StatType.strength,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
};

const GhostlyBitePoisonEffect: ApplyPoisonStatusEffectSkillEffect = {
  id: "ghostly_bite_poison_effect",
  name: "Ghostly Bite Poison",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.spirit],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.poison,
  value: 0.4,
  stackable: false,
  stat: StatType.strength,
  duration: 2,
};

export const ENEMY_SPECTRAL_WOLF: EnemyCharacter = {
  id: "spectral_wolf",
  name: "Spectral Wolf",
  rarity: Rarity.RARE,
  strongAffinities: [AffinityType.spirit],
  weakAffinities: [AffinityType.chaos],
  stats: {
    [StatType.health]: BASELINE.RARE[StatType.health] - 20,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.RARE[StatType.energyGain],
    [StatType.strength]: BASELINE.RARE[StatType.strength] + 50,
    [StatType.defense]: BASELINE.RARE[StatType.defense] + 60,
    [StatType.magic]: BASELINE.RARE[StatType.magic] - 10,
    [StatType.magicDefense]: BASELINE.RARE[StatType.magicDefense] - 10,
    [StatType.speed]: BASELINE.RARE[StatType.speed] + 40,
    [StatType.critChance]: BASELINE.RARE[StatType.critChance] + 20,
    [StatType.critDamage]: BASELINE.RARE[StatType.critDamage],
  },
  skills: [
    {
      id: "ghostly_bite",
      name: "Ghostly Bite",
      cost: 40,
      costStat: StatType.energy,
      effects: [GhostlyBiteDamageEffect, GhostlyBitePoisonEffect],
    } as Skill,
  ],
};

// 7) Forest Guardian - A towering beast that applies bleed and heals itself.
const ThornWhipDamageEffect: DamageSkillEffect = {
  id: "thorn_whip_damage_effect",
  name: "Thorn Whip Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast],
  damageMultiplier: 1.2,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
};

const ThornWhipDamage2Effect: DamageSkillEffect = {
  id: "thorn_whip_damage_2_effect",
  name: "Thorn Whip Damage 2",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast],
  damageMultiplier: 1.2,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
};

const ThornWhipBleedEffect: ApplyBleedStatusEffectSkillEffect = {
  id: "thorn_whip_bleed_effect",
  name: "Thorn Whip Bleed",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.beast],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.bleed,
  value: 3,
  stackable: true,
};

export const ENEMY_FOREST_GUARDIAN: EnemyCharacter = {
  id: "forest_guardian",
  name: "Forest Guardian",
  rarity: Rarity.RARE,
  strongAffinities: [AffinityType.beast],
  weakAffinities: [AffinityType.textile],
  stats: {
    [StatType.health]: BASELINE.RARE[StatType.health] + 60,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.RARE[StatType.energyGain] - 1,
    [StatType.strength]: BASELINE.RARE[StatType.strength] + 40,
    [StatType.defense]: BASELINE.RARE[StatType.defense] + 40,
    [StatType.magic]: BASELINE.RARE[StatType.magic] - 20,
    [StatType.magicDefense]: BASELINE.RARE[StatType.magicDefense],
    [StatType.speed]: BASELINE.RARE[StatType.speed] - 20,
    [StatType.critChance]: BASELINE.RARE[StatType.critChance],
    [StatType.critDamage]: BASELINE.RARE[StatType.critDamage],
  },
  skills: [
    {
      id: "thorn_whip",
      name: "Thorn Whip",
      cost: 35,
      costStat: StatType.energy,
      effects: [
        ThornWhipDamageEffect,
        ThornWhipDamage2Effect,
        ThornWhipBleedEffect,
      ],
    } as Skill,
  ],
};

// 8) Shadow Weaver - A mysterious enemy that applies silence to all enemies.
const ShadowShroudDamageEffect: DamageSkillEffect = {
  id: "shadow_shroud_damage_effect",
  name: "Shadow Shroud Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.textile],
  damageMultiplier: 1.4,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
};

const ShadowShroudAttackReductionEffect: AdjustStatSkillEffect = {
  id: "shadow_shroud_attack_reduction_effect",
  name: "Shadow Shroud Attack Reduction",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.textile],
  targetType: TargetType.allEnemies,
  userStat: StatType.magic,
  stat: StatType.strength,
  direction: AdjustmentDirection.decrease,
  modifierValue: 0.4,
  duration: 3,
};

const ShadowShroudMagicReductionEffect: AdjustStatSkillEffect = {
  id: "shadow_shroud_magic_reduction_effect",
  name: "Shadow Shroud Magic Reduction",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.textile],
  targetType: TargetType.allEnemies,
  userStat: StatType.magic,
  stat: StatType.magic,
  direction: AdjustmentDirection.decrease,
  modifierValue: 0.4,
  duration: 3,
};

export const ENEMY_SHADOW_WEAVER: EnemyCharacter = {
  id: "shadow_weaver",
  name: "Shadow Weaver",
  rarity: Rarity.RARE,
  strongAffinities: [AffinityType.textile],
  weakAffinities: [AffinityType.radiance],
  stats: {
    [StatType.health]: BASELINE.RARE[StatType.health] - 20,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.RARE[StatType.energyGain] + 4,
    [StatType.strength]: BASELINE.RARE[StatType.strength] - 15,
    [StatType.defense]: BASELINE.RARE[StatType.defense] + 10,
    [StatType.magic]: BASELINE.RARE[StatType.magic] + 40,
    [StatType.magicDefense]: BASELINE.RARE[StatType.magicDefense] + 20,
    [StatType.speed]: BASELINE.RARE[StatType.speed] + 25,
    [StatType.critChance]: BASELINE.RARE[StatType.critChance] + 10,
    [StatType.critDamage]: BASELINE.RARE[StatType.critDamage],
  },
  skills: [
    {
      id: "shadow_shroud",
      name: "Shadow Shroud",
      cost: 45,
      costStat: StatType.energy,
      effects: [
        ShadowShroudDamageEffect,
        ShadowShroudAttackReductionEffect,
        ShadowShroudMagicReductionEffect,
      ],
    } as Skill,
  ],
};

// 9) Frost Giant - A massive, slow giant that stuns and deals damage to all enemies.
const WinterStompDamageEffect: DamageSkillEffect = {
  id: "winter_stomp_damage_effect",
  name: "Winter Stomp Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.gem],
  damageMultiplier: 1.8,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.allEnemies,
};

const WinterStompSlowEffect: ApplySlowStatusEffectSkillEffect = {
  id: "winter_stomp_slow_effect",
  name: "Winter Stomp Slow",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.slow,
  value: 20,
  stackable: true,
};

export const ENEMY_FROST_GIANT: EnemyCharacter = {
  id: "frost_giant",
  name: "Frost Giant",
  rarity: Rarity.RARE,
  strongAffinities: [AffinityType.gem],
  weakAffinities: [AffinityType.chaos],
  stats: {
    [StatType.health]: BASELINE.RARE[StatType.health] + 100,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.RARE[StatType.energyGain] - 2,
    [StatType.strength]: BASELINE.RARE[StatType.strength] + 40,
    [StatType.defense]: BASELINE.RARE[StatType.defense] + 50,
    [StatType.magic]: BASELINE.RARE[StatType.magic] - 30,
    [StatType.magicDefense]: BASELINE.RARE[StatType.magicDefense] - 20,
    [StatType.speed]: BASELINE.RARE[StatType.speed] - 30,
    [StatType.critChance]: BASELINE.RARE[StatType.critChance],
    [StatType.critDamage]: BASELINE.RARE[StatType.critDamage],
  },
  skills: [
    {
      id: "winter_stomp",
      name: "Winter Stomp",
      cost: 40,
      costStat: StatType.energy,
      effects: [WinterStompDamageEffect, WinterStompSlowEffect],
    } as Skill,
  ],
};

// 10) Feywild Hydra - A multi-headed hydra that poisons and deals damage to all enemies.
const VenomSpitDamageEffect: DamageSkillEffect = {
  id: "venom_spit_damage_effect",
  name: "Venom Spit Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast],
  damageMultiplier: 1.9,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
};

const VenomSpitPoisonEffect: ApplyPoisonStatusEffectSkillEffect = {
  id: "venom_spit_poison_effect",
  name: "Venom Spit Poison",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.beast],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.poison,
  value: 0.2,
  stackable: false,
  stat: StatType.health,
  duration: 4,
};

export const ENEMY_FEYWILD_HYDRA: EnemyCharacter = {
  id: "feywild_hydra",
  name: "Feywild Hydra",
  rarity: Rarity.RARE,
  strongAffinities: [AffinityType.beast],
  weakAffinities: [AffinityType.radiance],
  stats: {
    [StatType.health]: BASELINE.RARE[StatType.health] + 80,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.RARE[StatType.energyGain] + 2,
    [StatType.strength]: BASELINE.RARE[StatType.strength] + 20,
    [StatType.defense]: BASELINE.RARE[StatType.defense] + 25,
    [StatType.magic]: BASELINE.RARE[StatType.magic] + 30,
    [StatType.magicDefense]: BASELINE.RARE[StatType.magicDefense] + 25,
    [StatType.speed]: BASELINE.RARE[StatType.speed] - 10,
    [StatType.critChance]: BASELINE.RARE[StatType.critChance] + 5,
    [StatType.critDamage]: BASELINE.RARE[StatType.critDamage],
  },
  skills: [
    {
      id: "venom_spit",
      name: "Venom Spit",
      cost: 55,
      costStat: StatType.energy,
      effects: [VenomSpitDamageEffect, VenomSpitPoisonEffect],
    } as Skill,
  ],
};

// Optional: export all as an array for convenience
export const RARE_ENEMIES = [
  ENEMY_EMBER_ELEMENTAL,
  ENEMY_ARCANE_SENTINEL,
  ENEMY_WHISPERING_HORROR,
  ENEMY_CRYSTAL_SERPENT,
  ENEMY_SUN_WORSHIPPER,
  ENEMY_SPECTRAL_WOLF,
  ENEMY_FOREST_GUARDIAN,
  ENEMY_SHADOW_WEAVER,
  ENEMY_FROST_GIANT,
  ENEMY_FEYWILD_HYDRA,
];
