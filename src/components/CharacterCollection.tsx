import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { getXpToNextLevel } from '../data/leveling';
import { calculateStat } from '../data/statUtils';
import { PlayerCharacter, Rarity, Team } from '../types/game';
import './CharacterCollection.css';
import CharacterModal from './CharacterModal';

interface CharacterCollectionProps {
    characters: PlayerCharacter[];
    onAddToTeam: (character: PlayerCharacter) => void;
    onRemoveFromTeam: (characterId: string) => void;
    onBack: () => void;
    playerTeam: Team;
}

const CharacterCollection: React.FC<CharacterCollectionProps> = ({
    characters,
    onAddToTeam,
    onRemoveFromTeam,
    onBack,
    playerTeam
}) => {
    const { playerProgress } = useGame();
    const [modalCharacter, setModalCharacter] = useState<PlayerCharacter | null>(null);

    const getRarityColor = (rarity: Rarity): string => {
        switch (rarity) {
            case Rarity.COMMON:
                return '#808080';
            case Rarity.RARE:
                return '#0080ff';
            case Rarity.EPIC:
                return '#8000ff';
            case Rarity.LEGENDARY:
                return '#ff8000';
            default:
                return '#808080';
        }
    };

    const isCharacterInTeam = (characterId: string): boolean => {
        return playerTeam.characters.some(char => char.id === characterId);
    };

    const canAddToTeam = (character: PlayerCharacter): boolean => {
        return !isCharacterInTeam(character.id) && playerTeam.characters.length < playerTeam.maxSize;
    };

    const getCharacterProgress = (id: string) => playerProgress.characterProgress?.[id];

    return (
        <div className="character-collection">
            {/* Minimal team display at the top */}
            <div className="team-bar">
                <span className="team-bar-label">Team:</span>
                <div className="team-bar-list">
                    {playerTeam.characters.map((char, idx) => (
                        <div key={char.id} className="team-bar-member">
                            <div className="team-bar-avatar">{char.name.charAt(0)}</div>
                            <div className="team-bar-info">
                                <span className="team-bar-name">{char.name}</span>
                                <span className="team-bar-class">{char.class}</span>
                                <button className="team-bar-remove" onClick={e => { e.stopPropagation(); onRemoveFromTeam(char.id); }} title="Remove from team">×</button>
                            </div>
                        </div>
                    ))}
                    {Array.from({ length: playerTeam.maxSize - playerTeam.characters.length }).map((_, idx) => (
                        <div key={idx} className="team-bar-member empty">
                            <div className="team-bar-avatar empty">+</div>
                        </div>
                    ))}
                </div>
                <span className="team-bar-count">{playerTeam.characters.length}/{playerTeam.maxSize}</span>
            </div>

            <div className="collection-header">
                <button className="back-button" onClick={onBack}>
                    ← Back
                </button>
                <h2>Character Collection</h2>
                <div className="team-info">
                    Team: {playerTeam.characters.length}/{playerTeam.maxSize}
                </div>
            </div>

            <div className="character-grid">
                {characters.map(character => {
                    const progress = getCharacterProgress(character.id);
                    const displayChar = progress ? { ...character, ...progress } : character;
                    return (
                        <div
                            key={character.id}
                            className="character-card"
                            style={{ borderColor: getRarityColor(character.rarity) }}
                            onClick={() => setModalCharacter(displayChar)}
                        >
                            <div className="character-portrait">
                                <div className="character-avatar">
                                    {character.name.charAt(0)}
                                </div>
                            </div>
                            <div className="character-info">
                                <h3 className="character-name">{character.name}</h3>
                                <div className="character-class">{character.class}</div>
                                <div
                                    className="character-rarity"
                                    style={{ color: getRarityColor(character.rarity) }}
                                >
                                    {character.rarity.toUpperCase()}
                                </div>
                            </div>
                            <div className="character-stats">
                                <div className="stat-row">
                                    <span>Level: {displayChar.level}</span>
                                    <span>HP: {calculateStat({ base: displayChar.maxHealth, level: displayChar.level, shards: displayChar.shards, rarity: displayChar.rarity })}</span>
                                </div>
                                <div className="stat-row">
                                    <span>XP: {typeof displayChar.xp === 'number' ? displayChar.xp : 0} / {getXpToNextLevel(displayChar.level || 1)}</span>
                                </div>
                            </div>
                            <div className="character-actions">
                                <button
                                    className={`add-to-team-button ${canAddToTeam(character) ? 'enabled' : 'disabled'}`}
                                    onClick={e => { e.stopPropagation(); canAddToTeam(character) && onAddToTeam(character); }}
                                    disabled={!canAddToTeam(character)}
                                >
                                    {isCharacterInTeam(character.id) ? 'In Team' : 'Add to Team'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {modalCharacter && (
                <CharacterModal character={modalCharacter} onClose={() => setModalCharacter(null)} getRarityColor={getRarityColor} />
            )}
        </div>
    );
};

export default CharacterCollection;
