import { Skill } from '../../types/game';

// 20 unique basic skills (21-40)
export const burningLash: Skill = {
    id: 'burning_lash',
    name: 'Burning Lash',
    description: 'Deal fire damage and reduce healing received.',
    damage: 110,
    cooldown: 2,
    range: 2,
    manaCost: 14,
    isUltimate: false,
    statusEffect: { type: 'heal_down', duration: 2, value: -30 }
};

export const frostBite: Skill = {
    id: 'frost_bite',
    name: 'Frost Bite',
    description: 'Deal cold damage and slow target.',
    damage: 100,
    cooldown: 2,
    range: 2,
    manaCost: 12,
    isUltimate: false,
    statusEffect: { type: 'slow', duration: 2, value: -15 }
};

export const toxicSpit: Skill = {
    id: 'toxic_spit',
    name: 'Toxic Spit',
    description: 'Deal poison damage and reduce target attack.',
    damage: 90,
    cooldown: 2,
    range: 3,
    manaCost: 10,
    isUltimate: false,
    statusEffect: { type: 'attack_down', duration: 2, value: -20 }
};

export const radiantPulse: Skill = {
    id: 'radiant_pulse',
    name: 'Radiant Pulse',
    description: 'Deal light damage and heal self for a small amount.',
    damage: 100,
    cooldown: 2,
    range: 2,
    manaCost: 12,
    isUltimate: false,
    statusEffect: { type: 'self_heal', duration: 1, value: 40 }
};

export const ironWall: Skill = {
    id: 'iron_wall',
    name: 'Iron Wall',
    description: 'Greatly increase defense for 1 turn.',
    cooldown: 4,
    range: 0,
    manaCost: 0,
    isUltimate: false,
    statusEffect: { type: 'defense_up', duration: 1, value: 80 }
};

export const quickDraw: Skill = {
    id: 'quick_draw',
    name: 'Quick Draw',
    description: 'Deal damage and gain extra energy.',
    damage: 90,
    cooldown: 1,
    range: 2,
    manaCost: 8,
    isUltimate: false,
    statusEffect: { type: 'energy_gain', duration: 1, value: 20 }
};

export const blizzard: Skill = {
    id: 'blizzard',
    name: 'Blizzard',
    description: 'Deal cold damage to all enemies.',
    damage: 80,
    cooldown: 3,
    range: 999,
    manaCost: 25,
    isUltimate: false
};

export const shadowSlash: Skill = {
    id: 'shadow_slash',
    name: 'Shadow Slash',
    description: 'Deal dark damage and reduce target accuracy.',
    damage: 110,
    cooldown: 2,
    range: 1,
    manaCost: 14,
    isUltimate: false,
    statusEffect: { type: 'blind', duration: 2, value: -20 }
};

export const holySmite: Skill = {
    id: 'holy_smite',
    name: 'Holy Smite',
    description: 'Deal light damage and stun undead.',
    damage: 120,
    cooldown: 2,
    range: 2,
    manaCost: 16,
    isUltimate: false,
    statusEffect: { type: 'stun_undead', duration: 1, value: 1 }
};

export const drainingTouch: Skill = {
    id: 'draining_touch',
    name: 'Draining Touch',
    description: 'Deal damage and heal self for 30% of damage dealt.',
    damage: 90,
    cooldown: 2,
    range: 1,
    manaCost: 12,
    isUltimate: false,
    statusEffect: { type: 'lifesteal', duration: 1, value: 0.3 }
};

export const quickKick: Skill = {
    id: 'quick_kick',
    name: 'Quick Kick',
    description: 'Deal fast, low damage and push target back.',
    damage: 70,
    cooldown: 1,
    range: 1,
    manaCost: 6,
    isUltimate: false,
    statusEffect: { type: 'push', duration: 1, value: 1 }
};

export const sandTrap: Skill = {
    id: 'sand_trap',
    name: 'Sand Trap',
    description: 'Immobilize target for 2 turns.',
    cooldown: 4,
    range: 2,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'immobilize', duration: 2, value: 1 }
};

export const arcaneShield: Skill = {
    id: 'arcane_shield',
    name: 'Arcane Shield',
    description: 'Absorb next incoming attack.',
    cooldown: 3,
    range: 0,
    manaCost: 0,
    isUltimate: false,
    statusEffect: { type: 'absorb', duration: 1, value: 1 }
};

export const poisonCloud: Skill = {
    id: 'poison_cloud',
    name: 'Poison Cloud',
    description: 'Deal poison damage to all enemies over 2 turns.',
    damage: 60,
    cooldown: 3,
    range: 999,
    manaCost: 20,
    isUltimate: false,
    statusEffect: { type: 'poison', duration: 2, value: 20 }
};

export const rally: Skill = {
    id: 'rally',
    name: 'Rally',
    description: 'Increase all allies’ attack for 2 turns.',
    cooldown: 4,
    range: 999,
    manaCost: 0,
    isUltimate: false,
    statusEffect: { type: 'attack_up', duration: 2, value: 20 }
};

export const quickDodge: Skill = {
    id: 'quick_dodge',
    name: 'Quick Dodge',
    description: 'Increase own evasion for 1 turn.',
    cooldown: 2,
    range: 0,
    manaCost: 0,
    isUltimate: false,
    statusEffect: { type: 'evasion', duration: 1, value: 0.3 }
};

export const bloodFrenzy: Skill = {
    id: 'blood_frenzy',
    name: 'Blood Frenzy',
    description: 'Increase attack and lose HP each turn for 3 turns.',
    cooldown: 5,
    range: 0,
    manaCost: 0,
    isUltimate: false,
    statusEffect: { type: 'attack_up', duration: 3, value: 30 }
};

export const thunderArrow: Skill = {
    id: 'thunder_arrow',
    name: 'Thunder Arrow',
    description: 'Deal lightning damage and paralyze for 1 turn.',
    damage: 120,
    cooldown: 3,
    range: 5,
    manaCost: 20,
    isUltimate: false,
    statusEffect: { type: 'paralyze', duration: 1, value: 1 }
};

export const drainingMist: Skill = {
    id: 'draining_mist',
    name: 'Draining Mist',
    description: 'Deal damage and reduce target healing for 2 turns.',
    damage: 80,
    cooldown: 2,
    range: 2,
    manaCost: 10,
    isUltimate: false,
    statusEffect: { type: 'heal_down', duration: 2, value: -20 }
};
