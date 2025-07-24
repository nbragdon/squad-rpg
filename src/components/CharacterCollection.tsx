import React, { useState } from 'react';
import { PlayerCharacter, Rarity, Team } from '../types/game';
import './CharacterCollection.css';

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
                {characters.map(character => (
                    <div
                        key={character.id}
                        className="character-card"
                        style={{ borderColor: getRarityColor(character.rarity) }}
                        onClick={() => setModalCharacter(character)}
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
                                <span>Level: {character.level}</span>
                                <span>HP: {character.maxHealth}</span>
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
                ))}
            </div>

            {modalCharacter && (
                <div className="character-modal-overlay" onClick={() => setModalCharacter(null)}>
                    <div className="character-modal" onClick={e => e.stopPropagation()}>
                        <button className="character-modal-close" onClick={() => setModalCharacter(null)}>&times;</button>
                        <div className="character-portrait" style={{ margin: '0 auto 1rem auto' }}>
                            <div className="character-avatar">
                                {modalCharacter.name.charAt(0)}
                            </div>
                        </div>
                        <div className="character-info">
                            <h2 className="character-name">{modalCharacter.name}</h2>
                            <div className="character-class">{modalCharacter.class}</div>
                            <div className="character-rarity" style={{ color: getRarityColor(modalCharacter.rarity) }}>
                                {modalCharacter.rarity.toUpperCase()}
                            </div>
                        </div>
                        <div className="character-stats">
                            <div className="stat-row">
                                <span>Level: {modalCharacter.level}</span>
                                <span>HP: {modalCharacter.maxHealth}</span>
                            </div>
                            <div className="stat-row">
                                <span>ATK: {modalCharacter.attack}</span>
                                <span>DEF: {modalCharacter.defense}</span>
                            </div>
                            <div className="stat-row">
                                <span>SPD: {modalCharacter.speed}</span>
                                <span>Energy: {modalCharacter.maxEnergy}</span>
                            </div>
                        </div>
                        <div className="character-skills">
                            <div className="skills-title">Skills:</div>
                            {modalCharacter.skills.map(skill => (
                                <div key={skill.id} className="skill-item">
                                    <strong>{skill.name}</strong>: {skill.description}
                                </div>
                            ))}
                            <div className="skill-item ultimate">
                                <strong>{modalCharacter.ultimateSkill.name}</strong> (Ultimate): {modalCharacter.ultimateSkill.description}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CharacterCollection;
