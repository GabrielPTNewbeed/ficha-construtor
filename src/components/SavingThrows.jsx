import { DND5E_SAVES } from "../sheets/dnd5e.rules";

function abilityModifier(score = 10) {
  return Math.floor((Number(score) - 10) / 2);
}

export default function SavingThrows({ saves, proficiency, abilities, onChange }) {
  return (
    <div className="saves-section">
      <h3>Testes de Resistência</h3>
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
                <span className="save-name">{save.label}</span>
              </label>
              <span className="save-mod">{modStr}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
