import React, { useEffect, useState } from "react";
import { getXpToNextLevel } from "../data/leveling";
import { SkillDescriptionCard } from "../data/skills/skillDescriptionUtil";
import { calculateStat } from "../data/statUtils";
import { AffinityType } from "../types/affinity";
import { PlayerCharacter } from "../types/character";
import { StatType } from "../types/stats";
import {
  AffinityIcons,
  EQUIPMENT_TYPE_ICONS,
  getRarityTextColorClass,
  RarityIcons,
  StatIcons,
} from "./utils";
import { EquipmentItem, EquipmentType } from "types/inventory";
import { useGameEngine } from "context/GameEngineContext";
import { generateBaseCharacterProgress } from "data/characters";
import {
  formatStatValue,
  InventorySelectionModal,
} from "./InventorySelectionModal";

interface CharacterModalProps {
  character: PlayerCharacter;
  onClose: () => void;
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
}) => {
  const { gameEngine, updateGameEngine } = useGameEngine();
  // State for managing the inventory selection modal
  const [showInventorySelection, setShowInventorySelection] = useState<
    EquipmentType | undefined
  >(undefined);
  const [selectedTrinketSlot, setSelectedTrinketSlot] = useState<
    0 | 1 | undefined
  >(undefined); // To distinguish between trinket slots
  // Use the provided character or the default mock if character is incomplete
  const displayCharacter = character;

  // Combine all skills and ultimate skill into a single array for navigation
  const allAbilities =
    displayCharacter.skills && displayCharacter.ultimateSkill
      ? [
          ...displayCharacter.skills,
          { ...displayCharacter.ultimateSkill, isUltimate: true },
        ]
      : [];

  const [currentAbilityIndex, setCurrentAbilityIndex] = useState(0);

  // Reset currentAbilityIndex if character changes or abilities list changes
  useEffect(() => {
    setCurrentAbilityIndex(0);
  }, [displayCharacter.id, allAbilities.length]);

  const goToNextAbility = () => {
    setCurrentAbilityIndex((prevIndex) =>
      Math.min(prevIndex + 1, allAbilities.length - 1),
    );
  };

  const goToPrevAbility = () => {
    setCurrentAbilityIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // Function to handle equipping an item
  const handleEquipItem = (item: EquipmentItem) => {
    updateGameEngine((engine) => {
      const updatedCharacterProgress = engine.player.characterProgress || {};
      if (!updatedCharacterProgress[character.id]) {
        updatedCharacterProgress[character.id] =
          generateBaseCharacterProgress();
      }
      console.log(updatedCharacterProgress);
      Object.entries(updatedCharacterProgress).forEach(([id, charProgress]) => {
        if (id === character.id) {
          updatedCharacterProgress[character.id] = {
            ...charProgress,
          };
          if (item.equipmentType === EquipmentType.trinket) {
            updatedCharacterProgress[character.id].equipedItems[
              item.equipmentType
            ][selectedTrinketSlot || 0] = item.id;
          } else {
            updatedCharacterProgress[character.id].equipedItems[
              item.equipmentType
            ] = item.id;
          }
        } else {
          if (item.equipmentType === EquipmentType.trinket) {
            const indexOfItem = charProgress.equipedItems[
              EquipmentType.trinket
            ].indexOf(item.id);
            if (indexOfItem >= 0) {
              updatedCharacterProgress[id].equipedItems[EquipmentType.trinket][
                indexOfItem
              ] = undefined;
            }
          } else {
            if (charProgress.equipedItems[item.equipmentType] === item.id) {
              charProgress.equipedItems[item.equipmentType] = undefined;
            }
          }
        }
      });

      return {
        ...engine,
        player: {
          ...engine.player,
          characterProgress: {
            ...engine.player.characterProgress,
            ...updatedCharacterProgress,
          },
        },
      };
    });
    setShowInventorySelection(undefined); // Close the modal
    setSelectedTrinketSlot(undefined); // Reset trinket slot selection
  };

  // Function to handle unequipping an item
  const handleUnequipItem = (slotType: EquipmentType, trinketSlot?: 0 | 1) => {
    updateGameEngine((engine) => {
      const updatedCharacterProgress = engine.player.characterProgress || {};
      Object.entries(updatedCharacterProgress).forEach(([id, charProgress]) => {
        if (slotType === EquipmentType.trinket) {
          updatedCharacterProgress[id].equipedItems[EquipmentType.trinket][
            trinketSlot || 0
          ] = undefined;
        } else {
          charProgress.equipedItems[slotType] = undefined;
        }
      });

      return {
        ...engine,
        player: {
          ...engine.player,
          characterProgress: {
            ...engine.player.characterProgress,
            ...updatedCharacterProgress,
          },
        },
      };
    });
  };

  // Helper to get the item in a specific slot
  const getEquippedItem = (
    slotType: EquipmentType,
    trinketSlot?: 0 | 1,
  ): EquipmentItem | undefined => {
    console.log(character);
    if (slotType === EquipmentType.trinket) {
      const itemId =
        character.equipedItems[EquipmentType.trinket][trinketSlot || 0];
      if (!itemId) return undefined;
      return gameEngine.player.equipment[itemId];
    }
    const itemId = character.equipedItems[slotType];
    if (!itemId) return undefined;
    return gameEngine.player.equipment[itemId];
  };

  const currentAbility = allAbilities[currentAbilityIndex];

  // Calculate XP percentage for progress bar
  // Safely access character.xp and character.level
  const currentXp =
    typeof displayCharacter.xp === "number" ? displayCharacter.xp : 0;
  const currentLevel =
    typeof displayCharacter.level === "number" ? displayCharacter.level : 1;
  const xpToNext = getXpToNextLevel(currentLevel);
  const xpPercentage = (currentXp / xpToNext) * 100;

  const equipedWeapon = getEquippedItem(EquipmentType.weapon);
  const equipedArmor = getEquippedItem(EquipmentType.armor);
  const equipedTrinket0 = getEquippedItem(EquipmentType.trinket, 0);
  const equipedTrinket1 = getEquippedItem(EquipmentType.trinket, 1);

  const equipedItems = [
    equipedArmor,
    equipedTrinket0,
    equipedTrinket1,
    equipedWeapon,
  ].filter((equipment) => equipment !== undefined);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 font-inter"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 text-white rounded-xl p-6 max-w-md w-full shadow-2xl relative border border-blue-700 animate-scale-in flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl font-bold transition-colors duration-200"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Character Header */}
        <div className="overflow-y-auto flex-grow pr-2">
          <div className="flex flex-col items-center mb-6">
            <img
              src={`https://placehold.co/120x120/6B7280/FFFFFF?text=${displayCharacter.name.charAt(0)}`}
              alt={displayCharacter.name}
              className="w-32 h-32 rounded-full mb-4 border-4 border-blue-500 object-cover shadow-lg"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/120x120/6B7280/FFFFFF?text=${displayCharacter.name.charAt(0)}`;
              }}
            />
            <h2 className="text-4xl font-extrabold text-yellow-400 mb-2">
              {displayCharacter.name}
            </h2>
            <div className="flex items-center text-lg font-semibold mb-2">
              <span className="mr-2">Level: {displayCharacter.level}</span>
              <span
                className={`flex items-center ${getRarityTextColorClass(displayCharacter.rarity)}`}
              >
                {RarityIcons[displayCharacter.rarity]}
                <span className="ml-1">
                  {displayCharacter.rarity.toUpperCase()}
                </span>
              </span>
            </div>
            <p className="text-gray-300 text-sm capitalize">
              {displayCharacter.strongAffinities.join(", ")}
            </p>
          </div>

          {/* XP Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-sm text-gray-300 mb-1">
              <span>XP:</span>
              <span>
                {currentXp} / {xpToNext}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${xpPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Main Stats Grid */}
          <div className="mb-6 grid grid-cols-2 gap-x-4 gap-y-3 text-lg">
            {Object.values(StatType).map((statType) => (
              <div key={statType} className="flex items-center">
                <span className="mr-2 text-yellow-300">
                  {StatIcons[statType]}
                </span>
                <span className="capitalize mr-2">{statType}:</span>
                <b className="text-white">
                  {calculateStat(statType, {
                    stats: displayCharacter.stats,
                    level: displayCharacter.level,
                    shards: displayCharacter.shards,
                    rarity: displayCharacter.rarity,
                    equipment: equipedItems,
                  })}
                </b>
              </div>
            ))}
          </div>

          {/* Equipped Items Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-yellow-300 mb-3 text-center">
              Equipped Items
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Weapon Slot */}
              <div
                className="col-span-2 bg-gray-700 rounded-lg p-3 flex items-start shadow-md cursor-pointer hover:bg-gray-600 transition-colors duration-200 relative"
                onClick={() => setShowInventorySelection(EquipmentType.weapon)}
              >
                {equipedWeapon ? (
                  <>
                    <div className="flex flex-col flex-grow">
                      <span className="font-bold text-lg">
                        {equipedWeapon.name}
                      </span>
                      <span
                        className={`text-sm ${getRarityTextColorClass(equipedWeapon.rarity)}`}
                      >
                        Lv. {equipedWeapon.level} -{" "}
                        {equipedWeapon.rarity.toUpperCase()}
                      </span>
                      <div className="grid grid-cols-2 gap-x-2">
                        {" "}
                        {/* Two-column layout for main stats */}
                        {equipedWeapon.mainBoosts.map((boost, idx) => (
                          <span
                            key={idx}
                            className="text-xs text-green-300 flex items-center"
                          >
                            {StatIcons[boost.statType]}
                            <span className="ml-1">
                              {formatStatValue(boost)}
                            </span>
                          </span>
                        ))}
                      </div>
                      {equipedWeapon.subBoosts.length > 0 && (
                        <div className="mt-1 grid grid-cols-2 gap-x-2">
                          {" "}
                          {/* Two-column layout for sub stats */}
                          {equipedWeapon.subBoosts.map((boost, idx) => (
                            <span
                              key={idx}
                              className="text-xs text-gray-300 flex items-center"
                            >
                              {StatIcons[boost.statType]}
                              <span className="ml-1">
                                {formatStatValue(boost)}
                              </span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      className="absolute top-2 right-2 bg-red-600 text-gray-400 hover:text-white text-xl font-bold"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent opening modal
                        handleUnequipItem(EquipmentType.weapon);
                      }}
                    >
                      &times;
                    </button>
                  </>
                ) : (
                  <div className="flex flex-grow items-center justify-center h-full text-3xl text-blue-300">
                    {EQUIPMENT_TYPE_ICONS[EquipmentType.weapon]}
                  </div>
                )}
              </div>

              {/* Armor Slot */}
              <div
                className="col-span-2 bg-gray-700 rounded-lg p-3 flex items-start shadow-md cursor-pointer hover:bg-gray-600 transition-colors duration-200 relative"
                onClick={() => setShowInventorySelection(EquipmentType.armor)}
              >
                {equipedArmor ? (
                  <>
                    <div className="flex flex-col flex-grow">
                      <span className="font-bold text-lg">
                        {equipedArmor.name}
                      </span>
                      <span
                        className={`text-sm ${getRarityTextColorClass(equipedArmor.rarity)}`}
                      >
                        Lv. {equipedArmor.level} -{" "}
                        {equipedArmor.rarity.toUpperCase()}
                      </span>
                      <div className="grid grid-cols-2 gap-x-2">
                        {" "}
                        {/* Two-column layout for main stats */}
                        {equipedArmor.mainBoosts.map((boost, idx) => (
                          <span
                            key={idx}
                            className="text-xs text-green-300 flex items-center"
                          >
                            {StatIcons[boost.statType]}
                            <span className="ml-1">
                              {formatStatValue(boost)}
                            </span>
                          </span>
                        ))}
                      </div>
                      {equipedArmor.subBoosts.length > 0 && (
                        <div className="mt-1 grid grid-cols-2 gap-x-2">
                          {" "}
                          {/* Two-column layout for sub stats */}
                          {equipedArmor.subBoosts.map((boost, idx) => (
                            <span
                              key={idx}
                              className="text-xs text-gray-300 flex items-center"
                            >
                              {StatIcons[boost.statType]}
                              <span className="ml-1">
                                {formatStatValue(boost)}
                              </span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      className="absolute top-2 right-2 bg-red-600 text-gray-400 hover:text-white text-xl font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnequipItem(EquipmentType.armor);
                      }}
                    >
                      &times;
                    </button>
                  </>
                ) : (
                  <div className="flex flex-grow items-center justify-center h-full text-3xl text-blue-300">
                    {EQUIPMENT_TYPE_ICONS[EquipmentType.armor]}
                  </div>
                )}
              </div>

              {/* Trinket 1 Slot */}
              <div
                className="bg-gray-700 rounded-lg p-3 flex flex-col items-start shadow-md cursor-pointer hover:bg-gray-600 transition-colors duration-200 relative"
                onClick={() => {
                  setShowInventorySelection(EquipmentType.trinket);
                  setSelectedTrinketSlot(0);
                }}
              >
                {equipedTrinket0 ? (
                  <>
                    <div className="flex flex-col flex-grow w-full">
                      <span className="font-bold text-lg">
                        {equipedTrinket0.name}
                      </span>
                      <span
                        className={`text-sm ${getRarityTextColorClass(equipedTrinket0.rarity)}`}
                      >
                        Lv. {equipedTrinket0.level} -{" "}
                        {equipedTrinket0.rarity.toUpperCase()}
                      </span>
                      <div className="grid grid-cols-2 gap-x-2">
                        {" "}
                        {/* Two-column layout for main stats */}
                        {equipedTrinket0.mainBoosts.map((boost, idx) => (
                          <span
                            key={idx}
                            className="text-xs text-green-300 flex items-center"
                          >
                            {StatIcons[boost.statType]}
                            <span className="ml-1">
                              {formatStatValue(boost)}
                            </span>
                          </span>
                        ))}
                      </div>
                      {equipedTrinket0.subBoosts.length > 0 && (
                        <div className="mt-1 grid grid-cols-2 gap-x-2">
                          {" "}
                          {/* Two-column layout for sub stats */}
                          {equipedTrinket0.subBoosts.map((boost, idx) => (
                            <span
                              key={idx}
                              className="text-xs text-gray-300 flex items-center"
                            >
                              {StatIcons[boost.statType]}
                              <span className="ml-1">
                                {formatStatValue(boost)}
                              </span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      className="absolute top-2 right-2 bg-red-600 text-gray-400 hover:text-white text-xl font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnequipItem(EquipmentType.trinket, 0);
                      }}
                    >
                      &times;
                    </button>
                  </>
                ) : (
                  <div className="flex flex-grow items-center justify-center h-full w-full text-3xl text-blue-300">
                    {EQUIPMENT_TYPE_ICONS[EquipmentType.trinket]}
                  </div>
                )}
              </div>

              {/* Trinket 2 Slot */}
              <div
                className="bg-gray-700 rounded-lg p-3 flex flex-col items-start shadow-md cursor-pointer hover:bg-gray-600 transition-colors duration-200 relative"
                onClick={() => {
                  setShowInventorySelection(EquipmentType.trinket);
                  setSelectedTrinketSlot(1);
                }}
              >
                {equipedTrinket1 ? (
                  <>
                    <div className="flex flex-col flex-grow w-full">
                      <span className="font-bold text-lg">
                        {equipedTrinket1.name}
                      </span>
                      <span
                        className={`text-sm ${getRarityTextColorClass(equipedTrinket1.rarity)}`}
                      >
                        Lv. {equipedTrinket1.level} -{" "}
                        {equipedTrinket1.rarity.toUpperCase()}
                      </span>
                      <div className="grid grid-cols-2 gap-x-2">
                        {" "}
                        {/* Two-column layout for main stats */}
                        {equipedTrinket1.mainBoosts.map((boost, idx) => (
                          <span
                            key={idx}
                            className="text-xs text-green-300 flex items-center"
                          >
                            {StatIcons[boost.statType]}
                            <span className="ml-1">
                              {formatStatValue(boost)}
                            </span>
                          </span>
                        ))}
                      </div>
                      {equipedTrinket1.subBoosts.length > 0 && (
                        <div className="mt-1 grid grid-cols-2 gap-x-2">
                          {" "}
                          {/* Two-column layout for sub stats */}
                          {equipedTrinket1.subBoosts.map((boost, idx) => (
                            <span
                              key={idx}
                              className="text-xs text-gray-300 flex items-center"
                            >
                              {StatIcons[boost.statType]}
                              <span className="ml-1">
                                {formatStatValue(boost)}
                              </span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      className="absolute top-2 right-2 bg-red-600 text-gray-400 hover:text-white text-xl font-bold"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnequipItem(EquipmentType.trinket, 1);
                      }}
                    >
                      &times;
                    </button>
                  </>
                ) : (
                  <div className="flex flex-grow items-center justify-center h-full w-full text-3xl text-blue-300">
                    {EQUIPMENT_TYPE_ICONS[EquipmentType.trinket]}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Affinities Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-yellow-300 mb-3 text-center">
              Affinities
            </h3>
            <div className="grid grid-cols-2 gap-4 text-base">
              <div>
                <p className="font-semibold text-green-400 mb-2 flex items-center">
                  <span className="mr-2">💪</span> Strong:
                </p>
                <div className="flex flex-wrap gap-2">
                  {displayCharacter.strongAffinities &&
                  displayCharacter.strongAffinities.length > 0 ? (
                    displayCharacter.strongAffinities.map((affinity) => (
                      <span
                        key={affinity}
                        className="flex items-center bg-green-800 text-white text-sm px-3 py-1 rounded-full shadow-md"
                      >
                        {AffinityIcons[affinity as AffinityType] ||
                          AffinityIcons.void}{" "}
                        {/* Fallback icon */}
                        <span className="ml-1 capitalize">{affinity}</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </div>
              </div>
              <div>
                <p className="font-semibold text-red-400 mb-2 flex items-center">
                  <span className="mr-2"> দুর্বল </span> Weak:
                </p>
                <div className="flex flex-wrap gap-2">
                  {displayCharacter.weakAffinities &&
                  displayCharacter.weakAffinities.length > 0 ? (
                    displayCharacter.weakAffinities.map((affinity) => (
                      <span
                        key={affinity}
                        className="flex items-center bg-red-800 text-white text-sm px-3 py-1 rounded-full shadow-md"
                      >
                        {AffinityIcons[affinity as AffinityType] ||
                          AffinityIcons.void}{" "}
                        {/* Fallback icon */}
                        <span className="ml-1 capitalize">{affinity}</span>
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">None</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Abilities Section with Swapping and Buttons in Header */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              {" "}
              {/* New header div for title and buttons */}
              <button
                onClick={goToPrevAbility}
                disabled={currentAbilityIndex === 0}
                className={`
                                flex items-center px-3 py-1 rounded-full text-white text-sm font-semibold
                                bg-blue-700 hover:bg-blue-600 transition-colors duration-200
                                disabled:opacity-30 disabled:cursor-not-allowed
                            `}
              >
                &lt;{" "}
                {currentAbilityIndex > 0 && (
                  <span className="ml-1 hidden sm:inline">
                    {allAbilities[currentAbilityIndex - 1]?.name}
                  </span>
                )}
              </button>
              <h3 className="text-xl font-bold text-yellow-300 text-center mx-2">
                Abilities
              </h3>{" "}
              {/* Centered title */}
              <button
                onClick={goToNextAbility}
                disabled={currentAbilityIndex === allAbilities.length - 1}
                className={`
                                flex items-center px-3 py-1 rounded-full text-white text-sm font-semibold
                                bg-blue-700 hover:bg-blue-600 transition-colors duration-200
                                disabled:opacity-30 disabled:cursor-not-allowed
                            `}
              >
                {currentAbilityIndex < allAbilities.length - 1 && (
                  <span className="mr-1 hidden sm:inline">
                    {allAbilities[currentAbilityIndex + 1]?.name}
                  </span>
                )}{" "}
                &gt;
              </button>
            </div>

            {/* Current Ability Card */}
            <div className="flex justify-center">
              {currentAbility ? (
                <SkillDescriptionCard skill={currentAbility} />
              ) : (
                <p className="text-gray-400 text-center w-full">
                  No abilities defined.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showInventorySelection && (
        <InventorySelectionModal
          equipmentType={showInventorySelection}
          inventory={Object.values(gameEngine.player.equipment || {})}
          onClose={() => {
            setShowInventorySelection(undefined);
            setSelectedTrinketSlot(undefined);
          }}
          onEquip={handleEquipItem}
          currentEquippedItem={getEquippedItem(
            showInventorySelection,
            selectedTrinketSlot,
          )}
        />
      )}
    </div>
  );
};

export default CharacterModal;
