import { Skill } from '../../types/game';

// Soulreaper/Death themed skills
export const soulDrain: Skill = {
    id: 'soul_drain',
    name: 'Soul Drain',
    description: 'Deal damage to a single enemy and heal self for half the damage.',
    damage: 110,
    cooldown: 2,
    range: 2,
    manaCost: 16,
    isUltimate: false,
    statusEffect: { type: 'lifesteal', duration: 1, value: 0.5 }
};

export const spiritShackle: Skill = {
    id: 'spirit_shackle',
    name: 'Spirit Shackle',
    description: 'Immobilize a single enemy for 2 turns (bind their soul).',
    cooldown: 4,
    range: 2,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'immobilize', duration: 2, value: 1 }
};
