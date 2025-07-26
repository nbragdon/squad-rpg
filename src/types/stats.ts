export enum StatType {
  health = "health",
  energy = "energy",
  energyGain = "energyGain",
  strength = "strength",
  defense = "defense",
  magic = "magic",
  magicDefense = "magicDefense",
  speed = "speed",
  critChance = "critChance",
  critDamage = "critDamage",
}

export interface AllStats {
  [StatType.health]: number;
  [StatType.energy]: number;
  [StatType.energyGain]: number;
  [StatType.strength]: number;
  [StatType.defense]: number;
  [StatType.magic]: number;
  [StatType.magicDefense]: number;
  [StatType.speed]: number;
  [StatType.critChance]: number;
  [StatType.critDamage]: number;
}
