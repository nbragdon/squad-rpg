import { AffinityType } from "../../types/affinity";
import { CharacterBase } from "../../types/character";
import { Rarity } from "../../types/rarity";
import { StatType } from "../../types/stats";
import { HeelSmashSkill, StoneSkinSkill } from "../skills/common-skills-1";
import { BASELINE } from "../statBaselines";

/**
 * { id: 'chronomancer_1', name: 'Timeshaper', class: CharacterClass.CHRONOMANCER, rarity: Rarity.EPIC, maxHealth: BASELINE.EPIC.MAX_HEALTH + 50, maxEnergy: BASELINE.EPIC.MAX_ENERGY + 10, energyGain: BASELINE.EPIC.ENERGY_GAIN + 1, attack: BASELINE.EPIC.ATTACK + 20, defense: BASELINE.EPIC.DEFENSE - 10, speed: BASELINE.EPIC.SPEED + 5, skills: [basicSkillsTimeshaper.haste, basicSkillsTimeshaper.slowTime], ultimateSkill: chronomancerTimeLock },
     { id: 'starcaller_1', name: 'Galaxion', class: CharacterClass.STARCALLER, rarity: Rarity.EPIC, maxHealth: BASELINE.EPIC.MAX_HEALTH + 70, maxEnergy: BASELINE.EPIC.MAX_ENERGY + 10, energyGain: BASELINE.EPIC.ENERGY_GAIN + 1, attack: BASELINE.EPIC.ATTACK + 25, defense: BASELINE.EPIC.DEFENSE - 10, speed: BASELINE.EPIC.SPEED + 5, skills: [basicSkillsStarcaller.cosmicRay, basicSkills5.astralNova], ultimateSkill: starcallerSupernova },
     { id: 'soulreaper_1', name: 'Soulrender', class: CharacterClass.SOULREAPER, rarity: Rarity.EPIC, maxHealth: BASELINE.EPIC.MAX_HEALTH + 60, maxEnergy: BASELINE.EPIC.MAX_ENERGY + 10, energyGain: BASELINE.EPIC.ENERGY_GAIN + 1, attack: BASELINE.EPIC.ATTACK + 25, defense: BASELINE.EPIC.DEFENSE - 10, speed: BASELINE.EPIC.SPEED + 5, skills: [basicSkillsSoulreaper.soulDrain, basicSkills5.soulRend], ultimateSkill: soulreaperHarvest },
     { id: 'plague_doctor_1', name: 'Miasma', class: CharacterClass.PLAGUE_DOCTOR, rarity: Rarity.EPIC, maxHealth: BASELINE.EPIC.MAX_HEALTH + 50, maxEnergy: BASELINE.EPIC.MAX_ENERGY + 10, energyGain: BASELINE.EPIC.ENERGY_GAIN + 1, attack: BASELINE.EPIC.ATTACK + 20, defense: BASELINE.EPIC.DEFENSE - 10, speed: BASELINE.EPIC.SPEED + 5, skills: [basicSkillsPlaguedoctor.virulentTouch, basicSkills5.miasmaCloud], ultimateSkill: plagueDoctorPandemic },
 */

export const epicCharacters: CharacterBase[] = [
  {
    id: "timeshaper",
    name: "Timeshaper",
    rarity: Rarity.EPIC,
    stats: {
      [StatType.health]: BASELINE.EPIC[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.EPIC[StatType.energyGain],
      [StatType.strength]: BASELINE.EPIC[StatType.strength] + 10,
      [StatType.defense]: BASELINE.EPIC[StatType.defense] + 10,
      [StatType.magic]: BASELINE.EPIC[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.EPIC[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.EPIC[StatType.speed],
      [StatType.critChance]: BASELINE.EPIC[StatType.critChance],
      [StatType.critDamage]: BASELINE.EPIC[StatType.critDamage],
    },
    skills: [HeelSmashSkill, StoneSkinSkill],
    ultimateSkill: HeelSmashSkill,
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  },
];
