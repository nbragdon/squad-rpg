import { Rarity } from "types/rarity";
import {
  COMMON_ENEMIES,
  ENEMY_BAT_CAVE,
  ENEMY_BEETLE_IRON,
  ENEMY_FUNGUS_SPORELING,
  ENEMY_GOBLIN_SNEAK,
  ENEMY_IMP_FIRE,
  ENEMY_MIMIC_CHEST,
  ENEMY_RAT_GIANT,
  ENEMY_SKELETON_MINI,
  ENEMY_SLIME_GREEN,
  ENEMY_WOLF_CUB,
} from "./common-enemies";
import {
  ENEMY_BEAST_TITAN,
  ENEMY_VOID_TITAN,
  ENEMY_CHAOS_TITAN,
} from "./common-titans";
import { BattleInitEnemy } from "battle/battleTypes";
import { ENEMY_IRON_MIMIC_CHEST } from "./common-mimics";
import { ALL_DUNGEON_TEAMS } from "./dungeon-teams";
import {
  ENEMY_TEMPORAL_HORROR,
  ENEMY_INFERNO_DRAGON,
  ENEMY_ELDRITCH_ABOMINATION,
  ENEMY_STORM_ELEMENTAL,
  ENEMY_MOUNTAIN_SHAMBLER,
  ENEMY_SOULFLAME_PHOENIX,
  ENEMY_ABYSSAL_KRAKEN,
  ENEMY_ARCANE_CONSTRUCT,
  ENEMY_WHISPERFANG_STALKER,
  ENEMY_SPECTRAL_ARCHMAGE,
} from "./epic-enemies";
import {
  ENEMY_CERULEAN_EIDOLON,
  ENEMY_CHTHONIAN_LEVIATHAN,
  ENEMY_FELLFORGED_AUTOMATON,
  ENEMY_GRAVEWROUGHT_EFFIGY,
  ENEMY_LUMINARY_MYCELIUM,
  ENEMY_MAELSTROM_VORTEX,
  ENEMY_RIFTBOUND_MIMIC,
  ENEMY_SOLARIS_CHIMERA,
  ENEMY_SOVEREIGN_OF_THE_WEALD,
  ENEMY_WHISPERWIND_ARCHON,
} from "./legendary-enemies";
import {
  ENEMY_EMBER_ELEMENTAL,
  ENEMY_ARCANE_SENTINEL,
  ENEMY_WHISPERING_HORROR,
  ENEMY_CRYSTAL_SERPENT,
  ENEMY_SUN_WORSHIPPER,
  ENEMY_SPECTRAL_WOLF,
  ENEMY_FOREST_GUARDIAN,
  ENEMY_SHADOW_WEAVER,
  ENEMY_FROST_GIANT,
  ENEMY_FEYWILD_HYDRA,
} from "./rare-enemies";
import {
  ENEMY_CURSED_ARCHER,
  ENEMY_STONE_GOLEM,
  ENEMY_SIREN,
  ENEMY_SAND_SCORPION,
  ENEMY_PHANTOM,
  ENEMY_WYRMLING,
  ENEMY_ROGUE_SCOUT,
  ENEMY_SCHOLAR_SCRIBE,
  ENEMY_THUNDER_DRAKE,
  ENEMY_MOUNTAIN_BEAR,
} from "./uncommon-enemies";

export const ALL_ENEMIES = [...COMMON_ENEMIES];

export const TITAN_ENEMY = {
  [Rarity.COMMON]: [
    { id: ENEMY_BEAST_TITAN, level: 5 },
    { id: ENEMY_VOID_TITAN, level: 10 },
    { id: ENEMY_CHAOS_TITAN, level: 15 },
  ],
  [Rarity.UNCOMMON]: [
    { id: ENEMY_BEAST_TITAN, level: 10 },
    { id: ENEMY_VOID_TITAN, level: 20 },
    { id: ENEMY_CHAOS_TITAN, level: 30 },
  ],
  [Rarity.RARE]: [
    { id: ENEMY_BEAST_TITAN, level: 25 },
    { id: ENEMY_VOID_TITAN, level: 35 },
    { id: ENEMY_CHAOS_TITAN, level: 50 },
  ],
  [Rarity.EPIC]: [
    { id: ENEMY_BEAST_TITAN, level: 50 },
    { id: ENEMY_VOID_TITAN, level: 60 },
    { id: ENEMY_CHAOS_TITAN, level: 80 },
  ],
  [Rarity.LEGENDARY]: [
    { id: ENEMY_BEAST_TITAN, level: 90 },
    { id: ENEMY_VOID_TITAN, level: 110 },
    { id: ENEMY_CHAOS_TITAN, level: 150 },
  ],
};

// Map of chapter 1 stage number (1-10) to a unique enemy
export const STAGE_ENEMY = {
  1: ENEMY_SLIME_GREEN,
  2: ENEMY_RAT_GIANT,
  3: ENEMY_BAT_CAVE,
  4: ENEMY_GOBLIN_SNEAK,
  5: ENEMY_FUNGUS_SPORELING,
  6: ENEMY_SKELETON_MINI,
  7: ENEMY_WOLF_CUB,
  8: ENEMY_IMP_FIRE,
  9: ENEMY_BEETLE_IRON,
  10: ENEMY_MIMIC_CHEST,
  11: ENEMY_CURSED_ARCHER,
  12: ENEMY_STONE_GOLEM,
  13: ENEMY_SIREN,
  14: ENEMY_SAND_SCORPION,
  15: ENEMY_PHANTOM,
  16: ENEMY_WYRMLING,
  17: ENEMY_ROGUE_SCOUT,
  18: ENEMY_SCHOLAR_SCRIBE,
  19: ENEMY_THUNDER_DRAKE,
  20: ENEMY_MOUNTAIN_BEAR,
  21: ENEMY_EMBER_ELEMENTAL,
  22: ENEMY_ARCANE_SENTINEL,
  23: ENEMY_WHISPERING_HORROR,
  24: ENEMY_CRYSTAL_SERPENT,
  25: ENEMY_SUN_WORSHIPPER,
  26: ENEMY_SPECTRAL_WOLF,
  27: ENEMY_FOREST_GUARDIAN,
  28: ENEMY_SHADOW_WEAVER,
  29: ENEMY_FROST_GIANT,
  30: ENEMY_FEYWILD_HYDRA,
  31: ENEMY_TEMPORAL_HORROR,
  32: ENEMY_INFERNO_DRAGON,
  33: ENEMY_ELDRITCH_ABOMINATION,
  34: ENEMY_STORM_ELEMENTAL,
  35: ENEMY_MOUNTAIN_SHAMBLER,
  36: ENEMY_SOULFLAME_PHOENIX,
  37: ENEMY_ABYSSAL_KRAKEN,
  38: ENEMY_ARCANE_CONSTRUCT,
  39: ENEMY_WHISPERFANG_STALKER,
  40: ENEMY_SPECTRAL_ARCHMAGE,
  41: ENEMY_CERULEAN_EIDOLON,
  42: ENEMY_CHTHONIAN_LEVIATHAN,
  43: ENEMY_FELLFORGED_AUTOMATON,
  44: ENEMY_GRAVEWROUGHT_EFFIGY,
  45: ENEMY_LUMINARY_MYCELIUM,
  46: ENEMY_MAELSTROM_VORTEX,
  47: ENEMY_RIFTBOUND_MIMIC,
  48: ENEMY_SOLARIS_CHIMERA,
  49: ENEMY_SOVEREIGN_OF_THE_WEALD,
  50: ENEMY_WHISPERWIND_ARCHON,
};

export function getRaidEnemiesByRarityAndLevel(rarity: Rarity, level: number) {
  const RAID_ENEMY_MAP = {
    [Rarity.COMMON]: [
      { id: ENEMY_IRON_MIMIC_CHEST, level: level },
      { id: ENEMY_IRON_MIMIC_CHEST, level: level },
      { id: ENEMY_IRON_MIMIC_CHEST, level: level },
    ],
    [Rarity.UNCOMMON]: [
      { id: ENEMY_IRON_MIMIC_CHEST, level: level },
      { id: ENEMY_IRON_MIMIC_CHEST, level: level },
      { id: ENEMY_IRON_MIMIC_CHEST, level: level },
    ],
    [Rarity.RARE]: [
      { id: ENEMY_IRON_MIMIC_CHEST, level: level },
      { id: ENEMY_IRON_MIMIC_CHEST, level: level },
      { id: ENEMY_IRON_MIMIC_CHEST, level: level },
    ],
    [Rarity.EPIC]: [
      { id: ENEMY_IRON_MIMIC_CHEST, level: level },
      { id: ENEMY_IRON_MIMIC_CHEST, level: level },
      { id: ENEMY_IRON_MIMIC_CHEST, level: level },
    ],
    [Rarity.LEGENDARY]: [
      { id: ENEMY_IRON_MIMIC_CHEST, level: level },
      { id: ENEMY_IRON_MIMIC_CHEST, level: level },
      { id: ENEMY_IRON_MIMIC_CHEST, level: level },
    ],
  };

  return RAID_ENEMY_MAP[rarity];
}

export const STAGES_PER_CHAPTER = 10;

export function getSoloStageNumber(chapter: number, stage: number) {
  return (chapter - 1) * STAGES_PER_CHAPTER + stage;
}

const getLevelIncreaseByChapter = (chapter: number) => {
  return chapter;
};

export function getEnemyByChapterAndStage(chapter: number, stage: number) {
  const enemyId =
    STAGE_ENEMY[getSoloStageNumber(chapter, stage) as keyof typeof STAGE_ENEMY];
  let level = 0;
  for (let i = 1; i <= chapter; i++) {
    if (i === chapter) {
      level += getLevelIncreaseByChapter(i) * (stage - 1);
    } else {
      level += getLevelIncreaseByChapter(i) * STAGES_PER_CHAPTER;
    }
  }
  return [{ id: enemyId, level }];
}

export const generateTitan = (
  rarity: Rarity,
  level: number,
): BattleInitEnemy[] => {
  return [TITAN_ENEMY[rarity][level - 1]];
};

export function getRandomEnemy(level: number, rarity: Rarity) {
  const enemies = [];
  if (rarity === Rarity.COMMON) {
    enemies.push(...COMMON_ENEMIES);
  }
  if (rarity === Rarity.UNCOMMON) {
    enemies.push(...COMMON_ENEMIES);
  }
  if (rarity === Rarity.RARE) {
    enemies.push(...COMMON_ENEMIES);
  }
  if (rarity === Rarity.EPIC) {
    enemies.push(...COMMON_ENEMIES);
  }
  if (rarity === Rarity.LEGENDARY) {
    enemies.push(...COMMON_ENEMIES);
  }
  const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
  return {
    id: randomEnemy,
    level: level,
  };
}

export function getRandomDungeonTeam(level: number, rarity: Rarity) {
  let allPossibleTeams = ALL_DUNGEON_TEAMS[rarity];
  const randomTeam =
    allPossibleTeams[Math.floor(Math.random() * allPossibleTeams.length)];

  return randomTeam.map((enemy) => {
    return {
      id: { ...enemy },
      level: level,
    };
  });
}
