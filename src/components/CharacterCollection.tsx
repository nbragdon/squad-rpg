import React, { useState } from 'react';
import { getXpToNextLevel } from '../data/leveling';
import { calculateStat } from '../data/statUtils';
import { PlayerCharacter, Team } from '../types/game';
import './CharacterCollection.css';
import CharacterModal from './CharacterModal';
import { getRarityColor } from './utils';

interface CharacterCollectionProps {
    characters: PlayerCharacter[];
    onBack: () => void;
    playerTeam: Team;
    player?: any; // Add player prop for crystals, etc.
}

const CharacterCollection: React.FC<CharacterCollectionProps> = ({
    characters,
    onBack,
    playerTeam,
    player
}) => {
    const [modalCharacter, setModalCharacter] = useState<PlayerCharacter | null>(null);

    const isCharacterInTeam = (characterId: string): boolean => {
        return playerTeam.characters.some(char => char.id === characterId);
    };

    const canAddToTeam = (character: PlayerCharacter): boolean => {
        return !isCharacterInTeam(character.id) && playerTeam.characters.length < playerTeam.maxSize;
    };

    return (
        <div className="character-collection">
            {/* Minimal team display at the top */}
            <div className="collection-header">
                <button className="back-button" onClick={onBack}>
                    ← Back
                </button>
                <h2>Character Collection</h2>
            </div>

            <div className="character-grid">
                {characters.map(character => {
                    const progress = player?.characterProgress?.[character.id];
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
