import { Skill } from '../../types/game';

// Unique skills for Rare characters
export const steelBreaker: Skill = {
    id: 'steel_breaker',
    name: 'Steel Breaker',
    description: 'Deal heavy physical damage and reduce target defense.',
    damage: 130,
    cooldown: 2,
    range: 1,
    manaCost: 16,
    isUltimate: false,
    statusEffect: { type: 'defense_down', duration: 2, value: -20 }
};

export const frostGuardAura: Skill = {
    id: 'frost_guard_aura',
    name: 'Frost Guard Aura',
    description: 'Reduce damage taken by all allies and apply Chill to attackers.',
    cooldown: 4,
    range: 999,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'chill_retaliate', duration: 2, value: -10 }
};

export const pyreBlast: Skill = {
    id: 'pyre_blast',
    name: 'Pyre Blast',
    description: 'Deal fire damage to all enemies.',
    damage: 90,
    cooldown: 3,
    range: 999,
    manaCost: 22,
    isUltimate: false
};

export const cryoSpike: Skill = {
    id: 'cryo_spike',
    name: 'Cryo Spike',
    description: 'Deal ice damage and freeze a single enemy for 1 turn.',
    damage: 110,
    cooldown: 3,
    range: 2,
    manaCost: 16,
    isUltimate: false,
    statusEffect: { type: 'freeze', duration: 1, value: 1 }
};

export const radiantWard: Skill = {
    id: 'radiant_ward',
    name: 'Radiant Ward',
    description: 'Shield all allies and heal them for a small amount.',
    healing: 40,
    cooldown: 3,
    range: 999,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'shield', duration: 2, value: 30 }
};

export const shadowHeal: Skill = {
    id: 'shadow_heal',
    name: 'Shadow Heal',
    description: 'Heal self and gain evasion for 1 turn.',
    healing: 60,
    cooldown: 2,
    range: 0,
    manaCost: 12,
    isUltimate: false,
    statusEffect: { type: 'evasion', duration: 1, value: 0.2 }
};
