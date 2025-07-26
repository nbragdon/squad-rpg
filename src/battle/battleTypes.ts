import { EnemyCharacter } from '../types/enemy';
import { PlayerCharacter, Team } from '../types/game';

export type BattleParticipant = PlayerCharacter | EnemyCharacter;

export interface BattleInitEnemy {
    id: EnemyCharacter;
    level: number;
}

export interface BattleInitOptions {
    playerCharacters: PlayerCharacter[];
    enemies: BattleInitEnemy[];
}

export type BattlePhase = 'setup' | 'combat' | 'victory' | 'defeat';

export interface BattleState {
    playerTeam: Team;
    enemyTeam: Team;
    turnOrder: string[];
    currentCharacterId: string | null;
    currentTurn: 'player' | 'enemy';
    battlePhase: BattlePhase;
    turnCount: number;
    battleLog: string[];
    xpLogs?: string[];
}
