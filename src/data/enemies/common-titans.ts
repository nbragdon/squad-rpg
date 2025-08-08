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
} from "types/skillTypes";
import { StatType } from "types/stats";
import { StatusEffectType } from "types/statusEffects";

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
      effects: [
        {
          id: "beast_titan_smash_damage_effect",
          name: "Beast Titan Smash Damage Effect",
          type: SkillEffectType.damage,
          affinities: [AffinityType.beast],
          damageMultiplier: 1.2,
          damageStat: StatType.strength,
          defenseStat: StatType.defense,
          targetType: TargetType.allEnemies,
        } as DamageSkillEffect,
        {
          id: "beast_titan_smash_cleanse_effect",
          name: "Beast Titan Smash Cleanse Effect",
          type: SkillEffectType.cleanse,
          affinities: [AffinityType.beast],
          count: 1,
          cleansableEffect: CleansableEffect.statusEffect,
          targetType: TargetType.self,
        } as CleanseSkillEffect,
      ],
    },
  ],
};

export const ENEMY_VOID_TITAN: EnemyCharacter = {
  id: "void_titan",
  name: "Void Titan",
  rarity: Rarity.COMMON,
  strongAffinities: [AffinityType.void],
  weakAffinities: [AffinityType.beast, AffinityType.chaos],
  stats: {
    [StatType.health]: 9999,
    [StatType.energy]: 15,
    [StatType.energyGain]: 15,
    [StatType.strength]: 150,
    [StatType.defense]: 300,
    [StatType.magic]: 300,
    [StatType.magicDefense]: 150,
    [StatType.speed]: 250,
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
        {
          id: "void_titan_smash_damage_effect",
          name: "Void Titan Smash Damage Effect",
          type: SkillEffectType.damage,
          affinities: [AffinityType.void],
          damageMultiplier: 1.3,
          damageStat: StatType.magic,
          defenseStat: StatType.magicDefense,
          targetType: TargetType.allEnemies,
        } as DamageSkillEffect,
      ],
    },
  ],
};

export const ENEMY_CHAOS_TITAN: EnemyCharacter = {
  id: "chaos_titan",
  name: "Chaos Titan",
  rarity: Rarity.COMMON,
  strongAffinities: [AffinityType.chaos],
  weakAffinities: [AffinityType.void, AffinityType.textile],
  stats: {
    [StatType.health]: 9999,
    [StatType.energy]: 0,
    [StatType.energyGain]: 20,
    [StatType.strength]: 150,
    [StatType.defense]: 350,
    [StatType.magic]: 150,
    [StatType.magicDefense]: 350,
    [StatType.speed]: 250,
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
        {
          id: "chaos_titan_poison_effect",
          name: "Chaos Titan Smash Poison Effect",
          type: SkillEffectType.applyStatusEffect,
          affinities: [AffinityType.chaos],
          statusEffectType: StatusEffectType.poison,
          modifierType: ModifierType.Percentage,
          stat: StatType.magic,
          value: 0.2,
          duration: 2,
          targetType: TargetType.allEnemies,
        } as ApplyPoisonStatusEffectSkillEffect,
      ],
    },
  ],
};
