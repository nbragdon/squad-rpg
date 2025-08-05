import { Rarity } from "./rarity";
import { ModifierType } from "./skillTypes";
import { StatType } from "./stats";

export enum InventoryType {
  equipment = "equipment",
  item = "item",
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
  value: number;
  modifierType: ModifierType;
  upgrades?: number[];
}

export interface EquipmentItem extends InventoryItem {
  equipmentType: EquipmentType;
  mainBoosts: EquipmentItemBoost[];
  subBoosts: EquipmentItemBoost[];
  level: number;
}

export interface EquippedItems {
  [EquipmentType.weapon]: string | undefined;
  [EquipmentType.armor]: string | undefined;
  [EquipmentType.trinket]: [string | undefined, string | undefined];
}

export interface Inventory {
  [InventoryType.equipment]: { [key: string]: InventoryItem };
  [InventoryType.item]: { [key: string]: InventoryItem };
}
