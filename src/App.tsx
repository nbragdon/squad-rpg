import { useState } from "react";
import "./App.css";
import CharacterCollection from "./components/CharacterCollection";
import DungeonMode from "./components/DungeonDisplay";
import Gacha from "./components/Gacha";
import MainMenu from "./components/MainMenu";
import SoloMode from "./components/SoloMode";
import { useGameEngine } from "./context/GameEngineContext";
import { gachaCharacters } from "./data/characters";

export enum GameScreen {
  SOLO = "solo",
  DUNGEON = "dungeon",
  RAID = "raid",
  MENU = "menu",
  COLLECTION = "collection",
  TEAM = "team",
  GACHA = "gacha",
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
                level: 1,
                xp: 0,
                xpToNextLevel: 100,
                shards: 0,
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
