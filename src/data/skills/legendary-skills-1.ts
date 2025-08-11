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
  healMultiplier: 0.75,
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
  cost: 60,
  cooldownTurns: 5,
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
  stat: StatType.magicDefense,
  value: 1.2, // 150% of the defense stat
  stackable: true,
};

const AegisOfLightHasteEffect: ApplyStatusEffectSkillEffect = {
  id: "aegis_of_light_haste_effect",
  name: "Aegis of Light Haste",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  targetType: TargetType.allAllies,
  statusEffectType: StatusEffectType.haste,
  value: 10,
  stackable: true,
};

const AegisOfLightTauntEffect: ApplyStatusEffectSkillEffect = {
  id: "aegis_of_light_taunt_effect",
  name: "Aegis of Light Taunt",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  targetType: TargetType.self,
  statusEffectType: StatusEffectType.taunt,
  value: 2,
  stackable: true,
};

export const AegisOfLightSkill: Skill = {
  id: "aegis_of_light",
  name: "Aegis of Light",
  cost: 55,
  costStat: StatType.energy,
  cooldownTurns: 5,
  effects: [
    AegisOfLightShieldEffect,
    AegisOfLightHasteEffect,
    AegisOfLightTauntEffect,
  ],
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
  healMultiplier: 0.8,
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
  value: 20,
  stackable: true,
};

export const NatureHarmonySkill: Skill = {
  id: "nature_harmony",
  name: "Nature's Harmony",
  cost: 50,
  cooldownTurns: 2,
  costStat: StatType.energy,
  effects: [NatureHarmonyHealEffect, NatureHarmonyHasteEffect],
};

// Whispers of the Forest: AoE slow and random confusion.
const WhispersBrittleEffect: ApplyStatusEffectSkillEffect = {
  id: "whispers_brittle_effect",
  name: "Whispers of the Forest Brittle",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.knowledge, AffinityType.textile],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.brittle,
  value: 50,
  stackable: true,
};

const WhispersConfusionEffect: ApplyStatusEffectSkillEffect = {
  id: "whispers_confusion_effect",
  name: "Whispers of the Forest Confusion",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.knowledge, AffinityType.textile],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.confusion,
  value: 2,
  stackable: true,
};

const WhispersDamageEffect: DamageSkillEffect = {
  type: SkillEffectType.damage,
  damageMultiplier: 1.4,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  id: "whispers_damage_effect",
  name: "Whispers Damage Effect",
  affinities: [AffinityType.knowledge, AffinityType.textile],
  targetType: TargetType.allEnemies,
};

export const WhispersOfTheForestSkill: Skill = {
  id: "whispers_of_the_forest",
  name: "Whispers of the Forest",
  cost: 40,
  cooldownTurns: 3,
  costStat: StatType.energy,
  effects: [
    WhispersDamageEffect,
    WhispersBrittleEffect,
    WhispersConfusionEffect,
  ],
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
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.poison,
  stat: StatType.magic,
  value: 0.35,
  duration: 4,
};

export const VirulentTouchSkill: Skill = {
  id: "virulent_touch",
  name: "Virulent Touch",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 2,
  effects: [VirulentTouchDamageEffect, VirulentTouchPoisonEffect],
};

// Debilitating Haze: An AoE debuff that slows all enemies and can confuse a random one.
const DebilitatingHazePoisonEffect: ApplyStatusEffectSkillEffect = {
  id: "debilitating_haze_poison_effect",
  name: "Debilitating Haze Poison",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void, AffinityType.textile],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.poison,
  stat: StatType.magic,
  value: 0.25,
  duration: 4,
};

const DebilitatingHazeConfusionEffect: ApplyStatusEffectSkillEffect = {
  id: "debilitating_haze_confusion_effect",
  name: "Debilitating Haze Confusion",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.void, AffinityType.textile],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.confusion,
  value: 4,
  stackable: true,
};

export const DebilitatingHazeSkill: Skill = {
  id: "debilitating_haze",
  name: "Debilitating Haze",
  cost: 35,
  costStat: StatType.energy,
  cooldownTurns: 5,
  effects: [DebilitatingHazePoisonEffect, DebilitatingHazeConfusionEffect],
};

// Demonslayer's Skills
// Siphon Strike: High damage and drains energy from the target.
const DemonDecapitationDamageEffect: DamageSkillEffect = {
  id: "demon_decapitation_damage_effect",
  name: "Demon Decapitation Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos, AffinityType.void],
  damageMultiplier: 1.5,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
};

const DemonDecapitationCritChanceBoostEffect: AdjustStatSkillEffect = {
  id: "demon_decapitation_crit_chance_boost_effect",
  name: "Demon Decapitation Crit Chance Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.chaos, AffinityType.void],
  targetType: TargetType.self,
  stat: StatType.critChance,
  direction: AdjustmentDirection.increase,
  modifierValue: 150,
  duration: 1,
};

const DemonDecapitationCritDamageBoostEffect: AdjustStatSkillEffect = {
  id: "demon_decapitation_crit_damage_boost_effect",
  name: "Demon Decapitation Crit Damage Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.chaos, AffinityType.void],
  targetType: TargetType.self,
  stat: StatType.critDamage,
  direction: AdjustmentDirection.increase,
  modifierValue: 80,
  duration: 1,
};

export const DemonDecapitationSkill: Skill = {
  id: "demon_decapitation",
  name: "Demon Decapitation",
  cost: 45,
  costStat: StatType.energy,
  effects: [
    DemonDecapitationCritChanceBoostEffect,
    DemonDecapitationCritDamageBoostEffect,
    DemonDecapitationDamageEffect,
  ],
};

// Chaos Bane: Massive damage and bleed, with an extra defense debuff if the target is chaos affinity.
const ChaosBaneDamageEffect: DamageSkillEffect = {
  id: "chaos_bane_damage_effect",
  name: "Chaos Bane Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos, AffinityType.void],
  damageMultiplier: 1.7,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
};

const ChaosBaneBleedEffect: ApplyStatusEffectSkillEffect = {
  id: "chaos_bane_bleed_effect",
  name: "Chaos Bane Bleed",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos, AffinityType.void],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.bleed,
  value: 3,
  stackable: true,
};

const ChaosBaneDefenseDebuffEffect: AdjustStatSkillEffect = {
  id: "chaos_bane_defense_debuff_effect",
  name: "Chaos Bane Defense Debuff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.chaos, AffinityType.void],
  targetType: TargetType.randomEnemy,
  stat: StatType.defense,
  direction: AdjustmentDirection.decrease,
  modifierValue: 35,
  duration: 3,
};

export const ChaosBaneSkill: Skill = {
  id: "chaos_bane",
  name: "Chaos Bane",
  cost: 30,
  costStat: StatType.energy,
  cooldownTurns: 2,
  effects: [
    ChaosBaneDamageEffect,
    ChaosBaneBleedEffect,
    ChaosBaneDefenseDebuffEffect,
  ],
};

// Aether Weaver's Skills
// Resplendent Weave: Magic AoE damage, applies slow to enemies and a heal-over-time to allies.
const ResplendentWeaveDamageEffect: DamageSkillEffect = {
  id: "resplendent_weave_damage_effect",
  name: "Resplendent Weave Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  damageMultiplier: 1.1,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
};

const ResplendentWeaveSlowEffect: ApplyStatusEffectSkillEffect = {
  id: "resplendent_weave_slow_effect",
  name: "Resplendent Weave Slow",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.slow,
  value: 15,
  stackable: true,
};

const ResplendentWeaveHealEffect: HealSkillEffect = {
  id: "resplendent_weave_heal_effect",
  name: "Resplendent Weave Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  healMultiplier: 0.35,
  healStat: StatType.magic,
  targetType: TargetType.allAllies,
};

export const ResplendentWeaveSkill: Skill = {
  id: "resplendent_weave",
  name: "Resplendent Weave",
  cost: 40,
  cooldownTurns: 2,
  costStat: StatType.energy,
  effects: [
    ResplendentWeaveDamageEffect,
    ResplendentWeaveSlowEffect,
    ResplendentWeaveHealEffect,
  ],
};

// Aetheric Siphon: Magic damage, steals energy from an enemy and gives it to a random ally, and applies a slow.
const AethericSiphonDamageEffect: DamageSkillEffect = {
  id: "aetheric_siphon_damage_effect",
  name: "Aetheric Siphon Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  damageMultiplier: 1.5,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
};

const AethericSiphonEnergyDrainEffect: AdjustStatSkillEffect = {
  id: "aetheric_siphon_energy_drain_effect",
  name: "Aetheric Siphon Energy Drain",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  targetType: TargetType.randomEnemy,
  stat: StatType.energyGain,
  direction: AdjustmentDirection.decrease,
  modifierValue: 40,
  duration: 2,
};

const AethericSiphonEnergyTransferEffect: AdjustStatSkillEffect = {
  id: "aetheric_siphon_energy_transfer_effect",
  name: "Aetheric Siphon Energy Transfer",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  targetType: TargetType.randomAlly,
  stat: StatType.energy,
  direction: AdjustmentDirection.increase,
  modifierValue: 40,
  duration: 2,
};

const AethericSiphonHasteEffect: ApplyStatusEffectSkillEffect = {
  id: "aetheric_siphon_haste_effect",
  name: "Aetheric Siphon Haste",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.radiance, AffinityType.spirit],
  targetType: TargetType.randomAlly,
  statusEffectType: StatusEffectType.haste,
  value: 15,
  stackable: true,
};

export const AethericSiphonSkill: Skill = {
  id: "aetheric_siphon",
  name: "Aetheric Siphon",
  cost: 35,
  costStat: StatType.energy,
  effects: [
    AethericSiphonDamageEffect,
    AethericSiphonEnergyDrainEffect,
    AethericSiphonEnergyTransferEffect,
    AethericSiphonHasteEffect,
  ],
};

// Rune Knight's Skills
// Runeforged Blade: Deals damage and applies a self-buff to strength and defense
const RuneforgedBladeDamageEffect: DamageSkillEffect = {
  id: "runeforged_blade_damage_effect",
  name: "Runeforged Blade Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.gem, AffinityType.textile],
  damageMultiplier: 1.8,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
};

const RuneforgedBladeBuffEffect: AdjustStatSkillEffect = {
  id: "runeforged_blade_buff_effect",
  name: "Runeforged Blade Buff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem, AffinityType.textile],
  targetType: TargetType.self,
  userStat: StatType.defense,
  stat: StatType.strength,
  direction: AdjustmentDirection.increase,
  modifierValue: 35,
  duration: 3,
};

export const RuneforgedBladeSkill: Skill = {
  id: "runeforged_blade",
  name: "Runeforged Blade",
  cost: 35,
  costStat: StatType.energy,
  effects: [RuneforgedBladeDamageEffect, RuneforgedBladeBuffEffect],
};

// Warding Glyphs: Buffs all allies with increased defense and magic defense
const WardingGlyphsDefenseBuff: AdjustStatSkillEffect = {
  id: "warding_glyphs_defense_buff",
  name: "Warding Glyphs Defense Buff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem, AffinityType.textile],
  targetType: TargetType.allAllies,
  userStat: StatType.defense,
  stat: StatType.defense,
  direction: AdjustmentDirection.increase,
  modifierValue: 45,
  duration: 4,
};

const WardingGlyphsMagicDefenseBuff: AdjustStatSkillEffect = {
  id: "warding_glyphs_magic_defense_buff",
  name: "Warding Glyphs Magic Defense Buff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem, AffinityType.textile],
  targetType: TargetType.allAllies,
  userStat: StatType.defense,
  stat: StatType.magicDefense,
  direction: AdjustmentDirection.increase,
  modifierValue: 45,
  duration: 4,
};

export const WardingGlyphsSkill: Skill = {
  id: "warding_glyphs",
  name: "Warding Glyphs",
  cost: 50,
  costStat: StatType.energy,
  cooldownTurns: 5,
  effects: [WardingGlyphsDefenseBuff, WardingGlyphsMagicDefenseBuff],
};

// Runic Aegis: Ultimate skill that gives a massive shield to all allies
const RunicAegisShieldEffect: ApplyStatusEffectSkillEffect = {
  id: "runic_aegis_shield_effect",
  name: "Runic Aegis Shield",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem, AffinityType.textile],
  targetType: TargetType.allAllies,
  statusEffectType: StatusEffectType.shield,
  value: 2.0, // 200% of the user's defense stat
  duration: 3,
  stackable: false,
};

const RunicAegisEnergyGainEffect: AdjustStatSkillEffect = {
  id: "runic_aegis_energy_gain_effect",
  name: "Runic Aegis Energy Gain",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem, AffinityType.textile],
  targetType: TargetType.allAllies,
  stat: StatType.energyGain,
  direction: AdjustmentDirection.increase,
  modifierValue: 10,
  duration: 3,
};

export const RunicAegisSkill: Skill = {
  id: "runic_aegis",
  name: "Runic Aegis",
  cost: 100,
  costStat: StatType.energy,
  cooldownTurns: 5,
  effects: [RunicAegisShieldEffect, RunicAegisEnergyGainEffect],
};

// Terraformer's Skills
// Shifting Sands: AoE damage and slow to all enemies
const ShiftingSandsDamageEffect: DamageSkillEffect = {
  id: "shifting_sands_damage_effect",
  name: "Shifting Sands Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.gem, AffinityType.beast],
  damageMultiplier: 1.5,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
};

const ShiftingSandsSlowEffect: ApplyStatusEffectSkillEffect = {
  id: "shifting_sands_slow_effect",
  name: "Shifting Sands Slow",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem, AffinityType.beast],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.slow,
  value: 15,
  stackable: true,
};

export const ShiftingSandsSkill: Skill = {
  id: "shifting_sands",
  name: "Shifting Sands",
  cost: 40,
  cooldownTurns: 2,
  costStat: StatType.energy,
  effects: [ShiftingSandsDamageEffect, ShiftingSandsSlowEffect],
};

// Verdant Growth: Heals all allies over time and buffs their energy gain
const VerdantGrowthHealEffect: HealSkillEffect = {
  id: "verdant_growth_heal_effect",
  name: "Verdant Growth Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.gem, AffinityType.beast],
  healMultiplier: 0.7,
  healStat: StatType.magic,
  targetType: TargetType.allAllies,
};

const VerdantGrowthEnergyGainEffect: AdjustStatSkillEffect = {
  id: "verdant_growth_energy_gain_effect",
  name: "Verdant Growth Energy Gain",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem, AffinityType.beast],
  targetType: TargetType.allAllies,
  stat: StatType.energyGain,
  direction: AdjustmentDirection.increase,
  modifierValue: 5,
  duration: 3,
};

export const VerdantGrowthSkill: Skill = {
  id: "verdant_growth",
  name: "Verdant Growth",
  cost: 55,
  costStat: StatType.energy,
  cooldownTurns: 4,
  effects: [VerdantGrowthHealEffect, VerdantGrowthEnergyGainEffect],
};

// Seismic Shift: Ultimate skill with AoE damage, brittle, stun, and a strength buff for all allies.
const SeismicShiftDamageEffect: DamageSkillEffect = {
  id: "seismic_shift_damage_effect",
  name: "Seismic Shift Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.gem, AffinityType.beast],
  damageMultiplier: 2.5,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.allEnemies,
};

const SeismicShiftBrittleEffect: ApplyStatusEffectSkillEffect = {
  id: "seismic_shift_brittle_effect",
  name: "Seismic Shift Brittle",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem, AffinityType.beast],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.brittle,
  value: 0.5,
  duration: 2,
  stackable: true,
};

const SeismicShiftStunEffect: ApplyStatusEffectSkillEffect = {
  id: "seismic_shift_stun_effect",
  name: "Seismic Shift Stun",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem, AffinityType.beast],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.stun,
  value: 0,
  duration: 1,
  stackable: false,
};

const SeismicShiftStrengthBuff: AdjustStatSkillEffect = {
  id: "seismic_shift_strength_buff",
  name: "Seismic Shift Strength Buff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem, AffinityType.beast],
  targetType: TargetType.allAllies,
  stat: StatType.strength,
  direction: AdjustmentDirection.increase,
  modifierValue: 0.3,
  duration: 3,
};

export const SeismicShiftSkill: Skill = {
  id: "seismic_shift",
  name: "Seismic Shift",
  cost: 100,
  costStat: StatType.energy,
  cooldownTurns: 6,
  effects: [
    SeismicShiftDamageEffect,
    SeismicShiftBrittleEffect,
    SeismicShiftStunEffect,
    SeismicShiftStrengthBuff,
  ],
};
