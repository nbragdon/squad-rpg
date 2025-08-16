import { useState } from "react";
import "./App.css";
import CharacterCollection from "./components/CharacterCollection";
import DungeonMode from "./components/DungeonDisplay";
import Gacha from "./components/Gacha";
import MainMenu from "./components/MainMenu";
import SoloMode from "./components/SoloMode";
import { useGameEngine } from "./context/GameEngineContext";
import {
  gachaCharacters,
  generateBaseCharacterProgress,
} from "./data/characters";
import EquipmentManagementPage from "components/EquipmentManagement";
import TitanMode from "components/TitanDisplay";
import RaidMode from "components/RaidDisplay";
import TopBar from "components/TopBar";

export enum GameScreen {
  SOLO = "solo",
  DUNGEON = "dungeon",
  RAID = "raid",
  MENU = "menu",
  COLLECTION = "collection",
  TEAM = "team",
  GACHA = "gacha",
  EQUIPMENT = "equipment",
  TITAN = "titan",
}

const SCREEN_TO_PAGE_NAME = {
  [GameScreen.COLLECTION]: "Characters",
  [GameScreen.DUNGEON]: "Dungeon",
  [GameScreen.EQUIPMENT]: "Equipment",
  [GameScreen.GACHA]: "Summon",
  [GameScreen.MENU]: "Squad Rpg",
  [GameScreen.RAID]: "Raid",
  [GameScreen.SOLO]: "Solo",
  [GameScreen.TEAM]: "Team",
  [GameScreen.TITAN]: "Titan",
};

function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>(
    GameScreen.MENU,
  );
  const { gameEngine, updateGameEngine } = useGameEngine();

  const handleNavigate = (screen: GameScreen) => setCurrentScreen(screen);

  const renderScreen = () => {
    switch (currentScreen) {
      case GameScreen.MENU:
        return <MainMenu onNavigate={handleNavigate} />;
      case GameScreen.COLLECTION:
        return (
          <CharacterCollection
            characters={gachaCharacters
              .filter((c) =>
                gameEngine.player.unlockedCharacters.includes(c.id),
              )
              .map((base) => ({
                ...base,
                ...generateBaseCharacterProgress(),
              }))}
            player={gameEngine.player}
            onBack={() => handleNavigate(GameScreen.MENU)}
          />
        );
      case GameScreen.SOLO:
        return <SoloMode onNavigate={() => handleNavigate(GameScreen.MENU)} />;
      case GameScreen.GACHA:
        return <Gacha onBack={() => handleNavigate(GameScreen.MENU)} />;
      case GameScreen.DUNGEON:
        return <DungeonMode onBack={() => handleNavigate(GameScreen.MENU)} />;
      case GameScreen.EQUIPMENT:
        return (
          <EquipmentManagementPage
            onBack={() => handleNavigate(GameScreen.MENU)}
          />
        );
      case GameScreen.TITAN:
        return <TitanMode onBack={() => handleNavigate(GameScreen.MENU)} />;
      case GameScreen.RAID:
        return <RaidMode onBack={() => handleNavigate(GameScreen.MENU)} />;
      default:
        return <MainMenu onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      <main className="App-main">
        <TopBar
          pageName={SCREEN_TO_PAGE_NAME[currentScreen]}
          onBack={() => handleNavigate(GameScreen.MENU)}
        />
        {renderScreen()}
      </main>
    </div>
  );
}

export default App;
