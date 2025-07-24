import { Skill } from '../../types/game';

// 20 new unique basic skills (51-70)
export const arcaneVolley: Skill = {
    id: 'arcane_volley',
    name: 'Arcane Volley',
    description: 'Deal magic damage to all enemies.',
    damage: 70,
    cooldown: 3,
    range: 999,
    manaCost: 22,
    isUltimate: false
};

export const healingChant: Skill = {
    id: 'healing_chant',
    name: 'Healing Chant',
    description: 'Heal all allies for a small amount.',
    healing: 60,
    cooldown: 3,
    range: 999,
    manaCost: 20,
    isUltimate: false
};

export const shieldWall: Skill = {
    id: 'shield_wall',
    name: 'Shield Wall',
    description: 'Increase defense of all allies for 2 turns.',
    cooldown: 4,
    range: 999,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'defense_up', duration: 2, value: 25 }
};

export const doubleStrike: Skill = {
    id: 'double_strike',
    name: 'Double Strike',
    description: 'Attack a single enemy twice.',
    damage: 60,
    cooldown: 2,
    range: 1,
    manaCost: 12,
    isUltimate: false
};

export const chainLightning: Skill = {
    id: 'chain_lightning',
    name: 'Chain Lightning',
    description: 'Deal lightning damage to 2 random enemies.',
    damage: 90,
    cooldown: 3,
    range: 2,
    manaCost: 18,
    isUltimate: false
};

export const rally: Skill = {
    id: 'rally',
    name: 'Rally',
    description: 'Increase attack of all allies for 2 turns.',
    cooldown: 4,
    range: 999,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'attack_up', duration: 2, value: 20 }
};

export const shadowVeil: Skill = {
    id: 'shadow_veil',
    name: 'Shadow Veil',
    description: 'Increase evasion of self for 2 turns.',
    cooldown: 3,
    range: 0,
    manaCost: 10,
    isUltimate: false,
    statusEffect: { type: 'evasion', duration: 2, value: 0.3 }
};

export const poisonCloud: Skill = {
    id: 'poison_cloud',
    name: 'Poison Cloud',
    description: 'Poison all enemies for 2 turns.',
    cooldown: 4,
    range: 999,
    manaCost: 20,
    isUltimate: false,
    statusEffect: { type: 'poison', duration: 2, value: 15 }
};

export const manaSurge: Skill = {
    id: 'mana_surge',
    name: 'Mana Surge',
    description: 'Restore mana to self and one ally.',
    cooldown: 3,
    range: 2,
    manaCost: 0,
    isUltimate: false,
    statusEffect: { type: 'mana_restore', duration: 1, value: 25 }
};

export const piercingArrow: Skill = {
    id: 'piercing_arrow',
    name: 'Piercing Arrow',
    description: 'Deal damage to a single enemy and ignore defense.',
    damage: 110,
    cooldown: 2,
    range: 3,
    manaCost: 16,
    isUltimate: false,
    statusEffect: { type: 'ignore_defense', duration: 1, value: 1 }
};

export const groupHeal: Skill = {
    id: 'group_heal',
    name: 'Group Heal',
    description: 'Heal two random allies.',
    healing: 80,
    cooldown: 3,
    range: 2,
    manaCost: 18,
    isUltimate: false
};

export const enrage: Skill = {
    id: 'enrage',
    name: 'Enrage',
    description: 'Increase own attack and lower own defense for 2 turns.',
    cooldown: 3,
    range: 0,
    manaCost: 8,
    isUltimate: false,
    statusEffect: { type: 'attack_up_defense_down', duration: 2, value: 25 }
};

export const frostArmor: Skill = {
    id: 'frost_armor',
    name: 'Frost Armor',
    description: 'Increase own defense and apply Chill to attackers.',
    cooldown: 3,
    range: 0,
    manaCost: 12,
    isUltimate: false,
    statusEffect: { type: 'chill_retaliate', duration: 2, value: -10 }
};

export const blindingLight: Skill = {
    id: 'blinding_light',
    name: 'Blinding Light',
    description: 'Blind all enemies for 1 turn.',
    cooldown: 4,
    range: 999,
    manaCost: 20,
    isUltimate: false,
    statusEffect: { type: 'blind', duration: 1, value: -30 }
};

export const vampiricTouch: Skill = {
    id: 'vampiric_touch',
    name: 'Vampiric Touch',
    description: 'Deal damage to a single enemy and heal self for half the damage.',
    damage: 90,
    cooldown: 2,
    range: 1,
    manaCost: 14,
    isUltimate: false,
    statusEffect: { type: 'lifesteal', duration: 1, value: 0.5 }
};

export const taunt: Skill = {
    id: 'taunt',
    name: 'Taunt',
    description: 'Force a single enemy to target you for 2 turns.',
    cooldown: 3,
    range: 1,
    manaCost: 8,
    isUltimate: false,
    statusEffect: { type: 'taunt', duration: 2, value: 1 }
};

export const dispel: Skill = {
    id: 'dispel',
    name: 'Dispel',
    description: 'Remove all buffs from a single enemy.',
    cooldown: 3,
    range: 2,
    manaCost: 14,
    isUltimate: false,
    statusEffect: { type: 'dispel', duration: 1, value: 1 }
};

export const quickGuard: Skill = {
    id: 'quick_guard',
    name: 'Quick Guard',
    description: 'Block the next attack against self or an ally.',
    cooldown: 3,
    range: 2,
    manaCost: 10,
    isUltimate: false,
    statusEffect: { type: 'block', duration: 1, value: 1 }
};

export const windSlash: Skill = {
    id: 'wind_slash',
    name: 'Wind Slash',
    description: 'Deal wind damage to a single enemy and reduce their speed.',
    damage: 100,
    cooldown: 2,
    range: 2,
    manaCost: 12,
    isUltimate: false,
    statusEffect: { type: 'slow', duration: 2, value: -10 }
};
