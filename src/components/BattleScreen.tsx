import React, { useEffect, useState } from 'react';
import { gachaCharacters } from '../data/characters';
import { BattleCharacter, BattleState, PlayerCharacter, Position, Team } from '../types/game';
import './BattleScreen.css';

interface BattleScreenProps {
    playerTeam: Team;
    onBack: () => void;
}

const BattleScreen: React.FC<BattleScreenProps> = ({ playerTeam, onBack }) => {
    const [battleState, setBattleState] = useState<BattleState | null>(null);
    const [selectedCharacter, setSelectedCharacter] = useState<BattleCharacter | null>(null);
    const [battleLog, setBattleLog] = useState<string[]>([]);

    // Extend BattleCharacter to include maxLevel and position for compatibility
    function toBattleCharacter(pc: PlayerCharacter, position: Position = { x: 0, y: 0 }, maxLevel = 60): BattleCharacter {
        return {
            ...pc,
            health: pc.maxHealth,
            energy: 0,
            isAlive: true,
            maxLevel,
            position
        };
    }

    // Initialize battle when component mounts
    useEffect(() => {
        // Create enemy team (simplified for demo)
        const enemyTeam: Team = {
            id: 'enemy_team',
            name: 'Enemy Team',
            characters: gachaCharacters.slice(0, 3).map((char: any, index: number) => toBattleCharacter({ ...char, level: 1, shards: 0 }, { x: 7, y: index + 1 })),
            maxSize: 4
        };

        // Position player characters
        const positionedPlayerTeam: Team = {
            ...playerTeam,
            characters: playerTeam.characters.map((char, index) => toBattleCharacter(char, { x: 1, y: index + 1 }))
        };

        // Calculate turn order based on speed
        const allCharacters = [...positionedPlayerTeam.characters, ...enemyTeam.characters];
        const turnOrder = allCharacters
            .sort((a, b) => b.speed - a.speed)
            .map(char => char.id);

        const initialBattleState: BattleState = {
            playerTeam: positionedPlayerTeam,
            enemyTeam,
            currentTurn: 'player',
            turnOrder,
            currentCharacterId: turnOrder[0],
            battlePhase: 'combat',
            turnCount: 1
        };

        setBattleState(initialBattleState);
        addToBattleLog('Battle begins!');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addToBattleLog = (message: string) => {
        setBattleLog(prev => [...prev.slice(-9), message]); // Keep last 10 messages
    };

    const getCurrentCharacter = (): BattleCharacter | null => {
        if (!battleState || !battleState.currentCharacterId) return null;
        const allCharacters: BattleCharacter[] = [
            ...(battleState.playerTeam.characters as BattleCharacter[]),
            ...(battleState.enemyTeam.characters as BattleCharacter[])
        ];
        return allCharacters.find(char => char.id === battleState.currentCharacterId) || null;
    };

    const isPlayerCharacter = (characterId: string): boolean => {
        return battleState?.playerTeam.characters.some(char => char.id === characterId) || false;
    };

    const handleCharacterClick = (character: BattleCharacter) => {
        if (!battleState) return;

        const currentChar = getCurrentCharacter();
        if (!currentChar) return;

        // If it's player's turn and clicking on player character, select it
        if (battleState.currentTurn === 'player' && isPlayerCharacter(character.id)) {
            setSelectedCharacter(character);
            return;
        }

        // If it's player's turn and clicking on enemy, attack
        if (battleState.currentTurn === 'player' && !isPlayerCharacter(character.id) && selectedCharacter) {
            performAttack(selectedCharacter, character);
        }
    };

    const performAttack = (attacker: BattleCharacter, target: BattleCharacter) => {
        if (!battleState) return;

        const damage = Math.max(1, attacker.attack - target.defense);
        const newHealth = Math.max(0, target.health - damage);

        addToBattleLog(`${attacker.name} attacks ${target.name} for ${damage} damage!`);

        // Update battle state
        const updatedBattleState = { ...battleState };

        // Update target's health
        const allCharacters = [...updatedBattleState.playerTeam.characters, ...updatedBattleState.enemyTeam.characters];
        const targetIndex = allCharacters.findIndex(char => char.id === target.id);
        if (targetIndex !== -1) {
            allCharacters[targetIndex] = { ...target, health: newHealth, isAlive: newHealth > 0 } as BattleCharacter;

            // Update the appropriate team
            if (isPlayerCharacter(target.id)) {
                updatedBattleState.playerTeam.characters = allCharacters.filter(char =>
                    updatedBattleState.playerTeam.characters.some(pc => pc.id === char.id)
                ) as BattleCharacter[];
            } else {
                updatedBattleState.enemyTeam.characters = allCharacters.filter(char =>
                    updatedBattleState.enemyTeam.characters.some(ec => ec.id === char.id)
                ) as BattleCharacter[];
            }
        }

        if (newHealth === 0) {
            addToBattleLog(`${target.name} is defeated!`);
        }

        // Move to next turn
        nextTurn(updatedBattleState);
    };

    const nextTurn = (currentBattleState: BattleState) => {
        const currentIndex = currentBattleState.turnOrder.indexOf(currentBattleState.currentCharacterId || '');
        const nextIndex = (currentIndex + 1) % currentBattleState.turnOrder.length;
        const nextCharacterId = currentBattleState.turnOrder[nextIndex];

        const updatedBattleState = {
            ...currentBattleState,
            currentCharacterId: nextCharacterId,
            currentTurn: isPlayerCharacter(nextCharacterId) ? 'player' as const : 'enemy' as const,
            turnCount: nextIndex === 0 ? currentBattleState.turnCount + 1 : currentBattleState.turnCount
        };

        setBattleState(updatedBattleState);
        setSelectedCharacter(null);

        // Check for battle end conditions
        const playerAlive = updatedBattleState.playerTeam.characters.some(char => (char as BattleCharacter).isAlive);
        const enemyAlive = updatedBattleState.enemyTeam.characters.some(char => (char as BattleCharacter).isAlive);

        if (!playerAlive) {
            updatedBattleState.battlePhase = 'defeat';
            addToBattleLog('Defeat! Your team has been defeated.');
        } else if (!enemyAlive) {
            updatedBattleState.battlePhase = 'victory';
            addToBattleLog('Victory! You have defeated the enemy team!');
        }

        setBattleState(updatedBattleState);
    };

    const renderBattlefield = () => {
        if (!battleState) return null;

        const gridSize = 8;
        const grid = [];

        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                // In renderBattlefield, ensure all characters in grid are BattleCharacter
                const playerChar = battleState.playerTeam.characters.find(
                    char => (char as BattleCharacter).position?.x === x && (char as BattleCharacter).position?.y === y && (char as BattleCharacter).isAlive
                ) as BattleCharacter | undefined;
                const enemyChar = battleState.enemyTeam.characters.find(
                    char => (char as BattleCharacter).position?.x === x && (char as BattleCharacter).position?.y === y && (char as BattleCharacter).isAlive
                ) as BattleCharacter | undefined;
                const character = playerChar || enemyChar;

                grid.push(
                    <div
                        key={`${x}-${y}`}
                        className={`battlefield-cell ${character ? 'occupied' : ''} ${character && selectedCharacter?.id === character.id ? 'selected' : ''
                            } ${character && battleState.currentCharacterId === character.id ? 'current-turn' : ''}`}
                        onClick={() => character && handleCharacterClick(character)}
                    >
                        {character && (
                            <div className={`character-token ${playerChar ? 'player' : 'enemy'}`}>
                                <div className="character-avatar">{character.name.charAt(0)}</div>
                                <div className="health-bar">
                                    <div
                                        className="health-fill"
                                        style={{ width: `${(character.health / character.maxHealth) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                );
            }
        }

        return <div className="battlefield-grid">{grid}</div>;
    };

    if (!battleState) {
        return <div className="battle-screen">Loading battle...</div>;
    }

    return (
        <div className="battle-screen">
            <div className="battle-header">
                <button className="back-button" onClick={onBack}>
                    ← Back to Menu
                </button>
                <h2>Battle - Turn {battleState.turnCount}</h2>
                <div className="turn-indicator">
                    {battleState.currentTurn === 'player' ? 'Your Turn' : 'Enemy Turn'}
                </div>
            </div>

            <div className="battle-content">
                <div className="battlefield-container">
                    <h3>Battlefield</h3>
                    {renderBattlefield()}
                </div>

                <div className="battle-info">
                    <div className="current-character">
                        {getCurrentCharacter() && (
                            <div>
                                <h4>Current Turn: {getCurrentCharacter()?.name}</h4>
                                <div>HP: {getCurrentCharacter()?.health}/{getCurrentCharacter()?.maxHealth}</div>
                                <div>Energy: {getCurrentCharacter()?.energy}/{getCurrentCharacter()?.maxEnergy}</div>
                            </div>
                        )}
                    </div>

                    <div className="battle-log">
                        <h4>Battle Log</h4>
                        <div className="log-messages">
                            {battleLog.map((message, index) => (
                                <div key={index} className="log-message">
                                    {message}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {battleState.battlePhase === 'victory' && (
                <div className="battle-result victory">
                    <h2>Victory!</h2>
                    <button onClick={onBack}>Return to Menu</button>
                </div>
            )}

            {battleState.battlePhase === 'defeat' && (
                <div className="battle-result defeat">
                    <h2>Defeat!</h2>
                    <button onClick={onBack}>Return to Menu</button>
                </div>
            )}
        </div>
    );
};

export default BattleScreen;
