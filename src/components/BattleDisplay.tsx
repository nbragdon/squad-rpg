import { levelUp } from "data/leveling";
import React, { useCallback, useEffect, useState } from "react";
import { BattleCharacter, BattleState, calculateBattleXp } from "../battle";
import { useGameEngine } from "../context/GameEngineContext";
import { adjustedStat, calculateStat } from "../data/statUtils";
import { StatType } from "../types/stats";
import {
  ABILITY_BG_COLOR,
  AffinityIcons,
  COIN_ICON,
  EQUIPMENT_TYPE_ICONS,
  getItemIcon,
  getRarityTextColorClass,
  RARITY_COLORS,
  RarityIcons,
  StatIcons,
  StatusEffectIcons,
} from "./utils";
import { generateBaseCharacterProgress } from "data/characters";
import { AffinityType } from "types/affinity";
import { StatusEffectType } from "types/statusEffects";
import {
  CoinsReward,
  CrystalReward,
  EquipmentReward,
  ExpReward,
  ItemReward,
  Reward,
  RewardType,
} from "types/reward";
import {
  formatStatValue,
  generateRandomEquipment,
} from "data/inventory/equipmentUtil";
import { HiSparkles } from "react-icons/hi";
import { FaGem } from "react-icons/fa";
import { EquipmentItem, EquipmentType } from "types/inventory";
import {
  getCompletedThresholdRewards,
  VictoryThreshold,
} from "battle/victoryTreshholds";
import { GameEngine } from "engine/GameEngine";

const AUTO_WAIT_TIME = 1500; // Time in ms for auto actions

interface BattleDisplayProps {
  rewards: Reward[];
  victoryThresholds?: VictoryThreshold[];
  onVictory?: () => void;
  onDefeat?: () => void;
  onFlee?: () => void;
}

const BattleDisplay: React.FC<BattleDisplayProps> = ({
  rewards,
  victoryThresholds,
  onVictory,
  onDefeat,
  onFlee,
}) => {
  const { gameEngine, updateGameEngine } = useGameEngine();
  const [waitingOnAutoAction, setWaitingOnAutoAction] = useState(false);
  // Store the ID of the character whose turn it currently is for auto-selection
  const [charactersAutoSelection, setCharactersAutoSelection] = useState<{
    [key: string]: string;
  }>({});

  const battleEngine = gameEngine.battleEngine;
  const battleState = battleEngine?.getState();
  const auto = gameEngine.player.autoBattle;

  const getCoinStatusBonus = (currentBattleState: BattleState) => {
    let bonusCoins = 0;
    currentBattleState.enemyTeam.forEach((battleChar) => {
      if (
        battleChar.statusEffects &&
        battleChar.statusEffects[StatusEffectType.coins]
      ) {
        const coinValue =
          battleChar.statusEffects[StatusEffectType.coins].value;
        if (coinValue) {
          bonusCoins += coinValue;
        }
      }
    });

    return bonusCoins;
  };

  const addRewardsToGameEngine = (
    originalGameEngine: GameEngine,
    currentBattleState: BattleState,
  ) => {
    let updatedGameEngine = { ...originalGameEngine };
    const updatedBattleRewards: Reward[] = [];
    let updatedCharacterProgress = {
      ...updatedGameEngine.player.characterProgress,
    };
    let updatedEquipment = { ...updatedGameEngine.player.equipment };
    let crystals = updatedGameEngine.player.crystals;
    let coins = updatedGameEngine.player.coins;
    let updatedInventory = { ...updatedGameEngine.player.inventory };
    const bonusCoins = getCoinStatusBonus(currentBattleState);
    const thresholdRewards = victoryThresholds
      ? getCompletedThresholdRewards(currentBattleState)
      : [];
    const allRewards = [...rewards, ...thresholdRewards];
    allRewards.forEach((reward) => {
      if (reward.type === RewardType.exp) {
        const xpGained = getVictoryXp() * (reward.multiplier || 1);
        updatedBattleRewards.push({
          ...reward,
          amount: xpGained,
        });
        currentBattleState.playerTeam.forEach(
          (char: { id: string | number }) => {
            let characterToUpdate = updatedCharacterProgress[char.id];
            if (!characterToUpdate) {
              characterToUpdate = generateBaseCharacterProgress();
            }
            updatedCharacterProgress[char.id] = levelUp({
              ...characterToUpdate,
              xp: (characterToUpdate.xp || 0) + xpGained,
            });
          },
        );
      } else if (
        reward.type === RewardType.equipment &&
        reward.equipmentType &&
        reward.rarity
      ) {
        const newEquipment = generateRandomEquipment(
          reward.equipmentType,
          reward.rarity,
        );
        updatedBattleRewards.push({
          ...reward,
          equipment: newEquipment,
        });
        updatedEquipment[newEquipment.id] = newEquipment;
        reward.equipment = newEquipment;
      } else if (reward.type === RewardType.crystal && reward.amount) {
        updatedBattleRewards.push(reward);
        crystals += reward.amount;
      } else if (reward.type === RewardType.coins && reward.amount) {
        updatedBattleRewards.push(reward);
        coins += bonusCoins;
      } else if (reward.type === RewardType.coins_status_effect && bonusCoins) {
        updatedBattleRewards.push({
          type: RewardType.coins,
          amount: bonusCoins,
        } as CoinsReward);
        coins += bonusCoins * (reward.multiplier || 1);
      } else if (reward.type === RewardType.item && reward.item) {
        const updatedItem = updatedInventory[reward.item.id];
        if (updatedItem) {
          updatedInventory[reward.item.id] = {
            ...updatedItem,
            quantity: updatedItem.quantity + reward.item.quantity,
          };
        } else {
          updatedInventory[reward.item.id] = { ...reward.item };
        }
        updatedBattleRewards.push(reward);
      }
    });

    return {
      updatedGameEngine: {
        ...updatedGameEngine,
        player: {
          ...updatedGameEngine.player,
          characterProgress: { ...updatedCharacterProgress },
          equipment: { ...updatedEquipment },
          inventory: { ...updatedInventory },
          crystals,
          coins,
        },
      },
      updatedBattleRewards,
    };
  };

  // Memoized onAutoTurn to prevent unnecessary re-creations
  const onAutoTurn = useCallback(
    (player: BattleCharacter) => {
      let skillId = charactersAutoSelection[player.id];
      if (!skillId) {
        skillId =
          player.skills[Math.floor(Math.random() * player.skills.length)].id;
        setCharactersAutoSelection((prev) => ({
          ...prev,
          [player.id]: skillId,
        }));
      }

      if (battleEngine?.canUseSkill(skillId, player.id)) {
        battleEngine.takeTurn("skill", skillId);
        // After using a skill, randomly pick a *new* skill for the *next* turn of this character
        setCharactersAutoSelection((prev) => ({
          ...prev,
          [player.id]:
            player.skills[Math.floor(Math.random() * player.skills.length)].id,
        }));
      } else if (battleEngine?.canAttack(player.id)) {
        battleEngine?.takeTurn("attack");
      } else {
        battleEngine?.takeTurn("endTurn");
      }

      // After the action, update the game engine to reflect the battle state change
      updateGameEngine((engine) => ({
        ...engine,
        battleEngine: battleEngine?.getNewInstance() || null,
      }));

      setWaitingOnAutoAction(false); // Action completed, no longer waiting
    },
    [battleEngine, charactersAutoSelection, updateGameEngine],
  ); // Dependencies for useCallback

  // Auto mode effect
  useEffect(() => {
    const currentPlayer = battleEngine?.getCurrentTurnCharacter() || null;
    const enemyExists = battleState?.enemyTeam.some((c) => c.isAlive);

    if (
      auto &&
      battleState?.battlePhase === "combat" &&
      currentPlayer &&
      currentPlayer.isPlayer &&
      enemyExists &&
      !waitingOnAutoAction
    ) {
      setWaitingOnAutoAction(true); // Indicate we are processing an auto action

      setTimeout(() => {
        onAutoTurn(currentPlayer);
      }, AUTO_WAIT_TIME);
    }
  }, [
    auto,
    battleEngine, // This dependency ensures the effect re-runs after an enemy turn
    onAutoTurn, // Depend on the memoized onAutoTurn
    waitingOnAutoAction, // To re-evaluate when `waitingOnAutoAction` becomes false
  ]);

  if (!battleEngine) return null;
  if (!battleState) return null;

  const currentCharacter = battleEngine.getCurrentTurnCharacter();
  const isPlayerTurn = (currentCharacter?.isPlayer || false) && !auto;

  // Timeline: show turn order and who has acted this round
  const aliveCharacters = [
    ...battleState.playerTeam,
    ...battleState.enemyTeam,
  ].filter((c) => c.isAlive);
  const activatedCharacterIds = battleState.activatedCharactersThisRound;
  const timeline = aliveCharacters
    .sort(
      (a, b) =>
        calculateStat(StatType.speed, b) - calculateStat(StatType.speed, a),
    )
    .map((char) => {
      const acted = activatedCharacterIds.some((id) => id === char.id);
      return (
        <div
          key={char.id}
          className={`
            flex flex-col items-center justify-center text-center
            mx-1 p-1 rounded-md transition-all duration-300
            ${acted ? "opacity-50" : "opacity-100"}
            ${char.id === currentCharacter?.id ? "ring-2 ring-yellow-300 ring-offset-1 ring-offset-blue-900 transform scale-105" : ""}
            ${battleState.playerTeam.some((pc) => pc.id === char.id) ? "text-yellow-400" : "text-red-400"}
          `}
        >
          <img
            src={`https://placehold.co/30x30/6B7280/FFFFFF?text=${char.name.charAt(0)}`}
            alt={char.name}
            className="w-8 h-8 rounded-full border border-gray-600 object-cover mb-1"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/30x30/6B7280/FFFFFF?text=${char.name.charAt(0)}`;
            }}
          />
          <span className="text-xs font-semibold leading-tight">
            {char.name}
          </span>
        </div>
      );
    });

  // Helper for info panel
  const renderCharInfo = (char: BattleCharacter) => {
    const charHealth = adjustedStat(StatType.health, char);
    const healthPercentage = Math.max(
      0,
      ((charHealth - char.damage) / charHealth) * 100,
    );
    const energyPercentage = Math.max(
      0,
      (char.stats[StatType.energy] / (char.stats[StatType.energy] || 1)) * 100,
    ); // Prevent division by zero

    const healthColor =
      healthPercentage > 50
        ? "bg-green-500"
        : healthPercentage > 20
          ? "bg-yellow-500"
          : "bg-red-500";
    const energyColor = "bg-blue-500";

    const isActiveTurn = currentCharacter?.id === char.id;

    return (
      <div
        key={char.id}
        className={`
          relative bg-gray-800 rounded-xl p-4 text-white shadow-lg border-2
          ${char.isAlive ? (isActiveTurn ? "border-yellow-400 ring-2 ring-yellow-400" : "border-blue-700") : "border-gray-600 opacity-50"}
          w-full sm:w-auto flex-grow transition-all duration-300 transform
          ${isActiveTurn ? "scale-105" : "scale-100"}
        `}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <img
              src={`https://placehold.co/40x40/6B7280/FFFFFF?text=${char.name.charAt(0)}`}
              alt={char.name}
              className="w-10 h-10 rounded-full border-2 border-gray-600 object-cover mr-3"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://placehold.co/40x40/6B7280/FFFFFF?text=${char.name.charAt(0)}`;
              }}
            />
            <div>
              <div className="text-lg font-bold leading-tight">
                {char.name} (Lv.{char.level})
              </div>
              <div
                className={`text-sm font-semibold ${getRarityTextColorClass(char.rarity)} flex items-center`}
              >
                {RarityIcons[char.rarity]}
                <span className="ml-1">{char.rarity.toUpperCase()}</span>
              </div>
            </div>
          </div>
          {/* Status Effects Icons */}
          {Object.keys(char.statusEffects).length > 0 && (
            <div className="flex flex-wrap justify-end space-x-1 ml-2">
              {Object.values(char.statusEffects).map((effect, idx) => (
                <span
                  key={idx}
                  className="flex items-center text-xl"
                  title={`${effect.type} (${effect.duration} turns)`}
                >
                  {StatusEffectIcons[effect.type]}
                  {effect.value !== 0 && (
                    <span className="text-xs ml-0.5 font-semibold">
                      {effect.type === StatusEffectType.poison
                        ? `${effect.value} dmg`
                        : effect.value}
                    </span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Health Bar */}
        <div className="mb-2">
          <div className="flex items-center text-sm mb-0.5">
            <span className="mr-2 text-red-600">
              {StatIcons[StatType.health]}
            </span>{" "}
            HP:
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 relative">
            <div
              className={`${healthColor} h-4 rounded-full transition-all duration-300`}
              style={{ width: `${healthPercentage}%` }}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
              {Math.max(0, Math.floor(charHealth - char.damage))}/{charHealth}
            </span>
          </div>
        </div>
        {/* Energy Bar */}
        <div className="mb-3">
          <div className="flex items-center text-sm mb-0.5">
            <span className="mr-2 text-yellow-400">
              {StatIcons[StatType.energy]}
            </span>{" "}
            Energy:
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 relative">
            <div
              className={`${energyColor} h-4 rounded-full transition-all duration-300`}
              style={{ width: `${energyPercentage}%` }}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
              {Math.floor(char.stats[StatType.energy])}
            </span>
          </div>
        </div>

        {/* Affinities */}
        <div className="flex justify-between text-xs">
          <div>
            <div className="flex flex-wrap gap-1">
              {char.strongAffinities.length > 0 ? (
                char.strongAffinities.map((affinity) => (
                  <span
                    key={affinity}
                    className="flex items-center bg-green-900 px-2 py-0.5 rounded-full"
                  >
                    {AffinityIcons[affinity as AffinityType] || "❓"}
                    <span className="ml-1 capitalize">{affinity}</span>
                  </span>
                ))
              ) : (
                <span className="text-gray-400">None</span>
              )}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap gap-1 justify-end">
              {char.weakAffinities.length > 0 ? (
                char.weakAffinities.map((affinity) => (
                  <span
                    key={affinity}
                    className="flex items-center bg-red-900 px-2 py-0.5 rounded-full"
                  >
                    {AffinityIcons[affinity as AffinityType] || "❓"}
                    <span className="ml-1 capitalize">{affinity}</span>
                  </span>
                ))
              ) : (
                <span className="text-gray-400">None</span>
              )}
            </div>
          </div>
        </div>

        {!char.isAlive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-xl text-red-500 text-2xl font-bold">
            DEFEATED
          </div>
        )}
      </div>
    );
  };

  // Ability grid
  const renderAbilityGrid = (player: BattleCharacter) => {
    const adjustedStrength = adjustedStat(StatType.strength, player);
    const abilities = [
      {
        key: "basic",
        name: "Basic Attack",
        onClick: () => {
          battleEngine.takeTurn("attack");
          updateGameEngine((engine) => ({
            ...engine,
            battleEngine: battleEngine?.getNewInstance(),
          }));
        },
        disabled: false,
        desc: `Basic Attack: ${adjustedStrength} damage`,
        bgColor: "bg-green-600",
        cost: 0,
        costStat: StatType.energy,
        isUltimate: false,
        cooldown: 0,
      },
      ...(player.skills || []).map((skill) => ({
        key: skill.id,
        name: skill.name,
        onClick: () => {
          battleEngine.takeTurn("skill", skill.id);
          updateGameEngine((engine) => ({
            ...engine,
            battleEngine: battleEngine?.getNewInstance(),
          }));
        },
        disabled: !battleEngine.canUseSkill(skill.id, player.id),
        desc: `(Cost: ${skill.cost || 0} ${skill.costStat || "energy"})`,
        bgColor: ABILITY_BG_COLOR[skill.effects[0].type] || "bg-gray-600",
        cost: skill.cost || 0,
        costStat: skill.costStat || StatType.energy,
        isUltimate: false,
        cooldown: battleEngine.getSkillCooldown(player.id, skill.id),
      })),
      {
        key: "end_turn",
        name: "End Turn",
        onClick: () => {
          battleEngine.takeTurn("endTurn");
          updateGameEngine((engine) => ({
            ...engine,
            battleEngine: battleEngine?.getNewInstance(),
          }));
        },
        disabled: false,
        desc: `End turn without taking an action`,
        bgColor: "bg-orange-600",
        cost: 0,
        costStat: StatType.energy,
        isUltimate: false,
        cooldown: 0,
      },
    ];
    // Pad to 4 columns
    while (abilities.length < 4)
      abilities.push({
        key: `empty${abilities.length}`,
        name: "",
        onClick: () => {},
        disabled: true,
        desc: "",
        bgColor: "bg-transparent", // Use transparent background for empty slots
        cost: 0,
        costStat: StatType.energy,
        isUltimate: false,
        cooldown: 0,
      });
    return (
      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-4 mx-auto max-w-3xl
        "
      >
        {abilities.map((ab, i) => (
          <div
            className={`relative flex flex-col items-center ${ab.isUltimate ? "col-span-full" : ""}`}
          >
            <button
              onClick={ab.onClick}
              disabled={ab.disabled}
              className={`
              ${ab.bgColor} text-white font-bold text-base
              min-w-[8rem] min-h-[3rem] rounded-lg mb-1 px-4 py-2
              ${ab.disabled ? "opacity-50 border border-gray-400 cursor-not-allowed" : "hover:bg-opacity-80 cursor-pointer"}
              transition-colors duration-200 relative overflow-hidden
              ${ab.isUltimate ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 animate-pulse-glow" : ""}
              shadow-md hover:shadow-lg active:scale-95
              flex flex-col items-center justify-center
            `}
            >
              {/* Ability Name */}
              <span className="relative z-10 text-center">
                {ab.cooldown > 0 ? `CD: ${ab.cooldown}` : ab.name}
              </span>

              {/* Cost on a new line below the name */}
              {ab.cost > 0 && (
                <span
                  className={`relative z-10 text-xs font-semibold mt-1 flex items-center justify-center text-blue-300`}
                >
                  {StatIcons[ab.costStat]}{" "}
                  <span className="ml-1">{ab.cost}</span>
                </span>
              )}
            </button>
            <div className="text-sm text-gray-300 text-center min-h-[2.25rem]">
              {ab.desc}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Only show the result message and continue button if battle is over
  const isBattleOver =
    battleState.battlePhase === "victory" ||
    battleState.battlePhase === "defeat";

  // Helper: calculate XP gain for victory
  function getVictoryXp() {
    const playerChars = battleState?.playerTeam || [];
    const enemyChars = battleState?.enemyTeam || [];
    return calculateBattleXp(playerChars, enemyChars);
  }

  // Render a single reward card
  const renderRewardCard = (reward: Reward, index: number) => {
    const commonCardClasses = `
      bg-gray-800 rounded-xl p-4 shadow-xl text-center
      flex flex-col items-center justify-center
      animate-fade-in animate-scale-in
    `;
    const animationDelay = { animationDelay: `${index * 0.1}s` }; // Staggered animation

    switch (reward.type) {
      case RewardType.exp:
        const expReward = reward as ExpReward;
        return (
          <div
            key={index}
            className={`${commonCardClasses} border-2 border-green-500`}
            style={animationDelay}
          >
            <div className="text-5xl text-green-400 mb-2">{<HiSparkles />}</div>
            <h3 className="text-xl font-bold text-white mb-1">Experience</h3>
            <p className="text-lg text-green-300">+{expReward.amount} XP</p>
          </div>
        );
      case RewardType.coins:
        const coinsReward = reward as CoinsReward;
        return (
          <div
            key={index}
            className={`${commonCardClasses} border-2 border-yellow-500`}
            style={animationDelay}
          >
            <div className="text-5xl text-yellow-400 mb-2">{COIN_ICON}</div>
            <h3 className="text-xl font-bold text-white mb-1">Coins</h3>
            <p className="text-lg text-yellow-300">+{coinsReward.amount}</p>
          </div>
        );
      case RewardType.crystal:
        const crystalReward = reward as CrystalReward;
        return (
          <div
            key={index}
            className={`${commonCardClasses} border-2 border-purple-500`}
            style={animationDelay}
          >
            <div className="text-5xl text-purple-400 mb-2">
              {<FaGem className="text-orange-700" />}
            </div>
            <h3 className="text-xl font-bold text-white mb-1">Crystals</h3>
            <p className="text-lg text-purple-300">+{crystalReward.amount}</p>
          </div>
        );
      case RewardType.item:
        const itemReward = reward as ItemReward;
        const item = itemReward.item;
        if (!item) return null;
        const itemBorderClass = RARITY_COLORS[item.rarity] || "border-gray-500";
        const itemTextColorClass = getRarityTextColorClass(item.rarity);
        return (
          <div
            key={index}
            className={`${commonCardClasses} ${itemBorderClass}`}
            style={animationDelay}
          >
            <div className={`text-5xl ${itemTextColorClass}  mb-2`}>
              {getItemIcon(item.id)}
            </div>
            <h3 className="text-xl font-bold text-white mb-1 capitalize">
              {item.name}
            </h3>
            <p className={`text-lg ${itemTextColorClass}`}>+{item.quantity}</p>
          </div>
        );
      case RewardType.equipment:
        const equipmentReward = reward as EquipmentReward;
        const equipment = equipmentReward.equipment;
        if (!equipment) return null;
        const rarityBorderClass =
          RARITY_COLORS[equipment.rarity] || "border-gray-500";
        const rarityTextColorClass = getRarityTextColorClass(equipment.rarity);

        return (
          <div
            key={index}
            className={`
              ${commonCardClasses} ${rarityBorderClass}
              transform hover:scale-102 transition-transform duration-200
            `}
            style={animationDelay}
          >
            <div className="flex justify-between items-start w-full mb-2">
              <h3 className="text-lg font-bold text-white leading-tight">
                {equipment.name}
              </h3>
              <div className="flex items-center text-sm text-gray-300 ml-1">
                Lv.{" "}
                <span className="font-bold text-yellow-300 ml-1">
                  {equipment.level}
                </span>
              </div>
            </div>

            <div
              className={`text-sm font-semibold mb-2 ${rarityTextColorClass} flex items-center`}
            >
              {RarityIcons[equipment.rarity]}
              <span className="ml-1">{equipment.rarity.toUpperCase()}</span>
            </div>

            <div className="mb-2 flex items-center text-base">
              {EQUIPMENT_TYPE_ICONS[equipment.equipmentType]}
              <span className="ml-1 capitalize">{equipment.equipmentType}</span>
            </div>

            {/* Main Stats */}
            {equipment.mainBoosts.length > 0 && (
              <div className="w-full text-left mb-1">
                <h4 className="text-xs font-semibold text-green-300 mb-0.5">
                  Main Stats:
                </h4>
                {equipment.mainBoosts.map((boost, idx) => (
                  <div
                    key={idx}
                    className="flex items-center text-green-200 text-xs"
                  >
                    {StatIcons[boost.statType]}
                    <span className="ml-1">
                      {formatStatValue(boost, equipment.level, true)}{" "}
                      {StatType[boost.statType]}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Sub Stats */}
            {equipment.subBoosts.length > 0 && (
              <div className="w-full text-left">
                <h4 className="text-xs font-semibold text-gray-400 mb-0.5">
                  Sub Stats:
                </h4>
                {equipment.subBoosts.map((boost, idx) => (
                  <div
                    key={idx}
                    className="flex items-center text-gray-300 text-xs"
                  >
                    {StatIcons[boost.statType]}
                    <span className="ml-1">
                      {formatStatValue(boost, equipment.level, false)}{" "}
                      {StatType[boost.statType]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (isBattleOver) {
    const { updatedGameEngine, updatedBattleRewards } = addRewardsToGameEngine(
      gameEngine,
      battleState,
    );

    const handleVictory = () => {
      updateGameEngine((engine) => {
        return {
          ...engine,
          ...updatedGameEngine,
        };
      });
      if (onVictory) onVictory();
    };

    return (
      <div className="max-w-4xl mx-auto p-6 bg-blue-900 text-white rounded-lg shadow-lg animate-fade-in">
        <style>{`
          @keyframes bounce-once {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-15px); }
            60% { transform: translateY(-7px); }
          }
          @keyframes scale-in {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
        {battleState.battlePhase === "victory" && (
          <div className="text-center mt-8">
            <h2 className="text-yellow-400 text-3xl font-bold mb-3 animate-bounce-once">
              Victory!
            </h2>
            <div className="text-5xl mb-4 animate-scale-in">🏆</div>{" "}
            {/* Victory Icon */}
            {/* Rewards Section */}
            <h3 className="text-2xl font-semibold text-yellow-300 mb-4">
              Rewards
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {updatedBattleRewards.map(renderRewardCard)}
            </div>
            {battleState.xpLogs &&
              battleState.xpLogs.map((msg, i) => (
                <div key={i} className="text-sm text-gray-300">
                  {msg}
                </div>
              ))}
            <button
              onClick={handleVictory}
              className="
              mt-4 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold
              rounded-lg min-w-[7.5rem] min-h-[2.5rem] border-none cursor-pointer
              shadow-md transition-colors duration-200
            "
            >
              Continue
            </button>
          </div>
        )}
        {battleState.battlePhase === "defeat" && (
          <div className="text-center mt-8">
            <h2 className="text-red-500 text-3xl font-bold mb-3 animate-shake">
              Defeat!
            </h2>
            <div className="text-5xl mb-4 animate-scale-in">💀</div>{" "}
            {/* Defeat Icon */}
            {onDefeat && (
              <button
                onClick={onDefeat}
                className="
                  mt-4 bg-red-600 hover:bg-red-700 text-white font-bold
                  rounded-lg min-w-[7.5rem] min-h-[2.5rem] border-none cursor-pointer
                  shadow-md transition-colors duration-200
                "
              >
                Retry
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-blue-900 text-white rounded-lg shadow-lg font-inter">
      <div className="mb-4 text-center">
        <strong className="text-lg font-semibold text-yellow-300">
          Round {battleState.round}:
        </strong>{" "}
        <div className="flex flex-wrap justify-center items-center mt-2">
          {timeline}
        </div>
      </div>

      {/* Teams Display */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10 mb-8 w-full">
        <div className="w-full sm:w-1/2 flex flex-col items-center">
          <h4 className="text-center text-3xl font-extrabold mb-4 text-yellow-300">
            Your Team
          </h4>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {battleState.playerTeam.map((char) => renderCharInfo(char))}
          </div>
        </div>

        <div className="hidden sm:flex items-center justify-center text-6xl font-extrabold text-red-500 mx-4">
          VS
        </div>

        <div className="w-full sm:w-1/2 flex flex-col items-center">
          <h4 className="text-center text-3xl font-extrabold mb-4 text-red-400">
            Enemies
          </h4>
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {battleState.enemyTeam.map((char) => renderCharInfo(char))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6 my-4">
        <button
          onClick={() =>
            updateGameEngine((engine) => ({
              ...engine,
              player: { ...engine.player, autoBattle: !auto },
            }))
          }
          className={`
            font-bold rounded-lg min-w-[7.5rem] min-h-[2.5rem] border-none cursor-pointer
            transition-colors duration-200 shadow-md
            ${auto ? "bg-green-600 text-white shadow-green-500/50" : "bg-gray-700 text-white"}
          `}
        >
          {auto ? "Auto: ON" : "Auto: OFF"}
        </button>
        <button
          onClick={() => {
            if (onFlee) onFlee();
          }}
          className="
            bg-gray-700 hover:bg-gray-600 text-white font-bold
            rounded-lg min-w-[7.5rem] min-h-[2.5rem] border-none cursor-pointer
            shadow-md transition-colors duration-200
          "
        >
          Flee
        </button>
      </div>
      {isPlayerTurn && currentCharacter && currentCharacter.isAlive && (
        <div className="mb-4">
          <h4 className="text-center text-xl font-semibold mb-3 text-yellow-300">
            Abilities for {currentCharacter.name}
          </h4>
          {renderAbilityGrid(currentCharacter)}
        </div>
      )}
      <div className="my-6">
        <h4 className="text-center text-xl font-semibold mb-2 text-yellow-300">
          Battle Log
        </h4>
        <div
          className="
            bg-gray-800 text-white rounded-lg p-3
            min-h-[5rem] max-h-[11.25rem] overflow-y-auto text-sm
            shadow-lg
          "
        >
          {battleState.battleLog.slice(-8).map((msg, i) => {
            let textColor = "text-gray-300"; // Default color
            if (msg.includes("attacks") || msg.includes("uses")) {
              if (msg.includes("Hero") || msg.includes("Mage")) {
                // Assuming player names
                textColor = "text-green-300";
              } else if (msg.includes("Goblin") || msg.includes("Orc")) {
                // Assuming enemy names
                textColor = "text-red-300";
              }
            } else if (msg.includes("defeated!")) {
              textColor = "text-yellow-300";
            } else if (msg.includes("gained XP!")) {
              textColor = "text-yellow-400";
            }
            return (
              <div key={i} className={textColor}>
                {msg}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BattleDisplay;
