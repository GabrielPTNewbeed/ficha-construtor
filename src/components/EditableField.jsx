import { useState } from "react";

export default function EditableField({
  id,
  label,
  value,
  type = "text",
  onChange,
  onLabelChange,
  editMode = false,
  children
}) {
  const [isRenamingLabel, setIsRenamingLabel] = useState(false);
  const [tempLabel, setTempLabel] = useState(label);

  const handleLabelSave = () => {
    if (tempLabel.trim()) {
      onLabelChange(tempLabel.trim());
      setIsRenamingLabel(false);
    } else {
      setTempLabel(label);
      setIsRenamingLabel(false);
    }
  };

  return (
    <div
      className={`editable-field ${editMode ? "edit-mode" : ""}`}
      draggable={editMode}
      onDragStart={(e) => {
        if (editMode) {
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("fieldId", id);
        }
      }}
    >
      <div className="field-header">
        {editMode && isRenamingLabel ? (
          <div className="label-edit">
            <input
              autoFocus
              type="text"
              value={tempLabel}
              onChange={(e) => setTempLabel(e.target.value)}
              onBlur={handleLabelSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLabelSave();
                if (e.key === "Escape") {
                  setTempLabel(label);
                  setIsRenamingLabel(false);
                }
              }}
              className="label-input"
            />
          </div>
        ) : (
          <>
            <label>
              {label}
              {editMode && (
                <button
                  className="btn-rename"
                  onClick={() => setIsRenamingLabel(true)}
                  title="Renomear campo"
                >
                  ✏️
                </button>
              )}
            </label>
          </>
        )}
        {editMode && (
          <div className="edit-indicators">
            <span className="move-indicator" title="Arraste para mover">⇄</span>
          </div>
        )}
      </div>

      <div className="field-content">
        {children || (
          <>
            {type === "textarea" && (
              <textarea
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                disabled={!editMode}
              />
            )}

            {type === "select" && (
              <select
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                disabled={!editMode}
              >
                <option value="">Selecione...</option>
                {/* Options virão como children */}
              </select>
            )}

            {type === "checkbox" && (
              <input
                type="checkbox"
                checked={!!value}
                onChange={(e) => onChange(e.target.checked)}
                disabled={!editMode}
              />
            )}

            {(type === "text" || type === "number") && (
              <input
                type={type}
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
                disabled={!editMode}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
