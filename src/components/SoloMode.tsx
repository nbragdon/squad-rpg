import React, { useState } from "react";
import { BattleEngine } from "../battle";
import { useGameEngine } from "../context/GameEngineContext";
import { getOwnedCharacters } from "../data/characters/charUtil";
import { getEnemyByChapterAndStage } from "../data/enemies/enemy-map";
import { PlayerCharacter } from "../types/character";
import BattleDisplay from "./BattleDisplay";
import { CharacterSelection } from "./CharacterCollection";
import CharacterModal from "./CharacterModal";

const CHAPTERS_ARRAY = Array.from({ length: 5 }, (_, i) => `Chapter ${i + 1}`);
const STAGES_PER_CHAPTER = 10;

function getCrystalReward(
  chapter: number,
  stage: number,
  currentSoloProgress: number,
  newSoloProgress: number,
) {
  // Simple reward logic: 10 crystals per stage, bonus for chapter completion
  let reward = 50 * chapter;
  if (newSoloProgress >= currentSoloProgress) {
    if (chapter === 1) {
      reward += 250;
    } else if (chapter === 2) {
      reward += 500;
    } else if (chapter === 3) {
      reward += 750;
    } else if (chapter === 4) {
      reward += 1000;
    } else if (chapter === 5) {
      reward += 1250;
    }
  }

  return reward;
}

function getSoloStageNumber(chapter: number, stage: number) {
  return (chapter - 1) * STAGES_PER_CHAPTER + stage;
}

function isUnlocked(chapter: number, stage: number, soloProgress?: number) {
  // soloProgress is the highest unlocked stage (1-based)
  const stageNum = getSoloStageNumber(chapter, stage);
  return (soloProgress ?? 1) >= stageNum;
}

interface SoloModeProps {
  onNavigate: () => void; // Changed from onBack to onNavigate for consistency
}

const SoloMode: React.FC<SoloModeProps> = ({ onNavigate }) => {
  const { gameEngine, updateGameEngine } = useGameEngine();
  const [chapter, setChapter] = useState(1);
  const [stage, setStage] = useState(1);
  const [selectedCharacters, setSelectedCharacters] = useState<
    PlayerCharacter[]
  >([]);
  const [modalCharacter, setModalCharacter] = useState<PlayerCharacter | null>(
    null,
  );

  // Simulate completed stages for progression logic
  // Example: initially only Chapter 1, Stage 1 is completed
  const [completedStages, setCompletedStages] = useState<Set<string>>(
    new Set(["Chapter 1_Stage 1"]),
  );

  const battleEngine = gameEngine.battleEngine;

  // Get owned characters (should be PlayerCharacter[])
  const ownedChars = getOwnedCharacters(gameEngine);

  // Helper to reset battle state
  function resetBattle() {
    updateGameEngine((engine) => ({
      ...engine,
      battleEngine: null,
    }));
  }

  // Start battle
  function startBattle() {
    if (selectedCharacters.length === 0) {
      console.error(
        "Please select at least one character to start the battle.",
      );
      return;
    }
    // Prepare player and enemy arrays for the engine
    const playerArr = selectedCharacters.map((char) => ({ ...char })); // Use selectedCharacters
    const enemyArr = getEnemyByChapterAndStage(chapter, stage);
    const newBattleEngine = new BattleEngine({
      playerCharacters: playerArr,
      enemies: enemyArr,
    });
    updateGameEngine((engine) => ({
      ...engine,
      battleEngine: newBattleEngine,
    }));
  }

  // Handler for CharacterSelection component
  const handleCharacterSelect = (character: PlayerCharacter) => {
    setSelectedCharacters((prevSelected) => {
      if (prevSelected.some((char) => char.id === character.id)) {
        // Deselect if already selected
        return prevSelected.filter((char) => char.id !== character.id);
      } else {
        return [character];
      }
    });
  };

  // UI rendering
  return (
    <div className="min-h-screen bg-blue-900 text-white font-inter flex flex-col items-center p-4 sm:p-8">
      {/* Back Button */}
      <div className="w-full max-w-4xl flex justify-start mb-8">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
          onClick={() => {
            resetBattle();
            onNavigate(); // Navigate back to main menu
          }}
        >
          &larr; Back
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Solo Mode</h1>

      {battleEngine === null && (
        <>
          {/* Chapter Selection */}
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">
              Select Chapter
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {CHAPTERS_ARRAY.map((chapName, i) => (
                <button
                  key={i}
                  className={`
                                        py-2 px-4 rounded-lg shadow-md font-semibold transition-all duration-200
                                        ${
                                          chapter === i + 1
                                            ? "bg-yellow-500 text-gray-900 border-2 border-yellow-300 transform scale-105"
                                            : "bg-blue-700 hover:bg-blue-600 text-white"
                                        }
                                        ${
                                          !isUnlocked(
                                            i + 1,
                                            1,
                                            gameEngine.player.soloProgress,
                                          )
                                            ? "opacity-60 cursor-not-allowed"
                                            : ""
                                        }
                                    `}
                  onClick={() => {
                    setChapter(i + 1);
                    setStage(1);
                    setSelectedCharacters([]);
                    resetBattle();
                  }}
                  disabled={
                    !isUnlocked(i + 1, 1, gameEngine.player.soloProgress)
                  }
                >
                  {chapName}
                </button>
              ))}
            </div>

            {/* Stage Selection */}
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">
              Select Stage
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {Array.from(
                { length: STAGES_PER_CHAPTER },
                (_, i) => `Stage ${i + 1}`,
              ).map((stageName, i) => {
                const unlocked = isUnlocked(
                  chapter,
                  i + 1,
                  gameEngine.player.soloProgress,
                );
                const isSelected = stage === i + 1;
                const stageKey = `${CHAPTERS_ARRAY[chapter - 1]}_${stageName}`; // For completion check
                const isCompleted = completedStages.has(stageKey);

                return (
                  <button
                    key={i}
                    className={`
                                            py-2 px-4 rounded-lg shadow-md font-semibold transition-all duration-200
                                            ${
                                              unlocked
                                                ? isSelected
                                                  ? "bg-yellow-500 text-gray-900 border-2 border-yellow-300 transform scale-105"
                                                  : "bg-blue-700 hover:bg-blue-600 text-white"
                                                : "bg-gray-700 text-gray-400 cursor-not-allowed opacity-60"
                                            }
                                            ${isCompleted ? "border-2 border-green-500" : ""}
                                        `}
                    onClick={() => {
                      setStage(i + 1);
                      setSelectedCharacters([]);
                      resetBattle();
                    }}
                    disabled={!unlocked}
                  >
                    {stageName}
                    {isCompleted && (
                      <span className="ml-2 text-green-300">&#10003;</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Character Selection (Reusable Component) */}
          <CharacterSelection
            characters={ownedChars} // Pass your actual owned characters here
            selectedCharacters={selectedCharacters}
            onCharacterSelect={handleCharacterSelect}
            maxSelection={1} // Solo mode allows up to 1 characters
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
          onVictory={() => {
            const currentStageNum = getSoloStageNumber(chapter, stage);
            const crystalReward = getCrystalReward(
              chapter,
              stage,
              gameEngine.player.soloProgress,
              currentStageNum,
            );
            updateGameEngine((engine) => {
              let nextStageNum = currentStageNum + 1;
              let newProgress = engine.player.soloProgress;
              if (stage === STAGES_PER_CHAPTER) {
                nextStageNum = getSoloStageNumber(chapter + 1, 1);
              }
              if (nextStageNum > engine.player.soloProgress) {
                newProgress = nextStageNum;
              }
              return {
                ...engine,
                player: {
                  ...engine.player,
                  soloProgress: newProgress,
                  crystals: engine.player.crystals + crystalReward,
                },
                battleEngine: null,
              };
            });
            setSelectedCharacters([]); // Clear selected characters after battle
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

export default SoloMode;
