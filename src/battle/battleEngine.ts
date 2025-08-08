import { calculateDamage, getInBattleStat } from "data/statUtils";
import { PlayerCharacter } from "../types/character";
import { EnemyCharacter } from "../types/enemy";
import {
  AdjustmentDirection,
  AdjustStatSkillEffect,
  ApplyStatusEffectSkillEffect,
  CleansableEffect,
  CleanseSkillEffect,
  DamageSkillEffect,
  HealSkillEffect,
  ModifierType,
  SkillEffectType,
  TargetType,
} from "../types/skillTypes";
import { StatType } from "../types/stats";
import {
  CLEANSABLE_STATUS_EFFECTS,
  StatusEffectType,
} from "../types/statusEffects";
import {
  BattleCharacter,
  BattleInitOptions,
  BattleState,
  DamageRecordType,
} from "./battleTypes";
import {
  getCalculatedStats,
  getStackableStatusEffectReductionAmount,
  getStatusEffectValue,
} from "./battleUtils";
import { getAllEquipment } from "data/inventory/equipmentUtil";
import { EquipmentItem } from "types/inventory";
import { getCompletedThresholdRewards } from "./victoryTreshholds";

export type InBattleStatAdjustment = {
  stat: StatType;
  amount: number;
  duration: number;
};

function playerCharacterToBattle(
  char: PlayerCharacter,
  inventory: { [key in string]: EquipmentItem },
): BattleCharacter {
  const playerBattleChar = {
    ...char,
    isAlive: true,
    statusEffects: {},
    statAdjustments: [],
    damage: 0,
    isPlayer: true,
    equipment: getAllEquipment(char.equipedItems, inventory),
  };

  return {
    ...playerBattleChar,
    stats: {
      ...getCalculatedStats(playerBattleChar),
    },
  };
}

function enemyCharacterToBattle(
  enemy: EnemyCharacter,
  level: number,
): BattleCharacter {
  const enemyBattleChar = {
    ...enemy,
    id: crypto.randomUUID(), // generate random unique id
    stats: {
      ...enemy.stats,
    },
    isAlive: true,
    level: level,
    shards: 0,
    statusEffects: {},
    statAdjustments: [],
    damage: 0,
    isPlayer: false,
    equipment: [],
  };

  return {
    ...enemyBattleChar,
    stats: {
      ...getCalculatedStats(enemyBattleChar),
    },
  };
}

function targetHasTaunt(enemies: BattleCharacter[]): string | undefined {
  let targetId;
  enemies.forEach((enemy) => {
    const tauntDuration = enemy.statusEffects[StatusEffectType.taunt]?.duration;
    if (tauntDuration && enemy.isAlive) {
      targetId = enemy.id;
      return targetId;
    }
  });

  return targetId;
}

function attackerHasConfusion(attacker: BattleCharacter) {
  return (
    (attacker.statusEffects[StatusEffectType.confusion]?.duration || 0) > 0
  );
}

function affectedBySlow(attacker: BattleCharacter) {
  const slowChance = attacker.statusEffects[StatusEffectType.slow]?.value || 0;
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  if (slowChance >= randomNumber) return true;
  return false;
}

function affectedByHaste(attacker: BattleCharacter) {
  const hasteChance =
    attacker.statusEffects[StatusEffectType.haste]?.value || 0;
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  if (hasteChance >= randomNumber) return true;
  return false;
}

/**
 * Determines the ID(s) of the target(s) based on the skill's TargetType.
 * Filters out characters that are not alive.
 * @param targetType The TargetType criteria for selecting targets.
 * @param casterId The ID of the character casting the skill (for TargetType.self).
 * @param allies An array of BattleCharacter objects representing allies.
 * @param enemies An array of BattleCharacter objects representing enemies.
 * @returns A string (for single target), an array of strings (for multiple targets), or null if no valid target is found.
 */
export function getTargetId(
  targetType: TargetType,
  caster: BattleCharacter,
  allies: BattleCharacter[],
  enemies: BattleCharacter[],
): string[] {
  // Filter out non-alive characters for all target types except 'self'
  let aliveAllies = allies.filter((char) => char.isAlive);
  let aliveEnemies = enemies.filter((char) => char.isAlive);

  if (attackerHasConfusion(caster)) {
    aliveAllies = [...aliveAllies, ...aliveEnemies];
    aliveEnemies = [...aliveAllies, ...aliveEnemies];
  }

  switch (targetType) {
    case TargetType.self:
      // For 'self', the caster's ID is the target
      return [caster.id];

    case TargetType.randomAlly:
      if (aliveAllies.length > 0) {
        const randomIndex = Math.floor(Math.random() * aliveAllies.length);
        return [aliveAllies[randomIndex].id];
      }
      return [];

    case TargetType.allAllies:
      // Return IDs of all alive allies
      return aliveAllies.map((char) => char.id);

    case TargetType.randomEnemy:
      if (aliveEnemies.length > 0) {
        const tauntingEnemy = targetHasTaunt(aliveEnemies);
        if (tauntingEnemy) return [tauntingEnemy];
        const randomIndex = Math.floor(Math.random() * aliveEnemies.length);
        return [aliveEnemies[randomIndex].id];
      }
      return [];

    case TargetType.allEnemies:
      // Return IDs of all alive enemies
      return aliveEnemies.map((char) => char.id);

    case TargetType.lowestHealthAlly:
      if (aliveAllies.length > 0) {
        // Find the ally with the lowest current health
        const lowestHealthAlly = aliveAllies.reduce((prev, current) =>
          prev.damage > current.damage ? prev : current,
        );
        return [lowestHealthAlly.id];
      }
      return [];

    case TargetType.lowestHealthEnemy:
      if (aliveEnemies.length > 0) {
        // Find the enemy with the lowest current health
        const lowestHealthEnemy = aliveEnemies.reduce((prev, current) =>
          prev.damage > current.damage ? prev : current,
        );
        return [lowestHealthEnemy.id];
      }
      return [];

    default:
      return []; // Should not happen if all TargetTypes are handled
  }
}

export class BattleEngine {
  private state: BattleState;

  constructor(options: BattleInitOptions | { state: BattleState }) {
    if ("state" in options) {
      this.state = options.state;
      return;
    }
    // Generate player team
    const playerTeam = options.playerCharacters.map((c) =>
      playerCharacterToBattle(c, options.inventory),
    );
    // Generate enemy team
    const enemyTeam = options.enemies.map((e) => {
      const base = e.id;
      // Defensive: if not found, skip
      if (!base) throw new Error(`Enemy not found: ${e.id}`);
      return enemyCharacterToBattle(base, e.level);
    });

    this.state = {
      playerTeam: playerTeam,
      enemyTeam: enemyTeam,
      activatedCharactersThisRound: [],
      battlePhase: "combat",
      turnCount: 1,
      round: 1,
      maxRounds: options.maxRounds || 100,
      victoryThresholds: options.victoryThresholds || [],
      battleRecords: {
        damage: {
          [DamageRecordType.BASIC_ATTACK]: 0,
          [DamageRecordType.STATUS_EFFECT_DAMAGE]: 0,
          [DamageRecordType.ALL_DAMAGE]: 0,
          [DamageRecordType.ABILITY_DAMAGE]: 0,
        },
      },
      battleLog: ["Battle begins!"],
      skillCooldowns: {},
      xpLogs: [],
    };
    const curentTurnCharacter = this.getCurrentTurnCharacter();
    if (curentTurnCharacter && !curentTurnCharacter.isPlayer) {
      this.processEnemyTurn();
    }
  }

  getNewInstance() {
    return new BattleEngine({ state: this.state });
  }

  getState(): BattleState {
    // Return a shallow copy to trigger React updates
    return { ...this.state };
  }

  /**
   * Determines the ID of the next character to take a turn in battle.
   * It considers character speed and who has already acted this round.
   * This function re-sorts eligible characters by speed on each call
   * to account for dynamic speed changes during a round.
   *
   * @param allCharacters An array of all BattleCharacter objects in the battle (both alive and dead).
   * @param charactersAlreadyActedThisRound An array of IDs of characters who have already completed their turn(s) this round.
   * @returns The ID of the next character to take a turn, or null if no one can act (e.g., all characters are dead or have acted).
   */
  getCurrentTurnCharacter(): BattleCharacter | undefined {
    const playerAlive = this.state.playerTeam.filter((c) => c.isAlive);
    const enemyAlive = this.state.enemyTeam.filter((c) => c.isAlive);
    // 1. Filter for alive characters
    const aliveCharacters = [...playerAlive, ...enemyAlive];

    if (aliveCharacters.length === 0) {
      return undefined; // No one alive to take a turn
    }

    // 2. Filter for characters who have not yet acted this round
    const eligibleCharacters = aliveCharacters.filter(
      (char) => !this.state.activatedCharactersThisRound.includes(char.id),
    );

    if (eligibleCharacters.length === 0) {
      return undefined; // All alive characters have acted this round
    }

    const sortedEligibleCharacters = eligibleCharacters.sort((a, b) => {
      const speedA = getInBattleStat(StatType.speed, a);
      const speedB = getInBattleStat(StatType.speed, b);

      if (speedA !== speedB) {
        return speedB - speedA; // Higher speed acts first
      }

      // Tie-breaker: Player characters before Enemy characters
      if (a.isPlayer && !b.isPlayer) return -1;
      if (!a.isPlayer && b.isPlayer) return 1;

      return 0; // Maintain original relative order for true ties
    });

    // 4. Return the ID of the character with the highest speed among those who haven't acted
    return sortedEligibleCharacters[0];
  }

  getCharacter(id: string): BattleCharacter | undefined {
    const allChars = [...this.state.playerTeam, ...this.state.enemyTeam];
    const attacker = allChars.find((c) => c.id === id);
    return attacker;
  }

  recordDamage(amount: number, type: DamageRecordType) {
    this.state.battleRecords.damage[type] += amount;
    if (type !== DamageRecordType.ALL_DAMAGE) {
      this.state.battleRecords.damage[DamageRecordType.ALL_DAMAGE] += amount;
    }
  }

  private checkBattleEnd() {
    const playerAlive = this.state.playerTeam.some((c) => c.isAlive);
    const enemyAlive = this.state.enemyTeam.some((c) => c.isAlive);
    if (!playerAlive && this.state.battlePhase !== "defeat") {
      this.state.battlePhase = "defeat";
      this.state.battleLog.push("Defeat! Your team has been defeated.");
      return true;
    }
    if (!enemyAlive && this.state.battlePhase !== "victory") {
      this.state.battlePhase = "victory";
      this.state.battleLog.push("Victory! You have defeated the enemy team!");
      return true;
    }
    if (this.state.round >= this.state.maxRounds) {
      if (getCompletedThresholdRewards(this.getState()).length > 0) {
        this.state.battlePhase = "victory";
        this.state.battleLog.push(
          `Victory! You delt a total of ${this.state.battleRecords.damage[DamageRecordType.ALL_DAMAGE]} damage.`,
        );
      } else {
        this.state.battlePhase = "defeat";
        this.state.battleLog.push(
          "Defeat! You did not do enough damage to pass the thresholds.",
        );
      }
      return true;
    }

    return false;
  }

  applyDamageToShield(target: BattleCharacter, damage: number) {
    let leftoverDamage = damage;
    const shieldAmount = target.statusEffects[StatusEffectType.shield]?.value;
    if (target.statusEffects[StatusEffectType.shield] && shieldAmount) {
      if (shieldAmount >= damage) {
        target.statusEffects[StatusEffectType.shield].value =
          shieldAmount - damage;
        leftoverDamage = 0;
      } else {
        target.statusEffects[StatusEffectType.shield].value = 0;
        leftoverDamage = damage - shieldAmount;
      }
    }

    return leftoverDamage;
  }

  attack(attackerId: string) {
    const allChars = [...this.state.playerTeam, ...this.state.enemyTeam];
    const attacker = allChars.find((c) => c.id === attackerId);
    if (!attacker) return;
    const attackerIsPlayer = this.state.playerTeam.some(
      (c) => c.id === attackerId,
    );
    const targetId = getTargetId(
      TargetType.randomEnemy,
      attacker,
      attackerIsPlayer ? this.state.playerTeam : this.state.enemyTeam,
      attackerIsPlayer ? this.state.enemyTeam : this.state.playerTeam,
    );
    const target = allChars.find((c) => targetId.includes(c.id));
    if (
      attacker &&
      target &&
      attacker.isAlive &&
      target.isAlive &&
      this.canAttack(attackerId)
    ) {
      // Calculate damage
      let dmg = calculateDamage(
        attacker,
        target,
        StatType.strength,
        StatType.defense,
        attacker.strongAffinities,
        this.state.battleLog,
      );
      // Apply damage
      target.damage += this.applyDamageToShield(target, dmg);
      const targetHealth = getInBattleStat(StatType.health, target);
      if (target.damage >= targetHealth) target.isAlive = false;
      this.state.battleLog.push(
        `${attacker.name} attacks ${target.name} for ${dmg} damage!`,
      );
      if (!target.isPlayer)
        this.recordDamage(dmg, DamageRecordType.BASIC_ATTACK);
      if (!target.isAlive) {
        this.state.battleLog.push(`${target.name} is defeated!`);
      }
    }
  }

  getSkillCooldown(attackerId: string, skillId: string) {
    if (
      this.state.skillCooldowns[attackerId] &&
      this.state.skillCooldowns[attackerId][skillId]
    ) {
      return this.state.skillCooldowns[attackerId][skillId];
    }
    return 0;
  }

  setSkillCooldown(attackerId: string, skillId: string, cooldown: number) {
    if (!this.state.skillCooldowns[attackerId]) {
      this.state.skillCooldowns[attackerId] = {};
    }
    this.state.skillCooldowns[attackerId][skillId] = cooldown;
  }

  canAttack(attackerId: string) {
    const attacker = this.getCharacter(attackerId);
    if (!attacker || !attacker.isAlive) return false;
    const stunValue =
      attacker.statusEffects?.[StatusEffectType.stun]?.value || 0;
    if (stunValue > 0) return false;
    if (attacker.statusEffects?.[StatusEffectType.disarm]?.value || 0 > 0)
      return false;
    return true;
  }

  cleanseStatusEffects(target: BattleCharacter, amount: number | "all") {
    let effectsToCleanse = Object.values(target.statusEffects)
      .filter((statusEffect) =>
        CLEANSABLE_STATUS_EFFECTS.includes(statusEffect.type),
      )
      .map((statusEffect) => statusEffect.type);
    let cleanseCount = amount === "all" ? effectsToCleanse.length : amount;
    while (effectsToCleanse.length > 0 && cleanseCount > 0) {
      const randomIndex = Math.floor(Math.random() * effectsToCleanse.length);
      const randomStatus = effectsToCleanse[randomIndex];
      delete target.statusEffects[randomStatus];
      cleanseCount--;
      effectsToCleanse.splice(randomIndex, 1);
      this.state.battleLog.push(`${randomStatus} cleansed from ${target.name}`);
    }
  }

  cleanseAdjustedStats(target: BattleCharacter, amount: number | "all") {
    let effectsToCleanse = target.statAdjustments.filter(
      (statAdjustment) => statAdjustment.amount < 0,
    );
    let cleanseCount = amount === "all" ? effectsToCleanse.length : amount;
    while (effectsToCleanse.length > 0 && cleanseCount > 0) {
      const randomIndex = Math.floor(Math.random() * effectsToCleanse.length);
      const adjustmentToCleanse = effectsToCleanse[randomIndex];
      const targetAdjustmentIndex =
        target.statAdjustments.indexOf(adjustmentToCleanse);
      target.statAdjustments.splice(targetAdjustmentIndex, 1);
      effectsToCleanse.splice(randomIndex, 1);
      cleanseCount--;
      this.state.battleLog.push(
        `${adjustmentToCleanse.stat} debuff cleansed from ${target.name}`,
      );
    }
  }

  canUseSkill(skillId: string, attackerId: string) {
    const attacker = this.getCharacter(attackerId);
    if (!attacker || !attacker.isAlive) return false;
    const skill = (attacker.skills || []).find((s) => s.id === skillId);
    if (!skill) return false;
    // if skill on cooldown then return false
    if (this.getSkillCooldown(attackerId, skillId) > 0) return false;
    if (attacker.statusEffects?.[StatusEffectType.stun]?.value || 0 > 0)
      return false;
    if (attacker.statusEffects?.[StatusEffectType.silence]?.value || 0 > 0)
      return false;
    return skill.cost < attacker.stats[skill.costStat || StatType.energy];
  }

  useSkill(skillId: string, attackerId: string) {
    const allChars = [...this.state.playerTeam, ...this.state.enemyTeam];
    const attacker = this.getCharacter(attackerId);
    if (!attacker || !attacker.isAlive) return;
    const skill = (attacker.skills || []).find((s) => s.id === skillId);
    if (!skill) return;
    if (this.canUseSkill(skillId, attackerId)) {
      const attackerIsPlayer = attacker.isPlayer;
      let randomTargets: string[] | undefined = undefined;
      skill.effects.forEach((effect) => {
        let targets = getTargetId(
          effect.targetType,
          attacker,
          attackerIsPlayer ? this.state.playerTeam : this.state.enemyTeam,
          attackerIsPlayer ? this.state.enemyTeam : this.state.playerTeam,
        );
        if (effect.targetType === TargetType.randomEnemy) {
          if (!randomTargets) {
            randomTargets = targets;
          } else {
            targets = randomTargets;
          }
        }
        targets.forEach((targetId) => {
          const target = allChars.find((c) => c.id === targetId);
          if (!target || !target.isAlive) return;

          // Handle damage effects
          if (effect.type === SkillEffectType.damage) {
            const damageEffect = effect as DamageSkillEffect;
            let dmg = calculateDamage(
              attacker,
              target,
              damageEffect.damageStat,
              damageEffect.defenseStat,
              effect.affinities,
              this.state.battleLog,
            );
            dmg *= damageEffect.damageMultiplier || 1;
            dmg = Math.floor(dmg);
            target.damage += this.applyDamageToShield(target, dmg);
            const targetHealth = getInBattleStat(StatType.health, target);
            if (target.damage >= targetHealth) target.isAlive = false;
            this.state.battleLog.push(
              `${attacker.name} uses ${skill.name} on ${target.name} for ${dmg} damage!`,
            );
            if (!target.isPlayer)
              this.recordDamage(dmg, DamageRecordType.ABILITY_DAMAGE);
            if (!target.isAlive) {
              this.state.battleLog.push(`${target.name} is defeated!`);
            }
          }

          // Handle status effects
          if (effect.type === SkillEffectType.applyStatusEffect) {
            const applyStatusEffect = effect as ApplyStatusEffectSkillEffect;
            target.statusEffects[applyStatusEffect.statusEffectType] = {
              type: applyStatusEffect.statusEffectType,
              duration: applyStatusEffect.duration || 0,
              value: getStatusEffectValue(attacker, applyStatusEffect),
              stackable: applyStatusEffect.stackable || false,
            };
            this.state.battleLog.push(
              `${target.name} is affected by ${applyStatusEffect.statusEffectType}!`,
            );
          }
          // Handle healing effects
          if (effect.type === SkillEffectType.heal) {
            const healEffect = effect as HealSkillEffect;
            const healAmount = Math.floor(
              (attacker.stats[healEffect.healStat] || 0) *
                healEffect.healMultiplier,
            );
            if (
              target.statusEffects?.[StatusEffectType.bleed]?.value ||
              0 > 0
            ) {
              delete target.statusEffects[StatusEffectType.bleed];
              this.state.battleLog.push(
                `Bleed prevents heal on ${attacker.name} and is removed!`,
              );
            } else {
              target.damage = Math.max(
                target.damage - healAmount,
                0, // Max health
              );
              this.state.battleLog.push(
                `${attacker.name} heals ${target.name} for ${healAmount} health!`,
              );
            }
          }
          // Handle stat adjustments
          if (effect.type === SkillEffectType.adjustStat) {
            const adjustEffect = effect as AdjustStatSkillEffect;
            let currentStat = target.stats[adjustEffect.stat] || 0;
            if (adjustEffect.userStat) {
              currentStat = attacker.stats[adjustEffect.userStat] || 0;
            }
            const positiveOrNegative =
              adjustEffect.direction === AdjustmentDirection.increase ? 1 : -1;
            const flatValue = Math.round(
              currentStat * (1 + adjustEffect.modifierValue * 0.01),
            );

            this.state.battleLog.push(
              `${target.name}'s ${adjustEffect.stat} ${adjustEffect.direction}d by ${flatValue}!`,
            );
            target.statAdjustments.push({
              stat: adjustEffect.stat,
              amount: flatValue * positiveOrNegative,
              duration: adjustEffect.duration,
            } as InBattleStatAdjustment);
          }

          // Handle cleanse effects
          if (effect.type === SkillEffectType.cleanse) {
            const cleanseEffect = effect as CleanseSkillEffect;
            if (
              cleanseEffect.cleansableEffect === CleansableEffect.statusEffect
            ) {
              this.cleanseStatusEffects(target, cleanseEffect.count);
            } else if (
              cleanseEffect.cleansableEffect === CleansableEffect.adjustedStat
            ) {
              this.cleanseAdjustedStats(target, cleanseEffect.count);
            } else {
              if (cleanseEffect.count === "all") {
                this.cleanseStatusEffects(target, cleanseEffect.count);
                this.cleanseAdjustedStats(target, cleanseEffect.count);
              } else {
                let cleanseCount = cleanseEffect.count;
                while (cleanseCount > 0) {
                  const randomType = Math.floor(Math.random() * 2) + 1;
                  if (
                    randomType === 1 &&
                    Object.keys(target.statusEffects).length > 0
                  ) {
                    this.cleanseStatusEffects(target, 1);
                  } else if (target.statAdjustments.length > 0) {
                    this.cleanseAdjustedStats(target, 1);
                  }
                  cleanseCount--;
                }
              }
            }
          }
        });
      });

      // Subtract skill cost
      attacker.stats[skill.costStat] = Math.max(
        (attacker.stats[skill.costStat] || 0) - skill.cost,
        0,
      );

      if (skill.cooldownTurns) {
        this.setSkillCooldown(attackerId, skillId, skill.cooldownTurns + 1);
        this.state.battleLog.push(
          `${attacker.name} ${skill.name} is on cooldown for ${skill.cooldownTurns} turns!`,
        );
      }
    }
  }

  reduceStatAdjustmentDurations(battleChar: BattleCharacter) {
    battleChar.statAdjustments.forEach((adj) => {
      if (!adj.duration) return;
      adj.duration -= 1;
      if (adj.duration <= 0) {
        this.state.battleLog.push(
          `${battleChar.name}'s ${adj.stat} ${adj.amount < 0 ? "decrease" : "increase"} expired!`,
        );
      }
    });

    // Remove the adjustment from the character
    battleChar.statAdjustments = battleChar.statAdjustments.filter(
      (a) => a.duration <= 0,
    );
  }

  reduceSkillCooldowns(battleChar: BattleCharacter) {
    const cooldownTrackers = this.state.skillCooldowns[battleChar.id]
      ? Object.keys(this.state.skillCooldowns[battleChar.id])
      : [];
    cooldownTrackers.forEach((skillId) => {
      const skillCooldownAmount = this.getSkillCooldown(battleChar.id, skillId);
      if (skillCooldownAmount > 0) {
        this.setSkillCooldown(battleChar.id, skillId, skillCooldownAmount - 1);
      }
    });
  }

  // Enhanced status effect processing
  processStatusEffects(char: BattleCharacter) {
    if (!char.statusEffects || !char.isAlive) return;
    let effectsToRemove: StatusEffectType[] = [];
    Object.values(char.statusEffects).forEach((effect, idx) => {
      switch (effect.type) {
        case StatusEffectType.poison:
          const poisonDmg = Math.ceil(
            effect.value *
              (100 / (100 + getInBattleStat(StatType.magicDefense, char) * 2)),
          );
          char.damage += poisonDmg;
          this.state.battleLog.push(
            `${char.name} takes ${poisonDmg} poison damage!`,
          );
          if (!char.isPlayer)
            this.recordDamage(poisonDmg, DamageRecordType.STATUS_EFFECT_DAMAGE);
          break;
        case StatusEffectType.burn:
          const baseBurnDmg = Math.floor(
            getInBattleStat(StatType.health, char) * (0.01 * effect.value),
          );
          const burnDmg = Math.ceil(
            baseBurnDmg *
              (100 / (100 + getInBattleStat(StatType.magicDefense, char) * 2)),
          );
          char.damage += burnDmg;
          this.state.battleLog.push(
            `${char.name} takes ${burnDmg} burn damage!`,
          );
          if (!char.isPlayer)
            this.recordDamage(burnDmg, DamageRecordType.STATUS_EFFECT_DAMAGE);
          break;
      }
      if (!effect.stackable) {
        effect.duration -= 1;
        if (effect.duration <= 0) effectsToRemove.push(effect.type);
      } else {
        effect.value -= getStackableStatusEffectReductionAmount(
          effect.type,
          effect.value,
        );
        if (effect.value <= 0) effectsToRemove.push(effect.type);
      }
    });
    // Remove expired effects
    effectsToRemove.forEach((type) => {
      delete char.statusEffects[type];
    });
  }

  takeTurn(actionType: "attack" | "skill" | "endTurn", skillId?: string) {
    if (this.checkBattleEnd()) return;
    let character = this.getCurrentTurnCharacter();

    if (!character) {
      this.state.round += 1;
      this.state.activatedCharactersThisRound = [];
      this.state.battleLog.push("--- New Round! ---");
      character = this.getCurrentTurnCharacter();
      if (!character) {
        this.checkBattleEnd();
        return;
      }
    }

    if (character) {
      if (affectedBySlow(character)) {
        // do nothing
      } else if (actionType === "attack") {
        this.attack(character.id);
      } else if (actionType === "skill") {
        if (skillId) {
          this.useSkill(skillId, character.id);
        }
      }
      this.endTurn(character);
    }

    this.checkBattleEnd();
  }

  processEnemyTurn() {
    // Find the current enemy
    const enemy = this.state.enemyTeam.find(
      (c) => c.id === this.getCurrentTurnCharacter()?.id && c.isAlive,
    );
    if (!enemy) return;
    // Find a living player target
    const player = this.state.playerTeam.find((c) => c.isAlive);
    if (!player) return;

    // find a skill that has an energy cost less than or equal to the enemy's current energy
    const skill = enemy.skills.find(
      (s) => s.cost <= enemy.stats[s.costStat || StatType.energy],
    );
    if (skill && this.canUseSkill(skill.id, enemy.id)) {
      this.takeTurn("skill", skill.id);
      return;
    } else if (this.canAttack(enemy.id)) {
      this.takeTurn("attack");
      return;
    }

    this.takeTurn("endTurn");
  }

  gainEnergy(battleCharacter: BattleCharacter, amount?: number) {
    if (amount) {
      battleCharacter.stats[StatType.energy] =
        (battleCharacter.stats[StatType.energy] || 0) + amount;
      return;
    }

    let gainAmount = getInBattleStat(StatType.energyGain, battleCharacter);

    battleCharacter.stats[StatType.energy] =
      (battleCharacter.stats[StatType.energy] || 0) + gainAmount;
  }

  endTurn(battleCharacter: BattleCharacter) {
    // Energy gain for the character who just acted
    const actedChar = battleCharacter;
    if (actedChar.isAlive) {
      this.gainEnergy(actedChar);
      this.reduceStatAdjustmentDurations(actedChar);
      this.reduceSkillCooldowns(actedChar);
      this.processStatusEffects(actedChar);
      if (!affectedByHaste(battleCharacter))
        this.state.activatedCharactersThisRound.push(actedChar.id);
      const allAliveChars = this.state.playerTeam
        .concat(this.state.enemyTeam)
        .filter((c) => c.isAlive);
      if (
        this.state.activatedCharactersThisRound.length >= allAliveChars.length
      ) {
        // Reset for the next round
        this.state.activatedCharactersThisRound = [];
        this.state.round += 1;
        this.state.battleLog.push("--- New Round! ---");
      }
    }
    this.state.turnCount += 1;
    const nextTurnCharacter = this.getCurrentTurnCharacter();
    if (nextTurnCharacter && !nextTurnCharacter.isPlayer) {
      // Process enemy turn
      this.processEnemyTurn();
    }
  }
}

// Helper: calculate XP gain for each character based on average levels
export function calculateBattleXp(
  playerChars: BattleCharacter[],
  enemyChars: BattleCharacter[],
): number {
  if (!playerChars.length || !enemyChars.length) return 0;
  const avgPlayerLevel =
    playerChars.reduce((sum, c) => sum + (c.level || 1), 0) /
    playerChars.length;
  const avgEnemyLevel =
    enemyChars.reduce((sum, c) => sum + (c.level || 1), 0) / enemyChars.length;
  let xp = 10;
  const diff = avgPlayerLevel - avgEnemyLevel;
  if (diff > 0) {
    xp = xp * Math.pow(0.5, diff); // reduce by 50% per level above
  } else if (diff < 0) {
    xp = xp * Math.pow(1.5, -diff); // increase by 50% per level below
  }
  return Math.max(1, Math.round(xp));
}
