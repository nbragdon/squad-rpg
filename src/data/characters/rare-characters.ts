import { AffinityType } from "../../types/affinity";
import { CharacterBase } from "../../types/character";
import { Rarity } from "../../types/rarity";
import { StatType } from "../../types/stats";
import { HeelSmashSkill, StoneSkinSkill } from "../skills/common-skills-1";
import { BASELINE } from "../statBaselines";

export const rareCharacters: CharacterBase[] = [
  {
    id: "rare_dude",
    name: "Rare Dude",
    rarity: Rarity.RARE,
    stats: {
      [StatType.health]: BASELINE.RARE[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.RARE[StatType.energyGain],
      [StatType.strength]: BASELINE.RARE[StatType.strength] + 10,
      [StatType.defense]: BASELINE.RARE[StatType.defense] + 10,
      [StatType.magic]: BASELINE.RARE[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.RARE[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.RARE[StatType.speed],
      [StatType.critChance]: BASELINE.RARE[StatType.critChance],
      [StatType.critDamage]: BASELINE.RARE[StatType.critDamage],
    },
    skills: [HeelSmashSkill, StoneSkinSkill],
    ultimateSkill: HeelSmashSkill,
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  },
];
