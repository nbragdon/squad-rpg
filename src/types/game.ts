export enum CharacterClass {
    WARRIOR = 'warrior',
    ROGUE = 'rogue',
    WIZARD = 'wizard',
    CLERIC = 'cleric',
    SORCERER = 'sorcerer',
    PALADIN = 'paladin',
    HUNTER = 'hunter',
    BERSERKER = 'berserker',
    BARD = 'bard',
    MONK = 'monk',
    DRUID = 'druid',
    NECROMANCER = 'necromancer',
    WITCH = 'witch',
    MARTIAL_ARTIST = 'martial_artist',
    TRAPPER = 'trapper',
    LICH = 'lich',
    CRONE = 'crone',
    SPELLBLADE = 'spellblade',
    SHADOWDANCER = 'shadowdancer',
    ILLUSIONIST = 'illusionist',
    BEASTMASTER = 'beastmaster',
    ELEMENTALIST = 'elementalist',
    BLOOD_KNIGHT = 'blood_knight',
    DEMONSLAYER = 'demonslayer',
    CHRONOMANCER = 'chronomancer',
    STARCALLER = 'starcaller',
    SOULREAPER = 'soulreaper',
    PLAGUE_DOCTOR = 'plague_doctor',
    ALCHEMIST = 'alchemist',
    SHAMAN = 'shaman',
    RUNEKEEPER = 'runekeeper',
    FROSTBORN = 'frostborn',
    PYROMANCER = 'pyromancer',
    STORMCALLER = 'stormcaller',
    SWORDSAINT = 'swordsaint',
    DRAGONKNIGHT = 'dragonknight',
    PHOENIXBORN = 'phoenixborn',
    MOONBLADE = 'moonblade',
    SUNSAGE = 'sunsage',
    VOIDWALKER = 'voidwalker',
    DREAMWEAVER = 'dreamweaver',
    GRAVESHAPER = 'graveshaper',
    SANDSTALKER = 'sandstalker',
    THAUMATURGE = 'thaumaturge',
    GEOMANCER = 'geomancer',
    SPIRITCALLER = 'spiritcaller',
    FATESINGER = 'fatesinger',
    STARFORGED = 'starforged',
    CELESTIAL = 'celestial',
    TANK = "TANK",
    MAGE = "MAGE",
    HEALER = "HEALER",
    ASSASSIN = "ASSASSIN",
    DAMAGE_DEALER = "DAMAGE_DEALER",
    PRIEST = "PRIEST",
    WARLOCK = "WARLOCK",
    RANGER = "RANGER",
    // ...add more if needed
}

export enum Rarity {
    COMMON = 'common',
    UNCOMMON = 'uncommon',
    RARE = 'rare',
    EPIC = 'epic',
    LEGENDARY = 'legendary'
}

export interface Position {
    x: number;
    y: number;
}

export interface StatusEffect {
    type: string; // e.g. 'poison', 'burn', 'chill', 'freeze', 'attack_up', etc.
    duration: number; // in turns
    value: number; // effect magnitude (damage per turn, stat change, etc.)
}

export interface Skill {
    id: string;
    name: string;
    description: string;
    damage?: number;
    healing?: number;
    cooldown: number;
    range: number;
    manaCost: number;
    isUltimate: boolean;
    statusEffect?: StatusEffect;
}

// The static/gacha character definition (for gacha pool, base stats)
export interface CharacterBase {
    id: string;
    name: string;
    class: CharacterClass;
    rarity: Rarity;
    maxHealth: number;
    maxEnergy: number;
    energyGain: number;
    attack: number;
    defense: number;
    speed: number;
    skills: Skill[];
    ultimateSkill: Skill;
}

// The player's owned character (in collection, with progression)
export interface PlayerCharacter extends CharacterBase {
    level: number;
    xp: number; // Current XP
    xpToNextLevel: number; // XP required for next level
    shards: number;
    equippedWeapon?: InventoryItem | null;
    equippedArmor?: InventoryItem | null;
    equippedTrinkets?: [InventoryItem | null, InventoryItem | null];
}

// The character in battle (with current stats)
export interface BattleCharacter extends PlayerCharacter {
    health: number;
    energy: number;
    isAlive: boolean;
    maxLevel?: number;
    position?: Position;
    // Optionally: add status effects, buffs, etc.
}

export interface Team {
    id: string;
    name: string;
    characters: PlayerCharacter[];
    maxSize: number;
}

export interface BattleState {
    playerTeam: Team;
    enemyTeam: Team;
    currentTurn: 'player' | 'enemy';
    turnOrder: string[]; // Character IDs
    currentCharacterId: string | null;
    battlePhase: 'setup' | 'combat' | 'victory' | 'defeat';
    turnCount: number;
}

export interface GameMode {
    id: string;
    name: string;
    description: string;
    type: 'story' | 'daily' | 'dungeon' | 'pvp' | 'event';
    energyCost: number;
    rewards: Reward[];
}

export interface Reward {
    type: 'currency' | 'material' | 'character' | 'gear';
    id: string;
    amount: number;
    rarity?: Rarity;
}

export interface PlayerProgress {
    level: number;
    experience: number;
    crystals: number; // Renamed from currency
    energy: number;
    maxEnergy: number;

    soloProgress: number; // Highest unlocked solo stage (1 = chapter 1 stage 1)
    unlockedCharacters: string[]; // List of owned character IDs
    inventory: InventoryItem[]; // Player's inventory
}

export interface InventoryItem {
    id: string;
    type: 'material' | 'gear' | 'consumable' | 'weapon' | 'armor' | 'trinket';
    name: string;
    quantity: number;
    rarity: Rarity;
}

export interface GachaPool {
    id: string;
    name: string;
    characters: {
        characterId: string;
        dropRate: number;
        rarity: Rarity;
    }[];
    cost: number;
    currency: 'gems' | 'coins';
}
