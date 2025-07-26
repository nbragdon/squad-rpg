import { CostType, Skill, SkillType, StatusEffectType, TargetType } from '../../types/skillTypes';

// 10 unique basic skills (41-50)
export const burningBlade: Skill = {
    id: 'burning_blade',
    name: 'Burning Blade',
    description: 'Deal fire damage and apply Burn for 2 turns.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.2 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 14,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
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

export const chillingTouch: Skill = {
    id: 'chilling_touch',
    name: 'Chilling Touch',
    description: 'Deal cold damage and reduce target speed.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 12,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'slow_debuff',
        name: 'Slow',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: -10,
        description: 'Reduces target speed.'
    }]
};

export const venomousBite: Skill = {
    id: 'venomous_bite',
    name: 'Venomous Bite',
    description: 'Deal poison damage and apply Poison for 3 turns.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 0.9 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 10,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'poison_dot',
        name: 'Poison',
        type: StatusEffectType.Dot,
        duration: 3,
        value: 15,
        damageType: 'nature',
        description: 'Takes nature damage each turn.'
    }]
};

export const radiantSlash: Skill = {
    id: 'radiant_slash',
    name: 'Radiant Slash',
    description: 'Deal light damage and heal self for 20 HP.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.1 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 12,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'self_heal',
        name: 'Self Heal',
        type: StatusEffectType.Hot,
        duration: 1,
        value: 20,
        description: 'Heals the caster for a portion of the damage dealt.'
    }]
};

export const ironFist: Skill = {
    id: 'iron_fist',
    name: 'Iron Fist',
    description: 'Deal physical damage and increase own defense.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 10,
    isUltimate: false,
    type: SkillType.Buff,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'defense_up',
        name: 'Defense Up',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 20,
        description: 'Increases the caster\'s defense.'
    }]
};

export const quickSlash: Skill = {
    id: 'quick_slash',
    name: 'Quick Slash',
    description: 'Deal fast, low damage and gain extra turn chance.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 0.8 },
    cooldownTurns: 1,
    costType: CostType.Mana,
    costAmount: 8,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'extra_turn',
        name: 'Extra Turn',
        type: StatusEffectType.Buff,
        duration: 1,
        value: 0.15,
        description: 'Grants a chance to gain an extra turn.'
    }]
};

export const sandstorm: Skill = {
    id: 'sandstorm',
    name: 'Sandstorm',
    description: 'Deal earth damage and blind target for 1 turn.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 12,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'blind_debuff',
        name: 'Blind',
        type: StatusEffectType.Debuff,
        duration: 1,
        value: -25,
        description: 'Increases the chance to miss attacks.'
    }]
};

export const bloodPact: Skill = {
    id: 'blood_pact',
    name: 'Blood Pact',
    description: 'Sacrifice HP to increase attack for 2 turns.',
    cooldownTurns: 3,
    costType: CostType.None,
    costAmount: 0,
    isUltimate: false,
    type: SkillType.Buff,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'self_damage',
        name: 'Self Damage',
        type: StatusEffectType.Debuff,
        duration: 1,
        value: 30,
        description: 'Sacrifices a portion of health to power up.'
    }]
};

export const thunderStrike: Skill = {
    id: 'thunder_strike',
    name: 'Thunder Strike',
    description: 'Deal lightning damage and stun for 1 turn.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.3 },
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 18,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'stun_effect',
        name: 'Stun',
        type: StatusEffectType.Cc,
        duration: 1,
        value: 1,
        description: 'Prevents the target from taking actions.'
    }]
};

export const drainingArrow: Skill = {
    id: 'draining_arrow',
    name: 'Draining Arrow',
    description: 'Deal damage and heal self for 25% of damage dealt.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 0.9 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 10,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'lifesteal',
        name: 'Lifesteal',
        type: StatusEffectType.Hot,
        duration: 1,
        value: 0.25,
        description: 'Heals for a percentage of damage dealt.'
    }]
};
