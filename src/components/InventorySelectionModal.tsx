import { useState, useEffect } from "react";
import { EquipmentType, EquipmentItem } from "types/inventory";
import {
  getRarityTextColorClass,
  StatIcons,
  RarityIcons,
  EQUIPMENT_TYPE_ICONS,
} from "./utils";
import { useGameEngine } from "context/GameEngineContext";
import { formatStatValue } from "data/inventory/equipmentUtil";

// --- InventorySelectionModal Component (now embedded) ---
interface InventorySelectionModalProps {
  equipmentType: EquipmentType;
  inventory: EquipmentItem[];
  onClose: () => void;
  onEquip: (item: EquipmentItem) => void;
  currentEquippedItem: EquipmentItem | undefined;
}

const ITEMS_PER_PAGE = 10; // Number of items to display per page

export const InventorySelectionModal: React.FC<
  InventorySelectionModalProps
> = ({ equipmentType, inventory, onClose, onEquip, currentEquippedItem }) => {
  const { gameEngine } = useGameEngine();
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAndSortedInventory, setFilteredAndSortedInventory] = useState<
    EquipmentItem[]
  >([]);

  const equipedItemIds: string[] = [];
  Object.values(gameEngine.player.characterProgress || {}).forEach(
    (progress) => {
      if (progress.equipedItems[EquipmentType.weapon])
        equipedItemIds.push(progress.equipedItems[EquipmentType.weapon]);
      if (progress.equipedItems[EquipmentType.armor])
        equipedItemIds.push(progress.equipedItems[EquipmentType.armor]);
      if (progress.equipedItems[EquipmentType.trinket][0])
        equipedItemIds.push(progress.equipedItems[EquipmentType.trinket][0]);
      if (progress.equipedItems[EquipmentType.trinket][1])
        equipedItemIds.push(progress.equipedItems[EquipmentType.trinket][1]);
    },
  );

  useEffect(() => {
    // Filter by equipment type and sort by level (highest first)
    const filtered = inventory.filter((item) => {
      return (
        item.equipmentType === equipmentType &&
        !equipedItemIds.includes(item.id)
      );
    });
    const sorted = filtered.sort((a, b) => b.level - a.level);
    setFilteredAndSortedInventory(sorted);
    setCurrentPage(1); // Reset to first page when inventory or type changes
  }, [inventory, equipmentType]);

  const totalPages = Math.ceil(
    filteredAndSortedInventory.length / ITEMS_PER_PAGE,
  );

  // Get items for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const itemsToDisplay = filteredAndSortedInventory.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 font-inter"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 text-white rounded-xl p-6 max-w-2xl w-full shadow-2xl relative border border-blue-700 animate-scale-in flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl font-bold transition-colors duration-200"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-3xl font-extrabold text-yellow-400 mb-6 text-center">
          Select{" "}
          {equipmentType.charAt(0).toUpperCase() + equipmentType.slice(1)}
        </h2>

        {currentEquippedItem && (
          <div className="mb-6 p-4 bg-gray-900 rounded-lg border border-purple-500 shadow-inner">
            <h3 className="text-xl font-bold text-purple-300 mb-2">
              Currently Equipped:
            </h3>
            <div className="flex items-center">
              <div className="text-3xl text-purple-300 mr-3">
                {EQUIPMENT_TYPE_ICONS[currentEquippedItem.equipmentType]}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">
                  {currentEquippedItem.name}
                </span>
                <span
                  className={`text-sm ${getRarityTextColorClass(currentEquippedItem.rarity)}`}
                >
                  Lv. {currentEquippedItem.level} -{" "}
                  {currentEquippedItem.rarity.toUpperCase()}
                </span>
                {currentEquippedItem.mainBoosts.map((boost, idx) => (
                  <span key={idx} className="text-xs text-green-300">
                    {StatIcons[boost.statType]}{" "}
                    {formatStatValue(boost, currentEquippedItem.level, true)}
                  </span>
                ))}
                {currentEquippedItem.subBoosts.length > 0 && (
                  <span className="text-xs text-gray-400 mt-1">
                    {currentEquippedItem.subBoosts.map((boost) => (
                      <span key={boost.statType} className="mr-2">
                        {StatIcons[boost.statType]}{" "}
                        {formatStatValue(
                          boost,
                          currentEquippedItem.level,
                          false,
                        )}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
          {itemsToDisplay.length === 0 ? (
            <p className="text-center text-gray-400 text-lg py-10">
              No {equipmentType} items in your inventory.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {itemsToDisplay.map((item) => {
                const isEquipped = currentEquippedItem?.id === item.id;
                return (
                  <div
                    key={item.id}
                    className={`
                        bg-gray-700 rounded-lg p-4 shadow-md flex flex-col
                        border-2 ${getRarityTextColorClass(item.rarity).replace("text-", "border-")}
                        ${isEquipped ? "ring-2 ring-green-400" : "hover:bg-gray-600 cursor-pointer"}
                      `}
                    onClick={() => !isEquipped && onEquip(item)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {item.name}
                      </h3>
                      <span className="text-sm text-gray-300">
                        Lv. {item.level}
                      </span>
                    </div>
                    <div
                      className={`text-md font-semibold mb-2 ${getRarityTextColorClass(item.rarity)}`}
                    >
                      {RarityIcons[item.rarity]}{" "}
                      <span className="ml-1">{item.rarity.toUpperCase()}</span>
                    </div>

                    {/* Main Stats (prominent) */}
                    <div className="mb-2">
                      {item.mainBoosts.map((boost, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-green-300 text-sm"
                        >
                          {StatIcons[boost.statType]}
                          <span className="ml-1">
                            {formatStatValue(boost, item.level, true)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Sub Stats (less prominent) */}
                    {item.subBoosts.length > 0 && (
                      <div>
                        {item.subBoosts.map((boost, idx) => (
                          <div
                            key={idx}
                            className="flex items-center text-gray-300 text-xs"
                          >
                            {StatIcons[boost.statType]}
                            <span className="ml-1">
                              {formatStatValue(boost, item.level, false)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {isEquipped ? (
                      <button
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
                        onClick={() => onClose()} // Simply close, unequip handled by parent
                      >
                        Equipped
                      </button>
                    ) : (
                      <button
                        className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
                        onClick={() => onEquip(item)}
                      >
                        Equip
                      </button>
                    )}
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
      </div>
    </div>
  );
};
