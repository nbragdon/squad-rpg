import { CharacterBase } from "../types/character";
import { commonCharacters } from "./characters/common-characters";
import { epicCharacters } from "./characters/epic-characters";
import { legendaryCharacters } from "./characters/legendary-characters";
import { rareCharacters } from "./characters/rare-characters";
import { uncommonCharacters } from "./characters/uncommon-characters";

// Gacha pool: base character definitions
export const gachaCharacters: CharacterBase[] = [
  ...commonCharacters,
  ...uncommonCharacters,
  ...rareCharacters,
  ...epicCharacters,
  ...legendaryCharacters,
];
