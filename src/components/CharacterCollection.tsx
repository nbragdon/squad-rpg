import React, { useState } from 'react';
import { getXpToNextLevel } from '../data/leveling';
import { PlayerCharacter } from '../types/character';
import './CharacterCollection.css';
import CharacterModal from './CharacterModal';
import { getRarityColor } from './utils';

interface CharacterCollectionProps {
    characters: PlayerCharacter[];
    onBack: () => void;
    player?: any; // Add player prop for crystals, etc.
}

const CharacterCollection: React.FC<CharacterCollectionProps> = ({
    characters,
    onBack,
    player
}) => {
    const [modalCharacter, setModalCharacter] = useState<PlayerCharacter | null>(null);

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
                                <div className="character-class">{character.strongAffinities.join(', ')}</div>
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
                                    <span>XP: {typeof displayChar.xp === 'number' ? displayChar.xp : 0} / {getXpToNextLevel(displayChar.level || 1)}</span>
                                </div>
                                <div className="stat-row">
                                    <span>Strong Affinities: {character.strongAffinities.join(', ')}</span>
                                    <span>Weak Affinities: {character.weakAffinities.join(', ')}</span>
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
