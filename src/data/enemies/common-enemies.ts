import { AffinityType } from "../../types/affinity";
import { EnemyCharacter } from "../../types/enemy";
import { Rarity } from "../../types/rarity";
import {
  AdjustStatSkillEffect,
  DamageSkillEffect,
  HealSkillEffect,
  ModifierType,
  Skill,
  SkillEffectType,
  TargetType,
} from "../../types/skillTypes";
import { StatType } from "../../types/stats";
import { BASELINE } from "../statBaselines";

const slimeSplashSkill: Skill = {
  id: "slime_splash",
  name: "Slime Splash",
  cost: 20,
  costStat: StatType.energy,
  effects: [
    {
      id: "slime_splash_effect",
      name: "Slime Splash Effect",
      type: SkillEffectType.damage,
      affinities: [AffinityType.chaos],
      damageMultiplier: 1.3,
      damageStat: StatType.strength,
      defenseStat: StatType.defense,
      targetType: "randomEnemy",
    } as DamageSkillEffect,
    {
      id: "slime_splash_speed_reduction",
      name: "Slime Splash Speed Reduction",
      type: SkillEffectType.adjustStat,
      affinities: [AffinityType.chaos],
      stat: StatType.speed,
      modifierValue: -30,
      modifierType: ModifierType.Flat,
      duration: 2,
      targetType: "randomEnemy",
    } as AdjustStatSkillEffect,
  ],
};

export const ENEMY_SLIME_GREEN: EnemyCharacter = {
  id: "slime_green",
  name: "Green Slime",
  rarity: Rarity.COMMON,
  strongAffinities: [AffinityType.chaos],
  weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  stats: {
    [StatType.health]: BASELINE.COMMON[StatType.health] + 50,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain],
    [StatType.strength]: BASELINE.COMMON[StatType.strength] - 20,
    [StatType.defense]: BASELINE.COMMON[StatType.defense] + 30,
    [StatType.magic]: BASELINE.COMMON[StatType.magic] + 10,
    [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense] - 10,
    [StatType.speed]: BASELINE.COMMON[StatType.speed],
    [StatType.critChance]: BASELINE.COMMON[StatType.critChance],
    [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage],
  },
  skills: [slimeSplashSkill],
};

export const ENEMY_RAT_GIANT: EnemyCharacter = {
  id: "rat_giant",
  name: "Giant Rat",
  rarity: Rarity.COMMON,
  strongAffinities: [AffinityType.beast],
  weakAffinities: [AffinityType.beast, AffinityType.textile],
  stats: {
    [StatType.health]: BASELINE.COMMON[StatType.health] + 80,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain],
    [StatType.strength]: BASELINE.COMMON[StatType.strength] + 20,
    [StatType.defense]: BASELINE.COMMON[StatType.defense] - 10,
    [StatType.magic]: BASELINE.COMMON[StatType.magic] - 20,
    [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense] - 20,
    [StatType.speed]: BASELINE.COMMON[StatType.speed] - 10,
    [StatType.critChance]: BASELINE.COMMON[StatType.critChance],
    [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage],
  },
  skills: [
    {
      id: "gnaw",
      name: "Gnaw",
      cost: 25,
      costStat: StatType.energy,
      effects: [
        {
          id: "gnaw_damage_effect",
          name: "Gnaw Damage Effect",
          type: SkillEffectType.damage,
          affinities: [AffinityType.beast],
          damageMultiplier: 1.1,
          damageStat: StatType.strength,
          defenseStat: StatType.defense,
          targetType: "randomEnemy",
        } as DamageSkillEffect,
        {
          id: "gnaw_heal_effect",
          name: "Gnaw Heal Effect",
          type: SkillEffectType.heal,
          affinities: [AffinityType.beast],
          healMultiplier: 0.1,
          healStat: StatType.strength,
          targetType: TargetType.self,
        } as HealSkillEffect,
      ],
    },
  ],
};

export const ENEMY_BAT_CAVE: EnemyCharacter = {
  id: "bat_cave",
  name: "Cave Bat",
  rarity: Rarity.COMMON,
  strongAffinities: [AffinityType.gem],
  weakAffinities: [AffinityType.chaos, AffinityType.radiance],
  stats: {
    [StatType.health]: BASELINE.COMMON[StatType.health] - 10,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain] + 6,
    [StatType.strength]: BASELINE.COMMON[StatType.strength] + 30,
    [StatType.defense]: BASELINE.COMMON[StatType.defense],
    [StatType.magic]: BASELINE.COMMON[StatType.magic],
    [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense],
    [StatType.speed]: BASELINE.COMMON[StatType.speed] + 30,
    [StatType.critChance]: BASELINE.COMMON[StatType.critChance],
    [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage],
  },
  skills: [
    /*
    {
      id: "sonic_screech",
      name: "Sonic Screech",
      description:
        "Lets out a piercing screech, damaging and lowering the target’s attack for 2 turns.",
      damageMultiplier: 0.9,
      damageStat: "speed",
      energyCost: 22,
      statusEffect: {
        id: "attackDown",
        name: "Attack Down",
        type: StatusEffectType.Debuff,
        value: 20,
        duration: 2,
      },
    },
  */
  ],
};

export const ENEMY_GOBLIN_SNEAK: EnemyCharacter = {
  id: "goblin_sneak",
  name: "Sneaky Goblin",
  rarity: Rarity.COMMON,
  strongAffinities: [AffinityType.textile],
  weakAffinities: [AffinityType.gem, AffinityType.void],
  stats: {
    [StatType.health]: BASELINE.COMMON[StatType.health] - 20,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain],
    [StatType.strength]: BASELINE.COMMON[StatType.strength] + 15,
    [StatType.defense]: BASELINE.COMMON[StatType.defense] - 10,
    [StatType.magic]: BASELINE.COMMON[StatType.magic] + 15, // Goblins are not very magical
    [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense], // Goblins are not very magical either
    [StatType.speed]: BASELINE.COMMON[StatType.speed] + 15,
    [StatType.critChance]: BASELINE.COMMON[StatType.critChance],
    [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage],
  },
  skills: [
    /*
    {
      id: "stab_n_run",
      name: "Stab & Run",
      description: "Stabs the target and increases its own speed for 1 turn.",
      damageMultiplier: 1.2,
      damageStat: "attack",
      energyCost: 28,
      statusEffect: {
        id: "selfSpeedUp",
        name: "Speed Up",
        type: StatusEffectType.Buff,
        value: 20,
        duration: 1,
      },
    },
  */
  ],
};

export const ENEMY_FUNGUS_SPORELING: EnemyCharacter = {
  id: "fungus_sporeling",
  name: "Sporeling",
  rarity: Rarity.COMMON,
  strongAffinities: [AffinityType.knowledge],
  weakAffinities: [AffinityType.radiance, AffinityType.knowledge],
  stats: {
    [StatType.health]: BASELINE.COMMON[StatType.health] + 30,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain],
    [StatType.strength]: BASELINE.COMMON[StatType.strength] - 10,
    [StatType.defense]: BASELINE.COMMON[StatType.defense] + 10,
    [StatType.magic]: BASELINE.COMMON[StatType.magic] + 20,
    [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense] + 20,
    [StatType.speed]: BASELINE.COMMON[StatType.speed] - 10,
    [StatType.critChance]: BASELINE.COMMON[StatType.critChance],
    [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage],
  },
  skills: [
    /*
    {
      id: "spore_cloud",
      name: "Spore Cloud",
      description:
        "Releases spores, damaging and poisoning the target for 2 turns.",
      damageMultiplier: 1.2,
      damageStat: "attack",
      energyCost: 24,
      statusEffect: {
        id: "poison",
        name: "Poison",
        type: StatusEffectType.Dot,
        value: 15,
        duration: 2,
      },
    },
  */
  ],
};

export const ENEMY_SKELETON_MINI: EnemyCharacter = {
  id: "skeleton_mini",
  name: "Mini Skeleton",
  rarity: Rarity.COMMON,
  strongAffinities: [AffinityType.void],
  weakAffinities: [AffinityType.chaos, AffinityType.beast],
  stats: {
    [StatType.health]: BASELINE.COMMON[StatType.health] - 30,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain],
    [StatType.strength]: BASELINE.COMMON[StatType.strength] + 5,
    [StatType.defense]: BASELINE.COMMON[StatType.defense] + 10,
    [StatType.magic]: BASELINE.COMMON[StatType.magic] - 20,
    [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense],
    [StatType.speed]: BASELINE.COMMON[StatType.speed] - 10,
    [StatType.critChance]: BASELINE.COMMON[StatType.critChance],
    [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage],
  },
  skills: [
    /*
    {
      id: "bone_throw",
      name: "Bone Throw",
      description:
        "Throws a bone, dealing damage and lowering the target’s defense for 1 turn.",
      damageMultiplier: 1.2,
      damageStat: "attack",
      energyCost: 23,
      statusEffect: {
        id: "defenseDown",
        name: "Defense Down",
        type: StatusEffectType.Debuff,
        value: 20,
        duration: 1,
      },
    },
  */
  ],
};

export const ENEMY_WOLF_CUB: EnemyCharacter = {
  id: "wolf_cub",
  name: "Wolf Cub",
  rarity: Rarity.COMMON,
  strongAffinities: [AffinityType.beast],
  weakAffinities: [AffinityType.textile, AffinityType.spirit],
  stats: {
    [StatType.health]: BASELINE.COMMON[StatType.health] - 10,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain] + 3,
    [StatType.strength]: BASELINE.COMMON[StatType.strength] + 10,
    [StatType.defense]: BASELINE.COMMON[StatType.defense] - 10,
    [StatType.magic]: BASELINE.COMMON[StatType.magic],
    [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense],
    [StatType.speed]: BASELINE.COMMON[StatType.speed] + 20,
    [StatType.critChance]: BASELINE.COMMON[StatType.critChance],
    [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage],
  },
  skills: [
    /*
    {
      id: "pack_howl",
      name: "Pack Howl",
      description:
        "Howls to call its pack, increasing its own attack for 2 turns and dealing damage.",
      damageMultiplier: 1.2,
      damageStat: "attack",
      energyCost: 26,
      statusEffect: {
        id: "selfAttackUp",
        name: "Attack Up",
        type: StatusEffectType.Buff,
        value: 20,
        duration: 2,
      },
    },
  */
  ],
};

export const ENEMY_IMP_FIRE: EnemyCharacter = {
  id: "imp_fire",
  name: "Fire Imp",
  rarity: Rarity.COMMON,
  strongAffinities: [AffinityType.chaos],
  weakAffinities: [AffinityType.beast, AffinityType.knowledge],
  stats: {
    [StatType.health]: BASELINE.COMMON[StatType.health] - 40,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain],
    [StatType.strength]: BASELINE.COMMON[StatType.strength] + 20,
    [StatType.defense]: BASELINE.COMMON[StatType.defense] - 20,
    [StatType.magic]: BASELINE.COMMON[StatType.magic] + 20,
    [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense] + 10,
    [StatType.speed]: BASELINE.COMMON[StatType.speed] + 10,
    [StatType.critChance]: BASELINE.COMMON[StatType.critChance],
    [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage],
  },
  skills: [
    /*
    {
      id: "ember_burst",
      name: "Ember Burst",
      description:
        "Shoots a burst of embers, dealing damage and burning the target for 2 turns.",
      damageMultiplier: 1.2,
      damageStat: "attack",
      energyCost: 30,
      statusEffect: {
        id: "burn",
        name: "Burn",
        type: StatusEffectType.Dot,
        value: 18,
        duration: 2,
      },
    },
  */
  ],
};

export const ENEMY_BEETLE_IRON: EnemyCharacter = {
  id: "beetle_iron",
  name: "Iron Beetle",
  rarity: Rarity.COMMON,
  strongAffinities: [AffinityType.gem],
  weakAffinities: [AffinityType.chaos, AffinityType.spirit],
  stats: {
    [StatType.health]: BASELINE.COMMON[StatType.health] + 60,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain],
    [StatType.strength]: BASELINE.COMMON[StatType.strength] - 10,
    [StatType.defense]: BASELINE.COMMON[StatType.defense] + 30,
    [StatType.magic]: BASELINE.COMMON[StatType.magic],
    [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense],
    [StatType.speed]: BASELINE.COMMON[StatType.speed] - 20,
    [StatType.critChance]: BASELINE.COMMON[StatType.critChance],
    [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage],
  },
  skills: [
    /*
    {
      id: "iron_clash",
      name: "Iron Clash",
      description:
        "Charges and slams, dealing damage and increasing its own defense for 2 turns.",
      damageMultiplier: 1.2,
      damageStat: "attack",
      energyCost: 22,
      statusEffect: {
        id: "selfDefenseUp",
        name: "Defense Up",
        type: StatusEffectType.Buff,
        value: 25,
        duration: 2,
      },
    },
  */
  ],
};

export const ENEMY_MIMIC_CHEST: EnemyCharacter = {
  id: "mimic_chest",
  name: "Mimic Chest",
  rarity: Rarity.COMMON,
  strongAffinities: [AffinityType.gem],
  weakAffinities: [AffinityType.void],
  stats: {
    [StatType.health]: BASELINE.COMMON[StatType.health] + 50,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain],
    [StatType.strength]: BASELINE.COMMON[StatType.strength] + 15,
    [StatType.defense]: BASELINE.COMMON[StatType.defense] + 10,
    [StatType.magic]: BASELINE.COMMON[StatType.magic] + 5,
    [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense] + 10,
    [StatType.speed]: BASELINE.COMMON[StatType.speed] - 10,
    [StatType.critChance]: BASELINE.COMMON[StatType.critChance] + 5,
    [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage] + 0.5,
  },
  skills: [
    /*
    {
      id: "chomp_trap",
      name: "Chomp Trap",
      description:
        "Springs open and bites, dealing heavy damage and stunning the target for 1 turn.",
      damageMultiplier: 1.2,
      damageStat: "attack",
      energyCost: 35,
      statusEffect: {
        id: "stun",
        name: "Stun",
        type: StatusEffectType.Cc,
        value: 1,
        duration: 1,
      },
    },
  */
  ],
};

// Optional: export all as an array for convenience
export const COMMON_ENEMIES = [
  ENEMY_SLIME_GREEN,
  ENEMY_RAT_GIANT,
  ENEMY_BAT_CAVE,
  ENEMY_GOBLIN_SNEAK,
  ENEMY_FUNGUS_SPORELING,
  ENEMY_SKELETON_MINI,
  ENEMY_WOLF_CUB,
  ENEMY_IMP_FIRE,
  ENEMY_BEETLE_IRON,
  ENEMY_MIMIC_CHEST,
];
