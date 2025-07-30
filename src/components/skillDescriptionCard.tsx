import { calculateStat } from "data/statUtils";
import {
  Skill,
  TargetType,
  DamageSkillEffect,
  HealSkillEffect,
  SkillEffectType,
  ModifierType,
  ApplyStatusEffectSkillEffect,
  AdjustStatSkillEffect,
  CleanseSkillEffect,
} from "types/skillTypes";
import { AllStats } from "types/stats";
import { StatIcons, AffinityIcons } from "./utils";
import { PlayerCharacter } from "types/character";

interface SkillDescriptionCardProps {
  skill: Skill;
  // stats are optional, if provided, damage/heal calculations will be shown
  character: PlayerCharacter;
}

export const SkillDescriptionCard: React.FC<SkillDescriptionCardProps> = ({
  skill,
  character,
}) => {
  const calculateDamageOrHeal = (
    effect: DamageSkillEffect | HealSkillEffect,
    stats: AllStats,
  ): { value: number; calculation: string } => {
    const isDamage = effect.type === SkillEffectType.damage;
    const multiplier = isDamage
      ? (effect as DamageSkillEffect).damageMultiplier
      : (effect as HealSkillEffect).healMultiplier;
    const baseStat = isDamage
      ? (effect as DamageSkillEffect).damageStat
      : (effect as HealSkillEffect).healStat;

    const statValue = calculateStat(baseStat, character);
    const calculatedValue = Math.floor(statValue * multiplier);

    const calculation = `(${statValue} ${baseStat.charAt(0).toUpperCase() + baseStat.slice(1)} * ${multiplier.toFixed(1)})`;

    return { value: calculatedValue, calculation };
  };

  const characterStats = character.stats;

  return (
    <div
      className={`
          bg-gray-800 rounded-lg p-6 shadow-xl
          border-2 border-blue-700
          text-white font-inter w-full max-w-sm mx-auto
          transform hover:scale-102 transition-transform duration-200
        `}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-yellow-300">{skill.name}</h3>
        <div className="text-lg font-semibold text-gray-300 flex items-center">
          {StatIcons[skill.costStat]} {skill.cost}
        </div>
      </div>

      {skill.cooldownTurns !== undefined && skill.cooldownTurns > 0 && (
        <p className="text-sm text-gray-400 mb-3">
          Cooldown: {skill.cooldownTurns} turns
        </p>
      )}

      <div className="mb-4">
        <h4 className="text-lg font-semibold text-blue-300 mb-2">Effects:</h4>
        {skill.effects.map((effect, index) => (
          <div key={index} className="mb-3 p-2 bg-gray-700 rounded-md">
            <div className="flex items-center text-md font-semibold mb-1">
              <span className="capitalize">
                {effect.targetType.replace(/([A-Z])/g, " $1").trim()}
              </span>
              <span className="mx-2 text-gray-400">|</span>
              {effect.affinities.map((affinity, affIndex) => (
                <span key={affIndex} className="mr-1 flex items-center text-sm">
                  {AffinityIcons[affinity]}
                </span>
              ))}
            </div>

            {effect.type === SkillEffectType.damage && (
              <p className="text-green-300 text-sm">
                Deals{" "}
                {characterStats
                  ? `${calculateDamageOrHeal(effect as DamageSkillEffect, characterStats).value} `
                  : ""}
                {effect.affinities.length > 0 ? effect.affinities[0] + " " : ""}
                damage
                {characterStats && (
                  <span className="text-gray-400 ml-1">
                    {
                      calculateDamageOrHeal(
                        effect as DamageSkillEffect,
                        characterStats,
                      ).calculation
                    }
                  </span>
                )}
                .
              </p>
            )}

            {effect.type === SkillEffectType.heal && (
              <p className="text-lime-300 text-sm">
                Heals{" "}
                {characterStats
                  ? `${calculateDamageOrHeal(effect as HealSkillEffect, characterStats).value} `
                  : ""}
                health
                {characterStats && (
                  <span className="text-gray-400 ml-1">
                    {
                      calculateDamageOrHeal(
                        effect as HealSkillEffect,
                        characterStats,
                      ).calculation
                    }
                  </span>
                )}
                .
              </p>
            )}

            {effect.type === SkillEffectType.applyStatusEffect && (
              <p className="text-orange-300 text-sm">
                Applies{" "}
                <span className="font-bold capitalize">
                  {(effect as ApplyStatusEffectSkillEffect).statusEffectType}
                </span>{" "}
                {(effect as ApplyStatusEffectSkillEffect).value &&
                  `(${(effect as ApplyStatusEffectSkillEffect).value}) `}
                status effect
                {(effect as ApplyStatusEffectSkillEffect).duration &&
                  ` for ${(effect as ApplyStatusEffectSkillEffect).duration} turns`}
                .
              </p>
            )}

            {effect.type === SkillEffectType.adjustStat && (
              <p className="text-purple-300 text-sm">
                {(effect as AdjustStatSkillEffect).modifierValue > 0
                  ? "Increases"
                  : "Reduces"}{" "}
                <span className="font-bold capitalize">
                  {(effect as AdjustStatSkillEffect).stat}
                </span>{" "}
                by{" "}
                <span className="font-bold">
                  {(effect as AdjustStatSkillEffect).modifierValue}
                  {(effect as AdjustStatSkillEffect).modifierType ===
                  ModifierType.Percentage
                    ? "%"
                    : ""}
                </span>
                {(effect as AdjustStatSkillEffect).duration &&
                  ` for ${(effect as AdjustStatSkillEffect).duration} turns`}
                .
              </p>
            )}

            {effect.type === SkillEffectType.cleanse && (
              <p className="text-cyan-300 text-sm">
                Cleanses {(effect as CleanseSkillEffect).count}{" "}
                {(effect as CleanseSkillEffect).cleansableEffect} effects.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
