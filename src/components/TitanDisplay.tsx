import { GameScreen } from "App";
import { BattleEngine } from "battle";
import { useGameEngine } from "context/GameEngineContext";
import { gachaCharacters } from "data/characters";
import { getXpToNextLevel } from "data/leveling";
import { useState, useCallback, useEffect } from "react";
import { PlayerCharacter } from "types/character";
import { Rarity, RARITY_ORDER } from "types/rarity";
import BattleDisplay from "./BattleDisplay";
import { CharacterSelection } from "./CharacterCollection";
import CharacterModal from "./CharacterModal";
import { generateTitan } from "data/enemies/enemy-map";
import { getOwnedCharacters } from "data/characters/charUtil";
import {
  generateTitanVictoryThresholds,
  VictoryThreshold,
} from "battle/victoryTreshholds";

const TITAN_LEVELS_PER_RARITY = 3;
const MAX_ROUNDS = 10;

interface TitanModeProps {
  onBack: () => void;
}

const TitanMode: React.FC<TitanModeProps> = ({ onBack }) => {
  const { gameEngine, updateGameEngine } = useGameEngine();
  const [selectedRarity, setSelectedRarity] = useState<Rarity>(Rarity.COMMON);
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedCharacters, setSelectedCharacters] = useState<
    PlayerCharacter[]
  >([]);
  const [modalCharacter, setModalCharacter] = useState<PlayerCharacter | null>(
    null,
  );
  const [victoryThresholds, setVictoryThresholds] = useState<
    VictoryThreshold[]
  >([]);

  const battleEngine = gameEngine.battleEngine;

  // Get owned characters (should be PlayerCharacter[])
  const ownedChars = getOwnedCharacters(gameEngine);

  // Helper to reset battle state
  const resetBattle = useCallback(() => {
    updateGameEngine((engine) => ({
      ...engine,
      battleEngine: null,
    }));
  }, [updateGameEngine]);

  // Derived state for current titan progress (highest completed level for current rarity)
  const currentTitanProgressForRarity =
    gameEngine.player.titanProgress[selectedRarity] || 0;

  // Check if a rarity is unlocked
  const isRarityUnlocked = useCallback(
    (rarity: Rarity): boolean => {
      const rarityIndex = RARITY_ORDER.indexOf(rarity);
      if (rarityIndex === 0) return true; // Common is always unlocked

      const previousRarity = RARITY_ORDER[rarityIndex - 1];
      // A rarity is unlocked if Level 3 of the previous rarity is completed
      return (
        (gameEngine.player.titanProgress[previousRarity] || 0) >=
        TITAN_LEVELS_PER_RARITY
      );
    },
    [gameEngine.player.titanProgress],
  );

  // Check if a level is unlocked for the current rarity
  const isLevelUnlocked = useCallback(
    (level: number): boolean => {
      // Level 1 is always unlocked if the rarity is unlocked
      if (level === 1) return true;
      // Subsequent levels are unlocked if the previous level for this rarity is completed
      return currentTitanProgressForRarity >= level - 1;
    },
    [currentTitanProgressForRarity],
  );

  // Handle initial rarity selection on load
  useEffect(() => {
    if (!selectedRarity || !isRarityUnlocked(selectedRarity)) {
      // Find the highest unlocked rarity and set it as selected
      const highestUnlockedRarity = RARITY_ORDER.slice()
        .reverse()
        .find(isRarityUnlocked);
      if (highestUnlockedRarity) {
        setSelectedRarity(highestUnlockedRarity);
        // Also set the level to the highest completed + 1, or 1 if none completed
        const highestCompletedLevel =
          gameEngine.player.titanProgress[highestUnlockedRarity] || 0;
        setSelectedLevel(
          Math.min(highestCompletedLevel + 1, TITAN_LEVELS_PER_RARITY),
        );
      }
    }
  }, [selectedRarity, isRarityUnlocked, gameEngine.player.titanProgress]);

  const handleRaritySelect = (rarity: Rarity) => {
    if (isRarityUnlocked(rarity)) {
      setSelectedRarity(rarity);
      // When changing rarity, reset level selection to the first unlocked level
      const highestCompletedLevel =
        gameEngine.player.titanProgress[rarity] || 0;
      setSelectedLevel(
        Math.min(highestCompletedLevel + 1, TITAN_LEVELS_PER_RARITY),
      );
      setSelectedCharacters([]);
      resetBattle();
    }
  };

  const handleLevelSelect = (level: number) => {
    if (isLevelUnlocked(level)) {
      setSelectedLevel(level);
      setSelectedCharacters([]);
      resetBattle();
    }
  };

  // Start battle
  const startBattle = () => {
    if (selectedCharacters.length === 0) {
      console.error(
        "Please select at least one character to start the battle.",
      );
      return;
    }
    // Prepare player and enemy arrays for the engine
    const playerArr = selectedCharacters.map((char) => ({ ...char }));
    const enemyArr = generateTitan(selectedRarity, selectedLevel);
    const newVictoryThresholds = generateTitanVictoryThresholds(
      selectedRarity,
      selectedLevel,
    );
    const newBattleEngine = new BattleEngine({
      playerCharacters: playerArr,
      enemies: enemyArr,
      inventory: gameEngine.player.equipment,
      victoryThresholds: newVictoryThresholds,
      maxRounds: MAX_ROUNDS,
    });
    setVictoryThresholds(newVictoryThresholds);
    updateGameEngine((engine) => ({
      ...engine,
      battleEngine: newBattleEngine,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white font-inter flex flex-col items-center p-4 sm:p-8">
      {/* Back Button */}
      <div className="w-full max-w-4xl flex justify-start mb-8">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
          onClick={() => {
            resetBattle();
            onBack();
          }}
        >
          &larr; Back
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Titan Mode</h1>

      {battleEngine === null && (
        <>
          {/* Rarity Selection */}
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">
              Select Titan Rarity
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {RARITY_ORDER.map((rarity) => {
                const unlocked = isRarityUnlocked(rarity);
                const isSelected = selectedRarity === rarity;
                const isCompleted =
                  (gameEngine.player.titanProgress[rarity] || 0) >=
                  TITAN_LEVELS_PER_RARITY;

                return (
                  <button
                    key={rarity}
                    onClick={() => handleRaritySelect(rarity)}
                    disabled={!unlocked}
                    className={`
                                            py-3 px-6 rounded-lg shadow-lg font-bold text-lg transition-all duration-200
                                            ${
                                              !unlocked
                                                ? "bg-gray-700 text-gray-400 cursor-not-allowed opacity-60"
                                                : isSelected
                                                  ? "bg-yellow-500 text-gray-900 border-2 border-yellow-300 transform scale-105"
                                                  : "bg-yellow-600 hover:bg-yellow-700 text-white"
                                            }
                                            ${isCompleted ? "border-2 border-green-500" : ""}
                                        `}
                  >
                    {rarity.toUpperCase()}
                    {isCompleted && (
                      <span className="ml-2 text-green-300">&#10003;</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level Selection */}
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">
              Select Level (1-3)
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {Array.from(
                { length: TITAN_LEVELS_PER_RARITY },
                (_, i) => i + 1,
              ).map((level) => {
                const unlocked = isLevelUnlocked(level);
                const isSelected = selectedLevel === level;
                const isCompleted =
                  (gameEngine.player.titanProgress[selectedRarity] || 0) >=
                  level;

                return (
                  <button
                    key={level}
                    onClick={() => handleLevelSelect(level)}
                    disabled={!unlocked}
                    className={`
                                            py-2 px-4 rounded-lg shadow-md font-semibold transition-all duration-200
                                            ${
                                              !unlocked
                                                ? "bg-gray-700 text-gray-400 cursor-not-allowed opacity-60"
                                                : isSelected
                                                  ? "bg-yellow-500 text-gray-900 border-2 border-yellow-300 transform scale-105"
                                                  : "bg-blue-700 hover:bg-blue-600 text-white"
                                            }
                                            ${isCompleted ? "border-2 border-green-500" : ""}
                                        `}
                  >
                    Level {level}
                    {isCompleted && (
                      <span className="ml-2 text-green-300">&#10003;</span>
                    )}
                  </button>
                );
              })}
            </div>
            {/* Description for Level */}
            <div className="text-center text-gray-300 mt-4 text-lg">
              {`Objective: Deal the most damage within ${MAX_ROUNDS} rounds.`}
            </div>
          </div>

          {/* Character Selection (Reusable Component) */}
          <CharacterSelection
            characters={ownedChars}
            selectedCharacters={selectedCharacters}
            onCharacterSelect={(playerChars) => {
              setSelectedCharacters([...playerChars]);
            }}
            maxSelection={3}
            title="Choose Your Fighters"
            showPagination={true}
            charactersPerPage={8}
            showViewDetailsButton={true}
          />

          {/* Start Battle Button */}
          <button
            onClick={startBattle}
            className={`
                            bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-10 rounded-xl
                            shadow-xl text-2xl transition-all duration-200 mt-8
                            ${
                              selectedCharacters.length === 0
                                ? "opacity-60 cursor-not-allowed"
                                : ""
                            }
                        `}
            disabled={selectedCharacters.length === 0}
          >
            Start Battle
          </button>
        </>
      )}
      {battleEngine && (
        <BattleDisplay
          rewards={[]}
          victoryThresholds={victoryThresholds}
          onVictory={() => {
            updateGameEngine((engine) => ({
              ...engine,
              battleEngine: null,
            }));
          }}
          onDefeat={() => {
            updateGameEngine((engine) => ({
              ...engine,
              battleEngine: null,
            }));
            setSelectedCharacters([]); // Clear selected characters after battle
          }}
        />
      )}
      {modalCharacter && (
        <CharacterModal
          character={modalCharacter}
          onClose={() => setModalCharacter(null)}
        />
      )}
    </div>
  );
};

export default TitanMode;
