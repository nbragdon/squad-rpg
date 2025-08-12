import { BASELINE } from "data/statBaselines";
import { AffinityType } from "../../types/affinity";
import { EnemyCharacter } from "../../types/enemy";
import { Rarity } from "../../types/rarity";
import {
  AdjustmentDirection,
  AdjustStatSkillEffect,
  ApplyBleedStatusEffectSkillEffect,
  ApplyBrittleStatusEffectSkillEffect,
  ApplyBurnStatusEffectSkillEffect,
  ApplyPoisonStatusEffectSkillEffect,
  ApplySilenceStatusEffectSkillEffect,
  ApplySlowStatusEffectSkillEffect,
  ApplyStunStatusEffectSkillEffect,
  DamageSkillEffect,
  HealSkillEffect,
  Skill,
  SkillEffectType,
  TargetType,
  CleanseSkillEffect,
  ApplyTauntStatusEffectSkillEffect,
  ApplyHasteStatusEffectSkillEffect,
  CleansableEffect,
  ApplyShockStatusEffectSkillEffect,
  ApplyShieldStatusEffectSkillEffect,
} from "../../types/skillTypes";
import { StatType } from "../../types/stats";
import { StatusEffectType } from "../../types/statusEffects";

//----------------------------------------------------------------------------
// Legendary Enemies
//----------------------------------------------------------------------------

// 1) Whisperwind Archon - A being of pure sound and air that creates deafening echoes.
const DeafeningEchoDamage: DamageSkillEffect = {
  id: "deafening_echo_damage",
  name: "Deafening Echo Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.spirit, AffinityType.void],
  damageMultiplier: 1.5,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
};

const DeafeningEchoDamage2: DamageSkillEffect = {
  id: "deafening_echo_damage2",
  name: "Deafening Echo Damage2",
  type: SkillEffectType.damage,
  affinities: [AffinityType.spirit, AffinityType.void],
  damageMultiplier: 1.5,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
};

const DeafeningEchoSilence: ApplySilenceStatusEffectSkillEffect = {
  id: "deafening_echo_silence",
  name: "Deafening Echo Silence",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.spirit, AffinityType.void],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.silence,
  value: 2,
  stackable: true,
};

const DeafeningEchoHaste: ApplyHasteStatusEffectSkillEffect = {
  id: "deafening_echo_haste",
  name: "Deafening Echo Haste",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.spirit, AffinityType.void],
  targetType: TargetType.self,
  statusEffectType: StatusEffectType.haste,
  value: 30,
  stackable: true,
};

export const ENEMY_WHISPERWIND_ARCHON: EnemyCharacter = {
  id: "whisperwind_archon",
  name: "Whisperwind Archon",
  rarity: Rarity.LEGENDARY,
  strongAffinities: [AffinityType.spirit, AffinityType.void],
  weakAffinities: [AffinityType.gem],
  stats: {
    [StatType.health]: BASELINE.LEGENDARY[StatType.health] + 120,
    [StatType.energy]: 15,
    [StatType.energyGain]: BASELINE.LEGENDARY[StatType.energyGain] + 4,
    [StatType.strength]: BASELINE.LEGENDARY[StatType.strength] - 80,
    [StatType.defense]: BASELINE.LEGENDARY[StatType.defense] - 50,
    [StatType.magic]: BASELINE.LEGENDARY[StatType.magic] + 80,
    [StatType.magicDefense]: BASELINE.LEGENDARY[StatType.magicDefense] + 60,
    [StatType.speed]: BASELINE.LEGENDARY[StatType.speed] + 60,
    [StatType.critChance]: BASELINE.LEGENDARY[StatType.critChance] + 10,
    [StatType.critDamage]: BASELINE.LEGENDARY[StatType.critDamage] + 20,
  },
  skills: [
    {
      id: "deafening_echo",
      name: "Deafening Echo",
      cost: 60,
      costStat: StatType.energy,
      cooldownTurns: 4,
      effects: [
        DeafeningEchoDamage,
        DeafeningEchoDamage2,
        DeafeningEchoSilence,
        DeafeningEchoHaste,
      ],
    } as Skill,
  ],
};

// 2) Luminary Mycelium - A colossal fungal entity that spreads healing light and toxic spores.
const SporeburstDamage: DamageSkillEffect = {
  id: "sporeburst_damage",
  name: "Sporeburst Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.radiance, AffinityType.beast],
  damageMultiplier: 1.6,
  damageStat: StatType.health,
  defenseStat: StatType.health,
  targetType: TargetType.allEnemies,
};

const SporeburstPoison: ApplyPoisonStatusEffectSkillEffect = {
  id: "sporeburst_poison",
  name: "Sporeburst Poison",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.radiance, AffinityType.beast],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.poison,
  value: 0.2,
  stackable: false,
  stat: StatType.health,
  duration: 2,
};

const SporeburstHealAllies: HealSkillEffect = {
  id: "sporeburst_heal_allies",
  name: "Sporeburst Healing",
  type: SkillEffectType.heal,
  affinities: [AffinityType.radiance, AffinityType.beast],
  targetType: TargetType.allAllies,
  healMultiplier: 0.3,
  healStat: StatType.health,
};

const SporeburstCleanseAllies: CleanseSkillEffect = {
  id: "sporeburst_cleanse_allies",
  name: "Sporeburst Cleanse",
  type: SkillEffectType.cleanse,
  affinities: [AffinityType.radiance, AffinityType.beast],
  targetType: TargetType.allAllies,
  cleansableEffect: CleansableEffect.adjustedStat,
  count: "all",
};

export const ENEMY_LUMINARY_MYCELIUM: EnemyCharacter = {
  id: "luminary_mycelium",
  name: "Luminary Mycelium",
  rarity: Rarity.LEGENDARY,
  strongAffinities: [AffinityType.radiance, AffinityType.beast],
  weakAffinities: [AffinityType.void],
  stats: {
    [StatType.health]: BASELINE.LEGENDARY[StatType.health] + 140,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.LEGENDARY[StatType.energyGain] + 1,
    [StatType.strength]: BASELINE.LEGENDARY[StatType.strength] - 40,
    [StatType.defense]: BASELINE.LEGENDARY[StatType.defense] - 30,
    [StatType.magic]: BASELINE.LEGENDARY[StatType.magic] + 30,
    [StatType.magicDefense]: BASELINE.LEGENDARY[StatType.magicDefense] + 50,
    [StatType.speed]: BASELINE.LEGENDARY[StatType.speed] - 30,
    [StatType.critChance]: BASELINE.LEGENDARY[StatType.critChance],
    [StatType.critDamage]: BASELINE.LEGENDARY[StatType.critDamage],
  },
  skills: [
    {
      id: "sporeburst",
      name: "Sporeburst",
      cost: 65,
      costStat: StatType.energy,
      cooldownTurns: 5,
      effects: [
        SporeburstDamage,
        SporeburstPoison,
        SporeburstHealAllies,
        SporeburstCleanseAllies,
      ],
    } as Skill,
  ],
};

// 3) Fellforged Automaton - A grotesque, arcane war machine animated by dark magic.
const SanguineSmashDamage: DamageSkillEffect = {
  id: "sanguine_smash_damage",
  name: "Sanguine Smash Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.gem, AffinityType.chaos],
  damageMultiplier: 4.0,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
};

const SanguineSmashBrittle: ApplyBrittleStatusEffectSkillEffect = {
  id: "sanguine_smash_brittle",
  name: "Sanguine Smash Brittle",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.gem, AffinityType.chaos],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.brittle,
  value: 50,
  stackable: true,
};

const SanguineSmashSelfBuff: AdjustStatSkillEffect = {
  id: "sanguine_smash_self_buff",
  name: "Sanguine Smash Self Buff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem, AffinityType.chaos],
  targetType: TargetType.self,
  stat: StatType.strength,
  direction: AdjustmentDirection.increase,
  modifierValue: 35,
  duration: 4,
};

const SanguineSmashDefenseBuff: AdjustStatSkillEffect = {
  id: "sanguine_smash_defense_buff",
  name: "Sanguine Smash Defense Buff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.gem, AffinityType.chaos],
  targetType: TargetType.self,
  stat: StatType.defense,
  direction: AdjustmentDirection.increase,
  modifierValue: 35,
  duration: 4,
};

export const ENEMY_FELLFORGED_AUTOMATON: EnemyCharacter = {
  id: "fellforged_automaton",
  name: "Fellforged Automaton",
  rarity: Rarity.LEGENDARY,
  strongAffinities: [AffinityType.gem, AffinityType.chaos],
  weakAffinities: [AffinityType.textile],
  stats: {
    [StatType.health]: BASELINE.LEGENDARY[StatType.health] + 80,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.LEGENDARY[StatType.energyGain] - 1,
    [StatType.strength]: BASELINE.LEGENDARY[StatType.strength] + 70,
    [StatType.defense]: BASELINE.LEGENDARY[StatType.defense] + 65,
    [StatType.magic]: BASELINE.LEGENDARY[StatType.magic] - 40,
    [StatType.magicDefense]: BASELINE.LEGENDARY[StatType.magicDefense] - 30,
    [StatType.speed]: BASELINE.LEGENDARY[StatType.speed] - 25,
    [StatType.critChance]: BASELINE.LEGENDARY[StatType.critChance],
    [StatType.critDamage]: BASELINE.LEGENDARY[StatType.critDamage],
  },
  skills: [
    {
      id: "sanguine_smash",
      name: "Sanguine Smash",
      cost: 45,
      costStat: StatType.energy,
      cooldownTurns: 6,
      effects: [
        SanguineSmashDamage,
        SanguineSmashBrittle,
        SanguineSmashSelfBuff,
        SanguineSmashDefenseBuff,
      ],
    } as Skill,
  ],
};

// 4) Chthonian Leviathan - A titanic sea creature from the darkest depths.
const CrushingAbyssDamage: DamageSkillEffect = {
  id: "crushing_abyss_damage",
  name: "Crushing Abyss Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.beast, AffinityType.textile],
  damageMultiplier: 1.7,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.allEnemies,
};

const CrushingAbyssBleed: ApplyBleedStatusEffectSkillEffect = {
  id: "crushing_abyss_bleed",
  name: "Crushing Abyss Bleed",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.beast, AffinityType.textile],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.bleed,
  value: 15,
  stackable: true,
};

const CrushingAbyssSlow: ApplySlowStatusEffectSkillEffect = {
  id: "crushing_abyss_slow",
  name: "Crushing Abyss Slow",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.beast, AffinityType.textile],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.slow,
  value: 20,
  stackable: true,
};

const CrushingAbyssTaunt: ApplyTauntStatusEffectSkillEffect = {
  id: "crushing_abyss_taunt",
  name: "Crushing Abyss Taunt",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.beast, AffinityType.textile],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.taunt,
  value: 2,
  stackable: true,
};

export const ENEMY_CHTHONIAN_LEVIATHAN: EnemyCharacter = {
  id: "chthonian_leviathan",
  name: "Chthonian Leviathan",
  rarity: Rarity.LEGENDARY,
  strongAffinities: [AffinityType.beast, AffinityType.textile],
  weakAffinities: [AffinityType.radiance],
  stats: {
    [StatType.health]: BASELINE.LEGENDARY[StatType.health] + 80,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.LEGENDARY[StatType.energyGain],
    [StatType.strength]: BASELINE.LEGENDARY[StatType.strength] + 60,
    [StatType.defense]: BASELINE.LEGENDARY[StatType.defense] + 60,
    [StatType.magic]: BASELINE.LEGENDARY[StatType.magic] - 30,
    [StatType.magicDefense]: BASELINE.LEGENDARY[StatType.magicDefense] + 60,
    [StatType.speed]: BASELINE.LEGENDARY[StatType.speed] - 20,
    [StatType.critChance]: BASELINE.LEGENDARY[StatType.critChance],
    [StatType.critDamage]: BASELINE.LEGENDARY[StatType.critDamage],
  },
  skills: [
    {
      id: "crushing_abyss",
      name: "Crushing Abyss",
      cost: 65,
      costStat: StatType.energy,
      cooldownTurns: 6,
      effects: [
        CrushingAbyssDamage,
        CrushingAbyssBleed,
        CrushingAbyssSlow,
        CrushingAbyssTaunt,
      ],
    } as Skill,
  ],
};

// 5) Sovereign of the Weald - An ancient, sentient forest that ensnares and poisons enemies.
const BrambleEntanglementDamage: DamageSkillEffect = {
  id: "bramble_entanglement_damage",
  name: "Bramble Entanglement Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.knowledge, AffinityType.beast],
  damageMultiplier: 1.5,
  damageStat: StatType.magic,
  defenseStat: StatType.speed,
  targetType: TargetType.allEnemies,
};

const BrambleEntanglementPoison: ApplyPoisonStatusEffectSkillEffect = {
  id: "bramble_entanglement_poison",
  name: "Bramble Entanglement Poison",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.knowledge, AffinityType.beast],
  targetType: TargetType.allEnemies,
  statusEffectType: StatusEffectType.poison,
  value: 0.2,
  stackable: false,
  stat: StatType.magic,
  duration: 4,
};

const BrambleEntanglementDefenseDebuff: AdjustStatSkillEffect = {
  id: "bramble_entanglement_defense_debuff",
  name: "Bramble Entanglement Defense Debuff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.knowledge, AffinityType.beast],
  targetType: TargetType.allEnemies,
  userStat: StatType.magic,
  stat: StatType.defense,
  direction: AdjustmentDirection.decrease,
  modifierValue: 30,
  duration: 4,
};

const BrambleEntanglementSpeedDebuff: AdjustStatSkillEffect = {
  id: "bramble_entanglement_speed_debuff",
  name: "Bramble Entanglement Speed Debuff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.knowledge, AffinityType.beast],
  targetType: TargetType.allEnemies,
  userStat: StatType.magic,
  stat: StatType.speed,
  direction: AdjustmentDirection.decrease,
  modifierValue: 30,
  duration: 4,
};

export const ENEMY_SOVEREIGN_OF_THE_WEALD: EnemyCharacter = {
  id: "sovereign_of_the_weald",
  name: "Sovereign of the Weald",
  rarity: Rarity.LEGENDARY,
  strongAffinities: [AffinityType.knowledge, AffinityType.beast],
  weakAffinities: [AffinityType.chaos],
  stats: {
    [StatType.health]: BASELINE.LEGENDARY[StatType.health] + 50,
    [StatType.energy]: 0,
    [StatType.energyGain]: BASELINE.LEGENDARY[StatType.energyGain] + 2,
    [StatType.strength]: BASELINE.LEGENDARY[StatType.strength] + 10,
    [StatType.defense]: BASELINE.LEGENDARY[StatType.defense] + 40,
    [StatType.magic]: BASELINE.LEGENDARY[StatType.magic] + 55,
    [StatType.magicDefense]: BASELINE.LEGENDARY[StatType.magicDefense] + 30,
    [StatType.speed]: BASELINE.LEGENDARY[StatType.speed] - 30,
    [StatType.critChance]: BASELINE.LEGENDARY[StatType.critChance],
    [StatType.critDamage]: BASELINE.LEGENDARY[StatType.critDamage],
  },
  skills: [
    {
      id: "bramble_entanglement",
      name: "Bramble Entanglement",
      cost: 55,
      costStat: StatType.energy,
      cooldownTurns: 4,
      effects: [
        BrambleEntanglementDamage,
        BrambleEntanglementPoison,
        BrambleEntanglementDefenseDebuff,
        BrambleEntanglementSpeedDebuff,
      ],
    } as Skill,
  ],
};

// 6) Riftbound Mimic - A creature that mimics abilities and corrupts them.
const CorruptedCopyMagicDamage: DamageSkillEffect = {
  id: "corrupted_copy_magic_damage",
  name: "Corrupted Copy Magic Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.void, AffinityType.gem],
  damageMultiplier: 1.5,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.lowestHealthEnemy,
};

const CorruptedCopyPhysicalDamage: DamageSkillEffect = {
  id: "corrupted_copy_physical_damage",
  name: "Corrupted Copy Physical Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.void, AffinityType.gem],
  damageMultiplier: 1.5,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.lowestHealthEnemy,
};

const CorruptedCopyStrengthReduction: AdjustStatSkillEffect = {
  id: "corrupted_copy_strength_reduction",
  name: "Corrupted Copy Strength Reduction",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.void, AffinityType.gem],
  targetType: TargetType.lowestHealthEnemy,
  stat: StatType.strength,
  direction: AdjustmentDirection.decrease,
  modifierValue: 25,
  duration: 3,
};

const CorruptedCopyStrengthIncrease: AdjustStatSkillEffect = {
  id: "corrupted_copy_strength_increase",
  name: "Corrupted Copy Strength Increase",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.void, AffinityType.gem],
  targetType: TargetType.self,
  stat: StatType.strength,
  direction: AdjustmentDirection.increase,
  modifierValue: 25,
  duration: 3,
};

const CorruptedCopyMagicReduction: AdjustStatSkillEffect = {
  id: "corrupted_copy_magic_reduction",
  name: "Corrupted Copy Magic Reduction",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.void, AffinityType.gem],
  targetType: TargetType.lowestHealthEnemy,
  stat: StatType.magic,
  direction: AdjustmentDirection.decrease,
  modifierValue: 25,
  duration: 3,
};

const CorruptedCopyMagicIncrease: AdjustStatSkillEffect = {
  id: "corrupted_copy_magic_increase",
  name: "Corrupted Copy Magic Increase",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.void, AffinityType.gem],
  targetType: TargetType.self,
  stat: StatType.magic,
  direction: AdjustmentDirection.increase,
  modifierValue: 25,
  duration: 3,
};

export const ENEMY_RIFTBOUND_MIMIC: EnemyCharacter = {
  id: "riftbound_mimic",
  name: "Riftbound Mimic",
  rarity: Rarity.LEGENDARY,
  strongAffinities: [AffinityType.void, AffinityType.gem],
  weakAffinities: [AffinityType.radiance],
  stats: {
    [StatType.health]: BASELINE.LEGENDARY[StatType.health] + 55,
    [StatType.energy]: 15,
    [StatType.energyGain]: BASELINE.LEGENDARY[StatType.energyGain] + 2,
    [StatType.strength]: BASELINE.LEGENDARY[StatType.strength] + 55,
    [StatType.defense]: BASELINE.LEGENDARY[StatType.defense] + 55,
    [StatType.magic]: BASELINE.LEGENDARY[StatType.magic] + 55,
    [StatType.magicDefense]: BASELINE.LEGENDARY[StatType.magicDefense] + 55,
    [StatType.speed]: BASELINE.LEGENDARY[StatType.speed] + 55,
    [StatType.critChance]: BASELINE.LEGENDARY[StatType.critChance] + 20,
    [StatType.critDamage]: BASELINE.LEGENDARY[StatType.critDamage] + 35,
  },
  skills: [
    {
      id: "corrupted_copy",
      name: "Corrupted Copy",
      cost: 65,
      costStat: StatType.energy,
      cooldownTurns: 4,
      effects: [
        CorruptedCopyMagicDamage,
        CorruptedCopyPhysicalDamage,
        CorruptedCopyStrengthReduction,
        CorruptedCopyStrengthIncrease,
        CorruptedCopyMagicReduction,
        CorruptedCopyMagicIncrease,
      ],
    } as Skill,
  ],
};

// 7) Cerulean Eidolon - A ghostly figure made of cold, ethereal fire.
const SpectralFlameDamage: DamageSkillEffect = {
  id: "spectral_flame_damage",
  name: "Spectral Flame Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.spirit, AffinityType.chaos],
  damageMultiplier: 2.2,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
};

const SpectralFlameBurn: ApplyBurnStatusEffectSkillEffect = {
  id: "spectral_flame_burn",
  name: "Spectral Flame Burn",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.spirit, AffinityType.chaos],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.burn,
  value: 30,
  stackable: true,
};

const SpectralFlameHaste: ApplyHasteStatusEffectSkillEffect = {
  id: "spectral_flame_burn",
  name: "Spectral Flame Burn",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.spirit, AffinityType.chaos],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.haste,
  value: 30,
  stackable: true,
};

const SpectralFlameMagicStrengthReduction: AdjustStatSkillEffect = {
  id: "spectral_flame_magic_strength_reduction",
  name: "Spectral Flame Magic Defense Buff",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.spirit, AffinityType.chaos],
  targetType: TargetType.randomEnemy,
  stat: StatType.strength,
  direction: AdjustmentDirection.decrease,
  modifierValue: 50,
  duration: 3,
};

export const ENEMY_CERULEAN_EIDOLON: EnemyCharacter = {
  id: "cerulean_eidolon",
  name: "Cerulean Eidolon",
  rarity: Rarity.LEGENDARY,
  strongAffinities: [AffinityType.spirit, AffinityType.chaos],
  weakAffinities: [AffinityType.radiance],
  stats: {
    [StatType.health]: BASELINE.LEGENDARY[StatType.health] + 60,
    [StatType.energy]: 10,
    [StatType.energyGain]: BASELINE.LEGENDARY[StatType.energyGain] + 3,
    [StatType.strength]: BASELINE.LEGENDARY[StatType.strength] - 20,
    [StatType.defense]: BASELINE.LEGENDARY[StatType.defense] - 10,
    [StatType.magic]: BASELINE.LEGENDARY[StatType.magic] + 75,
    [StatType.magicDefense]: BASELINE.LEGENDARY[StatType.magicDefense] + 50,
    [StatType.speed]: BASELINE.LEGENDARY[StatType.speed] + 30,
    [StatType.critChance]: BASELINE.LEGENDARY[StatType.critChance] + 15,
    [StatType.critDamage]: BASELINE.LEGENDARY[StatType.critDamage] + 25,
  },
  skills: [
    {
      id: "spectral_flame",
      name: "Spectral Flame",
      cost: 60,
      costStat: StatType.energy,
      cooldownTurns: 4,
      effects: [
        SpectralFlameDamage,
        SpectralFlameBurn,
        SpectralFlameHaste,
        SpectralFlameMagicStrengthReduction,
      ],
    } as Skill,
  ],
};

// 8) Gravewrought Effigy - A cursed doll that inflicts terrible curses.
const VexingCurseDamage: DamageSkillEffect = {
  id: "vexing_curse_damage",
  name: "Vexing Curse Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.textile, AffinityType.void],
  damageMultiplier: 1.4,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.randomEnemy,
};

const VexingCurseStun: ApplyStunStatusEffectSkillEffect = {
  id: "vexing_curse_stun",
  name: "Vexing Curse Stun",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.textile, AffinityType.void],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.stun,
  value: 1,
  stackable: true,
};

const VexingCurseBleed: ApplyBleedStatusEffectSkillEffect = {
  id: "vexing_curse_bleed",
  name: "Vexing Curse Bleed",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.textile, AffinityType.void],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.bleed,
  value: 3,
  stackable: true,
};

const VexingCurseShock: ApplyShockStatusEffectSkillEffect = {
  id: "vexing_curse_shock",
  name: "Vexing Curse Shock",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.textile, AffinityType.void],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.shock,
  value: 4,
  stackable: true,
};

const VexingCurseBrittle: ApplyBrittleStatusEffectSkillEffect = {
  id: "vexing_curse_brittle",
  name: "Vexing Curse Brittle",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.textile, AffinityType.void],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.brittle,
  value: 40,
  stackable: true,
};

const VexingCurseDefenseReduction: AdjustStatSkillEffect = {
  id: "vexing_curse_defense_reduction",
  name: "Vexing Curse Defense Reduction",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.textile, AffinityType.void],
  targetType: TargetType.randomEnemy,
  stat: StatType.defense,
  direction: AdjustmentDirection.decrease,
  modifierValue: 25,
  duration: 3,
};

const VexingCurseMagicDefenseReduction: AdjustStatSkillEffect = {
  id: "vexing_curse_magic_defense_reduction",
  name: "Vexing Curse Magic Defense Reduction",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.textile, AffinityType.void],
  targetType: TargetType.randomEnemy,
  stat: StatType.magicDefense,
  direction: AdjustmentDirection.decrease,
  modifierValue: 25,
  duration: 3,
};

export const ENEMY_GRAVEWROUGHT_EFFIGY: EnemyCharacter = {
  id: "gravewrought_effigy",
  name: "Gravewrought Effigy",
  rarity: Rarity.LEGENDARY,
  strongAffinities: [AffinityType.textile, AffinityType.void],
  weakAffinities: [AffinityType.radiance],
  stats: {
    [StatType.health]: BASELINE.LEGENDARY[StatType.health] + 50,
    [StatType.energy]: 15,
    [StatType.energyGain]: BASELINE.LEGENDARY[StatType.energyGain] + 4,
    [StatType.strength]: BASELINE.LEGENDARY[StatType.strength] + 20,
    [StatType.defense]: BASELINE.LEGENDARY[StatType.defense] + 25,
    [StatType.magic]: BASELINE.LEGENDARY[StatType.magic] + 30,
    [StatType.magicDefense]: BASELINE.LEGENDARY[StatType.magicDefense] + 25,
    [StatType.speed]: BASELINE.LEGENDARY[StatType.speed] + 30,
    [StatType.critChance]: BASELINE.LEGENDARY[StatType.critChance] + 30,
    [StatType.critDamage]: BASELINE.LEGENDARY[StatType.critDamage] + 10,
  },
  skills: [
    {
      id: "vexing_curse",
      name: "Vexing Curse",
      cost: 60,
      costStat: StatType.energy,
      cooldownTurns: 3,
      effects: [
        VexingCurseDamage,
        VexingCurseStun,
        VexingCurseBleed,
        VexingCurseShock,
        VexingCurseBrittle,
        VexingCurseDefenseReduction,
        VexingCurseMagicDefenseReduction,
      ],
    } as Skill,
  ],
};

// 9) Solaris Chimera - A mythical beast with the ferocity of a lion and the heat of the sun.
const SolarRoarDamage: DamageSkillEffect = {
  id: "solar_roar_damage",
  name: "Solar Roar Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.radiance, AffinityType.beast],
  damageMultiplier: 1.65,
  damageStat: StatType.strength,
  defenseStat: StatType.defense,
  targetType: TargetType.randomEnemy,
};

const SolarRoarHealSelf: HealSkillEffect = {
  id: "solar_roar_heal_self",
  name: "Solar Roar Heal",
  type: SkillEffectType.heal,
  affinities: [AffinityType.radiance, AffinityType.beast],
  targetType: TargetType.self,
  healMultiplier: 0.35,
  healStat: StatType.health,
};

const SolarRoarCritChanceIncrease: AdjustStatSkillEffect = {
  id: "solar_roar_crit_chance_increase",
  name: "Solar Roar Crit Chance Increase",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.radiance, AffinityType.beast],
  targetType: TargetType.self,
  stat: StatType.critChance,
  direction: AdjustmentDirection.increase,
  modifierValue: 150,
  duration: 4,
};

const SolarRoarCritDamageIncrease: AdjustStatSkillEffect = {
  id: "solar_roar_crit_damage_increase",
  name: "Solar Roar Crit Damage Increase",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.radiance, AffinityType.beast],
  targetType: TargetType.self,
  stat: StatType.critDamage,
  direction: AdjustmentDirection.increase,
  modifierValue: 100,
  duration: 4,
};

export const ENEMY_SOLARIS_CHIMERA: EnemyCharacter = {
  id: "solaris_chimera",
  name: "Solaris Chimera",
  rarity: Rarity.LEGENDARY,
  strongAffinities: [AffinityType.radiance, AffinityType.beast],
  weakAffinities: [AffinityType.void],
  stats: {
    [StatType.health]: BASELINE.LEGENDARY[StatType.health] + 70,
    [StatType.energy]: 20,
    [StatType.energyGain]: BASELINE.LEGENDARY[StatType.energyGain] + 2,
    [StatType.strength]: BASELINE.LEGENDARY[StatType.strength] + 60,
    [StatType.defense]: BASELINE.LEGENDARY[StatType.defense] + 30,
    [StatType.magic]: BASELINE.LEGENDARY[StatType.magic] - 10,
    [StatType.magicDefense]: BASELINE.LEGENDARY[StatType.magicDefense],
    [StatType.speed]: BASELINE.LEGENDARY[StatType.speed] + 35,
    [StatType.critChance]: BASELINE.LEGENDARY[StatType.critChance] + 30,
    [StatType.critDamage]: BASELINE.LEGENDARY[StatType.critDamage] + 80,
  },
  skills: [
    {
      id: "solar_roar",
      name: "Solar Roar",
      cost: 50,
      costStat: StatType.energy,
      cooldownTurns: 4,
      effects: [
        SolarRoarDamage,
        SolarRoarHealSelf,
        SolarRoarCritChanceIncrease,
        SolarRoarCritDamageIncrease,
      ],
    } as Skill,
  ],
};

// 10) Maelstrom Vortex - A swirling entity of pure chaos and elemental fury.
const UnstableNexusDamage: DamageSkillEffect = {
  id: "unstable_nexus_damage",
  name: "Unstable Nexus Damage",
  type: SkillEffectType.damage,
  affinities: [AffinityType.chaos, AffinityType.knowledge],
  damageMultiplier: 1.4,
  damageStat: StatType.magic,
  defenseStat: StatType.magicDefense,
  targetType: TargetType.allEnemies,
};

const UnstableNexusShield: ApplyShieldStatusEffectSkillEffect = {
  id: "unstable_nexus_shield",
  name: "Unstable Nexus Shield",
  type: SkillEffectType.applyStatusEffect,
  affinities: [AffinityType.chaos, AffinityType.knowledge],
  targetType: TargetType.randomEnemy,
  statusEffectType: StatusEffectType.shield,
  value: 0.2,
  stackable: true,
  stat: StatType.magic,
};

const UnstableNexusMagicIncrease: AdjustStatSkillEffect = {
  id: "unsable_nexus_magic_increase",
  name: "Unstable Nexus Magic Increase",
  type: SkillEffectType.adjustStat,
  affinities: [AffinityType.chaos, AffinityType.knowledge],
  targetType: TargetType.self,
  stat: StatType.magic,
  direction: AdjustmentDirection.increase,
  modifierValue: 80,
  duration: 2,
};

export const ENEMY_MAELSTROM_VORTEX: EnemyCharacter = {
  id: "maelstrom_vortex",
  name: "Maelstrom Vortex",
  rarity: Rarity.LEGENDARY,
  strongAffinities: [AffinityType.chaos, AffinityType.knowledge],
  weakAffinities: [AffinityType.textile],
  stats: {
    [StatType.health]: BASELINE.LEGENDARY[StatType.health] + 60,
    [StatType.energy]: 20,
    [StatType.energyGain]: BASELINE.LEGENDARY[StatType.energyGain] + 8,
    [StatType.strength]: BASELINE.LEGENDARY[StatType.strength] - 30,
    [StatType.defense]: BASELINE.LEGENDARY[StatType.defense] - 25,
    [StatType.magic]: BASELINE.LEGENDARY[StatType.magic] + 85,
    [StatType.magicDefense]: BASELINE.LEGENDARY[StatType.magicDefense] + 35,
    [StatType.speed]: BASELINE.LEGENDARY[StatType.speed] + 60,
    [StatType.critChance]: BASELINE.LEGENDARY[StatType.critChance] + 10,
    [StatType.critDamage]: BASELINE.LEGENDARY[StatType.critDamage] + 10,
  },
  skills: [
    {
      id: "unstable_nexus",
      name: "Unstable Nexus",
      cost: 45,
      costStat: StatType.energy,
      cooldownTurns: 1,
      effects: [
        UnstableNexusDamage,
        UnstableNexusShield,
        UnstableNexusMagicIncrease,
      ],
    } as Skill,
  ],
};

export const LEGENDARY_ENEMIES = [
  ENEMY_CERULEAN_EIDOLON,
  ENEMY_CHTHONIAN_LEVIATHAN,
  ENEMY_FELLFORGED_AUTOMATON,
  ENEMY_GRAVEWROUGHT_EFFIGY,
  ENEMY_LUMINARY_MYCELIUM,
  ENEMY_MAELSTROM_VORTEX,
  ENEMY_RIFTBOUND_MIMIC,
  ENEMY_SOLARIS_CHIMERA,
  ENEMY_SOVEREIGN_OF_THE_WEALD,
  ENEMY_WHISPERWIND_ARCHON,
];
