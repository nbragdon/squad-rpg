import { EquipmentItem, EquipmentType } from "./inventory";
import { Rarity } from "./rarity";

export enum RewardType {
  exp = "exp",
  equipment = "equipment",
  crystal = "crystal",
  coins = "coins",
}

export interface Reward {
  type: RewardType;
  multiplier?: number;
  equipmentType?: EquipmentType;
  rarity?: Rarity;
  amount?: number;
  equipment?: EquipmentItem;
}

export interface ExpReward extends Reward {
  type: RewardType.exp;
  multiplier?: number;
}

export interface EquipmentReward extends Reward {
  type: RewardType.equipment;
  equipmentType: EquipmentType;
  rarity: Rarity;
  equipment?: EquipmentItem;
}

export interface CrystalReward extends Reward {
  type: RewardType.crystal;
  amount: number;
}

export interface CoinsReward extends Reward {
  type: RewardType.coins;
  amount: number;
}
