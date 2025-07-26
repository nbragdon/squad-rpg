import React, { useState } from 'react';
import { BattleEngine } from '../battle';
import { BattleCharacter, BattleState } from '../battle/battleTypes';
import { useGame } from '../context/GameContext';
import BattleDisplay from './BattleDisplay';
import './BattleScreen.css';

interface BattleScreenProps {
    playerTeam: BattleCharacter[];
    onBack: () => void;
}

const BattleScreen: React.FC<BattleScreenProps> = ({ playerTeam, onBack }) => {
    const { playerProgress, setPlayerProgress } = useGame();
    const [battleEngine, setBattleEngine] = useState<BattleEngine | null>(null);
    const [battleState, setBattleState] = useState<BattleState | null>({
            playerTeam: [],
            enemyTeam: [],
            currentTurn: 'player',
            turnOrder: [],
            currentCharacterId: '',
            battlePhase: 'combat',
            turnCount: 1,
            battleLog: ['Battle begins!'], // <-- Add this line to satisfy BattleState type
        });
    const [selectedCharacter, setSelectedCharacter] = useState<BattleCharacter | null>(null);
    const [xpLogs, setXpLogs] = useState<string[]>([]);

    if (!battleState) {
        return <div className="battle-screen">Loading battle...</div>;
    }

    return (
        <div className="battle-screen">
            <BattleDisplay
                battleState={battleState}
                onAction={() => {}}
                onVictory={onBack}
                onDefeat={onBack}
            />
        </div>
    );
};

export default BattleScreen;
