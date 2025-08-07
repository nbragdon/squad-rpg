import React from "react";
import { GameScreen } from "../App";
// Ensure GameScreen is an enum or union type that includes 'solo', 'dungeon', 'raid', 'collection', 'gacha'
import { FaGem } from "react-icons/fa";
import { useGameEngine } from "../context/GameEngineContext";
import { COIN_ICON } from "./utils";

interface MainMenuProps {
  onNavigate: (screen: GameScreen) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNavigate }) => {
  const { gameEngine } = useGameEngine();
  const playerProgress = gameEngine.player;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-950 text-white font-inter flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-yellow-400 mb-4 drop-shadow-lg animate-fade-in-down">
          Squad RPG
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in">
          Build your squad, collect legendary heroes, and conquer dungeons,
          raids, and solo challenges!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-900"
          onClick={() => onNavigate(GameScreen.SOLO)}
        >
          Solo
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-900"
          onClick={() => onNavigate(GameScreen.DUNGEON)}
        >
          Dungeon
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-900"
          onClick={() => onNavigate(GameScreen.RAID)}
        >
          Raid
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-900"
          onClick={() => onNavigate(GameScreen.TITAN)}
        >
          Titan
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-900"
          onClick={() => onNavigate(GameScreen.COLLECTION)}
        >
          Character Collection
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-blue-900"
          onClick={() => onNavigate(GameScreen.EQUIPMENT)}
        >
          Equipment
        </button>
      </div>

      <button
        className="mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 text-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-blue-900"
        onClick={() => onNavigate(GameScreen.GACHA)}
      >
        Gacha Summon
      </button>
    </div>
  );
};

export default MainMenu;
