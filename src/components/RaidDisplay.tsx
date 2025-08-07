import { BattleEngine } from "battle/battleEngine";
import {
  getRaidEnemiesByRarityAndLevel,
  getRandomEnemy,
} from "data/enemies/enemy-map";
import { generateRandomEquipment } from "data/inventory/equipmentUtil";
import React, { useEffect, useState } from "react";
import { useGameEngine } from "../context/GameEngineContext";
import { PlayerCharacter } from "../types/character";
import { EquipmentType, RARITY_TO_TICKET_ID } from "../types/inventory";
import { Rarity, RARITY_ORDER } from "../types/rarity";
import BattleDisplay from "./BattleDisplay";
import { RARITY_COLORS } from "./utils";
import { getOwnedCharacters } from "data/characters/charUtil";
import CharacterModal from "./CharacterModal";
import { RewardType } from "types/reward";
import { CharacterSelection } from "./CharacterCollection";
import TicketSelection from "./TicketSelection";

const LEVELS_PER_RARITY = {
  [Rarity.COMMON]: 5,
  [Rarity.UNCOMMON]: 6,
  [Rarity.RARE]: 8,
  [Rarity.EPIC]: 12,
  [Rarity.LEGENDARY]: 15,
};

const LEVEL_INCREASE_PER_LEVEL_BY_RARITY = {
  [Rarity.COMMON]: 3,
  [Rarity.UNCOMMON]: 4,
  [Rarity.RARE]: 5,
  [Rarity.EPIC]: 6,
  [Rarity.LEGENDARY]: 7,
};

const BASE_LEVEL_BY_RARITY = {
  [Rarity.COMMON]: 3,
  [Rarity.UNCOMMON]: 15,
  [Rarity.RARE]: 30,
  [Rarity.EPIC]: 50,
  [Rarity.LEGENDARY]: 80,
};

function getRaidLevelNumber(level: number, rarity: Rarity) {
  let levelNumber = level;
  const endIndex = RARITY_ORDER.indexOf(rarity);
  for (let i = 0; i < endIndex; i++) {
    levelNumber += LEVELS_PER_RARITY[RARITY_ORDER[i]];
  }

  return levelNumber;
}

function isLevelUnlocked(level: number, rarity: Rarity, raidProgress: number) {
  if (level === 1 && rarity === Rarity.COMMON) return true;
  const stageNum = getRaidLevelNumber(level, rarity);
  return raidProgress >= stageNum;
}

function isLevelCompleted(level: number, rarity: Rarity, raidProgress: number) {
  const stageNum = getRaidLevelNumber(level, rarity);
  return raidProgress > stageNum;
}

interface RaidProps {
  onBack: () => void;
}

const RaidMode: React.FC<RaidProps> = ({ onBack }) => {
  const { gameEngine, updateGameEngine } = useGameEngine();
  const [selectedRarity, setSelectedRarity] = useState<Rarity>(Rarity.COMMON);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedCharacters, setSelectedCharacters] = useState<
    PlayerCharacter[]
  >([]);
  const [modalCharacter, setModalCharacter] = useState<PlayerCharacter | null>(
    null,
  );
  const [ticketsToUse, setTicketsToUse] = useState<number>(0);

  const getUnlockedRarities = () => {
    const completedRarities: Rarity[] = [];
    const raidProgress = gameEngine.player.raidProgress || 1;
    const commonLevelTotal = LEVELS_PER_RARITY[Rarity.COMMON];
    const uncommonLevelTotal =
      commonLevelTotal + LEVELS_PER_RARITY[Rarity.UNCOMMON];
    const rareLevelTotal = uncommonLevelTotal + LEVELS_PER_RARITY[Rarity.RARE];
    const epicLevelTotal = rareLevelTotal + LEVELS_PER_RARITY[Rarity.EPIC];
    const legendaryLevelTotal =
      epicLevelTotal + LEVELS_PER_RARITY[Rarity.LEGENDARY];

    if (raidProgress >= commonLevelTotal) completedRarities.push(Rarity.COMMON);
    if (raidProgress >= uncommonLevelTotal)
      completedRarities.push(Rarity.UNCOMMON);
    if (raidProgress >= rareLevelTotal) completedRarities.push(Rarity.RARE);
    if (raidProgress >= epicLevelTotal) completedRarities.push(Rarity.EPIC);
    if (raidProgress >= legendaryLevelTotal)
      completedRarities.push(Rarity.EPIC);
    return completedRarities;
  };

  const completedRarities = getUnlockedRarities();

  const battleEngine = gameEngine.battleEngine;
  const ownedChars = getOwnedCharacters(gameEngine);

  function resetBattle() {
    updateGameEngine((engine) => ({
      ...engine,
      battleEngine: null,
    }));
  }

  const handleRaritySelect = (rarity: Rarity) => {
    setSelectedRarity(rarity);
    setTicketsToUse(0);
  };

  const isRarityDisabled = (rarity: Rarity): boolean => {
    const rarityIndex = RARITY_ORDER.indexOf(rarity);
    if (rarityIndex === 0) return false; // Common is never disabled

    const previousRarity = RARITY_ORDER[rarityIndex - 1];
    // A rarity is disabled if the previous one is not yet completed
    return !getUnlockedRarities().includes(previousRarity);
  };

  const handleStartRaid = () => {
    if (!selectedRarity || !selectedLevel || selectedCharacters.length === 0) {
      // Replaced alert with console.error for better practice in React
      console.error(
        "Please select a rarity, equipment preference, and at least one character.",
      );
      return;
    }
    console.log("Starting Raid with:", {
      rarity: selectedRarity,
      level: selectedLevel,
      characters: selectedCharacters.map((c) => c.name),
    });
    const enemyLevel =
      BASE_LEVEL_BY_RARITY[selectedRarity] +
      LEVEL_INCREASE_PER_LEVEL_BY_RARITY[selectedRarity] * (selectedLevel - 1);
    updateGameEngine((engine) => ({
      ...engine,
      battleEngine: new BattleEngine({
        playerCharacters: selectedCharacters,
        enemies: getRaidEnemiesByRarityAndLevel(selectedRarity, enemyLevel),
        inventory: engine.player.equipment,
      }),
    }));
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white font-inter flex flex-col items-center p-8">
      {/* Back Button */}
      <div className="w-full max-w-4xl flex justify-start mb-8">
        <button
          onClick={onBack}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
        >
          &larr; Back
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Raid Mode</h1>
      {battleEngine === null && (
        <>
          {/* Rarity Selection */}
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">
              Select Raid Rarity
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {RARITY_ORDER.map((rarity) => {
                const isDisabled = isRarityDisabled(rarity);
                const isSelected = selectedRarity === rarity;
                const isCompleted = completedRarities.includes(rarity);

                return (
                  <button
                    key={rarity}
                    onClick={() => handleRaritySelect(rarity)}
                    disabled={isDisabled}
                    className={`
                  py-3 px-6 rounded-lg shadow-lg font-bold text-lg transition-all duration-200
                  ${
                    isDisabled
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
                    )}{" "}
                    {/* Checkmark for completed */}
                  </button>
                );
              })}
            </div>

            {/* Stage Selection */}
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">
              Select Level
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {Array.from(
                { length: LEVELS_PER_RARITY[selectedRarity] },
                (_, i) => `Level ${i + 1}`,
              ).map((stageName, i) => {
                const unlocked = isLevelUnlocked(
                  i + 1,
                  selectedRarity,
                  gameEngine.player.raidProgress,
                );
                const isSelected = selectedLevel === i + 1;
                const isCompleted = isLevelCompleted(
                  i + 1,
                  selectedRarity,
                  gameEngine.player.raidProgress,
                );

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
                      setSelectedLevel(i + 1);
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

          <CharacterSelection
            characters={ownedChars} // Array of all available characters
            selectedCharacters={selectedCharacters} // Optional: Array of currently selected characters (for selection mode)
            onCharacterSelect={(playerChars: PlayerCharacter[]) => {
              setSelectedCharacters([...playerChars]);
            }} // Optional: Callback for selection change
            maxSelection={3} // Optional: Maximum number of characters that can be selected
            title={"Choose Your Fighters"} // Optional title for the section
            onViewDetails={(character: PlayerCharacter) => {
              setModalCharacter(character);
            }} // New prop for custom view details action
          />

          {/* Start Dungeon Button */}
          <div className="flex justify-center items-center gap-2">
            <TicketSelection
              selectedRarity={selectedRarity}
              onTicketsSelected={function (amount: number): void {
                setTicketsToUse(amount);
              }}
            />
            <button
              onClick={handleStartRaid}
              className={`
          bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-10 rounded-xl
          shadow-xl text-2xl transition-all duration-200 mt-8
          ${
            !selectedRarity || !selectedLevel || selectedCharacters.length === 0
              ? "opacity-60 cursor-not-allowed"
              : ""
          }
        `}
              disabled={
                !selectedRarity ||
                !selectedLevel ||
                selectedCharacters.length === 0
              }
            >
              Start Raid
            </button>
          </div>
        </>
      )}
      {battleEngine && (
        <BattleDisplay
          rewards={[
            {
              type: RewardType.exp,
              multiplier: ticketsToUse + 1,
            },
            {
              type: RewardType.coins_status_effect,
              multiplier: ticketsToUse + 1,
            },
          ]}
          onVictory={() => {
            updateGameEngine((engine) => ({
              ...engine,
              player: {
                ...engine.player,
                inventory: {
                  ...engine.player.inventory,
                  [RARITY_TO_TICKET_ID[selectedRarity]]: {
                    ...engine.player.inventory[
                      RARITY_TO_TICKET_ID[selectedRarity]
                    ],
                    quantity: engine.player.inventory[
                      RARITY_TO_TICKET_ID[selectedRarity]
                    ]
                      ? engine.player.inventory[
                          RARITY_TO_TICKET_ID[selectedRarity]
                        ].quantity - ticketsToUse
                      : 0,
                  },
                },
                raidProgress:
                  getRaidLevelNumber(selectedLevel, selectedRarity) + 1,
              },
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

export default RaidMode;
