import { BASELINE } from "data/statBaselines";
import { AffinityType } from "types/affinity";
import { EnemyCharacter } from "types/enemy";
import { Rarity } from "types/rarity";
import {
  SkillEffectType,
  TargetType,
  DamageSkillEffect,
  ApplyStatusEffectSkillEffect,
  ApplyCoinsStatusEffectSkillEffect,
} from "types/skillTypes";
import { StatType } from "types/stats";
import { StatusEffectType } from "types/statusEffects";

export const ENEMY_IRON_MIMIC_CHEST: EnemyCharacter = {
  id: "iron_mimic_chest",
  name: "Iron Mimic Chest",
  rarity: Rarity.COMMON,
  strongAffinities: [AffinityType.gem],
  weakAffinities: [AffinityType.knowledge],
  stats: {
    [StatType.health]: BASELINE.COMMON[StatType.health] + 50,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain] + 3,
    [StatType.strength]: BASELINE.COMMON[StatType.strength] + 15,
    [StatType.defense]: BASELINE.COMMON[StatType.defense] + 25,
    [StatType.magic]: BASELINE.COMMON[StatType.magic] + 15,
    [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense] + 25,
    [StatType.speed]: BASELINE.COMMON[StatType.speed] - 10,
    [StatType.critChance]: BASELINE.COMMON[StatType.critChance] + 10,
    [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage] + 30,
  },
  skills: [
    {
      id: "iron_shavings",
      name: "Iron Shavings",
      cost: 20,
      costStat: StatType.energy,
      cooldownTurns: 3,
      effects: [
        {
          id: "iron_shavings_coins_effect",
          name: "Iron Shavings Coins Effect",
          type: SkillEffectType.applyStatusEffect,
          statusEffectType: StatusEffectType.coins,
          affinities: [AffinityType.gem],
          value: 6,
          targetType: TargetType.self,
          stackable: true,
        } as ApplyCoinsStatusEffectSkillEffect,
      ],
    },
  ],
};

export const ENEMY_BRONZE_MIMIC_CHEST: EnemyCharacter = {
  id: "bronze_mimic_chest",
  name: "Bronze Mimic Chest",
  rarity: Rarity.UNCOMMON,
  strongAffinities: [AffinityType.gem],
  weakAffinities: [AffinityType.chaos],
  stats: {
    [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 35,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain] + 2,
    [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 15,
    [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 15,
    [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] + 10,
    [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] + 15,
    [StatType.speed]: BASELINE.UNCOMMON[StatType.speed],
    [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance] + 5,
    [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage] + 25,
  },
  skills: [
    {
      id: "bronze_bar",
      name: "Bronze Bar",
      cost: 25,
      costStat: StatType.energy,
      cooldownTurns: 2,
      effects: [
        {
          id: "bronze_bar_coin_effect",
          name: "Bronze Bar Coin Effect",
          affinities: [AffinityType.gem],
          type: SkillEffectType.damage,
          targetType: TargetType.randomEnemy,
          damageMultiplier: 1.2,
          damageStat: StatType.strength,
          defenseStat: StatType.defense,
        } as DamageSkillEffect,
        {
          id: "bronze_bar_coin_effect",
          name: "Bronze Bar Coin Effect",
          type: SkillEffectType.applyStatusEffect,
          statusEffectType: StatusEffectType.coins,
          affinities: [AffinityType.gem],
          value: 15,
          targetType: TargetType.self,
          stackable: true,
        } as ApplyStatusEffectSkillEffect,
      ],
    },
  ],
};

export const ENEMY_COPPER_MIMIC_CHEST: EnemyCharacter = {
  id: "copper_mimic_chest",
  name: "Copper Mimic Chest",
  rarity: Rarity.RARE,
  strongAffinities: [AffinityType.gem],
  weakAffinities: [AffinityType.textile],
  stats: {
    [StatType.health]: BASELINE.RARE[StatType.health] + 30,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.RARE[StatType.energyGain],
    [StatType.strength]: BASELINE.RARE[StatType.strength],
    [StatType.defense]: BASELINE.RARE[StatType.defense] + 10,
    [StatType.magic]: BASELINE.RARE[StatType.magic] + 5,
    [StatType.magicDefense]: BASELINE.RARE[StatType.magicDefense] + 10,
    [StatType.speed]: BASELINE.RARE[StatType.speed] + 5,
    [StatType.critChance]: BASELINE.RARE[StatType.critChance],
    [StatType.critDamage]: BASELINE.RARE[StatType.critDamage],
  },
  skills: [
    {
      id: "copper_rod",
      name: "Copper Rod",
      cost: 30,
      costStat: StatType.energy,
      cooldownTurns: 3,
      effects: [
        {
          id: "copper_rod_damage_effect",
          name: "Copper Rod Damage Effect",
          affinities: [AffinityType.gem],
          type: SkillEffectType.damage,
          targetType: TargetType.allEnemies,
          damageMultiplier: 1.2,
          damageStat: StatType.strength,
          defenseStat: StatType.defense,
        } as DamageSkillEffect,
        {
          id: "copper_rod_coin_effect",
          name: "Copper Rod Coin Effect",
          type: SkillEffectType.applyStatusEffect,
          statusEffectType: StatusEffectType.coins,
          affinities: [AffinityType.gem],
          value: 30,
          targetType: TargetType.self,
          stackable: true,
        } as ApplyStatusEffectSkillEffect,
      ],
    },
  ],
};

export const ENEMY_SILVER_MIMIC_CHEST: EnemyCharacter = {
  id: "silver_mimic_chest",
  name: "Silver Mimic Chest",
  rarity: Rarity.EPIC,
  strongAffinities: [AffinityType.gem],
  weakAffinities: [AffinityType.spirit],
  stats: {
    [StatType.health]: BASELINE.RARE[StatType.health],
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.RARE[StatType.energyGain],
    [StatType.strength]: BASELINE.RARE[StatType.strength],
    [StatType.defense]: BASELINE.RARE[StatType.defense],
    [StatType.magic]: BASELINE.RARE[StatType.magic],
    [StatType.magicDefense]: BASELINE.RARE[StatType.magicDefense],
    [StatType.speed]: BASELINE.RARE[StatType.speed],
    [StatType.critChance]: BASELINE.RARE[StatType.critChance],
    [StatType.critDamage]: BASELINE.RARE[StatType.critDamage],
  },
  skills: [
    {
      id: "silver_sheet",
      name: "Silver Sheet",
      cost: 40,
      costStat: StatType.energy,
      cooldownTurns: 4,
      effects: [
        {
          id: "silver_sheet_damage_effect",
          name: "Silver Sheet Damage Effect",
          affinities: [AffinityType.gem],
          type: SkillEffectType.damage,
          targetType: TargetType.randomEnemy,
          damageMultiplier: 1.1,
          damageStat: StatType.strength,
          defenseStat: StatType.defense,
        } as DamageSkillEffect,
        {
          id: "silver_sheet_coin_effect",
          name: "Silver Sheet Coin Effect",
          type: SkillEffectType.applyStatusEffect,
          statusEffectType: StatusEffectType.coins,
          affinities: [AffinityType.gem],
          value: 50,
          targetType: TargetType.self,
          stackable: true,
        } as ApplyStatusEffectSkillEffect,
        {
          id: "silver_sheet_damage_effect",
          name: "Silver Sheet Damage Effect",
          affinities: [AffinityType.gem],
          type: SkillEffectType.damage,
          targetType: TargetType.randomEnemy,
          damageMultiplier: 0.5,
          damageStat: StatType.strength,
          defenseStat: StatType.defense,
        } as DamageSkillEffect,
      ],
    },
  ],
};

export const ENEMY_GOLD_MIMIC_CHEST: EnemyCharacter = {
  id: "gold_mimic_chest",
  name: "Gold Mimic Chest",
  rarity: Rarity.LEGENDARY,
  strongAffinities: [AffinityType.gem],
  weakAffinities: [AffinityType.radiance],
  stats: {
    [StatType.health]: BASELINE.RARE[StatType.health],
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.RARE[StatType.energyGain],
    [StatType.strength]: BASELINE.RARE[StatType.strength] - 20,
    [StatType.defense]: BASELINE.RARE[StatType.defense],
    [StatType.magic]: BASELINE.RARE[StatType.magic],
    [StatType.magicDefense]: BASELINE.RARE[StatType.magicDefense],
    [StatType.speed]: BASELINE.RARE[StatType.speed] - 20,
    [StatType.critChance]: BASELINE.RARE[StatType.critChance],
    [StatType.critDamage]: BASELINE.RARE[StatType.critDamage],
  },
  skills: [
    {
      id: "gold_beam",
      name: "Gold Beam",
      cost: 50,
      costStat: StatType.energy,
      cooldownTurns: 6,
      effects: [
        {
          id: "gold_beam_coin_effect",
          name: "Gold Beam Coin Effect",
          type: SkillEffectType.applyStatusEffect,
          statusEffectType: StatusEffectType.coins,
          affinities: [AffinityType.gem],
          value: 80,
          targetType: TargetType.self,
          stackable: true,
        } as ApplyStatusEffectSkillEffect,
        {
          id: "gold_beam_damage_effect",
          name: "Gold Beam Damage Effect",
          affinities: [AffinityType.gem],
          type: SkillEffectType.damage,
          targetType: TargetType.allEnemies,
          damageMultiplier: 1.1,
          damageStat: StatType.strength,
          defenseStat: StatType.defense,
        } as DamageSkillEffect,
      ],
    },
  ],
};
