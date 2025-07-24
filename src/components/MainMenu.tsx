import React from 'react';
import { GameScreen } from '../App';
// Ensure GameScreen is an enum or union type that includes 'solo', 'dungeon', 'raid', 'collection', 'gacha'
import { PlayerProgress } from '../types/game';
import './MainMenu.css';

interface MainMenuProps {
    onNavigate: (screen: GameScreen) => void;
    playerProgress: PlayerProgress;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNavigate, playerProgress }) => {
    return (
        <div className="main-menu">
            <div className="main-menu-header">
                <h1>Squad RPG</h1>
                <p className="main-menu-description">
                    Build your squad, collect legendary heroes, and conquer dungeons, raids, and solo challenges!
                </p>
            </div>
            <div className="main-menu-stats" style={{ background: '#223366', color: '#fff', borderRadius: '1rem', padding: '1.2rem', margin: '0 auto 2rem auto', maxWidth: 480, boxShadow: '0 2px 12px #0002' }}>
                <span style={{ marginRight: 32 }}>Level: <b>{playerProgress.level}</b></span>
                <span>Crystals: <b>{playerProgress.crystals}</b></span>
            </div>
            <button className="menu-button primary" onClick={() => onNavigate(GameScreen.SOLO)}>Solo</button>
            <button className="menu-button primary" onClick={() => onNavigate(GameScreen.DUNGEON)}>Dungeon</button>
            <button className="menu-button primary" onClick={() => onNavigate(GameScreen.RAID)}>Raid</button>
            <button className="menu-button primary" onClick={() => onNavigate(GameScreen.COLLECTION)}>Character Collection</button>
            <button className="menu-button green" onClick={() => onNavigate(GameScreen.GACHA)}>Gacha Summon</button>
        </div>
    );
};

export default MainMenu;
