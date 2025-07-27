import React from "react";
import {
  FaArrowUp,
  FaBolt,
  FaBook,
  FaBrain,
  FaCrosshairs,
  FaDiceD20,
  FaFistRaised,
  FaGem,
  FaGhost,
  FaHeart,
  FaMagic,
  FaMoon,
  FaPaw,
  FaRunning,
  FaShieldAlt,
  FaSkullCrossbones,
  FaStar,
  FaSun,
  FaTshirt,
} from "react-icons/fa";
import { AffinityType } from "../types/affinity";
import { Rarity } from "../types/rarity";
import { StatType } from "../types/stats";

export const getRarityColor = (rarity: Rarity): string => {
  switch (rarity) {
    case Rarity.COMMON:
      return "#808080";
    case Rarity.RARE:
      return "#0080ff";
    case Rarity.EPIC:
      return "#8000ff";
    case Rarity.LEGENDARY:
      return "#ff8000";
    default:
      return "#808080";
  }
};

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
  [StatType.magic]: <FaMagic />, // Represents magical power
  [StatType.magicDefense]: <FaBrain />, // Represents mental defense or wisdom
  [StatType.speed]: <FaRunning />,
  [StatType.critChance]: <FaCrosshairs />, // Represents aiming for a critical hit
  [StatType.critDamage]: <FaSkullCrossbones />, // Represents lethal damage
};

// --- Affinity Icons ---
export const AffinityIcons: Record<AffinityType, React.ReactNode> = {
  [AffinityType.void]: <FaMoon />, // Represents darkness/void
  [AffinityType.radiance]: <FaSun />, // Represents light/radiance
  [AffinityType.beast]: <FaPaw />, // Represents animalistic nature
  [AffinityType.spirit]: <FaGhost />, // Represents spiritual essence
  [AffinityType.knowledge]: <FaBook />, // Represents intellect/knowledge
  [AffinityType.chaos]: <FaDiceD20 />, // Represents randomness/chaos (D20 for RPG feel)
  [AffinityType.gem]: <FaGem />, // Represents precious stones/gems
  [AffinityType.textile]: <FaTshirt />, // Represents fabric/clothing
};

// --- Rarity Icons ---
export const RarityIcons: Record<Rarity, React.ReactNode> = {
  [Rarity.COMMON]: <FaStar style={{ color: "#A0A0A0" }} />, // Grey star
  [Rarity.UNCOMMON]: <FaStar style={{ color: "#4CAF50" }} />, // Green star
  [Rarity.RARE]: <FaStar style={{ color: "#2196F3" }} />, // Blue star
  [Rarity.EPIC]: <FaStar style={{ color: "#9C27B0" }} />, // Purple star
  [Rarity.LEGENDARY]: <FaStar style={{ color: "#FFD700" }} />, // Gold star
};
