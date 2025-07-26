import React, { useState } from 'react';
import { BattleEngine } from '../battle';
import { useGameEngine } from '../context/GameEngineContext';
import { gachaCharacters } from '../data/characters';
import { getEnemyByChapterAndStage } from '../data/enemies/enemy-map';
import { getXpToNextLevel } from '../data/leveling';
import { PlayerCharacter } from '../types/character';
import BattleDisplay from './BattleDisplay';
import CharacterModal from './CharacterModal';

const CHAPTERS = 5;
const STAGES_PER_CHAPTER = 10;

function getCrystalReward(chapter: number, stage: number, currentSoloProgress: number, newSoloProgress: number) {
    // Simple reward logic: 10 crystals per stage, bonus for chapter completion
    let reward = 50 * chapter;
    if (newSoloProgress >= currentSoloProgress) {
        if (chapter === 1) {
            reward += 250
        } else if (chapter === 2) {
            reward += 500
        } else if (chapter === 3) {
            reward += 750
        } else if (chapter === 4) {
            reward += 1000
        } else if (chapter === 5) {
            reward += 1250
        }
    }

    return reward;
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
    const { gameEngine, updateGameEngine } = useGameEngine();
    const [chapter, setChapter] = useState(1);
    const [stage, setStage] = useState(1);
    const [selectedChar, setSelectedChar] = useState<PlayerCharacter | null>(null);
    const [modalCharacter, setModalCharacter] = useState<PlayerCharacter | null>(null);

    const battleEngine = gameEngine.battleEngine;

    // Get owned characters (should be PlayerCharacter[])
    const ownedChars: PlayerCharacter[] = gachaCharacters
        .filter(c => gameEngine.player.unlockedCharacters && gameEngine.player.unlockedCharacters.includes(c.id))
        .map(base => {
            const progress = gameEngine.player.characterProgress?.[base.id];
            return progress ? { ...base, ...progress } : {
                ...base,
                level: 1,
                xp: 0,
                xpToNextLevel: getXpToNextLevel(1),
                shards: 0
            };
        });

    // Helper to reset battle state
    function resetBattle() {
        updateGameEngine(engine => ({
            ...engine,
            battleEngine: null,
        }));
    }

    // Start battle
    function startBattle() {
        if (!selectedChar) return;
        // Prepare player and enemy arrays for the engine
        const playerArr = [{...selectedChar}];
        const enemyArr = getEnemyByChapterAndStage(chapter, stage);
        const newBattleEngine = new BattleEngine({ playerCharacters: playerArr, enemies: enemyArr });
        updateGameEngine(engine => ({
            ...engine,
            battleEngine: newBattleEngine
        }))
    }

    // UI rendering
    return (
        <div className="solo-mode-container">
            <button className="solo-back" onClick={() => {
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
                            cursor: isUnlocked(i + 1, 1, gameEngine.player.soloProgress) ? 'pointer' : 'not-allowed',
                        }}
                        onClick={() => { setChapter(i + 1); setStage(1); setSelectedChar(null); resetBattle(); }}
                        disabled={!isUnlocked(i + 1, 1, gameEngine.player.soloProgress)}
                    >
                        Chapter {i + 1}
                    </button>
                ))}
            </div>
            <div className="solo-stage-select">
                {Array.from({ length: STAGES_PER_CHAPTER }, (_, i) => {
                    const unlocked = isUnlocked(chapter, i + 1, gameEngine.player.soloProgress);
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
                            onClick={() => { setStage(i + 1); setSelectedChar(null); resetBattle(); }}
                            disabled={!unlocked}
                        >
                            Stage {i + 1}
                        </button>
                    );
                })}
            </div>
            {battleEngine === null && (
                <div className="solo-char-select">
                    <h3>Choose Your Fighter</h3>
                    <button
                        className="solo-battle-start"
                        style={{ marginBottom: 18, minWidth: 160, fontSize: 16, fontWeight: 'bold', background: '#ffd700', color: '#222', border: '2px solid #ffd700', borderRadius: 8, padding: '8px 20px' }}
                        onClick={startBattle}
                        disabled={!selectedChar}
                    >
                        Start Battle
                    </button>
                    <div
                        className="solo-char-list"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                            gap: 16,
                            justifyItems: 'center',
                            margin: '0 auto',
                            maxWidth: 700
                        }}
                    >
                        {ownedChars.length === 0 && <div style={{ gridColumn: '1/-1' }}>You have no characters! Pull from the Gacha first.</div>}
                        {ownedChars.map(char => (
                            <div
                                key={char.id}
                                className={`solo-char-card${selectedChar?.id === char.id ? ' selected' : ''}`}
                                onClick={() => setSelectedChar(char)}
                                style={{
                                    cursor: 'pointer',
                                    border: selectedChar?.id === char.id ? '2px solid #ffd700' : '1px solid #ccc',
                                    borderRadius: 10,
                                    padding: 10,
                                    margin: 2,
                                    background: '#222',
                                    color: '#fff',
                                    minWidth: 0,
                                    width: '100%',
                                    maxWidth: 160,
                                    boxSizing: 'border-box',
                                    boxShadow: selectedChar?.id === char.id ? '0 0 8px #ffd70088' : '0 1px 4px #0002',
                                    transition: 'border 0.2s, box-shadow 0.2s'
                                }}
                            >
                                <div style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 2 }}>{char.name}</div>
                                <div style={{ fontSize: 13, marginBottom: 2 }}>{char.strongAffinities.join(', ')}</div>
                                <div style={{ fontSize: 12, color: '#aaa', marginBottom: 4 }}>Lv. {char.level}</div>
                                <button
                                    style={{ marginTop: 4, fontSize: 12, background: '#333', color: '#ffd700', border: '1px solid #ffd700', borderRadius: 6, padding: '3px 10px', cursor: 'pointer' }}
                                    onClick={e => { e.stopPropagation(); setModalCharacter(char); }}
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                    {modalCharacter && (
                        <CharacterModal character={modalCharacter} onClose={() => setModalCharacter(null)} />
                    )}
                </div>
            )}
            {battleEngine && (
                <BattleDisplay
                    onVictory={() => {
                        // Calculate current stage number
                        const currentStageNum = getSoloStageNumber(chapter, stage);
                        const crystalReward = getCrystalReward(chapter, stage, gameEngine.player.soloProgress, currentStageNum);
                        // If player completed the highest unlocked stage, unlock the next
                        updateGameEngine(engine => {
                            let nextStageNum = currentStageNum + 1;
                            let newProgress = engine.player.soloProgress;
                            // If stage 10 of a chapter, unlock stage 1 of next chapter
                            if (stage === STAGES_PER_CHAPTER) {
                                nextStageNum = getSoloStageNumber(chapter + 1, 1);
                            }
                            if (nextStageNum > engine.player.soloProgress) {
                                newProgress = nextStageNum;
                            }
                            return {
                                ...engine,
                                player: {
                                    ...engine.player,
                                    soloProgress: newProgress,
                                    crystals: engine.player.crystals + crystalReward
                                },
                                battleEngine: null
                            };
                        });
                        setSelectedChar(null);
                    }}
                    onDefeat={() => {
                        updateGameEngine(engine => ({
                            ...engine,
                            battleEngine: null
                        }))
                        setSelectedChar(null);
                    }}
                />
            )}
        </div>
    );
};

export default SoloMode;
