import { DND5E_SKILLS } from "../sheets/dnd5e.rules";
import EditableLabel from "./EditableLabel";

function abilityModifier(score = 10) {
  return Math.floor((Number(score) - 10) / 2);
}

export default function SkillsList({
  skills,
  proficiency,
  abilities,
  onChange,
  customLabels = {},
  setLabel = () => {},
  editMode = false
}) {
  return (
    <div className="skills-section">
      <EditableLabel
        labelKey="sec-habilidades"
        defaultLabel="Habilidades"
        customLabels={customLabels}
        setLabel={setLabel}
        editMode={editMode}
        isHeading={true}
      />
      <div className="skills-grid">
        {DND5E_SKILLS.map((skill) => {
          const abilityScore = abilities[skill.ability] || 10;
          const baseMod = abilityModifier(abilityScore);
          const isProficient = skills[skill.id] || false;
          const totalMod = isProficient ? baseMod + proficiency : baseMod;
          const modStr = totalMod >= 0 ? `+${totalMod}` : `${totalMod}`;

          return (
            <div key={skill.id} className="skill-item">
              <label className="skill-label">
                <input
                  type="checkbox"
                  checked={isProficient}
                  onChange={(e) =>
                    onChange({ ...skills, [skill.id]: e.target.checked })
                  }
                  className="skill-checkbox"
                />
                <span className="skill-name">
                  <EditableLabel
                    labelKey={`skill-${skill.id}`}
                    defaultLabel={skill.label}
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                </span>
                <span className="skill-ability">({skill.ability.toUpperCase()})</span>
              </label>
              <span className="skill-mod">{modStr}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
