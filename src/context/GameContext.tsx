import React, { createContext, useContext, useEffect, useState } from 'react';
import { BattleState, PlayerProgress, Team } from '../types/game';

interface GameContextType {
    playerTeam: Team;
    setPlayerTeam: (team: Team) => void;
    playerProgress: PlayerProgress;
    setPlayerProgress: (progress: PlayerProgress) => void;
    battleState: BattleState | null;
    setBattleState: (battle: BattleState | null) => void;
}

const defaultTeam: Team = {
    id: 'player_team',
    name: 'Player Team',
    characters: [],
    maxSize: 4
};

const defaultProgress: PlayerProgress = {
    level: 1,
    experience: 0,
    crystals: 0,
    energy: 100,
    maxEnergy: 100,
    unlockedCharacters: ['warrior_1'], // Ironfoot unlocked by default
    inventory: [],
    soloProgress: 1, // Added to match PlayerProgress interface
    characterProgress: {
        'warrior_1': {
            level: 1,
            xp: 0,
            xpToNextLevel: 100,
            shards: 0
        }
    }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

function safeParse<T>(raw: string | null, fallback: T): T {
    if (!raw) return fallback;
    try {
        const parsed = JSON.parse(raw);
        return { ...fallback, ...parsed };
    } catch {
        return fallback;
    }
}

// Helper to load all app data from localStorage under 'squadRpg'
function loadAppData() {
    const raw = localStorage.getItem('squadRpg');
    if (!raw) return { playerTeam: defaultTeam, playerProgress: defaultProgress, battleState: null };
    try {
        const parsed = JSON.parse(raw);
        // Ensure Ironfoot is unlocked if unlockedCharacters is missing, null, or empty
        let loadedProgress = safeParse<PlayerProgress>(JSON.stringify(parsed.playerProgress), defaultProgress);
        if (!loadedProgress.unlockedCharacters || loadedProgress.unlockedCharacters.length === 0) {
            loadedProgress.unlockedCharacters = ['warrior_1'];
        }
        return {
            playerTeam: safeParse<Team>(JSON.stringify(parsed.playerTeam), defaultTeam),
            playerProgress: loadedProgress,
            battleState: safeParse<BattleState | null>(JSON.stringify(parsed.battleState), null)
        };
    } catch {
        return { playerTeam: defaultTeam, playerProgress: defaultProgress, battleState: null };
    }
}

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initial = loadAppData();
    const [playerTeam, setPlayerTeam] = useState<Team>(initial.playerTeam);
    const [playerProgress, setPlayerProgress] = useState<PlayerProgress>(initial.playerProgress);
    const [battleState, setBattleState] = useState<BattleState | null>(initial.battleState);

    // Save all app data under 'squadRpg' key
    useEffect(() => {
        localStorage.setItem('squadRpg', JSON.stringify({ playerTeam, playerProgress, battleState }));
    }, [playerTeam, playerProgress, battleState]);

    return (
        <GameContext.Provider value={{ playerTeam, setPlayerTeam, playerProgress, setPlayerProgress, battleState, setBattleState }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error('useGame must be used within a GameProvider');
    return context;
};
