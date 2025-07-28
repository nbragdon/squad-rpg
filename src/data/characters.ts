import { EquipmentType } from "types/inventory";
import { CharacterBase } from "../types/character";
import { commonCharacters } from "./characters/common-characters";
import { epicCharacters } from "./characters/epic-characters";
import { legendaryCharacters } from "./characters/legendary-characters";
import { rareCharacters } from "./characters/rare-characters";
import { uncommonCharacters } from "./characters/uncommon-characters";
import { CharacterProgress } from "types/game";

// Gacha pool: base character definitions
export const gachaCharacters: CharacterBase[] = [
  ...commonCharacters,
  ...uncommonCharacters,
  ...rareCharacters,
  ...epicCharacters,
  ...legendaryCharacters,
];

export function generateBaseCharacterProgress(): CharacterProgress {
  return {
    level: 1,
    xp: 0,
    shards: 0,
    equipedItems: {
      [EquipmentType.weapon]: undefined,
      [EquipmentType.armor]: undefined,
      [EquipmentType.trinket]: [undefined, undefined],
    },
  };
}
