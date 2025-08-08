export enum StatusEffectType {
  burn = "burn",
  brittle = "brittle",
  poison = "poison",
  shock = "shock",
  bleed = "bleed",
  stun = "stun",
  silence = "silence",
  taunt = "taunt",
  shield = "shield",
  haste = "haste",
  slow = "slow",
  confusion = "confusion",
  disarm = "disarm",
  coins = "coins",
}

export const CLEANSABLE_STATUS_EFFECTS = [
  StatusEffectType.burn,
  StatusEffectType.brittle,
  StatusEffectType.poison,
  StatusEffectType.shock,
  StatusEffectType.bleed,
  StatusEffectType.stun,
  StatusEffectType.silence,
  StatusEffectType.slow,
  StatusEffectType.confusion,
  StatusEffectType.disarm,
];
