import React, { useEffect, useState } from 'react';
import { calculateBattleXp } from '../battle/battleEngine';
import { BattleState } from '../battle/battleTypes';
import { useGameEngine } from '../context/GameEngineContext';
import { levelUp } from '../data/leveling';
import { BattleCharacter } from '../types/game';

interface BattleDisplayProps {
    battleState: BattleState;
    onAction: (action: any) => void;
    onVictory?: () => void;
    onDefeat?: () => void;
    onFlee?: () => void;
}

const BattleDisplay: React.FC<BattleDisplayProps> = ({ battleState, onAction, onVictory, onDefeat, onFlee }) => {
    const [auto, setAuto] = useState(false);
    const { gameEngine, updateGameEngine } = useGameEngine();

    // Auto mode effect
    useEffect(() => {
        if (auto && battleState.battlePhase === 'combat' && battleState.currentTurn === 'player') {
            const player = (battleState.playerTeam.characters as BattleCharacter[]).find(c => c.id === battleState.currentCharacterId);
            const enemy = (battleState.enemyTeam.characters as BattleCharacter[]).find(c => c.isAlive);
            if (player && enemy) {
                setTimeout(() => onAction({ type: 'attack', attackerId: player.id, targetId: enemy.id }), 700);
            }
        }
    }, [auto, battleState, onAction]);

    if (!battleState) return null;

    const player = (battleState.playerTeam.characters as BattleCharacter[]).find(c => c.id === battleState.currentCharacterId);
    const isPlayerTurn = battleState.currentTurn === 'player' && player && !auto;

    // Timeline: show turn order and who has acted this round
    const timeline = battleState.turnOrder.map((id, idx) => {
        const char = [...(battleState.playerTeam.characters as BattleCharacter[]), ...(battleState.enemyTeam.characters as BattleCharacter[])].find(c => c.id === id);
        const acted = idx < battleState.turnOrder.indexOf(battleState.currentCharacterId || '');
        return (
            <span key={id} style={{
                marginRight: 8,
                opacity: acted ? 0.5 : 1,
                fontWeight: id === battleState.currentCharacterId ? 'bold' : 'normal',
                color: (battleState.playerTeam.characters as BattleCharacter[]).some(pc => pc.id === id) ? '#ffd700' : '#ff6666',
                textShadow: id === battleState.currentCharacterId ? '0 0 8px #fff' : undefined
            }}>
                {char ? char.name : id}
            </span>
        );
    });

    // Helper for info panel
    const renderCharInfo = (char: BattleCharacter) => (
        <div key={char.id} style={{ marginBottom: 6, color: char.isAlive ? '#fff' : '#888', textAlign: 'center', fontWeight: battleState.currentCharacterId === char.id ? 'bold' : 'normal', background: battleState.currentCharacterId === char.id ? 'rgba(255,255,255,0.08)' : 'none', borderRadius: 6, padding: 4 }}>
            {char.name} (Lv.{char.level})<br />
            HP: {char.health}/{char.maxHealth} &nbsp;|&nbsp; Energy: {char.energy}/{char.maxEnergy} {char.isAlive ? '' : '(KO)'}
        </div>
    );

    // Ability grid
    const renderAbilityGrid = (player: BattleCharacter) => {
        const abilities = [
            {
                key: 'basic',
                name: 'Basic Attack',
                onClick: () => {
                    const enemy = (battleState.enemyTeam.characters as BattleCharacter[]).find(c => c.isAlive);
                    if (enemy) onAction({ type: 'attack', attackerId: player.id, targetId: enemy.id });
                },
                disabled: false,
                desc: `Basic Attack: ${player.attack} damage`,
                style: { background: '#4caf50', color: '#fff' }
            },
            ...((player.skills || []).map(skill => ({
                key: skill.id,
                name: skill.name,
                onClick: () => {
                    const enemy = (battleState.enemyTeam.characters as BattleCharacter[]).find(c => c.isAlive);
                    if (enemy) onAction({ type: 'skill', skillId: skill.id, attackerId: player.id, targetId: enemy.id });
                },
                disabled: player.energy < (skill.costAmount || 0),
                desc: `${skill.description} (Cost: ${skill.costAmount || 0} energy)`,
                style: { background: '#666', color: '#fff' }
            }))),
            ...(player.ultimateSkill ? [{
                key: player.ultimateSkill.id,
                name: player.ultimateSkill.name,
                onClick: () => {
                    const enemy = (battleState.enemyTeam.characters as BattleCharacter[]).find(c => c.isAlive);
                    if (enemy) onAction({ type: 'ultimate', skillId: player.ultimateSkill.id, attackerId: player.id, targetId: enemy.id });
                },
                disabled: player.energy < (player.ultimateSkill.costAmount || 0),
                desc: `${player.ultimateSkill.description} (Cost: ${player.ultimateSkill.costAmount || 0} energy)`,
                style: { background: '#ffe066', color: '#222' }
            }] : [])
        ];
        // Pad to 4 columns
        while (abilities.length < 4) abilities.push({ key: `empty${abilities.length}`, name: '', onClick: () => { }, disabled: true, desc: '', style: { background: 'none', color: '#fff' } });
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, margin: '0 auto', maxWidth: 700 }}>
                {abilities.map((ab, i) => (
                    <div key={ab.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <button
                            onClick={ab.onClick}
                            disabled={ab.disabled}
                            style={{ ...ab.style, minWidth: 120, minHeight: 40, borderRadius: 8, marginBottom: 6, opacity: ab.disabled ? 0.5 : 1, border: ab.disabled ? '1px solid #aaa' : 'none', cursor: ab.disabled ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: 16 }}
                        >
                            {ab.name}
                        </button>
                        <div style={{ fontSize: 13, color: '#fff', textAlign: 'center', minHeight: 36 }}>{ab.desc}</div>
                    </div>
                ))}
            </div>
        );
    };

    // Only show the result message and continue button if battle is over
    const isBattleOver = battleState.battlePhase === 'victory' || battleState.battlePhase === 'defeat';

    // Helper: calculate XP gain for victory
    function getVictoryXp() {
        const playerChars = battleState.playerTeam.characters as BattleCharacter[];
        const enemyChars = battleState.enemyTeam.characters as BattleCharacter[];
        return calculateBattleXp(playerChars, enemyChars);
    }

    if (isBattleOver) {
        const handleVictory = () => {
            const xpGained = getVictoryXp();
            updateGameEngine(engine => {
                // Update XP/level for each character in player's team
                console.log(engine.player.team.characters);
                // loop through battle characters and find the matching id in the character collection and update their xp
                const updatedCharacterProgress = { ...engine.player.characterProgress };
                battleState.playerTeam.characters.forEach(char => {
                    let characterToUpdate = updatedCharacterProgress[char.id];
                    characterToUpdate.xp = (characterToUpdate.xp || 0) + xpGained;
                    characterToUpdate = levelUp(characterToUpdate);
                    updatedCharacterProgress[char.id] = characterToUpdate;
                });

                return {
                    ...engine,
                    player: {
                        ...engine.player,
                        characterProgress: updatedCharacterProgress
                    }
                };
            });
            if (onVictory) onVictory();
        };
        return (
            <div className="battle-display" style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
                {battleState.battlePhase === 'victory' && (
                    <div className="battle-result victory" style={{ textAlign: 'center', marginTop: 32 }}>
                        <h2 style={{ color: '#ffd700', marginBottom: 12 }}>Victory!</h2>
                        <div style={{ marginBottom: 8 }}>
                            {`Each character gained ${getVictoryXp()} XP!`}
                        </div>
                        {battleState.xpLogs && battleState.xpLogs.map((msg, i) => <div key={i}>{msg}</div>)}
                        <button onClick={handleVictory} style={{ marginTop: 16, background: '#ffd700', color: '#222', fontWeight: 'bold', borderRadius: 8, minWidth: 120, minHeight: 40, border: 'none', cursor: 'pointer' }}>Continue</button>
                    </div>
                )}
                {battleState.battlePhase === 'defeat' && (
                    <div className="battle-result defeat" style={{ textAlign: 'center', marginTop: 32 }}>
                        <h2 style={{ color: '#ff6666', marginBottom: 12 }}>Defeat!</h2>
                        {onDefeat && <button onClick={onDefeat} style={{ marginTop: 16, background: '#ff6666', color: '#fff', fontWeight: 'bold', borderRadius: 8, minWidth: 120, minHeight: 40, border: 'none', cursor: 'pointer' }}>Retry</button>}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="battle-display" style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
            <div style={{ marginBottom: 18, textAlign: 'center' }}>
                <strong style={{ fontSize: 18 }}>Timeline:</strong> {timeline}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 64, marginBottom: 18 }}>
                <div>
                    <h4 style={{ textAlign: 'center', marginBottom: 8 }}>Your Team</h4>
                    {(battleState.playerTeam.characters as BattleCharacter[]).map(renderCharInfo)}
                </div>
                <div>
                    <h4 style={{ textAlign: 'center', marginBottom: 8 }}>Enemies</h4>
                    {(battleState.enemyTeam.characters as BattleCharacter[]).map(renderCharInfo)}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, margin: '18px 0' }}>
                <button
                    onClick={() => setAuto(a => !a)}
                    style={{ background: auto ? '#4caf50' : '#333', color: '#fff', fontWeight: 'bold', borderRadius: 8, minWidth: 120, minHeight: 40, boxShadow: auto ? '0 0 8px #4caf50' : undefined, border: 'none', cursor: 'pointer', marginRight: 8 }}
                >
                    {auto ? 'Auto: ON' : 'Auto: OFF'}
                </button>
                <button
                    onClick={() => { if (onFlee) onFlee(); }}
                    style={{ background: '#444', color: '#fff', fontWeight: 'bold', borderRadius: 8, minWidth: 120, minHeight: 40, border: 'none', cursor: 'pointer' }}
                >
                    Flee
                </button>
            </div>
            {isPlayerTurn && player && player.isAlive && (
                <div style={{ marginBottom: 18 }}>
                    <h4 style={{ textAlign: 'center', marginBottom: 12 }}>Abilities for {player.name}</h4>
                    {renderAbilityGrid(player)}
                </div>
            )}
            <div style={{ margin: '24px 0' }}>
                <h4 style={{ textAlign: 'center', marginBottom: 8 }}>Battle Log</h4>
                <div style={{ background: '#222', color: '#fff', borderRadius: 8, padding: 12, minHeight: 80, maxHeight: 180, overflowY: 'auto', fontSize: 15, boxShadow: '0 2px 8px #0002' }}>
                    {battleState.battleLog.slice(-8).map((msg, i) => <div key={i}>{msg}</div>)}
                </div>
            </div>
        </div>
    );
};

export default BattleDisplay;
