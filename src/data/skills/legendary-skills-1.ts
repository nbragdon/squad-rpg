import { AffinityType } from "types/affinity";
import {
  HealSkillEffect,
  SkillEffectType,
  TargetType,
  CleanseSkillEffect,
  CleansableEffect,
  Skill,
  ApplyStatusEffectSkillEffect,
  DamageSkillEffect,
  AdjustStatSkillEffect,
  AdjustmentDirection,
  ModifierType,
} from "types/skillTypes";
import { StatType } from "types/stats";
import { StatusEffectType } from "types/statusEffects";

const DivineRestorationHealEffect: HealSkillEffect = {
  id: "divine_restoration_heal_effect",
  name: "Divine Restoration Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  healMultiplier: 1.8,
  healStat: StatType.magic,
  targetType: TargetType.allAllies,
};

const DivineRestorationCleanseEffect: CleanseSkillEffect = {
  id: "divine_restoration_cleanse_effect",
  name: "Divine Restoration Cleanse",
  type: SkillEffectType.cleanse,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  cleansableEffect: CleansableEffect.statusEffect,
  targetType: TargetType.allAllies,
  count: "all",
};

export const DivineRestorationSkill: Skill = {
  id: "divine_restoration",
  name: "Divine Restoration",
  cost: 75,
  costStat: StatType.energy,
  effects: [DivineRestorationHealEffect, DivineRestorationCleanseEffect],
};

// Aegis of Light: Applies a powerful shield and haste to all allies.
const AegisOfLightShieldEffect: ApplyStatusEffectSkillEffect = {
  id: "aegis_of_light_shield_effect",
  name: "Aegis of Light Shield",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  targetType: TargetType.allAllies,
  statusEffectType: StatusEffectType.shield,
  value: 1.5, // 150% of the defense stat
  duration: 3,
  stackable: true,
};

const AegisOfLightHasteEffect: ApplyStatusEffectSkillEffect = {
  id: "aegis_of_light_haste_effect",
  name: "Aegis of Light Haste",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  targetType: TargetType.allAllies,
  statusEffectType: StatusEffectType.haste,
  value: 0,
  duration: 2,
  stackable: false,
};

export const AegisOfLightSkill: Skill = {
  id: "aegis_of_light",
  name: "Aegis of Light",
  cost: 50,
  costStat: StatType.energy,
  cooldownTurns: 3,
  effects: [AegisOfLightShieldEffect, AegisOfLightHasteEffect],
};

// Kaelus, the Voidstalker's Skills
// Shadow Strike: Massive damage, silence, and stun on a single enemy.
const ShadowStrikeDamageEffect: DamageSkillEffect = {
  id: "shadow_strike_damage_effect",
  name: "Shadow Strike Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.void, AffinityType.textile],
  damageMultiplier: 2.5,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
};

const ShadowStrikeSilenceEffect: ApplyStatusEffectSkillEffect = {
  id: "shadow_strike_silence_effect",
  name: "Shadow Strike Silence",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void, AffinityType.textile],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.silence,
  value: 0,
  duration: 2,
  stackable: false,
};

const ShadowStrikeStunEffect: ApplyStatusEffectSkillEffect = {
  id: "shadow_strike_stun_effect",
  name: "Shadow Strike Stun",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void, AffinityType.textile],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.stun,
  value: 0,
  duration: 1,
  stackable: false,
};

export const ShadowStrikeSkill: Skill = {
  id: "shadow_strike",
  name: "Shadow Strike",
  cost: 60,
  costStat: StatType.energy,
  effects: [
    ShadowStrikeDamageEffect,
    ShadowStrikeSilenceEffect,
    ShadowStrikeStunEffect,
  ],
};

// Echoing Void: AoE damage and disarm.
const EchoingVoidDamageEffect: DamageSkillEffect = {
  id: "echoing_void_damage_effect",
  name: "Echoing Void Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.void, AffinityType.textile],
  damageMultiplier: 1.8,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.allEnemies,
};

const EchoingVoidDisarmEffect: ApplyStatusEffectSkillEffect = {
  id: "echoing_void_disarm_effect",
  name: "Echoing Void Disarm",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void, AffinityType.textile],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.disarm,
  value: 0,
  duration: 3,
  stackable: false,
};

export const EchoingVoidSkill: Skill = {
  id: "echoing_void",
  name: "Echoing Void",
  cost: 45,
  costStat: StatType.energy,
  effects: [EchoingVoidDamageEffect, EchoingVoidDisarmEffect],
};

// Atlas, the Stoneheart's Skills
// Mountain's Stance: Massive defense buff and taunt.
const MountainStanceDefenseBuff: AdjustStatSkillEffect = {
  id: "mountain_stance_defense_buff",
  name: "Mountain's Stance Defense Buff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem, AffinityType.knowledge],
  targetType: TargetType.self,
  stat: StatType.defense,
  direction: AdjustmentDirection.increase,
  modifierValue: 0.75,
  modifierType: ModifierType.Percentage,
  duration: 3,
};

const MountainStanceMagicDefenseBuff: AdjustStatSkillEffect = {
  id: "mountain_stance_magic_defense_buff",
  name: "Mountain's Stance Magic Defense Buff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem, AffinityType.knowledge],
  targetType: TargetType.self,
  stat: StatType.magicDefense,
  direction: AdjustmentDirection.increase,
  modifierValue: 0.75,
  modifierType: ModifierType.Percentage,
  duration: 3,
};

const MountainStanceTauntEffect: ApplyStatusEffectSkillEffect = {
  id: "mountain_stance_taunt_effect",
  name: "Mountain's Stance Taunt",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem, AffinityType.knowledge],
  targetType: TargetType.self,
  statusEffectType: StatusEffectType.taunt,
  value: 0,
  duration: 2,
  stackable: false,
};

export const MountainStanceSkill: Skill = {
  id: "mountain_stance",
  name: "Mountain's Stance",
  cost: 50,
  costStat: StatType.energy,
  effects: [
    MountainStanceDefenseBuff,
    MountainStanceMagicDefenseBuff,
    MountainStanceTauntEffect,
  ],
};

// Geode Crush: Damage and brittle.
const GeodeCrushDamageEffect: DamageSkillEffect = {
  id: "geode_crush_damage_effect",
  name: "Geode Crush Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.gem, AffinityType.knowledge],
  damageMultiplier: 1.2,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
};

const GeodeCrushBrittleEffect: ApplyStatusEffectSkillEffect = {
  id: "geode_crush_brittle_effect",
  name: "Geode Crush Brittle",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem, AffinityType.knowledge],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.brittle,
  value: 0.25, // Makes target take 25% more damage
  duration: 3,
  stackable: true,
};

export const GeodeCrushSkill: Skill = {
  id: "geode_crush",
  name: "Geode Crush",
  cost: 30,
  costStat: StatType.energy,
  effects: [GeodeCrushDamageEffect, GeodeCrushBrittleEffect],
};

// Ignis, the Firedrake's Skills
// Inferno Nova: AoE damage and burn.
const InfernoNovaDamageEffect: DamageSkillEffect = {
  id: "inferno_nova_damage_effect",
  name: "Inferno Nova Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos, AffinityType.beast],
  damageMultiplier: 1.5,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
};

const InfernoNovaBurnEffect: ApplyStatusEffectSkillEffect = {
  id: "inferno_nova_burn_effect",
  name: "Inferno Nova Burn",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos, AffinityType.beast],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.burn,
  value: 50,
  duration: 3,
  stackable: true,
};

export const InfernoNovaSkill: Skill = {
  id: "inferno_nova",
  name: "Inferno Nova",
  cost: 65,
  costStat: StatType.energy,
  cooldownTurns: 1,
  effects: [InfernoNovaDamageEffect, InfernoNovaBurnEffect],
};

// Cinderfall: Damage and stun.
const CinderfallDamageEffect: DamageSkillEffect = {
  id: "cinderfall_damage_effect",
  name: "Cinderfall Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos, AffinityType.beast],
  damageMultiplier: 2.0,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
};

const CinderfallStunEffect: ApplyStatusEffectSkillEffect = {
  id: "cinderfall_stun_effect",
  name: "Cinderfall Stun",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos, AffinityType.beast],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.stun,
  value: 0,
  duration: 1,
  stackable: false,
};

export const CinderfallSkill: Skill = {
  id: "cinderfall",
  name: "Cinderfall",
  cost: 40,
  costStat: StatType.energy,
  effects: [CinderfallDamageEffect, CinderfallStunEffect],
};

// Lyra, the Wildsong's Skills
// Nature's Harmony: Lowest health ally heal and haste to all allies.
const NatureHarmonyHealEffect: HealSkillEffect = {
  id: "nature_harmony_heal_effect",
  name: "Nature's Harmony Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.knowledge, AffinityType.textile],
  healMultiplier: 1.2,
  healStat: StatType.magic,
  targetType: TargetType.lowestHealthAlly,
};

const NatureHarmonyHasteEffect: ApplyStatusEffectSkillEffect = {
  id: "nature_harmony_haste_effect",
  name: "Nature's Harmony Haste",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.knowledge, AffinityType.textile],
  targetType: TargetType.allAllies,
  statusEffectType: StatusEffectType.haste,
  value: 0,
  duration: 2,
  stackable: false,
};

export const NatureHarmonySkill: Skill = {
  id: "nature_harmony",
  name: "Nature's Harmony",
  cost: 50,
  costStat: StatType.energy,
  effects: [NatureHarmonyHealEffect, NatureHarmonyHasteEffect],
};

// Whispers of the Forest: AoE slow and random confusion.
const WhispersSlowEffect: ApplyStatusEffectSkillEffect = {
  id: "whispers_slow_effect",
  name: "Whispers of the Forest Slow",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.knowledge, AffinityType.textile],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.slow,
  value: 0,
  duration: 3,
  stackable: false,
};

const WhispersConfusionEffect: ApplyStatusEffectSkillEffect = {
  id: "whispers_confusion_effect",
  name: "Whispers of the Forest Confusion",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.knowledge, AffinityType.textile],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.confusion,
  value: 0,
  duration: 2,
  stackable: false,
};

export const WhispersOfTheForestSkill: Skill = {
  id: "whispers_of_the_forest",
  name: "Whispers of the Forest",
  cost: 40,
  costStat: StatType.energy,
  effects: [WhispersSlowEffect, WhispersConfusionEffect],
};

// Miasma, the Plaguebringer's Skills
// Virulent Touch: Deals magic damage and applies a potent, stackable poison.
const VirulentTouchDamageEffect: DamageSkillEffect = {
  id: "virulent_touch_damage_effect",
  name: "Virulent Touch Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.void, AffinityType.textile],
  damageMultiplier: 1.5,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
};

const VirulentTouchPoisonEffect: ApplyStatusEffectSkillEffect = {
  id: "virulent_touch_poison_effect",
  name: "Virulent Touch Poison",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void, AffinityType.textile],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.poison,
  value: 75, // Higher poison damage per tick
  duration: 4,
  stackable: true,
};

export const VirulentTouchSkill: Skill = {
  id: "virulent_touch",
  name: "Virulent Touch",
  cost: 35,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [VirulentTouchDamageEffect, VirulentTouchPoisonEffect],
};

// Debilitating Haze: An AoE debuff that slows all enemies and can confuse a random one.
const DebilitatingHazeSlowEffect: ApplyStatusEffectSkillEffect = {
  id: "debilitating_haze_slow_effect",
  name: "Debilitating Haze Slow",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void, AffinityType.textile],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.slow,
  value: 0,
  duration: 3,
  stackable: false,
};

const DebilitatingHazeConfusionEffect: ApplyStatusEffectSkillEffect = {
  id: "debilitating_haze_confusion_effect",
  name: "Debilitating Haze Confusion",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void, AffinityType.textile],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.confusion,
  value: 0,
  duration: 2,
  stackable: false,
};

export const DebilitatingHazeSkill: Skill = {
  id: "debilitating_haze",
  name: "Debilitating Haze",
  cost: 60,
  costStat: StatType.energy,
  cooldownTurns: 2,
  effects: [DebilitatingHazeSlowEffect, DebilitatingHazeConfusionEffect],
};
