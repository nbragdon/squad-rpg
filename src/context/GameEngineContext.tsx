import React, { createContext, useContext, useEffect, useState } from 'react';
import { GameEngine, createDefaultGameEngine } from '../engine/GameEngine';

function loadGameEngine(): GameEngine {
    const raw = localStorage.getItem('squadRpgGameEngine');
    if (!raw) return createDefaultGameEngine();
    try {
        return JSON.parse(raw);
    } catch {
        return createDefaultGameEngine();
    }
}

interface GameEngineContextType {
    gameEngine: GameEngine;
    updateGameEngine: (updater: (engine: GameEngine) => GameEngine) => void;
}

const GameEngineContext = createContext<GameEngineContextType | undefined>(undefined);

export const GameEngineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [gameEngine, setGameEngine] = useState<GameEngine>(loadGameEngine());

    // Save all game data to localStorage on every update
    useEffect(() => {
        localStorage.setItem('squadRpgGameEngine', JSON.stringify(gameEngine));
    }, [gameEngine]);

    // Single update method for all game data
    const updateGameEngine = (updater: (engine: GameEngine) => GameEngine) => {
        setGameEngine(prev => ({ ...updater(prev) })); // Always new object reference
    };

    return (
        <GameEngineContext.Provider value={{ gameEngine, updateGameEngine }}>
            {children}
        </GameEngineContext.Provider>
    );
};

export const useGameEngine = () => {
    const context = useContext(GameEngineContext);
    if (!context) throw new Error('useGameEngine must be used within a GameEngineProvider');
    return context;
}
