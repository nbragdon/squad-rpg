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
      isAlive: true,
      statusEffects: {},
      damage: 0,
    };
  } else {
    const enemy = char as EnemyCharacter & { level: number };
    console.log(enemy);
    return {
      ...enemy,
      isAlive: true,
      level: enemy.level,
      shards: 0,
      statusEffects: {},
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
          prev.stats.health < current.stats.health ? prev : current,
        );
        return [lowestHealthAlly.id];
      }
      return [];

    case TargetType.lowestHealthEnemy:
      if (aliveEnemies.length > 0) {
        // Find the enemy with the lowest current health
        const lowestHealthEnemy = aliveEnemies.reduce((prev, current) =>
          prev.stats.health < current.stats.health ? prev : current,
        );
        return [lowestHealthEnemy.id];
      }
      return [];

    default:
      return []; // Should not happen if all TargetTypes are handled
  }
}

/**
 * Determines if a critical hit occurs based on the provided critical chance.
 * @param critChance The critical hit chance as a number between 0 and 100.
 * @returns True if a critical hit occurs, false otherwise.
 */
export function didCrit(critChance: number): boolean {
  // Generate a random number between 0 (inclusive) and 100 (exclusive)
  const randomNumber = Math.random() * 100;
  // A critical hit occurs if the random number is less than the critChance
  return randomNumber < critChance;
}

export class BattleEngine {
  private state: BattleState;

  constructor(options: BattleInitOptions) {
    console.log(options.enemies);
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

    // Calculate turn order
    const allChars = [...playerTeam, ...enemyTeam];
    const turnOrder = allChars
      .sort((a, b) => b.stats[StatType.speed] - a.stats[StatType.speed])
      .map((c) => c.id);
    this.state = {
      playerTeam: playerTeam,
      enemyTeam: enemyTeam,
      turnOrder,
      currentCharacterId: turnOrder[0],
      currentTurn: this.getCurrentTeamTurn(playerTeam, turnOrder[0]),
      battlePhase: "combat",
      turnCount: 1,
      battleLog: ["Battle begins!"],
      xpLogs: [],
    };
    if (this.state.currentTurn === "enemy") {
      this.processEnemyTurn();
    }
  }

  getState(): BattleState {
    // Return a shallow copy to trigger React updates
    return { ...this.state };
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
    const attackVal = calculateStat(StatType.strength, attacker);
    const defenseVal = calculateStat(StatType.defense, target);
    let dmg = calculateDamage(attackVal, defenseVal);
    if (didCrit(attacker.stats[StatType.critChance])) {
      dmg *= attacker.stats[StatType.critDamage];
      this.state.battleLog.push(`${attacker.name} crits ${target.name}!`);
    }
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
          const attackVal =
            calculateStat(damageEffect.damageStat, attacker) *
            damageEffect.damageMultiplier;
          const defenseVal = calculateStat(damageEffect.defenseStat, target);
          let dmg = calculateDamage(attackVal, defenseVal);
          if (didCrit(attacker.stats[StatType.critChance])) {
            dmg *= attacker.stats[StatType.critDamage];
            this.state.battleLog.push(`${attacker.name} crits ${target.name}!`);
          }
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
          target.stats[StatType.health] = Math.max(
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
          const currentStat = target.stats[adjustEffect.stat] || 0;
          let newStat = currentStat;

          if (adjustEffect.modifierType === ModifierType.Flat) {
            newStat += adjustEffect.modifierValue || 0;
          } else if (adjustEffect.modifierType === ModifierType.Percentage) {
            newStat += currentStat * (1 + (adjustEffect.modifierValue || 0));
          }

          target.stats[adjustEffect.stat] = Math.max(newStat, 0);
          this.state.battleLog.push(
            `${target.name}'s ${adjustEffect.stat} adjusted by ${newStat - currentStat}!`,
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
      (c) => c.id === this.state.currentCharacterId && c.isAlive,
    );
    if (!enemy) return;
    // Find a living player target
    const player = this.state.playerTeam.find((c) => c.isAlive);
    if (!player) return;

    // find a skill that has an energy cost less than or equal to the enemy's current energy
    const skill = enemy.skills.find(
      (s) => s.cost <= enemy.stats[s.costStat || StatType.energy],
    );
    console.log(enemy.skills, skill);
    if (skill) {
      this.useSkill(skill.id, enemy.id);
    } else {
      this.attack(enemy.id);
    }
  }

  getCurrentTeamTurn(
    playerCharacters: BattleCharacter[],
    currentCharacterId: string | null,
  ): "player" | "enemy" {
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
    const idx = this.state.turnOrder.indexOf(this.state.currentCharacterId!);
    const actedIdx = idx === 0 ? this.state.turnOrder.length - 1 : idx - 1;
    const actedId = this.state.turnOrder[actedIdx];
    const allChars = [...this.state.playerTeam, ...this.state.enemyTeam];
    const actedChar = allChars.find((c) => c.id === actedId);
    if (actedChar && actedChar.isAlive) {
      // Process status effects for the character who just acted
      this.processStatusEffects(actedChar);
      const gain = actedChar.stats[StatType.energyGain];
      actedChar.stats[StatType.energy] =
        (actedChar.stats[StatType.energy] || 0) + gain;
    }
    // Advance turn
    const nextIdx = (idx + 1) % this.state.turnOrder.length;
    this.state.currentCharacterId = this.state.turnOrder[nextIdx];
    this.state.currentTurn = this.getCurrentTeamTurn(
      this.state.playerTeam,
      this.state.currentCharacterId,
    );
    if (nextIdx === 0) this.state.turnCount += 1;
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
