import { useState } from 'react';
import './App.css';
import BattleScreen from './components/BattleScreen';
import CharacterCollection from './components/CharacterCollection';
import Gacha from './components/Gacha';
import MainMenu from './components/MainMenu';
import SoloMode from './components/SoloMode';
import { useGameEngine } from './context/GameEngineContext';
import { gachaCharacters } from './data/characters';
import { PlayerCharacter } from './types/game';

export enum GameScreen {
    SOLO = 'solo',
    DUNGEON = 'dungeon',
    RAID = 'raid',
    MENU = 'menu',
    COLLECTION = 'collection',
    TEAM = 'team',
    BATTLE = 'battle',
    GACHA = 'gacha'
}

// Helper to convert CharacterBase to PlayerCharacter
function toPlayerCharacter(character: any): PlayerCharacter {
    return {
        ...character,
        level: character.level ?? 1,
        shards: character.shards ?? 0
    };
}

function App() {
    const [currentScreen, setCurrentScreen] = useState<GameScreen>(GameScreen.MENU);
    const { gameEngine, updateGameEngine } = useGameEngine();

    const handleNavigate = (screen: GameScreen) => setCurrentScreen(screen);

    const renderScreen = () => {
        switch (currentScreen) {
            case 'menu':
                return <MainMenu onNavigate={handleNavigate} playerProgress={gameEngine.player} />;
            case 'collection':
                return (
                    <CharacterCollection
                        characters={gachaCharacters.filter(c => gameEngine.player.unlockedCharacters.includes(c.id)).map(base => ({
                            ...base,
                            level: 1,
                            xp: 0,
                            xpToNextLevel: 100,
                            shards: 0
                        }))}
                        playerTeam={gameEngine.player.team}
                        player={gameEngine.player}
                        onBack={() => handleNavigate(GameScreen.MENU)}
                    />
                );
            case 'battle':
                return (
                    <BattleScreen
                        playerTeam={gameEngine.player.team}
                        onBack={() => handleNavigate(GameScreen.MENU)}
                    />
                );
            case 'solo':
                return <SoloMode onBack={() => handleNavigate(GameScreen.MENU)} />;
            case 'gacha':
                return <Gacha onBack={() => handleNavigate(GameScreen.MENU)} player={gameEngine.player} />;
            default:
                return <MainMenu onNavigate={handleNavigate} playerProgress={gameEngine.player} />;
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Squad RPG</h1>
            </header>
            <main className="App-main">
                {renderScreen()}
            </main>
        </div>
    );
}

export default App;
