import { Rarity } from "./rarity";
import { ModifierType } from "./skillTypes";
import { StatType } from "./stats";

export enum InventoryType {
  equipment = "equipment",
}

export enum EquipmentType {
  weapon = "weapon",
  armor = "armor",
  trinket = "trinket",
}
export interface InventoryItem {
  id: string;
  type: InventoryType;
  name: string;
  stackable: boolean;
  quantity: number;
  rarity: Rarity;
}

export interface EquipmentItemBoost {
  statType: StatType;
  level: number;
  value: number;
  modifierType: ModifierType;
}

export interface EquipmentItem extends InventoryItem {
  equipmentType: EquipmentType;
  mainBoosts: EquipmentItemBoost[];
  subBoosts: EquipmentItemBoost[];
  level: number;
}

export interface Inventory {
  [InventoryType.equipment]: { [key: string]: InventoryItem };
}
