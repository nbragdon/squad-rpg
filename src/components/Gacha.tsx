import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { gachaCharacters } from '../data/characters';
import { getXpToNextLevel } from '../data/leveling';
import { CharacterBase, PlayerCharacter, Rarity } from '../types/game';
import './Gacha.css';

const RARITY_DROP_RATES = [
    { rarity: Rarity.COMMON, rate: 0.6 },
    { rarity: Rarity.UNCOMMON, rate: 0.25 },
    { rarity: Rarity.RARE, rate: 0.1 },
    { rarity: Rarity.EPIC, rate: 0.04 },
    { rarity: Rarity.LEGENDARY, rate: 0.01 },
];

const GACHA_COST = 500;
const GACHA_PULL_COUNT = 10;

function getRandomRarity() {
    const roll = Math.random();
    let acc = 0;
    for (const { rarity, rate } of RARITY_DROP_RATES) {
        acc += rate;
        if (roll < acc) return rarity;
    }
    return Rarity.COMMON;
}

function getRandomCharacter(rarity: Rarity): CharacterBase {
    const pool = gachaCharacters.filter(c => c.rarity === rarity);
    return pool[Math.floor(Math.random() * pool.length)];
}

function createPlayerCharacter(base: CharacterBase): PlayerCharacter {
    return {
        ...base,
        level: 1,
        xp: 0,
        xpToNextLevel: getXpToNextLevel(1),
        shards: 0
    };
}

const rarityColors: Record<Rarity, string> = {
    [Rarity.COMMON]: '#b0b0b0',
    [Rarity.UNCOMMON]: '#4caf50',
    [Rarity.RARE]: '#2196f3',
    [Rarity.EPIC]: '#9c27b0',
    [Rarity.LEGENDARY]: '#ff9800',
};

const rarityAnims: Record<Rarity, string> = {
    [Rarity.COMMON]: 'gacha-common',
    [Rarity.UNCOMMON]: 'gacha-uncommon',
    [Rarity.RARE]: 'gacha-rare',
    [Rarity.EPIC]: 'gacha-epic',
    [Rarity.LEGENDARY]: 'gacha-legendary',
};

interface GachaProps {
    onBack: () => void;
}

const Gacha: React.FC<GachaProps> = ({ onBack }) => {
    const { playerProgress, setPlayerProgress } = useGame();
    const [results, setResults] = useState<PlayerCharacter[]>([]);
    const [animating, setAnimating] = useState(false);
    const [error, setError] = useState('');

    const handlePull = async (count: number) => {
        if (playerProgress.crystals < GACHA_COST * count) {
            setError('Not enough crystals!');
            return;
        }
        setError('');
        setAnimating(true);
        const pulls: PlayerCharacter[] = [];
        for (let i = 0; i < count; i++) {
            const rarity = getRandomRarity();
            const base = getRandomCharacter(rarity);
            pulls.push(createPlayerCharacter(base));
        }
        // Simulate animation delay
        setTimeout(() => {
            setResults(pulls);
            setAnimating(false);
            // Update player progress
            const newProgress = { ...playerProgress };
            newProgress.crystals -= GACHA_COST * count;
            pulls.forEach(char => {
                if (!newProgress.unlockedCharacters.includes(char.id)) {
                    newProgress.unlockedCharacters.push(char.id);
                    // Optionally: add to collection with level/shards
                } else {
                    // Optionally: increment shards for duplicate
                }
            });
            setPlayerProgress(newProgress);
        }, 1200);
    };

    return (
        <div className="gacha-container">
            <button className="gacha-back" onClick={onBack} disabled={animating}>&larr; Back</button>
            <h2>Gacha Summon</h2>
            <div className="gacha-crystals">Crystals: {playerProgress.crystals ?? 0}</div>
            <div className="gacha-buttons">
                <button onClick={() => handlePull(1)} disabled={animating || playerProgress.crystals < GACHA_COST}>Summon (500)</button>
                <button onClick={() => handlePull(GACHA_PULL_COUNT)} disabled={animating || playerProgress.crystals < GACHA_COST * GACHA_PULL_COUNT}>10x Summon (5000)</button>
            </div>
            {error && <div className="gacha-error">{error}</div>}
            <div className="gacha-results">
                {results.map((char, idx) => (
                    <div key={idx} className={`gacha-card ${rarityAnims[char.rarity]}`} style={{ borderColor: rarityColors[char.rarity] }}>
                        <div className="gacha-card-avatar">{char.name.charAt(0)}</div>
                        <div className="gacha-card-info">
                            <div className="gacha-card-name">{char.name}</div>
                            <div className="gacha-card-class">{char.class}</div>
                            <div className="gacha-card-rarity" style={{ color: rarityColors[char.rarity] }}>{char.rarity.toUpperCase()}</div>
                        </div>
                    </div>
                ))}
            </div>
            {results.length > 0 && <div className="gacha-tip">{results.length === 1 ? 'Try 10x for a better chance at rare heroes!' : 'Congrats on your summons!'}</div>}
        </div>
    );
};

export default Gacha;
