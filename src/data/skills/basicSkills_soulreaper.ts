/*
import { CostType, Skill, SkillType, StatusEffectType, TargetType } from '../../types/skillTypes';

// Soulreaper/Death themed skills
export const soulDrain: Skill = {
    id: 'soul_drain',
    name: 'Soul Drain',
    description: 'Deal damage to a single enemy and heal self for half the damage.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.1 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 16,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'self_heal',
        name: 'Soul Heal',
        type: StatusEffectType.Hot,
        duration: 1,
        value: 0.5,
        description: 'Heals self for half the damage dealt.'
    }]
};

export const spiritShackle: Skill = {
    id: 'spirit_shackle',
    name: 'Spirit Shackle',
    description: 'Immobilize a single enemy for 2 turns (bind their soul).',
    cooldownTurns: 4,
    costType: CostType.Mana,
    costAmount: 18,
    isUltimate: false,
    type: SkillType.Debuff,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'immobilize',
        name: 'Soul Bind',
        type: StatusEffectType.Cc,
        duration: 2,
        value: 1,
        description: 'Immobilizes the target.'
    }]
};
*/

export {};
