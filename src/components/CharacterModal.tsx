import React from 'react';
import { getXpToNextLevel } from '../data/leveling';
import { SkillDescriptionCard } from '../data/skills/skillDescriptionUtil';
import { calculateStat } from '../data/statUtils';
import { PlayerCharacter } from '../types/character';
import { Rarity } from '../types/rarity';
import { StatType } from '../types/stats';

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
                <div style={{ marginBottom: 6 }}>Strong Affinities: <b>{character.strongAffinities.join(', ')}</b></div>
                <div style={{ marginBottom: 6 }}>Weak Affinities: <b>{character.weakAffinities.join(', ')}</b></div>
                <div style={{ marginBottom: 6 }}>Rarity: <b style={{ color: getRarityColor ? getRarityColor(character.rarity) : '#ffd700' }}>{character.rarity}</b></div>
                <div style={{ marginBottom: 6 }}>Level: <b>{character.level}</b></div>
                <div style={{ marginBottom: 6 }}>Health: <b>{calculateStat(StatType.health, { stats: character.stats, level: character.level, shards: character.shards, rarity: character.rarity })}</b></div>
                <div style={{ marginBottom: 6 }}>Energy: <b>{calculateStat(StatType.energy, { stats: character.stats, level: character.level, shards: character.shards, rarity: character.rarity })}</b></div>
                <div style={{ marginBottom: 6 }}>Strength: <b>{calculateStat(StatType.strength, { stats: character.stats, level: character.level, shards: character.shards, rarity: character.rarity })}</b></div>
                <div style={{ marginBottom: 6 }}>Defense: <b>{calculateStat(StatType.defense, { stats: character.stats, level: character.level, shards: character.shards, rarity: character.rarity })}</b></div>
                <div style={{ marginBottom: 6 }}>Magic: <b>{calculateStat(StatType.magic, { stats: character.stats, level: character.level, shards: character.shards, rarity: character.rarity })}</b></div>
                <div style={{ marginBottom: 6 }}>Magic Defense: <b>{calculateStat(StatType.magicDefense, { stats: character.stats, level: character.level, shards: character.shards, rarity: character.rarity })}</b></div>
                <div style={{ marginBottom: 6 }}>Speed: <b>{calculateStat(StatType.speed, { stats: character.stats, level: character.level, shards: character.shards, rarity: character.rarity })}</b></div>
                <div style={{ marginBottom: 6 }}>Crit Chance: <b>{calculateStat(StatType.critChance, { stats: character.stats, level: character.level, shards: character.shards, rarity: character.rarity })}</b></div>
                <div style={{ marginBottom: 6 }}>Crit Damage: <b>{calculateStat(StatType.critDamage, { stats: character.stats, level: character.level, shards: character.shards, rarity: character.rarity })}</b></div>
                <div style={{ marginBottom: 10 }}>XP: <b>{typeof character.xp === 'number' ? character.xp : 0} / {getXpToNextLevel(character.level || 1)}</b></div>
                <div style={{ marginTop: 10, marginBottom: 4 }}><b>Abilities:</b></div>
                {[...character.skills, { ...character.ultimateSkill, isUltimate: true }].map(skill => (
                    <SkillDescriptionCard key={skill.id} skill={skill} />
                ))}
            </div>
        </div>
    );
};

export default CharacterModal;
