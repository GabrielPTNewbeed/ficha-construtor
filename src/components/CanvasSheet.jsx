import { useState, useEffect, useCallback } from "react";
import { Rnd } from "react-rnd";
import { evaluate } from "mathjs";
import { DND5E_TEMPLATE } from "../data/dnd5eTemplate";
import WidgetEditor from "./WidgetEditor";
import ConnectionOverlay from "./ConnectionOverlay";

export default function CanvasSheet() {
  const defaultWidgets = [
    {
      id: "name",
      type: "text",
      label: "Character Name",
      value: "",
      position: { x: 10, y: 10 },
      size: { width: 280, height: 60 }
    },
    {
      id: "class",
      type: "text",
      label: "Class",
      value: "",
      position: { x: 300, y: 10 },
      size: { width: 200, height: 60 }
    },
    {
      id: "level",
      type: "number",
      label: "Level",
      value: 1,
      position: { x: 510, y: 10 },
      size: { width: 100, height: 60 }
    }
  ];

  const [widgets, setWidgets] = useState(() => {
    try {
      const raw = localStorage.getItem("canvasSheetWidgets");
      return raw ? JSON.parse(raw) : defaultWidgets;
    } catch {
      return defaultWidgets;
    }
  });

  const [editMode, setEditMode] = useState(false);

  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedWidgetId, setSelectedWidgetId] = useState(null);

  useEffect(() => {
    localStorage.setItem("canvasSheetWidgets", JSON.stringify(widgets));
  }, [widgets]);

  const loadDND5eTemplate = () => {
    setWidgets(structuredClone(DND5E_TEMPLATE.widgets));
  };

  const getValue = useCallback((widgetId) => {
    const widget = widgets.find(w => w.id === widgetId);
    return widget ? widget.value : 0;
  }, [widgets]);

  const evaluateFormula = useCallback((formula) => {
    try {
      return evaluate(formula, {
        getValue,
        floor: Math.floor,
        ceil: Math.ceil,
        round: Math.round
      });
    } catch (error) {
      console.error(`Error evaluating formula "${formula}":`, error);
      return "ERROR";
    }
  }, [getValue]);

  const openNewWidgetEditor = () => {
    setSelectedWidgetId(null);
    setEditorOpen(true);
  };

  const openWidgetEditor = (widgetId) => {
    setSelectedWidgetId(widgetId);
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setSelectedWidgetId(null);
  };

  const saveWidget = (widgetData) => {
    const existingIndex = widgets.findIndex(w => w.id === widgetData.id);
    
    if (existingIndex >= 0) {
      // Atualizar widget existente
      setWidgets(prev => {
        const updated = [...prev];
        updated[existingIndex] = widgetData;
        return updated;
      });
    } else {
      // Criar novo widget
      setWidgets(prev => [...prev, widgetData]);
    }
    
    closeEditor();
  };

  const deleteWidget = (widgetId) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId));
    closeEditor();
  };

  const updateWidget = (id, updates) => {
    setWidgets(prev =>
      prev.map(w => {
        if (w.id !== id) return w;
        return {
          ...w,
          // Atualiza value, position, size, label, type - qualquer propriedade
          ...(updates.value !== undefined && { value: updates.value }),
          ...(updates.position && { position: updates.position }),
          ...(updates.size && { size: updates.size }),
          ...(updates.label !== undefined && { label: updates.label }),
          ...(updates.type && { type: updates.type })
        };
      })
    );
  };

  const handleDragStop = (e, d, widgetId) => {
    updateWidget(widgetId, {
      position: { x: d.x, y: d.y }
    });
  };

  const handleResizeStop = (e, direction, ref, delta, position, widgetId) => {
    updateWidget(widgetId, {
      position,
      size: {
        width: ref.offsetWidth,
        height: ref.offsetHeight
      }
    });
  };

  const renderInput = (widget) => {
    const commonStyle = {
      width: "100%",
      padding: "6px",
      border: "1px solid #ddd",
      borderRadius: "3px",
      fontSize: "14px",
      boxSizing: "border-box",
      fontFamily: "inherit"
    };

    // Campo calculado: apenas exibição
    if (widget.type === "calculated") {
      const result = evaluateFormula(widget.formula);
      return (
        <div
          style={{
            ...commonStyle,
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "18px",
            cursor: "default",
            border: "1px solid #bbb"
          }}
        >
          {result}
        </div>
      );
    }

    if (widget.type === "checkbox") {
      return (
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={widget.value === true || widget.value === "true"}
            onChange={(e) => updateWidget(widget.id, { value: e.target.checked })}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
          />
          <span>{widget.label}</span>
        </label>
      );
    }

    if (widget.type === "select") {
      return (
        <select
          value={widget.value || ""}
          onChange={(e) => updateWidget(widget.id, { value: e.target.value })}
          style={commonStyle}
        >
          <option value="">-- Select --</option>
          {Array.isArray(widget.options) && widget.options.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }

    if (widget.type === "radio") {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {Array.isArray(widget.options) && widget.options.map((opt, idx) => (
            <label key={idx} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="radio"
                name={widget.id}
                value={opt}
                checked={widget.value === opt}
                onChange={(e) => updateWidget(widget.id, { value: e.target.value })}
                style={{ cursor: "pointer" }}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      );
    }

    if (widget.type === "textarea") {
      return (
        <textarea
          value={widget.value || ""}
          onChange={(e) => updateWidget(widget.id, { value: e.target.value })}
          style={{
            ...commonStyle,
            resize: "none",
            minHeight: "80px",
            fontFamily: "monospace"
          }}
        />
      );
    }

    return (
      <input
        type={widget.type || "text"}
        value={widget.value || ""}
        onChange={(e) => updateWidget(widget.id, { value: e.target.value })}
        style={commonStyle}
      />
    );
  };

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Control Bar */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "50px",
        backgroundColor: "#333",
        color: "#fff",
        display: "flex",
        gap: "10px",
        alignItems: "center",
        padding: "0 20px",
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
      }}>
        <button
          onClick={() => setEditMode(!editMode)}
          style={{
            padding: "8px 16px",
            backgroundColor: editMode ? "#4CAF50" : "#666",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px"
          }}
        >
          {editMode ? "Edit Mode: ON" : "Edit Mode: OFF"}
        </button>

        {editMode && (
          <button
            onClick={loadDND5eTemplate}
            style={{
              padding: "8px 16px",
              backgroundColor: "#2196F3",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px"
            }}
          >
            Load D&D 5e Template
          </button>
        )}

        {editMode && (
          <button
            onClick={openNewWidgetEditor}
            style={{
              padding: "8px 16px",
              backgroundColor: "#9C27B0",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px"
            }}
          >
            + Add Widget
          </button>
        )}
      </div>

      {/* Canvas Area */}
      <div className="canvas-sheet-container" style={{ position: "relative", width: "100%", minHeight: "100vh", backgroundColor: "#f5f5f5", paddingTop: "50px" }}>
        {widgets.map(widget => (
          <Rnd
            key={widget.id}
            default={{
              x: widget.position.x,
              y: widget.position.y,
              width: widget.size.width,
              height: widget.size.height
            }}
            onDragStop={(e, d) => handleDragStop(e, d, widget.id)}
            onResizeStop={(e, direction, ref, delta, position) =>
              handleResizeStop(e, direction, ref, delta, position, widget.id)
            }
            disableDragging={!editMode}
            disableResizing={!editMode}
            style={{
              backgroundColor: "#fff",
              border: editMode ? "2px solid #FF9800" : "1px solid #ddd",
              borderRadius: "6px",
              padding: "12px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              zIndex: 1,
              opacity: editMode ? 1 : 0.95,
              transition: "border 0.2s",
              cursor: editMode ? "move" : "default"
            }}
          >
            <div
              data-widget-id={widget.id}
              style={{ height: "100%", display: "flex", flexDirection: "column" }}
              onDoubleClick={() => editMode && openWidgetEditor(widget.id)}
            >
              <label style={{
                display: "block",
                fontSize: "11px",
                fontWeight: "900",
                marginBottom: "6px",
                color: "#555",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                cursor: editMode ? "pointer" : "default"
              }}>
                {widget.label}
              </label>
              <div style={{ flex: 1, overflow: "auto" }}>
                {renderInput(widget)}
              </div>
            </div>
          </Rnd>
        ))}
      </div>

      {/* Widget Editor */}
      {editorOpen && (
        <WidgetEditor
          widget={selectedWidgetId ? widgets.find(w => w.id === selectedWidgetId) : null}
          onSave={saveWidget}
          onClose={closeEditor}
          onDelete={deleteWidget}
          allWidgets={widgets}
        />
      )}

      {/* Connection Overlay */}
      <ConnectionOverlay widgets={widgets} editMode={editMode} />
    </div>
  );
}
