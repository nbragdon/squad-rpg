import { PlayerCharacter } from '../types/game';

export const BASE_XP_TO_NEXT_LEVEL = 100;
export const XP_GROWTH_RATE = 1.2;
export const STAT_GROWTH_PER_LEVEL = 1.05; // 5% per level

export function getXpToNextLevel(level: number): number {
    return Math.floor(BASE_XP_TO_NEXT_LEVEL * (XP_GROWTH_RATE ** (level - 1)));
}

export function levelUp(character: PlayerCharacter): PlayerCharacter {
    let { level, xp, xpToNextLevel, maxHealth, attack, defense, speed } = character;
    let newXp = xp;
    let newLevel = level;
    let newXpToNextLevel = xpToNextLevel;
    let newMaxHealth = maxHealth;
    let newAttack = attack;
    let newDefense = defense;
    let newSpeed = speed;

    // Level up as long as enough XP
    while (newXp >= newXpToNextLevel) {
        newXp -= newXpToNextLevel;
        newLevel += 1;
        newXpToNextLevel = getXpToNextLevel(newLevel);
        // Stat growth: 5% per level
        newMaxHealth = Math.round(newMaxHealth * STAT_GROWTH_PER_LEVEL);
        newAttack = Math.round(newAttack * STAT_GROWTH_PER_LEVEL);
        newDefense = Math.round(newDefense * STAT_GROWTH_PER_LEVEL);
        newSpeed = Math.round(newSpeed * STAT_GROWTH_PER_LEVEL);
    }

    return {
        ...character,
        level: newLevel,
        xp: newXp,
        xpToNextLevel: newXpToNextLevel,
        maxHealth: newMaxHealth,
        attack: newAttack,
        defense: newDefense,
        speed: newSpeed,
    };
}
