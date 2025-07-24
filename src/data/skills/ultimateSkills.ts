import { Skill } from '../../types/game';

// 80 unique ultimate skills (one for each character)
export const meteorStorm: Skill = {
    id: 'meteor_storm',
    name: 'Meteor Storm',
    description: 'Ultimate: Massive fire damage to all enemies and Burn.',
    damage: 300,
    cooldown: 6,
    range: 999,
    manaCost: 60,
    isUltimate: true,
    statusEffect: { type: 'burn', duration: 2, value: 40 }
};

export const frostNova: Skill = {
    id: 'frost_nova',
    name: 'Frost Nova',
    description: 'Ultimate: Freeze all enemies (skip turn) and deal damage.',
    damage: 150,
    cooldown: 6,
    range: 999,
    manaCost: 60,
    isUltimate: true,
    statusEffect: { type: 'freeze', duration: 1, value: 0 }
};

export const phoenixRebirth: Skill = {
    id: 'phoenix_rebirth',
    name: 'Phoenix Rebirth',
    description: 'Ultimate: Revive self with 50% HP after death (delayed effect).',
    cooldown: 8,
    range: 0,
    manaCost: 0,
    isUltimate: true,
    statusEffect: { type: 'revive', duration: 1, value: 0.5 }
};

export const divineLight: Skill = {
    id: 'divine_light',
    name: 'Divine Light',
    description: 'Ultimate: Heal all allies and remove debuffs.',
    healing: 300,
    cooldown: 6,
    range: 999,
    manaCost: 100,
    isUltimate: true,
    statusEffect: { type: 'cleanse', duration: 1, value: 1 }
};

export const heroicCharge: Skill = {
    id: 'heroic_charge',
    name: 'Heroic Charge',
    description: 'Ultimate: Charge through enemies dealing massive damage.',
    damage: 350,
    cooldown: 5,
    range: 3,
    manaCost: 80,
    isUltimate: true,
    statusEffect: { type: 'stun', duration: 1, value: 1 }
};

export const shadowClone: Skill = {
    id: 'shadow_clone',
    name: 'Shadow Clone',
    description: 'Ultimate: Create shadow clones to confuse and attack enemies.',
    damage: 280,
    cooldown: 5,
    range: 999,
    manaCost: 90,
    isUltimate: true,
    statusEffect: { type: 'confuse', duration: 2, value: 1 }
};

export const thunderGodsWrath: Skill = {
    id: 'thunder_gods_wrath',
    name: 'Thunder God\'s Wrath',
    description: 'Ultimate: Strikes all enemies with lightning, paralyzing them.',
    damage: 260,
    cooldown: 6,
    range: 999,
    manaCost: 85,
    isUltimate: true,
    statusEffect: { type: 'paralyze', duration: 2, value: 1 }
};

export const abyssalGrasp: Skill = {
    id: 'abyssal_grasp',
    name: 'Abyssal Grasp',
    description: 'Ultimate: Drains HP from all enemies and applies Curse.',
    damage: 180,
    cooldown: 7,
    range: 999,
    manaCost: 90,
    isUltimate: true,
    statusEffect: { type: 'curse', duration: 3, value: 30 }
};

export const celestialBarrier: Skill = {
    id: 'celestial_barrier',
    name: 'Celestial Barrier',
    description: 'Ultimate: Grants a shield to all allies and boosts defense.',
    cooldown: 6,
    range: 999,
    manaCost: 80,
    isUltimate: true,
    statusEffect: { type: 'defense_up', duration: 3, value: 50 }
};

export const dragonRoar: Skill = {
    id: 'dragon_roar',
    name: 'Dragon Roar',
    description: 'Ultimate: Terrifies all enemies, lowering their attack.',
    damage: 120,
    cooldown: 5,
    range: 999,
    manaCost: 70,
    isUltimate: true,
    statusEffect: { type: 'attack_down', duration: 2, value: 40 }
};

export const timeWarp: Skill = {
    id: 'time_warp',
    name: 'Time Warp',
    description: 'Ultimate: Skips the next turn for all enemies (AoE).',
    cooldown: 7,
    range: 999,
    manaCost: 100,
    isUltimate: true,
    statusEffect: { type: 'skip_turn', duration: 1, value: 1 }
};

export const bloodMoon: Skill = {
    id: 'blood_moon',
    name: 'Blood Moon',
    description: 'Ultimate: All allies gain lifesteal for 2 turns (multi-target buff).',
    cooldown: 6,
    range: 999,
    manaCost: 90,
    isUltimate: true,
    statusEffect: { type: 'lifesteal', duration: 2, value: 0.3 }
};

export const ironWill: Skill = {
    id: 'iron_will',
    name: 'Iron Will',
    description: 'Ultimate: Grants immunity to debuffs for 2 turns (self-buff).',
    cooldown: 6,
    range: 0,
    manaCost: 80,
    isUltimate: true,
    statusEffect: { type: 'immunity', duration: 2, value: 1 }
};

export const arcaneCataclysm: Skill = {
    id: 'arcane_cataclysm',
    name: 'Arcane Cataclysm',
    description: 'Ultimate: Deals massive magic damage and silences all enemies (AoE).',
    damage: 320,
    cooldown: 7,
    range: 999,
    manaCost: 110,
    isUltimate: true,
    statusEffect: { type: 'silence', duration: 2, value: 1 }
};

export const spiritLink: Skill = {
    id: 'spirit_link',
    name: 'Spirit Link',
    description: 'Ultimate: Shares damage among all allies for 2 turns (multi-target buff).',
    cooldown: 6,
    range: 999,
    manaCost: 75,
    isUltimate: true,
    statusEffect: { type: 'damage_share', duration: 2, value: 1 }
};

export const infernalChains: Skill = {
    id: 'infernal_chains',
    name: 'Infernal Chains',
    description: 'Ultimate: Binds all enemies, reducing their speed (AoE debuff).',
    damage: 100,
    cooldown: 5,
    range: 999,
    manaCost: 70,
    isUltimate: true,
    statusEffect: { type: 'speed_down', duration: 3, value: 40 }
};

export const radiantGrace: Skill = {
    id: 'radiant_grace',
    name: 'Radiant Grace',
    description: 'Ultimate: Heals and grants regen to all allies (multi-target heal).',
    healing: 200,
    cooldown: 6,
    range: 999,
    manaCost: 85,
    isUltimate: true,
    statusEffect: { type: 'regen', duration: 3, value: 50 }
};

export const voidCollapse: Skill = {
    id: 'void_collapse',
    name: 'Void Collapse',
    description: 'Ultimate: Deals void damage and applies weaken to all enemies (AoE debuff).',
    damage: 270,
    cooldown: 7,
    range: 999,
    manaCost: 95,
    isUltimate: true,
    statusEffect: { type: 'weaken', duration: 2, value: 30 }
};

export const primalRage: Skill = {
    id: 'primal_rage',
    name: 'Primal Rage',
    description: 'Ultimate: Boosts own attack and speed for 3 turns (self-buff).',
    cooldown: 5,
    range: 0,
    manaCost: 60,
    isUltimate: true,
    statusEffect: { type: 'attack_speed_up', duration: 3, value: 40 }
};

export const spectralVeil: Skill = {
    id: 'spectral_veil',
    name: 'Spectral Veil',
    description: 'Ultimate: Grants evasion to all allies for 2 turns (multi-target buff).',
    cooldown: 6,
    range: 999,
    manaCost: 80,
    isUltimate: true,
    statusEffect: { type: 'evasion', duration: 2, value: 0.5 }
};

export const warriorFury: Skill = {
    id: 'warrior_fury',
    name: 'Warrior Fury',
    description: 'Ultimate: Single-target. Unleash a devastating blow, dealing massive damage and stunning the enemy.',
    damage: 400,
    cooldown: 6,
    range: 1,
    manaCost: 90,
    isUltimate: true,
    statusEffect: { type: 'stun', duration: 1, value: 1 }
};

export const rogueAmbush: Skill = {
    id: 'rogue_ambush',
    name: 'Rogue Ambush',
    description: 'Ultimate: Single-target. Strike from the shadows for high damage and guaranteed critical hit (bleed).',
    damage: 350,
    cooldown: 5,
    range: 1,
    manaCost: 80,
    isUltimate: true,
    statusEffect: { type: 'bleed', duration: 3, value: 40 }
};

export const wizardCataclysm: Skill = {
    id: 'wizard_cataclysm',
    name: 'Wizard Cataclysm',
    description: 'Ultimate: AoE. Rain arcane destruction on all enemies, burning and reducing their magic defense.',
    damage: 260,
    cooldown: 7,
    range: 999,
    manaCost: 110,
    isUltimate: true,
    statusEffect: { type: 'burn_magic_def_down', duration: 2, value: 30 }
};

export const clericSanctuary: Skill = {
    id: 'cleric_sanctuary',
    name: 'Cleric Sanctuary',
    description: 'Ultimate: Multi-target. Heal all allies and grant immunity to debuffs for 1 turn.',
    healing: 220,
    cooldown: 6,
    range: 999,
    manaCost: 100,
    isUltimate: true,
    statusEffect: { type: 'immunity', duration: 1, value: 1 }
};

export const paladinJudgment: Skill = {
    id: 'paladin_judgment',
    name: 'Paladin Judgment',
    description: 'Ultimate: Single-target. Smite an enemy for holy damage and reduce their attack.',
    damage: 320,
    cooldown: 5,
    range: 1,
    manaCost: 85,
    isUltimate: true,
    statusEffect: { type: 'attack_down', duration: 2, value: 30 }
};

export const hunterVolley: Skill = {
    id: 'hunter_volley',
    name: 'Hunter Volley',
    description: 'Ultimate: Multi-target. Fire a volley of arrows, damaging up to 3 enemies and applying poison.',
    damage: 180,
    cooldown: 5,
    range: 3,
    manaCost: 70,
    isUltimate: true,
    statusEffect: { type: 'poison', duration: 2, value: 25 }
};

export const berserkerRampage: Skill = {
    id: 'berserker_rampage',
    name: 'Berserker Rampage',
    description: 'Ultimate: Self. Enter a rampage, greatly boosting attack and speed but lowering defense.',
    cooldown: 4,
    range: 0,
    manaCost: 60,
    isUltimate: true,
    statusEffect: { type: 'attack_speed_up_defense_down', duration: 3, value: 50 }
};

export const bardEncore: Skill = {
    id: 'bard_encore',
    name: 'Bard Encore',
    description: 'Ultimate: Multi-target. Restore energy to all allies and grant regen.',
    cooldown: 6,
    range: 999,
    manaCost: 0,
    isUltimate: true,
    statusEffect: { type: 'energy_regen', duration: 2, value: 30 }
};

export const monkTranquility: Skill = {
    id: 'monk_tranquility',
    name: 'Monk Tranquility',
    description: 'Ultimate: Self. Heal self and gain evasion for 2 turns.',
    healing: 180,
    cooldown: 5,
    range: 0,
    manaCost: 50,
    isUltimate: true,
    statusEffect: { type: 'evasion', duration: 2, value: 1 }
};

export const druidWildGrowth: Skill = {
    id: 'druid_wild_growth',
    name: 'Druid Wild Growth',
    description: 'Ultimate: Multi-target. Heal all allies over time and boost their defense.',
    healing: 100,
    cooldown: 6,
    range: 999,
    manaCost: 90,
    isUltimate: true,
    statusEffect: { type: 'regen_defense_up', duration: 3, value: 25 }
};

export const necromancerSoulHarvest: Skill = {
    id: 'necromancer_soul_harvest',
    name: 'Necromancer Soul Harvest',
    description: 'Ultimate: AoE. Drain life from all enemies and heal self for a portion of the damage dealt.',
    damage: 160,
    healing: 80,
    cooldown: 7,
    range: 999,
    manaCost: 100,
    isUltimate: true,
    statusEffect: { type: 'drain', duration: 1, value: 0.5 }
};

export const witchHexstorm: Skill = {
    id: 'witch_hexstorm',
    name: 'Witch Hexstorm',
    description: 'Ultimate: Multi-target. Curse up to 3 enemies, reducing their attack and defense.',
    damage: 90,
    cooldown: 6,
    range: 3,
    manaCost: 80,
    isUltimate: true,
    statusEffect: { type: 'curse', duration: 2, value: 25 }
};

export const martialArtistDragonKick: Skill = {
    id: 'martial_artist_dragon_kick',
    name: 'Martial Artist Dragon Kick',
    description: 'Ultimate: Single-target. Deliver a powerful kick, dealing high damage and knocking the enemy back.',
    damage: 340,
    cooldown: 5,
    range: 1,
    manaCost: 70,
    isUltimate: true,
    statusEffect: { type: 'knockback', duration: 1, value: 1 }
};

export const trapperSnareField: Skill = {
    id: 'trapper_snare_field',
    name: 'Trapper Snare Field',
    description: 'Ultimate: Multi-target. Trap up to 3 enemies, rooting them in place and dealing damage over time.',
    damage: 60,
    cooldown: 6,
    range: 3,
    manaCost: 75,
    isUltimate: true,
    statusEffect: { type: 'root', duration: 2, value: 1 }
};

export const lichFrozenTomb: Skill = {
    id: 'lich_frozen_tomb',
    name: 'Lich Frozen Tomb',
    description: 'Ultimate: AoE. Freeze all enemies for 1 turn and deal ice damage.',
    damage: 140,
    cooldown: 7,
    range: 999,
    manaCost: 110,
    isUltimate: true,
    statusEffect: { type: 'freeze', duration: 1, value: 1 }
};

export const spellbladeArcaneEdge: Skill = {
    id: 'spellblade_arcane_edge',
    name: 'Spellblade Arcane Edge',
    description: 'Ultimate: Single-target. Strike with a blade of pure magic, dealing high damage and silencing the enemy.',
    damage: 320,
    cooldown: 5,
    range: 1,
    manaCost: 90,
    isUltimate: true,
    statusEffect: { type: 'silence', duration: 2, value: 1 }
};

export const shadowdancerNightfall: Skill = {
    id: 'shadowdancer_nightfall',
    name: 'Shadowdancer Nightfall',
    description: 'Ultimate: Multi-target. Attack up to 3 enemies, blinding them and reducing their accuracy.',
    damage: 120,
    cooldown: 6,
    range: 3,
    manaCost: 80,
    isUltimate: true,
    statusEffect: { type: 'blind', duration: 2, value: 1 }
};

export const illusionistMirageArmy: Skill = {
    id: 'illusionist_mirage_army',
    name: 'Illusionist Mirage Army',
    description: 'Ultimate: AoE. Summon illusions to attack all enemies and confuse them.',
    damage: 110,
    cooldown: 7,
    range: 999,
    manaCost: 100,
    isUltimate: true,
    statusEffect: { type: 'confuse', duration: 2, value: 1 }
};

export const beastmasterPrimalCall: Skill = {
    id: 'beastmaster_primal_call',
    name: 'Beastmaster Primal Call',
    description: 'Ultimate: Multi-target. Summon beasts to attack up to 3 enemies and apply bleed.',
    damage: 150,
    cooldown: 6,
    range: 3,
    manaCost: 85,
    isUltimate: true,
    statusEffect: { type: 'bleed', duration: 2, value: 30 }
};

export const elementalistElementalRage: Skill = {
    id: 'elementalist_elemental_rage',
    name: 'Elementalist Elemental Rage',
    description: 'Ultimate: AoE. Unleash all elements, dealing random damage types to all enemies.',
    damage: 200,
    cooldown: 7,
    range: 999,
    manaCost: 120,
    isUltimate: true,
    statusEffect: { type: 'random_element', duration: 1, value: 1 }
};

export const bloodKnightCrimsonPact: Skill = {
    id: 'blood_knight_crimson_pact',
    name: 'Crimson Pact',
    description: 'Ultimate: Self. Sacrifice HP to greatly boost attack and lifesteal for 3 turns.',
    cooldown: 6,
    range: 0,
    manaCost: 0,
    isUltimate: true,
    statusEffect: { type: 'attack_up_lifesteal', duration: 3, value: 50 }
};

export const demonslayerBanish: Skill = {
    id: 'demonslayer_banish',
    name: 'Banish',
    description: 'Ultimate: Single-target. Deal massive holy damage to a demon and stun them.',
    damage: 400,
    cooldown: 7,
    range: 1,
    manaCost: 100,
    isUltimate: true,
    statusEffect: { type: 'stun', duration: 2, value: 1 }
};

export const chronomancerTimeLock: Skill = {
    id: 'chronomancer_time_lock',
    name: 'Time Lock',
    description: 'Ultimate: Single-target. Freeze an enemy in time, skipping their next two turns.',
    cooldown: 8,
    range: 1,
    manaCost: 120,
    isUltimate: true,
    statusEffect: { type: 'skip_turn', duration: 2, value: 1 }
};

export const starcallerSupernova: Skill = {
    id: 'starcaller_supernova',
    name: 'Supernova',
    description: 'Ultimate: AoE. Deal massive cosmic damage to all enemies and burn them.',
    damage: 350,
    cooldown: 8,
    range: 999,
    manaCost: 130,
    isUltimate: true,
    statusEffect: { type: 'burn', duration: 2, value: 50 }
};

export const soulreaperHarvest: Skill = {
    id: 'soulreaper_harvest',
    name: 'Soul Harvest',
    description: 'Ultimate: Multi-target. Drain HP from up to 3 enemies and heal self.',
    damage: 180,
    healing: 90,
    cooldown: 7,
    range: 3,
    manaCost: 90,
    isUltimate: true,
    statusEffect: { type: 'drain', duration: 1, value: 0.5 }
};

export const plagueDoctorPandemic: Skill = {
    id: 'plague_doctor_pandemic',
    name: 'Pandemic',
    description: 'Ultimate: AoE. Infect all enemies with a deadly plague (damage over time).',
    damage: 120,
    cooldown: 7,
    range: 999,
    manaCost: 110,
    isUltimate: true,
    statusEffect: { type: 'plague', duration: 3, value: 40 }
};

export const alchemistTransmute: Skill = {
    id: 'alchemist_transmute',
    name: 'Transmute',
    description: 'Ultimate: Self. Convert debuffs into buffs and heal self.',
    healing: 200,
    cooldown: 6,
    range: 0,
    manaCost: 80,
    isUltimate: true,
    statusEffect: { type: 'cleanse_buff', duration: 1, value: 1 }
};

export const shamanTotemicRage: Skill = {
    id: 'shaman_totemic_rage',
    name: 'Totemic Rage',
    description: 'Ultimate: Multi-target. Summon totems to buff all allies and heal over time.',
    healing: 100,
    cooldown: 6,
    range: 999,
    manaCost: 90,
    isUltimate: true,
    statusEffect: { type: 'regen_buff', duration: 3, value: 30 }
};

export const runekeeperRunicWard: Skill = {
    id: 'runekeeper_runic_ward',
    name: 'Runic Ward',
    description: 'Ultimate: Multi-target. Shield all allies and reflect a portion of damage.',
    cooldown: 7,
    range: 999,
    manaCost: 100,
    isUltimate: true,
    statusEffect: { type: 'shield_reflect', duration: 2, value: 0.3 }
};

export const frostbornGlacialDoom: Skill = {
    id: 'frostborn_glacial_doom',
    name: 'Glacial Doom',
    description: 'Ultimate: AoE. Deal heavy ice damage to all enemies and freeze them.',
    damage: 220,
    cooldown: 7,
    range: 999,
    manaCost: 110,
    isUltimate: true,
    statusEffect: { type: 'freeze', duration: 1, value: 1 }
};
