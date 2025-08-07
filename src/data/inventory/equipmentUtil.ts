import { GameEngine } from "engine/GameEngine";
import {
  EquipmentItem,
  EquipmentItemBoost,
  EquipmentType,
  EquippedItems,
  InventoryType,
} from "../../types/inventory";
import { Rarity } from "../../types/rarity";
import { ModifierType } from "../../types/skillTypes";
import { StatType } from "../../types/stats";
import { CharacterProgress } from "types/game";

export function randomlyGenerateMainStatCount(rarity: Rarity): number {
  if (rarity === Rarity.COMMON) return 1;
  if (rarity === Rarity.UNCOMMON) return 1;
  if (rarity === Rarity.RARE) return 1;
  // 80% chance for 1 stat, 20% chance for 2
  if (rarity === Rarity.EPIC) return Math.random() < 0.8 ? 1 : 2;
  // 60% chance for 1 stats, 40% chance for 2
  if (rarity === Rarity.LEGENDARY) return Math.random() < 0.6 ? 1 : 2;
  return 1;
}

export function randomlyGenerateSubStatCount(rarity: Rarity): number {
  // 90% chance for 1 stats, 10% chance for 2
  if (rarity === Rarity.COMMON) return Math.random() < 0.9 ? 1 : 2;
  // 60% chance for 2 stats, 40% chance for 1
  if (rarity === Rarity.UNCOMMON) return Math.random() < 0.6 ? 2 : 1;
  // 70% chance for 2 stats, 10% chance for 3, 20% chance for 1
  if (rarity === Rarity.RARE) {
    const randNum = Math.random();
    if (randNum < 0.7) return 2;
    if (randNum < 0.9) return 1;
    return 3;
  }
  // 50% chance for 2 stats, 40% chance for 3, 10% chance for 1
  if (rarity === Rarity.EPIC) {
    const randNum = Math.random();
    if (randNum < 0.5) return 2;
    if (randNum < 0.9) return 3;
    return 1;
  }
  // 30% chance for 2 stats, 50% chance for 3, 20% chance for 4
  if (rarity === Rarity.LEGENDARY) {
    const randNum = Math.random();
    if (randNum < 0.3) return 2;
    if (randNum < 0.8) return 3;
    return 4;
  }
  return 1;
}

const COMMON_LOW_FLAT_VALUE = 2;
const COMMON_CRIT_DMG_FLAT_VALUE = 20;
const COMMON_PERCENT_CRIT = 20;
const COMMON_FLAT_STANDARD = 30;
const COMMON_PERCENT_STANDARD = 15;
const COMMON_FLAT_HEALTH = 100;
const COMMON_ENERGY_FLAT_VALUE = 8;

function getRandomCommonBoostValue(
  statType: StatType,
  modifierType: ModifierType,
): number {
  let value = 0;
  const BASE_LOW_FLAT_VALUE = COMMON_LOW_FLAT_VALUE;
  const BASE_CRIT_DMG_FLAT_VALUE = COMMON_CRIT_DMG_FLAT_VALUE;
  const BASE_PERCENT_CRIT = COMMON_PERCENT_CRIT;
  const BASE_FLAT_STANDARD = COMMON_FLAT_STANDARD;
  const BASE_PERCENT_STANDARD = COMMON_PERCENT_STANDARD;
  const BASE_FLAT_HEALTH = COMMON_FLAT_HEALTH;
  const BASE_ENERGY_FLAT_VALUE = COMMON_ENERGY_FLAT_VALUE;
  if (statType === StatType.critChance) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_CRIT;
    if (modifierType === ModifierType.Flat) value = BASE_LOW_FLAT_VALUE;
  }
  if (statType === StatType.critDamage) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_CRIT;
    if (modifierType === ModifierType.Flat) value = BASE_CRIT_DMG_FLAT_VALUE;
  }
  if (statType === StatType.strength) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.defense) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.speed) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.magic) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.magicDefense) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.energyGain) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_LOW_FLAT_VALUE;
  }
  if (statType === StatType.energy) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_CRIT;
    if (modifierType === ModifierType.Flat) value = BASE_ENERGY_FLAT_VALUE;
  }
  if (statType === StatType.health) {
    if (modifierType === ModifierType.Percentage) value = BASE_FLAT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_HEALTH;
  }

  // return value you 20% variation up or down
  const lowerBound = value * 0.8; // 20% lower
  const upperBound = value * 1.2; // 20% higher

  // Math.random() generates a random float between 0 (inclusive) and 1 (exclusive).
  // To get a random number within a specific range [min, max), the formula is:
  // Math.random() * (max - min) + min.
  return Math.random() * (upperBound - lowerBound) + lowerBound;
}

function getRandomUncommonBoostValue(
  statType: StatType,
  modifierType: ModifierType,
): number {
  let value = 0;
  const BASE_LOW_FLAT_VALUE = COMMON_LOW_FLAT_VALUE + 2;
  const BASE_CRIT_DMG_FLAT_VALUE = COMMON_CRIT_DMG_FLAT_VALUE + 10;
  const BASE_PERCENT_CRIT = COMMON_PERCENT_CRIT + 5;
  const BASE_FLAT_STANDARD = COMMON_FLAT_STANDARD + 15;
  const BASE_PERCENT_STANDARD = COMMON_PERCENT_STANDARD + 5;
  const BASE_FLAT_HEALTH = COMMON_FLAT_HEALTH + 50;
  const BASE_ENERGY_FLAT_VALUE = COMMON_ENERGY_FLAT_VALUE + 4;
  if (statType === StatType.critChance) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_CRIT;
    if (modifierType === ModifierType.Flat) value = BASE_LOW_FLAT_VALUE;
  }
  if (statType === StatType.critDamage) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_CRIT;
    if (modifierType === ModifierType.Flat) value = BASE_CRIT_DMG_FLAT_VALUE;
  }
  if (statType === StatType.strength) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.defense) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.speed) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.magic) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.magicDefense) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.energyGain) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_LOW_FLAT_VALUE;
  }
  if (statType === StatType.energy) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_CRIT;
    if (modifierType === ModifierType.Flat) value = BASE_ENERGY_FLAT_VALUE;
  }
  if (statType === StatType.health) {
    if (modifierType === ModifierType.Percentage) value = BASE_FLAT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_HEALTH;
  }

  // return value you 20% variation up or down
  const lowerBound = value * 0.8; // 20% lower
  const upperBound = value * 1.2; // 20% higher

  // Math.random() generates a random float between 0 (inclusive) and 1 (exclusive).
  // To get a random number within a specific range [min, max), the formula is:
  // Math.random() * (max - min) + min.
  return Math.random() * (upperBound - lowerBound) + lowerBound;
}

function getRandomRareBoostValue(
  statType: StatType,
  modifierType: ModifierType,
): number {
  let value = 0;
  const BASE_LOW_FLAT_VALUE = COMMON_LOW_FLAT_VALUE + 4;
  const BASE_CRIT_DMG_FLAT_VALUE = COMMON_CRIT_DMG_FLAT_VALUE + 15;
  const BASE_PERCENT_CRIT = COMMON_PERCENT_CRIT + 8;
  const BASE_FLAT_STANDARD = COMMON_FLAT_STANDARD + 25;
  const BASE_PERCENT_STANDARD = COMMON_PERCENT_STANDARD + 10;
  const BASE_FLAT_HEALTH = COMMON_FLAT_HEALTH + 100;
  const BASE_ENERGY_FLAT_VALUE = COMMON_ENERGY_FLAT_VALUE + 8;
  if (statType === StatType.critChance) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_CRIT;
    if (modifierType === ModifierType.Flat) value = BASE_LOW_FLAT_VALUE;
  }
  if (statType === StatType.critDamage) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_CRIT;
    if (modifierType === ModifierType.Flat) value = BASE_CRIT_DMG_FLAT_VALUE;
  }
  if (statType === StatType.strength) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.defense) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.speed) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.magic) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.magicDefense) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.energyGain) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_LOW_FLAT_VALUE;
  }
  if (statType === StatType.energy) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_CRIT;
    if (modifierType === ModifierType.Flat) value = BASE_ENERGY_FLAT_VALUE;
  }
  if (statType === StatType.health) {
    if (modifierType === ModifierType.Percentage) value = BASE_FLAT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_HEALTH;
  }

  // return value you 20% variation up or down
  const lowerBound = value * 0.8; // 20% lower
  const upperBound = value * 1.2; // 20% higher

  // Math.random() generates a random float between 0 (inclusive) and 1 (exclusive).
  // To get a random number within a specific range [min, max), the formula is:
  // Math.random() * (max - min) + min.
  return Math.random() * (upperBound - lowerBound) + lowerBound;
}

function getRandomEpicBoostValue(
  statType: StatType,
  modifierType: ModifierType,
): number {
  let value = 0;
  const BASE_LOW_FLAT_VALUE = COMMON_LOW_FLAT_VALUE + 8;
  const BASE_CRIT_DMG_FLAT_VALUE = COMMON_CRIT_DMG_FLAT_VALUE + 25;
  const BASE_PERCENT_CRIT = COMMON_PERCENT_CRIT + 15;
  const BASE_FLAT_STANDARD = COMMON_FLAT_STANDARD + 50;
  const BASE_PERCENT_STANDARD = COMMON_PERCENT_STANDARD + 20;
  const BASE_FLAT_HEALTH = COMMON_FLAT_HEALTH + 200;
  const BASE_ENERGY_FLAT_VALUE = COMMON_ENERGY_FLAT_VALUE + 15;
  if (statType === StatType.critChance) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_CRIT;
    if (modifierType === ModifierType.Flat) value = BASE_LOW_FLAT_VALUE;
  }
  if (statType === StatType.critDamage) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_CRIT;
    if (modifierType === ModifierType.Flat) value = BASE_CRIT_DMG_FLAT_VALUE;
  }
  if (statType === StatType.strength) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.defense) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.speed) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.magic) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.magicDefense) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.energyGain) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_LOW_FLAT_VALUE;
  }
  if (statType === StatType.energy) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_CRIT;
    if (modifierType === ModifierType.Flat) value = BASE_ENERGY_FLAT_VALUE;
  }
  if (statType === StatType.health) {
    if (modifierType === ModifierType.Percentage) value = BASE_FLAT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_HEALTH;
  }

  // return value you 20% variation up or down
  const lowerBound = value * 0.8; // 20% lower
  const upperBound = value * 1.2; // 20% higher

  // Math.random() generates a random float between 0 (inclusive) and 1 (exclusive).
  // To get a random number within a specific range [min, max), the formula is:
  // Math.random() * (max - min) + min.
  return Math.random() * (upperBound - lowerBound) + lowerBound;
}

function getRandomLegendaryBoostValue(
  statType: StatType,
  modifierType: ModifierType,
): number {
  let value = 0;
  const BASE_LOW_FLAT_VALUE = COMMON_LOW_FLAT_VALUE + 15;
  const BASE_CRIT_DMG_FLAT_VALUE = COMMON_CRIT_DMG_FLAT_VALUE + 40;
  const BASE_PERCENT_CRIT = COMMON_PERCENT_CRIT + 25;
  const BASE_FLAT_STANDARD = COMMON_FLAT_STANDARD + 80;
  const BASE_PERCENT_STANDARD = COMMON_PERCENT_STANDARD + 30;
  const BASE_FLAT_HEALTH = COMMON_FLAT_HEALTH + 300;
  const BASE_ENERGY_FLAT_VALUE = COMMON_ENERGY_FLAT_VALUE + 20;
  if (statType === StatType.critChance) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_CRIT;
    if (modifierType === ModifierType.Flat) value = BASE_LOW_FLAT_VALUE;
  }
  if (statType === StatType.critDamage) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_CRIT;
    if (modifierType === ModifierType.Flat) value = BASE_CRIT_DMG_FLAT_VALUE;
  }
  if (statType === StatType.strength) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.defense) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.speed) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.magic) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.magicDefense) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_STANDARD;
  }
  if (statType === StatType.energyGain) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_LOW_FLAT_VALUE;
  }
  if (statType === StatType.energy) {
    if (modifierType === ModifierType.Percentage) value = BASE_PERCENT_CRIT;
    if (modifierType === ModifierType.Flat) value = BASE_ENERGY_FLAT_VALUE;
  }
  if (statType === StatType.health) {
    if (modifierType === ModifierType.Percentage) value = BASE_FLAT_STANDARD;
    if (modifierType === ModifierType.Flat) value = BASE_FLAT_HEALTH;
  }

  // return value you 20% variation up or down
  const lowerBound = value * 0.8; // 20% lower
  const upperBound = value * 1.2; // 20% higher

  // Math.random() generates a random float between 0 (inclusive) and 1 (exclusive).
  // To get a random number within a specific range [min, max), the formula is:
  // Math.random() * (max - min) + min.
  return Math.random() * (upperBound - lowerBound) + lowerBound;
}

export function getRandomBoostValue(
  rarity: Rarity,
  statType: StatType,
  modifierType: ModifierType,
): number {
  if (rarity === Rarity.COMMON)
    return getRandomCommonBoostValue(statType, modifierType);
  if (rarity === Rarity.UNCOMMON)
    return getRandomUncommonBoostValue(statType, modifierType);
  if (rarity === Rarity.RARE)
    return getRandomRareBoostValue(statType, modifierType);
  if (rarity === Rarity.EPIC)
    return getRandomEpicBoostValue(statType, modifierType);
  if (rarity === Rarity.LEGENDARY)
    return getRandomLegendaryBoostValue(statType, modifierType);
  return 0;
}

/*
 * Randomly generate main and sub stat equipment item boosts, using the randomlyGenerateMainStatCount and randomlyGenerateSubStatCount functions
 * There can be no overlap of both stat type and modifier type. That pairing is the unique identifier and a new random value should be generated if there would be any duplicates.
 * Use the getMainStatsByType and getSubStatsByType functions to get the available stat types.
 */
export function generateMainStatEquipmentBoosts(
  equipmentType: EquipmentType,
  rarity: Rarity,
): EquipmentItemBoost[] {
  const mainStatCount = randomlyGenerateMainStatCount(rarity);
  const uniquePairs: {
    [key: string]: EquipmentItemBoost;
  } = {};
  while (Object.keys(uniquePairs).length < mainStatCount) {
    const statType =
      getMainStatsByType(equipmentType)[
        Math.floor(Math.random() * getMainStatsByType(equipmentType).length)
      ];
    const modifierType =
      Object.values(ModifierType)[
        Math.floor(Math.random() * Object.values(ModifierType).length)
      ];
    const key = `${statType}_${modifierType}`;
    if (!uniquePairs[key]) {
      uniquePairs[key] = {
        statType,
        value: Math.ceil(getRandomBoostValue(rarity, statType, modifierType)),
        modifierType,
      };
    }
  }
  return Object.values(uniquePairs);
}

export function generateSubStatEquipmentBoosts(
  equipmentType: EquipmentType,
  rarity: Rarity,
): EquipmentItemBoost[] {
  const subStatCount = randomlyGenerateSubStatCount(rarity);
  const uniquePairs: {
    [key: string]: EquipmentItemBoost;
  } = {};
  while (Object.keys(uniquePairs).length < subStatCount) {
    const statType =
      getSubStatsByType(equipmentType)[
        Math.floor(Math.random() * getSubStatsByType(equipmentType).length)
      ];
    const modifierType =
      Object.values(ModifierType)[
        Math.floor(Math.random() * Object.values(ModifierType).length)
      ];
    const key = `${statType}_${modifierType}`;
    if (!uniquePairs[key]) {
      uniquePairs[key] = {
        statType,
        value: Math.ceil(
          getRandomBoostValue(rarity, statType, modifierType) / 2,
        ),
        modifierType,
      };
    }
  }
  return Object.values(uniquePairs);
}

export function getMainStatsByType(equipmentType: EquipmentType): StatType[] {
  if (equipmentType === "weapon") return [StatType.strength, StatType.magic];
  if (equipmentType === "armor")
    return [StatType.defense, StatType.magicDefense, StatType.health];
  if (equipmentType === "trinket")
    return [
      StatType.energyGain,
      StatType.critChance,
      StatType.critDamage,
      StatType.energy,
      StatType.health,
      StatType.magic,
      StatType.magicDefense,
      StatType.strength,
      StatType.defense,
      StatType.speed,
    ];
  return [];
}

export function getSubStatsByType(equipmentType: EquipmentType): StatType[] {
  if (equipmentType === "weapon")
    return [
      StatType.strength,
      StatType.magic,
      StatType.energyGain,
      StatType.critChance,
      StatType.critDamage,
    ];
  if (equipmentType === "armor")
    return [
      StatType.defense,
      StatType.magicDefense,
      StatType.health,
      StatType.energy,
      StatType.speed,
    ];
  if (equipmentType === "trinket")
    return [
      StatType.energyGain,
      StatType.critChance,
      StatType.critDamage,
      StatType.energy,
      StatType.health,
      StatType.magic,
      StatType.magicDefense,
      StatType.strength,
      StatType.defense,
      StatType.speed,
    ];
  return [];
}

type ItemNamesMap = {
  [key in EquipmentType]?: {
    [statCombination: string]: string;
  };
};

const UNIQUE_ITEM_NAMES: ItemNamesMap = {
  [EquipmentType.weapon]: {
    strength: "Greatsword of Might",
    magic: "Staff of Arcane Power",
    strength_magic: "Spellblade of the Valiant",
  },
  [EquipmentType.armor]: {
    defense: "Plate of the Sentinel",
    magicDefense: "Robe of Warding",
    health: "Cuirass of Vitality",
    defense_magicDefense: "Guardian's Breastplate",
    defense_health: "Bulwark of Resilience",
    magicDefense_health: "Aegis of the Soul",
  },
  [EquipmentType.trinket]: {
    energyGain: "Amulet of Flowing Essence",
    critChance: "Ring of Precision Strikes",
    critDamage: "Necklace of Fatal Blows",
    energy: "Orb of Endless Vigor",
    health: "Token of Enduring Life",
    magic: "Charm of Sorcerous Might",
    magicDefense: "Warding Totem",
    strength: "Pendant of Brute Force",
    defense: "Stone of Fortification",
    speed: "Gale Charm",
    energyGain_critChance: "Catalyst of Criticality",
    energyGain_critDamage: "Essence of Ruin",
    energyGain_energy: "Wellspring of Power",
    energyGain_health: "Life-Infused Core",
    energyGain_magic: "Mana Siphon Gem",
    energyGain_magicDefense: "Spirit Ward Effigy",
    energyGain_strength: "Empowered Fist Talisman",
    energyGain_defense: "Shieldbearer's Focus",
    energyGain_speed: "Celerity Conduit",
    critChance_critDamage: "Sharpshooter's Eye",
    critChance_energy: "Arcane Strike Focus",
    critChance_health: "Vanguard's Mark",
    critChance_magic: "Sorcerer's Eye",
    critChance_magicDefense: "Witch Hunter's Charm",
    critChance_strength: "Executioner's Emblem",
    critChance_defense: "Defender's Mark",
    critChance_speed: "Quickstrike Bauble",
    critDamage_energy: "Annihilation Sphere",
    critDamage_health: "Heartstopper's Locket",
    critDamage_magic: "Doomweaver's Jewel",
    critDamage_magicDefense: "Hexbreaker's Charm",
    critDamage_strength: "Bonecrusher's Tooth",
    critDamage_defense: "Rampart's Edge",
    critDamage_speed: "Swift Death Medallion",
    energy_health: "Resilient Phylactery",
    energy_magic: "Mystic's Focus Crystal",
    energy_magicDefense: "Amulet of Mental Fortitude",
    energy_strength: "Warrior's Willstone",
    energy_defense: "Bastion's Core",
    energy_speed: "Quickening Stone",
    health_magic: "Soulbound Locket",
    health_magicDefense: "Ankh of Vital Warding",
    health_strength: "Titan's Heart",
    health_defense: "Indomitable Aegis",
    health_speed: "Nimblefoot Charm",
    magic_magicDefense: "Arcane Ward Gem",
    magic_strength: "War Mage's Medallion",
    magic_defense: "Mystic Bulwark",
    magic_speed: "Flickerstone",
    magicDefense_strength: "Spellbreaker's Seal",
    magicDefense_defense: "Aegis of the Protector",
    magicDefense_speed: "Ghostly Shard",
    strength_defense: "Adamant Crusher",
    strength_speed: "Zephyr's Gauntlet",
    defense_speed: "Nimble Shielding",
  },
};

/**
 * Generates a unique item name based on equipment type and up to two main stats.
 *
 * @param equipmentType The type of equipment (e.g., "weapon", "armor", "trinket").
 * @param statTypes An array of 1 or 2 StatTypes. The order of stats does not matter for lookup.
 * @returns The unique item name as a string, or "Unknown Item" if no match is found.
 */
export function getUniqueEquipmentName(
  equipmentType: EquipmentType,
  statTypes: StatType[],
): string {
  // Ensure we don't have more than 2 stats
  if (statTypes.length > 2) {
    console.warn(
      "Too many stat types provided. Only the first two will be used.",
    );
    statTypes = statTypes.slice(0, 2);
  }

  // Sort stat types to ensure consistent key generation regardless of input order
  // e.g., ["strength", "magic"] becomes "strength_magic", not "magic_strength"
  const sortedStats = [...statTypes].sort();

  let statKey: string;
  if (sortedStats.length === 1) {
    statKey = sortedStats[0];
  } else if (sortedStats.length === 2) {
    statKey = `${sortedStats[0]}_${sortedStats[1]}`;
  } else {
    // No stats provided or empty array
    return "Unknown Item";
  }

  const namesForType = UNIQUE_ITEM_NAMES[equipmentType];

  if (namesForType) {
    return namesForType[statKey] || "Unknown Item";
  }

  return "Unknown Item";
}

export function generateRandomEquipment(
  equipmentType: EquipmentType,
  rarity: Rarity,
): EquipmentItem {
  const mainStatBoosts = generateMainStatEquipmentBoosts(equipmentType, rarity);
  const subStatBoosts = generateSubStatEquipmentBoosts(equipmentType, rarity);
  const mainStatTypes = mainStatBoosts.map((boost) => boost.statType);
  const uniqueName = getUniqueEquipmentName(equipmentType, mainStatTypes);

  return {
    equipmentType,
    mainBoosts: mainStatBoosts,
    subBoosts: subStatBoosts,
    level: 1,
    name: uniqueName,
    id: crypto.randomUUID(),
    rarity: rarity,
  };
}

export function getAllEquipment(
  equipedItems: EquippedItems | undefined,
  inventory: { [key in string]: EquipmentItem },
): EquipmentItem[] {
  if (!equipedItems) return [];
  const itemIds = [
    equipedItems[EquipmentType.weapon],
    equipedItems[EquipmentType.armor],
    equipedItems[EquipmentType.trinket][0],
    equipedItems[EquipmentType.trinket][1],
  ].filter((item) => item !== undefined && item !== null);

  const itermediate = Object.values(inventory).filter((equipment) =>
    itemIds.includes(equipment.id),
  );

  return itermediate;
}

export function getEquipmentValue(equipment: EquipmentItem): number {
  let value = 10;
  switch (equipment.rarity) {
    case Rarity.UNCOMMON:
      value += 10;
      break;
    case Rarity.RARE:
      value += 20;
      break;
    case Rarity.EPIC:
      value += 30;
      break;
    case Rarity.LEGENDARY:
      value += 50;
      break;
  }
  value *= equipment.level;
  value *= equipment.mainBoosts.length;
  value *= 1 + 0.5 * (equipment.subBoosts.length - 1);
  return Math.floor(value);
}

// Helper to calculate a stat's value at a specific level, based on its level 1 base value
export const calculateLeveledEquipmentValue = (
  initialBaseValue: number, // Value at level 1
  level: number,
): number => {
  if (level <= 1) return Math.ceil(initialBaseValue);
  const levelDifference = level - 1; // Difference from level 1
  return Math.ceil(initialBaseValue * (1 + 0.15 * levelDifference));
};

export const calculateSubstatEquipmentValue = (
  baseValue: number,
  upgrades: number[] | undefined,
) => {
  const sum = upgrades
    ? upgrades.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      )
    : 0;
  return Math.ceil(baseValue + sum);
};

export const MAX_EQUIPMENT_LEVELS: Record<Rarity, number> = {
  [Rarity.COMMON]: 10,
  [Rarity.UNCOMMON]: 15,
  [Rarity.RARE]: 20,
  [Rarity.EPIC]: 25,
  [Rarity.LEGENDARY]: 30,
};

export const calculateLevelUpCost = (currentLevel: number): number => {
  if (currentLevel === 1) return 20; // Cost to get to level 1 (from level 0)
  // Base cost for currentLevel (to get to currentLevel + 1)
  let cost = 20 * Math.pow(currentLevel - 1, 2.115);

  // Apply jumps
  if (currentLevel >= 10) {
    cost *= 1.1; // 10% jump at level 10
  }
  if (currentLevel >= 20) {
    cost *= 1.1; // Another 10% jump at level 20
  }

  return Math.round(cost); // Round to nearest integer coin
};

// Function to apply a random substat increase
export const applyRandomSubstatIncrease = (
  item: EquipmentItem,
): EquipmentItem => {
  const newSubBoosts = [...item.subBoosts];

  if (newSubBoosts.length > 0) {
    // Otherwise, pick a random existing sub-boost to upgrade
    const randomIndex = Math.floor(Math.random() * newSubBoosts.length);
    const boostToUpgrade = { ...newSubBoosts[randomIndex] }; // Create a copy

    const randomIncreasePercent =
      Math.floor(Math.random() * (50 - 30 + 1)) + 30; // 30-50%
    const increaseAmount = Math.ceil(
      boostToUpgrade.value * (randomIncreasePercent / 100),
    );

    // If baseValue is not set, set it to the current value before the first random upgrade
    if (boostToUpgrade.upgrades === undefined) {
      boostToUpgrade.upgrades = [increaseAmount];
    }

    boostToUpgrade.upgrades.push(increaseAmount);
    newSubBoosts[randomIndex] = boostToUpgrade;
  }

  return { ...item, subBoosts: newSubBoosts };
};

export const getLeveledEquipmentValue = (
  boost: EquipmentItemBoost,
  level: number,
  isMainBoost: boolean,
) => {
  return isMainBoost
    ? calculateLeveledEquipmentValue(boost.value, level)
    : calculateSubstatEquipmentValue(boost.value, boost.upgrades);
};

export const formatStatValue = (
  boost: EquipmentItemBoost,
  level: number,
  isMainBoost: boolean,
): string => {
  const leveledValue = getLeveledEquipmentValue(boost, level, isMainBoost);

  const formattedLeveledValue =
    boost.modifierType === ModifierType.Percentage
      ? `${leveledValue}%`
      : `${leveledValue}`;

  return `+${formattedLeveledValue}`;
};
