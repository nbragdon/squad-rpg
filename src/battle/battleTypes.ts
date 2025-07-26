import { AffinityType } from "../types/affinity";
import { PlayerCharacter } from "../types/character";
import { EnemyCharacter } from "../types/enemy";
import { Rarity } from "../types/rarity";
import { AdjustStatSkillEffect, Skill } from "../types/skillTypes";
import { AllStats } from "../types/stats";
import { StatusEffectType } from "../types/statusEffects";

export type BattleParticipant = PlayerCharacter | EnemyCharacter;

export interface BattleCharacter {
  id: string;
  name: string;
  damage: number;
  stats: AllStats;
  rarity: Rarity;
  level: number;
  shards: number;
  isAlive: boolean;
  skills: Skill[];
  statusEffects: {
    [key in StatusEffectType]?: {
      type: StatusEffectType;
      duration: number;
      value: number;
    };
  };
  statAdjustments: AdjustStatSkillEffect[];
  weakAffinities: AffinityType[];
  strongAffinities: AffinityType[];
  equipment?: {};
}

export interface BattleInitEnemy {
  id: EnemyCharacter;
  level: number;
}

export interface BattleInitOptions {
  playerCharacters: PlayerCharacter[];
  enemies: BattleInitEnemy[];
}

export type BattlePhase = "setup" | "combat" | "victory" | "defeat";

export interface BattleState {
  playerTeam: BattleCharacter[];
  enemyTeam: BattleCharacter[];
  activatedCharactersThisRound: string[];
  battlePhase: BattlePhase;
  turnCount: number;
  battleLog: string[];
  xpLogs?: string[];
}
