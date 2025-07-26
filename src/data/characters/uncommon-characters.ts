import { AffinityType } from "../../types/affinity";
import { CharacterBase } from "../../types/character";
import { Rarity } from "../../types/rarity";
import { StatType } from "../../types/stats";
import { HeelSmashSkill, StoneSkinSkill } from "../skills/common-skills-1";
import { BASELINE } from "../statBaselines";

export const uncommonCharacters: CharacterBase[] = [
  {
    id: "steelbreaker",
    name: "Steelbreaker",
    rarity: Rarity.UNCOMMON,
    stats: {
      [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain],
      [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 10,
      [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 10,
      [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.UNCOMMON[StatType.speed],
      [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
    },
    skills: [HeelSmashSkill, StoneSkinSkill], //steelBreaker, burningBlade
    ultimateSkill: HeelSmashSkill, //heroicCharge
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  },
  {
    id: "frostguard",
    name: "Frostguard",
    rarity: Rarity.UNCOMMON,
    stats: {
      [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain],
      [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 10,
      [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 10,
      [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.UNCOMMON[StatType.speed],
      [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
    },
    skills: [HeelSmashSkill, StoneSkinSkill], //frostGuardian, sandstorm
    ultimateSkill: HeelSmashSkill, //dragonRoar
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  },
  {
    id: "pyromancer",
    name: "Pyromancer",
    rarity: Rarity.UNCOMMON,
    stats: {
      [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain],
      [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 10,
      [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 10,
      [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.UNCOMMON[StatType.speed],
      [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
    },
    skills: [HeelSmashSkill, StoneSkinSkill], //pyreBlast, flameStrike
    ultimateSkill: HeelSmashSkill, //meteorStorm
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  },
  {
    id: "cryomancer",
    name: "Cryomancer",
    rarity: Rarity.UNCOMMON,
    stats: {
      [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain],
      [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 10,
      [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 10,
      [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.UNCOMMON[StatType.speed],
      [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
    },
    skills: [HeelSmashSkill, StoneSkinSkill], //cryoSpike, iceBlast
    ultimateSkill: HeelSmashSkill, //frostNova
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  },
  {
    id: "lightkeeper",
    name: "Lightkeeper",
    rarity: Rarity.UNCOMMON,
    stats: {
      [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain],
      [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 10,
      [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 10,
      [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.UNCOMMON[StatType.speed],
      [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
    },
    skills: [HeelSmashSkill, StoneSkinSkill], //radiantWard, quickHeal
    ultimateSkill: HeelSmashSkill, //radiantGrace
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  },
  {
    id: "shadowhealer",
    name: "Shadowhealer",
    rarity: Rarity.UNCOMMON,
    stats: {
      [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain],
      [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 10,
      [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 10,
      [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.UNCOMMON[StatType.speed],
      [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
    },
    skills: [HeelSmashSkill, StoneSkinSkill], //shadowHeal, divineAegis
    ultimateSkill: HeelSmashSkill, //voidCollapse
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  },
  {
    id: "deathbringer",
    name: "Deathbringer",
    rarity: Rarity.UNCOMMON,
    stats: {
      [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain],
      [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 10,
      [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 10,
      [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.UNCOMMON[StatType.speed],
      [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
    },
    skills: [HeelSmashSkill, StoneSkinSkill], //venomousBite, shadowStep
    ultimateSkill: HeelSmashSkill, //primalRage
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  },
  {
    id: "darkflame",
    name: "Darkflame",
    rarity: Rarity.UNCOMMON,
    stats: {
      [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain],
      [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 10,
      [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 10,
      [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.UNCOMMON[StatType.speed],
      [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
    },
    skills: [HeelSmashSkill, StoneSkinSkill], //bloodpact, berserk
    ultimateSkill: HeelSmashSkill, //infernalChains
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  },
  {
    id: "nightfire",
    name: "Nightfire",
    rarity: Rarity.UNCOMMON,
    stats: {
      [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain],
      [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 10,
      [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 10,
      [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.UNCOMMON[StatType.speed],
      [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
    },
    skills: [HeelSmashSkill, StoneSkinSkill], //thunderStrike, berserk
    ultimateSkill: HeelSmashSkill, //bloodMoon
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  },
  {
    id: "crimson_lord",
    name: "Crimson Lord",
    rarity: Rarity.UNCOMMON,
    stats: {
      [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain],
      [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 10,
      [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 10,
      [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.UNCOMMON[StatType.speed],
      [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
    },
    skills: [HeelSmashSkill, StoneSkinSkill], //bloodpact, berserk
    ultimateSkill: HeelSmashSkill, //bloodKnightCrimsonPact
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  },
  {
    id: "demonbane",
    name: "Demonbane",
    rarity: Rarity.UNCOMMON,
    stats: {
      [StatType.health]: BASELINE.UNCOMMON[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.UNCOMMON[StatType.energyGain],
      [StatType.strength]: BASELINE.UNCOMMON[StatType.strength] + 10,
      [StatType.defense]: BASELINE.UNCOMMON[StatType.defense] + 10,
      [StatType.magic]: BASELINE.UNCOMMON[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.UNCOMMON[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.UNCOMMON[StatType.speed],
      [StatType.critChance]: BASELINE.UNCOMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.UNCOMMON[StatType.critDamage],
    },
    skills: [HeelSmashSkill, StoneSkinSkill], //flameStrike, shadowStep
    ultimateSkill: HeelSmashSkill, //demonslayerBanish,
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  },
];
