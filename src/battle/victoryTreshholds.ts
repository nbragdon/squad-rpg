import { Reward, RewardType } from "types/reward";
import { BattleState, DamageRecordType } from "./battleTypes";
import { Rarity, RARITY_ORDER } from "types/rarity";
import { InventoryType } from "types/inventory";

export type ThresholdType = DamageRecordType;

export type VictoryThreshold = {
  type: ThresholdType;
  amount: number;
  reward: Reward;
};

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
const BASE_DAMAGE_THRESHOLD = 1000;
const DAMAGE_THRESHOLD_MUTIPLIER = 1.5;
const LEVEL_DAMAGE_THRESHOLD_MULTIPLIER = 1.2;

export function generateTitanVictoryThresholds(rarity: Rarity, level: number) {
  const victoryThresholds: VictoryThreshold[] = [];
  const baseTicketReward =
    BASE_TICKET_REWARD + RARITY_ORDER.indexOf(rarity) + (level - 1);
  const baseDamageThreshold =
    BASE_DAMAGE_THRESHOLD * (RARITY_ORDER.indexOf(rarity) + 1);

  for (let i = 0; i < 5; i++) {
    victoryThresholds.push({
      type: DamageRecordType.ALL_DAMAGE,
      amount: Math.ceil(
        baseDamageThreshold *
          Math.pow(DAMAGE_THRESHOLD_MUTIPLIER, i) *
          Math.pow(LEVEL_DAMAGE_THRESHOLD_MULTIPLIER, level - 1),
      ),
      reward: {
        type: RewardType.item,
        item: {
          id: `ticket_${rarity}`,
          type: InventoryType.item,
          name: `${rarity} Ticket`,
          stackable: true,
          quantity: i === 0 ? baseTicketReward : 1,
          rarity: rarity,
        },
      },
    });
  }

  return victoryThresholds;
}
