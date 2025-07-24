import React, { useEffect, useState } from 'react';
import { BattleEngine } from '../battle';
import { BattleState } from '../battle/battleTypes';
import { useGame } from '../context/GameContext';
import { gachaCharacters } from '../data/characters';
import { levelUp } from '../data/leveling';
import { BattleCharacter, PlayerCharacter, Position, Team } from '../types/game';
import BattleDisplay from './BattleDisplay';
import './BattleScreen.css';

interface BattleScreenProps {
    playerTeam: Team;
    onBack: () => void;
}

const BattleScreen: React.FC<BattleScreenProps> = ({ playerTeam, onBack }) => {
    const { playerProgress, setPlayerProgress } = useGame();
    const [battleEngine, setBattleEngine] = useState<BattleEngine | null>(null);
    const [battleState, setBattleState] = useState<BattleState | null>(null);
    const [selectedCharacter, setSelectedCharacter] = useState<BattleCharacter | null>(null);
    const [xpLogs, setXpLogs] = useState<string[]>([]);

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
            turnCount: 1,
            battleLog: ['Battle begins!'], // <-- Add this line to satisfy BattleState type
        };

        setBattleState(initialBattleState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            // addToBattleLog(`${target.name} is defeated!`);
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
            // addToBattleLog('Defeat! Your team has been defeated.');
        } else if (!enemyAlive) {
            updatedBattleState.battlePhase = 'victory';
            // addToBattleLog('Victory! You have defeated the enemy team!');
            // Award XP to all player characters
            const playerChars = updatedBattleState.playerTeam.characters as PlayerCharacter[];
            const enemyLevels = updatedBattleState.enemyTeam.characters.map(c => c.level || 1);
            awardXpToTeam(playerChars, enemyLevels);
        }
        setBattleState(updatedBattleState);
    };

    // Award XP to all participating characters based on average enemy level
    function awardXpToTeam(team: PlayerCharacter[], enemyLevels: number[]) {
        const avgLevel = Math.round(enemyLevels.reduce((a, b) => a + b, 0) / enemyLevels.length);
        const xpGained = 20 * avgLevel;
        let updatedCharacterProgress = { ...(playerProgress.characterProgress || {}) };
        let updatedTeam: PlayerCharacter[] = [];
        let logs: string[] = [];
        team.forEach(char => {
            let updatedChar = { ...char, xp: (char.xp ?? 0) + xpGained };
            const beforeLevel = updatedChar.level;
            updatedChar = levelUp(updatedChar);
            updatedCharacterProgress[updatedChar.id] = {
                level: updatedChar.level,
                xp: updatedChar.xp,
                xpToNextLevel: updatedChar.xpToNextLevel,
                shards: updatedChar.shards || 0
            };
            updatedTeam.push(updatedChar);
            logs.push(`${updatedChar.name} gained ${xpGained} XP!`);
            if (updatedChar.level > beforeLevel) {
                logs.push(`${updatedChar.name} leveled up! Lv. ${updatedChar.level} (+${updatedChar.level - beforeLevel})`);
                logs.push('Stats increased!');
            }
        });
        setPlayerProgress({ ...playerProgress, characterProgress: updatedCharacterProgress });
        setXpLogs(logs);
        return { updatedTeam, logs };
    }

    // Prepare player and enemy arrays for the engine
    const playerArr = playerTeam.characters;
    const enemyArr = [
        { id: 'slime_green', level: 1 },
        { id: 'rat_giant', level: 1 },
        { id: 'bat_cave', level: 1 }
    ]; // TODO: use real stage logic
    const engine = new BattleEngine({ playerCharacters: playerArr, enemies: enemyArr });
    setBattleEngine(engine);
    setBattleState(engine.getState());

    function handleBattleAction(action: any) {
        if (!battleEngine) return;
        // Example: battleEngine.attack(...)
        // setBattleState(battleEngine.getState());
    }

    if (!battleState) {
        return <div className="battle-screen">Loading battle...</div>;
    }

    return (
        <div className="battle-screen">
            <BattleDisplay
                battleState={battleState}
                onAction={handleBattleAction}
                onVictory={onBack}
                onDefeat={onBack}
            />
        </div>
    );
};

export default BattleScreen;
