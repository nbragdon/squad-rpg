import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { gachaCharacters } from '../data/characters';
import { getXpToNextLevel, levelUp } from '../data/leveling';
import { BattleCharacter, PlayerCharacter, Rarity } from '../types/game';

const CHAPTERS = 5;
const STAGES_PER_CHAPTER = 10;

function getStageEnemy(chapter: number, stage: number): BattleCharacter {
    // Find a character of the right rarity
    let rarity: Rarity = Rarity.COMMON;
    if (chapter === 2) rarity = Rarity.UNCOMMON;
    if (chapter === 3) rarity = Rarity.RARE;
    if (chapter === 4) rarity = Rarity.EPIC;
    if (chapter === 5) rarity = Rarity.LEGENDARY;
    const pool = gachaCharacters.filter(c => c.rarity === rarity);
    const base = { ...pool[Math.floor(Math.random() * pool.length)] };
    // Stat scaling
    let scale = 1;
    if (chapter === 1) {
        if (stage <= 3) scale = 0.7;
        else if (stage <= 7) scale = 0.85;
        else if (stage <= 9) scale = 1;
        else scale = 1.2;
    } else if (chapter === 2) {
        scale = 0.8 + 0.04 * (stage - 1);
    } else if (chapter === 3) {
        scale = 0.9 + 0.05 * (stage - 1);
    } else if (chapter === 4) {
        scale = 1 + 0.06 * (stage - 1);
    } else if (chapter === 5) {
        scale = 1.1 + 0.1 * (stage - 1);
    }
    // Create as BattleCharacter
    return {
        ...base,
        level: (chapter - 1) * STAGES_PER_CHAPTER + stage,
        shards: 0,
        xp: 0,
        xpToNextLevel: getXpToNextLevel((chapter - 1) * STAGES_PER_CHAPTER + stage),
        health: Math.round(base.maxHealth * scale),
        energy: 0,
        isAlive: true
    };
}

function calculateDamage(attacker: BattleCharacter, defender: BattleCharacter) {
    const raw = attacker.attack * (100 / (100 + defender.defense));
    return Math.max(1, Math.round(raw));
}

function getSoloStageNumber(chapter: number, stage: number) {
    return (chapter - 1) * STAGES_PER_CHAPTER + stage;
}

function isUnlocked(chapter: number, stage: number, soloProgress?: number) {
    // soloProgress is the highest unlocked stage (1-based)
    const stageNum = getSoloStageNumber(chapter, stage);
    return (soloProgress ?? 1) >= stageNum;
}

const SoloMode: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { playerProgress, setPlayerProgress } = useGame();
    const [chapter, setChapter] = useState(1);
    const [stage, setStage] = useState(1);
    const [selectedChar, setSelectedChar] = useState<PlayerCharacter | null>(null);
    const [battleState, setBattleState] = useState<'select' | 'battle' | 'victory' | 'defeat'>('select');
    const [battleLog, setBattleLog] = useState<string[]>([]);
    const [player, setPlayer] = useState<BattleCharacter | null>(null);
    const [enemy, setEnemy] = useState<BattleCharacter | null>(null);
    const [turn, setTurn] = useState<'player' | 'enemy'>('player');
    const [auto, setAuto] = useState(false);
    const [modalCharacter, setModalCharacter] = useState<PlayerCharacter | null>(null);
    const [selectedSkill, setSelectedSkill] = useState<any>(null);
    const [hoveredSkill, setHoveredSkill] = useState<any>(null);
    const [abilityDetail, setAbilityDetail] = useState<any>(null);

    // Get owned characters (should be PlayerCharacter[])
    const ownedChars: PlayerCharacter[] = gachaCharacters
        .filter(c => playerProgress.unlockedCharacters && playerProgress.unlockedCharacters.includes(c.id))
        .map(base => ({
            ...base,
            level: 1,
            xp: 0,
            xpToNextLevel: getXpToNextLevel(1),
            shards: 0
        })); // TODO: load real level/shards/xp from player data

    // Helper to reset battle state
    function resetBattle() {
        setBattleLog([]);
        setPlayer(null);
        setEnemy(null);
        setTurn('player');
        setAuto(false);
    }

    // Award XP to player and handle level up
    function awardXpAndLevelUp(playerChar: PlayerCharacter, enemyChar: BattleCharacter) {
        // Example XP formula: 20 * enemy level
        const xpGained = 20 * enemyChar.level;
        let updatedChar = { ...playerChar, xp: (playerChar.xp ?? 0) + xpGained };
        const beforeLevel = updatedChar.level;
        updatedChar = levelUp(updatedChar);
        let log = [`You gained ${xpGained} XP!`];
        if (updatedChar.level > beforeLevel) {
            log.push(`Level up! Lv. ${updatedChar.level} (+${updatedChar.level - beforeLevel})`);
            log.push(`Stats increased!`);
        }
        // Return a BattleCharacter with current battle stats
        return {
            updatedChar: {
                ...updatedChar,
                health: player?.health ?? updatedChar.maxHealth,
                energy: player?.energy ?? 0,
                isAlive: player?.isAlive ?? true
            },
            log
        };
    }

    // Start battle
    function startBattle() {
        if (!selectedChar) return;
        const playerCopy = {
            ...selectedChar,
            health: selectedChar.maxHealth,
            energy: 0,
            isAlive: true,
            xp: selectedChar.xp ?? 0,
            xpToNextLevel: selectedChar.xpToNextLevel ?? getXpToNextLevel(selectedChar.level ?? 1)
        };
        const enemyChar = getStageEnemy(chapter, stage);
        setPlayer(playerCopy);
        setEnemy(enemyChar);
        setBattleLog([`Battle Start! ${playerCopy.name} vs ${enemyChar.name}`]);
        if (playerCopy.speed >= enemyChar.speed) {
            setTurn('player');
            setBattleState('battle');
        } else {
            setTurn('enemy');
            setBattleState('battle');
            setTimeout(() => doTurn(), 700);
        }
    }

    // Ability detail modal
    {
        abilityDetail && (
            <div className="solo-modal-overlay" onClick={() => setAbilityDetail(null)}>
                <div className="solo-modal" onClick={e => e.stopPropagation()} style={{ background: '#222', color: '#fff', borderRadius: 12, padding: 24, maxWidth: 340, margin: '40px auto' }}>
                    <button style={{ float: 'right', fontSize: 20 }} onClick={() => setAbilityDetail(null)}>&times;</button>
                    <h2>{abilityDetail.name}</h2>
                    <div style={{ fontSize: 13, color: '#ccc' }}>{abilityDetail.description}</div>
                    <div style={{ fontSize: 12, color: '#aaa', marginTop: 8 }}>
                        {typeof abilityDetail.damage === 'number' && (
                            <span>Damage: {abilityDetail.damage} (scales with Attack)</span>
                        )}
                        {typeof abilityDetail.healing === 'number' && (
                            <span>Healing: {abilityDetail.healing} (scales with Attack)</span>
                        )}
                        {abilityDetail.manaCost > 0 && (
                            <span> &nbsp;|&nbsp; Energy Cost: {abilityDetail.manaCost}</span>
                        )}
                        {abilityDetail.statusEffect && (
                            <span> &nbsp;|&nbsp; {abilityDetail.statusEffect.type.charAt(0).toUpperCase() + abilityDetail.statusEffect.type.slice(1)}: {abilityDetail.statusEffect.value} ({abilityDetail.statusEffect.duration} turn{abilityDetail.statusEffect.duration > 1 ? 's' : ''})</span>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Handle a single turn
    function doTurn(skillOverride?: any) {
        if (!player || !enemy) return;
        let log: string[] = [];
        let playerCopy = { ...player };
        let enemyCopy = { ...enemy };
        if (turn === 'player') {
            const skill = skillOverride || selectedSkill || { id: 'basic_attack', name: 'Basic Attack', damage: playerCopy.attack, manaCost: 0 };
            if (skill.manaCost && playerCopy.energy < skill.manaCost) {
                log.push(`Not enough energy for ${skill.name}!`);
            } else {
                // Player action
                let playerDidAttack = false;
                if (skill.id === 'basic_attack') {
                    let dmg = playerCopy.attack;
                    enemyCopy.health = Math.max(0, enemyCopy.health - dmg);
                    log.push(`${playerCopy.name} uses Basic Attack for ${dmg} damage!`);
                    playerDidAttack = true;
                } else {
                    playerCopy.energy -= skill.manaCost;
                    let dmg = skill.damage ? skill.damage : playerCopy.attack;
                    if (skill.statusEffect && skill.statusEffect.type === 'heal') {
                        playerCopy.health = Math.min(playerCopy.maxHealth, playerCopy.health + (skill.healing || 0));
                        log.push(`${playerCopy.name} uses ${skill.name} and heals for ${(skill.healing || 0)}!`);
                    } else {
                        enemyCopy.health = Math.max(0, enemyCopy.health - dmg);
                        log.push(`${playerCopy.name} uses ${skill.name} for ${dmg} damage!`);
                        playerDidAttack = true;
                    }
                }
                playerCopy.energy = Math.min(playerCopy.maxEnergy, playerCopy.energy + playerCopy.energyGain);
                if (enemyCopy.health <= 0) {
                    log.push(`${enemyCopy.name} is defeated!`);
                    const { updatedChar, log: xpLog } = awardXpAndLevelUp(playerCopy, enemyCopy);
                    log = [...log, ...xpLog];
                    setBattleLog(prev => [...prev, ...log]);
                    setPlayer(updatedChar);
                    setEnemy(enemyCopy);
                    setBattleState('victory');
                    updateProgress();
                    setSelectedSkill(null);
                    return;
                }
                // Enemy counterattack (if still alive)
                if (playerDidAttack) {
                    const dmg = calculateDamage(enemyCopy, playerCopy);
                    playerCopy.health = Math.max(0, playerCopy.health - dmg);
                    log.push(`${enemyCopy.name} attacks for ${dmg} damage!`);
                    enemyCopy.energy = Math.min(enemyCopy.maxEnergy, enemyCopy.energy + enemyCopy.energyGain);
                    if (playerCopy.health <= 0) {
                        log.push(`${playerCopy.name} is defeated!`);
                        setBattleLog(prev => [...prev, ...log]);
                        setPlayer(playerCopy);
                        setBattleState('defeat');
                        return;
                    }
                }
                setBattleLog(prev => [...prev, ...log]);
                setPlayer(playerCopy);
                setEnemy(enemyCopy);
                setTurn('player');
                setSelectedSkill(null);
            }
        } else if (turn === 'enemy') {
            // Enemy goes first (e.g., faster enemy at battle start)
            const dmg = calculateDamage(enemyCopy, playerCopy);
            playerCopy.health = Math.max(0, playerCopy.health - dmg);
            log.push(`${enemyCopy.name} attacks for ${dmg} damage!`);
            enemyCopy.energy = Math.min(enemyCopy.maxEnergy, enemyCopy.energy + enemyCopy.energyGain);
            if (playerCopy.health <= 0) {
                log.push(`${playerCopy.name} is defeated!`);
                setBattleLog(prev => [...prev, ...log]);
                setPlayer(playerCopy);
                setBattleState('defeat');
                return;
            }
            setBattleLog(prev => [...prev, ...log]);
            setPlayer(playerCopy);
            setEnemy(enemyCopy);
            setTurn('player');
        }
    }

    // Auto mode effect
    React.useEffect(() => {
        if (battleState === 'battle' && auto && player && enemy && turn === 'player') {
            if (player.health > 0 && enemy.health > 0) {
                const timeout = setTimeout(() => doTurn(), 700);
                return () => clearTimeout(timeout);
            }
        }
    }, [battleState, auto, player, enemy, turn]);

    // Load auto mode from localStorage on mount
    React.useEffect(() => {
        const autoPref = localStorage.getItem('squadRpgAuto');
        if (autoPref === 'true') setAuto(true);
    }, []);

    // Update solo progress on victory
    function updateProgress() {
        const stageNum = getSoloStageNumber(chapter, stage);
        let newProgress = { ...playerProgress };
        let firstClear = false;
        if ((playerProgress.soloProgress ?? 1) < stageNum + 1) {
            newProgress.soloProgress = stageNum + 1;
            firstClear = true;
        }
        // Always give 10 crystals for any clear
        let crystalsGained = 10;
        // First time clear bonus by chapter
        if (firstClear) {
            if (chapter === 1) crystalsGained += 250;
            else if (chapter === 2) crystalsGained += 500;
            else if (chapter === 3) crystalsGained += 750;
            else if (chapter === 4) crystalsGained += 1000;
            else if (chapter === 5) crystalsGained += 1500;
        }
        newProgress.crystals = (newProgress.crystals ?? 0) + crystalsGained;
        setPlayerProgress(newProgress);
        setBattleLog(prev => [...prev, `You gained ${crystalsGained} crystals!`]);
    }

    // Add this function above your JSX return
    function handleAbilityClick(skill: any) {
        setSelectedSkill(skill);
        setTimeout(() => doTurn(skill), 100); // slight delay for UI feedback
    }

    // UI rendering
    return (
        <div className="solo-mode-container">
            <button className="solo-back" onClick={() => {
                setBattleState('select');
                resetBattle();
                onBack();
            }}>&larr; Back</button>
            <h2>Solo Mode</h2>
            <div className="solo-chapter-select">
                {Array.from({ length: CHAPTERS }, (_, i) => (
                    <button
                        key={i}
                        className={chapter === i + 1 ? 'selected' : ''}
                        style={{
                            background: chapter === i + 1 ? '#ffd700' : '#333',
                            color: chapter === i + 1 ? '#222' : '#fff',
                            border: chapter === i + 1 ? '2px solid #ffd700' : '1px solid #888',
                            fontWeight: chapter === i + 1 ? 'bold' : 'normal',
                            borderRadius: 8,
                            margin: 2,
                            padding: '6px 16px',
                            cursor: isUnlocked(i + 1, 1, playerProgress.soloProgress) ? 'pointer' : 'not-allowed',
                        }}
                        onClick={() => { setChapter(i + 1); setStage(1); setSelectedChar(null); resetBattle(); setBattleState('select'); }}
                        disabled={!isUnlocked(i + 1, 1, playerProgress.soloProgress)}
                    >
                        Chapter {i + 1}
                    </button>
                ))}
            </div>
            <div className="solo-stage-select">
                {Array.from({ length: STAGES_PER_CHAPTER }, (_, i) => {
                    const unlocked = isUnlocked(chapter, i + 1, playerProgress.soloProgress);
                    const selected = stage === i + 1;
                    let bg = '#888', color = '#fff', border = '1px solid #888', fontWeight = 'normal';
                    if (selected) {
                        bg = '#ffd700'; color = '#222'; border = '2px solid #ffd700'; fontWeight = 'bold';
                    } else if (unlocked) {
                        bg = '#333'; color = '#fff'; border = '1px solid #888';
                    } else {
                        bg = '#222'; color = '#888'; border = '1px solid #444';
                    }
                    return (
                        <button
                            key={i}
                            className={selected ? 'selected' : ''}
                            style={{
                                background: bg,
                                color,
                                border,
                                fontWeight,
                                borderRadius: 8,
                                margin: 2,
                                padding: '6px 16px',
                                cursor: unlocked ? 'pointer' : 'not-allowed',
                            }}
                            onClick={() => { setStage(i + 1); setSelectedChar(null); resetBattle(); setBattleState('select'); }}
                            disabled={!unlocked}
                        >
                            Stage {i + 1}
                        </button>
                    );
                })}
            </div>
            {battleState === 'select' && (
                <div className="solo-char-select">
                    <h3>Choose Your Fighter</h3>
                    <div className="solo-char-list">
                        {ownedChars.length === 0 && <div>You have no characters! Pull from the Gacha first.</div>}
                        {ownedChars.map(char => (
                            <div
                                key={char.id}
                                className={`solo-char-card${selectedChar?.id === char.id ? ' selected' : ''}`}
                                onClick={() => setSelectedChar(char)}
                                style={{ cursor: 'pointer', border: selectedChar?.id === char.id ? '2px solid #ffd700' : '1px solid #ccc', borderRadius: 8, padding: 8, margin: 4, background: '#222', color: '#fff', minWidth: 120 }}
                            >
                                <div style={{ fontWeight: 'bold', fontSize: 18 }}>{char.name}</div>
                                <div style={{ fontSize: 14 }}>{char.class}</div>
                                <div style={{ fontSize: 12, color: '#aaa' }}>Lv. {char.level}</div>
                                <button style={{ marginTop: 6, fontSize: 12 }} onClick={e => { e.stopPropagation(); setModalCharacter(char); }}>View Details</button>
                            </div>
                        ))}
                    </div>
                    <button className="solo-battle-start" onClick={startBattle} disabled={!selectedChar}>Start Battle</button>
                    {modalCharacter && (
                        <div className="solo-modal-overlay" onClick={() => setModalCharacter(null)}>
                            <div className="solo-modal" onClick={e => e.stopPropagation()} style={{ background: '#222', color: '#fff', borderRadius: 12, padding: 24, maxWidth: 340, margin: '40px auto' }}>
                                <button style={{ float: 'right', fontSize: 20 }} onClick={() => setModalCharacter(null)}>&times;</button>
                                <h2>{modalCharacter.name}</h2>
                                <div>Class: {modalCharacter.class}</div>
                                <div>Rarity: {modalCharacter.rarity}</div>
                                <div>Level: {modalCharacter.level}</div>
                                <div>HP: {modalCharacter.maxHealth}</div>
                                <div>ATK: {modalCharacter.attack}</div>
                                <div>DEF: {modalCharacter.defense}</div>
                                <div>SPD: {modalCharacter.speed}</div>
                                <div>Energy: {modalCharacter.maxEnergy}</div>
                                <div style={{ marginTop: 10 }}><b>Abilities:</b></div>
                                {[...modalCharacter.skills, { ...modalCharacter.ultimateSkill, isUltimate: true }].map(skill => (
                                    <div key={skill.id} style={{ marginBottom: 8, padding: 6, background: skill.isUltimate ? '#333' : 'none', borderRadius: 6 }}>
                                        <b>{skill.name}</b> {skill.isUltimate && <span style={{ color: '#ffd700' }}>(Ultimate)</span>}
                                        <div style={{ fontSize: 13, color: '#ccc' }}>{skill.description}</div>
                                        <div style={{ fontSize: 12, color: '#aaa' }}>
                                            {typeof skill.damage === 'number' && (
                                                <span>Damage: {skill.damage} (scales with Attack)</span>
                                            )}
                                            {typeof skill.healing === 'number' && (
                                                <span>Healing: {skill.healing} (scales with Attack)</span>
                                            )}
                                            {skill.manaCost > 0 && (
                                                <span> &nbsp;|&nbsp; Energy Cost: {skill.manaCost}</span>
                                            )}
                                            {skill.statusEffect && (
                                                <span> &nbsp;|&nbsp; {skill.statusEffect.type.charAt(0).toUpperCase() + skill.statusEffect.type.slice(1)}: {skill.statusEffect.value} ({skill.statusEffect.duration} turn{skill.statusEffect.duration > 1 ? 's' : ''})</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            {battleState === 'battle' && player && enemy && (
                <>
                    {/* Multi-character turn order display (future-proofed) */}
                    <div className="solo-turn-order" style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 8 }}>
                        {/* For now, just player and enemy, but support for arrays */}
                        {[player, enemy].map((char, idx) => (
                            <span
                                key={char.id}
                                style={{
                                    fontWeight: (turn === 'player' && idx === 0) || (turn === 'enemy' && idx === 1) ? 'bold' : 'normal',
                                    color: (turn === 'player' && idx === 0) || (turn === 'enemy' && idx === 1) ? '#ffd700' : '#fff',
                                    marginRight: idx === 0 ? 4 : 0
                                }}
                            >
                                {char.name} {idx === 0 ? '(You)' : '(Enemy)'}
                            </span>
                        ))}
                        {/* In the future, replace [player, enemy] with a turnOrder array of BattleCharacters */}
                    </div>
                    <div className="solo-battle-ui">
                        <div className="solo-battle-chars">
                            <div className="solo-battle-player">
                                <h4>{player.name} (You)</h4>
                                <div>HP: {player.health} / {player.maxHealth}</div>
                                <div>Energy: {player.energy} / {player.maxEnergy}</div>
                            </div>
                            <div className="solo-battle-enemy">
                                <h4>{enemy.name} (Enemy)</h4>
                                <div>HP: {enemy.health} / {enemy.maxHealth}</div>
                                <div>Energy: {enemy.energy} / {enemy.maxEnergy}</div>
                            </div>
                        </div>
                        {/* Ability button grid: always show details below each button, grid layout */}
                        <div className="solo-battle-controls" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto', width: '100%' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${player.skills.length + 2}, minmax(140px, 1fr))`, gap: 16, justifyContent: 'center', width: '100%' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <button
                                        className={`solo-skill-btn main-btn${selectedSkill?.id === 'basic_attack' ? ' selected' : ''}`}
                                        style={{ minWidth: 120, background: '#ffd700', color: '#222', fontWeight: 'bold', border: '2px solid #ffd700' }}
                                        onClick={() => handleAbilityClick({ id: 'basic_attack', name: 'Basic Attack', damage: player.attack, manaCost: 0 })}
                                    >
                                        Basic Attack<br /><span style={{ fontSize: 11, color: '#444' }}>({player.attack} dmg, 0 energy)</span>
                                    </button>
                                    <div style={{ fontSize: 12, color: '#222', background: '#ffe066', borderRadius: 6, padding: 6, marginTop: 2, minWidth: 120, textAlign: 'center' }}>
                                        A basic attack that deals {player.attack} damage. No energy cost.
                                    </div>
                                </div>
                                {player.skills.map(skill => (
                                    <div key={skill.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <button
                                            className={`solo-skill-btn main-btn${selectedSkill?.id === skill.id ? ' selected' : ''}`}
                                            style={{ minWidth: 120, background: player.energy >= skill.manaCost ? '#333' : '#888', color: '#fff', fontWeight: 'bold', border: player.energy >= skill.manaCost ? '2px solid #888' : '2px solid #444' }}
                                            onClick={() => handleAbilityClick(skill)}
                                            disabled={player.energy < skill.manaCost}
                                        >
                                            {skill.name}<br /><span style={{ fontSize: 11, color: '#ffd700' }}>({skill.damage || player.attack} dmg, {skill.manaCost} energy)</span>
                                        </button>
                                        <div style={{ fontSize: 12, color: '#fff', background: '#222', borderRadius: 6, padding: 6, marginTop: 2, minWidth: 120, textAlign: 'center', border: '1px solid #ffd700' }}>
                                            {skill.description}<br />
                                            {typeof skill.damage === 'number' && <span>Damage: {skill.damage} (scales with Attack)<br /></span>}
                                            {typeof skill.healing === 'number' && <span>Healing: {skill.healing} (scales with Attack)<br /></span>}
                                            {skill.manaCost > 0 && <span>Energy Cost: {skill.manaCost}<br /></span>}
                                            {skill.statusEffect && <span>{skill.statusEffect.type.charAt(0).toUpperCase() + skill.statusEffect.type.slice(1)}: {skill.statusEffect.value} ({skill.statusEffect.duration} turn{skill.statusEffect.duration > 1 ? 's' : ''})</span>}
                                        </div>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <button
                                        className={`solo-skill-btn main-btn${selectedSkill?.id === player.ultimateSkill.id ? ' selected' : ''}`}
                                        style={{ minWidth: 120, background: player.energy >= player.ultimateSkill.manaCost ? '#ffd700' : '#888', color: player.energy >= player.ultimateSkill.manaCost ? '#222' : '#fff', fontWeight: 'bold', border: '2px solid #ffd700' }}
                                        onClick={() => handleAbilityClick(player.ultimateSkill)}
                                        disabled={player.energy < player.ultimateSkill.manaCost}
                                    >
                                        {player.ultimateSkill.name}<br /><span style={{ fontSize: 11, color: '#222' }}>({player.ultimateSkill.damage || player.attack} dmg, {player.ultimateSkill.manaCost} energy)</span>
                                    </button>
                                    <div style={{ fontSize: 12, color: '#222', background: '#ffe066', borderRadius: 6, padding: 6, marginTop: 2, minWidth: 120, textAlign: 'center', border: '1px solid #ffd700' }}>
                                        {player.ultimateSkill.description}<br />
                                        {typeof player.ultimateSkill.damage === 'number' && <span>Damage: {player.ultimateSkill.damage} (scales with Attack)<br /></span>}
                                        {typeof player.ultimateSkill.healing === 'number' && <span>Healing: {player.ultimateSkill.healing} (scales with Attack)<br /></span>}
                                        {player.ultimateSkill.manaCost > 0 && <span>Energy Cost: {player.ultimateSkill.manaCost}<br /></span>}
                                        {player.ultimateSkill.statusEffect && <span>{player.ultimateSkill.statusEffect.type.charAt(0).toUpperCase() + player.ultimateSkill.statusEffect.type.slice(1)}: {player.ultimateSkill.statusEffect.value} ({player.ultimateSkill.statusEffect.duration} turn{player.ultimateSkill.statusEffect.duration > 1 ? 's' : ''})</span>}
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
                                <button onClick={() => setAuto(a => {
                                    localStorage.setItem('squadRpgAuto', (!a).toString());
                                    return !a;
                                })}>{auto ? 'Auto: ON' : 'Auto: OFF'}</button>
                                <button onClick={() => { setBattleState('select'); resetBattle(); }}>Forfeit</button>
                            </div>
                        </div>
                        <div className="solo-battle-log">
                            {battleLog.slice(-8).map((line, i) => <div key={i}>{line}</div>)}
                        </div>
                    </div>
                </>
            )}
            {battleState === 'victory' && (
                <div className="solo-battle-result victory">
                    <h3>Victory!</h3>
                    <div>Stage Cleared!</div>
                    <button onClick={() => { setBattleState('select'); resetBattle(); }}>Continue</button>
                </div>
            )}
            {battleState === 'defeat' && (
                <div className="solo-battle-result defeat">
                    <h3>Defeat</h3>
                    <div>Try again or pick a different character.</div>
                    <button onClick={() => { setBattleState('select'); resetBattle(); }}>Retry</button>
                </div>
            )}
        </div>
    );
};

export default SoloMode;
