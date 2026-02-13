import { DND5E_ABILITIES } from "../sheets/dnd5e.rules";
import EditableLabel from "./EditableLabel";

function abilityModifier(score = 10) {
  return Math.floor((Number(score) - 10) / 2);
}

export default function AbilityScores({
  abilities,
  onChange,
  customLabels = {},
  setLabel = () => {},
  editMode = false
}) {
  return (
    <div className="ability-scores">
      <EditableLabel
        labelKey="sec-atributos"
        defaultLabel="Atributos"
        customLabels={customLabels}
        setLabel={setLabel}
        editMode={editMode}
        isHeading={true}
      />
      <div className="ability-grid">
        {Object.entries(DND5E_ABILITIES).map(([id, label]) => {
          const score = abilities[id] || 10;
          const mod = abilityModifier(score);
          const modStr = mod >= 0 ? `+${mod}` : `${mod}`;

          return (
            <div key={id} className="ability-card">
              <EditableLabel
                labelKey={`abil-${id}`}
                defaultLabel={label}
                customLabels={customLabels}
                setLabel={setLabel}
                editMode={editMode}
              />
              <input
                type="number"
                min="1"
                max="30"
                value={score}
                onChange={(e) =>
                  onChange({ ...abilities, [id]: Number(e.target.value) || 10 })
                }
                className="ability-input"
              />
              <div className="ability-mod">{modStr}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
