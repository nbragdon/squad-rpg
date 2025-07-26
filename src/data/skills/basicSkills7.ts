/*
import { CostType, Skill, SkillType, StatusEffectType, TargetType } from '../../types/skillTypes';

// Unique skills for Rare characters
export const steelBreaker: Skill = {
    id: 'steel_breaker',
    name: 'Steel Breaker',
    description: 'Deal heavy physical damage and reduce target defense.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.5 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 16,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'defense_down',
        name: 'Defense Down',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: -20,
        description: 'Reduces defense.'
    }]
};

export const frostGuardAura: Skill = {
    id: 'frost_guard_aura',
    name: 'Frost Guard Aura',
    description: 'Reduce damage taken by all allies and apply Chill to attackers.',
    cooldownTurns: 4,
    costType: CostType.Mana,
    costAmount: 18,
    isUltimate: false,
    type: SkillType.Buff,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'chill_retaliate',
        name: 'Chill Retaliate',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: -10,
        description: 'Applies chill to attackers.'
    }]
};

export const pyreBlast: Skill = {
    id: 'pyre_blast',
    name: 'Pyre Blast',
    description: 'Deal fire damage to all enemies.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.0 },
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 22,
    isUltimate: false,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: []
};

export const cryoSpike: Skill = {
    id: 'cryo_spike',
    name: 'Cryo Spike',
    description: 'Deal ice damage and freeze a single enemy for 1 turn.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.2 },
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 16,
    isUltimate: false,
    type: SkillType.Attack,
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

export const radiantWard: Skill = {
    id: 'radiant_ward',
    name: 'Radiant Ward',
    description: 'Shield all allies and heal them for a small amount.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 0.5 },
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 18,
    isUltimate: false,
    type: SkillType.AoeHeal,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'shield',
        name: 'Shield',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 30,
        description: 'Shields and heals allies.'
    }]
};

export const shadowHeal: Skill = {
    id: 'shadow_heal',
    name: 'Shadow Heal',
    description: 'Heal self and gain evasion for 1 turn.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 0.7 },
    cooldownTurns: 2,
    costType: CostType.Mana,
    costAmount: 12,
    isUltimate: false,
    type: SkillType.Heal,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'evasion',
        name: 'Evasion',
        type: StatusEffectType.Buff,
        duration: 1,
        value: 0.2,
        description: 'Increases evasion.'
    }]
};
*/

export {};
