import { DND5E_SAVES } from "../sheets/dnd5e.rules";
import EditableLabel from "./EditableLabel";

function abilityModifier(score = 10) {
  return Math.floor((Number(score) - 10) / 2);
}

export default function SavingThrows({
  saves,
  proficiency,
  abilities,
  onChange,
  customLabels = {},
  setLabel = () => {},
  editMode = false
}) {
  return (
    <div className="saves-section">
      <EditableLabel
        labelKey="sec-testes-resistencia"
        defaultLabel="Testes de Resistência"
        customLabels={customLabels}
        setLabel={setLabel}
        editMode={editMode}
        isHeading={true}
      />
      <div className="saves-grid">
        {DND5E_SAVES.map((save) => {
          const abilityScore = abilities[save.ability] || 10;
          const baseMod = abilityModifier(abilityScore);
          const isProficient = saves[save.id] || false;
          const totalMod = isProficient ? baseMod + proficiency : baseMod;
          const modStr = totalMod >= 0 ? `+${totalMod}` : `${totalMod}`;

          return (
            <div key={save.id} className="save-item">
              <label className="save-label">
                <input
                  type="checkbox"
                  checked={isProficient}
                  onChange={(e) =>
                    onChange({ ...saves, [save.id]: e.target.checked })
                  }
                  className="save-checkbox"
                />
                <span className="save-name">
                  <EditableLabel
                    labelKey={`save-${save.id}`}
                    defaultLabel={save.label}
                    customLabels={customLabels}
                    setLabel={setLabel}
                    editMode={editMode}
                  />
                </span>
              </label>
              <span className="save-mod">{modStr}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
