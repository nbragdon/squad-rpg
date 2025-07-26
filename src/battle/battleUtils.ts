import { PlayerCharacter } from "../types/character";
import { EnemyCharacter } from "../types/enemy";
import { BattleCharacter } from "./battleTypes";

export function isPlayerCharacter(
  char: PlayerCharacter | BattleCharacter | EnemyCharacter,
): char is PlayerCharacter | BattleCharacter {
  return (char as PlayerCharacter).xp !== undefined;
}

export function isEnemyCharacter(
  char: PlayerCharacter | BattleCharacter | EnemyCharacter,
): char is EnemyCharacter {
  // Remove invalid property checks, just check for skills and lack of xp
  return (
    (char as EnemyCharacter).skills !== undefined &&
    (char as any).xp === undefined
  );
}
