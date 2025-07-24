import { EnemyCharacter } from '../../types/enemy';
import { Rarity } from '../../types/game';
import { BASELINE } from '../statBaselines';

export const ENEMY_SLIME_GREEN: EnemyCharacter = {
    id: 'slime_green',
    name: 'Green Slime',
    rarity: Rarity.COMMON,
    maxHealth: BASELINE.COMMON.MAX_HEALTH,
    attack: BASELINE.COMMON.ATTACK,
    defense: BASELINE.COMMON.DEFENSE,
    speed: BASELINE.COMMON.SPEED,
    maxEnergy: BASELINE.COMMON.MAX_ENERGY,
    energyGain: BASELINE.COMMON.ENERGY_GAIN,
    skills: [
        {
            id: 'slime_splash',
            name: 'Slime Splash',
            description: 'Splashes goo at the target, dealing moderate damage and reducing their speed for 1 turn.',
            damage: 110,
            energyCost: 25,
            statusEffect: { type: 'slow', value: 20, duration: 1 },
        },
    ],
};

export const ENEMY_RAT_GIANT: EnemyCharacter = {
    id: 'rat_giant',
    name: 'Giant Rat',
    rarity: Rarity.COMMON,
    maxHealth: BASELINE.COMMON.MAX_HEALTH + 40,
    attack: BASELINE.COMMON.ATTACK + 10,
    defense: BASELINE.COMMON.DEFENSE - 10,
    speed: BASELINE.COMMON.SPEED + 10,
    maxEnergy: BASELINE.COMMON.MAX_ENERGY,
    energyGain: BASELINE.COMMON.ENERGY_GAIN,
    skills: [
        {
            id: 'gnaw',
            name: 'Gnaw',
            description: 'Gnaws viciously, dealing damage and healing itself for a small amount.',
            damage: 105,
            energyCost: 20,
            healing: 20,
        },
    ],
};

export const ENEMY_BAT_CAVE: EnemyCharacter = {
    id: 'bat_cave',
    name: 'Cave Bat',
    rarity: Rarity.COMMON,
    maxHealth: BASELINE.COMMON.MAX_HEALTH - 60,
    attack: BASELINE.COMMON.ATTACK - 10,
    defense: BASELINE.COMMON.DEFENSE - 20,
    speed: BASELINE.COMMON.SPEED + 30,
    maxEnergy: BASELINE.COMMON.MAX_ENERGY,
    energyGain: BASELINE.COMMON.ENERGY_GAIN + 5,
    skills: [
        {
            id: 'sonic_screech',
            name: 'Sonic Screech',
            description: 'Lets out a piercing screech, damaging and lowering the target’s attack for 2 turns.',
            damage: 90,
            energyCost: 22,
            statusEffect: { type: 'attackDown', value: 15, duration: 2 },
        },
    ],
};

export const ENEMY_GOBLIN_SNEAK: EnemyCharacter = {
    id: 'goblin_sneak',
    name: 'Sneaky Goblin',
    rarity: Rarity.COMMON,
    maxHealth: BASELINE.COMMON.MAX_HEALTH - 20,
    attack: BASELINE.COMMON.ATTACK + 15,
    defense: BASELINE.COMMON.DEFENSE - 10,
    speed: BASELINE.COMMON.SPEED + 15,
    maxEnergy: BASELINE.COMMON.MAX_ENERGY,
    energyGain: BASELINE.COMMON.ENERGY_GAIN,
    skills: [
        {
            id: 'stab_n_run',
            name: 'Stab & Run',
            description: 'Stabs the target and increases its own speed for 1 turn.',
            damage: 120,
            energyCost: 28,
            statusEffect: { type: 'selfSpeedUp', value: 20, duration: 1 },
        },
    ],
};

export const ENEMY_FUNGUS_SPORELING: EnemyCharacter = {
    id: 'fungus_sporeling',
    name: 'Sporeling',
    rarity: Rarity.COMMON,
    maxHealth: BASELINE.COMMON.MAX_HEALTH + 30,
    attack: BASELINE.COMMON.ATTACK - 10,
    defense: BASELINE.COMMON.DEFENSE + 10,
    speed: BASELINE.COMMON.SPEED - 10,
    maxEnergy: BASELINE.COMMON.MAX_ENERGY,
    energyGain: BASELINE.COMMON.ENERGY_GAIN,
    skills: [
        {
            id: 'spore_cloud',
            name: 'Spore Cloud',
            description: 'Releases spores, damaging and poisoning the target for 2 turns.',
            damage: 95,
            energyCost: 24,
            statusEffect: { type: 'poison', value: 15, duration: 2 },
        },
    ],
};

export const ENEMY_SKELETON_MINI: EnemyCharacter = {
    id: 'skeleton_mini',
    name: 'Mini Skeleton',
    rarity: Rarity.COMMON,
    maxHealth: BASELINE.COMMON.MAX_HEALTH - 30,
    attack: BASELINE.COMMON.ATTACK + 5,
    defense: BASELINE.COMMON.DEFENSE + 10,
    speed: BASELINE.COMMON.SPEED,
    maxEnergy: BASELINE.COMMON.MAX_ENERGY,
    energyGain: BASELINE.COMMON.ENERGY_GAIN,
    skills: [
        {
            id: 'bone_throw',
            name: 'Bone Throw',
            description: 'Throws a bone, dealing damage and lowering the target’s defense for 1 turn.',
            damage: 100,
            energyCost: 23,
            statusEffect: { type: 'defenseDown', value: 20, duration: 1 },
        },
    ],
};

export const ENEMY_WOLF_CUB: EnemyCharacter = {
    id: 'wolf_cub',
    name: 'Wolf Cub',
    rarity: Rarity.COMMON,
    maxHealth: BASELINE.COMMON.MAX_HEALTH - 10,
    attack: BASELINE.COMMON.ATTACK + 10,
    defense: BASELINE.COMMON.DEFENSE - 10,
    speed: BASELINE.COMMON.SPEED + 20,
    maxEnergy: BASELINE.COMMON.MAX_ENERGY,
    energyGain: BASELINE.COMMON.ENERGY_GAIN + 3,
    skills: [
        {
            id: 'pack_howl',
            name: 'Pack Howl',
            description: 'Howls to call its pack, increasing its own attack for 2 turns and dealing damage.',
            damage: 100,
            energyCost: 26,
            statusEffect: { type: 'selfAttackUp', value: 20, duration: 2 },
        },
    ],
};

export const ENEMY_IMP_FIRE: EnemyCharacter = {
    id: 'imp_fire',
    name: 'Fire Imp',
    rarity: Rarity.COMMON,
    maxHealth: BASELINE.COMMON.MAX_HEALTH - 40,
    attack: BASELINE.COMMON.ATTACK + 20,
    defense: BASELINE.COMMON.DEFENSE - 20,
    speed: BASELINE.COMMON.SPEED + 10,
    maxEnergy: BASELINE.COMMON.MAX_ENERGY,
    energyGain: BASELINE.COMMON.ENERGY_GAIN,
    skills: [
        {
            id: 'ember_burst',
            name: 'Ember Burst',
            description: 'Shoots a burst of embers, dealing damage and burning the target for 2 turns.',
            damage: 115,
            energyCost: 30,
            statusEffect: { type: 'burn', value: 18, duration: 2 },
        },
    ],
};

export const ENEMY_BEETLE_IRON: EnemyCharacter = {
    id: 'beetle_iron',
    name: 'Iron Beetle',
    rarity: Rarity.COMMON,
    maxHealth: BASELINE.COMMON.MAX_HEALTH + 60,
    attack: BASELINE.COMMON.ATTACK - 10,
    defense: BASELINE.COMMON.DEFENSE + 30,
    speed: BASELINE.COMMON.SPEED - 20,
    maxEnergy: BASELINE.COMMON.MAX_ENERGY,
    energyGain: BASELINE.COMMON.ENERGY_GAIN,
    skills: [
        {
            id: 'iron_clash',
            name: 'Iron Clash',
            description: 'Charges and slams, dealing damage and increasing its own defense for 2 turns.',
            damage: 90,
            energyCost: 22,
            statusEffect: { type: 'selfDefenseUp', value: 25, duration: 2 },
        },
    ],
};

export const ENEMY_MIMIC_CHEST: EnemyCharacter = {
    id: 'mimic_chest',
    name: 'Mimic Chest',
    rarity: Rarity.COMMON,
    maxHealth: BASELINE.COMMON.MAX_HEALTH + 20,
    attack: BASELINE.COMMON.ATTACK + 15,
    defense: BASELINE.COMMON.DEFENSE + 10,
    speed: BASELINE.COMMON.SPEED - 10,
    maxEnergy: BASELINE.COMMON.MAX_ENERGY,
    energyGain: BASELINE.COMMON.ENERGY_GAIN,
    skills: [
        {
            id: 'chomp_trap',
            name: 'Chomp Trap',
            description: 'Springs open and bites, dealing heavy damage and stunning the target for 1 turn.',
            damage: 130,
            energyCost: 35,
            statusEffect: { type: 'stun', value: 1, duration: 1 },
        },
    ],
};

// Optional: export all as an array for convenience
export const COMMON_ENEMIES = [
    ENEMY_SLIME_GREEN,
    ENEMY_RAT_GIANT,
    ENEMY_BAT_CAVE,
    ENEMY_GOBLIN_SNEAK,
    ENEMY_FUNGUS_SPORELING,
    ENEMY_SKELETON_MINI,
    ENEMY_WOLF_CUB,
    ENEMY_IMP_FIRE,
    ENEMY_BEETLE_IRON,
    ENEMY_MIMIC_CHEST,
];
