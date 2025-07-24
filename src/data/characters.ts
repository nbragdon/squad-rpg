// 50 unique characters for gacha, distributed by rarity and class
import { CharacterBase, CharacterClass, Rarity, Skill } from '../types/game';
import * as basicSkills1 from './skills/basicSkills1';
import * as basicSkills2 from './skills/basicSkills2';
import * as basicSkills3 from './skills/basicSkills3';
import * as basicSkills4 from './skills/basicSkills4';
import * as basicSkills5 from './skills/basicSkills5';
import * as basicSkills6 from './skills/basicSkills6';
import * as basicSkills7 from './skills/basicSkills7';
import * as basicSkillsPlaguedoctor from './skills/basicSkills_plaguedoctor';
import * as basicSkillsSoulreaper from './skills/basicSkills_soulreaper';
import * as basicSkillsStarcaller from './skills/basicSkills_starcaller';
import * as basicSkillsTimeshaper from './skills/basicSkills_timeshaper';
import {
    abyssalGrasp,
    arcaneCataclysm,
    bardEncore,
    bloodKnightCrimsonPact,
    bloodMoon,
    chronomancerTimeLock,
    clericSanctuary,
    demonslayerBanish,
    divineLight,
    dragonRoar,
    druidWildGrowth,
    frostNova,
    heroicCharge,
    hunterVolley,
    infernalChains,
    lichFrozenTomb,
    meteorStorm,
    monkTranquility,
    necromancerSoulHarvest,
    plagueDoctorPandemic,
    primalRage,
    radiantGrace,
    rogueAmbush,
    shadowClone,
    shadowdancerNightfall,
    soulreaperHarvest,
    spectralVeil,
    spiritLink,
    starcallerSupernova,
    voidCollapse,
    warriorFury,
    wizardCataclysm
} from './skills/ultimateSkills';
import { BASELINE } from './statBaselines';

// --- Unique Skill Definitions (examples, expand as needed) ---
export const flameStrike: Skill = {
    id: 'flame_strike',
    name: 'Flame Strike',
    description: 'Deal heavy fire damage and apply Burn (damage over time).',
    damage: 180,
    cooldown: 2,
    range: 2,
    manaCost: 20,
    isUltimate: false,
    statusEffect: { type: 'burn', duration: 3, value: 30 }
};

export const iceBlast: Skill = {
    id: 'ice_blast',
    name: 'Ice Blast',
    description: 'Deal cold damage and reduce target speed (Chill).',
    damage: 120,
    cooldown: 2,
    range: 3,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'chill', duration: 2, value: -20 }
};

export const venomDagger: Skill = {
    id: 'venom_dagger',
    name: 'Venom Dagger',
    description: 'Deal damage and apply Poison (damage each turn).',
    damage: 90,
    cooldown: 1,
    range: 1,
    manaCost: 10,
    isUltimate: false,
    statusEffect: { type: 'poison', duration: 4, value: 25 }
};

export const divineAegis: Skill = {
    id: 'divine_aegis',
    name: 'Divine Aegis',
    description: 'Grant a shield that reduces all damage taken.',
    cooldown: 3,
    range: 1,
    manaCost: 25,
    isUltimate: false,
    statusEffect: { type: 'damage_reduction', duration: 2, value: 0.5 }
};

export const quickHeal: Skill = {
    id: 'quick_heal',
    name: 'Quick Heal',
    description: 'Instantly heal an ally.',
    healing: 120,
    cooldown: 1,
    range: 2,
    manaCost: 15,
    isUltimate: false
};

export const berserk: Skill = {
    id: 'berserk',
    name: 'Berserk',
    description: 'Increase own attack for 3 turns.',
    cooldown: 4,
    range: 0,
    manaCost: 0,
    isUltimate: false,
    statusEffect: { type: 'attack_up', duration: 3, value: 40 }
};

export const shadowStep: Skill = {
    id: 'shadow_step',
    name: 'Shadow Step',
    description: 'Evade next attack and gain speed.',
    cooldown: 3,
    range: 0,
    manaCost: 0,
    isUltimate: false,
    statusEffect: { type: 'evasion', duration: 1, value: 1 }
};

export const fireball: Skill = {
    id: 'fireball',
    name: 'Fireball',
    description: 'Deal fire damage to a single enemy and apply Burn.',
    damage: 140,
    cooldown: 2,
    range: 3,
    manaCost: 18,
    isUltimate: false,
    statusEffect: { type: 'burn', duration: 2, value: 20 }
};

// Gacha pool: base character definitions
export const gachaCharacters: CharacterBase[] = [
    // 15 Common
    { id: 'warrior_1', name: 'Ironfoot', class: CharacterClass.WARRIOR, rarity: Rarity.COMMON, maxHealth: BASELINE.COMMON.MAX_HEALTH + 50, maxEnergy: BASELINE.COMMON.MAX_ENERGY, energyGain: BASELINE.COMMON.ENERGY_GAIN, attack: BASELINE.COMMON.ATTACK + 20, defense: BASELINE.COMMON.DEFENSE - 10, speed: BASELINE.COMMON.SPEED, skills: [basicSkills1.flameStrike, basicSkills1.stoneSkin], ultimateSkill: warriorFury },
    { id: 'rogue_1', name: 'Quickblade', class: CharacterClass.ROGUE, rarity: Rarity.COMMON, maxHealth: BASELINE.COMMON.MAX_HEALTH - 20, maxEnergy: BASELINE.COMMON.MAX_ENERGY - 20, energyGain: BASELINE.COMMON.ENERGY_GAIN + 1, attack: BASELINE.COMMON.ATTACK + 5, defense: BASELINE.COMMON.DEFENSE - 15, speed: BASELINE.COMMON.SPEED - 5, skills: [basicSkills1.venomDagger, basicSkills1.quickStab], ultimateSkill: rogueAmbush },
    { id: 'wizard_1', name: 'Stormweaver', class: CharacterClass.WIZARD, rarity: Rarity.COMMON, maxHealth: BASELINE.COMMON.MAX_HEALTH - 60, maxEnergy: BASELINE.COMMON.MAX_ENERGY - 10, energyGain: BASELINE.COMMON.ENERGY_GAIN - 1, attack: BASELINE.COMMON.ATTACK + 20, defense: BASELINE.COMMON.DEFENSE - 30, speed: BASELINE.COMMON.SPEED, skills: [basicSkills1.arcaneBolt, basicSkills1.thunderClap], ultimateSkill: wizardCataclysm },
    { id: 'cleric_1', name: 'Lightbringer', class: CharacterClass.CLERIC, rarity: Rarity.COMMON, maxHealth: BASELINE.COMMON.MAX_HEALTH - 40, maxEnergy: BASELINE.COMMON.MAX_ENERGY - 15, energyGain: BASELINE.COMMON.ENERGY_GAIN - 1, attack: BASELINE.COMMON.ATTACK - 20, defense: BASELINE.COMMON.DEFENSE - 40, speed: BASELINE.COMMON.SPEED - 15, skills: [basicSkills1.quickHeal, basicSkills1.holyLight], ultimateSkill: clericSanctuary },
    { id: 'hunter_1', name: 'Wolfsbane', class: CharacterClass.HUNTER, rarity: Rarity.COMMON, maxHealth: BASELINE.COMMON.MAX_HEALTH - 10, maxEnergy: BASELINE.COMMON.MAX_ENERGY - 20, energyGain: BASELINE.COMMON.ENERGY_GAIN, attack: BASELINE.COMMON.ATTACK + 10, defense: BASELINE.COMMON.DEFENSE - 25, speed: BASELINE.COMMON.SPEED - 10, skills: [basicSkills2.burningLash, basicSkills1.cripplingShot], ultimateSkill: hunterVolley },
    { id: 'priest_1', name: 'Grimward', class: CharacterClass.PRIEST, rarity: Rarity.COMMON, maxHealth: BASELINE.COMMON.MAX_HEALTH, maxEnergy: BASELINE.COMMON.MAX_ENERGY - 40, energyGain: BASELINE.COMMON.ENERGY_GAIN - 1, attack: BASELINE.COMMON.ATTACK - 10, defense: BASELINE.COMMON.DEFENSE - 30, speed: BASELINE.COMMON.SPEED - 20, skills: [basicSkills1.holyLight, basicSkills2.radiantPulse], ultimateSkill: divineLight },
    { id: 'warlock_1', name: 'Doomcaster', class: CharacterClass.WARLOCK, rarity: Rarity.COMMON, maxHealth: BASELINE.COMMON.MAX_HEALTH - 40, maxEnergy: BASELINE.COMMON.MAX_ENERGY - 30, energyGain: BASELINE.COMMON.ENERGY_GAIN, attack: BASELINE.COMMON.ATTACK + 20, defense: BASELINE.COMMON.DEFENSE - 40, speed: BASELINE.COMMON.SPEED - 15, skills: [basicSkills1.arcaneBolt, basicSkills2.shadowSlash], ultimateSkill: arcaneCataclysm },
    { id: 'ranger_1', name: 'Sharpshooter', class: CharacterClass.RANGER, rarity: Rarity.COMMON, maxHealth: BASELINE.COMMON.MAX_HEALTH - 20, maxEnergy: BASELINE.COMMON.MAX_ENERGY - 35, energyGain: BASELINE.COMMON.ENERGY_GAIN, attack: BASELINE.COMMON.ATTACK + 15, defense: BASELINE.COMMON.DEFENSE - 35, speed: BASELINE.COMMON.SPEED - 10, skills: [basicSkills1.piercingArrow, basicSkills2.thunderArrow], ultimateSkill: hunterVolley },
    { id: 'assassin_1', name: 'Nightshade', class: CharacterClass.ASSASSIN, rarity: Rarity.COMMON, maxHealth: BASELINE.COMMON.MAX_HEALTH - 100, maxEnergy: BASELINE.COMMON.MAX_ENERGY - 50, energyGain: BASELINE.COMMON.ENERGY_GAIN - 1, attack: BASELINE.COMMON.ATTACK + 20, defense: BASELINE.COMMON.DEFENSE - 45, speed: BASELINE.COMMON.SPEED + 10, skills: [basicSkills1.quickStab, basicSkills2.toxicSpit], ultimateSkill: shadowClone },
    { id: 'monk_1', name: 'Strongfist', class: CharacterClass.MONK, rarity: Rarity.COMMON, maxHealth: BASELINE.COMMON.MAX_HEALTH + 20, maxEnergy: BASELINE.COMMON.MAX_ENERGY - 45, energyGain: BASELINE.COMMON.ENERGY_GAIN - 1, attack: BASELINE.COMMON.ATTACK + 10, defense: BASELINE.COMMON.DEFENSE - 10, speed: BASELINE.COMMON.SPEED - 5, skills: [basicSkills3.ironFist, basicSkills3.quickSlash], ultimateSkill: monkTranquility },
    { id: 'bard_1', name: 'Songbird', class: CharacterClass.BARD, rarity: Rarity.COMMON, maxHealth: BASELINE.COMMON.MAX_HEALTH + 20, maxEnergy: BASELINE.COMMON.MAX_ENERGY - 35, energyGain: BASELINE.COMMON.ENERGY_GAIN - 1, attack: BASELINE.COMMON.ATTACK + 15, defense: BASELINE.COMMON.DEFENSE - 10, speed: BASELINE.COMMON.SPEED - 5, skills: [basicSkills4.healingChant, basicSkills4.rally], ultimateSkill: bardEncore },
    { id: 'druid_1', name: 'Leafdancer', class: CharacterClass.DRUID, rarity: Rarity.COMMON, maxHealth: BASELINE.COMMON.MAX_HEALTH + 40, maxEnergy: BASELINE.COMMON.MAX_ENERGY - 30, energyGain: BASELINE.COMMON.ENERGY_GAIN - 1, attack: BASELINE.COMMON.ATTACK + 20, defense: BASELINE.COMMON.DEFENSE - 5, speed: BASELINE.COMMON.SPEED - 10, skills: [basicSkills4.shieldWall, basicSkills4.frostArmor], ultimateSkill: druidWildGrowth },
    { id: 'necromancer_1', name: 'Grave Whisper', class: CharacterClass.NECROMANCER, rarity: Rarity.COMMON, maxHealth: BASELINE.COMMON.MAX_HEALTH + 90, maxEnergy: BASELINE.COMMON.MAX_ENERGY + 20, energyGain: BASELINE.COMMON.ENERGY_GAIN - 1, attack: BASELINE.COMMON.ATTACK + 60, defense: BASELINE.COMMON.DEFENSE, speed: BASELINE.COMMON.SPEED + 5, skills: [basicSkills2.drainingTouch, basicSkills4.vampiricTouch], ultimateSkill: necromancerSoulHarvest },
    { id: 'lich_1', name: 'Frostwraith', class: CharacterClass.LICH, rarity: Rarity.COMMON, maxHealth: BASELINE.COMMON.MAX_HEALTH + 170, maxEnergy: BASELINE.COMMON.MAX_ENERGY + 40, energyGain: BASELINE.COMMON.ENERGY_GAIN - 1, attack: BASELINE.COMMON.ATTACK + 80, defense: BASELINE.COMMON.DEFENSE + 10, speed: BASELINE.COMMON.SPEED + 10, skills: [basicSkills3.chillingTouch, basicSkills4.blindingLight], ultimateSkill: lichFrozenTomb },
    // 10 Uncommon (10% higher stats)
    { id: 'starforged_1', name: 'Astraeus', class: CharacterClass.STARFORGED, rarity: Rarity.UNCOMMON, maxHealth: BASELINE.UNCOMMON.MAX_HEALTH + 50, maxEnergy: BASELINE.UNCOMMON.MAX_ENERGY + 10, energyGain: BASELINE.UNCOMMON.ENERGY_GAIN + 1, attack: BASELINE.UNCOMMON.ATTACK + 20, defense: BASELINE.UNCOMMON.DEFENSE - 10, speed: BASELINE.UNCOMMON.SPEED + 5, skills: [meteorStorm, basicSkills6.steelWall], ultimateSkill: starcallerSupernova },
    { id: 'mage_6', name: 'Emberstorm', class: CharacterClass.MAGE, rarity: Rarity.UNCOMMON, maxHealth: BASELINE.UNCOMMON.MAX_HEALTH - 10, maxEnergy: BASELINE.UNCOMMON.MAX_ENERGY + 9, energyGain: BASELINE.UNCOMMON.ENERGY_GAIN + 1, attack: BASELINE.UNCOMMON.ATTACK + 20, defense: BASELINE.UNCOMMON.DEFENSE - 10, speed: BASELINE.UNCOMMON.SPEED + 10, skills: [basicSkills6.emberBurst, basicSkills1.arcaneBolt], ultimateSkill: meteorStorm },
    { id: 'mage_7', name: 'Glacialspike', class: CharacterClass.MAGE, rarity: Rarity.UNCOMMON, maxHealth: BASELINE.UNCOMMON.MAX_HEALTH + 10, maxEnergy: BASELINE.UNCOMMON.MAX_ENERGY + 12, energyGain: BASELINE.UNCOMMON.ENERGY_GAIN + 1, attack: BASELINE.UNCOMMON.ATTACK + 20, defense: BASELINE.UNCOMMON.DEFENSE - 10, speed: BASELINE.UNCOMMON.SPEED + 5, skills: [basicSkills6.glacialPrison, basicSkills1.iceBlast], ultimateSkill: frostNova },
    { id: 'healer_6', name: 'Sunwarden', class: CharacterClass.HEALER, rarity: Rarity.UNCOMMON, maxHealth: BASELINE.UNCOMMON.MAX_HEALTH + 10, maxEnergy: BASELINE.UNCOMMON.MAX_ENERGY + 5, energyGain: BASELINE.UNCOMMON.ENERGY_GAIN + 1, attack: BASELINE.UNCOMMON.ATTACK + 20, defense: BASELINE.UNCOMMON.DEFENSE - 10, speed: BASELINE.UNCOMMON.SPEED + 5, skills: [basicSkills6.sunbeam, basicSkills1.quickHeal], ultimateSkill: radiantGrace },
    { id: 'healer_7', name: 'Moonglade', class: CharacterClass.HEALER, rarity: Rarity.UNCOMMON, maxHealth: BASELINE.UNCOMMON.MAX_HEALTH + 20, maxEnergy: BASELINE.UNCOMMON.MAX_ENERGY + 6, energyGain: BASELINE.UNCOMMON.ENERGY_GAIN + 1, attack: BASELINE.UNCOMMON.ATTACK + 20, defense: BASELINE.UNCOMMON.DEFENSE - 10, speed: BASELINE.UNCOMMON.SPEED + 5, skills: [basicSkills6.moonveil, basicSkills1.divineAegis], ultimateSkill: spiritLink },
    { id: 'assassin_6', name: 'Shadowstrike', class: CharacterClass.ASSASSIN, rarity: Rarity.UNCOMMON, maxHealth: BASELINE.UNCOMMON.MAX_HEALTH - 10, maxEnergy: BASELINE.UNCOMMON.MAX_ENERGY - 3, energyGain: BASELINE.UNCOMMON.ENERGY_GAIN + 1, attack: BASELINE.UNCOMMON.ATTACK + 20, defense: BASELINE.UNCOMMON.DEFENSE - 10, speed: BASELINE.UNCOMMON.SPEED + 10, skills: [basicSkills6.shadowStrike, basicSkills1.quickStab], ultimateSkill: shadowdancerNightfall },
    { id: 'assassin_7', name: 'Nightblade', class: CharacterClass.ASSASSIN, rarity: Rarity.UNCOMMON, maxHealth: BASELINE.UNCOMMON.MAX_HEALTH + 10, maxEnergy: BASELINE.UNCOMMON.MAX_ENERGY - 3, energyGain: BASELINE.UNCOMMON.ENERGY_GAIN + 1, attack: BASELINE.UNCOMMON.ATTACK + 20, defense: BASELINE.UNCOMMON.DEFENSE - 10, speed: BASELINE.UNCOMMON.SPEED + 5, skills: [basicSkills6.nightBlade, basicSkills2.toxicSpit], ultimateSkill: soulreaperHarvest },
    { id: 'rogue_6', name: 'Darkwhisper', class: CharacterClass.ROGUE, rarity: Rarity.UNCOMMON, maxHealth: BASELINE.UNCOMMON.MAX_HEALTH + 10, maxEnergy: BASELINE.UNCOMMON.MAX_ENERGY + 5, energyGain: BASELINE.UNCOMMON.ENERGY_GAIN + 1, attack: BASELINE.UNCOMMON.ATTACK + 20, defense: BASELINE.UNCOMMON.DEFENSE - 10, speed: BASELINE.UNCOMMON.SPEED + 5, skills: [basicSkills2.shadowSlash, basicSkills1.blindingPowder], ultimateSkill: abyssalGrasp },
    { id: 'rogue_7', name: 'Silvershadow', class: CharacterClass.ROGUE, rarity: Rarity.UNCOMMON, maxHealth: BASELINE.UNCOMMON.MAX_HEALTH + 20, maxEnergy: BASELINE.UNCOMMON.MAX_ENERGY + 6, energyGain: BASELINE.UNCOMMON.ENERGY_GAIN + 1, attack: BASELINE.UNCOMMON.ATTACK + 20, defense: BASELINE.UNCOMMON.DEFENSE - 10, speed: BASELINE.UNCOMMON.SPEED + 5, skills: [basicSkills2.quickDodge, basicSkills1.windSlash], ultimateSkill: shadowClone },
    { id: 'bard_2', name: 'Lyric', class: CharacterClass.BARD, rarity: Rarity.UNCOMMON, maxHealth: BASELINE.UNCOMMON.MAX_HEALTH + 10, maxEnergy: BASELINE.UNCOMMON.MAX_ENERGY - 3, energyGain: BASELINE.UNCOMMON.ENERGY_GAIN + 1, attack: BASELINE.UNCOMMON.ATTACK + 20, defense: BASELINE.UNCOMMON.DEFENSE - 10, speed: BASELINE.UNCOMMON.SPEED + 5, skills: [basicSkills4.healingChant, basicSkills4.shieldWall], ultimateSkill: bardEncore },
    // 10 Rare (10% higher stats)
    { id: 'warrior_6', name: 'Steelbreaker', class: CharacterClass.WARRIOR, rarity: Rarity.RARE, maxHealth: BASELINE.RARE.MAX_HEALTH + 50, maxEnergy: BASELINE.RARE.MAX_ENERGY + 10, energyGain: BASELINE.RARE.ENERGY_GAIN + 1, attack: BASELINE.RARE.ATTACK + 20, defense: BASELINE.RARE.DEFENSE - 10, speed: BASELINE.RARE.SPEED + 5, skills: [basicSkills7.steelBreaker, basicSkills3.burningBlade], ultimateSkill: heroicCharge },
    { id: 'warrior_7', name: 'Frostguard', class: CharacterClass.WARRIOR, rarity: Rarity.RARE, maxHealth: BASELINE.RARE.MAX_HEALTH + 70, maxEnergy: BASELINE.RARE.MAX_ENERGY + 10, energyGain: BASELINE.RARE.ENERGY_GAIN + 1, attack: BASELINE.RARE.ATTACK + 25, defense: BASELINE.RARE.DEFENSE - 10, speed: BASELINE.RARE.SPEED + 5, skills: [basicSkills7.frostGuardAura, basicSkills3.sandstorm], ultimateSkill: dragonRoar },
    { id: 'mage_8', name: 'Pyromancer', class: CharacterClass.MAGE, rarity: Rarity.RARE, maxHealth: BASELINE.RARE.MAX_HEALTH + 10, maxEnergy: BASELINE.RARE.MAX_ENERGY + 10, energyGain: BASELINE.RARE.ENERGY_GAIN + 1, attack: BASELINE.RARE.ATTACK + 20, defense: BASELINE.RARE.DEFENSE - 10, speed: BASELINE.RARE.SPEED + 5, skills: [basicSkills7.pyreBlast, basicSkills1.flameStrike], ultimateSkill: meteorStorm },
    { id: 'mage_9', name: 'Cryomancer', class: CharacterClass.MAGE, rarity: Rarity.RARE, maxHealth: BASELINE.RARE.MAX_HEALTH + 30, maxEnergy: BASELINE.RARE.MAX_ENERGY + 12, energyGain: BASELINE.RARE.ENERGY_GAIN + 1, attack: BASELINE.RARE.ATTACK + 25, defense: BASELINE.RARE.DEFENSE - 10, speed: BASELINE.RARE.SPEED + 5, skills: [basicSkills7.cryoSpike, basicSkills1.iceBlast], ultimateSkill: frostNova },
    { id: 'healer_8', name: 'Lightkeeper', class: CharacterClass.HEALER, rarity: Rarity.RARE, maxHealth: BASELINE.RARE.MAX_HEALTH + 30, maxEnergy: BASELINE.RARE.MAX_ENERGY + 10, energyGain: BASELINE.RARE.ENERGY_GAIN + 1, attack: BASELINE.RARE.ATTACK + 20, defense: BASELINE.RARE.DEFENSE - 10, speed: BASELINE.RARE.SPEED + 5, skills: [basicSkills7.radiantWard, basicSkills1.quickHeal], ultimateSkill: radiantGrace },
    { id: 'healer_9', name: 'Shadowhealer', class: CharacterClass.HEALER, rarity: Rarity.RARE, maxHealth: BASELINE.RARE.MAX_HEALTH + 50, maxEnergy: BASELINE.RARE.MAX_ENERGY + 10, energyGain: BASELINE.RARE.ENERGY_GAIN + 1, attack: BASELINE.RARE.ATTACK + 25, defense: BASELINE.RARE.DEFENSE - 10, speed: BASELINE.RARE.SPEED + 5, skills: [basicSkills7.shadowHeal, basicSkills1.divineAegis], ultimateSkill: voidCollapse },
    { id: 'assassin_8', name: 'Deathbringer', class: CharacterClass.ASSASSIN, rarity: Rarity.RARE, maxHealth: BASELINE.RARE.MAX_HEALTH + 10, maxEnergy: BASELINE.RARE.MAX_ENERGY - 10, energyGain: BASELINE.RARE.ENERGY_GAIN + 1, attack: BASELINE.RARE.ATTACK + 25, defense: BASELINE.RARE.DEFENSE - 10, speed: BASELINE.RARE.SPEED + 5, skills: [basicSkills3.venomousBite, basicSkills1.shadowStep], ultimateSkill: primalRage },
    { id: 'assassin_9', name: 'Soulreaper', class: CharacterClass.ASSASSIN, rarity: Rarity.RARE, maxHealth: BASELINE.RARE.MAX_HEALTH + 30, maxEnergy: BASELINE.RARE.MAX_ENERGY - 10, energyGain: BASELINE.RARE.ENERGY_GAIN + 1, attack: BASELINE.RARE.ATTACK + 25, defense: BASELINE.RARE.DEFENSE - 10, speed: BASELINE.RARE.SPEED + 5, skills: [basicSkills3.radiantSlash, basicSkills1.shadowStep], ultimateSkill: spectralVeil },
    { id: 'rogue_8', name: 'Darkflame', class: CharacterClass.ROGUE, rarity: Rarity.RARE, maxHealth: BASELINE.RARE.MAX_HEALTH + 20, maxEnergy: BASELINE.RARE.MAX_ENERGY + 10, energyGain: BASELINE.RARE.ENERGY_GAIN + 1, attack: BASELINE.RARE.ATTACK + 25, defense: BASELINE.RARE.DEFENSE - 10, speed: BASELINE.RARE.SPEED + 5, skills: [basicSkills3.bloodPact, basicSkills1.berserk], ultimateSkill: infernalChains },
    { id: 'rogue_9', name: 'Nightfire', class: CharacterClass.ROGUE, rarity: Rarity.RARE, maxHealth: BASELINE.RARE.MAX_HEALTH + 30, maxEnergy: BASELINE.RARE.MAX_ENERGY + 10, energyGain: BASELINE.RARE.ENERGY_GAIN + 1, attack: BASELINE.RARE.ATTACK + 30, defense: BASELINE.RARE.DEFENSE - 10, speed: BASELINE.RARE.SPEED + 5, skills: [basicSkills3.thunderStrike, basicSkills1.berserk], ultimateSkill: bloodMoon },
    { id: 'blood_knight_1', name: 'Crimson Lord', class: CharacterClass.BLOOD_KNIGHT, rarity: Rarity.RARE, maxHealth: BASELINE.RARE.MAX_HEALTH + 100, maxEnergy: BASELINE.RARE.MAX_ENERGY + 20, energyGain: BASELINE.RARE.ENERGY_GAIN + 1, attack: BASELINE.RARE.ATTACK + 40, defense: BASELINE.RARE.DEFENSE + 10, speed: BASELINE.RARE.SPEED + 5, skills: [basicSkills3.bloodPact, basicSkills1.berserk], ultimateSkill: bloodKnightCrimsonPact },
    { id: 'demonslayer_1', name: 'Demonbane', class: CharacterClass.DEMONSLAYER, rarity: Rarity.RARE, maxHealth: BASELINE.RARE.MAX_HEALTH + 80, maxEnergy: BASELINE.RARE.MAX_ENERGY + 10, energyGain: BASELINE.RARE.ENERGY_GAIN + 1, attack: BASELINE.RARE.ATTACK + 40, defense: BASELINE.RARE.DEFENSE + 10, speed: BASELINE.RARE.SPEED + 5, skills: [basicSkills1.flameStrike, basicSkills1.shadowStep], ultimateSkill: demonslayerBanish },
    // 10 Epic (10% higher stats)
    { id: 'chronomancer_1', name: 'Timeshaper', class: CharacterClass.CHRONOMANCER, rarity: Rarity.EPIC, maxHealth: BASELINE.EPIC.MAX_HEALTH + 50, maxEnergy: BASELINE.EPIC.MAX_ENERGY + 10, energyGain: BASELINE.EPIC.ENERGY_GAIN + 1, attack: BASELINE.EPIC.ATTACK + 20, defense: BASELINE.EPIC.DEFENSE - 10, speed: BASELINE.EPIC.SPEED + 5, skills: [basicSkillsTimeshaper.haste, basicSkillsTimeshaper.slowTime], ultimateSkill: chronomancerTimeLock },
    { id: 'starcaller_1', name: 'Galaxion', class: CharacterClass.STARCALLER, rarity: Rarity.EPIC, maxHealth: BASELINE.EPIC.MAX_HEALTH + 70, maxEnergy: BASELINE.EPIC.MAX_ENERGY + 10, energyGain: BASELINE.EPIC.ENERGY_GAIN + 1, attack: BASELINE.EPIC.ATTACK + 25, defense: BASELINE.EPIC.DEFENSE - 10, speed: BASELINE.EPIC.SPEED + 5, skills: [basicSkillsStarcaller.cosmicRay, basicSkills5.astralNova], ultimateSkill: starcallerSupernova },
    { id: 'soulreaper_1', name: 'Soulrender', class: CharacterClass.SOULREAPER, rarity: Rarity.EPIC, maxHealth: BASELINE.EPIC.MAX_HEALTH + 60, maxEnergy: BASELINE.EPIC.MAX_ENERGY + 10, energyGain: BASELINE.EPIC.ENERGY_GAIN + 1, attack: BASELINE.EPIC.ATTACK + 25, defense: BASELINE.EPIC.DEFENSE - 10, speed: BASELINE.EPIC.SPEED + 5, skills: [basicSkillsSoulreaper.soulDrain, basicSkills5.soulRend], ultimateSkill: soulreaperHarvest },
    { id: 'plague_doctor_1', name: 'Miasma', class: CharacterClass.PLAGUE_DOCTOR, rarity: Rarity.EPIC, maxHealth: BASELINE.EPIC.MAX_HEALTH + 50, maxEnergy: BASELINE.EPIC.MAX_ENERGY + 10, energyGain: BASELINE.EPIC.ENERGY_GAIN + 1, attack: BASELINE.EPIC.ATTACK + 20, defense: BASELINE.EPIC.DEFENSE - 10, speed: BASELINE.EPIC.SPEED + 5, skills: [basicSkillsPlaguedoctor.virulentTouch, basicSkills5.miasmaCloud], ultimateSkill: plagueDoctorPandemic },
    // 5 Legendary (10% higher stats)
    { id: 'demonslayer_legend', name: 'Demonbane', class: CharacterClass.DEMONSLAYER, rarity: Rarity.LEGENDARY, maxHealth: BASELINE.LEGENDARY.MAX_HEALTH + 50, maxEnergy: BASELINE.LEGENDARY.MAX_ENERGY + 10, energyGain: BASELINE.LEGENDARY.ENERGY_GAIN + 1, attack: BASELINE.LEGENDARY.ATTACK + 20, defense: BASELINE.LEGENDARY.DEFENSE - 10, speed: BASELINE.LEGENDARY.SPEED + 5, skills: [basicSkills1.flameStrike, basicSkills1.shadowStep], ultimateSkill: demonslayerBanish },
    { id: 'chronomancer_legend', name: 'Timeshaper', class: CharacterClass.CHRONOMANCER, rarity: Rarity.LEGENDARY, maxHealth: BASELINE.LEGENDARY.MAX_HEALTH + 50, maxEnergy: BASELINE.LEGENDARY.MAX_ENERGY + 10, energyGain: BASELINE.LEGENDARY.ENERGY_GAIN + 1, attack: BASELINE.LEGENDARY.ATTACK + 25, defense: BASELINE.LEGENDARY.DEFENSE - 10, speed: BASELINE.LEGENDARY.SPEED + 5, skills: [basicSkillsTimeshaper.stopTime, basicSkillsTimeshaper.reverseTime], ultimateSkill: chronomancerTimeLock },
    { id: 'starcaller_legend', name: 'Galaxion', class: CharacterClass.STARCALLER, rarity: Rarity.LEGENDARY, maxHealth: BASELINE.LEGENDARY.MAX_HEALTH + 70, maxEnergy: BASELINE.LEGENDARY.MAX_ENERGY + 10, energyGain: BASELINE.LEGENDARY.ENERGY_GAIN + 1, attack: BASELINE.LEGENDARY.ATTACK + 30, defense: BASELINE.LEGENDARY.DEFENSE - 10, speed: BASELINE.LEGENDARY.SPEED + 5, skills: [basicSkillsStarcaller.stardustShield, basicSkills5.voidPulse], ultimateSkill: starcallerSupernova },
    { id: 'soulreaper_legend', name: 'Soulrender', class: CharacterClass.SOULREAPER, rarity: Rarity.LEGENDARY, maxHealth: BASELINE.LEGENDARY.MAX_HEALTH + 60, maxEnergy: BASELINE.LEGENDARY.MAX_ENERGY + 10, energyGain: BASELINE.LEGENDARY.ENERGY_GAIN + 1, attack: BASELINE.LEGENDARY.ATTACK + 30, defense: BASELINE.LEGENDARY.DEFENSE - 10, speed: BASELINE.LEGENDARY.SPEED + 5, skills: [basicSkillsSoulreaper.spiritShackle, basicSkills5.timeLoop], ultimateSkill: soulreaperHarvest },
    { id: 'plague_doctor_legend', name: 'Miasma', class: CharacterClass.PLAGUE_DOCTOR, rarity: Rarity.LEGENDARY, maxHealth: BASELINE.LEGENDARY.MAX_HEALTH + 50, maxEnergy: BASELINE.LEGENDARY.MAX_ENERGY + 10, energyGain: BASELINE.LEGENDARY.ENERGY_GAIN + 1, attack: BASELINE.LEGENDARY.ATTACK + 25, defense: BASELINE.LEGENDARY.DEFENSE - 10, speed: BASELINE.LEGENDARY.SPEED + 5, skills: [basicSkillsPlaguedoctor.epidemic, basicSkills5.timeLoop], ultimateSkill: plagueDoctorPandemic },
];
