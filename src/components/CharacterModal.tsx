import React from 'react';
import { getXpToNextLevel } from '../data/leveling';
import { calculateStat } from '../data/statUtils';
import { PlayerCharacter, Rarity } from '../types/game';

interface CharacterModalProps {
    character: PlayerCharacter;
    onClose: () => void;
    getRarityColor?: (rarity: Rarity) => string;
}

const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose, getRarityColor }) => {
    return (
        <div className="character-modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
            <div className="character-modal" onClick={e => e.stopPropagation()} style={{ background: '#23232b', color: '#fff', borderRadius: 14, padding: 28, maxWidth: 370, width: '90%', boxShadow: '0 8px 32px #0008', position: 'relative' }}>
                <button style={{ position: 'absolute', top: 10, right: 14, fontSize: 22, background: 'none', border: 'none', color: '#ffd700', cursor: 'pointer' }} onClick={onClose}>&times;</button>
                <h2 style={{ marginTop: 0, marginBottom: 8 }}>{character.name}</h2>
                <div style={{ marginBottom: 6 }}>Class: <b>{character.class}</b></div>
                <div style={{ marginBottom: 6 }}>Rarity: <b style={{ color: getRarityColor ? getRarityColor(character.rarity) : '#ffd700' }}>{character.rarity}</b></div>
                <div style={{ marginBottom: 6 }}>Level: <b>{character.level}</b></div>
                <div style={{ marginBottom: 6 }}>HP: <b>{calculateStat({ base: character.maxHealth, level: character.level, shards: character.shards, rarity: character.rarity })}</b></div>
                <div style={{ marginBottom: 6 }}>ATK: <b>{calculateStat({ base: character.attack, level: character.level, shards: character.shards, rarity: character.rarity })}</b></div>
                <div style={{ marginBottom: 6 }}>DEF: <b>{calculateStat({ base: character.defense, level: character.level, shards: character.shards, rarity: character.rarity })}</b></div>
                <div style={{ marginBottom: 6 }}>SPD: <b>{calculateStat({ base: character.speed, level: character.level, shards: character.shards, rarity: character.rarity })}</b></div>
                <div style={{ marginBottom: 10 }}>Energy: <b>{character.maxEnergy}</b></div>
                <div style={{ marginBottom: 10 }}>XP: <b>{typeof character.xp === 'number' ? character.xp : 0} / {getXpToNextLevel(character.level || 1)}</b></div>
                <div style={{ marginTop: 10, marginBottom: 4 }}><b>Abilities:</b></div>
                {[...character.skills, { ...character.ultimateSkill, isUltimate: true }].map(skill => (
                    <div key={skill.id} style={{ marginBottom: 10, padding: 7, background: skill.isUltimate ? '#333' : 'none', borderRadius: 7 }}>
                        <b>{skill.name}</b> {skill.isUltimate && <span style={{ color: '#ffd700' }}>(Ultimate)</span>}
                        <div style={{ fontSize: 13, color: '#ccc', marginBottom: 2 }}>{skill.description}</div>
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
    );
};

export default CharacterModal;
