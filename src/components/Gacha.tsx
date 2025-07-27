import React, { useState } from "react";
import { useGameEngine } from "../context/GameEngineContext";
import { gachaCharacters } from "../data/characters";
import { getXpToNextLevel } from "../data/leveling";
import { CharacterBase, PlayerCharacter } from "../types/character";
import { Rarity } from "../types/rarity";
import "./Gacha.css";

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
  const pool = gachaCharacters.filter((c) => c.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)];
}

function createPlayerCharacter(base: CharacterBase): PlayerCharacter {
  return {
    ...base,
    level: 1,
    xp: 0,
    xpToNextLevel: getXpToNextLevel(1),
    shards: 0,
  };
}

const rarityColors: Record<Rarity, string> = {
  [Rarity.COMMON]: "#b0b0b0",
  [Rarity.UNCOMMON]: "#4caf50",
  [Rarity.RARE]: "#2196f3",
  [Rarity.EPIC]: "#9c27b0",
  [Rarity.LEGENDARY]: "#ff9800",
};

const rarityAnims: Record<Rarity, string> = {
  [Rarity.COMMON]: "gacha-common",
  [Rarity.UNCOMMON]: "gacha-uncommon",
  [Rarity.RARE]: "gacha-rare",
  [Rarity.EPIC]: "gacha-epic",
  [Rarity.LEGENDARY]: "gacha-legendary",
};

// Define animations directly in a style block for Canvas preview
const globalStyles = `
@keyframes pulse-glow {
  0% { box-shadow: 0 0 0px rgba(255, 215, 0, 0.4); }
  50% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
  100% { box-shadow: 0 0 0px rgba(255, 215, 0, 0.4); }
}

@keyframes card-reveal {
  from { transform: scale(0.8) translateY(20px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}

@keyframes epic-pulsate {
  0% { transform: scale(1); box-shadow: 0 0 15px #9c27b0; }
  50% { transform: scale(1.02); box-shadow: 0 0 25px #9c27b0; }
  100% { transform: scale(1); box-shadow: 0 0 15px #9c27b0; }
}

@keyframes legendary-shimmer {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-in {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes bounce-in {
  0% { transform: scale(0.5); opacity: 0; }
  70% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); }
}

/* New mystery card animation */
@keyframes mystery-card-animation {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
`;

interface GachaProps {
  onBack: () => void;
}

const Gacha: React.FC<GachaProps> = ({ onBack }) => {
  const { gameEngine, updateGameEngine } = useGameEngine();
  const [results, setResults] = useState<PlayerCharacter[]>([]);
  const [isSummoning, setIsSummoning] = useState(false); // Controls initial summoning animation (mystery card)
  const [isRevealing, setIsRevealing] = useState(false); // Controls individual card reveal animation
  const [currentCelebrationChar, setCurrentCelebrationChar] =
    useState<PlayerCharacter | null>(null); // For full-screen celebration
  const [error, setError] = useState("");

  const player = gameEngine.player;

  const handlePull = async (count: number) => {
    if (player.crystals < GACHA_COST * count) {
      setError("Not enough crystals!");
      return;
    }
    setError("");
    setResults([]);
    setCurrentCelebrationChar(null); // Clear any previous celebration
    setIsSummoning(true); // Show the mystery card and start its animation

    // Simulate pre-summon animation duration
    await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5 seconds for visual buildup

    setIsSummoning(false); // Hide the mystery card
    setIsRevealing(true); // Start revealing actual characters

    const pulls: PlayerCharacter[] = [];
    for (let i = 0; i < count; i++) {
      const rarity = getRandomRarity();
      const base = getRandomCharacter(rarity);
      pulls.push(createPlayerCharacter(base));
    }

    const revealDelay = count === 1 ? 500 : 100; // Faster for 10x, slower for 1x

    for (let i = 0; i < pulls.length; i++) {
      setResults((prev) => [...prev, pulls[i]]);
      // Trigger celebration for rare+ characters immediately after they appear
      if (
        [Rarity.RARE, Rarity.EPIC, Rarity.LEGENDARY].includes(pulls[i].rarity)
      ) {
        setCurrentCelebrationChar(pulls[i]);
        // Automatically dismiss celebration after a few seconds
        setTimeout(() => {
          setCurrentCelebrationChar(null);
        }, 2500); // 2.5 seconds for celebration
      }
      await new Promise((resolve) => setTimeout(resolve, revealDelay));
    }

    setIsRevealing(false); // All cards revealed

    // Update player progress after all animations are done
    updateGameEngine((engine) => {
      const newProgress = { ...engine.player };
      newProgress.crystals -= GACHA_COST * count;
      pulls.forEach((char) => {
        if (!newProgress.unlockedCharacters.includes(char.id)) {
          newProgress.unlockedCharacters.push(char.id);
          if (!newProgress.characterProgress) {
            newProgress.characterProgress = {};
          }
          newProgress.characterProgress[char.id] = {
            level: char.level,
            xp: char.xp,
            xpToNextLevel: getXpToNextLevel(char.level),
            shards: char.shards,
          };
        } else {
          // Increase shards of existing character
          if (
            newProgress.characterProgress &&
            newProgress.characterProgress[char.id]
          ) {
            newProgress.characterProgress[char.id].shards += 1;
          }
        }
      });
      return { ...engine, player: newProgress };
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-4 font-inter">
      <style>{globalStyles}</style> {/* Inject global animations */}
      <button
        className="absolute top-6 left-6 px-6 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-200 z-10"
        onClick={onBack}
        disabled={isSummoning || isRevealing}
      >
        &larr; Back
      </button>
      <h2 className="text-5xl font-extrabold text-yellow-400 mb-8 drop-shadow-lg">
        Gacha Summon
      </h2>
      <div className="bg-gray-800 p-6 rounded-xl shadow-2xl mb-8 border border-blue-700 text-center">
        <div className="text-2xl font-bold text-yellow-300 mb-4">
          Crystals: {player.crystals ?? 0}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => handlePull(1)}
            disabled={
              isSummoning || isRevealing || player.crystals < GACHA_COST
            }
            className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-xl rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Summon (500)
          </button>
          <button
            onClick={() => handlePull(GACHA_PULL_COUNT)}
            disabled={
              isSummoning ||
              isRevealing ||
              player.crystals < GACHA_COST * GACHA_PULL_COUNT
            }
            className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-bold text-xl rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            10x Summon (5000)
          </button>
        </div>
      </div>
      {error && (
        <div className="text-red-400 text-lg mb-4 animate-fade-in">{error}</div>
      )}
      {/* Gacha Results Display */}
      {/* Conditional rendering: Show mystery card if summoning, else show actual results */}
      <div className="gacha-results grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-w-5xl w-full">
        {isSummoning ? (
          <div className="col-span-full flex justify-center">
            {" "}
            {/* Center the single mystery card */}
            <div className="w-48 h-64 bg-gray-700 rounded-xl flex flex-col items-center justify-center shadow-2xl border-4 border-yellow-400 animate-[mystery-card-animation_1.5s_infinite_ease-in-out]">
              <p className="text-7xl text-yellow-300 font-extrabold">?</p>
              <p className="text-xl text-gray-300 mt-4">Summoning...</p>
            </div>
          </div>
        ) : (
          results.map((char, idx) => (
            <div
              key={idx}
              className={`
                                relative bg-gray-800 rounded-xl p-4 text-center shadow-lg border-2
                                ${char.rarity === Rarity.COMMON ? "border-gray-500" : ""}
                                ${char.rarity === Rarity.UNCOMMON ? "border-green-500" : ""}
                                ${char.rarity === Rarity.RARE ? "border-blue-500 animate-pulse-glow" : ""}
                                ${char.rarity === Rarity.EPIC ? "border-purple-500 animate-epic-pulsate" : ""}
                                ${char.rarity === Rarity.LEGENDARY ? "border-yellow-500 animate-legendary-shimmer" : ""}
                                animate-card-reveal
                            `}
              style={{ animationDelay: `${idx * (isRevealing ? 0.05 : 0)}s` }} // Staggered reveal for 10x
            >
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gray-700 flex items-center justify-center text-4xl font-bold text-yellow-300 border-2 border-gray-600 overflow-hidden">
                {/* Placeholder for character image/icon */}
                <img
                  src={`https://placehold.co/80x80/${rarityColors[char.rarity].substring(1)}/FFFFFF?text=${char.name.charAt(0)}`}
                  alt={char.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://placehold.co/80x80/${rarityColors[char.rarity].substring(1)}/FFFFFF?text=${char.name.charAt(0)}`;
                  }}
                />
              </div>
              <div className="font-bold text-lg text-white">{char.name}</div>
              <div className="text-sm text-gray-400 capitalize">
                {char.strongAffinities.join(", ")}
              </div>
              <div
                className="text-md font-semibold"
                style={{ color: rarityColors[char.rarity] }}
              >
                {char.rarity.toUpperCase()}
              </div>
            </div>
          ))
        )}
      </div>
      {results.length > 0 && (
        <div className="mt-8 text-xl text-yellow-300 font-semibold animate-fade-in">
          {results.length === 1
            ? "Try 10x for a better chance at rare heroes!"
            : "Congrats on your summons!"}
        </div>
      )}
      {/* Full-screen celebration for Rare+ characters */}
      {currentCelebrationChar && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center z-30 animate-fade-in">
          <div className="text-center p-8 bg-black bg-opacity-70 rounded-xl shadow-lg border-4 border-yellow-500 animate-scale-in">
            <h3 className="text-5xl font-extrabold text-yellow-400 mb-4 animate-bounce-in">
              {currentCelebrationChar.rarity === Rarity.LEGENDARY
                ? "LEGENDARY!"
                : currentCelebrationChar.rarity === Rarity.EPIC
                  ? "EPIC!"
                  : "RARE!"}
            </h3>
            <div className="gacha-celebration-character-display">
              <img
                src={`https://placehold.co/150x150/${rarityColors[currentCelebrationChar.rarity].substring(1)}/FFFFFF?text=${currentCelebrationChar.name.charAt(0)}`}
                alt={currentCelebrationChar.name}
                className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-yellow-300 object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/150x150/${rarityColors[currentCelebrationChar.rarity].substring(1)}/FFFFFF?text=${currentCelebrationChar.name.charAt(0)}`;
                }}
              />
              <p className="text-3xl font-bold text-white">
                {currentCelebrationChar.name}
              </p>
              <p
                className="text-xl"
                style={{ color: rarityColors[currentCelebrationChar.rarity] }}
              >
                {currentCelebrationChar.rarity.toUpperCase()}
              </p>
            </div>
            <button
              onClick={() => setCurrentCelebrationChar(null)}
              className="mt-6 px-6 py-3 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition-colors transform hover:scale-105 active:scale-95"
            >
              Awesome!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gacha;
