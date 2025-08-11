import { AffinityType } from "../../types/affinity";
import {
  AdjustmentDirection,
  AdjustStatSkillEffect,
  ApplyBleedStatusEffectSkillEffect,
  ApplyBurnStatusEffectSkillEffect,
  ApplyConfusionStatusEffectSkillEffect,
  ApplyHasteStatusEffectSkillEffect,
  ApplyShieldStatusEffectSkillEffect,
  ApplyStatusEffectSkillEffect,
  ApplyStunStatusEffectSkillEffect,
  ApplyTauntStatusEffectSkillEffect,
  CleansableEffect,
  CleanseSkillEffect,
  DamageSkillEffect,
  HealSkillEffect,
  ModifierType,
  Skill,
  SkillEffectType,
  TargetType,
} from "../../types/skillTypes";
import { StatType } from "../../types/stats";
import { StatusEffectType } from "../../types/statusEffects";

//----------------------------------------------------------------------------
// Gemini Guardian's Skills
//----------------------------------------------------------------------------

// 1) Tempest's Fury - Deals magic damage to all enemies and applies a slow.
// This skill is an offensive ability that combines air manipulation with intellect.
// The guardian uses its mental agility to create a wide-spread storm that hinders enemies.
const TempestsFuryDamageEffect: DamageSkillEffect = {
  id: "tempests_fury_damage_effect",
  name: "Tempest's Fury Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.gem],
  damageMultiplier: 1.5,
  damageStat: StatType.speed,
  defenseStat: StatType.speed,
  targetType: TargetType.allEnemies,
};

const TempestsFuryHasteEffect: ApplyHasteStatusEffectSkillEffect = {
  id: "tempests_fury_haste_effect",
  name: "Tempest's Fury Haste",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem],
  targetType: TargetType.allAllies,
  statusEffectType: StatusEffectType.haste,
  value: 15,
  stackable: true,
};

export const TempestsFurySkill: Skill = {
  id: "tempests_fury",
  name: "Tempest's Fury",
  cost: 35,
  costStat: StatType.energy,
  effects: [TempestsFuryDamageEffect, TempestsFuryHasteEffect],
};

// 2) Twin Insight - Buffs all allies with increased speed and crit chance.
// This ability reflects the guardian's mental agility and duality, granting allies
// a "split decision" state of hyper-focus that enhances their combat prowess.
const TwinInsightSpeedBuff: AdjustStatSkillEffect = {
  id: "twin_insight_speed_buff",
  name: "Twin Insight Speed Buff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem],
  targetType: TargetType.allAllies,
  stat: StatType.speed,
  direction: AdjustmentDirection.increase,
  modifierValue: 30, // 30% speed increase
  duration: 3,
};

const TwinInsightCritChanceBuff: AdjustStatSkillEffect = {
  id: "twin_insight_crit_chance_buff",
  name: "Twin Insight Crit Chance Buff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem],
  targetType: TargetType.allAllies,
  userStat: StatType.critChance,
  stat: StatType.critChance,
  direction: AdjustmentDirection.increase,
  modifierValue: 100,
  duration: 3,
};

const TwinInsightShield: ApplyShieldStatusEffectSkillEffect = {
  id: "twin_insight_shield",
  name: "Twin Insight Shield",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.shield,
  targetType: TargetType.allAllies,
  affinities: [AffinityType.gem],
  value: 0.45,
  stackable: true,
  stat: StatType.speed,
};

export const TwinInsightSkill: Skill = {
  id: "twin_insight",
  name: "Twin Insight",
  cost: 35,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [TwinInsightSpeedBuff, TwinInsightCritChanceBuff, TwinInsightShield],
};

// 3. Soul Siphon - Deals magic damage to a single enemy, heals self for a portion
//-----------------------------------------------------------------------------
const SoulSiphonDamage: DamageSkillEffect = {
  id: "soul_siphon_damage",
  name: "Soul Siphon Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.spirit],
  damageMultiplier: 1.5,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const SoulSiphonHeal: HealSkillEffect = {
  id: "soul_siphon_heal",
  name: "Soul Siphon Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.spirit],
  healMultiplier: 0.7,
  healStat: StatType.magic,
  targetType: TargetType.self,
  duration: undefined,
};

export const SoulSiphonSkill: Skill = {
  id: "soul_siphon",
  name: "Soul Siphon",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [SoulSiphonDamage, SoulSiphonHeal],
};
//-----------------------------------------------------------------------------

// 4. Spirit Link - Heals all allies, applies energy gain buff
//-----------------------------------------------------------------------------
const SpiritLinkHeal: HealSkillEffect = {
  id: "spirit_link_heal",
  name: "Spirit Link Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.spirit],
  healMultiplier: 0.5,
  healStat: StatType.magic,
  targetType: TargetType.allAllies,
  duration: undefined,
};

const SpiritLinkEnergyGain: AdjustStatSkillEffect = {
  id: "spirit_link_energy_gain",
  name: "Spirit Link Energy Gain",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.spirit],
  targetType: TargetType.allAllies,
  stat: StatType.energyGain,
  direction: AdjustmentDirection.increase,
  modifierValue: 120,
  duration: 3,
};

export const SpiritLinkSkill: Skill = {
  id: "spirit_link",
  name: "Spirit Link",
  cost: 40,
  costStat: StatType.energy,
  cooldownTurns: 5,
  effects: [SpiritLinkHeal, SpiritLinkEnergyGain],
};
//-----------------------------------------------------------------------------

// 5. Arcane Barrage - Deals high magic damage to a single enemy, reduces their magic defense
//-----------------------------------------------------------------------------
const ArcaneBarrageDamage: DamageSkillEffect = {
  id: "arcane_barrage_damage",
  name: "Arcane Barrage Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.knowledge],
  damageMultiplier: 2.0,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const ArcaneBarrageMagicDefenseDebuff: AdjustStatSkillEffect = {
  id: "arcane_barrage_magic_defense_debuff",
  name: "Arcane Barrage Magic Defense Reduction",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.knowledge],
  targetType: TargetType.randomEnemy,
  userStat: StatType.magic,
  stat: StatType.magicDefense,
  direction: AdjustmentDirection.decrease,
  modifierValue: 35,
  duration: 3,
};

export const ArcaneBarrageSkill: Skill = {
  id: "arcane_barrage",
  name: "Arcane Barrage",
  cost: 35,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [ArcaneBarrageDamage, ArcaneBarrageMagicDefenseDebuff],
};
//-----------------------------------------------------------------------------

// 6. Ancient Wisdom - Increases magic and magic defense on self
//-----------------------------------------------------------------------------
const AncientWisdomMagicBoost: AdjustStatSkillEffect = {
  id: "ancient_wisdom_magic_boost",
  name: "Ancient Wisdom Magic Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.knowledge],
  targetType: TargetType.self,
  stat: StatType.magic,
  direction: AdjustmentDirection.increase,
  modifierValue: 50,
  duration: 3,
};

const AncientWisdomMagicDefenseBoost: AdjustStatSkillEffect = {
  id: "ancient_wisdom_magic_defense_boost",
  name: "Ancient Wisdom Magic Defense Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.knowledge],
  targetType: TargetType.self,
  stat: StatType.magicDefense,
  direction: AdjustmentDirection.increase,
  modifierValue: 50,
  duration: 3,
};

export const AncientWisdomSkill: Skill = {
  id: "ancient_wisdom",
  name: "Ancient Wisdom",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 3,
  effects: [AncientWisdomMagicBoost, AncientWisdomMagicDefenseBoost],
};
//-----------------------------------------------------------------------------

// 7. Temporal Shift - Increases speed and applies Haste to self
//-----------------------------------------------------------------------------
const TemporalShiftSpeedBoost: AdjustStatSkillEffect = {
  id: "temporal_shift_speed_boost",
  name: "Temporal Shift Speed Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.chaos],
  targetType: TargetType.self,
  stat: StatType.speed,
  direction: AdjustmentDirection.increase,
  modifierValue: 80,
  duration: 3,
};

const TemporalShiftHaste: ApplyHasteStatusEffectSkillEffect = {
  id: "temporal_shift_haste",
  name: "Temporal Shift Haste",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.haste,
  targetType: TargetType.self,
  affinities: [AffinityType.chaos],
  value: 20,
  stackable: true,
};

export const TemporalShiftSkill: Skill = {
  id: "temporal_shift",
  name: "Temporal Shift",
  cost: 20,
  costStat: StatType.energy,
  cooldownTurns: 5,
  effects: [TemporalShiftSpeedBoost, TemporalShiftHaste],
};
//-----------------------------------------------------------------------------

// 8. Lost To Time - Deals physical damage to a random enemy, applies Confusion
//-----------------------------------------------------------------------------
const LostToTimeDamage: DamageSkillEffect = {
  id: "lost_to_time_damage",
  name: "Lost To Time Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos],
  damageMultiplier: 1.3,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const LostToTimeConfusion: ApplyConfusionStatusEffectSkillEffect = {
  id: "lost_to_time_confusion",
  name: "Lost To Time Confusion",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.confusion,
  targetType: TargetType.randomEnemy,
  affinities: [AffinityType.chaos],
  value: 1,
  stackable: true,
};

const LostToTimeSlow: ApplyStatusEffectSkillEffect = {
  id: "lost_to_time_slow",
  name: "Lost To Time Slow",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.slow,
  targetType: TargetType.randomEnemy,
  affinities: [AffinityType.chaos],
  value: 15,
  stackable: true,
};

export const LostToTimeSkill: Skill = {
  id: "lost_to_time",
  name: "Lost To Time",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 2,
  effects: [LostToTimeDamage, LostToTimeConfusion, LostToTimeSlow],
};
//-----------------------------------------------------------------------------

// 9. Void Rend - Deals void damage, applies Bleed
//-----------------------------------------------------------------------------
const VoidRendDamage: DamageSkillEffect = {
  id: "void_rend_damage",
  name: "Void Rend Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.void],
  damageMultiplier: 1.6,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const VoidRendBleed: ApplyBleedStatusEffectSkillEffect = {
  id: "void_rend_bleed",
  name: "Void Rend Bleed",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.bleed,
  targetType: TargetType.randomEnemy,
  affinities: [AffinityType.void],
  value: 4,
  stackable: true,
};

export const VoidRendSkill: Skill = {
  id: "void_rend",
  name: "Void Rend",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [VoidRendDamage, VoidRendBleed],
};
//-----------------------------------------------------------------------------

// 10. Shadow Embrace - Heals self, applies Shield
//-----------------------------------------------------------------------------
const ShadowEmbraceHeal: HealSkillEffect = {
  id: "shadow_embrace_heal",
  name: "Shadow Embrace Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.void],
  healMultiplier: 1.0,
  healStat: StatType.magic,
  targetType: TargetType.self,
  duration: undefined,
};

const ShadowEmbraceShield: ApplyShieldStatusEffectSkillEffect = {
  id: "shadow_embrace_shield",
  name: "Shadow Embrace Shield",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.shield,
  targetType: TargetType.self,
  affinities: [AffinityType.void],
  value: 0.55,
  stackable: true,
  stat: StatType.magic,
};

export const ShadowEmbraceSkill: Skill = {
  id: "shadow_embrace",
  name: "Shadow Embrace",
  cost: 30,
  costStat: StatType.energy,
  cooldownTurns: 3,
  effects: [ShadowEmbraceHeal, ShadowEmbraceShield],
};
//-----------------------------------------------------------------------------

// 11. Sunfire Burst - AoE magic damage, applies Burn
//-----------------------------------------------------------------------------
const SunfireBurstDamage: DamageSkillEffect = {
  id: "sunfire_burst_damage",
  name: "Sunfire Burst Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.radiance],
  damageMultiplier: 1.3,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
};

const SunfireBurstBurn: ApplyBurnStatusEffectSkillEffect = {
  id: "sunfire_burst_burn",
  name: "Sunfire Burst Burn",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.burn,
  targetType: TargetType.allEnemies,
  affinities: [AffinityType.radiance],
  value: 10,
  stackable: true,
};

export const SunfireBurstSkill: Skill = {
  id: "sunfire_burst",
  name: "Sunfire Burst",
  cost: 35,
  costStat: StatType.energy,
  cooldownTurns: 4,
  effects: [SunfireBurstDamage, SunfireBurstBurn],
};
//-----------------------------------------------------------------------------

// 12. Divine Shield - Applies a large shield to all allies, cleanses 1 status effect
//-----------------------------------------------------------------------------
const DivineShieldApplyShield: ApplyShieldStatusEffectSkillEffect = {
  id: "divine_shield_apply_shield",
  name: "Divine Shield Shield",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.shield,
  targetType: TargetType.allAllies,
  affinities: [AffinityType.radiance],
  value: 0.75,
  stackable: true,
  stat: StatType.magicDefense,
};

const DivineShieldCleanse: CleanseSkillEffect = {
  id: "divine_shield_cleanse",
  name: "Divine Shield Cleanse",
  type: SkillEffectType.cleanse,
  affinities: [AffinityType.radiance],
  cleansableEffect: CleansableEffect.statusEffect,
  count: 2,
  targetType: TargetType.allAllies,
};

const DivineShieldApplyTaunt: ApplyStatusEffectSkillEffect = {
  id: "divine_shield_apply_taunt",
  name: "Divine Shield Taunt",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.taunt,
  targetType: TargetType.self,
  affinities: [AffinityType.radiance],
  duration: 2,
};

export const DivineShieldSkill: Skill = {
  id: "divine_shield",
  name: "Divine Shield",
  cost: 45,
  costStat: StatType.energy,
  cooldownTurns: 5,
  effects: [
    DivineShieldApplyShield,
    DivineShieldCleanse,
    DivineShieldApplyTaunt,
  ],
};
//-----------------------------------------------------------------------------

// 13. Wild Charge - Deals physical damage, increases self strength
//-----------------------------------------------------------------------------
const WildChargeDamage: DamageSkillEffect = {
  id: "wild_charge_damage",
  name: "Wild Charge Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast],
  damageMultiplier: 1.7,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const WildChargeStrengthBoost: AdjustStatSkillEffect = {
  id: "wild_charge_strength_boost",
  name: "Wild Charge Strength Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.beast],
  targetType: TargetType.self,
  stat: StatType.strength,
  direction: AdjustmentDirection.increase,
  modifierValue: 65,
  duration: 2,
};

export const WildChargeSkill: Skill = {
  id: "wild_charge",
  name: "Wild Charge",
  cost: 30,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [WildChargeDamage, WildChargeStrengthBoost],
};
//-----------------------------------------------------------------------------

// 14. Primal Roar - Reduces enemy defense, applies Taunt
//-----------------------------------------------------------------------------
const PrimalRoarDefenseDebuff: AdjustStatSkillEffect = {
  id: "primal_roar_defense_debuff",
  name: "Primal Roar Defense Reduction",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.beast],
  targetType: TargetType.allEnemies,
  stat: StatType.defense,
  direction: AdjustmentDirection.decrease,
  modifierValue: 30,
  duration: 3,
};

const PrimalRoarTaunt: ApplyTauntStatusEffectSkillEffect = {
  id: "primal_roar_taunt",
  name: "Primal Roar Taunt",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.taunt,
  targetType: TargetType.randomEnemy,
  affinities: [AffinityType.beast],
  value: 1,
  stackable: true,
};

export const PrimalRoarSkill: Skill = {
  id: "primal_roar",
  name: "Primal Roar",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 3,
  effects: [PrimalRoarDefenseDebuff, PrimalRoarTaunt],
};
//-----------------------------------------------------------------------------

// 15. Fabricate Armor - Applies shield to all allies, increases their defense
//-----------------------------------------------------------------------------
const FabricateArmorShield: ApplyStatusEffectSkillEffect = {
  id: "fabricate_armor_shield",
  name: "Fabricate Armor Shield",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.shield,
  targetType: TargetType.allAllies,
  affinities: [AffinityType.textile],
  value: 100,
  stackable: true,
};

const FabricateArmorDefenseBoost: AdjustStatSkillEffect = {
  id: "fabricate_armor_defense_boost",
  name: "Fabricate Armor Defense Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.textile],
  targetType: TargetType.allAllies,
  stat: StatType.defense,
  direction: AdjustmentDirection.increase,
  modifierValue: 40,
  duration: 3,
};

export const FabricateArmorSkill: Skill = {
  id: "fabricate_armor",
  name: "Fabricate Armor",
  cost: 30,
  costStat: StatType.energy,
  cooldownTurns: 4,
  effects: [FabricateArmorShield, FabricateArmorDefenseBoost],
};
//-----------------------------------------------------------------------------

// 16. Threaded Barrage - Deals physical damage to all enemies, reduces their speed
//-----------------------------------------------------------------------------
const ThreadedBarrageDamage: DamageSkillEffect = {
  id: "threaded_barrage_damage",
  name: "Threaded Barrage Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.textile],
  damageMultiplier: 1.2,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.allEnemies,
  duration: undefined,
};

const ThreadedBarrageStun: ApplyStunStatusEffectSkillEffect = {
  id: "fabricate_armor_stun",
  name: "Fabricate Armor Stun",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.stun,
  targetType: TargetType.allEnemies,
  affinities: [AffinityType.textile],
  value: 1,
  stackable: true,
};

export const ThreadedBarrageSkill: Skill = {
  id: "threaded_barrage",
  name: "Threaded Barrage",
  cost: 50,
  costStat: StatType.energy,
  cooldownTurns: 5,
  effects: [ThreadedBarrageDamage, ThreadedBarrageStun],
};
//-----------------------------------------------------------------------------
