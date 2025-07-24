import React, { createContext, useContext, useEffect, useState } from 'react';
import { Team } from '../types/game';

interface TeamContextType {
    playerTeam: Team;
    setPlayerTeam: (team: Team) => void;
}

const defaultTeam: Team = {
    id: 'player_team',
    name: 'Player Team',
    characters: [],
    maxSize: 4
};

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [playerTeam, setPlayerTeam] = useState<Team>(() => {
        const stored = localStorage.getItem('playerTeam');
        return stored ? JSON.parse(stored) : defaultTeam;
    });

    useEffect(() => {
        localStorage.setItem('playerTeam', JSON.stringify(playerTeam));
    }, [playerTeam]);

    return (
        <TeamContext.Provider value={{ playerTeam, setPlayerTeam }}>
            {children}
        </TeamContext.Provider>
    );
};

export const useTeam = () => {
    const context = useContext(TeamContext);
    if (!context) throw new Error('useTeam must be used within a TeamProvider');
    return context;
};
