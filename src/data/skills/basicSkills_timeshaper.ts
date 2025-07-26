/*
import { CostType, Skill, SkillType, StatusEffectType, TargetType } from '../../types/skillTypes';

// Chronomancer/Timeshaper themed skills
export const haste: Skill = {
    id: 'haste',
    name: 'Haste',
    description: 'Increase speed of all allies for 2 turns.',
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 18,
    isUltimate: false,
    type: SkillType.Buff,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'speed_up',
        name: 'Speed Up',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 30,
        description: 'Increases speed.'
    }]
};

export const slowTime: Skill = {
    id: 'slow_time',
    name: 'Slow Time',
    description: 'Reduce speed of all enemies for 2 turns.',
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 18,
    isUltimate: false,
    type: SkillType.Debuff,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'slow',
        name: 'Slow',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: -30,
        description: 'Reduces speed.'
    }]
};

export const stopTime: Skill = {
    id: 'stop_time',
    name: 'Stop Time',
    description: 'Stun a single enemy for 1 turn (time stop).',
    cooldownTurns: 4,
    costType: CostType.Mana,
    costAmount: 20,
    isUltimate: false,
    type: SkillType.Debuff,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'stun',
        name: 'Stun',
        type: StatusEffectType.Cc,
        duration: 1,
        value: 1,
        description: 'Stuns the target.'
    }]
};

export const reverseTime: Skill = {
    id: 'reverse_time',
    name: 'Reverse Time',
    description: 'Heal an ally and remove all debuffs (rewind their state).',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.2 },
    cooldownTurns: 4,
    costType: CostType.Mana,
    costAmount: 22,
    isUltimate: false,
    type: SkillType.Heal,
    targetType: TargetType.SingleAlly,
    statusEffectsApplied: [{
        id: 'cleanse',
        name: 'Cleanse',
        type: StatusEffectType.Hot,
        duration: 1,
        value: 99,
        description: 'Removes all debuffs.'
    }]
};
*/

export {};
