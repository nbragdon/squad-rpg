import { FaGem } from "react-icons/fa";
import { COIN_ICON } from "./utils";
import { useGameEngine } from "context/GameEngineContext";
import { GameScreen } from "App";

interface TopBarProps {
  onBack: () => void; // Changed from onBack to onNavigate for consistency
  pageName: string;
}

const TopBar: React.FC<TopBarProps> = ({ onBack, pageName }) => {
  const { gameEngine, updateGameEngine } = useGameEngine();
  const playerProgress = gameEngine.player;

  // Helper to reset battle state
  function resetBattle() {
    updateGameEngine((engine) => ({
      ...engine,
      battleEngine: null,
    }));
  }

  return (
    // The main container is a flexbox, ensuring all items are horizontally aligned and vertically centered.
    <div className="bg-blue-800 text-white rounded-xl p-4 mb-8 shadow-xl border border-blue-700 flex items-center min-w-[400px] gap-4">
      {/* Back Button */}
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
        onClick={() => {
          resetBattle();
          onBack();
        }}
      >
        &larr; Back
      </button>

      {/* Page Name - The flex-grow class allows this element to take up all available space, pushing other items to the sides. */}
      <div className="flex-grow text-center">
        <span className="text-4xl font-bold text-yellow-400">{pageName}</span>
      </div>

      {/* Crystal count display */}
      <div className="flex items-center gap-2">
        {/* Crystal icon */}
        {<FaGem className="text-orange-700 text-3xl" />}
        {/* Crystal label and amount */}
        <span className="text-xl font-semibold">Crystals:</span>
        <span className="text-white text-2xl">{playerProgress.crystals}</span>
      </div>

      {/* Coin count display */}
      <div className="flex items-center gap-2">
        {/* Coin icon */}
        {COIN_ICON}
        {/* Coin label and amount */}
        <span className="text-xl font-semibold">Coins:</span>
        <span className="text-white text-2xl">{playerProgress.coins || 0}</span>
      </div>
    </div>
  );
};

export default TopBar;
