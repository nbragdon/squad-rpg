import { getXpToNextLevel } from '../data/leveling';
import { calculateDamage, calculateEnemyStat, calculateStat } from '../data/statUtils';
import { EnemyCharacter, EnemySkill } from '../types/enemy';
import { BattleCharacter, CharacterClass, PlayerCharacter, Team } from '../types/game';
import { CostType, Skill, SkillType, StatusEffectType, TargetType } from '../types/skillTypes';
import { BattleInitOptions, BattleState } from './battleTypes';

function enemySkillToSkill(skill: EnemySkill): Skill {
    return {
        id: skill.id,
        name: skill.name,
        description: skill.description,
        damageCalc: skill.damage !== undefined ? { type: 'stat', stat: 'attack', multiplier: skill.damage / 100 } : undefined,
        cooldownTurns: 0,
        costType: skill.energyCost ? CostType.Energy : CostType.None,
        costAmount: skill.energyCost || 0,
        isUltimate: false,
        type: SkillType.Attack,
        targetType: TargetType.SingleEnemy,
        statusEffectsApplied: skill.statusEffect ? [{
            id: skill.statusEffect.type,
            name: skill.statusEffect.type,
            type: StatusEffectType.Debuff,
            duration: skill.statusEffect.duration,
            value: skill.statusEffect.value,
            description: skill.statusEffect.type
        }] : [],
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
                const base = e.id;
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
            currentTurn: this.getCurrentTeamTurn(playerChars, turnOrder[0]),
            battlePhase: 'combat',
            turnCount: 1,
            battleLog: ['Battle begins!'],
            xpLogs: []
        };
        if (this.state.currentTurn === 'enemy') {
            this.processEnemyTurn();
        }
    }

    getState(): BattleState {
        // Return a shallow copy to trigger React updates
        return { ...this.state };
    }

    private checkBattleEnd() {
        const playerAlive = (this.state.playerTeam.characters as BattleCharacter[]).some(c => c.isAlive);
        const enemyAlive = (this.state.enemyTeam.characters as BattleCharacter[]).some(c => c.isAlive);
        if (!playerAlive && this.state.battlePhase !== 'defeat') {
            this.state.battlePhase = 'defeat';
            this.state.battleLog.push('Defeat! Your team has been defeated.');
        }
        if (!enemyAlive && this.state.battlePhase !== 'victory') {
            this.state.battlePhase = 'victory';
            this.state.battleLog.push('Victory! You have defeated the enemy team!');
        }
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
        this.checkBattleEnd();
        if (this.state.battlePhase === 'combat') this.nextTurn();
    }

    useSkill(skillId: string, attackerId: string, targetId: string) {
        const allChars = [...this.state.playerTeam.characters as BattleCharacter[], ...this.state.enemyTeam.characters as BattleCharacter[]];
        const attacker = allChars.find(c => c.id === attackerId) as BattleCharacter | undefined;
        const target = allChars.find(c => c.id === targetId) as BattleCharacter | undefined;
        if (!attacker || !target || !attacker.isAlive || !target.isAlive) return;
        const skill = (attacker.skills || []).find(s => s.id === skillId);
        if (!skill) return;
        if (skill.costType && skill.costAmount && (attacker.energy || 0) < skill.costAmount) return;
        // Damage calculation using damageCalc
        if (skill.damageCalc) {
            let dmg = 0;
            if (skill.damageCalc.type === 'stat') {
                dmg = Math.floor((attacker[skill.damageCalc.stat] || 0) * skill.damageCalc.multiplier);
            } else if (skill.damageCalc.type === 'average') {
                const stats = skill.damageCalc.stats.map(stat => attacker[stat] || 0);
                const avg = stats.reduce((a, b) => a + b, 0) / stats.length;
                dmg = Math.floor(avg * skill.damageCalc.multiplier);
            }
            // Optionally apply defense, resistances, etc. here
            target.health = Math.max(0, target.health - dmg);
            if (target.health === 0) target.isAlive = false;
            this.state.battleLog.push(`${attacker.name} uses ${skill.name} on ${target.name} for ${dmg} damage!`);
            if (!target.isAlive) {
                this.state.battleLog.push(`${target.name} is defeated!`);
            }
        }
        // Apply all status effects
        if (skill.statusEffectsApplied && skill.statusEffectsApplied.length > 0) {
            if (!Array.isArray(target.activeEffects)) target.activeEffects = [];
            skill.statusEffectsApplied.forEach(effect => {
                target.activeEffects!.push({ ...effect });
                this.state.battleLog.push(`${target.name} is affected by ${effect.name}!`);
            });
        }
        // Subtract energy
        if (skill.costType && skill.costAmount) {
            attacker.energy = Math.max(0, (attacker.energy || 0) - skill.costAmount);
        }
        this.checkBattleEnd();
        if (this.state.battlePhase === 'combat') this.nextTurn();
    }

    useUltimate(skillId: string, attackerId: string, targetId: string) {
        const allChars = [...this.state.playerTeam.characters as BattleCharacter[], ...this.state.enemyTeam.characters as BattleCharacter[]];
        const attacker = allChars.find(c => c.id === attackerId) as BattleCharacter | undefined;
        const target = allChars.find(c => c.id === targetId) as BattleCharacter | undefined;
        if (!attacker || !target || !attacker.isAlive || !target.isAlive) return;
        const skill = attacker.ultimateSkill && attacker.ultimateSkill.id === skillId ? attacker.ultimateSkill : undefined;
        if (!skill) return;
        if (skill.costType && skill.costAmount && (attacker.energy || 0) < skill.costAmount) return;
        // Damage calculation using damageCalc
        if (skill.damageCalc) {
            let dmg = 0;
            if (skill.damageCalc.type === 'stat') {
                dmg = Math.floor((attacker[skill.damageCalc.stat] || 0) * skill.damageCalc.multiplier);
            } else if (skill.damageCalc.type === 'average') {
                const stats = skill.damageCalc.stats.map(stat => attacker[stat] || 0);
                const avg = stats.reduce((a, b) => a + b, 0) / stats.length;
                dmg = Math.floor(avg * skill.damageCalc.multiplier);
            }
            target.health = Math.max(0, target.health - dmg);
            if (target.health === 0) target.isAlive = false;
            this.state.battleLog.push(`${attacker.name} unleashes ${skill.name} on ${target.name} for ${dmg} damage!`);
            if (!target.isAlive) {
                this.state.battleLog.push(`${target.name} is defeated!`);
            }
        }
        // Apply all status effects
        if (skill.statusEffectsApplied && skill.statusEffectsApplied.length > 0) {
            target.activeEffects = target.activeEffects || [];
            skill.statusEffectsApplied.forEach(effect => {
                target.activeEffects!.push({ ...effect });
                this.state.battleLog.push(`${target.name} is affected by ${effect.name}!`);
            });
        }
        // Subtract energy
        if (skill.costType && skill.costAmount) {
            attacker.energy = Math.max(0, (attacker.energy || 0) - skill.costAmount);
        }
        this.checkBattleEnd();
        if (this.state.battlePhase === 'combat') this.nextTurn();
    }

    // Enhanced status effect processing
    processStatusEffects(char: BattleCharacter) {
        if (!char.activeEffects || !char.isAlive) return;
        let effectsToRemove: number[] = [];
        char.activeEffects.forEach((effect, idx) => {
            switch (effect.type) {
                case 'dot':
                    char.health = Math.max(0, char.health - (effect.value || 0));
                    this.state.battleLog.push(`${char.name} takes ${effect.value} damage from ${effect.name}!`);
                    if (char.health === 0) char.isAlive = false;
                    break;
                case 'hot':
                    char.health = Math.min(char.maxHealth, char.health + (effect.value || 0));
                    this.state.battleLog.push(`${char.name} heals ${effect.value} from ${effect.name}!`);
                    break;
                case 'buff':
                    if (effect.targetStat && effect.value) {
                        char[effect.targetStat] = (char[effect.targetStat] || 0) + effect.value;
                        this.state.battleLog.push(`${char.name}'s ${effect.targetStat} increased by ${effect.value} from ${effect.name}!`);
                    }
                    break;
                case 'debuff':
                    if (effect.targetStat && effect.value) {
                        char[effect.targetStat] = (char[effect.targetStat] || 0) + effect.value;
                        this.state.battleLog.push(`${char.name}'s ${effect.targetStat} changed by ${effect.value} from ${effect.name}!`);
                    }
                    break;
                case 'cc':
                    // Example: prevents actions
                    if (effect.preventsActions) {
                        this.state.battleLog.push(`${char.name} is prevented from acting by ${effect.name}!`);
                    }
                    break;
                // ...other effect types as needed...
            }
            effect.duration -= 1;
            if (effect.duration <= 0) effectsToRemove.push(idx);
        });
        // Remove expired effects
        char.activeEffects = char.activeEffects.filter((_, idx) => !effectsToRemove.includes(idx));
        this.checkBattleEnd();
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

    getCurrentTeamTurn(playerCharacters: BattleCharacter[], currentCharacterId: string | null): 'player' | 'enemy' {
        return playerCharacters.some(c => c.id === currentCharacterId) ? 'player' : 'enemy';
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
        this.state.currentTurn = this.getCurrentTeamTurn(this.state.playerTeam.characters as BattleCharacter[], this.state.currentCharacterId);
        if (nextIdx === 0) this.state.turnCount += 1;
    }
}

// Helper: calculate XP gain for each character based on average levels
export function calculateBattleXp(playerChars: BattleCharacter[], enemyChars: BattleCharacter[]): number {
    if (!playerChars.length || !enemyChars.length) return 0;
    const avgPlayerLevel = playerChars.reduce((sum, c) => sum + (c.level || 1), 0) / playerChars.length;
    const avgEnemyLevel = enemyChars.reduce((sum, c) => sum + (c.level || 1), 0) / enemyChars.length;
    let xp = 10;
    const diff = avgPlayerLevel - avgEnemyLevel;
    if (diff > 0) {
        xp = xp * Math.pow(0.5, diff); // reduce by 50% per level above
    } else if (diff < 0) {
        xp = xp * Math.pow(1.5, -diff); // increase by 50% per level below
    }
    return Math.max(1, Math.round(xp));
}
