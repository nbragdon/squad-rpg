import { AffinityType } from "../../types/affinity";
import { CharacterBase } from "../../types/character";
import { Rarity } from "../../types/rarity";
import { StatType } from "../../types/stats";
import { HeelSmashSkill, StoneSkinSkill } from "../skills/common-skills-1";
import { BASELINE } from "../statBaselines";

/**
 * { id: 'demonslayer_legend', name: 'Demonbane', class: CharacterClass.DEMONSLAYER, rarity: Rarity.LEGENDARY, maxHealth: BASELINE.LEGENDARY.MAX_HEALTH + 50, maxEnergy: BASELINE.LEGENDARY.MAX_ENERGY + 10, energyGain: BASELINE.LEGENDARY.ENERGY_GAIN + 1, attack: BASELINE.LEGENDARY.ATTACK + 20, defense: BASELINE.LEGENDARY.DEFENSE - 10, speed: BASELINE.LEGENDARY.SPEED + 5, skills: [basicSkills1.flameStrike, basicSkills1.shadowStep], ultimateSkill: demonslayerBanish },
     { id: 'chronomancer_legend', name: 'Timeshaper', class: CharacterClass.CHRONOMANCER, rarity: Rarity.LEGENDARY, maxHealth: BASELINE.LEGENDARY.MAX_HEALTH + 50, maxEnergy: BASELINE.LEGENDARY.MAX_ENERGY + 10, energyGain: BASELINE.LEGENDARY.ENERGY_GAIN + 1, attack: BASELINE.LEGENDARY.ATTACK + 25, defense: BASELINE.LEGENDARY.DEFENSE - 10, speed: BASELINE.LEGENDARY.SPEED + 5, skills: [basicSkillsTimeshaper.stopTime, basicSkillsTimeshaper.reverseTime], ultimateSkill: chronomancerTimeLock },
     { id: 'starcaller_legend', name: 'Galaxion', class: CharacterClass.STARCALLER, rarity: Rarity.LEGENDARY, maxHealth: BASELINE.LEGENDARY.MAX_HEALTH + 70, maxEnergy: BASELINE.LEGENDARY.MAX_ENERGY + 10, energyGain: BASELINE.LEGENDARY.ENERGY_GAIN + 1, attack: BASELINE.LEGENDARY.ATTACK + 30, defense: BASELINE.LEGENDARY.DEFENSE - 10, speed: BASELINE.LEGENDARY.SPEED + 5, skills: [basicSkillsStarcaller.stardustShield, basicSkills5.voidPulse], ultimateSkill: starcallerSupernova },
     { id: 'soulreaper_legend', name: 'Soulrender', class: CharacterClass.SOULREAPER, rarity: Rarity.LEGENDARY, maxHealth: BASELINE.LEGENDARY.MAX_HEALTH + 60, maxEnergy: BASELINE.LEGENDARY.MAX_ENERGY + 10, energyGain: BASELINE.LEGENDARY.ENERGY_GAIN + 1, attack: BASELINE.LEGENDARY.ATTACK + 30, defense: BASELINE.LEGENDARY.DEFENSE - 10, speed: BASELINE.LEGENDARY.SPEED + 5, skills: [basicSkillsSoulreaper.spiritShackle, basicSkills5.timeLoop], ultimateSkill: soulreaperHarvest },
     { id: 'plague_doctor_legend', name: 'Miasma', class: CharacterClass.PLAGUE_DOCTOR, rarity: Rarity.LEGENDARY, maxHealth: BASELINE.LEGENDARY.MAX_HEALTH + 50, maxEnergy: BASELINE.LEGENDARY.MAX_ENERGY + 10, energyGain: BASELINE.LEGENDARY.ENERGY_GAIN + 1, attack: BASELINE.LEGENDARY.ATTACK + 25, defense: BASELINE.LEGENDARY.DEFENSE - 10, speed: BASELINE.LEGENDARY.SPEED + 5, skills: [basicSkillsPlaguedoctor.epidemic, basicSkills5.timeLoop], ultimateSkill: plagueDoctorPandemic },
 */

export const legendaryCharacters: CharacterBase[] = [
  {
    id: "miasma",
    name: "Miasma",
    rarity: Rarity.LEGENDARY,
    stats: {
      [StatType.health]: BASELINE.LEGENDARY[StatType.health] + 30,
      [StatType.energy]: 0,
      [StatType.energyGain]: BASELINE.LEGENDARY[StatType.energyGain],
      [StatType.strength]: BASELINE.LEGENDARY[StatType.strength] + 10,
      [StatType.defense]: BASELINE.LEGENDARY[StatType.defense] + 10,
      [StatType.magic]: BASELINE.LEGENDARY[StatType.magic] - 20,
      [StatType.magicDefense]: BASELINE.LEGENDARY[StatType.magicDefense] - 20,
      [StatType.speed]: BASELINE.LEGENDARY[StatType.speed],
      [StatType.critChance]: BASELINE.LEGENDARY[StatType.critChance],
      [StatType.critDamage]: BASELINE.LEGENDARY[StatType.critDamage],
    },
    skills: [HeelSmashSkill, StoneSkinSkill],
    ultimateSkill: HeelSmashSkill,
    strongAffinities: [AffinityType.beast],
    weakAffinities: [AffinityType.knowledge, AffinityType.spirit],
  },
];
