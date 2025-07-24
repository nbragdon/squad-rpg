import { Rarity, StatusEffect } from './game';

export interface EnemySkill {
    id: string;
    name: string;
    description: string;
    damage?: number;
    healing?: number;
    energyCost?: number;
    statusEffect?: StatusEffect;
}

export interface EnemyCharacter {
    id: string;
    name: string;
    rarity: Rarity;
    maxHealth: number;
    attack: number;
    defense: number;
    speed: number;
    maxEnergy: number;
    energyGain: number;
    skills: EnemySkill[];
}
