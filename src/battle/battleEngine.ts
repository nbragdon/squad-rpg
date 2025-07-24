import { getEnemyById } from '../data/enemies/getEnemyById';
import { getXpToNextLevel, levelUp } from '../data/leveling';
import { calculateDamage, calculateEnemyStat, calculateStat } from '../data/statUtils';
import { EnemyCharacter, EnemySkill } from '../types/enemy';
import { BattleCharacter, CharacterClass, PlayerCharacter, Skill, Team } from '../types/game';
import { BattleInitOptions, BattleState } from './battleTypes';

function enemySkillToSkill(skill: EnemySkill): Skill {
    return {
        id: skill.id,
        name: skill.name,
        description: skill.description,
        damage: skill.damage,
        healing: skill.healing,
        cooldown: 0,
        range: 1,
        manaCost: skill.energyCost || 0,
        isUltimate: false,
        statusEffect: skill.statusEffect,
    };
}

function toBattleCharacter(char: PlayerCharacter | (EnemyCharacter & { level: number }), isPlayer: boolean): BattleCharacter {
    if (isPlayer) {
        return {
            ...(char as PlayerCharacter),
            health: (char as PlayerCharacter).maxHealth,
            energy: 0,
            isAlive: true,
        };
    } else {
        const enemy = char as EnemyCharacter & { level: number };
        return {
            ...enemy,
            health: enemy.maxHealth,
            energy: 0,
            isAlive: true,
            level: enemy.level,
            xp: 0,
            xpToNextLevel: getXpToNextLevel(enemy.level),
            shards: 0,
            class: CharacterClass.TANK, // or a generic class for enemies
            ultimateSkill: enemy.skills[0] ? enemySkillToSkill(enemy.skills[0]) : ({} as Skill),
            skills: enemy.skills.map(enemySkillToSkill),
        };
    }
}

export class BattleEngine {
    private state: BattleState;

    constructor(options: BattleInitOptions) {
        // Generate player team
        const playerTeam: Team = {
            id: 'player_team',
            name: 'Player Team',
            characters: options.playerCharacters,
            maxSize: 4
        };
        // Generate enemy team
        const enemyTeam: Team = {
            id: 'enemy_team',
            name: 'Enemy Team',
            characters: options.enemies.map(e => {
                const base = getEnemyById(e.id);
                // Defensive: if not found, skip
                if (!base) throw new Error(`Enemy not found: ${e.id}`);
                return toBattleCharacter({ ...base, level: e.level }, false);
            }),
            maxSize: 4
        };
        // Convert to BattleCharacter
        const playerChars = playerTeam.characters.map(c => toBattleCharacter(c, true));
        const enemyChars = enemyTeam.characters.map(c => toBattleCharacter(c as EnemyCharacter & { level: number }, false));
        // Calculate turn order
        const allChars = [...playerChars, ...enemyChars];
        const turnOrder = allChars.sort((a, b) => b.speed - a.speed).map(c => c.id);
        this.state = {
            playerTeam: { ...playerTeam, characters: playerChars },
            enemyTeam: { ...enemyTeam, characters: enemyChars },
            turnOrder,
            currentCharacterId: turnOrder[0],
            currentTurn: 'player',
            battlePhase: 'combat',
            turnCount: 1,
            battleLog: ['Battle begins!'],
            xpLogs: []
        };
    }

    getState(): BattleState {
        // Return a shallow copy to trigger React updates
        return { ...this.state };
    }

    attack(attackerId: string, targetId: string) {
        const allChars = [...this.state.playerTeam.characters as BattleCharacter[], ...this.state.enemyTeam.characters as BattleCharacter[]];
        const attacker = allChars.find(c => c.id === attackerId) as BattleCharacter | undefined;
        const target = allChars.find(c => c.id === targetId) as BattleCharacter | undefined;
        if (!attacker || !target || !attacker.isAlive || !target.isAlive) return;
        // Calculate damage
        const attackVal = attacker.shards !== undefined ? calculateStat({ base: attacker.attack, level: attacker.level, shards: attacker.shards, rarity: attacker.rarity }) : calculateEnemyStat(attacker.attack, attacker.level, attacker.rarity);
        const defenseVal = target.shards !== undefined ? calculateStat({ base: target.defense, level: target.level, shards: target.shards, rarity: target.rarity }) : calculateEnemyStat(target.defense, target.level, target.rarity);
        const dmg = calculateDamage(attackVal, defenseVal);
        target.health = Math.max(0, target.health - dmg);
        if (target.health === 0) target.isAlive = false;
        this.state.battleLog.push(`${attacker.name} attacks ${target.name} for ${dmg} damage!`);
        if (!target.isAlive) {
            this.state.battleLog.push(`${target.name} is defeated!`);
        }
        this.nextTurn();
    }

    useSkill(skillId: string, attackerId: string, targetId: string) {
        const allChars = [...this.state.playerTeam.characters as BattleCharacter[], ...this.state.enemyTeam.characters as BattleCharacter[]];
        const attacker = allChars.find(c => c.id === attackerId) as BattleCharacter | undefined;
        const target = allChars.find(c => c.id === targetId) as BattleCharacter | undefined;
        if (!attacker || !target || !attacker.isAlive || !target.isAlive) return;
        const skill = (attacker.skills || []).find(s => s.id === skillId);
        if (!skill) return;
        if ((attacker.energy || 0) < (skill.manaCost || 0)) return;
        // Apply skill effect (damage, healing, status, etc.)
        if (skill.damage) {
            const attackVal = attacker.shards !== undefined ? calculateStat({ base: skill.damage, level: attacker.level, shards: attacker.shards, rarity: attacker.rarity }) : calculateEnemyStat(skill.damage, attacker.level, attacker.rarity);
            const defenseVal = target.shards !== undefined ? calculateStat({ base: target.defense, level: target.level, shards: target.shards, rarity: target.rarity }) : calculateEnemyStat(target.defense, target.level, target.rarity);
            const dmg = Math.max(0, attackVal - defenseVal);
            target.health = Math.max(0, target.health - dmg);
            if (target.health === 0) target.isAlive = false;
            this.state.battleLog.push(`${attacker.name} uses ${skill.name} on ${target.name} for ${dmg} damage!`);
            if (!target.isAlive) {
                this.state.battleLog.push(`${target.name} is defeated!`);
            }
        }
        // Apply status effect if present
        if (skill.statusEffect) {
            if (!target.activeEffects) target.activeEffects = [];
            target.activeEffects.push({ ...skill.statusEffect });
            this.state.battleLog.push(`${target.name} is affected by ${skill.statusEffect.type}!`);
        }
        // Subtract energy
        attacker.energy = Math.max(0, (attacker.energy || 0) - (skill.manaCost || 0));
        this.nextTurn();
    }

    useUltimate(skillId: string, attackerId: string, targetId: string) {
        const allChars = [...this.state.playerTeam.characters as BattleCharacter[], ...this.state.enemyTeam.characters as BattleCharacter[]];
        const attacker = allChars.find(c => c.id === attackerId) as BattleCharacter | undefined;
        const target = allChars.find(c => c.id === targetId) as BattleCharacter | undefined;
        if (!attacker || !target || !attacker.isAlive || !target.isAlive) return;
        const skill = attacker.ultimateSkill && attacker.ultimateSkill.id === skillId ? attacker.ultimateSkill : undefined;
        if (!skill) return;
        if ((attacker.energy || 0) < (skill.manaCost || 0)) return;
        // Apply ultimate effect (damage, healing, status, etc.)
        if (skill.damage) {
            const attackVal = attacker.shards !== undefined ? calculateStat({ base: skill.damage, level: attacker.level, shards: attacker.shards, rarity: attacker.rarity }) : calculateEnemyStat(skill.damage, attacker.level, attacker.rarity);
            const defenseVal = target.shards !== undefined ? calculateStat({ base: target.defense, level: target.level, shards: target.shards, rarity: target.rarity }) : calculateEnemyStat(target.defense, target.level, target.rarity);
            const dmg = Math.max(0, attackVal - defenseVal);
            target.health = Math.max(0, target.health - dmg);
            if (target.health === 0) target.isAlive = false;
            this.state.battleLog.push(`${attacker.name} unleashes ${skill.name} on ${target.name} for ${dmg} damage!`);
            if (!target.isAlive) {
                this.state.battleLog.push(`${target.name} is defeated!`);
            }
        }
        // Apply status effect if present
        if (skill.statusEffect) {
            if (!target.activeEffects) target.activeEffects = [];
            target.activeEffects.push({ ...skill.statusEffect });
            this.state.battleLog.push(`${target.name} is affected by ${skill.statusEffect.type}!`);
        }
        // Subtract energy
        attacker.energy = Math.max(0, (attacker.energy || 0) - (skill.manaCost || 0));
        this.nextTurn();
    }

    // Process status effects at the start of each turn
    processStatusEffects(char: BattleCharacter) {
        if (!char.activeEffects || !char.isAlive) return;
        let effectsToRemove: number[] = [];
        char.activeEffects.forEach((effect, idx) => {
            if (effect.type === 'burn' || effect.type === 'poison') {
                char.health = Math.max(0, char.health - effect.value);
                this.state.battleLog.push(`${char.name} takes ${effect.value} ${effect.type} damage!`);
                if (char.health === 0) char.isAlive = false;
            }
            if (effect.type === 'attack_up') {
                char.attack += effect.value;
                this.state.battleLog.push(`${char.name}'s attack increased by ${effect.value}!`);
            }
            if (effect.type === 'defense_up') {
                char.defense += effect.value;
                this.state.battleLog.push(`${char.name}'s defense increased by ${effect.value}!`);
            }
            if (effect.type === 'attack_down') {
                char.attack -= effect.value;
                this.state.battleLog.push(`${char.name}'s attack decreased by ${effect.value}!`);
            }
            if (effect.type === 'defense_down') {
                char.defense -= effect.value;
                this.state.battleLog.push(`${char.name}'s defense decreased by ${effect.value}!`);
            }
            effect.duration -= 1;
            if (effect.duration <= 0) effectsToRemove.push(idx);
        });
        // Remove expired effects
        char.activeEffects = char.activeEffects.filter((_, idx) => !effectsToRemove.includes(idx));
    }

    processEnemyTurn() {
        // Find the current enemy
        const enemy = (this.state.enemyTeam.characters as BattleCharacter[]).find(c => c.id === this.state.currentCharacterId && c.isAlive);
        if (!enemy) return;
        // Find a living player target
        const player = (this.state.playerTeam.characters as BattleCharacter[]).find(c => c.isAlive);
        if (!player) return;
        // For now, enemy always does a basic attack
        this.attack(enemy.id, player.id);
    }

    nextTurn() {
        // Check for end conditions
        const playerAlive = (this.state.playerTeam.characters as BattleCharacter[]).some(c => c.isAlive);
        const enemyAlive = (this.state.enemyTeam.characters as BattleCharacter[]).some(c => c.isAlive);
        if (!playerAlive) {
            this.state.battlePhase = 'defeat';
            this.state.battleLog.push('Defeat! Your team has been defeated.');
            return;
        }
        if (!enemyAlive) {
            this.state.battlePhase = 'victory';
            this.state.battleLog.push('Victory! You have defeated the enemy team!');
            this.awardXp();
            return;
        }
        // Energy gain for the character who just acted
        const idx = this.state.turnOrder.indexOf(this.state.currentCharacterId!);
        const actedIdx = idx === 0 ? this.state.turnOrder.length - 1 : idx - 1;
        const actedId = this.state.turnOrder[actedIdx];
        const allChars = [...(this.state.playerTeam.characters as BattleCharacter[]), ...(this.state.enemyTeam.characters as BattleCharacter[])];
        const actedChar = allChars.find(c => c.id === actedId);
        if (actedChar && actedChar.isAlive) {
            // Process status effects for the character who just acted
            this.processStatusEffects(actedChar);
            const gain = typeof actedChar.energyGain === 'number' ? actedChar.energyGain : 20;
            actedChar.energy = Math.min((actedChar.energy || 0) + gain, actedChar.maxEnergy || 100);
        }
        // Advance turn
        const nextIdx = (idx + 1) % this.state.turnOrder.length;
        this.state.currentCharacterId = this.state.turnOrder[nextIdx];
        this.state.currentTurn = (this.state.playerTeam.characters as BattleCharacter[]).some(c => c.id === this.state.currentCharacterId) ? 'player' : 'enemy';
        if (nextIdx === 0) this.state.turnCount += 1;
    }

    awardXp() {
        // Award XP to all player characters based on average enemy level
        const playerChars = this.state.playerTeam.characters as PlayerCharacter[];
        const enemyLevels = (this.state.enemyTeam.characters as BattleCharacter[]).map(c => c.level || 1);
        const avgLevel = Math.round(enemyLevels.reduce((a, b) => a + b, 0) / enemyLevels.length);
        const xpGained = 20 * avgLevel;
        let logs: string[] = [];
        playerChars.forEach(char => {
            let updatedChar = { ...char, xp: (char.xp ?? 0) + xpGained };
            const beforeLevel = updatedChar.level;
            updatedChar = levelUp(updatedChar);
            logs.push(`${updatedChar.name} gained ${xpGained} XP!`);
            if (updatedChar.level > beforeLevel) {
                logs.push(`${updatedChar.name} leveled up! Lv. ${updatedChar.level} (+${updatedChar.level - beforeLevel})`);
                logs.push('Stats increased!');
            }
        });
        this.state.xpLogs = logs;
    }
}
