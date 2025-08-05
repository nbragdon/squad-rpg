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

export const ALL_ENEMIES = [...COMMON_ENEMIES];

export const TITAN_ENEMY = {
  [Rarity.COMMON]: [
    { id: ENEMY_BEAST_TITAN, level: 5 },
    { id: ENEMY_VOID_TITAN, level: 10 },
    { id: ENEMY_CHAOS_TITAN, level: 15 },
  ],
  [Rarity.UNCOMMON]: [
    { id: ENEMY_BEAST_TITAN, level: 5 },
    { id: ENEMY_VOID_TITAN, level: 10 },
    { id: ENEMY_CHAOS_TITAN, level: 15 },
  ],
  [Rarity.RARE]: [
    { id: ENEMY_BEAST_TITAN, level: 5 },
    { id: ENEMY_VOID_TITAN, level: 10 },
    { id: ENEMY_CHAOS_TITAN, level: 15 },
  ],
  [Rarity.EPIC]: [
    { id: ENEMY_BEAST_TITAN, level: 5 },
    { id: ENEMY_VOID_TITAN, level: 10 },
    { id: ENEMY_CHAOS_TITAN, level: 15 },
  ],
  [Rarity.LEGENDARY]: [
    { id: ENEMY_BEAST_TITAN, level: 5 },
    { id: ENEMY_VOID_TITAN, level: 10 },
    { id: ENEMY_CHAOS_TITAN, level: 15 },
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
};

export function getEnemyByChapterAndStage(chapter: number, stage: number) {
  const enemyId = STAGE_ENEMY[stage as keyof typeof STAGE_ENEMY];
  return [{ id: enemyId, level: stage }];
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
