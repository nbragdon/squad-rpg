import { adjustedStat, calculateDamage } from "data/statUtils";
import { PlayerCharacter } from "../types/character";
import { EnemyCharacter } from "../types/enemy";
import {
  AdjustStatSkillEffect,
  ApplyStatusEffectSkillEffect,
  DamageSkillEffect,
  HealSkillEffect,
  ModifierType,
  TargetType,
} from "../types/skillTypes";
import { StatType } from "../types/stats";
import { StatusEffectType } from "../types/statusEffects";
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
import { GameEngine } from "engine/GameEngine";
import { getAllEquipment } from "data/inventory/equipmentUtil";
import { EquipmentItem } from "types/inventory";
import { getCompletedThresholdRewards } from "./victoryTreshholds";

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
  casterId: string,
  allies: BattleCharacter[],
  enemies: BattleCharacter[],
): string[] {
  // Filter out non-alive characters for all target types except 'self'
  const aliveAllies = allies.filter((char) => char.isAlive);
  const aliveEnemies = enemies.filter((char) => char.isAlive);

  switch (targetType) {
    case TargetType.self:
      // For 'self', the caster's ID is the target
      return [casterId];

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
      const speedA = adjustedStat(StatType.speed, {
        stats: a.stats,
        level: a.level,
        shards: a.shards,
        rarity: a.rarity,
      });
      const speedB = adjustedStat(StatType.speed, {
        stats: b.stats,
        level: b.level,
        shards: b.shards,
        rarity: b.rarity,
      });

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
    console.log(playerAlive, enemyAlive);
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
      console.log(this.state.victoryThresholds, this.state.battleRecords);
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

  attack(attackerId: string) {
    console.log("attacking", attackerId);
    const allChars = [...this.state.playerTeam, ...this.state.enemyTeam];
    const attacker = allChars.find((c) => c.id === attackerId);
    const attackerIsPlayer = this.state.playerTeam.some(
      (c) => c.id === attackerId,
    );
    const targetId = getTargetId(
      TargetType.randomEnemy,
      attackerId,
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
      target.damage += dmg;
      const targetHealth = adjustedStat(StatType.health, target);
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
    console.log("using skill", skillId, attackerId);
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
          attackerId,
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
          if (effect.type === "damage") {
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
            target.damage += dmg;
            const targetHealth = adjustedStat(StatType.health, target);
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
          if (effect.type === "applyStatusEffect") {
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
          if (effect.type === "heal") {
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
          if (effect.type === "adjustStat") {
            const adjustEffect = effect as AdjustStatSkillEffect;
            target.statAdjustments.push(adjustEffect);
            const currentStat = target.stats[adjustEffect.stat] || 0;
            let flatValue = 0;

            if (adjustEffect.modifierType === ModifierType.Flat) {
              flatValue = adjustEffect.modifierValue || 0;
            } else if (adjustEffect.modifierType === ModifierType.Percentage) {
              flatValue = currentStat * (1 + (adjustEffect.modifierValue || 0));
            }

            this.state.battleLog.push(
              `${target.name}'s ${adjustEffect.stat} adjusted by ${flatValue}!`,
            );
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
      console.log("adjustment", adj);
      if (!adj.duration) return;
      adj.duration -= 1;
      if (adj.duration <= 0) {
        // Remove the adjustment from the character
        battleChar.statAdjustments = battleChar.statAdjustments.filter(
          (a) => a.id !== adj.id,
        );
        this.state.battleLog.push(
          `${battleChar.name}'s ${adj.stat} adjustment expired!`,
        );
      }
    });
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
          const poisonDmg =
            effect.value *
            (100 / (100 + adjustedStat(StatType.magicDefense, char) * 2));
          char.damage += poisonDmg;
          this.state.battleLog.push(
            `${char.name} takes ${poisonDmg} poison damage!`,
          );
          if (!char.isPlayer)
            this.recordDamage(poisonDmg, DamageRecordType.STATUS_EFFECT_DAMAGE);
          break;
        case StatusEffectType.burn:
          const dmg = Math.floor(
            adjustedStat(StatType.health, char) * (0.01 * effect.value),
          );
          char.damage += dmg;
          this.state.battleLog.push(
            `${char.name} takes ${effect.value} burn damage!`,
          );
          if (!char.isPlayer)
            this.recordDamage(dmg, DamageRecordType.STATUS_EFFECT_DAMAGE);
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

    console.log(character);

    if (character) {
      if (actionType === "attack") {
        this.attack(character.id);
      } else if (actionType === "skill") {
        if (skillId) {
          this.useSkill(skillId, character.id);
        }
      }
      console.log("about to trigger end turn");
      this.endTurn(character);
    }

    this.checkBattleEnd();
  }

  processEnemyTurn() {
    console.log("start enemy turn");
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

    let gainAmount = adjustedStat(StatType.energyGain, battleCharacter);

    battleCharacter.stats[StatType.energy] =
      (battleCharacter.stats[StatType.energy] || 0) + gainAmount;
  }

  endTurn(battleCharacter: BattleCharacter) {
    console.log("starting end turn");
    // Energy gain for the character who just acted
    const actedChar = battleCharacter;
    console.log(actedChar);
    if (actedChar.isAlive) {
      this.gainEnergy(actedChar);
      this.reduceStatAdjustmentDurations(actedChar);
      this.reduceSkillCooldowns(actedChar);
      this.processStatusEffects(actedChar);
      this.state.activatedCharactersThisRound.push(actedChar.id);
      const allAliveChars = this.state.playerTeam
        .concat(this.state.enemyTeam)
        .filter((c) => c.isAlive);
      console.log(this.state.activatedCharactersThisRound, allAliveChars);
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
    console.log("finished next turn", nextTurnCharacter);
    if (nextTurnCharacter && !nextTurnCharacter.isPlayer) {
      // Process enemy turn
      console.log("processing enemy turn", nextTurnCharacter);
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
