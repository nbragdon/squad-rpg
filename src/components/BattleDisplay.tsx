import React, { useEffect, useState } from "react";
import { calculateBattleXp } from "../battle/battleEngine";
import { BattleCharacter } from "../battle/battleTypes";
import { useGameEngine } from "../context/GameEngineContext";
import { levelUp } from "../data/leveling";
import { calculateStat } from "../data/statUtils";
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

  const battleEngine = gameEngine.battleEngine;
  const battleState = battleEngine?.getState();
  const auto = gameEngine.player.autoBattle;

  const charactersAutoSelection: { [key: string]: string } = {};

  const onAutoTurn = (player: BattleCharacter) => {
    if (!charactersAutoSelection[player.id]) {
      // if no skill selected, randomly pick an available skill
      charactersAutoSelection[player.id] =
        player.skills[Math.floor(Math.random() * player.skills.length)].id;
    }
    const skillId = charactersAutoSelection[player.id];
    // if can afford to use the skill, use it otherwise use basic attack
    const skill = player.skills.find((s) => s.id === skillId);
    const skillStat = skill?.costStat || StatType.energy;
    const skillCost = skill?.cost || 0;
    if (player.stats[skillStat] >= skillCost) {
      battleEngine?.useSkill(skillId, player.id);
      charactersAutoSelection[player.id] =
        player.skills[Math.floor(Math.random() * player.skills.length)].id;
    } else {
      battleEngine?.attack(player.id);
    }
  };

  // Auto mode effect
  useEffect(() => {
    if (
      auto &&
      battleState?.battlePhase === "combat" &&
      battleEngine?.getCurrentTeamTurn() === "player"
    ) {
      const player = battleEngine.getCurrentTurnCharacter();
      const enemy = battleState.enemyTeam.find((c) => c.isAlive);
      if (player && enemy && !waitingOnAutoAction) {
        setWaitingOnAutoAction(true);
        setTimeout(() => {
          console.log("auto turn", waitingOnAutoAction);
          onAutoTurn(player);
          updateGameEngine((engine) => ({
            ...engine,
            battleEngine: battleEngine?.getNewInstance(),
          }));
          setWaitingOnAutoAction(false);
        }, AUTO_WAIT_TIME);
      }
    }
  }, [auto, battleState, battleEngine]);

  if (!battleEngine) return null;
  if (!battleState) return null;

  const currentCharacter = battleEngine.getCurrentTurnCharacter();
  const isPlayerTurn =
    battleEngine.getCurrentTeamTurn() === "player" && currentCharacter && !auto;

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
        <span
          key={char.id}
          style={{
            marginRight: 8,
            opacity: acted ? 0.5 : 1,
            fontWeight: char.id === currentCharacter?.id ? "bold" : "normal",
            color: battleState.playerTeam.some((pc) => pc.id === char.id)
              ? "#ffd700"
              : "#ff6666",
            textShadow:
              char.id === currentCharacter?.id ? "0 0 8px #fff" : undefined,
          }}
        >
          {char.name}
        </span>
      );
    });

  // Helper for info panel
  const renderCharInfo = (char: BattleCharacter) => (
    <div
      key={char.id}
      style={{
        marginBottom: 6,
        color: char.isAlive ? "#fff" : "#888",
        textAlign: "center",
        fontWeight: currentCharacter?.id === char.id ? "bold" : "normal",
        background:
          currentCharacter?.id === char.id ? "rgba(255,255,255,0.08)" : "none",
        borderRadius: 6,
        padding: 4,
      }}
    >
      {char.name} (Lv.{char.level})<br />
      HP: {char.stats[StatType.health] - char.damage}/
      {char.stats[StatType.health]} &nbsp;|&nbsp; Energy:{" "}
      {char.stats[StatType.energy]} {char.isAlive ? "" : "(KO)"}
    </div>
  );

  // Ability grid
  const renderAbilityGrid = (player: BattleCharacter) => {
    const abilities = [
      {
        key: "basic",
        name: "Basic Attack",
        onClick: () => {
          battleEngine.attack(player.id);
          updateGameEngine((engine) => ({
            ...engine,
            battleEngine: battleEngine?.getNewInstance(),
          }));
        },
        disabled: false,
        desc: `Basic Attack: ${player.stats[StatType.strength]} damage`,
        style: { background: "#4caf50", color: "#fff" },
      },
      ...(player.skills || []).map((skill) => ({
        key: skill.id,
        name: skill.name,
        onClick: () => {
          battleEngine.useSkill(skill.id, player.id);
          updateGameEngine((engine) => ({
            ...engine,
            battleEngine: battleEngine?.getNewInstance(),
          }));
        },
        disabled:
          player.stats[skill.costStat || StatType.energy] < (skill.cost || 0),
        desc: `(Cost: ${skill.cost || 0} ${skill.costStat || "energy"})`,
        style: { background: "#666", color: "#fff" },
      })),
    ];
    // Pad to 4 columns
    while (abilities.length < 4)
      abilities.push({
        key: `empty${abilities.length}`,
        name: "",
        onClick: () => {},
        disabled: true,
        desc: "",
        style: { background: "none", color: "#fff" },
      });
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          margin: "0 auto",
          maxWidth: 700,
        }}
      >
        {abilities.map((ab, i) => (
          <div
            key={ab.key}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              onClick={ab.onClick}
              disabled={ab.disabled}
              style={{
                ...ab.style,
                minWidth: 120,
                minHeight: 40,
                borderRadius: 8,
                marginBottom: 6,
                opacity: ab.disabled ? 0.5 : 1,
                border: ab.disabled ? "1px solid #aaa" : "none",
                cursor: ab.disabled ? "not-allowed" : "pointer",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {ab.name}
            </button>
            <div
              style={{
                fontSize: 13,
                color: "#fff",
                textAlign: "center",
                minHeight: 36,
              }}
            >
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

  if (isBattleOver) {
    const handleVictory = () => {
      const xpGained = getVictoryXp();
      updateGameEngine((engine) => {
        // loop through battle characters and find the matching id in the character collection and update their xp
        const updatedCharacterProgress = { ...engine.player.characterProgress };
        battleState.playerTeam.forEach((char: { id: string | number }) => {
          let characterToUpdate = updatedCharacterProgress[char.id];
          characterToUpdate.xp = (characterToUpdate.xp || 0) + xpGained;
          characterToUpdate = levelUp(characterToUpdate);
          updatedCharacterProgress[char.id] = characterToUpdate;
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
      <div
        className="battle-display"
        style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}
      >
        {battleState.battlePhase === "victory" && (
          <div
            className="battle-result victory"
            style={{ textAlign: "center", marginTop: 32 }}
          >
            <h2 style={{ color: "#ffd700", marginBottom: 12 }}>Victory!</h2>
            <div style={{ marginBottom: 8 }}>
              {`Each character gained ${getVictoryXp()} XP!`}
            </div>
            {battleState.xpLogs &&
              battleState.xpLogs.map((msg, i) => <div key={i}>{msg}</div>)}
            <button
              onClick={handleVictory}
              style={{
                marginTop: 16,
                background: "#ffd700",
                color: "#222",
                fontWeight: "bold",
                borderRadius: 8,
                minWidth: 120,
                minHeight: 40,
                border: "none",
                cursor: "pointer",
              }}
            >
              Continue
            </button>
          </div>
        )}
        {battleState.battlePhase === "defeat" && (
          <div
            className="battle-result defeat"
            style={{ textAlign: "center", marginTop: 32 }}
          >
            <h2 style={{ color: "#ff6666", marginBottom: 12 }}>Defeat!</h2>
            {onDefeat && (
              <button
                onClick={onDefeat}
                style={{
                  marginTop: 16,
                  background: "#ff6666",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 8,
                  minWidth: 120,
                  minHeight: 40,
                  border: "none",
                  cursor: "pointer",
                }}
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
    <div
      className="battle-display"
      style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}
    >
      <div style={{ marginBottom: 18, textAlign: "center" }}>
        <strong style={{ fontSize: 18 }}>Timeline:</strong> {timeline}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 64,
          marginBottom: 18,
        }}
      >
        <div>
          <h4 style={{ textAlign: "center", marginBottom: 8 }}>Your Team</h4>
          {battleState.playerTeam.map(renderCharInfo)}
        </div>
        <div>
          <h4 style={{ textAlign: "center", marginBottom: 8 }}>Enemies</h4>
          {battleState.enemyTeam.map(renderCharInfo)}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 24,
          margin: "18px 0",
        }}
      >
        <button
          onClick={() =>
            updateGameEngine((engine) => ({
              ...engine,
              player: { ...engine.player, autoBattle: !auto },
            }))
          }
          style={{
            background: auto ? "#4caf50" : "#333",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 8,
            minWidth: 120,
            minHeight: 40,
            boxShadow: auto ? "0 0 8px #4caf50" : undefined,
            border: "none",
            cursor: "pointer",
            marginRight: 8,
          }}
        >
          {auto ? "Auto: ON" : "Auto: OFF"}
        </button>
        <button
          onClick={() => {
            if (onFlee) onFlee();
          }}
          style={{
            background: "#444",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 8,
            minWidth: 120,
            minHeight: 40,
            border: "none",
            cursor: "pointer",
          }}
        >
          Flee
        </button>
      </div>
      {isPlayerTurn && currentCharacter && currentCharacter.isAlive && (
        <div style={{ marginBottom: 18 }}>
          <h4 style={{ textAlign: "center", marginBottom: 12 }}>
            Abilities for {currentCharacter.name}
          </h4>
          {renderAbilityGrid(currentCharacter)}
        </div>
      )}
      <div style={{ margin: "24px 0" }}>
        <h4 style={{ textAlign: "center", marginBottom: 8 }}>Battle Log</h4>
        <div
          style={{
            background: "#222",
            color: "#fff",
            borderRadius: 8,
            padding: 12,
            minHeight: 80,
            maxHeight: 180,
            overflowY: "auto",
            fontSize: 15,
            boxShadow: "0 2px 8px #0002",
          }}
        >
          {battleState.battleLog.slice(-8).map((msg, i) => (
            <div key={i}>{msg}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BattleDisplay;
