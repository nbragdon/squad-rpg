import React from "react";
import {
  FaArrowUp,
  FaBolt,
  FaCoins,
  FaCrosshairs,
  FaDizzy,
  FaFire,
  FaFistRaised,
  FaHeart,
  FaPaw,
  FaQuestionCircle,
  FaRunning,
  FaShieldAlt,
  FaSkullCrossbones,
  FaStar,
  FaTint,
  FaVolumeMute,
} from "react-icons/fa";
import {
  GiAnarchy,
  GiAxeSword,
  GiBlackHoleBolas,
  GiChestArmor,
  GiCoins,
  GiCrystalize,
  GiDropWeapon,
  GiLightningTrio,
  GiMagicPalm,
  GiMagicShield,
  GiPoisonBottle,
  GiPowerRing,
  GiRolledCloth,
  GiSecretBook,
  GiShouting,
  GiSnail,
  GiSparkSpirit,
  GiStandingPotion,
  GiSunbeams,
  GiTicket,
  GiWalkingBoot,
} from "react-icons/gi";
import { AffinityType } from "../types/affinity";
import { Rarity } from "../types/rarity";
import { StatType } from "../types/stats";
import { SkillEffectType } from "types/skillTypes";
import { EquipmentType, InventoryItem, ItemType } from "types/inventory";
import { StatusEffectType } from "types/statusEffects";
import { BRITTLE_MULTIPLIER } from "data/statUtils";
import { STATUS_EFFECT_VALUE_MAX } from "battle";

export const getRarityTextColorClass = (rarity: Rarity): string => {
  switch (rarity) {
    case Rarity.COMMON:
      return "text-gray-400";
    case Rarity.UNCOMMON:
      return "text-green-400";
    case Rarity.RARE:
      return "text-blue-400";
    case Rarity.EPIC:
      return "text-purple-400";
    case Rarity.LEGENDARY:
      return "text-yellow-400";
    default:
      return "text-white";
  }
};

// Reusable rarity to color mapping (consistent with DungeonMode)
export const RARITY_COLORS: Record<Rarity, string> = {
  [Rarity.COMMON]: "border-gray-500", // Grey
  [Rarity.UNCOMMON]: "border-green-500", // Green
  [Rarity.RARE]: "border-blue-500", // Blue
  [Rarity.EPIC]: "border-purple-500", // Purple
  [Rarity.LEGENDARY]: "border-yellow-500", // Gold/Yellow
};

// --- Stat Icons ---
export const StatIcons: Record<StatType, React.ReactNode> = {
  [StatType.health]: <FaHeart />,
  [StatType.energy]: <FaBolt />,
  [StatType.energyGain]: <FaArrowUp />, // Represents gaining something
  [StatType.strength]: <FaFistRaised />,
  [StatType.defense]: <FaShieldAlt />,
  [StatType.magic]: <GiMagicPalm />, // Represents magical power
  [StatType.magicDefense]: <GiMagicShield />, // Represents mental defense or wisdom
  [StatType.speed]: <GiWalkingBoot />,
  [StatType.critChance]: <FaCrosshairs />, // Represents aiming for a critical hit
  [StatType.critDamage]: <FaSkullCrossbones />, // Represents lethal damage
};

// --- Affinity Icons ---
export const AffinityIcons: Record<AffinityType, React.ReactNode> = {
  [AffinityType.void]: <GiBlackHoleBolas />, // Represents darkness/void
  [AffinityType.radiance]: <GiSunbeams />, // Represents light/radiance
  [AffinityType.beast]: <FaPaw />, // Represents animalistic nature
  [AffinityType.spirit]: <GiSparkSpirit />, // Represents spiritual essence
  [AffinityType.knowledge]: <GiSecretBook />, // Represents intellect/knowledge
  [AffinityType.chaos]: <GiAnarchy />, // Represents randomness/chaos (D20 for RPG feel)
  [AffinityType.gem]: <GiCrystalize />, // Represents precious stones/gems
  [AffinityType.textile]: <GiRolledCloth />, // Represents fabric/clothing
};

// --- Rarity Icons ---
export const RarityIcons: Record<Rarity, React.ReactNode> = {
  [Rarity.COMMON]: <FaStar style={{ color: RARITY_COLORS[Rarity.COMMON] }} />, // Grey star
  [Rarity.UNCOMMON]: (
    <FaStar style={{ color: RARITY_COLORS[Rarity.UNCOMMON] }} />
  ), // Green star
  [Rarity.RARE]: <FaStar style={{ color: RARITY_COLORS[Rarity.RARE] }} />, // Blue star
  [Rarity.EPIC]: <FaStar style={{ color: RARITY_COLORS[Rarity.EPIC] }} />, // Purple star
  [Rarity.LEGENDARY]: (
    <FaStar style={{ color: RARITY_COLORS[Rarity.LEGENDARY] }} />
  ), // Gold star
};

// --- Status Icons ---
export const StatusEffectIcons: Record<StatusEffectType, React.ReactNode> = {
  [StatusEffectType.burn]: <FaFire className="text-orange-400" />,
  [StatusEffectType.brittle]: <GiCrystalize className="text-blue-300" />,
  [StatusEffectType.poison]: <GiPoisonBottle className="text-green-400" />,
  [StatusEffectType.shock]: <GiLightningTrio className="text-yellow-400" />,
  [StatusEffectType.bleed]: <FaTint className="text-red-400" />,
  [StatusEffectType.stun]: <FaDizzy className="text-yellow-400" />,
  [StatusEffectType.silence]: <FaVolumeMute className="text-gray-400" />,
  [StatusEffectType.taunt]: <GiShouting className="text-red-400" />,
  [StatusEffectType.shield]: <FaShieldAlt className="text-blue-300" />,
  [StatusEffectType.haste]: <FaRunning className="text-lime-400" />,
  [StatusEffectType.slow]: <GiSnail className="text-gray-400" />,
  [StatusEffectType.confusion]: (
    <FaQuestionCircle className="text-purple-400" />
  ),
  [StatusEffectType.disarm]: <GiDropWeapon className="text-gray-400" />,
  [StatusEffectType.coins]: <GiCoins className="text-amber-500" />,
};

export const ABILITY_BG_COLOR = {
  [SkillEffectType.damage]: "bg-red-600",
  [SkillEffectType.adjustStat]: "bg-red-600",
  [SkillEffectType.heal]: "bg-purple-600",
  [SkillEffectType.applyStatusEffect]: "bg-teal-600",
  [SkillEffectType.cleanse]: "bg-emerald-600",
};

export const EQUIPMENT_TYPE_ICONS = {
  [EquipmentType.armor]: <GiChestArmor />,
  [EquipmentType.weapon]: <GiAxeSword />,
  [EquipmentType.trinket]: <GiPowerRing />,
};

export const COIN_ICON = <FaCoins className="text-amber-300" />;

export const getItemIcon = (itemType: ItemType) => {
  const itemToIconMap = {
    [ItemType.common_ticket]: (
      <GiTicket className={`${getRarityTextColorClass(Rarity.COMMON)}`} />
    ),
    [ItemType.uncommon_ticket]: (
      <GiTicket className={`${getRarityTextColorClass(Rarity.UNCOMMON)}`} />
    ),
    [ItemType.rare_ticket]: (
      <GiTicket className={`${getRarityTextColorClass(Rarity.RARE)}`} />
    ),
    [ItemType.epic_ticket]: (
      <GiTicket className={`${getRarityTextColorClass(Rarity.EPIC)}`} />
    ),
    [ItemType.legendary_ticket]: (
      <GiTicket className={`${getRarityTextColorClass(Rarity.LEGENDARY)}`} />
    ),
  };

  const icon = itemToIconMap[itemType];
  if (icon) {
    return icon;
  }

  return <GiStandingPotion />;
};

export const STAT_READABLE_STRING = {
  [StatType.critChance]: "Crit Chance",
  [StatType.critDamage]: "Crit Damage",
  [StatType.defense]: "Defense",
  [StatType.energy]: "Energy",
  [StatType.energyGain]: "Energy Gain",
  [StatType.health]: "Health",
  [StatType.magic]: "Magic",
  [StatType.magicDefense]: "Magic Defense",
  [StatType.speed]: "Speed",
  [StatType.strength]: "Strength",
};

/**
 * Returns a human-readable string summarizing the effect of a given StatusEffectType.
 *
 * @param effectType The StatusEffectType to get a summary for.
 * @returns A string describing the status effect and its unique properties.
 */
export function getStatusEffectSummary(effectType: StatusEffectType): string {
  // Use a switch statement to handle each status effect type and provide a custom description.
  switch (effectType) {
    case StatusEffectType.burn:
      return `Applies damage each turn equal to 1% per stack of the character's health. Reduced by ${STAT_READABLE_STRING[StatType.magicDefense]}. Lose half stacks per turn. Max ${STATUS_EFFECT_VALUE_MAX[StatusEffectType.burn]} stacks.`;
    case StatusEffectType.brittle:
      return `Increases the damage taken from attacks by ${BRITTLE_MULTIPLIER * 100}% per stack. Lose 1/4 of the stacks per turn.`;
    case StatusEffectType.poison:
      return `Applies damage each turn for a set duration. Reduced by ${STAT_READABLE_STRING[StatType.magicDefense]}.`;
    case StatusEffectType.shock:
      return `Cannot crit while affected by shock and lasts a set duration.`;
    case StatusEffectType.bleed:
      return "Cannot be healed while affected by bleed. Lose 1 stack per turn.";
    case StatusEffectType.stun:
      return "Cannot use basic attack or abilities while stunned. Lose all stacks at end of turn.";
    case StatusEffectType.silence:
      return `Cannot use abilities while affected by silence. Decays by 1 stack per turn. Max ${STATUS_EFFECT_VALUE_MAX[StatusEffectType.silence]} stacks.`;
    case StatusEffectType.taunt:
      return `All random enemy attacks will target the character with taunt. Decays by 1 stack per turn. Max ${STATUS_EFFECT_VALUE_MAX[StatusEffectType.taunt]} stacks.`;
    case StatusEffectType.shield:
      return "Damage is dealt to shield before health. Lose 10% per turn.";
    case StatusEffectType.haste:
      return `% chance to gain an extra turn equal to the number of stacks. Max ${STATUS_EFFECT_VALUE_MAX[StatusEffectType.haste]} stacks.`;
    case StatusEffectType.slow:
      return `Decreases the character's speed, causing them to act more slowly. Decays by 1 stack per turn. Max ${STATUS_EFFECT_VALUE_MAX[StatusEffectType.slow]} stacks.`;
    case StatusEffectType.confusion:
      return `All random enemy attacks can target any enemy or any ally (self included). Decays by 1 stack per turn. Max ${STATUS_EFFECT_VALUE_MAX[StatusEffectType.confusion]} stacks.`;
    case StatusEffectType.disarm:
      return `Cannot use basic attacks while disarmed. Decays by 1 stack per turn. Max ${STATUS_EFFECT_VALUE_MAX[StatusEffectType.disarm]} stacks.`;
    case StatusEffectType.coins:
      return "Increases all stats by 2% per stack of coins. Do not lose any stacks each turn.";
    default:
      return "Unknown status effect.";
  }
}
