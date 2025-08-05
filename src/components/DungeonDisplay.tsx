import { BattleEngine } from "battle/battleEngine";
import { getRandomEnemy } from "data/enemies/enemy-map";
import { generateRandomEquipment } from "data/inventory/equipmentUtil";
import React, { useEffect, useState } from "react";
import { useGameEngine } from "../context/GameEngineContext";
import { PlayerCharacter } from "../types/character";
import { EquipmentType } from "../types/inventory";
import { Rarity, RARITY_ORDER } from "../types/rarity";
import BattleDisplay from "./BattleDisplay";
import { RARITY_COLORS } from "./utils";
import { getOwnedCharacters } from "data/characters/charUtil";
import CharacterModal from "./CharacterModal";
import { RewardType } from "types/reward";
import { CharacterSelection } from "./CharacterCollection";

function getRandomItemType(favoredType: EquipmentType): EquipmentType {
  // Hardcoded drop rates
  const dropRates: { type: EquipmentType; rate: number }[] = [];

  if (favoredType === EquipmentType.trinket) {
    dropRates.push({ type: EquipmentType.trinket, rate: 0.4 });
    dropRates.push({ type: EquipmentType.weapon, rate: 0.35 });
    dropRates.push({ type: EquipmentType.armor, rate: 0.25 });
  }

  if (favoredType === EquipmentType.weapon) {
    dropRates.push({ type: EquipmentType.trinket, rate: 0.25 });
    dropRates.push({ type: EquipmentType.weapon, rate: 0.4 });
    dropRates.push({ type: EquipmentType.armor, rate: 0.35 });
  }

  if (favoredType === EquipmentType.armor) {
    dropRates.push({ type: EquipmentType.trinket, rate: 0.25 });
    dropRates.push({ type: EquipmentType.weapon, rate: 0.35 });
    dropRates.push({ type: EquipmentType.armor, rate: 0.4 });
  }

  const totalRate = dropRates.reduce((sum, item) => sum + item.rate, 0);
  const roll = Math.random() * totalRate; // Scale the roll by totalRate

  let cumulativeRate = 0;

  for (const item of dropRates) {
    cumulativeRate += item.rate;
    if (roll < cumulativeRate) {
      return item.type;
    }
  }

  // Fallback in case of floating point inaccuracies, though highly unlikely
  return dropRates[dropRates.length - 1].type;
}

const FLOORS_PER_RARITY = {
  [Rarity.COMMON]: 5,
  [Rarity.UNCOMMON]: 6,
  [Rarity.RARE]: 8,
  [Rarity.EPIC]: 12,
  [Rarity.LEGENDARY]: 15,
};

const LEVEL_INCREASE_PER_FLOOR_BY_RARITY = {
  [Rarity.COMMON]: 2,
  [Rarity.UNCOMMON]: 3,
  [Rarity.RARE]: 4,
  [Rarity.EPIC]: 5,
  [Rarity.LEGENDARY]: 6,
};

const BASE_LEVEL_BY_RARITY = {
  [Rarity.COMMON]: 1,
  [Rarity.UNCOMMON]: 3,
  [Rarity.RARE]: 6,
  [Rarity.EPIC]: 8,
  [Rarity.LEGENDARY]: 10,
};

interface DungeonProps {
  onBack: () => void;
}

const DungeonMode: React.FC<DungeonProps> = ({ onBack }) => {
  const { gameEngine, updateGameEngine } = useGameEngine();
  const [floor, setFloor] = useState(1);
  const [selectedRarity, setSelectedRarity] = useState<Rarity | null>(null);
  const [selectedDropPreference, setSelectedDropPreference] =
    useState<EquipmentType | null>(null);
  const [selectedCharacters, setSelectedCharacters] = useState<
    PlayerCharacter[]
  >([]);
  const [modalCharacter, setModalCharacter] = useState<PlayerCharacter | null>(
    null,
  );
  // go through dungeon progress and if all 3 dungeon types for a single rarity are true, then that rarity is completed
  const getCompltedRarities = () => {
    const completedRarities: Rarity[] = [];
    for (const rarity of RARITY_ORDER) {
      const isCompleted = Object.values(
        gameEngine.player.dungeonProgress[rarity],
      ).every((completed) => completed);
      if (isCompleted) {
        completedRarities.push(rarity);
      }
    }
    return completedRarities;
  };
  // Simulate completed rarities. Start with COMMON completed.
  const [completedRarities, setCompletedRarities] = useState<Rarity[]>(
    getCompltedRarities(),
  );

  const battleEngine = gameEngine.battleEngine;
  const ownedChars = getOwnedCharacters(gameEngine);

  // Pagination state for characters
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 8; // Adjust as needed

  // Calculate total pages
  const totalPages = Math.ceil(
    gameEngine.player.unlockedCharacters.length / charactersPerPage,
  );

  // Get characters for the current page
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = ownedChars.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter,
  );

  useEffect(() => {
    // Set initial selected rarity to the lowest completed one if none is selected
    if (!selectedRarity) {
      setSelectedRarity(completedRarities[0] || Rarity.COMMON);
    }
  }, [selectedRarity, completedRarities]);

  const handleRaritySelect = (rarity: Rarity) => {
    setSelectedRarity(rarity);
  };

  const handleDropPreferenceSelect = (type: EquipmentType) => {
    setSelectedDropPreference(type);
  };

  const handleCharacterSelect = (character: PlayerCharacter) => {
    setSelectedCharacters((prevSelected) => {
      if (prevSelected.some((char) => char.id === character.id)) {
        // Deselect if already selected
        return prevSelected.filter((char) => char.id !== character.id);
      } else {
        // Select if not selected, up to 3 characters
        if (prevSelected.length < 3) {
          return [...prevSelected, character];
        } else {
          // Optionally, show a message that max characters are selected
          console.log("Maximum 3 characters can be selected.");
          return prevSelected;
        }
      }
    });
  };

  const isRarityDisabled = (rarity: Rarity): boolean => {
    const rarityIndex = RARITY_ORDER.indexOf(rarity);
    if (rarityIndex === 0) return false; // Common is never disabled

    const previousRarity = RARITY_ORDER[rarityIndex - 1];
    // A rarity is disabled if the previous one is not yet completed
    return !completedRarities.includes(previousRarity);
  };

  const handleStartDungeon = () => {
    if (
      !selectedRarity ||
      !selectedDropPreference ||
      selectedCharacters.length === 0
    ) {
      // Replaced alert with console.error for better practice in React
      console.error(
        "Please select a rarity, equipment preference, and at least one character.",
      );
      return;
    }
    console.log("Starting Dungeon with:", {
      rarity: selectedRarity,
      dropPreference: selectedDropPreference,
      characters: selectedCharacters.map((c) => c.name),
    });
    const enemyLevel =
      BASE_LEVEL_BY_RARITY[selectedRarity] +
      LEVEL_INCREASE_PER_FLOOR_BY_RARITY[selectedRarity] * (floor - 1);
    updateGameEngine((engine) => ({
      ...engine,
      battleEngine: new BattleEngine({
        playerCharacters: selectedCharacters,
        enemies: [
          getRandomEnemy(enemyLevel, selectedRarity),
          getRandomEnemy(enemyLevel, selectedRarity),
          getRandomEnemy(enemyLevel, selectedRarity),
        ],
        inventory: engine.player.equipment,
      }),
    }));
  };

  // Pagination handlers
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
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

      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Dungeon Mode</h1>
      {battleEngine === null && (
        <>
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">
              Floor: {floor}
            </h2>
          </div>

          {/* Rarity Selection */}
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">
              Select Dungeon Rarity
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
          </div>

          {/* Equipment Drop Preference */}
          <div className="w-full max-w-4xl mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">
              Likely Equipment Drop
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {Object.values(EquipmentType).map((type) => {
                const isSelected = selectedDropPreference === type;
                return (
                  <div
                    key={type}
                    onClick={() => handleDropPreferenceSelect(type)}
                    className={`
                  relative bg-gray-800 rounded-xl p-6 flex flex-col items-center justify-center
                  shadow-xl cursor-pointer transition-all duration-200
                  ${isSelected ? "border-2 border-blue-400 transform scale-105" : "border-2 border-transparent hover:border-blue-600"}
                `}
                  >
                    {/* Placeholder for icon - you can replace with actual SVG/Lucide icons */}
                    <div className="text-5xl mb-3">
                      {type === EquipmentType.weapon && "⚔️"}
                      {type === EquipmentType.armor && "🛡️"}
                      {type === EquipmentType.trinket && "💎"}
                    </div>
                    <span className="text-xl font-semibold capitalize">
                      {type} Focus
                    </span>
                    {isSelected && (
                      <div className="absolute top-2 right-2 text-green-400 text-3xl">
                        &#10003;
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <CharacterSelection
            characters={ownedChars} // Array of all available characters
            selectedCharacters={selectedCharacters} // Optional: Array of currently selected characters (for selection mode)
            onCharacterSelect={(playerChars: PlayerCharacter[]) => {
              if (floor === 1) {
                setSelectedCharacters([...playerChars]);
              }
            }} // Optional: Callback for selection change
            maxSelection={3} // Optional: Maximum number of characters that can be selected
            title={"Choose Your Fighters"} // Optional title for the section
            onViewDetails={(character: PlayerCharacter) => {
              setModalCharacter(character);
            }} // New prop for custom view details action
          />

          {/* Start Dungeon Button */}
          <button
            onClick={handleStartDungeon}
            className={`
          bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-10 rounded-xl
          shadow-xl text-2xl transition-all duration-200 mt-8
          ${
            !selectedRarity ||
            !selectedDropPreference ||
            selectedCharacters.length === 0
              ? "opacity-60 cursor-not-allowed"
              : ""
          }
        `}
            disabled={
              !selectedRarity ||
              !selectedDropPreference ||
              selectedCharacters.length === 0
            }
          >
            Start Dungeon
          </button>
        </>
      )}
      {battleEngine && (
        <BattleDisplay
          rewards={[
            {
              type: RewardType.exp,
            },
            {
              type: RewardType.equipment,
              rarity: selectedRarity || Rarity.COMMON,
              equipmentType: getRandomItemType(
                selectedDropPreference || EquipmentType.weapon,
              ),
            },
          ]}
          onVictory={() => {
            updateGameEngine((engine) => ({
              ...engine,
              battleEngine: null,
            }));
            setFloor(floor + 1);
          }}
          onDefeat={() => {
            updateGameEngine((engine) => ({
              ...engine,
              battleEngine: null,
            }));
            setFloor(1);
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

export default DungeonMode;
