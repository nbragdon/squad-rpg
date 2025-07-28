import { EquipmentItem } from "types/inventory";
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
      stackable: boolean;
    };
  };
  statAdjustments: AdjustStatSkillEffect[];
  weakAffinities: AffinityType[];
  strongAffinities: AffinityType[];
  isPlayer: boolean;
  equipment: EquipmentItem[];
}

export interface BattleInitEnemy {
  id: EnemyCharacter;
  level: number;
}

export interface BattleInitOptions {
  playerCharacters: PlayerCharacter[];
  enemies: BattleInitEnemy[];
  inventory: { [key in string]: EquipmentItem };
}

export type BattlePhase = "setup" | "combat" | "victory" | "defeat";

export interface BattleState {
  playerTeam: BattleCharacter[];
  enemyTeam: BattleCharacter[];
  activatedCharactersThisRound: string[];
  battlePhase: BattlePhase;
  turnCount: number;
  battleLog: string[];
  skillCooldowns: { [characterId: string]: { [skillId: string]: number } };
  xpLogs?: string[];
}
