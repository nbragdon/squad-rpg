import { BASELINE } from "data/statBaselines";
import { AffinityType } from "types/affinity";
import { EnemyCharacter } from "types/enemy";
import { Rarity } from "types/rarity";
import {
  SkillEffectType,
  TargetType,
  DamageSkillEffect,
  ApplyPoisonStatusEffectSkillEffect,
  ModifierType,
  CleanseSkillEffect,
  CleansableEffect,
  ApplyBrittleStatusEffectSkillEffect,
  ApplyBleedStatusEffectSkillEffect,
  ApplyShieldStatusEffectSkillEffect,
  AdjustStatSkillEffect,
  AdjustmentDirection,
} from "types/skillTypes";
import { StatType } from "types/stats";
import { StatusEffectType } from "types/statusEffects";

const BEAST_TITAN_SMASH_DAMAGE_EFFECT: DamageSkillEffect = {
  id: "beast_titan_smash_damage_effect",
  name: "Beast Titan Smash Damage Effect",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast],
  damageMultiplier: 1.2,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.allEnemies,
};

const BEAST_TITAN_CLEANSE_EFFECT: CleanseSkillEffect = {
  id: "beast_titan_smash_cleanse_effect",
  name: "Beast Titan Smash Cleanse Effect",
  type: SkillEffectType.cleanse,
  affinities: [AffinityType.beast],
  count: 1,
  cleansableEffect: CleansableEffect.statusEffect,
  targetType: TargetType.self,
};

export const ENEMY_BEAST_TITAN: EnemyCharacter = {
  id: "beast_titan",
  name: "Beast Titan",
  rarity: Rarity.COMMON,
  strongAffinities: [AffinityType.beast],
  weakAffinities: [AffinityType.void, AffinityType.textile],
  stats: {
    [StatType.health]: 9999,
    [StatType.energy]: 10,
    [StatType.energyGain]: 10,
    [StatType.strength]: 200,
    [StatType.defense]: 200,
    [StatType.magic]: 200,
    [StatType.magicDefense]: 200,
    [StatType.speed]: 200,
    [StatType.critChance]: 15,
    [StatType.critDamage]: 80,
  },
  skills: [
    {
      id: "beast_titan_smash",
      name: "Beast Titan Smash",
      cost: 30,
      costStat: StatType.energy,
      effects: [BEAST_TITAN_SMASH_DAMAGE_EFFECT, BEAST_TITAN_CLEANSE_EFFECT],
    },
  ],
};

const VOID_TITAN_SMASH_DAMAGE_EFFECT: DamageSkillEffect = {
  id: "void_titan_smash_damage_effect",
  name: "Void Titan Smash Damage Effect",
  type: SkillEffectType.damage,
  affinities: [AffinityType.void],
  damageMultiplier: 1.3,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
};

const VOID_TITAN_SMASH_BRITTLE_EFFECT: ApplyBrittleStatusEffectSkillEffect = {
  id: "void_titan_brittle",
  name: "Void Titan Brittle",
  statusEffectType: StatusEffectType.brittle,
  value: 20,
  stackable: true,
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void],
  targetType: TargetType.allEnemies,
};

export const ENEMY_VOID_TITAN: EnemyCharacter = {
  id: "void_titan",
  name: "Void Titan",
  rarity: Rarity.UNCOMMON,
  strongAffinities: [AffinityType.void],
  weakAffinities: [AffinityType.beast, AffinityType.chaos],
  stats: {
    [StatType.health]: 9999,
    [StatType.energy]: 15,
    [StatType.energyGain]: 12,
    [StatType.strength]: 150,
    [StatType.defense]: 225,
    [StatType.magic]: 235,
    [StatType.magicDefense]: 225,
    [StatType.speed]: 2220,
    [StatType.critChance]: 10,
    [StatType.critDamage]: 50,
  },
  skills: [
    {
      id: "void_titan_smash",
      name: "Void Titan Smash",
      cost: 30,
      costStat: StatType.energy,
      effects: [
        VOID_TITAN_SMASH_DAMAGE_EFFECT,
        VOID_TITAN_SMASH_BRITTLE_EFFECT,
      ],
    },
  ],
};

const CHAOS_TITAN_SMASH_POISON: ApplyPoisonStatusEffectSkillEffect = {
  id: "chaos_titan_poison_effect",
  name: "Chaos Titan Smash Poison Effect",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos],
  statusEffectType: StatusEffectType.poison,
  modifierType: ModifierType.Percentage,
  stat: StatType.magic,
  value: 0.25,
  duration: 2,
  targetType: TargetType.allEnemies,
  stackable: false,
};

const CHAOS_TITAN_SMASH_DAMAGE: DamageSkillEffect = {
  type: SkillEffectType.damage,
  damageMultiplier: 0.5,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  id: "chaos_titan_smash_damage_effect",
  name: "Chaos Titan Smash Damage Effect",
  affinities: [AffinityType.chaos],
  targetType: TargetType.allEnemies,
};

const CHAOS_TITAN_SMASH_BLEED: ApplyBleedStatusEffectSkillEffect = {
  statusEffectType: StatusEffectType.bleed,
  value: 2,
  stackable: true,
  type: SkillEffectType.applyStatusEffect,
  id: "chaos_titan_smash_bleed_effect",
  name: "Chaos Titan Smash Bleed Effect",
  affinities: [AffinityType.chaos],
  targetType: TargetType.allEnemies,
};

export const ENEMY_CHAOS_TITAN: EnemyCharacter = {
  id: "chaos_titan",
  name: "Chaos Titan",
  rarity: Rarity.RARE,
  strongAffinities: [AffinityType.chaos],
  weakAffinities: [AffinityType.gem, AffinityType.radiance],
  stats: {
    [StatType.health]: 9999,
    [StatType.energy]: 0,
    [StatType.energyGain]: 14,
    [StatType.strength]: 150,
    [StatType.defense]: 250,
    [StatType.magic]: 170,
    [StatType.magicDefense]: 250,
    [StatType.speed]: 200,
    [StatType.critChance]: 10,
    [StatType.critDamage]: 50,
  },
  skills: [
    {
      id: "chaos_titan_smash",
      name: "Chaos Titan Smash",
      cost: 35,
      costStat: StatType.energy,
      effects: [
        CHAOS_TITAN_SMASH_POISON,
        CHAOS_TITAN_SMASH_DAMAGE,
        CHAOS_TITAN_SMASH_BLEED,
      ],
    },
  ],
};

const TEXTILE_TITAN_SMASH_PHYSICAL_DAMAGE: DamageSkillEffect = {
  type: SkillEffectType.damage,
  damageMultiplier: 0.7,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  id: "textile_titan_smash_physical_damage_effect",
  name: "Textile Titan Smash Physical Damage Effect",
  affinities: [AffinityType.textile],
  targetType: TargetType.allEnemies,
};

const TEXTILE_TITAN_SMASH_MAGICAL_DAMAGE: DamageSkillEffect = {
  type: SkillEffectType.damage,
  damageMultiplier: 0.7,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  id: "textile_titan_smash_magic_damage_effect",
  name: "Textile Titan Smash Magic Damage Effect",
  affinities: [AffinityType.textile],
  targetType: TargetType.allEnemies,
};

const TEXTILE_TITAN_SMASH_SHIELD: ApplyShieldStatusEffectSkillEffect = {
  statusEffectType: StatusEffectType.shield,
  stat: StatType.defense,
  value: 0.25,
  stackable: true,
  type: SkillEffectType.applyStatusEffect,
  id: "textile_titan_shield_effect",
  name: "Textile Titan Shield Effect",
  affinities: [AffinityType.textile],
  targetType: TargetType.self,
};

export const ENEMY_TEXTILE_TITAN: EnemyCharacter = {
  id: "textile_titan",
  name: "Textile Titan",
  rarity: Rarity.EPIC,
  strongAffinities: [AffinityType.textile],
  weakAffinities: [AffinityType.spirit],
  stats: {
    [StatType.health]: 9999,
    [StatType.energy]: 0,
    [StatType.energyGain]: 10,
    [StatType.strength]: 210,
    [StatType.defense]: 275,
    [StatType.magic]: 210,
    [StatType.magicDefense]: 250,
    [StatType.speed]: 190,
    [StatType.critChance]: 5,
    [StatType.critDamage]: 120,
  },
  skills: [
    {
      id: "textile_titan_smash",
      name: "Textile Titan Smash",
      cost: 35,
      costStat: StatType.energy,
      effects: [
        TEXTILE_TITAN_SMASH_PHYSICAL_DAMAGE,
        TEXTILE_TITAN_SMASH_MAGICAL_DAMAGE,
        TEXTILE_TITAN_SMASH_SHIELD,
      ],
    },
  ],
};

const SPIRIT_TITAN_SMASH_MAGIC_DAMAGE: DamageSkillEffect = {
  type: SkillEffectType.damage,
  damageMultiplier: 1.4,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  id: "spirit_titan_smash_magic_damage_effect",
  name: "Spirit Titan Smash Magic Damage Effect",
  affinities: [AffinityType.spirit],
  targetType: TargetType.allEnemies,
};

const SPIRIT_TITAN_SMASH_STRENGTH_REDUCTION: AdjustStatSkillEffect = {
  type: SkillEffectType.adjustStat,
  userStat: StatType.magic,
  stat: StatType.strength,
  modifierValue: 0.35,
  duration: 2,
  direction: AdjustmentDirection.decrease,
  id: "spirit_titan_smash_strength_reduction_effect",
  name: "Spirit Titan Smash Strength Reduction Effect",
  affinities: [AffinityType.spirit],
  targetType: TargetType.allEnemies,
};

export const ENEMY_SPIRIT_TITAN: EnemyCharacter = {
  id: "spirit_titan",
  name: "Spirit Titan",
  rarity: Rarity.EPIC,
  strongAffinities: [AffinityType.spirit],
  weakAffinities: [AffinityType.knowledge],
  stats: {
    [StatType.health]: 9999,
    [StatType.energy]: 0,
    [StatType.energyGain]: 15,
    [StatType.strength]: 180,
    [StatType.defense]: 300,
    [StatType.magic]: 300,
    [StatType.magicDefense]: 250,
    [StatType.speed]: 220,
    [StatType.critChance]: 45,
    [StatType.critDamage]: 30,
  },
  skills: [
    {
      id: "spirit_titan_smash",
      name: "Spirit Titan Smash",
      cost: 35,
      costStat: StatType.energy,
      effects: [
        SPIRIT_TITAN_SMASH_MAGIC_DAMAGE,
        SPIRIT_TITAN_SMASH_STRENGTH_REDUCTION,
      ],
    },
  ],
};
