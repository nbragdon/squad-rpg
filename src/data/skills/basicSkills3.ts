import { Skill } from '../../types/game';

// 10 unique basic skills (41-50)
export const burningBlade: Skill = {
    id: 'burning_blade',
    name: 'Burning Blade',
    description: 'Deal fire damage and apply Burn for 2 turns.',
    damage: 120,
    cooldown: 2,
    range: 1,
    manaCost: 14,
    isUltimate: false,
    statusEffect: { type: 'burn', duration: 2, value: 20 }
};

export const chillingTouch: Skill = {
    id: 'chilling_touch',
    name: 'Chilling Touch',
    description: 'Deal cold damage and reduce target speed.',
    damage: 100,
    cooldown: 2,
    range: 1,
    manaCost: 12,
    isUltimate: false,
    statusEffect: { type: 'slow', duration: 2, value: -10 }
};

export const venomousBite: Skill = {
    id: 'venomous_bite',
    name: 'Venomous Bite',
    description: 'Deal poison damage and apply Poison for 3 turns.',
    damage: 90,
    cooldown: 2,
    range: 1,
    manaCost: 10,
    isUltimate: false,
    statusEffect: { type: 'poison', duration: 3, value: 15 }
};

export const radiantSlash: Skill = {
    id: 'radiant_slash',
    name: 'Radiant Slash',
    description: 'Deal light damage and heal self for 20 HP.',
    damage: 110,
    cooldown: 2,
    range: 1,
    manaCost: 12,
    isUltimate: false,
    statusEffect: { type: 'self_heal', duration: 1, value: 20 }
};

export const ironFist: Skill = {
    id: 'iron_fist',
    name: 'Iron Fist',
    description: 'Deal physical damage and increase own defense.',
    damage: 100,
    cooldown: 2,
    range: 1,
    manaCost: 10,
    isUltimate: false,
    statusEffect: { type: 'defense_up', duration: 2, value: 20 }
};

export const quickSlash: Skill = {
    id: 'quick_slash',
    name: 'Quick Slash',
    description: 'Deal fast, low damage and gain extra turn chance.',
    damage: 80,
    cooldown: 1,
    range: 1,
    manaCost: 8,
    isUltimate: false,
    statusEffect: { type: 'extra_turn', duration: 1, value: 0.15 }
};

export const sandstorm: Skill = {
    id: 'sandstorm',
    name: 'Sandstorm',
    description: 'Deal earth damage and blind target for 1 turn.',
    damage: 100,
    cooldown: 2,
    range: 2,
    manaCost: 12,
    isUltimate: false,
    statusEffect: { type: 'blind', duration: 1, value: -25 }
};

export const bloodPact: Skill = {
    id: 'blood_pact',
    name: 'Blood Pact',
    description: 'Sacrifice HP to increase attack for 2 turns.',
    cooldown: 3,
    range: 0,
    manaCost: 0,
    isUltimate: false,
    statusEffect: { type: 'self_damage', duration: 1, value: 30 }
};

export const thunderStrike: Skill = {
    id: 'thunder_strike',
    name: 'Thunder Strike',
    description: 'Deal lightning damage and stun for 1 turn.',
    damage: 130,
    cooldown: 3,
    range: 2,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'stun', duration: 1, value: 1 }
};

export const drainingArrow: Skill = {
    id: 'draining_arrow',
    name: 'Draining Arrow',
    description: 'Deal damage and heal self for 25% of damage dealt.',
    damage: 90,
    cooldown: 2,
    range: 4,
    manaCost: 10,
    isUltimate: false,
    statusEffect: { type: 'lifesteal', duration: 1, value: 0.25 }
};
