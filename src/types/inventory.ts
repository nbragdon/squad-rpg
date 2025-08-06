import { Rarity } from "./rarity";
import { ModifierType } from "./skillTypes";
import { StatType } from "./stats";

export enum InventoryType {
  equipment = "equipment",
  item = "item",
}

export enum ItemType {
  common_ticket = "common_ticket",
  uncommon_ticket = "uncommon_ticket",
  rare_ticket = "rare_ticket",
  epic_ticket = "epic_ticket",
  legendary_ticket = "legendary_ticket",
}

export enum EquipmentType {
  weapon = "weapon",
  armor = "armor",
  trinket = "trinket",
}
export interface InventoryItem {
  id: ItemType;
  name: string;
  quantity: number;
  rarity: Rarity;
}

export interface EquipmentItemBoost {
  statType: StatType;
  value: number;
  modifierType: ModifierType;
  upgrades?: number[];
}

export interface EquipmentItem {
  id: string;
  name: string;
  rarity: Rarity;
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

export const RARITY_TO_TICKET_ID = {
  [Rarity.COMMON]: ItemType.common_ticket,
  [Rarity.UNCOMMON]: ItemType.uncommon_ticket,
  [Rarity.RARE]: ItemType.rare_ticket,
  [Rarity.EPIC]: ItemType.epic_ticket,
  [Rarity.LEGENDARY]: ItemType.legendary_ticket,
};
