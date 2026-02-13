export default function FieldRenderer({ field, value, onChange }) {
  const { type, label, options, readOnly } = field;

  const handleChange = (e) => {
    if (type === "checkbox") {
      onChange(e.target.checked);
    } else if (type === "number") {
      onChange(Number(e.target.value) || 0);
    } else {
      onChange(e.target.value);
    }
  };

  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span>{label}</span>

      {type === "textarea" && (
        <textarea
          value={value || ""}
          onChange={handleChange}
          disabled={readOnly}
        />
      )}

      {type === "select" && (
        <select
          value={value || ""}
          onChange={handleChange}
          disabled={readOnly}
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {type === "checkbox" && (
        <input
          type="checkbox"
          checked={!!value}
          onChange={handleChange}
          disabled={readOnly}
        />
      )}

      {(type === "text" || type === "number") && (
        <input
          type={type}
          value={value ?? ""}
          onChange={handleChange}
          disabled={readOnly}
        />
      )}
    </label>
  );
}
