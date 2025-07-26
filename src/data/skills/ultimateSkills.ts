/*import { CostType, Skill, SkillType, StatusEffectType, TargetType } from '../../types/skillTypes';

// 80 unique ultimate skills (one for each character)
export const meteorStorm: Skill = {
    id: 'meteor_storm',
    name: 'Meteor Storm',
    description: 'Ultimate: Massive fire damage to all enemies and Burn.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 3.0 },
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 60,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'burn',
        name: 'Burn',
        type: StatusEffectType.Dot,
        duration: 2,
        value: 40,
        damageType: 'fire',
        description: 'Deals fire damage over time.'
    }]
};

export const frostNova: Skill = {
    id: 'frost_nova',
    name: 'Frost Nova',
    description: 'Ultimate: Freeze all enemies (skip turn) and deal damage.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.5 },
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 60,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'freeze',
        name: 'Freeze',
        type: StatusEffectType.Cc,
        duration: 1,
        value: 1,
        description: 'Prevents actions.'
    }]
};

export const phoenixRebirth: Skill = {
    id: 'phoenix_rebirth',
    name: 'Phoenix Rebirth',
    description: 'Ultimate: Revive self with 50% HP after death (delayed effect).',
    cooldownTurns: 8,
    costType: CostType.None,
    costAmount: 0,
    isUltimate: true,
    type: SkillType.Utility,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'revive',
        name: 'Revive',
        type: StatusEffectType.Buff,
        duration: 1,
        value: 0.5,
        description: 'Revives with 50% HP.'
    }]
};

export const divineLight: Skill = {
    id: 'divine_light',
    name: 'Divine Light',
    description: 'Ultimate: Heal all allies and remove debuffs.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 2.0 },
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 100,
    isUltimate: true,
    type: SkillType.AoeHeal,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'cleanse',
        name: 'Cleanse',
        type: StatusEffectType.Buff,
        duration: 1,
        value: 1,
        description: 'Removes debuffs.'
    }]
};

export const heroicCharge: Skill = {
    id: 'heroic_charge',
    name: 'Heroic Charge',
    description: 'Ultimate: Charge through enemies dealing massive damage.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 3.5 },
    cooldownTurns: 5,
    costType: CostType.Mana,
    costAmount: 80,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'stun',
        name: 'Stun',
        type: StatusEffectType.Cc,
        duration: 1,
        value: 1,
        description: 'Prevents actions.'
    }]
};

export const shadowClone: Skill = {
    id: 'shadow_clone',
    name: 'Shadow Clone',
    description: 'Ultimate: Create shadow clones to confuse and attack enemies.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 2.8 },
    cooldownTurns: 5,
    costType: CostType.Mana,
    costAmount: 90,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'confuse',
        name: 'Confuse',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: 1,
        description: 'Confuses enemies.'
    }]
};

export const thunderGodsWrath: Skill = {
    id: 'thunder_gods_wrath',
    name: 'Thunder God\'s Wrath',
    description: 'Ultimate: Strikes all enemies with lightning, paralyzing them.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 2.6 },
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 85,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'paralyze',
        name: 'Paralyze',
        type: StatusEffectType.Cc,
        duration: 2,
        value: 1,
        description: 'Paralyzes enemies.'
    }]
};

export const abyssalGrasp: Skill = {
    id: 'abyssal_grasp',
    name: 'Abyssal Grasp',
    description: 'Ultimate: Drains HP from all enemies and applies Curse.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.8 },
    cooldownTurns: 7,
    costType: CostType.Mana,
    costAmount: 90,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'curse',
        name: 'Curse',
        type: StatusEffectType.Debuff,
        duration: 3,
        value: 30,
        description: 'Applies curse.'
    }]
};

export const celestialBarrier: Skill = {
    id: 'celestial_barrier',
    name: 'Celestial Barrier',
    description: 'Ultimate: Grants a shield to all allies and boosts defense.',
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 80,
    isUltimate: true,
    type: SkillType.Buff,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'defense_up',
        name: 'Defense Up',
        type: StatusEffectType.Buff,
        duration: 3,
        value: 50,
        description: 'Boosts defense.'
    }]
};

export const dragonRoar: Skill = {
    id: 'dragon_roar',
    name: 'Dragon Roar',
    description: 'Ultimate: Terrifies all enemies, lowering their attack.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.2 },
    cooldownTurns: 5,
    costType: CostType.Mana,
    costAmount: 70,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'attack_down',
        name: 'Attack Down',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: 40,
        description: 'Lowers attack.'
    }]
};

export const timeWarp: Skill = {
    id: 'time_warp',
    name: 'Time Warp',
    description: 'Ultimate: Skips the next turn for all enemies (AoE).',
    cooldownTurns: 7,
    costType: CostType.Mana,
    costAmount: 100,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'skip_turn',
        name: 'Skip Turn',
        type: StatusEffectType.Cc,
        duration: 1,
        value: 1,
        description: 'Skips next turn.'
    }]
};

export const bloodMoon: Skill = {
    id: 'blood_moon',
    name: 'Blood Moon',
    description: 'Ultimate: All allies gain lifesteal for 2 turns (multi-target buff).',
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 90,
    isUltimate: true,
    type: SkillType.Buff,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'lifesteal',
        name: 'Lifesteal',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 0.3,
        description: 'Grants lifesteal.'
    }]
};

export const ironWill: Skill = {
    id: 'iron_will',
    name: 'Iron Will',
    description: 'Ultimate: Grants immunity to debuffs for 2 turns (self-buff).',
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 80,
    isUltimate: true,
    type: SkillType.Utility,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'immunity',
        name: 'Immunity',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 1,
        description: 'Grants immunity to debuffs.'
    }]
};

export const arcaneCataclysm: Skill = {
    id: 'arcane_cataclysm',
    name: 'Arcane Cataclysm',
    description: 'Ultimate: Deals massive magic damage and silences all enemies (AoE).',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 3.2 },
    cooldownTurns: 7,
    costType: CostType.Mana,
    costAmount: 110,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'silence',
        name: 'Silence',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: 1,
        description: 'Silences all enemies.'
    }]
};

export const spiritLink: Skill = {
    id: 'spirit_link',
    name: 'Spirit Link',
    description: 'Ultimate: Shares damage among all allies for 2 turns (multi-target buff).',
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 75,
    isUltimate: true,
    type: SkillType.Buff,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'damage_share',
        name: 'Damage Share',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 1,
        description: 'Shares damage among allies.'
    }]
};

export const infernalChains: Skill = {
    id: 'infernal_chains',
    name: 'Infernal Chains',
    description: 'Ultimate: Binds all enemies, reducing their speed (AoE debuff).',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.0 },
    cooldownTurns: 5,
    costType: CostType.Mana,
    costAmount: 70,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'speed_down',
        name: 'Speed Down',
        type: StatusEffectType.Debuff,
        duration: 3,
        value: 40,
        description: 'Reduces speed.'
    }]
};

export const radiantGrace: Skill = {
    id: 'radiant_grace',
    name: 'Radiant Grace',
    description: 'Ultimate: Heals and grants regen to all allies (multi-target heal).',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.0 },
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 85,
    isUltimate: true,
    type: SkillType.AoeHeal,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'regen',
        name: 'Regen',
        type: StatusEffectType.Hot,
        duration: 3,
        value: 50,
        description: 'Grants regen.'
    }]
};

export const voidCollapse: Skill = {
    id: 'void_collapse',
    name: 'Void Collapse',
    description: 'Ultimate: Deals void damage and applies weaken to all enemies (AoE debuff).',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 2.7 },
    cooldownTurns: 7,
    costType: CostType.Mana,
    costAmount: 95,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'weaken',
        name: 'Weaken',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: 30,
        description: 'Applies weaken.'
    }]
};

export const primalRage: Skill = {
    id: 'primal_rage',
    name: 'Primal Rage',
    description: 'Ultimate: Boosts own attack and speed for 3 turns (self-buff).',
    cooldownTurns: 5,
    costType: CostType.Mana,
    costAmount: 60,
    isUltimate: true,
    type: SkillType.Buff,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'attack_speed_up',
        name: 'Attack/Speed Up',
        type: StatusEffectType.Buff,
        duration: 3,
        value: 40,
        description: 'Boosts attack and speed.'
    }]
};

export const warriorFury: Skill = {
    id: 'warrior_fury',
    name: 'Warrior Fury',
    description: 'Ultimate: Single-target. Unleash a devastating blow, dealing massive damage and stunning the enemy.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 4.0 },
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 90,
    isUltimate: true,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'stun',
        name: 'Stun',
        type: StatusEffectType.Cc,
        duration: 1,
        value: 1,
        description: 'Stuns the enemy.'
    }]
};

export const rogueAmbush: Skill = {
    id: 'rogue_ambush',
    name: 'Rogue Ambush',
    description: 'Ultimate: Single-target. Strike from the shadows for high damage and guaranteed critical hit (bleed).',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 3.5 },
    cooldownTurns: 5,
    costType: CostType.Mana,
    costAmount: 80,
    isUltimate: true,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'bleed',
        name: 'Bleed',
        type: StatusEffectType.Dot,
        duration: 3,
        value: 40,
        damageType: 'physical',
        description: 'Applies bleed.'
    }]
};

export const wizardCataclysm: Skill = {
    id: 'wizard_cataclysm',
    name: 'Wizard Cataclysm',
    description: 'Ultimate: AoE. Rain arcane destruction on all enemies, burning and reducing their magic defense.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 2.6 },
    cooldownTurns: 7,
    costType: CostType.Mana,
    costAmount: 110,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'burn_magic_def_down',
        name: 'Burn & Magic Def Down',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: 30,
        description: 'Burns and reduces magic defense.'
    }]
};

export const clericSanctuary: Skill = {
    id: 'cleric_sanctuary',
    name: 'Cleric Sanctuary',
    description: 'Ultimate: Multi-target. Heal all allies and grant immunity to debuffs for 1 turn.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 2.2 },
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 100,
    isUltimate: true,
    type: SkillType.AoeHeal,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'immunity',
        name: 'Immunity',
        type: StatusEffectType.Buff,
        duration: 1,
        value: 1,
        description: 'Grants immunity to debuffs.'
    }]
};

export const paladinJudgment: Skill = {
    id: 'paladin_judgment',
    name: 'Paladin Judgment',
    description: 'Ultimate: Single-target. Smite an enemy for holy damage and reduce their attack.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 3.2 },
    cooldownTurns: 5,
    costType: CostType.Mana,
    costAmount: 85,
    isUltimate: true,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'attack_down',
        name: 'Attack Down',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: 30,
        description: 'Reduces attack.'
    }]
};

export const hunterVolley: Skill = {
    id: 'hunter_volley',
    name: 'Hunter Volley',
    description: 'Ultimate: Multi-target. Fire a volley of arrows, damaging up to 3 enemies and applying poison.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.8 },
    cooldownTurns: 5,
    costType: CostType.Mana,
    costAmount: 70,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.SpecificType,
    statusEffectsApplied: [{
        id: 'poison',
        name: 'Poison',
        type: StatusEffectType.Dot,
        duration: 2,
        value: 25,
        damageType: 'nature',
        description: 'Applies poison.'
    }]
};

export const berserkerRampage: Skill = {
    id: 'berserker_rampage',
    name: 'Berserker Rampage',
    description: 'Ultimate: Self. Enter a rampage, greatly boosting attack and speed but lowering defense.',
    cooldownTurns: 4,
    costType: CostType.Mana,
    costAmount: 60,
    isUltimate: true,
    type: SkillType.Buff,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'attack_speed_up_defense_down',
        name: 'Attack/Speed Up & Defense Down',
        type: StatusEffectType.Buff,
        duration: 3,
        value: 50,
        description: 'Boosts attack/speed, lowers defense.'
    }]
};

export const bardEncore: Skill = {
    id: 'bard_encore',
    name: 'Bard Encore',
    description: 'Ultimate: Multi-target. Restore energy to all allies and grant regen.',
    cooldownTurns: 6,
    costType: CostType.None,
    costAmount: 0,
    isUltimate: true,
    type: SkillType.Buff,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'energy_regen',
        name: 'Energy Regen',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 30,
        description: 'Restores energy and grants regen.'
    }]
};

export const monkTranquility: Skill = {
    id: 'monk_tranquility',
    name: 'Monk Tranquility',
    description: 'Ultimate: Self. Heal self and gain evasion for 2 turns.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.8 },
    cooldownTurns: 5,
    costType: CostType.Mana,
    costAmount: 50,
    isUltimate: true,
    type: SkillType.Heal,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'evasion',
        name: 'Evasion',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 1,
        description: 'Grants evasion.'
    }]
};

export const druidWildGrowth: Skill = {
    id: 'druid_wild_growth',
    name: 'Druid Wild Growth',
    description: 'Ultimate: Multi-target. Heal all allies over time and boost their defense.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.0 },
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 90,
    isUltimate: true,
    type: SkillType.AoeHeal,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'regen_defense_up',
        name: 'Regen & Defense Up',
        type: StatusEffectType.Buff,
        duration: 3,
        value: 25,
        description: 'Heals and boosts defense.'
    }]
};

export const necromancerSoulHarvest: Skill = {
    id: 'necromancer_soul_harvest',
    name: 'Necromancer Soul Harvest',
    description: 'Ultimate: AoE. Drain life from all enemies and heal self for a portion of the damage dealt.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.6 },
    cooldownTurns: 7,
    costType: CostType.Mana,
    costAmount: 100,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'drain',
        name: 'Drain',
        type: StatusEffectType.Debuff,
        duration: 1,
        value: 0.5,
        description: 'Drains HP and heals self.'
    }]
};

export const witchHexstorm: Skill = {
    id: 'witch_hexstorm',
    name: 'Witch Hexstorm',
    description: 'Ultimate: Multi-target. Curse up to 3 enemies, reducing their attack and defense.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 0.9 },
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 80,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.SpecificType,
    statusEffectsApplied: [{
        id: 'curse',
        name: 'Curse',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: 25,
        description: 'Reduces attack and defense.'
    }]
};

export const martialArtistDragonKick: Skill = {
    id: 'martial_artist_dragon_kick',
    name: 'Martial Artist Dragon Kick',
    description: 'Ultimate: Single-target. Deliver a powerful kick, dealing high damage and knocking the enemy back.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 3.4 },
    cooldownTurns: 5,
    costType: CostType.Mana,
    costAmount: 70,
    isUltimate: true,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'knockback',
        name: 'Knockback',
        type: StatusEffectType.Cc,
        duration: 1,
        value: 1,
        description: 'Knocks the enemy back.'
    }]
};

export const trapperSnareField: Skill = {
    id: 'trapper_snare_field',
    name: 'Trapper Snare Field',
    description: 'Ultimate: Multi-target. Trap up to 3 enemies, rooting them in place and dealing damage over time.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 0.6 },
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 75,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.SpecificType,
    statusEffectsApplied: [{
        id: 'root',
        name: 'Root',
        type: StatusEffectType.Cc,
        duration: 2,
        value: 1,
        description: 'Roots and deals damage over time.'
    }]
};

export const lichFrozenTomb: Skill = {
    id: 'lich_frozen_tomb',
    name: 'Lich Frozen Tomb',
    description: 'Ultimate: AoE. Freeze all enemies for 1 turn and deal ice damage.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.4 },
    cooldownTurns: 7,
    costType: CostType.Mana,
    costAmount: 110,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'freeze',
        name: 'Freeze',
        type: StatusEffectType.Cc,
        duration: 1,
        value: 1,
        description: 'Freezes all enemies.'
    }]
};

export const spellbladeArcaneEdge: Skill = {
    id: 'spellblade_arcane_edge',
    name: 'Spellblade Arcane Edge',
    description: 'Ultimate: Single-target. Strike with a blade of pure magic, dealing high damage and silencing the enemy.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 3.2 },
    cooldownTurns: 5,
    costType: CostType.Mana,
    costAmount: 90,
    isUltimate: true,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'silence',
        name: 'Silence',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: 1,
        description: 'Silences the enemy.'
    }]
};

export const shadowdancerNightfall: Skill = {
    id: 'shadowdancer_nightfall',
    name: 'Shadowdancer Nightfall',
    description: 'Ultimate: Multi-target. Attack up to 3 enemies, blinding them and reducing their accuracy.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.2 },
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 80,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.SpecificType,
    statusEffectsApplied: [{
        id: 'blind',
        name: 'Blind',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: 1,
        description: 'Blinds and reduces accuracy.'
    }]
};

export const illusionistMirageArmy: Skill = {
    id: 'illusionist_mirage_army',
    name: 'Illusionist Mirage Army',
    description: 'Ultimate: AoE. Summon illusions to attack all enemies and confuse them.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.1 },
    cooldownTurns: 7,
    costType: CostType.Mana,
    costAmount: 100,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'confuse',
        name: 'Confuse',
        type: StatusEffectType.Debuff,
        duration: 2,
        value: 1,
        description: 'Confuses all enemies.'
    }]
};

export const beastmasterPrimalCall: Skill = {
    id: 'beastmaster_primal_call',
    name: 'Beastmaster Primal Call',
    description: 'Ultimate: Multi-target. Summon beasts to attack up to 3 enemies and apply bleed.',
    damageCalc: { type: 'stat', stat: 'attack', multiplier: 1.5 },
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 85,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.SpecificType,
    statusEffectsApplied: [{
        id: 'bleed',
        name: 'Bleed',
        type: StatusEffectType.Dot,
        duration: 2,
        value: 30,
        damageType: 'physical',
        description: 'Applies bleed.'
    }]
};

export const elementalistElementalRage: Skill = {
    id: 'elementalist_elemental_rage',
    name: 'Elementalist Elemental Rage',
    description: 'Ultimate: AoE. Unleash all elements, dealing random damage types to all enemies.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 2.0 },
    cooldownTurns: 7,
    costType: CostType.Mana,
    costAmount: 120,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'random_element',
        name: 'Random Element',
        type: StatusEffectType.Debuff,
        duration: 1,
        value: 1,
        description: 'Deals random element damage.'
    }]
};

export const bloodKnightCrimsonPact: Skill = {
    id: 'blood_knight_crimson_pact',
    name: 'Crimson Pact',
    description: 'Ultimate: Self. Sacrifice HP to greatly boost attack and lifesteal for 3 turns.',
    cooldownTurns: 6,
    costType: CostType.None,
    costAmount: 0,
    isUltimate: true,
    type: SkillType.Buff,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'attack_up_lifesteal',
        name: 'Attack Up & Lifesteal',
        type: StatusEffectType.Buff,
        duration: 3,
        value: 50,
        description: 'Boosts attack and lifesteal.'
    }]
};

export const demonslayerBanish: Skill = {
    id: 'demonslayer_banish',
    name: 'Banish',
    description: 'Ultimate: Single-target. Deal massive holy damage to a demon and stun them.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 4.0 },
    cooldownTurns: 7,
    costType: CostType.Mana,
    costAmount: 100,
    isUltimate: true,
    type: SkillType.Attack,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'stun',
        name: 'Stun',
        type: StatusEffectType.Cc,
        duration: 2,
        value: 1,
        description: 'Stuns the demon.'
    }]
};

export const chronomancerTimeLock: Skill = {
    id: 'chronomancer_time_lock',
    name: 'Time Lock',
    description: 'Ultimate: Single-target. Freeze an enemy in time, skipping their next two turns.',
    cooldownTurns: 8,
    costType: CostType.Mana,
    costAmount: 120,
    isUltimate: true,
    type: SkillType.Debuff,
    targetType: TargetType.SingleEnemy,
    statusEffectsApplied: [{
        id: 'skip_turn',
        name: 'Skip Turn',
        type: StatusEffectType.Cc,
        duration: 2,
        value: 1,
        description: 'Skips next two turns.'
    }]
};

export const starcallerSupernova: Skill = {
    id: 'starcaller_supernova',
    name: 'Supernova',
    description: 'Ultimate: AoE. Deal massive cosmic damage to all enemies and burn them.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 3.5 },
    cooldownTurns: 8,
    costType: CostType.Mana,
    costAmount: 130,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'burn',
        name: 'Burn',
        type: StatusEffectType.Dot,
        duration: 2,
        value: 50,
        damageType: 'fire',
        description: 'Burns all enemies.'
    }]
};

export const soulreaperHarvest: Skill = {
    id: 'soulreaper_harvest',
    name: 'Soul Harvest',
    description: 'Ultimate: Multi-target. Drain HP from up to 3 enemies and heal self.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.8 },
    cooldownTurns: 7,
    costType: CostType.Mana,
    costAmount: 90,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.SpecificType,
    statusEffectsApplied: [{
        id: 'drain',
        name: 'Drain',
        type: StatusEffectType.Debuff,
        duration: 1,
        value: 0.5,
        description: 'Drains HP and heals self.'
    }]
};

export const plagueDoctorPandemic: Skill = {
    id: 'plague_doctor_pandemic',
    name: 'Pandemic',
    description: 'Ultimate: AoE. Infect all enemies with a deadly plague (damage over time).',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.2 },
    cooldownTurns: 7,
    costType: CostType.Mana,
    costAmount: 110,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'plague',
        name: 'Plague',
        type: StatusEffectType.Dot,
        duration: 3,
        value: 40,
        damageType: 'nature',
        description: 'Plagues all enemies.'
    }]
};

export const alchemistTransmute: Skill = {
    id: 'alchemist_transmute',
    name: 'Transmute',
    description: 'Ultimate: Self. Convert debuffs into buffs and heal self.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 2.0 },
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 80,
    isUltimate: true,
    type: SkillType.Buff,
    targetType: TargetType.Self,
    statusEffectsApplied: [{
        id: 'cleanse_buff',
        name: 'Cleanse & Buff',
        type: StatusEffectType.Buff,
        duration: 1,
        value: 1,
        description: 'Converts debuffs to buffs and heals.'
    }]
};

export const shamanTotemicRage: Skill = {
    id: 'shaman_totemic_rage',
    name: 'Totemic Rage',
    description: 'Ultimate: Multi-target. Summon totems to buff all allies and heal over time.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 1.0 },
    cooldownTurns: 6,
    costType: CostType.Mana,
    costAmount: 90,
    isUltimate: true,
    type: SkillType.Buff,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'regen_buff',
        name: 'Regen & Buff',
        type: StatusEffectType.Buff,
        duration: 3,
        value: 30,
        description: 'Buffs and heals all allies.'
    }]
};

export const runekeeperRunicWard: Skill = {
    id: 'runekeeper_runic_ward',
    name: 'Runic Ward',
    description: 'Ultimate: Multi-target. Shield all allies and reflect a portion of damage.',
    cooldownTurns: 7,
    costType: CostType.Mana,
    costAmount: 100,
    isUltimate: true,
    type: SkillType.Buff,
    targetType: TargetType.AllAllies,
    statusEffectsApplied: [{
        id: 'shield_reflect',
        name: 'Shield & Reflect',
        type: StatusEffectType.Buff,
        duration: 2,
        value: 0.3,
        description: 'Shields and reflects damage.'
    }]
};

export const frostbornGlacialDoom: Skill = {
    id: 'frostborn_glacial_doom',
    name: 'Glacial Doom',
    description: 'Ultimate: AoE. Deal heavy ice damage to all enemies and freeze them.',
    damageCalc: { type: 'stat', stat: 'magic', multiplier: 2.2 },
    cooldownTurns: 7,
    costType: CostType.Mana,
    costAmount: 110,
    isUltimate: true,
    type: SkillType.AoeAttack,
    targetType: TargetType.AllEnemies,
    statusEffectsApplied: [{
        id: 'freeze',
        name: 'Freeze',
        type: StatusEffectType.Cc,
        duration: 1,
        value: 1,
        description: 'Freezes all enemies.'
    }]
};
*/

export {};
