import { CostType, Skill, SkillType, StatusEffectType, TargetType } from '../../types/skillTypes';

// 20 new unique basic skills (51-70)
export const arcaneVolley: Skill = {
    id: 'arcane_volley',
    name: 'Arcane Volley',
    description: 'Deal magic damage to all enemies.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.0 },
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 22,
    isUltimate: false,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: []
};

export const healingChant: Skill = {
    id: 'healing_chant',
    name: 'Healing Chant',
    description: 'Heal all allies for a small amount.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 0.8 },
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 20,
    isUltimate: false,
    type: SkillType.AoeHeal,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'group_heal',
        name: 'Group Heal',
        type: StatusEffectType.Hot,
        duration: 1,
        value: 60,
        description: 'Heals all allies.'
    }]
};

export const shieldWall: Skill = {
    id: 'shield_wall',
    name: 'Shield Wall',
    description: 'Increase defense of all allies for 2 turns.',
    cooldownTurns: 4,
    costType: CostType.Mana,
    costAmount: 18,
    isUltimate: false,
    type: SkillType.Buff,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'defense_up',
        name: 'Defense Up',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 25,
        description: 'Increases defense.'
    }]
};

export const doubleStrike: Skill = {
    id: 'double_strike',
    name: 'Double Strike',
    description: 'Attack a single enemy twice.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.2 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 12,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: []
};

export const chainLightning: Skill = {
    id: 'chain_lightning',
    name: 'Chain Lightning',
    description: 'Deal lightning damage to 2 random enemies.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.2 },
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 18,
    isUltimate: false,
    type: SkillType.AoeAttack,
    targetType: TargetType.SpecificType,
    statusEffectsApplied: []
};

export const rally: Skill = {
    id: 'rally',
    name: 'Rally',
    description: 'Increase attack of all allies for 2 turns.',
    cooldownTurns: 4,
    costType: CostType.Mana,
    costAmount: 18,
    isUltimate: false,
    type: SkillType.Buff,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'attack_up',
        name: 'Attack Up',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 20,
        description: 'Increases attack.'
    }]
};

export const shadowVeil: Skill = {
    id: 'shadow_veil',
    name: 'Shadow Veil',
    description: 'Increase evasion of self for 2 turns.',
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 10,
    isUltimate: false,
    type: SkillType.Buff,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'evasion',
        name: 'Evasion',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 0.3,
        description: 'Increases evasion.'
    }]
};

export const poisonCloud: Skill = {
    id: 'poison_cloud',
    name: 'Poison Cloud',
    description: 'Poison all enemies for 2 turns.',
    cooldownTurns: 4,
    costType: CostType.Mana,
    costAmount: 20,
    isUltimate: false,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'poison',
        name: 'Poison',
        type: StatusEffectType.Dot,
        duration: 2,
        value: 15,
        damageType: 'nature',
        description: 'Deals poison damage over time.'
    }]
};

export const manaSurge: Skill = {
    id: 'mana_surge',
    name: 'Mana Surge',
    description: 'Restore mana to self and one ally.',
    cooldownTurns: 3,
    costType: CostType.None,
    costAmount: 0,
    isUltimate: false,
    type: SkillType.Utility,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'mana_restore',
        name: 'Mana Restore',
        type: StatusEffectType.Buff,
        duration: 1,
        value: 25,
        description: 'Restores mana.'
    }]
};

export const piercingArrow: Skill = {
    id: 'piercing_arrow',
    name: 'Piercing Arrow',
    description: 'Deal damage to a single enemy and ignore defense.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.1 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 16,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'ignore_defense',
        name: 'Ignore Defense',
        type: StatusEffectType.Buff,
        duration: 1,
        value: 1,
        description: 'Ignores defense.'
    }]
};

export const groupHeal: Skill = {
    id: 'group_heal',
    name: 'Group Heal',
    description: 'Heal two random allies.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 0.7 },
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 18,
    isUltimate: false,
    type: SkillType.AoeHeal,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'group_heal_hot',
        name: 'Group Heal',
        type: StatusEffectType.Hot,
        duration: 1,
        value: 80,
        description: 'Heals two random allies.'
    }]
};

export const enrage: Skill = {
    id: 'enrage',
    name: 'Enrage',
    description: 'Increase own attack and lower own defense for 2 turns.',
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 8,
    isUltimate: false,
    type: SkillType.Buff,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'attack_up_defense_down',
        name: 'Enrage',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 25,
        description: 'Increase attack, lower defense.'
    }]
};

export const frostArmor: Skill = {
    id: 'frost_armor',
    name: 'Frost Armor',
    description: 'Increase own defense and apply Chill to attackers.',
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 12,
    isUltimate: false,
    type: SkillType.Buff,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'chill_retaliate',
        name: 'Chill Retaliate',
        type: StatusEffectType.Buff,
        duration: 2,
        value: -10,
        description: 'Chill attackers.'
    }]
};

export const blindingLight: Skill = {
    id: 'blinding_light',
    name: 'Blinding Light',
    description: 'Blind all enemies for 1 turn.',
    cooldownTurns: 4,
    costType: CostType.Mana,
    costAmount: 20,
    isUltimate: false,
    type: SkillType.Debuff,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'blind',
        name: 'Blind',
        type: StatusEffectType.Debuff,
        duration: 1,
        value: -30,
        description: 'Blinds all enemies.'
    }]
};

export const vampiricTouch: Skill = {
    id: 'vampiric_touch',
    name: 'Vampiric Touch',
    description: 'Deal damage to a single enemy and heal self for half the damage.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 0.9 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 14,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'lifesteal',
        name: 'Lifesteal',
        type: StatusEffectType.Hot,
        duration: 1,
        value: 0.5,
        description: 'Heals self for half damage dealt.'
    }]
};

export const taunt: Skill = {
    id: 'taunt',
    name: 'Taunt',
    description: 'Force a single enemy to target you for 2 turns.',
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 8,
    isUltimate: false,
    type: SkillType.Debuff,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'taunt',
        name: 'Taunt',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: 1,
        description: 'Forces target to attack you.'
    }]
};

export const dispel: Skill = {
    id: 'dispel',
    name: 'Dispel',
    description: 'Remove all buffs from a single enemy.',
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 12,
    isUltimate: false,
    type: SkillType.Utility,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'slow',
        name: 'Slow',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: -10,
        description: 'Removes all buffs and slows.'
    }]
};
