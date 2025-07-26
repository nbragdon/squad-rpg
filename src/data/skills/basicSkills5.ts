import { CostType, Skill, SkillType, StatusEffectType, TargetType } from '../../types/skillTypes';

// Unique skills for legendary/epic/rare characters
export const astralNova: Skill = {
    id: 'astral_nova',
    name: 'Astral Nova',
    description: 'Deal massive cosmic damage to all enemies and reduce their attack.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 2.0 },
    cooldownTurns: 4,
    costType: CostType.Mana,
    costAmount: 28,
    isUltimate: false,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'attack_down',
        name: 'Attack Down',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: -25,
        description: 'Reduces attack.'
    }]
};

export const voidPulse: Skill = {
    id: 'void_pulse',
    name: 'Void Pulse',
    description: 'Deal void damage to a single enemy and silence them for 1 turn.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.5 },
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 20,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'silence',
        name: 'Silence',
        type: StatusEffectType.Debuff,
        duration: 1,
        value: 1,
        description: 'Prevents skill usage.'
    }]
};

export const soulRend: Skill = {
    id: 'soul_rend',
    name: 'Soul Rend',
    description: 'Deal damage and apply Fear to a single enemy (chance to skip turn).',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.3 },
    cooldownTurns: 3,
    costType: CostType.Mana,
    costAmount: 18,
    isUltimate: false,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'fear',
        name: 'Fear',
        type: StatusEffectType.Cc,
        duration: 2,
        value: 0.3,
        description: 'Chance to skip turn.'
    }]
};

export const miasmaCloud: Skill = {
    id: 'miasma_cloud',
    name: 'Miasma Cloud',
    description: 'Poison all enemies and reduce their healing for 2 turns.',
    cooldownTurns: 4,
    costType: CostType.Mana,
    costAmount: 22,
    isUltimate: false,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'heal_down',
        name: 'Heal Down',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: -30,
        description: 'Reduces healing received.'
    }]
};

export const timeLoop: Skill = {
    id: 'time_loop',
    name: 'Time Loop',
    description: 'Repeat the last skill used by this character.',
    cooldownTurns: 5,
    costType: CostType.Mana,
    costAmount: 25,
    isUltimate: false,
    type: SkillType.Utility,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'repeat_skill',
        name: 'Repeat Skill',
        type: StatusEffectType.Buff,
        duration: 1,
        value: 1,
        description: 'Repeats last skill.'
    }]
};
