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

export enum GameScreen {
  SOLO = "solo",
  DUNGEON = "dungeon",
  RAID = "raid",
  MENU = "menu",
  COLLECTION = "collection",
  TEAM = "team",
  GACHA = "gacha",
  EQUIPMENT = "equipment",
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>(
    GameScreen.MENU,
  );
  const { gameEngine, updateGameEngine } = useGameEngine();

  const handleNavigate = (screen: GameScreen) => setCurrentScreen(screen);

  const renderScreen = () => {
    switch (currentScreen) {
      case "menu":
        return <MainMenu onNavigate={handleNavigate} />;
      case "collection":
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
      case "solo":
        return <SoloMode onNavigate={() => handleNavigate(GameScreen.MENU)} />;
      case "gacha":
        return <Gacha onBack={() => handleNavigate(GameScreen.MENU)} />;
      case "dungeon":
        return <DungeonMode onBack={() => handleNavigate(GameScreen.MENU)} />;
      case "equipment":
        return (
          <EquipmentManagementPage
            onBack={() => handleNavigate(GameScreen.MENU)}
          />
        );
      default:
        return <MainMenu onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      <main className="App-main">{renderScreen()}</main>
    </div>
  );
}

export default App;
