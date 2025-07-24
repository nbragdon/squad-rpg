import React from 'react';
import { PlayerCharacter, Team } from '../types/game';
import './TeamBuilder.css';

interface TeamBuilderProps {
    team: Team;
    availableCharacters: PlayerCharacter[];
    onAddCharacter: (character: PlayerCharacter) => void;
    onRemoveCharacter: (characterId: string) => void;
    onBack: () => void;
    onStartBattle: () => void;
}

const TeamBuilder: React.FC<TeamBuilderProps> = ({
    team,
    availableCharacters,
    onAddCharacter,
    onRemoveCharacter,
    onBack,
    onStartBattle
}) => {
    const getAvailableCharacters = (): PlayerCharacter[] => {
        const teamCharacterIds = team.characters.map(char => char.id);
        return availableCharacters.filter(char => !teamCharacterIds.includes(char.id));
    };

    const canStartBattle = (): boolean => {
        return team.characters.length > 0;
    };

    return (
        <div className="team-builder">
            <div className="team-builder-header">
                <button className="back-button" onClick={onBack}>
                    ← Back
                </button>
                <h2>Team Builder</h2>
                <button
                    className={`start-battle-button ${canStartBattle() ? 'enabled' : 'disabled'}`}
                    onClick={onStartBattle}
                    disabled={!canStartBattle()}
                >
                    Start Battle
                </button>
            </div>

            <div className="team-section">
                <h3>Current Team ({team.characters.length}/{team.maxSize})</h3>
                <div className="team-slots">
                    {Array.from({ length: team.maxSize }, (_, index) => {
                        const character = team.characters[index];
                        return (
                            <div key={index} className="team-slot">
                                {character ? (
                                    <div className="team-character">
                                        <div className="character-avatar">
                                            {character.name.charAt(0)}
                                        </div>
                                        <div className="character-details">
                                            <div className="character-name">{character.name}</div>
                                            <div className="character-class">{character.class}</div>
                                            <div className="character-level">Lv. {character.level}</div>
                                        </div>
                                        <button
                                            className="remove-button"
                                            onClick={() => onRemoveCharacter(character.id)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ) : (
                                    <div className="empty-slot">
                                        <div className="slot-placeholder">Empty Slot</div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="available-section">
                <h3>Available Characters</h3>
                <div className="available-characters">
                    {getAvailableCharacters().map(character => (
                        <div key={character.id} className="available-character">
                            <div className="character-avatar">
                                {character.name.charAt(0)}
                            </div>
                            <div className="character-info">
                                <div className="character-name">{character.name}</div>
                                <div className="character-class">{character.class}</div>
                                <div className="character-stats">
                                    HP: {character.maxHealth} | ATK: {character.attack}
                                </div>
                            </div>
                            <button
                                className={`add-button ${team.characters.length < team.maxSize ? 'enabled' : 'disabled'}`}
                                onClick={() => onAddCharacter(character)}
                                disabled={team.characters.length >= team.maxSize}
                            >
                                Add
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="team-composition">
                <h3>Team Composition</h3>
                <div className="composition-stats">
                    <div className="stat-item">
                        <span className="stat-label">Total HP:</span>
                        <span className="stat-value">
                            {team.characters.reduce((sum, char) => sum + char.maxHealth, 0)}
                        </span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Total ATK:</span>
                        <span className="stat-value">
                            {team.characters.reduce((sum, char) => sum + char.attack, 0)}
                        </span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-label">Avg Speed:</span>
                        <span className="stat-value">
                            {team.characters.length > 0
                                ? Math.round(team.characters.reduce((sum, char) => sum + char.speed, 0) / team.characters.length)
                                : 0
                            }
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamBuilder;
