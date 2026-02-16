import { useState, useEffect } from "react";

const WIDGET_TYPES = [
  { value: "text", label: "Text Input" },
  { value: "number", label: "Number Input" },
  { value: "textarea", label: "Text Area" },
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Radio Button" },
  { value: "select", label: "Dropdown Select" },
  { value: "calculated", label: "Calculated Field" }
];

export default function WidgetEditor({ widget, onSave, onClose, onDelete, allWidgets = [] }) {
  const [formData, setFormData] = useState(widget || {
    id: `widget_${Date.now()}`,
    label: "New Widget",
    type: "text",
    value: "",
    position: { x: 100, y: 100 },
    size: { width: 150, height: 60 },
    formula: "",
    options: []
  });

  const [optionsText, setOptionsText] = useState(
    formData.options?.join("\n") || ""
  );

  useEffect(() => {
    setFormData(widget || {
      id: `widget_${Date.now()}`,
      label: "New Widget",
      type: "text",
      value: "",
      position: { x: 100, y: 100 },
      size: { width: 150, height: 60 },
      formula: "",
      options: []
    });
    setOptionsText(widget?.options?.join("\n") || "");
  }, [widget]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    const data = { ...formData };
    
    // Parse opções para selects/radios
    if (["select", "radio"].includes(data.type) && optionsText) {
      data.options = optionsText
        .split("\n")
        .map(line => line.trim())
        .filter(line => line);
    }
    
    onSave(data);
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      right: 0,
      width: "400px",
      height: "100vh",
      backgroundColor: "#fff",
      boxShadow: "-2px 0 8px rgba(0,0,0,0.2)",
      zIndex: 2000,
      display: "flex",
      flexDirection: "column",
      animation: "slideIn 0.3s ease-out"
    }}>
      {/* Header */}
      <div style={{
        padding: "20px",
        backgroundColor: "#333",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #222"
      }}>
        <h3 style={{ margin: 0 }}>
          {widget ? "Edit Widget" : "New Widget"}
        </h3>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "24px",
            cursor: "pointer"
          }}
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}>
        {/* ID (readonly) */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: "12px" }}>
            ID
          </label>
          <input
            type="text"
            value={formData.id}
            disabled
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "#f5f5f5",
              fontSize: "12px"
            }}
          />
        </div>

        {/* Label */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: "12px" }}>
            Label/Title
          </label>
          <input
            type="text"
            value={formData.label}
            onChange={(e) => handleChange("label", e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px"
            }}
          />
        </div>

        {/* Type */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: "12px" }}>
            Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange("type", e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px"
            }}
          >
            {WIDGET_TYPES.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Value (não para calculated) */}
        {formData.type !== "calculated" && (
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: "12px" }}>
              Default Value
            </label>
            {formData.type === "checkbox" ? (
              <input
                type="checkbox"
                checked={formData.value === true || formData.value === "true"}
                onChange={(e) => handleChange("value", e.target.checked)}
                style={{ width: "20px", height: "20px" }}
              />
            ) : (
              <input
                type={formData.type === "number" ? "number" : "text"}
                value={formData.value || ""}
                onChange={(e) => handleChange("value", e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  fontSize: "14px"
                }}
              />
            )}
          </div>
        )}

        {/* Formula (apenas para calculated) */}
        {formData.type === "calculated" && (
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: "12px" }}>
              Formula
            </label>
            <textarea
              value={formData.formula || ""}
              onChange={(e) => handleChange("formula", e.target.value)}
              placeholder="e.g., floor((getValue('str') - 10) / 2)"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "12px",
                fontFamily: "monospace",
                minHeight: "80px",
                resize: "vertical"
              }}
            />
          </div>
        )}

        {/* Options (para select/radio) */}
        {["select", "radio"].includes(formData.type) && (
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: "12px" }}>
              Options (one per line)
            </label>
            <textarea
              value={optionsText}
              onChange={(e) => setOptionsText(e.target.value)}
              placeholder="Option 1&#10;Option 2&#10;Option 3"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "12px",
                fontFamily: "monospace",
                minHeight: "100px",
                resize: "vertical"
              }}
            />
          </div>
        )}

        {/* Size */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: "12px" }}>
              Width
            </label>
            <input
              type="number"
              value={formData.size?.width || 150}
              onChange={(e) => handleChange("size", { ...formData.size, width: Number(e.target.value) })}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: "12px" }}>
              Height
            </label>
            <input
              type="number"
              value={formData.size?.height || 60}
              onChange={(e) => handleChange("size", { ...formData.size, height: Number(e.target.value) })}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
            />
          </div>
        </div>

        {/* Dependencies */}
        {widget && (
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold", fontSize: "12px" }}>
              Depends On (for calculations)
            </label>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              maxHeight: "120px",
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "8px"
            }}>
              {allWidgets
                .filter(w => w.id !== widget?.id)
                .map(w => (
                  <label key={w.id} style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "12px" }}>
                    <input
                      type="checkbox"
                      checked={formData.dependsOn?.includes(w.id) || false}
                      onChange={(e) => {
                        const deps = formData.dependsOn || [];
                        if (e.target.checked) {
                          handleChange("dependsOn", [...deps, w.id]);
                        } else {
                          handleChange("dependsOn", deps.filter(id => id !== w.id));
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <span>{w.label} ({w.id})</span>
                  </label>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer - Buttons */}
      <div style={{
        padding: "16px 20px",
        borderTop: "1px solid #ddd",
        display: "flex",
        gap: "8px",
        justifyContent: "space-between"
      }}>
        {widget && (
          <button
            onClick={() => {
              if (confirm("Delete this widget?")) {
                onDelete(widget.id);
              }
            }}
            style={{
              padding: "8px 16px",
              backgroundColor: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Delete
          </button>
        )}
        <div style={{ flex: 1 }} />
        <button
          onClick={onClose}
          style={{
            padding: "8px 16px",
            backgroundColor: "#999",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Save
        </button>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
