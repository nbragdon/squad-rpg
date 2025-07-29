import { GameEngine } from "engine/GameEngine";
import {
  EquipmentItem,
  EquipmentItemBoost,
  EquipmentType,
  InventoryType,
} from "../../types/inventory";
import { Rarity } from "../../types/rarity";
import { ModifierType } from "../../types/skillTypes";
import { StatType } from "../../types/stats";
import { CharacterProgress, EquippedItems } from "types/game";

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

function getRandomCommonBoostValue(
  statType: StatType,
  modifierType: ModifierType,
): number {
  let value = 0;
  const BASE_LOW_FLAT_VALUE = 1;
  const BASE_CRIT_DMG_FLAT_VALUE = 10;
  const BASE_PERCENT_CRIT = 20;
  const BASE_FLAT_STANDARD = 30;
  const BASE_PERCENT_STANDARD = 25;
  const BASE_FLAT_HEALTH = 60;
  const BASE_ENERGY_FLAT_VALUE = 3;
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
  const BASE_LOW_FLAT_VALUE = 2;
  const BASE_CRIT_DMG_FLAT_VALUE = 15;
  const BASE_PERCENT_CRIT = 25;
  const BASE_FLAT_STANDARD = 35;
  const BASE_PERCENT_STANDARD = 30;
  const BASE_FLAT_HEALTH = 70;
  const BASE_ENERGY_FLAT_VALUE = 3;
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
  const BASE_LOW_FLAT_VALUE = 3;
  const BASE_CRIT_DMG_FLAT_VALUE = 20;
  const BASE_PERCENT_CRIT = 30;
  const BASE_FLAT_STANDARD = 40;
  const BASE_PERCENT_STANDARD = 35;
  const BASE_FLAT_HEALTH = 80;
  const BASE_ENERGY_FLAT_VALUE = 4;
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
  const BASE_LOW_FLAT_VALUE = 4;
  const BASE_CRIT_DMG_FLAT_VALUE = 30;
  const BASE_PERCENT_CRIT = 35;
  const BASE_FLAT_STANDARD = 45;
  const BASE_PERCENT_STANDARD = 40;
  const BASE_FLAT_HEALTH = 90;
  const BASE_ENERGY_FLAT_VALUE = 5;
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
  const BASE_LOW_FLAT_VALUE = 8;
  const BASE_CRIT_DMG_FLAT_VALUE = 40;
  const BASE_PERCENT_CRIT = 50;
  const BASE_FLAT_STANDARD = 60;
  const BASE_PERCENT_STANDARD = 50;
  const BASE_FLAT_HEALTH = 120;
  const BASE_ENERGY_FLAT_VALUE = 8;
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
        level: 1,
        value: parseFloat(
          getRandomBoostValue(rarity, statType, modifierType).toFixed(2),
        ),
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
        level: 1,
        value: parseFloat(
          (getRandomBoostValue(rarity, statType, modifierType) / 2).toFixed(2),
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
    type: InventoryType.equipment,
    stackable: false,
    quantity: 1,
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

  console.log(itermediate, itemIds, inventory);

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
