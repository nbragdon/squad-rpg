import { useState } from 'react';
import './App.css';
import BattleScreen from './components/BattleScreen';
import CharacterCollection from './components/CharacterCollection';
import Gacha from './components/Gacha';
import MainMenu from './components/MainMenu';
import SoloMode from './components/SoloMode';
import TeamBuilder from './components/TeamBuilder';
import { useGame } from './context/GameContext';
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
    const { playerTeam, setPlayerTeam, playerProgress, setPlayerProgress, battleState, setBattleState } = useGame();

    const handleAddToTeam = (character: any) => {
        if (playerTeam.characters.length < playerTeam.maxSize && !playerTeam.characters.some(c => c.id === character.id)) {
            const newTeam = {
                ...playerTeam,
                characters: [...playerTeam.characters, { ...character, level: 1, shards: 0 }]
            };
            setPlayerTeam(newTeam);
        }
    };

    const handleRemoveFromTeam = (characterId: string) => {
        const newTeam = {
            ...playerTeam,
            characters: playerTeam.characters.filter((char: any) => char.id !== characterId)
        };
        setPlayerTeam(newTeam);
    };

    const handleNavigate = (screen: GameScreen) => setCurrentScreen(screen);

    const renderScreen = () => {
        switch (currentScreen) {
            case 'menu':
                return <MainMenu onNavigate={handleNavigate} playerProgress={playerProgress} />;
            case 'collection':
                return (
                    <CharacterCollection
                        characters={gachaCharacters
                            .filter(c => playerProgress.unlockedCharacters.includes(c.id))
                            .map(toPlayerCharacter)}
                        onAddToTeam={handleAddToTeam}
                        onRemoveFromTeam={handleRemoveFromTeam}
                        onBack={() => setCurrentScreen(GameScreen.MENU)}
                        playerTeam={playerTeam}
                    />
                );
            case 'team':
                return (
                    <TeamBuilder
                        team={playerTeam}
                        availableCharacters={gachaCharacters.map(toPlayerCharacter)}
                        onAddCharacter={handleAddToTeam}
                        onRemoveCharacter={handleRemoveFromTeam}
                        onBack={() => setCurrentScreen(GameScreen.MENU)}
                        onStartBattle={() => setCurrentScreen(GameScreen.BATTLE)}
                    />
                );
            case 'battle':
                return (
                    <BattleScreen
                        playerTeam={playerTeam}
                        onBack={() => setCurrentScreen(GameScreen.MENU)}
                    />
                );
            case 'gacha':
                return <Gacha onBack={() => setCurrentScreen(GameScreen.MENU)} />;
            case 'solo':
                return <SoloMode onBack={() => setCurrentScreen(GameScreen.MENU)} />;
            default:
                return <MainMenu onNavigate={handleNavigate} playerProgress={playerProgress} />;
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
