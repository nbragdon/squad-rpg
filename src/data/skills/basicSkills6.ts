/*
import { CostType, Skill, SkillType, StatusEffectType, TargetType } from '../../types/skillTypes';

// Unique skills for Uncommon and Rare characters
export const emberBurst: Skill = {
    id: 'ember_burst',
    name: 'Ember Burst',
    description: 'Deal fire damage and apply Burn for 1 turn.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.1 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 14,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'burn',
        name: 'Burn',
        type: StatusEffectType.Dot,
        duration: 1,
        value: 15,
        damageType: 'fire',
        description: 'Deals fire damage over time.'
    }]
};

export const glacialPrison: Skill = {
    id: 'glacial_prison',
    name: 'Glacial Prison',
    description: 'Freeze a single enemy for 1 turn.',
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 16,
    isUltimate: false,
    type: SkillType.Debuff,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'freeze',
        name: 'Freeze',
        type: StatusEffectType.Cc,
        duration: 1,
        value: 1,
        description: 'Prevents actions.'
    }]
};

export const sunbeam: Skill = {
    id: 'sunbeam',
    name: 'Sunbeam',
    description: 'Heal an ally and grant them regen for 2 turns.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 0.8 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 14,
    isUltimate: false,
    type: SkillType.Heal,
    targetType: TargetType.SingleAlly,
    statusEffectsApplied: [{
        id: 'regen',
        name: 'Regen',
        type: StatusEffectType.Hot,
        duration: 2,
        value: 20,
        description: 'Heals over time.'
    }]
};

export const moonveil: Skill = {
    id: 'moonveil',
    name: 'Moonveil',
    description: 'Shield an ally and increase their evasion for 2 turns.',
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 16,
    isUltimate: false,
    type: SkillType.Buff,
    targetType: TargetType.SingleAlly,
    statusEffectsApplied: [{
        id: 'evasion',
        name: 'Evasion',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 0.2,
        description: 'Increases evasion.'
    }]
};

export const shadowStrike: Skill = {
    id: 'shadow_strike',
    name: 'Shadow Strike',
    description: 'Deal dark damage and reduce target accuracy.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.0 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 12,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'blind',
        name: 'Blind',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: -15,
        description: 'Reduces accuracy.'
    }]
};

export const nightBlade: Skill = {
    id: 'night_blade',
    name: 'Night Blade',
    description: 'Deal damage and gain stealth for 1 turn.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 0.9 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 10,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'stealth',
        name: 'Stealth',
        type: StatusEffectType.Buff,
        duration: 1,
        value: 1,
        description: 'Grants stealth.'
    }]
};

export const steelWall: Skill = {
    id: 'steel_wall',
    name: 'Steel Wall',
    description: 'Increase own defense and taunt all enemies for 1 turn.',
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 10,
    isUltimate: false,
    type: SkillType.Buff,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'taunt',
        name: 'Taunt',
        type: StatusEffectType.Cc,
        duration: 1,
        value: 1,
        description: 'Taunts all enemies.'
    }]
};

export const frostGuard: Skill = {
    id: 'frost_guard',
    name: 'Frost Guard',
    description: 'Reduce damage taken and apply Chill to attackers.',
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 12,
    isUltimate: false,
    type: SkillType.Buff,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'chill_retaliate',
        name: 'Chill Retaliate',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: -10,
        description: 'Applies chill to attackers.'
    }]
};

// Fix invalid StatusEffectType enums in basicSkills6.ts
// Replace StatusEffectType.Control with StatusEffectType.Cc
// Replace StatusEffectType.Heal with StatusEffectType.Hot
*/

export {};
