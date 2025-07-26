// Enums for fixed string sets
export enum StatusEffectType {
    Buff = 'buff',
    Debuff = 'debuff',
    Dot = 'dot',
    Hot = 'hot',
    Cc = 'cc',
    Passive = 'passive'
}

export enum SkillType {
    Attack = 'attack',
    Heal = 'heal',
    Buff = 'buff',
    Debuff = 'debuff',
    Utility = 'utility',
    Movement = 'movement',
    AoeAttack = 'aoe_attack',
    AoeHeal = 'aoe_heal',
    Passive = 'passive',
    Ultimate = 'ultimate'
}

export enum TargetType {
    Self = 'self',
    SingleAlly = 'singleAlly',
    AllAllies = 'allAllies',
    SingleEnemy = 'singleEnemy',
    AllEnemies = 'allEnemies',
    SpecificType = 'specificType'
}

export enum ModifierType {
    Flat = 'flat',
    Percentage = 'percentage'
}

export enum EffectTrigger {
    OnTurnStart = 'onTurnStart',
    OnTurnEnd = 'onTurnEnd',
    OnHit = 'onHit',
    OnTakeDamage = 'onTakeDamage',
    OnAbilityUse = 'onAbilityUse'
}

export enum CostType {
    Mana = 'mana',
    Energy = 'energy',
    Rage = 'rage',
    Hp = 'hp',
    None = 'none'
}

// Type-safe damage calculation structure
export type DamageCalc =
    | { type: 'stat'; stat: string; multiplier: number }
    | { type: 'average'; stats: string[]; multiplier: number };

export interface StatusEffect {
    id: string;
    name: string;
    description?: string;
    type: StatusEffectType;
    duration: number;
    value?: number;
    valueCalc?: DamageCalc;
    targetStat?: string;
    modifierType?: ModifierType;
    damageType?: string;
    effectTrigger?: EffectTrigger;
    isStackable?: boolean;
    isRemovable?: boolean;
    preventsActions?: boolean;
    preventsMovement?: boolean;
    statusEffectLevelScaling?: number;
}

export interface Skill {
    id: string;
    name: string;
    description: string;
    type: SkillType;
    damageCalc?: DamageCalc;
    damageType?: string;
    targetType: TargetType;
    costType?: CostType;
    costAmount?: number;
    cooldownTurns?: number;
    statusEffectsApplied?: StatusEffect[];
    isUltimate?: boolean;
    levelScaling?: number;
    aiTargetingPriority?: string;
}
