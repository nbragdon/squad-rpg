import { BASELINE } from "data/statBaselines";
import { AffinityType } from "types/affinity";
import { EnemyCharacter } from "types/enemy";
import { Rarity } from "types/rarity";
import {
  SkillEffectType,
  TargetType,
  DamageSkillEffect,
  ApplyStunStatusEffectSkillEffect,
  ApplyStatusEffectSkillEffect,
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
    [StatType.health]: BASELINE.COMMON[StatType.health] + 100,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain] + 6,
    [StatType.strength]: BASELINE.COMMON[StatType.strength] + 30,
    [StatType.defense]: BASELINE.COMMON[StatType.defense] + 50,
    [StatType.magic]: BASELINE.COMMON[StatType.magic] + 30,
    [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense] + 50,
    [StatType.speed]: BASELINE.COMMON[StatType.speed] - 20,
    [StatType.critChance]: BASELINE.COMMON[StatType.critChance] + 15,
    [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage] + 50,
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
          id: "iron_shavings_stun_effect",
          name: "Iron Shavings Stun Effect",
          type: SkillEffectType.applyStatusEffect,
          statusEffectType: StatusEffectType.coins,
          affinities: [AffinityType.gem],
          value: 6,
          targetType: TargetType.self,
          stackable: true,
        } as ApplyStatusEffectSkillEffect,
      ],
    },
  ],
};
