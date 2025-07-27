import { calculateDamage, calculateStat } from "../data/statUtils";
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
import { BattleCharacter, BattleInitOptions, BattleState } from "./battleTypes";

function toBattleCharacter(
  char: PlayerCharacter | (EnemyCharacter & { level: number }),
  isPlayer: boolean,
): BattleCharacter {
  if (isPlayer) {
    return {
      ...(char as PlayerCharacter),
      stats: {
        ...char.stats,
      },
      isAlive: true,
      statusEffects: {},
      statAdjustments: [],
      damage: 0,
    };
  } else {
    const enemy = char as EnemyCharacter & { level: number };
    return {
      ...enemy,
      stats: {
        ...enemy.stats,
      },
      isAlive: true,
      level: enemy.level,
      shards: 0,
      statusEffects: {},
      statAdjustments: [],
      damage: 0,
    };
  }
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
      toBattleCharacter(c, true),
    );
    // Generate enemy team
    const enemyTeam = options.enemies.map((e) => {
      const base = e.id;
      // Defensive: if not found, skip
      if (!base) throw new Error(`Enemy not found: ${e.id}`);
      return toBattleCharacter({ ...base, level: e.level }, false);
    });

    this.state = {
      playerTeam: playerTeam,
      enemyTeam: enemyTeam,
      activatedCharactersThisRound: [],
      battlePhase: "combat",
      turnCount: 1,
      battleLog: ["Battle begins!"],
      xpLogs: [],
    };
    if (this.getCurrentTeamTurn() === "enemy") {
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
  getCurrentTurnCharacter(): BattleCharacter | null {
    const playerAlive = this.state.playerTeam.filter((c) => c.isAlive);
    const enemyAlive = this.state.enemyTeam.filter((c) => c.isAlive);
    // 1. Filter for alive characters
    const aliveCharacters = [...playerAlive, ...enemyAlive];

    if (aliveCharacters.length === 0) {
      return null; // No one alive to take a turn
    }

    // 2. Filter for characters who have not yet acted this round
    const eligibleCharacters = aliveCharacters.filter(
      (char) => !this.state.activatedCharactersThisRound.includes(char.id),
    );

    if (eligibleCharacters.length === 0) {
      return null; // All alive characters have acted this round
    }

    // 3. Sort the eligible characters by speed (descending)
    const sortedEligibleCharacters = [...eligibleCharacters].sort(
      (a, b) =>
        calculateStat(StatType.speed, b) - calculateStat(StatType.speed, a),
    );

    // 4. Return the ID of the character with the highest speed among those who haven't acted
    return sortedEligibleCharacters[0];
  }

  private checkBattleEnd() {
    const playerAlive = this.state.playerTeam.some((c) => c.isAlive);
    const enemyAlive = this.state.enemyTeam.some((c) => c.isAlive);
    if (!playerAlive && this.state.battlePhase !== "defeat") {
      this.state.battlePhase = "defeat";
      this.state.battleLog.push("Defeat! Your team has been defeated.");
    }
    if (!enemyAlive && this.state.battlePhase !== "victory") {
      this.state.battlePhase = "victory";
      this.state.battleLog.push("Victory! You have defeated the enemy team!");
    }
  }

  attack(attackerId: string) {
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
    if (!attacker || !target || !attacker.isAlive || !target.isAlive) return;
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
    if (target.damage >= target.stats[StatType.health]) target.isAlive = false;
    this.state.battleLog.push(
      `${attacker.name} attacks ${target.name} for ${dmg} damage!`,
    );
    if (!target.isAlive) {
      this.state.battleLog.push(`${target.name} is defeated!`);
    }
    this.checkBattleEnd();
    if (this.state.battlePhase === "combat") this.nextTurn();
  }

  useSkill(skillId: string, attackerId: string) {
    const allChars = [...this.state.playerTeam, ...this.state.enemyTeam];
    const attacker = allChars.find((c) => c.id === attackerId) as
      | BattleCharacter
      | undefined;
    if (!attacker || !attacker.isAlive) return;
    const skill = (attacker.skills || []).find((s) => s.id === skillId);
    if (!skill) return;
    if (skill.cost < attacker.stats[skill.costStat || StatType.energy]) return;
    const attackerIsPlayer = this.state.playerTeam.some(
      (c) => c.id === attackerId,
    );
    skill.effects.forEach((effect) => {
      const targets = getTargetId(
        effect.targetType,
        attackerId,
        attackerIsPlayer ? this.state.playerTeam : this.state.enemyTeam,
        attackerIsPlayer ? this.state.enemyTeam : this.state.playerTeam,
      );
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
          if (target.damage >= target.stats[StatType.health])
            target.isAlive = false;
          this.state.battleLog.push(
            `${attacker.name} uses ${skill.name} on ${target.name} for ${dmg} damage!`,
          );
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
            value: applyStatusEffect.value || 0,
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
          target.damage = Math.max(
            target.damage - healAmount,
            0, // Max health
          );
          this.state.battleLog.push(
            `${attacker.name} heals ${target.name} for ${healAmount} health!`,
          );
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
    this.checkBattleEnd();
    if (this.state.battlePhase === "combat") this.nextTurn();
  }

  reduceStatAdjustmentDurations(battleChar: BattleCharacter) {
    battleChar.statAdjustments.forEach((adj) => {
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

  // Enhanced status effect processing
  processStatusEffects(char: BattleCharacter) {
    if (!char.statusEffects || !char.isAlive) return;
    let effectsToRemove: StatusEffectType[] = [];
    Object.values(char.statusEffects).forEach((effect, idx) => {
      switch (effect.type) {
        case StatusEffectType.poison:
          char.damage += effect.value;
          this.state.battleLog.push(
            `${char.name} takes ${effect.value} poison damage!`,
          );
          break;
        case StatusEffectType.burn:
          char.damage += effect.value;
          this.state.battleLog.push(
            `${char.name} takes ${effect.value} burn damage!`,
          );
          break;
        case StatusEffectType.freeze:
          char.damage += effect.value;
          this.state.battleLog.push(
            `${char.name} takes ${effect.value} freeze damage!`,
          );
          break;
        case StatusEffectType.bleed:
          char.damage += effect.value;
          this.state.battleLog.push(
            `${char.name} takes ${effect.value} bleed damage!`,
          );
          break;
        // ...other effect types as needed...
      }
      effect.duration -= 1;
      if (effect.duration <= 0) effectsToRemove.push(effect.type);
    });
    // Remove expired effects
    effectsToRemove.forEach((type) => {
      delete char.statusEffects[type];
    });
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
    if (skill) {
      this.useSkill(skill.id, enemy.id);
    } else {
      this.attack(enemy.id);
    }
  }

  getCurrentTeamTurn(): "player" | "enemy" {
    const currentCharacterId = this.getCurrentTurnCharacter()?.id;
    if (!currentCharacterId) return "player"; // Default to player if no character is found
    const playerCharacters = this.state.playerTeam;
    return playerCharacters.some((c) => c.id === currentCharacterId)
      ? "player"
      : "enemy";
  }

  nextTurn() {
    // Check for end conditions
    const playerAlive = this.state.playerTeam.some((c) => c.isAlive);
    const enemyAlive = this.state.enemyTeam.some((c) => c.isAlive);
    if (!playerAlive) {
      this.state.battlePhase = "defeat";
      this.state.battleLog.push("Defeat! Your team has been defeated.");
      return;
    }
    if (!enemyAlive) {
      this.state.battlePhase = "victory";
      this.state.battleLog.push("Victory! You have defeated the enemy team!");
      return;
    }
    // Energy gain for the character who just acted
    const actedChar = this.getCurrentTurnCharacter();
    if (actedChar && actedChar.isAlive) {
      // Process status effects for the character who just acted
      this.processStatusEffects(actedChar);
      const gain = actedChar.stats[StatType.energyGain];
      actedChar.stats[StatType.energy] =
        (actedChar.stats[StatType.energy] || 0) + gain;
      // Reduce stat adjustments durations
      this.reduceStatAdjustmentDurations(actedChar);
      this.state.activatedCharactersThisRound.push(actedChar.id);
      this.state.turnCount += 1;
      if (
        this.state.activatedCharactersThisRound.length >=
        this.state.playerTeam.length + this.state.enemyTeam.length
      ) {
        // Reset for the next round
        this.state.activatedCharactersThisRound = [];
      }
    }
    if (this.getCurrentTeamTurn() === "enemy") {
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
