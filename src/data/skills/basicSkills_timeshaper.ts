import { Skill } from '../../types/game';

// Chronomancer/Timeshaper themed skills
export const haste: Skill = {
    id: 'haste',
    name: 'Haste',
    description: 'Increase speed of all allies for 2 turns.',
    cooldown: 3,
    range: 999,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'speed_up', duration: 2, value: 30 }
};

export const slowTime: Skill = {
    id: 'slow_time',
    name: 'Slow Time',
    description: 'Reduce speed of all enemies for 2 turns.',
    cooldown: 3,
    range: 999,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'slow', duration: 2, value: -30 }
};

export const stopTime: Skill = {
    id: 'stop_time',
    name: 'Stop Time',
    description: 'Stun a single enemy for 1 turn (time stop).',
    cooldown: 4,
    range: 3,
    manaCost: 20,
    isUltimate: false,
    statusEffect: { type: 'stun', duration: 1, value: 1 }
};

export const reverseTime: Skill = {
    id: 'reverse_time',
    name: 'Reverse Time',
    description: 'Heal an ally and remove all debuffs (rewind their state).',
    healing: 120,
    cooldown: 4,
    range: 2,
    manaCost: 22,
    isUltimate: false,
    statusEffect: { type: 'cleanse', duration: 1, value: 99 }
};
