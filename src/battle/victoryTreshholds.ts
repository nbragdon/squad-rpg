import { Reward, RewardType } from "types/reward";
import { BattleState, DamageRecordType } from "./battleTypes";
import { Rarity, RARITY_ORDER } from "types/rarity";
import { InventoryType, ItemType, RARITY_TO_TICKET_ID } from "types/inventory";

export type ThresholdType = DamageRecordType;

export type VictoryThreshold = {
  type: ThresholdType;
  amount: number;
  reward: Reward;
};

function snakeCaseToCapitalizedWords(snakeCaseString: string) {
  // 1. Replace underscores with spaces.
  const spacedString = snakeCaseString.replace(/_/g, " ");

  // 2. Split the string into words.
  const words = spacedString.split(" ");

  // 3. Capitalize the first letter of each word.
  const capitalizedWords = words.map((word) => {
    if (word.length === 0) {
      return ""; // Handle empty strings that might result from multiple underscores
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // 4. Join the capitalized words back together with spaces.
  return capitalizedWords.join(" ");
}

export const getCompletedThresholdRewards = (battleState: BattleState) => {
  const rewards: Reward[] = [];
  battleState.victoryThresholds?.forEach((victoryThreshold) => {
    if (
      victoryThreshold.type === DamageRecordType.ALL_DAMAGE &&
      victoryThreshold.amount <=
        battleState.battleRecords.damage[DamageRecordType.ALL_DAMAGE]
    ) {
      rewards.push(victoryThreshold.reward);
    }
    if (
      victoryThreshold.type === DamageRecordType.ABILITY_DAMAGE &&
      victoryThreshold.amount <=
        battleState.battleRecords.damage[DamageRecordType.ABILITY_DAMAGE]
    ) {
      rewards.push(victoryThreshold.reward);
    }
    if (
      victoryThreshold.type === DamageRecordType.BASIC_ATTACK &&
      victoryThreshold.amount <=
        battleState.battleRecords.damage[DamageRecordType.BASIC_ATTACK]
    ) {
      rewards.push(victoryThreshold.reward);
    }
    if (
      victoryThreshold.type === DamageRecordType.STATUS_EFFECT_DAMAGE &&
      victoryThreshold.amount <=
        battleState.battleRecords.damage[DamageRecordType.STATUS_EFFECT_DAMAGE]
    ) {
      rewards.push(victoryThreshold.reward);
    }
  });

  return rewards;
};

const BASE_TICKET_REWARD = 2;
const DAMAGE_THRESHOLDS = [1000, 2000, 4000, 6000, 9000];

export function generateTitanVictoryThresholds(rarity: Rarity) {
  const victoryThresholds: VictoryThreshold[] = [];

  for (let i = 0; i < 5; i++) {
    victoryThresholds.push({
      type: DamageRecordType.ALL_DAMAGE,
      amount: DAMAGE_THRESHOLDS[i],
      reward: {
        type: RewardType.item,
        item: {
          id: RARITY_TO_TICKET_ID[rarity],
          name: snakeCaseToCapitalizedWords(RARITY_TO_TICKET_ID[rarity]),
          quantity: i === 0 ? BASE_TICKET_REWARD : 1,
          rarity: rarity,
        },
      },
    });
  }

  return victoryThresholds;
}
