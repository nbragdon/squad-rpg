import React, { useEffect, useState } from "react";
import { getXpToNextLevel } from "../data/leveling";
import { SkillDescriptionCard } from "../data/skills/skillDescriptionUtil";
import { calculateStat } from "../data/statUtils";
import { AffinityType } from "../types/affinity";
import { PlayerCharacter } from "../types/character";
import { Rarity } from "../types/rarity";
import { StatType } from "../types/stats";
import {
  AffinityIcons,
  getRarityTextColorClass,
  RarityIcons,
  StatIcons,
} from "./utils";

interface CharacterModalProps {
  character: PlayerCharacter;
  onClose: () => void;
  getRarityColor?: (rarity: Rarity) => string; // This prop might become redundant if we use RARITY_COLORS directly
}

const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
}) => {
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

  const currentAbility = allAbilities[currentAbilityIndex];

  // Calculate XP percentage for progress bar
  // Safely access character.xp and character.level
  const currentXp =
    typeof displayCharacter.xp === "number" ? displayCharacter.xp : 0;
  const currentLevel =
    typeof displayCharacter.level === "number" ? displayCharacter.level : 1;
  const xpToNext = getXpToNextLevel(currentLevel);
  const xpPercentage = (currentXp / xpToNext) * 100;

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
                  })}
                </b>
              </div>
            ))}
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
    </div>
  );
};

export default CharacterModal;
