import { PlayerCharacter } from "types/character";
import { GameEngine } from "../../engine/GameEngine";
import { gachaCharacters, generateBaseCharacterProgress } from "../characters";
import { getXpToNextLevel } from "../leveling";

export function getOwnedCharacters(gameEngine: GameEngine) {
  return gachaCharacters
    .filter(
      (c) =>
        gameEngine.player.unlockedCharacters &&
        gameEngine.player.unlockedCharacters.includes(c.id),
    )
    .map((base) => {
      const progress = gameEngine.player.characterProgress?.[base.id];
      return {
        ...base,
        level: progress?.level || 1,
        xp: progress?.xp || 0,
        xpToNextLevel: getXpToNextLevel(progress?.level || 1),
        shards: progress?.shards || 0,
        equipedItems:
          progress?.equipedItems ||
          generateBaseCharacterProgress().equipedItems,
      };
    });
}
