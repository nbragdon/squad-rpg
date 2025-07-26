import { CharacterProgress } from '../types/game';

export const BASE_XP_TO_NEXT_LEVEL = 100;
export const XP_GROWTH_RATE = 2;

export function getXpToNextLevel(level: number): number {
    return Math.floor(BASE_XP_TO_NEXT_LEVEL * (XP_GROWTH_RATE ** (level - 1)));
}

export function levelUp(character: CharacterProgress): CharacterProgress {
    let { level, xp, xpToNextLevel } = character;
    let newXp = xp;
    let newLevel = level;
    let newXpToNextLevel = xpToNextLevel;

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
        xpToNextLevel: newXpToNextLevel,
    };
}
