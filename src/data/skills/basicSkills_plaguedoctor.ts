/*
import { CostType, Skill, SkillType, StatusEffectType, TargetType } from '../../types/skillTypes';

// Plague Doctor themed skills
export const virulentTouch: Skill = {
    id: 'virulent_touch',
    name: 'Virulent Touch',
    description: 'Deal poison damage and apply Plague for 2 turns.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.0 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 14,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'plague',
        name: 'Plague',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: 20,
        description: 'Applies Plague (poison damage over time).'
    }]
};

export const epidemic: Skill = {
    id: 'epidemic',
    name: 'Epidemic',
    description: 'Spread all debuffs from one enemy to all enemies.',
    cooldownTurns: 4,
    costType: CostType.Mana,
    costAmount: 20,
    isUltimate: false,
    type: SkillType.Utility,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'spread_debuffs',
        name: 'Spread Debuffs',
        type: StatusEffectType.Debuff,
        duration: 1,
        value: 1,
        description: 'Spreads all debuffs from one enemy to all enemies.'
    }]
};
*/
export {};
