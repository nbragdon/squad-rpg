import { Skill } from '../../types/game';

// Plague Doctor themed skills
export const virulentTouch: Skill = {
    id: 'virulent_touch',
    name: 'Virulent Touch',
    description: 'Deal poison damage and apply Plague for 2 turns.',
    damage: 100,
    cooldown: 2,
    range: 1,
    manaCost: 14,
    isUltimate: false,
    statusEffect: { type: 'plague', duration: 2, value: 20 }
};

export const epidemic: Skill = {
    id: 'epidemic',
    name: 'Epidemic',
    description: 'Spread all debuffs from one enemy to all enemies.',
    cooldown: 4,
    range: 999,
    manaCost: 20,
    isUltimate: false,
    statusEffect: { type: 'spread_debuffs', duration: 1, value: 1 }
};
