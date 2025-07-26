import { AffinityType } from "../../types/affinity";
import { CharacterBase } from "../../types/character";
import { Rarity } from "../../types/rarity";
import { StatType } from "../../types/stats";
import {
  ArcaneBoltSkill,
  HeelSmashSkill,
  QuickStabSkill,
  StoneSkinSkill,
  ThunderClapSkill,
  VenomDaggerSkill,
} from "../skills/common-skills-1";
import { BASELINE } from "../statBaselines";

export const commonCharacters: CharacterBase[] = [
  {
    id: "ironfoot",
    name: "Ironfoot",
    rarity: Rarity.COMMON,
    stats: {
      [StatType.health]: BASELINE.COMMON[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain],
      [StatType.strength]: BASELINE.COMMON[StatType.strength] + 10,
      [StatType.defense]: BASELINE.COMMON[StatType.defense] + 10,
      [StatType.magic]: BASELINE.COMMON[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.COMMON[StatType.speed],
      [StatType.critChance]: BASELINE.COMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage],
    },
    skills: [HeelSmashSkill, StoneSkinSkill],
    ultimateSkill: HeelSmashSkill, // warriorFury,
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  },
  {
    id: "quickblade",
    name: "Quickblade",
    rarity: Rarity.COMMON,
    stats: {
      [StatType.health]: BASELINE.COMMON[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain],
      [StatType.strength]: BASELINE.COMMON[StatType.strength] + 10,
      [StatType.defense]: BASELINE.COMMON[StatType.defense] + 10,
      [StatType.magic]: BASELINE.COMMON[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.COMMON[StatType.speed],
      [StatType.critChance]: BASELINE.COMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage],
    },
    skills: [VenomDaggerSkill, QuickStabSkill],
    ultimateSkill: VenomDaggerSkill, //rogueAmbush,
    strongAffinities: [AffinityType.void],
    weakAffinities: [AffinityType.radiance, AffinityType.textile],
  },
  {
    id: "stormweaver",
    name: "Stormweaver",
    rarity: Rarity.COMMON,
    stats: {
      [StatType.health]: BASELINE.COMMON[StatType.health] - 40,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain] + 2,
      [StatType.strength]: BASELINE.COMMON[StatType.strength] - 20,
      [StatType.defense]: BASELINE.COMMON[StatType.defense] - 20,
      [StatType.magic]: BASELINE.COMMON[StatType.magic] + 40,
      [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense] + 10,
      [StatType.speed]: BASELINE.COMMON[StatType.speed],
      [StatType.critChance]: BASELINE.COMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage],
    },
    skills: [ThunderClapSkill, ArcaneBoltSkill],
    ultimateSkill: ThunderClapSkill, // wizardCataclysm,
    strongAffinities: [AffinityType.chaos],
    weakAffinities: [AffinityType.beast, AffinityType.void],
  },
  {
    id: "lightbringer",
    name: "Lightbringer",
    rarity: Rarity.COMMON,
    stats: {
      [StatType.health]: BASELINE.COMMON[StatType.health] + 10,
      [StatType.energy]: 5,
      [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain],
      [StatType.strength]: BASELINE.COMMON[StatType.strength],
      [StatType.defense]: BASELINE.COMMON[StatType.defense] + 10,
      [StatType.magic]: BASELINE.COMMON[StatType.magic],
      [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense] + 10,
      [StatType.speed]: BASELINE.COMMON[StatType.speed] + 20,
      [StatType.critChance]: BASELINE.COMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage],
    },
    skills: [ThunderClapSkill, ArcaneBoltSkill], // quickHeal, holyLight
    ultimateSkill: ThunderClapSkill, // clericSanctuary
    strongAffinities: [AffinityType.radiance],
    weakAffinities: [AffinityType.chaos, AffinityType.void],
  },
  {
    id: "wolfsbane",
    name: "Wolfsbane",
    rarity: Rarity.COMMON,
    stats: {
      [StatType.health]: BASELINE.COMMON[StatType.health],
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain] + 1,
      [StatType.strength]: BASELINE.COMMON[StatType.strength] + 10,
      [StatType.defense]: BASELINE.COMMON[StatType.defense] - 10,
      [StatType.magic]: BASELINE.COMMON[StatType.magic],
      [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense] - 10,
      [StatType.speed]: BASELINE.COMMON[StatType.speed] + 10,
      [StatType.critChance]: BASELINE.COMMON[StatType.critChance] + 3,
      [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage] + 0.1,
    },
    skills: [ThunderClapSkill, ArcaneBoltSkill], // burningLash, cripplingShot
    ultimateSkill: ThunderClapSkill, // hunterVolley
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.gem, AffinityType.knowledge],
  },
  {
    id: "grimward",
    name: "Grimward",
    rarity: Rarity.COMMON,
    stats: {
      [StatType.health]: BASELINE.COMMON[StatType.health] + 50,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain] - 1,
      [StatType.strength]: BASELINE.COMMON[StatType.strength],
      [StatType.defense]: BASELINE.COMMON[StatType.defense] + 30,
      [StatType.magic]: BASELINE.COMMON[StatType.magic],
      [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense] + 30,
      [StatType.speed]: BASELINE.COMMON[StatType.speed] - 10,
      [StatType.critChance]: BASELINE.COMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage],
    },
    skills: [ThunderClapSkill, ArcaneBoltSkill], // holyLight, radiantPulse
    ultimateSkill: ThunderClapSkill, // divineLight
    strongAffinities: [AffinityType.spirit],
    weakAffinities: [AffinityType.beast, AffinityType.radiance],
  },
  {
    id: "doomcaster",
    name: "Doomcaster",
    rarity: Rarity.COMMON,
    stats: {
      [StatType.health]: BASELINE.COMMON[StatType.health] - 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain] + 3,
      [StatType.strength]: BASELINE.COMMON[StatType.strength] - 20,
      [StatType.defense]: BASELINE.COMMON[StatType.defense] - 20,
      [StatType.magic]: BASELINE.COMMON[StatType.magic] + 20,
      [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense] + 20,
      [StatType.speed]: BASELINE.COMMON[StatType.speed] - 10,
      [StatType.critChance]: BASELINE.COMMON[StatType.critChance],
      [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage] + 0.2,
    },
    skills: [ThunderClapSkill, ArcaneBoltSkill], // arcaneBolt, shadowSlash
    ultimateSkill: ThunderClapSkill, // arcaneCataclysm
    strongAffinities: [AffinityType.knowledge],
    weakAffinities: [AffinityType.chaos, AffinityType.textile],
  },
  {
    id: "sharpshooter",
    name: "Sharpshooter",
    rarity: Rarity.COMMON,
    stats: {
      [StatType.health]: BASELINE.COMMON[StatType.health] - 50,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.COMMON[StatType.energyGain] - 1,
      [StatType.strength]: BASELINE.COMMON[StatType.strength] + 40,
      [StatType.defense]: BASELINE.COMMON[StatType.defense] - 20,
      [StatType.magic]: BASELINE.COMMON[StatType.magic] - 10,
      [StatType.magicDefense]: BASELINE.COMMON[StatType.magicDefense] - 10,
      [StatType.speed]: BASELINE.COMMON[StatType.speed] + 10,
      [StatType.critChance]: BASELINE.COMMON[StatType.critChance] + 5,
      [StatType.critDamage]: BASELINE.COMMON[StatType.critDamage] + 0.3,
    },
    skills: [ThunderClapSkill, ArcaneBoltSkill], // burningLash, piercingArrow
    ultimateSkill: ThunderClapSkill, // hunterVolley
    strongAffinities: [AffinityType.textile],
    weakAffinities: [AffinityType.gem, AffinityType.spirit],
  },
];
