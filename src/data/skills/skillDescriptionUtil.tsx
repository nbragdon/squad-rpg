import {
  AdjustStatSkillEffect,
  ApplyStatusEffectSkillEffect,
  DamageSkillEffect,
  HealSkillEffect,
  ModifierType,
  Skill,
  SkillEffectType,
  TargetType,
} from "../../types/skillTypes";

/**
 * Converts a TargetType enum value into a more readable string.
 * @param targetType The TargetType enum value.
 * @returns A user-friendly string representation of the target.
 */
function getTargetDescription(targetType: TargetType): string {
  switch (targetType) {
    case TargetType.self:
      return "self";
    case TargetType.randomAlly:
      return "a random ally";
    case TargetType.allAllies:
      return "all allies";
    case TargetType.randomEnemy:
      return "a random enemy";
    case TargetType.allEnemies:
      return "all enemies";
    case TargetType.lowestHealthAlly:
      return "the ally with the lowest health";
    case TargetType.lowestHealthEnemy:
      return "the enemy with the lowest health";
    default:
      return "an unknown target";
  }
}

/**
 * A React component that displays a user-friendly description of a Skill.
 * @param {object} props - The component props.
 * @param {Skill} props.skill - The Skill object to describe.
 * @returns {JSX.Element} A React component displaying the skill's details.
 */
export const SkillDescriptionCard: React.FC<{ skill: Skill }> = ({ skill }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6 max-w-md mx-auto font-inter">
      {/* Skill Name */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{skill.name}</h2>

      {/* Cost and Cooldown */}
      <p className="text-gray-600 mb-3">
        Costs <span className="font-semibold text-blue-600">{skill.cost} {skill.costStat}</span>.
        {skill.cooldownTurns !== undefined && (
          <> Has a <span className="font-semibold text-purple-600">{skill.cooldownTurns}-turn</span> cooldown.</>
        )}
      </p>

      {/* Effects Section */}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Effects:</h3>
      {skill.effects.length === 0 ? (
        <p className="text-gray-500 italic">None.</p>
      ) : (
        <ul className="list-inside list-disc space-y-2">
          {skill.effects.map((effect, index) => {
            const targetDesc = getTargetDescription(effect.targetType);
            let effectDescription = "";

            switch (effect.type) {
              case SkillEffectType.damage:
                const damageEffect = effect as DamageSkillEffect;
                effectDescription = `Deals ${damageEffect.damageMultiplier * 100}% of ${damageEffect.damageStat} as ${damageEffect.affinity} damage to ${targetDesc}.`;
                if (damageEffect.duration !== undefined) {
                  effectDescription += ` This effect lasts for ${damageEffect.duration} turns.`;
                }
                break;

              case SkillEffectType.heal:
                const healEffect = effect as HealSkillEffect;
                effectDescription = `Heals ${targetDesc} for ${healEffect.healMultiplier * 100}% of ${healEffect.healStat} as ${healEffect.affinity} healing.`;
                if (healEffect.duration !== undefined) {
                  effectDescription += ` This effect lasts for ${healEffect.duration} turns.`;
                }
                break;

              case SkillEffectType.applyStatusEffect:
                const statusEffect = effect as ApplyStatusEffectSkillEffect;
                effectDescription = `Applies ${statusEffect.statusEffectType} to ${targetDesc}.`;
                if (statusEffect.value !== undefined) {
                  effectDescription += ` (Value: ${statusEffect.value})`;
                }
                if (statusEffect.duration !== undefined) {
                  effectDescription += ` for ${statusEffect.duration} turns.`;
                }
                if (statusEffect.stackable) {
                  effectDescription += ` (Stackable)`;
                }
                break;

              case SkillEffectType.adjustStat:
                const adjustStatEffect = effect as AdjustStatSkillEffect;
                const modifierSuffix = adjustStatEffect.modifierType === ModifierType.Percentage ? "%" : "";
                effectDescription = `Adjusts ${targetDesc}'s ${adjustStatEffect.stat} by ${adjustStatEffect.modifierValue}${modifierSuffix}.`;
                if (adjustStatEffect.duration !== undefined) {
                  effectDescription += ` This adjustment lasts for ${adjustStatEffect.duration} turns.`;
                }
                break;

              default:
                effectDescription = `Performs an unknown ${effect.affinity} effect on ${targetDesc}.`;
                break;
            }

            return (
              <li key={effect.id} className="text-gray-700">
                {effectDescription}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};