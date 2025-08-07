import { FaGem } from "react-icons/fa";
import { COIN_ICON } from "./utils";
import { useGameEngine } from "context/GameEngineContext";

const TopBar = () => {
  const { gameEngine } = useGameEngine();
  const playerProgress = gameEngine.player;
  return (
    <div className="bg-blue-800 text-white rounded-xl p-4 mb-8 shadow-xl border border-blue-700 flex items-center justify-center min-w-[200px] max-w-sm transform hover:scale-105 transition-transform duration-300 ease-out">
      {<FaGem className="text-orange-700 text-3xl mr-3" />}
      <span className="text-xl font-semibold">
        Crystals:{" "}
        <b className="text-white text-2xl ml-2 mr-4">
          {playerProgress.crystals || 0}
        </b>
      </span>
      {COIN_ICON}
      <span className="text-xl font-semibold ml-2">
        Coins:{" "}
        <b className="text-white text-2xl ml-2">{playerProgress.coins || 0}</b>
      </span>
    </div>
  );
};

export default TopBar;
