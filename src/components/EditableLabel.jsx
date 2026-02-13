export default function EditableLabel({
  labelKey,
  defaultLabel,
  customLabels,
  setLabel,
  editMode,
  isHeading = false
}) {
  const currentLabel = customLabels[labelKey] || defaultLabel;

  const handleRename = () => {
    const newLabel = prompt(`Renomear "${defaultLabel}":`, currentLabel);
    if (newLabel && newLabel.trim()) {
      setLabel(labelKey, newLabel.trim());
    }
  };

  if (isHeading) {
    return (
      <div className="editable-heading">
        <h2>{currentLabel}</h2>
        {editMode && (
          <button
            className="btn-rename-inline"
            onClick={handleRename}
            title="Renomear seção"
          >
            ✏️
          </button>
        )}
      </div>
    );
  }

  return (
    <label className={editMode ? "label-editable" : ""}>
      {currentLabel}
      {editMode && (
        <button
          className="btn-rename-inline"
          onClick={handleRename}
          title="Renomear campo"
        >
          ✏️
        </button>
      )}
    </label>
  );
}
