import { CharacterProgress } from "../types/game";

export const BASE_XP_TO_NEXT_LEVEL = 50;
export const XP_GROWTH_RATE = 1.5;

export function getXpToNextLevel(level: number): number {
  return Math.floor(BASE_XP_TO_NEXT_LEVEL * XP_GROWTH_RATE ** (level - 1));
}

export function levelUp(character: CharacterProgress): CharacterProgress {
  let { level, xp } = character;
  let newXp = xp;
  let newLevel = level;
  let newXpToNextLevel = getXpToNextLevel(level);

  // Level up as long as enough XP
  while (newXp >= newXpToNextLevel) {
    newXp -= newXpToNextLevel;
    newLevel += 1;
    newXpToNextLevel = getXpToNextLevel(newLevel);
  }

  return {
    ...character,
    level: newLevel,
    xp: newXp,
  };
}
