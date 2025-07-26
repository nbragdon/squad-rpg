/*
import { CostType, Skill, SkillType, StatusEffectType, TargetType } from '../../types/skillTypes';

// Starcaller/Cosmic themed skills
export const cosmicRay: Skill = {
    id: 'cosmic_ray',
    name: 'Cosmic Ray',
    description: 'Deal cosmic damage to a single enemy and reduce their magic defense.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.3 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 18,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'magic_def_down',
        name: 'Magic Defense Down',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: -20,
        description: 'Reduces magic defense.'
    }]
};

export const stardustShield: Skill = {
    id: 'stardust_shield',
    name: 'Stardust Shield',
    description: 'Grant a shield to all allies that absorbs cosmic damage.',
    cooldownTurns: 4,
    costType: CostType.Mana,
    costAmount: 22,
    isUltimate: false,
    type: SkillType.Buff,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'cosmic_shield',
        name: 'Cosmic Shield',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 60,
        description: 'Absorbs cosmic damage.'
    }]
};
*/

export {};
