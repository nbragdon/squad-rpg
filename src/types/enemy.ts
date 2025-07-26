import { AffinityType } from "./affinity";
import { Rarity } from "./rarity";
import type { Skill } from "./skillTypes";
import { AllStats } from "./stats";

export interface EnemyCharacter {
  id: string;
  name: string;
  rarity: Rarity;
  stats: AllStats;
  skills: Skill[];
  weakAffinities: AffinityType[];
  strongAffinities: AffinityType[];
}
