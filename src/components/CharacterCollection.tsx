import React, { useState } from "react";
import { useGameEngine } from "../context/GameEngineContext";
import { getOwnedCharacters } from "../data/characters/charUtil";
import { getXpToNextLevel } from "../data/leveling";
import { PlayerCharacter } from "../types/character";
import "./CharacterCollection.css";
import CharacterModal from "./CharacterModal";
import { RARITY_COLORS } from "./utils";

// Reusable CharacterSelection Component (full implementation for Canvas)
interface CharacterSelectionProps {
  characters: PlayerCharacter[]; // Array of all available characters
  selectedCharacters?: PlayerCharacter[]; // Optional: Array of currently selected characters (for selection mode)
  onCharacterSelect?: (character: PlayerCharacter) => void; // Optional: Callback for selection change
  maxSelection?: number; // Optional: Maximum number of characters that can be selected
  title?: string; // Optional title for the section
  showPagination?: boolean; // Whether to show pagination controls (default: true)
  charactersPerPage?: number; // Number of characters per page (default: 8)
  showViewDetailsButton?: boolean; // Whether to show the 'View Details' button (default: true)
  onViewDetails?: (character: PlayerCharacter) => void; // New prop for custom view details action
}

export const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  characters,
  selectedCharacters = [], // Default to empty array if not provided
  onCharacterSelect,
  maxSelection = 3,
  title = "Your Character Roster",
  showPagination = true,
  charactersPerPage = 8,
  showViewDetailsButton = true,
  onViewDetails, // Use this for custom view details action
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(characters.length / charactersPerPage);

  // Get characters for the current page
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter,
  );

  // Pagination handlers
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-white text-center">
        {title}{" "}
        {onCharacterSelect && `(${selectedCharacters.length}/${maxSelection})`}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentCharacters.map((character) => {
          const isSelected = selectedCharacters.some(
            (char) => char.id === character.id,
          );
          // Only disable if onCharacterSelect is provided and max selection reached
          const isDisabled =
            onCharacterSelect &&
            selectedCharacters.length >= maxSelection &&
            !isSelected;
          const rarityBorderClass =
            RARITY_COLORS[character.rarity] || "border-gray-500";

          return (
            <div
              key={character.id}
              // Only allow click for selection if onCharacterSelect is provided
              onClick={() =>
                onCharacterSelect && !isDisabled && onCharacterSelect(character)
              }
              className={`
                bg-gray-800 rounded-xl p-4 flex flex-col items-center text-center
                shadow-xl transition-all duration-200 border-2
                ${rarityBorderClass}
                ${
                  onCharacterSelect && isSelected
                    ? "ring-4 ring-offset-2 ring-offset-gray-800 ring-green-400 transform scale-105"
                    : onCharacterSelect && isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : onCharacterSelect
                        ? "hover:ring-2 hover:ring-offset-2 hover:ring-offset-gray-800 hover:ring-green-600 cursor-pointer"
                        : "cursor-default" // No selection, no pointer
                }
              `}
            >
              <img
                src={`https://placehold.co/100x100/6B7280/FFFFFF?text=${character.name.charAt(0)}`}
                alt={character.name}
                className="w-24 h-24 rounded-full mb-3 border-2 border-gray-600 object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/100x100/6B7280/FFFFFF?text=${character.name.charAt(0)}`;
                }}
              />
              <h3 className="text-xl font-bold text-yellow-300">
                {character.name}
              </h3>
              <p className="text-gray-300 text-sm">Lv. {character.level}</p>
              <p className="text-gray-400 text-xs capitalize">
                {character.strongAffinities.join(", ")}
              </p>
              {/* Display XP if it's a PlayerCharacter */}
              {"xp" in character && typeof character.xp === "number" && (
                <p className="text-gray-300 text-sm">
                  XP: {character.xp} / {getXpToNextLevel(character.level || 1)}
                </p>
              )}
              {character.strongAffinities && (
                <p className="text-gray-300 text-sm">
                  Strong: {character.strongAffinities.join(", ")}
                </p>
              )}
              {character.weakAffinities && (
                <p className="text-gray-400 text-xs">
                  Weak: {character.weakAffinities.join(", ")}
                </p>
              )}

              {showViewDetailsButton && (
                <button
                  className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 px-4 rounded-md shadow transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from triggering selection
                    onViewDetails && onViewDetails(character);
                  }}
                >
                  View Details
                </button>
              )}
            </div>
          );
        })}
      </div>

      {showPagination && characters.length > charactersPerPage && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

interface CharacterCollectionProps {
  characters: PlayerCharacter[]; // This should be the full list of ALL owned characters
  onBack: () => void;
  player?: any; // Add player prop for crystals, etc. (though not directly used in this component now)
}

const CharacterCollection: React.FC<CharacterCollectionProps> = ({
  characters, // This prop is now ignored in favor of MOCK_COLLECTION_CHARACTERS for Canvas
  onBack,
  player, // Player prop is not directly used in this version, but kept for compatibility
}) => {
  const { gameEngine, updateGameEngine } = useGameEngine();
  const [modalCharacter, setModalCharacter] = useState<PlayerCharacter | null>(
    null,
  );

  const ownedDisplayCharacters: PlayerCharacter[] =
    getOwnedCharacters(gameEngine);

  return (
    <div className="min-h-screen bg-blue-900 text-white font-inter flex flex-col items-center p-4 sm:p-8">
      {/* Back Button */}
      <div className="w-full max-w-4xl flex justify-start mb-8">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
          onClick={onBack}
        >
          &larr; Back
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-yellow-400">
        Character Collection
      </h1>

      {/* Character Selection (Reusable Component) */}
      <CharacterSelection
        characters={ownedDisplayCharacters} // Pass the characters to display
        selectedCharacters={[]} // No selection in collection view
        onCharacterSelect={undefined} // Disable selection functionality
        maxSelection={0} // No max selection as it's a display
        title="Your Roster"
        showPagination={true}
        charactersPerPage={12} // Show more characters per page for collection
        showViewDetailsButton={true}
        onViewDetails={(char) => setModalCharacter(char as PlayerCharacter)} // Set modal character on view details click
      />

      {modalCharacter && (
        <CharacterModal
          character={modalCharacter}
          onClose={() => setModalCharacter(null)}
        />
      )}
    </div>
  );
};

export default CharacterCollection;
