import { Skill } from '../../types/game';

// Unique skills for Uncommon and Rare characters
export const emberBurst: Skill = {
    id: 'ember_burst',
    name: 'Ember Burst',
    description: 'Deal fire damage and apply Burn for 1 turn.',
    damage: 110,
    cooldown: 2,
    range: 2,
    manaCost: 14,
    isUltimate: false,
    statusEffect: { type: 'burn', duration: 1, value: 15 }
};

export const glacialPrison: Skill = {
    id: 'glacial_prison',
    name: 'Glacial Prison',
    description: 'Freeze a single enemy for 1 turn.',
    cooldown: 3,
    range: 2,
    manaCost: 16,
    isUltimate: false,
    statusEffect: { type: 'freeze', duration: 1, value: 1 }
};

export const sunbeam: Skill = {
    id: 'sunbeam',
    name: 'Sunbeam',
    description: 'Heal an ally and grant them regen for 2 turns.',
    healing: 80,
    cooldown: 2,
    range: 2,
    manaCost: 14,
    isUltimate: false,
    statusEffect: { type: 'regen', duration: 2, value: 20 }
};

export const moonveil: Skill = {
    id: 'moonveil',
    name: 'Moonveil',
    description: 'Shield an ally and increase their evasion for 2 turns.',
    cooldown: 3,
    range: 2,
    manaCost: 16,
    isUltimate: false,
    statusEffect: { type: 'evasion', duration: 2, value: 0.2 }
};

export const shadowStrike: Skill = {
    id: 'shadow_strike',
    name: 'Shadow Strike',
    description: 'Deal dark damage and reduce target accuracy.',
    damage: 100,
    cooldown: 2,
    range: 1,
    manaCost: 12,
    isUltimate: false,
    statusEffect: { type: 'blind', duration: 2, value: -15 }
};

export const nightBlade: Skill = {
    id: 'night_blade',
    name: 'Night Blade',
    description: 'Deal damage and gain stealth for 1 turn.',
    damage: 90,
    cooldown: 2,
    range: 1,
    manaCost: 10,
    isUltimate: false,
    statusEffect: { type: 'stealth', duration: 1, value: 1 }
};

export const steelWall: Skill = {
    id: 'steel_wall',
    name: 'Steel Wall',
    description: 'Increase own defense and taunt all enemies for 1 turn.',
    cooldown: 3,
    range: 0,
    manaCost: 10,
    isUltimate: false,
    statusEffect: { type: 'taunt', duration: 1, value: 1 }
};

export const frostGuard: Skill = {
    id: 'frost_guard',
    name: 'Frost Guard',
    description: 'Reduce damage taken and apply Chill to attackers.',
    cooldown: 3,
    range: 0,
    manaCost: 12,
    isUltimate: false,
    statusEffect: { type: 'chill_retaliate', duration: 2, value: -10 }
};
