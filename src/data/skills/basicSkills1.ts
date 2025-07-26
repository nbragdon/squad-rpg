/*
import {
  CostType,
  Skill,
  SkillType,
  StatusEffectType,
  TargetType,
} from "../../types/skillTypes";

export const flameStrike: Skill = {
  id: "flame_strike",
  name: "Flame Strike",
  description: "Deal heavy fire damage and apply Burn (damage over time).",
  damageCalc: { type: "stat", stat: "fire", multiplier: 1.8 },
  cooldownTurns: 2,
  targetType: TargetType.SingleEnemy,
  costType: CostType.Mana,
  costAmount: 20,
  isUltimate: false,
  type: SkillType.Attack,
  statusEffectsApplied: [
    {
      id: "burn_dot",
      name: "Burn",
      type: StatusEffectType.Dot,
      duration: 3,
      value: 30,
      damageType: "fire",
      description: "Takes fire damage each turn.",
    },
  ],
};

export const iceBlast: Skill = {
  id: "ice_blast",
  name: "Ice Blast",
  description: "Deal cold damage and reduce target speed (Chill).",
  damageCalc: { type: "stat", stat: "cold", multiplier: 1.2 },
  cooldownTurns: 2,
  targetType: TargetType.SingleEnemy,
  costType: CostType.Mana,
  costAmount: 18,
  isUltimate: false,
  type: SkillType.Attack,
  statusEffectsApplied: [
    {
      id: "chill_debuff",
      name: "Chill",
      type: StatusEffectType.Debuff,
      duration: 2,
      value: -20,
      targetStat: "speed",
      description: "Reduced speed.",
    },
  ],
};

export const divineAegis: Skill = {
  id: "divine_aegis",
  name: "Divine Aegis",
  description: "Grant a shield that reduces all damage taken.",
  cooldownTurns: 3,
  targetType: TargetType.SingleAlly,
  costType: CostType.Mana,
  costAmount: 25,
  isUltimate: false,
  type: SkillType.Buff,
  statusEffectsApplied: [
    {
      id: "shield_buff",
      name: "Shield",
      type: StatusEffectType.Buff,
      duration: 2,
      value: 0.5,
      targetStat: "damageReduction",
      description: "Reduces damage taken.",
    },
  ],
};

export const quickHeal: Skill = {
  id: "quick_heal",
  name: "Quick Heal",
  description: "Instantly heal an ally.",
  damageCalc: { type: "stat", stat: "healing", multiplier: 1.2 },
  cooldownTurns: 1,
  targetType: TargetType.SingleAlly,
  costType: CostType.Mana,
  costAmount: 15,
  isUltimate: false,
  type: SkillType.Heal,
};

export const berserk: Skill = {
  id: "berserk",
  name: "Berserk",
  description: "Increase own attack for 3 turns.",
  cooldownTurns: 4,
  targetType: TargetType.Self,
  costType: CostType.None,
  isUltimate: false,
  type: SkillType.Buff,
  statusEffectsApplied: [
    {
      id: "berserk_buff",
      name: "Berserk",
      type: StatusEffectType.Buff,
      duration: 3,
      value: 40,
      targetStat: "attack",
      description: "Increased attack.",
    },
  ],
};

export const shadowStep: Skill = {
  id: "shadow_step",
  name: "Shadow Step",
  description: "Evade next attack and gain speed.",
  cooldownTurns: 3,
  targetType: TargetType.Self,
  costType: CostType.None,
  isUltimate: false,
  type: SkillType.Buff,
  statusEffectsApplied: [
    {
      id: "evasion_buff",
      name: "Evasion",
      type: StatusEffectType.Buff,
      duration: 1,
      value: 1,
      targetStat: "evasion",
      description: "Evade next attack.",
    },
  ],
};

export const holyLight: Skill = {
  id: "holy_light",
  name: "Holy Light",
  description: "Heal an ally and remove 1 debuff.",
  damageCalc: { type: "stat", stat: "healing", multiplier: 1.0 },
  cooldownTurns: 2,
  targetType: TargetType.SingleAlly,
  costType: CostType.Mana,
  costAmount: 18,
  isUltimate: false,
  type: SkillType.Heal,
  statusEffectsApplied: [
    {
      id: "cleanse_buff",
      name: "Cleanse",
      type: StatusEffectType.Buff,
      duration: 1,
      value: 1,
      description: "Removes 1 debuff.",
    },
  ],
};

export const thunderClap: Skill = {
  id: "thunder_clap",
  name: "Thunder Clap",
  description: "Deal lightning damage and stun for 1 turn.",
  damageCalc: { type: "stat", stat: "lightning", multiplier: 1.4 },
  cooldownTurns: 3,
  targetType: TargetType.SingleEnemy,
  costType: CostType.Mana,
  costAmount: 22,
  isUltimate: false,
  type: SkillType.Attack,
  statusEffectsApplied: [
    {
      id: "stun_cc",
      name: "Stun",
      type: StatusEffectType.Cc,
      duration: 1,
      value: 1,
      damageType: "lightning",
      description: "Cannot act for 1 turn.",
    },
  ],
};

export const cripplingShot: Skill = {
  id: "crippling_shot",
  name: "Crippling Shot",
  description: "Deal damage and reduce target defense.",
  damageCalc: { type: "stat", stat: "physical", multiplier: 1.1 },
  cooldownTurns: 2,
  targetType: TargetType.SingleEnemy,
  costType: CostType.Mana,
  costAmount: 16,
  isUltimate: false,
  type: SkillType.Attack,
  statusEffectsApplied: [
    {
      id: "defense_down",
      name: "Defense Down",
      type: StatusEffectType.Debuff,
      duration: 2,
      value: -25,
      targetStat: "defense",
      description: "Reduced defense.",
    },
  ],
};

export const windSlash: Skill = {
  id: "wind_slash",
  name: "Wind Slash",
  description: "Deal damage and increase own speed.",
  damageCalc: { type: "stat", stat: "wind", multiplier: 1.0 },
  cooldownTurns: 1,
  targetType: TargetType.Self,
  costType: CostType.Mana,
  costAmount: 12,
  isUltimate: false,
  type: SkillType.Attack,
  statusEffectsApplied: [
    {
      id: "speed_buff",
      name: "Speed Buff",
      type: StatusEffectType.Buff,
      duration: 2,
      value: 20,
      targetStat: "speed",
      description: "Increased speed.",
    },
  ],
};

export const drainingBite: Skill = {
  id: "draining_bite",
  name: "Draining Bite",
  description: "Deal damage and heal self for half the damage dealt.",
  damageCalc: { type: "stat", stat: "nature", multiplier: 0.9 },
  cooldownTurns: 2,
  targetType: TargetType.SingleEnemy,
  costType: CostType.Mana,
  costAmount: 14,
  isUltimate: false,
  type: SkillType.Attack,
  statusEffectsApplied: [
    {
      id: "life_steal",
      name: "Life Steal",
      type: StatusEffectType.Buff,
      duration: 1,
      value: 0.5,
      description: "Heals for half the damage dealt.",
    },
  ],
};

export const blindingPowder: Skill = {
  id: "blinding_powder",
  name: "Blinding Powder",
  description: "Reduce target accuracy for 2 turns.",
  cooldownTurns: 3,
  targetType: TargetType.SingleEnemy,
  costType: CostType.Mana,
  costAmount: 10,
  isUltimate: false,
  type: SkillType.Debuff,
  statusEffectsApplied: [
    {
      id: "accuracy_down",
      name: "Accuracy Down",
      type: StatusEffectType.Debuff,
      duration: 2,
      value: -30,
      targetStat: "accuracy",
      description: "Reduced accuracy.",
    },
  ],
};

export const arcaneBolt: Skill = {
  id: "arcane_bolt",
  name: "Arcane Bolt",
  description: "Deal magic damage and restore a small amount of energy.",
  damageCalc: { type: "stat", stat: "arcane", multiplier: 1.0 },
  cooldownTurns: 1,
  targetType: TargetType.SingleEnemy,
  costType: CostType.Mana,
  costAmount: 10,
  isUltimate: false,
  type: SkillType.Attack,
  statusEffectsApplied: [
    {
      id: "energy_gain",
      name: "Energy Gain",
      type: StatusEffectType.Buff,
      duration: 1,
      value: 10,
      description: "Restores energy.",
    },
  ],
};

export const earthGrasp: Skill = {
  id: "earth_grasp",
  name: "Earth Grasp",
  description: "Deal damage and root target for 1 turn.",
  damageCalc: { type: "stat", stat: "earth", multiplier: 1.1 },
  cooldownTurns: 2,
  targetType: TargetType.SingleEnemy,
  costType: CostType.Mana,
  costAmount: 15,
  isUltimate: false,
  type: SkillType.Attack,
  statusEffectsApplied: [
    {
      id: "root_cc",
      name: "Root",
      type: StatusEffectType.Cc,
      duration: 1,
      value: 1,
      targetStat: "root",
      description: "Cannot move for 1 turn.",
    },
  ],
};

export const bloodRitual: Skill = {
  id: "blood_ritual",
  name: "Blood Ritual",
  description: "Sacrifice HP to gain energy and attack.",
  cooldownTurns: 3,
  targetType: TargetType.Self,
  costType: CostType.None,
  isUltimate: false,
  type: SkillType.Buff,
  statusEffectsApplied: [
    {
      id: "self_damage",
      name: "Self Damage",
      type: StatusEffectType.Debuff,
      duration: 1,
      value: 50,
      description: "Lose HP.",
    },
    {
      id: "energy_gain_buff",
      name: "Energy Gain",
      type: StatusEffectType.Buff,
      duration: 1,
      value: 20,
      description: "Gain energy.",
    },
    {
      id: "attack_buff",
      name: "Attack Buff",
      type: StatusEffectType.Buff,
      duration: 2,
      value: 30,
      targetStat: "attack",
      description: "Increased attack.",
    },
  ],
};

export const piercingArrow: Skill = {
  id: "piercing_arrow",
  name: "Piercing Arrow",
  description: "Deal damage that ignores part of target defense.",
  damageCalc: { type: "stat", stat: "physical", multiplier: 1.2 },
  cooldownTurns: 2,
  targetType: TargetType.SingleEnemy,
  costType: CostType.Mana,
  costAmount: 18,
  isUltimate: false,
  type: SkillType.Attack,
  statusEffectsApplied: [
    {
      id: "ignore_defense",
      name: "Ignore Defense",
      type: StatusEffectType.Buff,
      duration: 1,
      value: 0.3,
      description: "Ignores part of target defense.",
    },
  ],
};

export const shadowBind: Skill = {
  id: "shadow_bind",
  name: "Shadow Bind",
  description: "Immobilize target for 1 turn.",
  cooldownTurns: 3,
  targetType: TargetType.SingleEnemy,
  costType: CostType.Mana,
  costAmount: 15,
  isUltimate: false,
  type: SkillType.Debuff,
  statusEffectsApplied: [
    {
      id: "immobilize_cc",
      name: "Immobilize",
      type: StatusEffectType.Cc,
      duration: 1,
      value: 1,
      targetStat: "immobilize",
      description: "Cannot act or move for 1 turn.",
    },
  ],
};
*/

export {};
