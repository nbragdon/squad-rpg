import { AffinityType } from "../../types/affinity";
import {
  AdjustStatSkillEffect,
  ApplyStatusEffectSkillEffect,
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

// 1. Crystal Shard Barrage - Deals magic damage to all enemies, applies brittle
//-----------------------------------------------------------------------------
const CrystalShardBarrageDamage: DamageSkillEffect = {
  id: "crystal_shard_barrage_damage",
  name: "Crystal Shard Barrage Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.gem],
  damageMultiplier: 0.9,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
  duration: undefined,
};

const CrystalShardBarrageBrittle: ApplyStatusEffectSkillEffect = {
  id: "crystal_shard_barrage_brittle",
  name: "Crystal Shard Barrage Brittle",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.brittle,
  targetType: TargetType.allEnemies,
  affinities: [AffinityType.gem],
  value: 15,
  stackable: true,
};

export const CrystalShardBarrageSkill: Skill = {
  id: "crystal_shard_barrage",
  name: "Crystal Shard Barrage",
  cost: 35,
  costStat: StatType.energy,
  cooldownTurns: 4,
  effects: [CrystalShardBarrageDamage, CrystalShardBarrageBrittle],
};
//-----------------------------------------------------------------------------

// 2. Gemstone Barrier - Applies a large shield to self, increases defense
//-----------------------------------------------------------------------------
const GemstoneBarrierShield: ApplyStatusEffectSkillEffect = {
  id: "gemstone_barrier_shield",
  name: "Gemstone Barrier Shield",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.shield,
  targetType: TargetType.self,
  affinities: [AffinityType.gem],
  value: 200,
  stackable: true,
};

const GemstoneBarrierDefenseBoost: AdjustStatSkillEffect = {
  id: "gemstone_barrier_defense_boost",
  name: "Gemstone Barrier Defense Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem],
  targetType: TargetType.self,
  stat: StatType.defense,
  modifierType: ModifierType.Percentage,
  modifierValue: 40,
  duration: 3,
};

export const GemstoneBarrierSkill: Skill = {
  id: "gemstone_barrier",
  name: "Gemstone Barrier",
  cost: 30,
  costStat: StatType.energy,
  cooldownTurns: 3,
  effects: [GemstoneBarrierShield, GemstoneBarrierDefenseBoost],
};
//-----------------------------------------------------------------------------

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
  modifierType: ModifierType.Flat,
  modifierValue: 5,
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
  stat: StatType.magicDefense,
  modifierType: ModifierType.Percentage,
  modifierValue: -25,
  duration: 3,
};

export const ArcaneBarrageSkill: Skill = {
  id: "arcane_barrage",
  name: "Arcane Barrage",
  cost: 30,
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
  modifierType: ModifierType.Flat,
  modifierValue: 50,
  duration: 4,
};

const AncientWisdomMagicDefenseBoost: AdjustStatSkillEffect = {
  id: "ancient_wisdom_magic_defense_boost",
  name: "Ancient Wisdom Magic Defense Boost",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.knowledge],
  targetType: TargetType.self,
  stat: StatType.magicDefense,
  modifierType: ModifierType.Flat,
  modifierValue: 50,
  duration: 4,
};

export const AncientWisdomSkill: Skill = {
  id: "ancient_wisdom",
  name: "Ancient Wisdom",
  cost: 20,
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
  modifierType: ModifierType.Percentage,
  modifierValue: 30,
  duration: 3,
};

const TemporalShiftHaste: ApplyStatusEffectSkillEffect = {
  id: "temporal_shift_haste",
  name: "Temporal Shift Haste",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.haste,
  targetType: TargetType.self,
  affinities: [AffinityType.chaos],
  value: 1, // Haste value (e.g., 1 means 1 extra turn)
  stackable: false,
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

// 8. Chaotic Strike - Deals physical damage to a random enemy, applies Confusion
//-----------------------------------------------------------------------------
const ChaoticStrikeDamage: DamageSkillEffect = {
  id: "chaotic_strike_damage",
  name: "Chaotic Strike Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos],
  damageMultiplier: 1.8,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
  duration: undefined,
};

const ChaoticStrikeConfusion: ApplyStatusEffectSkillEffect = {
  id: "chaotic_strike_confusion",
  name: "Chaotic Strike Confusion",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.confusion,
  targetType: TargetType.randomEnemy,
  affinities: [AffinityType.chaos],
  value: 1,
  stackable: false,
};

export const ChaoticStrikeSkill: Skill = {
  id: "chaotic_strike",
  name: "Chaotic Strike",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [ChaoticStrikeDamage, ChaoticStrikeConfusion],
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

const VoidRendBleed: ApplyStatusEffectSkillEffect = {
  id: "void_rend_bleed",
  name: "Void Rend Bleed",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.bleed,
  targetType: TargetType.randomEnemy,
  affinities: [AffinityType.void],
  value: 5,
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

const ShadowEmbraceShield: ApplyStatusEffectSkillEffect = {
  id: "shadow_embrace_shield",
  name: "Shadow Embrace Shield",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.shield,
  targetType: TargetType.self,
  affinities: [AffinityType.void],
  value: 120,
  stackable: true,
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
  damageMultiplier: 1.1,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
  duration: undefined,
};

const SunfireBurstBurn: ApplyStatusEffectSkillEffect = {
  id: "sunfire_burst_burn",
  name: "Sunfire Burst Burn",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.burn,
  targetType: TargetType.allEnemies,
  affinities: [AffinityType.radiance],
  value: 8,
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
const DivineShieldApplyShield: ApplyStatusEffectSkillEffect = {
  id: "divine_shield_apply_shield",
  name: "Divine Shield Shield",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.shield,
  targetType: TargetType.allAllies,
  affinities: [AffinityType.radiance],
  value: 150,
  stackable: true,
};

const DivineShieldCleanse: CleanseSkillEffect = {
  id: "divine_shield_cleanse",
  name: "Divine Shield Cleanse",
  type: SkillEffectType.cleanse,
  affinities: [AffinityType.radiance],
  cleansableEffect: CleansableEffect.statusEffect,
  count: 1,
  targetType: TargetType.allAllies,
};

export const DivineShieldSkill: Skill = {
  id: "divine_shield",
  name: "Divine Shield",
  cost: 45,
  costStat: StatType.energy,
  cooldownTurns: 5,
  effects: [DivineShieldApplyShield, DivineShieldCleanse],
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
  modifierType: ModifierType.Percentage,
  modifierValue: 20,
  duration: 2,
};

export const WildChargeSkill: Skill = {
  id: "wild_charge",
  name: "Wild Charge",
  cost: 20,
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
  modifierType: ModifierType.Percentage,
  modifierValue: -15,
  duration: 3,
};

const PrimalRoarTaunt: ApplyStatusEffectSkillEffect = {
  id: "primal_roar_taunt",
  name: "Primal Roar Taunt",
  type: SkillEffectType.applyStatusEffect,
  statusEffectType: StatusEffectType.taunt,
  targetType: TargetType.randomEnemy,
  affinities: [AffinityType.beast],
  value: 1,
  stackable: false,
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
  modifierType: ModifierType.Flat,
  modifierValue: 30,
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
  damageMultiplier: 0.8,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.allEnemies,
  duration: undefined,
};

const ThreadedBarrageSpeedDebuff: AdjustStatSkillEffect = {
  id: "threaded_barrage_speed_debuff",
  name: "Threaded Barrage Speed Reduction",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.textile],
  targetType: TargetType.allEnemies,
  stat: StatType.speed,
  modifierType: ModifierType.Flat,
  modifierValue: -20,
  duration: 3,
};

export const ThreadedBarrageSkill: Skill = {
  id: "threaded_barrage",
  name: "Threaded Barrage",
  cost: 25,
  costStat: StatType.energy,
  cooldownTurns: 0,
  effects: [ThreadedBarrageDamage, ThreadedBarrageSpeedDebuff],
};
//-----------------------------------------------------------------------------
