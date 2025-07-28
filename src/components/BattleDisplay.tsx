import { levelUp } from "data/leveling";
import React, { useCallback, useEffect, useState } from "react";
import { BattleCharacter, calculateBattleXp } from "../battle";
import { useGameEngine } from "../context/GameEngineContext";
import { adjustedStat, calculateStat } from "../data/statUtils";
import { StatType } from "../types/stats";

const AUTO_WAIT_TIME = 1500; // Time in ms for auto actions

interface BattleDisplayProps {
  onVictory?: () => void;
  onDefeat?: () => void;
  onFlee?: () => void;
}

const BattleDisplay: React.FC<BattleDisplayProps> = ({
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
        console.log("Auto-using skill:", skillId, "for", player.name);
        battleEngine.takeTurn("skill", skillId);
        // After using a skill, randomly pick a *new* skill for the *next* turn of this character
        setCharactersAutoSelection((prev) => ({
          ...prev,
          [player.id]:
            player.skills[Math.floor(Math.random() * player.skills.length)].id,
        }));
      } else if (battleEngine?.canAttack(player.id)) {
        console.log("Auto-basic attacking for", player.name);
        battleEngine?.takeTurn("attack");
      } else {
        console.log("Auto end turn for", player.name);
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
        console.log("Initiating auto turn sequence for:", currentPlayer.name);
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

    return (
      <div
        key={Math.random()}
        className={`
          mb-2 p-2 rounded-lg transition-all duration-300
          ${char.isAlive ? "text-white" : "text-gray-400 opacity-70"}
          ${currentCharacter?.id === char.id ? "font-bold bg-white bg-opacity-10 ring-2 ring-yellow-300 ring-offset-1 ring-offset-blue-900" : "font-normal"}
        `}
      >
        <div className="text-center text-lg mb-1">
          {char.name} (Lv.{char.level})
        </div>
        {/* Health Bar */}
        <div className="flex items-center mb-1">
          <span className="text-sm mr-2 w-12 text-right">HP:</span>
          <div className="flex-grow bg-gray-700 rounded-full h-3 relative">
            <div
              className="bg-red-500 h-3 rounded-full"
              style={{ width: `${healthPercentage}%` }}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
              {Math.floor(charHealth - char.damage)}/{charHealth}
            </span>
          </div>
        </div>
        {/* Energy Bar */}
        <div className="flex items-center">
          <span className="text-sm mr-2 w-12 text-right">Energy:</span>
          <div className="flex-grow bg-gray-700 rounded-full h-3 relative">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: `${energyPercentage}%` }}
            ></div>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
              {char.stats[StatType.energy]}
            </span>
          </div>
        </div>
        {!char.isAlive && (
          <div className="text-center text-red-400 text-sm mt-1">(KO)</div>
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
        bgColor: "bg-gray-600",
        cost: skill.cost || 0,
        costStat: skill.costStat || StatType.energy,
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
      });
    return (
      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          gap-4 mx-auto max-w-3xl
        "
      >
        {abilities.map((ab, i) => (
          <div key={ab.key} className="relative flex flex-col items-center">
            <button
              onClick={ab.onClick}
              disabled={ab.disabled}
              className={`
                ${ab.bgColor} text-white font-bold text-base
                min-w-[8rem] min-h-[2.5rem] rounded-lg mb-1
                ${ab.disabled ? "opacity-50 border border-gray-400 cursor-not-allowed" : "hover:bg-opacity-80 cursor-pointer"}
                transition-colors duration-200 relative overflow-hidden
              `}
            >
              {ab.name}
              {ab.cost > 0 && (
                <span
                  className={`absolute bottom-1 right-1 text-xs font-normal px-1 py-0.5 rounded-md
                  ${player.stats[ab.costStat] < ab.cost ? "bg-red-700" : "bg-gray-900"}
                `}
                >
                  {ab.cost} {ab.costStat === StatType.energy ? "E" : ""}
                </span>
              )}
            </button>
            <div className="text-sm text-white text-center min-h-[2.25rem]">
              {ab.desc}
            </div>
            {ab.disabled && (
              <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg flex items-center justify-center text-gray-300 font-bold text-lg pointer-events-none">
                Disabled
              </div>
            )}
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

  if (isBattleOver) {
    const handleVictory = () => {
      const xpGained = getVictoryXp();
      updateGameEngine((engine) => {
        let updatedCharacterProgress = { ...engine.player.characterProgress };
        battleState.playerTeam.forEach((char: { id: string | number }) => {
          let characterToUpdate = updatedCharacterProgress[char.id];
          if (!characterToUpdate) {
            characterToUpdate = {
              level: 1,
              xp: 0,
              shards: 0,
            };
          }
          updatedCharacterProgress[char.id] = levelUp({
            ...characterToUpdate,
            xp: (characterToUpdate.xp || 0) + xpGained,
          });
        });

        return {
          ...engine,
          player: {
            ...engine.player,
            characterProgress: updatedCharacterProgress,
          },
        };
      });
      if (onVictory) onVictory();
    };
    return (
      <div className="max-w-3xl mx-auto p-6 bg-blue-900 text-white rounded-lg shadow-lg animate-fade-in">
        {battleState.battlePhase === "victory" && (
          <div className="text-center mt-8">
            <h2 className="text-yellow-400 text-3xl font-bold mb-3 animate-bounce-once">
              Victory!
            </h2>
            <div className="text-5xl mb-4 animate-scale-in">🏆</div>{" "}
            {/* Victory Icon */}
            <div className="mb-2">
              {`Each character gained ${getVictoryXp()} XP!`}
            </div>
            {battleState.xpLogs &&
              battleState.xpLogs.map((msg, i) => <div key={i}>{msg}</div>)}
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
          Timeline:
        </strong>{" "}
        <div className="flex flex-wrap justify-center items-center mt-2">
          {timeline}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 mb-4">
        <div className="w-full sm:w-1/2">
          <h4 className="text-center text-xl font-semibold mb-2 text-yellow-300">
            Your Team
          </h4>
          {battleState.playerTeam.map(renderCharInfo)}
        </div>
        <div className="w-full sm:w-1/2">
          <h4 className="text-center text-xl font-semibold mb-2 text-yellow-300">
            Enemies
          </h4>
          {battleState.enemyTeam.map(renderCharInfo)}
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
