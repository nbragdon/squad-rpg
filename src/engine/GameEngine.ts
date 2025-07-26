import { BattleEngine } from '../battle/battleEngine';
import { InventoryItem, Team } from '../types/game';

export interface GameEngine {
    player: {
        id: string;
        name: string;
        crystals: number;
        items: InventoryItem[];
        team: Team;
        autoBattle: boolean;
        soloProgress: number;
        unlockedCharacters: string[];
        characterProgress?: {
            [characterId: string]: {
                level: number;
                xp: number;
                xpToNextLevel: number;
                shards: number;
            }
        };
        // Add more player properties as needed
    };
    battleEngine: BattleEngine | null;
    // Add more top-level game state as needed
    // e.g. storyProgress, unlockedCharacters, etc.
    storyProgress: number;
    // ...
}

export function createDefaultGameEngine(): GameEngine {
    return {
        player: {
            id: 'player_1',
            name: 'Player',
            crystals: 0,
            items: [],
            team: { id: 'player_team', name: 'Player Team', characters: [], maxSize: 4 },
            autoBattle: false,
            soloProgress: 1,
            unlockedCharacters: ['warrior_1'],
            characterProgress: {
                'warrior_1': {
                    level: 1,
                    xp: 0,
                    xpToNextLevel: 100,
                    shards: 0
                }
            }
        },
        battleEngine: null,
        storyProgress: 1,
    };
}
