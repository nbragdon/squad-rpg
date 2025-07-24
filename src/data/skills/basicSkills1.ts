import { Skill } from '../../types/game';

// 20 unique basic skills (1-20)
export const flameStrike: Skill = {
    id: 'flame_strike',
    name: 'Flame Strike',
    description: 'Deal heavy fire damage and apply Burn (damage over time).',
    damage: 180,
    cooldown: 2,
    range: 2,
    manaCost: 20,
    isUltimate: false,
    statusEffect: { type: 'burn', duration: 3, value: 30 }
};

export const iceBlast: Skill = {
    id: 'ice_blast',
    name: 'Ice Blast',
    description: 'Deal cold damage and reduce target speed (Chill).',
    damage: 120,
    cooldown: 2,
    range: 3,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'chill', duration: 2, value: -20 }
};

export const venomDagger: Skill = {
    id: 'venom_dagger',
    name: 'Venom Dagger',
    description: 'Deal damage and apply Poison (damage each turn).',
    damage: 90,
    cooldown: 1,
    range: 1,
    manaCost: 10,
    isUltimate: false,
    statusEffect: { type: 'poison', duration: 4, value: 25 }
};

export const divineAegis: Skill = {
    id: 'divine_aegis',
    name: 'Divine Aegis',
    description: 'Grant a shield that reduces all damage taken.',
    cooldown: 3,
    range: 1,
    manaCost: 25,
    isUltimate: false,
    statusEffect: { type: 'damage_reduction', duration: 2, value: 0.5 }
};

export const quickHeal: Skill = {
    id: 'quick_heal',
    name: 'Quick Heal',
    description: 'Instantly heal an ally.',
    healing: 120,
    cooldown: 1,
    range: 2,
    manaCost: 15,
    isUltimate: false
};

export const berserk: Skill = {
    id: 'berserk',
    name: 'Berserk',
    description: 'Increase own attack for 3 turns.',
    cooldown: 4,
    range: 0,
    manaCost: 0,
    isUltimate: false,
    statusEffect: { type: 'attack_up', duration: 3, value: 40 }
};

export const shadowStep: Skill = {
    id: 'shadow_step',
    name: 'Shadow Step',
    description: 'Evade next attack and gain speed.',
    cooldown: 3,
    range: 0,
    manaCost: 0,
    isUltimate: false,
    statusEffect: { type: 'evasion', duration: 1, value: 1 }
};

export const holyLight: Skill = {
    id: 'holy_light',
    name: 'Holy Light',
    description: 'Heal an ally and remove 1 debuff.',
    healing: 100,
    cooldown: 2,
    range: 2,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'cleanse', duration: 1, value: 1 }
};

export const thunderClap: Skill = {
    id: 'thunder_clap',
    name: 'Thunder Clap',
    description: 'Deal lightning damage and stun for 1 turn.',
    damage: 140,
    cooldown: 3,
    range: 1,
    manaCost: 22,
    isUltimate: false,
    statusEffect: { type: 'stun', duration: 1, value: 1 }
};

export const cripplingShot: Skill = {
    id: 'crippling_shot',
    name: 'Crippling Shot',
    description: 'Deal damage and reduce target defense.',
    damage: 110,
    cooldown: 2,
    range: 4,
    manaCost: 16,
    isUltimate: false,
    statusEffect: { type: 'defense_down', duration: 2, value: -25 }
};

export const windSlash: Skill = {
    id: 'wind_slash',
    name: 'Wind Slash',
    description: 'Deal damage and increase own speed.',
    damage: 100,
    cooldown: 1,
    range: 2,
    manaCost: 12,
    isUltimate: false,
    statusEffect: { type: 'speed_up', duration: 2, value: 20 }
};

export const stoneSkin: Skill = {
    id: 'stone_skin',
    name: 'Stone Skin',
    description: 'Increase own defense for 3 turns.',
    cooldown: 4,
    range: 0,
    manaCost: 0,
    isUltimate: false,
    statusEffect: { type: 'defense_up', duration: 3, value: 40 }
};

export const drainingBite: Skill = {
    id: 'draining_bite',
    name: 'Draining Bite',
    description: 'Deal damage and heal self for half the damage dealt.',
    damage: 90,
    cooldown: 2,
    range: 1,
    manaCost: 14,
    isUltimate: false,
    statusEffect: { type: 'lifesteal', duration: 1, value: 0.5 }
};

export const blindingPowder: Skill = {
    id: 'blinding_powder',
    name: 'Blinding Powder',
    description: 'Reduce target accuracy for 2 turns.',
    cooldown: 3,
    range: 2,
    manaCost: 10,
    isUltimate: false,
    statusEffect: { type: 'blind', duration: 2, value: -30 }
};

export const arcaneBolt: Skill = {
    id: 'arcane_bolt',
    name: 'Arcane Bolt',
    description: 'Deal magic damage and restore a small amount of energy.',
    damage: 100,
    cooldown: 1,
    range: 3,
    manaCost: 10,
    isUltimate: false,
    statusEffect: { type: 'energy_gain', duration: 1, value: 10 }
};

export const quickStab: Skill = {
    id: 'quick_stab',
    name: 'Quick Stab',
    description: 'Deal fast, low damage and gain extra turn chance.',
    damage: 80,
    cooldown: 1,
    range: 1,
    manaCost: 8,
    isUltimate: false,
    statusEffect: { type: 'extra_turn', duration: 1, value: 0.2 }
};

export const earthGrasp: Skill = {
    id: 'earth_grasp',
    name: 'Earth Grasp',
    description: 'Deal damage and root target for 1 turn.',
    damage: 110,
    cooldown: 2,
    range: 2,
    manaCost: 15,
    isUltimate: false,
    statusEffect: { type: 'root', duration: 1, value: 1 }
};

export const bloodRitual: Skill = {
    id: 'blood_ritual',
    name: 'Blood Ritual',
    description: 'Sacrifice HP to gain energy and attack.',
    cooldown: 3,
    range: 0,
    manaCost: 0,
    isUltimate: false,
    statusEffect: { type: 'self_damage', duration: 1, value: 50 }
};

export const piercingArrow: Skill = {
    id: 'piercing_arrow',
    name: 'Piercing Arrow',
    description: 'Deal damage that ignores part of target defense.',
    damage: 120,
    cooldown: 2,
    range: 5,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'ignore_defense', duration: 1, value: 0.3 }
};

export const shadowBind: Skill = {
    id: 'shadow_bind',
    name: 'Shadow Bind',
    description: 'Immobilize target for 1 turn.',
    cooldown: 3,
    range: 2,
    manaCost: 15,
    isUltimate: false,
    statusEffect: { type: 'immobilize', duration: 1, value: 1 }
};
