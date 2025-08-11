import { useGameEngine } from "context/GameEngineContext";
import { useState, useMemo, useEffect } from "react";
import { PlayerCharacter } from "types/character";
import { EquipmentType, EquipmentItem } from "types/inventory";
import { Rarity } from "types/rarity";
import { StatType } from "types/stats";
import {
  RARITY_COLORS,
  getRarityTextColorClass,
  RarityIcons,
  EQUIPMENT_TYPE_ICONS,
  StatIcons,
  COIN_ICON,
} from "./utils";
import { getOwnedCharacters } from "data/characters/charUtil";
import {
  applyRandomSubstatIncrease,
  calculateLevelUpCost,
  formatStatValue,
  generateSubStatEquipmentBoosts,
  getEquipmentValue,
  getLeveledEquipmentValue,
  MAX_EQUIPMENT_LEVELS,
} from "data/inventory/equipmentUtil";
import { GiTrashCan } from "react-icons/gi";

interface EquipmentManagementPageProps {
  onBack: () => void;
}

const ITEMS_PER_PAGE = 8; // Number of items to display per page

type FilterType = EquipmentType | "all" | "unequipped";
type SortOrder = "level_desc" | "level_asc" | "rarity_desc" | "name_asc";

const EquipmentManagementPage: React.FC<EquipmentManagementPageProps> = ({
  onBack,
}) => {
  const { gameEngine, updateGameEngine } = useGameEngine();
  const { equipment, characterProgress, coins } = gameEngine.player;

  const [filterType, setFilterType] = useState<FilterType>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("level_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToTrash, setItemToTrash] = useState<EquipmentItem | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Memoize equipped items map for quick lookup
  const equippedItemsMap = useMemo(() => {
    const map = new Map<string, PlayerCharacter>(); // Map: itemId -> character
    const ownedChars = getOwnedCharacters(gameEngine);
    Object.entries(characterProgress || {}).forEach(([characterId, char]) => {
      const selectedChar = ownedChars.find(
        (character) => character.id === characterId,
      );
      if (selectedChar) {
        if (char.equipedItems[EquipmentType.weapon])
          map.set(char.equipedItems[EquipmentType.weapon], selectedChar);
        if (char.equipedItems[EquipmentType.armor])
          map.set(char.equipedItems[EquipmentType.armor], selectedChar);
        if (char.equipedItems[EquipmentType.trinket]) {
          char.equipedItems[EquipmentType.trinket].forEach((trinketId) => {
            if (trinketId) map.set(trinketId, selectedChar);
          });
        }
      }
    });
    return map;
  }, [characterProgress, gameEngine]);

  // Filter and sort logic
  const filteredAndSortedInventory = useMemo(() => {
    let filtered = Object.values(equipment).filter((item) => {
      if (filterType === "all") return true;
      if (filterType === "unequipped") return !equippedItemsMap.get(item.id);
      return item.equipmentType === filterType;
    });

    filtered.sort((a, b) => {
      if (sortOrder === "level_desc") return b.level - a.level;
      if (sortOrder === "level_asc") return a.level - b.level;
      if (sortOrder === "rarity_desc") {
        const rarityOrder = [
          Rarity.LEGENDARY,
          Rarity.EPIC,
          Rarity.RARE,
          Rarity.UNCOMMON,
          Rarity.COMMON,
        ];
        return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
      }
      if (sortOrder === "name_asc") return a.name.localeCompare(b.name);
      return 0;
    });
    return filtered;
  }, [equipment, filterType, sortOrder]);

  // Reset page when filters/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, sortOrder]);

  const totalPages = Math.ceil(
    filteredAndSortedInventory.length / ITEMS_PER_PAGE,
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const itemsToDisplay = filteredAndSortedInventory.slice(startIndex, endIndex);

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleTrashClick = (item: EquipmentItem) => {
    setItemToTrash(item);
    setShowConfirmModal(true);
  };

  const confirmTrashItem = () => {
    if (itemToTrash) {
      const trashValue = getEquipmentValue(itemToTrash);
      updateGameEngine((prev) => {
        delete prev.player.equipment[itemToTrash.id];
        return {
          ...prev,
          player: {
            ...prev.player,
            equipment: { ...prev.player.equipment },
            coins: (prev.player.coins || 0) + trashValue,
          },
        };
      });
      setShowConfirmModal(false);
      setItemToTrash(null);
    }
  };

  const cancelTrashItem = () => {
    setShowConfirmModal(false);
    setItemToTrash(null);
  };

  const handleLevelUp = (itemToLevelUp: EquipmentItem) => {
    const currentLevel = itemToLevelUp.level;
    const maxLevel = MAX_EQUIPMENT_LEVELS[itemToLevelUp.rarity];
    const cost = calculateLevelUpCost(currentLevel);

    if (currentLevel >= maxLevel) {
      setMessage({
        text: `${itemToLevelUp.name} is already at max level!`,
        type: "error",
      });
      return;
    }

    if (gameEngine.player.coins < cost) {
      setMessage({
        text: `Not enough coins! Need ${cost} coins.`,
        type: "error",
      });
      return;
    }

    updateGameEngine((prevEngine) => {
      const newEquipment = { ...prevEngine.player.equipment };
      let item = { ...newEquipment[itemToLevelUp.id] }; // Create a mutable copy

      if (item) {
        item.level = item.level + 1;

        // Apply random substat increase every 5 levels
        if (item.level % 5 === 0) {
          item = applyRandomSubstatIncrease(item);
        }

        newEquipment[itemToLevelUp.id] = item; // Update the item in the equipment object
      }

      return {
        ...prevEngine,
        player: {
          ...prevEngine.player,
          coins: prevEngine.player.coins - cost,
          equipment: newEquipment,
        },
      };
    });
    setMessage({
      text: `${itemToLevelUp.name} leveled up to Lv. ${currentLevel + 1}!`,
      type: "success",
    });
  };

  const handleMaxLevelUp = (itemToLevelUp: EquipmentItem) => {
    let currentItem = { ...itemToLevelUp }; // Create a mutable copy for calculations
    let levelsGained = 0;
    let newCoins = gameEngine.player.coins;

    while (currentItem.level < MAX_EQUIPMENT_LEVELS[currentItem.rarity]) {
      const costForNextLevel = calculateLevelUpCost(currentItem.level);

      if (newCoins >= costForNextLevel) {
        newCoins -= costForNextLevel;
        levelsGained++;
        currentItem.level = currentItem.level + 1;

        // Apply random substat increase every 5 levels
        if (currentItem.level % 5 === 0) {
          currentItem = applyRandomSubstatIncrease(currentItem);
        }
      } else {
        break; // Not enough coins for the next level
      }
    }

    if (levelsGained > 0) {
      updateGameEngine((prevEngine) => {
        const newEquipment = { ...prevEngine.player.equipment };
        newEquipment[currentItem.id] = currentItem; // Update with the fully leveled item

        return {
          ...prevEngine,
          player: {
            ...prevEngine.player,
            coins: newCoins,
            equipment: newEquipment,
          },
        };
      });
      setMessage({
        text: `${itemToLevelUp.name} leveled up ${levelsGained} times! Now Lv. ${currentItem.level}!`,
        type: "success",
      });
    } else {
      if (currentItem.level >= MAX_EQUIPMENT_LEVELS[currentItem.rarity]) {
        setMessage({
          text: `${itemToLevelUp.name} is already at max level!`,
          type: "error",
        });
      } else {
        const costForNextLevel = calculateLevelUpCost(currentItem.level);
        setMessage({
          text: `Not enough coins to level up ${itemToLevelUp.name}! Need ${costForNextLevel} coins.`,
          type: "error",
        });
      }
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000); // Message disappears after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white font-inter flex flex-col p-4 sm:p-8">
      <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #333;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #555;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #777;
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scale-in {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
        `}</style>

      {/* Back Button and Title */}
      <div className="w-full max-w-6xl mx-auto flex justify-between items-center mb-6 p-2 bg-gray-800 rounded-lg shadow-xl">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
          onClick={onBack}
        >
          &larr; Back
        </button>
        <h1 className="text-4xl font-extrabold text-yellow-400 drop-shadow-lg">
          Equipment Management
        </h1>
        <div className="flex items-center bg-blue-800 text-white rounded-xl p-2 shadow-md">
          {COIN_ICON} {/* Using IconCoin component directly */}
          <span className="ml-2 text-xl font-semibold">{coins}</span>
        </div>
      </div>

      {/* Message Display */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-center font-semibold ${message.type === "success" ? "bg-green-600" : "bg-red-600"} animate-fade-in`}
        >
          {message.text}
        </div>
      )}

      {/* Filters and Sort */}
      <div className="w-full max-w-6xl mx-auto bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <h3 className="text-xl font-semibold text-yellow-300 mr-2">
            Filter By:
          </h3>
          {(
            [
              "all",
              EquipmentType.weapon,
              EquipmentType.armor,
              EquipmentType.trinket,
              "unequipped",
            ] as FilterType[]
          ).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`
                  px-4 py-2 rounded-full font-semibold transition-colors duration-200
                  ${filterType === type ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-gray-300"}
                `}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <h3 className="text-xl font-semibold text-yellow-300 mr-2">
            Sort By:
          </h3>
          {(
            [
              "level_desc",
              "level_asc",
              "rarity_desc",
              "name_asc",
            ] as SortOrder[]
          ).map((order) => (
            <button
              key={order}
              onClick={() => setSortOrder(order)}
              className={`
                  px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-200
                  ${sortOrder === order ? "bg-blue-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-gray-300"}
                `}
            >
              {order
                .replace(/_/g, " ")
                .replace("desc", "(High-Low)")
                .replace("asc", "(Low-High)")
                .replace("rarity", "Rarity")
                .replace("name", "Name")}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="flex-grow w-full max-w-6xl mx-auto custom-scrollbar overflow-y-auto pr-2">
        {itemsToDisplay.length === 0 ? (
          <p className="text-center text-gray-400 text-xl py-20">
            No equipment found with the current filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8">
            {itemsToDisplay.map((item) => {
              const equippedChar = equippedItemsMap.get(item.id);
              const rarityBorderClass =
                RARITY_COLORS[item.rarity] || "border-gray-500";
              const rarityTextColorClass = getRarityTextColorClass(item.rarity);
              const nextLevelCost = calculateLevelUpCost(item.level);
              const isMaxLevel =
                item.level >= MAX_EQUIPMENT_LEVELS[item.rarity];
              const canAffordLevelUp = coins >= nextLevelCost;

              return (
                <div
                  key={item.id}
                  className={`
                      bg-gray-800 rounded-xl p-5 shadow-xl border-2 ${rarityBorderClass}
                      flex flex-col transform hover:scale-102 transition-transform duration-200
                    `}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {item.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-300">
                      Lv.{" "}
                      <span className="font-bold text-yellow-300 ml-1">
                        {item.level}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`text-md font-semibold mb-3 ${rarityTextColorClass} flex items-center`}
                  >
                    {RarityIcons[item.rarity]} {/* Invoking the function */}
                    <span className="ml-1">{item.rarity.toUpperCase()}</span>
                  </div>

                  <div className="mb-3 flex items-center text-lg">
                    {EQUIPMENT_TYPE_ICONS[item.equipmentType]}{" "}
                    {/* Invoking the function */}
                    <span className="ml-2 capitalize">
                      {item.equipmentType}
                    </span>
                  </div>

                  {/* Main Stats */}
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-green-300 mb-1">
                      Main Stats:
                    </h4>
                    {item.mainBoosts.map((boost, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-green-200 text-sm"
                      >
                        {StatIcons[boost.statType]}{" "}
                        <span className="ml-1">
                          {formatStatValue(boost, item.level, true)}{" "}
                          {item.level > 1 &&
                            `(${getLeveledEquipmentValue(boost, 1, true)}) `}
                          {StatType[boost.statType]}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Sub Stats */}
                  {item.subBoosts.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-gray-400 mb-1">
                        Sub Stats:
                      </h4>
                      {item.subBoosts.map((boost, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-gray-300 text-xs"
                        >
                          {StatIcons[boost.statType]}{" "}
                          {/* Invoking the function */}
                          <span className="ml-1">
                            {formatStatValue(boost, item.level, false)}{" "}
                            {StatType[boost.statType]}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Equipped To */}
                  <div className="mt-auto pt-3 border-t border-gray-700 text-sm">
                    {equippedChar ? (
                      <p className="text-blue-300">
                        Equipped to:{" "}
                        <span className="font-semibold">
                          {equippedChar.name}
                        </span>
                      </p>
                    ) : (
                      <p className="text-gray-400">Unequipped</p>
                    )}
                  </div>

                  {/* Level Up and Trash Buttons */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      {" "}
                      {/* Group Level Up and Max Level */}
                      <button
                        onClick={() => handleLevelUp(item)}
                        disabled={isMaxLevel || !canAffordLevelUp}
                        className={`font-bold py-2 px-3 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center text-sm
                                  ${
                                    isMaxLevel || !canAffordLevelUp
                                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                      : "bg-blue-600 hover:bg-blue-700 text-white"
                                  }`}
                      >
                        <span>
                          Lv Up{" "}
                          <span className="inline-flex items-center">
                            <span className="mr-1">{nextLevelCost}</span>
                            {COIN_ICON}
                          </span>
                        </span>
                      </button>
                      <button
                        onClick={() => handleMaxLevelUp(item)}
                        disabled={isMaxLevel || !canAffordLevelUp}
                        className={`font-bold py-2 px-3 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center text-sm
                                  ${
                                    isMaxLevel || !canAffordLevelUp
                                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                      : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                  }`}
                      >
                        Max Lv
                      </button>
                    </div>
                    <button
                      onClick={() => handleTrashClick(item)}
                      className="bg-red-700 hover:bg-red-600 text-white p-2 ml-2 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center"
                    >
                      <GiTrashCan className="text-lg" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
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

      {/* Confirmation Modal */}
      {showConfirmModal && itemToTrash && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center shadow-2xl border border-red-700 animate-scale-in">
            <h3 className="text-2xl font-bold text-red-400 mb-4">
              Confirm Trash Item?
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              Are you sure you want to trash{" "}
              <span className="font-bold text-white">"{itemToTrash.name}"</span>{" "}
              (Lv. {itemToTrash.level}, {itemToTrash.rarity.toUpperCase()})? You
              will receive{" "}
              <span className="font-bold text-yellow-400">
                {getEquipmentValue(itemToTrash)}
              </span>{" "}
              {COIN_ICON}. This cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmTrashItem}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-colors duration-200"
              >
                Confirm Trash
              </button>
              <button
                onClick={cancelTrashItem}
                className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentManagementPage;
