import { Skill } from '../../types/game';

// Unique skills for legendary/epic/rare characters
export const astralNova: Skill = {
    id: 'astral_nova',
    name: 'Astral Nova',
    description: 'Deal massive cosmic damage to all enemies and reduce their attack.',
    damage: 160,
    cooldown: 4,
    range: 999,
    manaCost: 28,
    isUltimate: false,
    statusEffect: { type: 'attack_down', duration: 2, value: -25 }
};

export const voidPulse: Skill = {
    id: 'void_pulse',
    name: 'Void Pulse',
    description: 'Deal void damage to a single enemy and silence them for 1 turn.',
    damage: 120,
    cooldown: 3,
    range: 3,
    manaCost: 20,
    isUltimate: false,
    statusEffect: { type: 'silence', duration: 1, value: 1 }
};

export const soulRend: Skill = {
    id: 'soul_rend',
    name: 'Soul Rend',
    description: 'Deal damage and apply Fear to a single enemy (chance to skip turn).',
    damage: 110,
    cooldown: 3,
    range: 2,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'fear', duration: 2, value: 0.3 }
};

export const miasmaCloud: Skill = {
    id: 'miasma_cloud',
    name: 'Miasma Cloud',
    description: 'Poison all enemies and reduce their healing for 2 turns.',
    cooldown: 4,
    range: 999,
    manaCost: 22,
    isUltimate: false,
    statusEffect: { type: 'heal_down', duration: 2, value: -30 }
};

export const timeLoop: Skill = {
    id: 'time_loop',
    name: 'Time Loop',
    description: 'Repeat the last skill used by this character.',
    cooldown: 5,
    range: 0,
    manaCost: 25,
    isUltimate: false,
    statusEffect: { type: 'repeat_skill', duration: 1, value: 1 }
};
