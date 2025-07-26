import { CostType, Skill, SkillType, StatusEffectType, TargetType } from '../../types/skillTypes';

// 20 unique basic skills (21-40)
export const burningLash: Skill = {
    id: 'burning_lash',
    name: 'Burning Lash',
    description: 'Deal fire damage and apply burn.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.1 },
    cooldownTurns: 2,
    targetType: TargetType.SingleEnemy,
    costType: CostType.Mana,
    costAmount: 15,
    isUltimate: false,
    type: SkillType.Attack,
    statusEffectsApplied: [{
        id: 'burn_dot',
        name: 'Burn',
        type: StatusEffectType.Dot,
        duration: 2,
        value: 20,
        damageType: 'fire',
        description: 'Takes fire damage each turn.'
    }]
};

export const frostBite: Skill = {
    id: 'frost_bite',
    name: 'Frost Bite',
    description: 'Deal cold damage and apply freeze.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.0 },
    cooldownTurns: 2,
    targetType: TargetType.SingleEnemy,
    costType: CostType.Mana,
    costAmount: 12,
    isUltimate: false,
    type: SkillType.Attack,
    statusEffectsApplied: [{
        id: 'freeze',
        name: 'Freeze',
        type: StatusEffectType.Cc,
        duration: 2,
        value: 0,
        description: 'Target is frozen and takes cold damage over time.'
    }]
};

export const toxicSpit: Skill = {
    id: 'toxic_spit',
    name: 'Toxic Spit',
    description: 'Deal poison damage and apply poison.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 0.9 },
    cooldownTurns: 2,
    targetType: TargetType.SingleEnemy,
    costType: CostType.Mana,
    costAmount: 10,
    isUltimate: false,
    type: SkillType.Attack,
    statusEffectsApplied: [{
        id: 'poison_dot',
        name: 'Poison',
        type: StatusEffectType.Dot,
        duration: 2,
        value: 15,
        damageType: 'nature',
        description: 'Takes nature damage each turn.'
    }]
};

export const radiantPulse: Skill = {
    id: 'radiant_pulse',
    name: 'Radiant Pulse',
    description: 'Deal light damage and heal self.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.0 },
    cooldownTurns: 2,
    targetType: TargetType.SingleEnemy,
    costType: CostType.Mana,
    costAmount: 12,
    isUltimate: false,
    type: SkillType.Attack,
    statusEffectsApplied: [{
        id: 'self_heal',
        name: 'Self Heal',
        type: StatusEffectType.Hot,
        duration: 1,
        value: 40,
        description: 'Heals for a portion of the damage dealt.'
    }]
};

export const ironWall: Skill = {
    id: 'iron_wall',
    name: 'Iron Wall',
    description: 'Greatly increase defense for 1 turn.',
    cooldownTurns: 4,
    targetType: TargetType.Self,
    costType: CostType.None,
    costAmount: 0,
    isUltimate: false,
    type: SkillType.Buff,
    statusEffectsApplied: [{
        id: 'defense_up',
        name: 'Defense Up',
        type: StatusEffectType.Buff,
        duration: 1,
        value: 80,
        description: 'Increases defense significantly.'
    }]
};

export const quickDraw: Skill = {
    id: 'quick_draw',
    name: 'Quick Draw',
    description: 'Deal damage and gain extra energy.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 0.9 },
    cooldownTurns: 1,
    targetType: TargetType.SingleEnemy,
    costType: CostType.Mana,
    costAmount: 8,
    isUltimate: false,
    type: SkillType.Attack,
    statusEffectsApplied: [{
        id: 'energy_gain',
        name: 'Energy Gain',
        type: StatusEffectType.Buff,
        duration: 1,
        value: 20,
        description: 'Gain extra energy immediately.'
    }]
};

export const blizzard: Skill = {
    id: 'blizzard',
    name: 'Blizzard',
    description: 'Deal cold damage to all enemies.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 0.8 },
    cooldownTurns: 3,
    targetType: TargetType.AllEnemies,
    costType: CostType.Mana,
    costAmount: 25,
    isUltimate: false,
    type: SkillType.Attack,
    statusEffectsApplied: []
};

export const shadowSlash: Skill = {
    id: 'shadow_slash',
    name: 'Shadow Slash',
    description: 'Deal dark damage and apply blind.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.1 },
    cooldownTurns: 2,
    targetType: TargetType.SingleEnemy,
    costType: CostType.Mana,
    costAmount: 14,
    isUltimate: false,
    type: SkillType.Attack,
    statusEffectsApplied: [{
        id: 'blind',
        name: 'Blind',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: -20,
        description: 'Reduces accuracy significantly.'
    }]
};

export const holySmite: Skill = {
    id: 'holy_smite',
    name: 'Holy Smite',
    description: 'Deal light damage and stun undead.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.2 },
    cooldownTurns: 2,
    targetType: TargetType.SingleEnemy,
    costType: CostType.Mana,
    costAmount: 16,
    isUltimate: false,
    type: SkillType.Attack,
    statusEffectsApplied: [{
        id: 'stun_undead',
        name: 'Stun Undead',
        type: StatusEffectType.Cc,
        duration: 1,
        value: 0,
        description: 'Stuns undead targets, preventing action.'
    }]
};

export const drainingTouch: Skill = {
    id: 'draining_touch',
    name: 'Draining Touch',
    description: 'Deal damage and heal self for a portion of the damage dealt.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 0.9 },
    cooldownTurns: 2,
    targetType: TargetType.SingleEnemy,
    costType: CostType.Mana,
    costAmount: 12,
    isUltimate: false,
    type: SkillType.Attack,
    statusEffectsApplied: [{
        id: 'lifesteal',
        name: 'Lifesteal',
        type: StatusEffectType.Hot,
        duration: 1,
        value: 0.3,
        description: 'Heals for a portion of the damage dealt.'
    }]
};

export const quickKick: Skill = {
    id: 'quick_kick',
    name: 'Quick Kick',
    description: 'Deal fast, low damage and push target back.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 0.7 },
    cooldownTurns: 1,
    targetType: TargetType.SingleEnemy,
    costType: CostType.Mana,
    costAmount: 6,
    isUltimate: false,
    type: SkillType.Attack,
    statusEffectsApplied: [{
        id: 'push',
        name: 'Push',
        type: StatusEffectType.Cc,
        duration: 1,
        value: 1,
        description: 'Pushes the target back in the turn order.'
    }]
};

export const sandTrap: Skill = {
    id: 'sand_trap',
    name: 'Sand Trap',
    description: 'Immobilize target for 2 turns.',
    cooldownTurns: 4,
    targetType: TargetType.SingleEnemy,
    costType: CostType.Mana,
    costAmount: 18,
    isUltimate: false,
    type: SkillType.Debuff,
    statusEffectsApplied: [{
        id: 'immobilize',
        name: 'Immobilize',
        type: StatusEffectType.Cc,
        duration: 2,
        value: 0,
        description: 'Immobilizes the target, preventing movement.'
    }]
};

export const arcaneShield: Skill = {
    id: 'arcane_shield',
    name: 'Arcane Shield',
    description: 'Absorb next incoming attack.',
    cooldownTurns: 3,
    targetType: TargetType.Self,
    costType: CostType.None,
    costAmount: 0,
    isUltimate: false,
    type: SkillType.Buff,
    statusEffectsApplied: [{
        id: 'absorb',
        name: 'Absorb',
        type: StatusEffectType.Buff,
        duration: 1,
        value: 1,
        description: 'Absorbs the next incoming attack completely.'
    }]
};

export const poisonCloud: Skill = {
    id: 'poison_cloud',
    name: 'Poison Cloud',
    description: 'Deal poison damage to all enemies over 2 turns.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 0.6 },
    cooldownTurns: 3,
    targetType: TargetType.AllEnemies,
    costType: CostType.Mana,
    costAmount: 20,
    isUltimate: false,
    type: SkillType.Attack,
    statusEffectsApplied: [{
        id: 'poison',
        name: 'Poison',
        type: StatusEffectType.Dot,
        duration: 2,
        value: 20,
        damageType: 'nature',
        description: 'Takes nature damage each turn.'
    }]
};

export const rally: Skill = {
    id: 'rally',
    name: 'Rally',
    description: 'Increase all allies’ attack for 2 turns.',
    cooldownTurns: 4,
    targetType: TargetType.AllAllies,
    costType: CostType.None,
    costAmount: 0,
    isUltimate: false,
    type: SkillType.Buff,
    statusEffectsApplied: [{
        id: 'attack_up',
        name: 'Attack Up',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 20,
        description: 'Increases attack power of all allies.'
    }]
};

export const quickDodge: Skill = {
    id: 'quick_dodge',
    name: 'Quick Dodge',
    description: 'Increase own evasion for 1 turn.',
    cooldownTurns: 2,
    targetType: TargetType.Self,
    costType: CostType.None,
    costAmount: 0,
    isUltimate: false,
    type: SkillType.Buff,
    statusEffectsApplied: [{
        id: 'evasion',
        name: 'Evasion',
        type: StatusEffectType.Buff,
        duration: 1,
        value: 0.3,
        description: 'Increases evasion, reducing chance to be hit.'
    }]
};

export const bloodFrenzy: Skill = {
    id: 'blood_frenzy',
    name: 'Blood Frenzy',
    description: 'Increase attack and lose HP each turn for 3 turns.',
    cooldownTurns: 5,
    targetType: TargetType.Self,
    costType: CostType.None,
    costAmount: 0,
    isUltimate: false,
    type: SkillType.Buff,
    statusEffectsApplied: [{
        id: 'attack_up',
        name: 'Attack Up',
        type: StatusEffectType.Buff,
        duration: 3,
        value: 30,
        description: 'Increases attack power significantly.'
    }]
};

export const thunderArrow: Skill = {
    id: 'thunder_arrow',
    name: 'Thunder Arrow',
    description: 'Deal lightning damage and apply paralysis.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.2 },
    cooldownTurns: 3,
    targetType: TargetType.SingleEnemy,
    costType: CostType.Mana,
    costAmount: 20,
    isUltimate: false,
    type: SkillType.Attack,
    statusEffectsApplied: [{
        id: 'paralyze',
        name: 'Paralyze',
        type: StatusEffectType.Cc,
        duration: 1,
        value: 0,
        description: 'Paralyzes the target, preventing action.'
    }]
};

export const drainingMist: Skill = {
    id: 'draining_mist',
    name: 'Draining Mist',
    description: 'Deal damage and reduce target healing for 2 turns.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 0.8 },
    cooldownTurns: 2,
    targetType: TargetType.SingleEnemy,
    costType: CostType.Mana,
    costAmount: 10,
    isUltimate: false,
    type: SkillType.Attack,
    statusEffectsApplied: [{
        id: 'heal_down',
        name: 'Reduce Healing',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: -20,
        description: 'Reduces the healing received by the target.'
    }]
};
