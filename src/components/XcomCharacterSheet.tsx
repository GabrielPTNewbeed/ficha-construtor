import React, { useState, ReactNode } from 'react';
import { Rnd } from 'react-rnd';
import type { 
  SheetConfig, 
  SectionConfig, 
  Field, 
  Position,
  XcomCharacterSheetProps,
  StyleObject,
  TableColumn,
} from '../types/sheetTypes';
import '../styles/XcomCharacterSheet.css';

// ============================================================================
// PROGRESS BAR COMPONENT
// ============================================================================

interface ProgressBarProps {
  value: string;
  style?: StyleObject;
  editMode?: boolean;
  onChange?: (value: string) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, style, editMode, onChange }) => {
  const [current, max] = value.split('/').map(Number);
  const percentage = (current / max) * 100;
  
  const getBarColor = (percent: number) => {
    if (percent > 50) return '#00FF00';
    if (percent > 25) return '#FFD700';
    return '#FF4500';
  };

  const barColor = (style?.barColor as string) || getBarColor(percentage);
  const bgColor = (style?.background as string) || '#2F4F4F';

  return (
    <div className="progress-container">
      <div className="progress-label">
        {editMode ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="progress-input"
            placeholder="current/max"
          />
        ) : (
          <span>{value}</span>
        )}
      </div>
      <div className="progress-bar" style={{ backgroundColor: bgColor }}>
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: barColor,
            boxShadow: `0 0 10px ${barColor}`,
          }}
        />
      </div>
      <div className="progress-percentage">{Math.round(percentage)}%</div>
    </div>
  );
};

// ============================================================================
// EDITABLE FIELD COMPONENT
// ============================================================================

interface EditableFieldProps {
  field: Field;
  editMode?: boolean;
  onChange?: (value: string | number) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ field, editMode, onChange }) => {
  const [internalValue, setInternalValue] = useState(field.value ?? field.default ?? '');

  const handleChange = (newValue: string | number) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const commonInputProps = {
    className: `field-input field-${field.type}`,
    style: field.style,
  };

  if (field.type === 'progress-bar') {
    return (
      <ProgressBar
        value={String(internalValue)}
        style={field.style}
        editMode={editMode}
        onChange={(v) => handleChange(v)}
      />
    );
  }

  if (field.type === 'textarea') {
    return editMode ? (
      <textarea
        value={String(internalValue)}
        onChange={(e) => handleChange(e.target.value)}
        {...commonInputProps}
        rows={4}
      />
    ) : (
      <div className="field-display">{internalValue}</div>
    );
  }

  return editMode ? (
    <input
      type={field.type === 'number' ? 'number' : 'text'}
      value={String(internalValue)}
      onChange={(e) => handleChange(field.type === 'number' ? Number(e.target.value) : e.target.value)}
      {...commonInputProps}
    />
  ) : (
    <div className="field-display">{internalValue}</div>
  );
};

// ============================================================================
// BASIC INFO SECTION
// ============================================================================

interface BasicInfoProps {
  section: SectionConfig;
  editMode?: boolean;
  onUpdate?: (updatedSection: SectionConfig) => void;
}

const BasicInfoSection: React.FC<BasicInfoProps> = ({ section, editMode, onUpdate }) => {
  const handleFieldChange = (fieldIndex: number, newValue: string | number) => {
    if (!onUpdate || !section.fields) return;
    const updatedFields = [...section.fields];
    updatedFields[fieldIndex].value = newValue;
    onUpdate({ ...section, fields: updatedFields });
  };

  return (
    <div className="section-content">
      {section.fields?.map((field, idx) => (
        <div key={idx} className="field-group">
          <label className="field-label">{field.name}</label>
          <EditableField
            field={field}
            editMode={editMode}
            onChange={(val) => handleFieldChange(idx, val)}
          />
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// ATTRIBUTES SECTION
// ============================================================================

const AttributesSection: React.FC<BasicInfoProps> = ({ section, editMode, onUpdate }) => {
  const handleFieldChange = (fieldIndex: number, newValue: string | number) => {
    if (!onUpdate || !section.fields) return;
    const updatedFields = [...section.fields];
    updatedFields[fieldIndex].value = newValue;
    onUpdate({ ...section, fields: updatedFields });
  };

  return (
    <div className="section-content attributes-grid">
      {section.fields?.map((field, idx) => (
        <div key={idx} className="attribute-item">
          <div className="attribute-icon">{field.style?.icon || '⚡'}</div>
          <div className="attribute-name">{field.name}</div>
          <EditableField
            field={field}
            editMode={editMode}
            onChange={(val) => handleFieldChange(idx, val)}
          />
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// DYNAMIC TABLE COMPONENT
// ============================================================================

interface TableSectionProps {
  section: SectionConfig;
  editMode?: boolean;
  onUpdate?: (updatedSection: SectionConfig) => void;
}

const TableSection: React.FC<TableSectionProps> = ({ section, editMode, onUpdate }) => {
  const [rows, setRows] = useState(section.rows || []);

  const handleRowChange = (rowIndex: number, colIndex: number, value: string) => {
    const updatedRows = [...rows];
    if (!updatedRows[rowIndex]) updatedRows[rowIndex] = [];
    updatedRows[rowIndex][colIndex] = value;
    setRows(updatedRows);
    onUpdate?.({ ...section, rows: updatedRows });
  };

  const addRow = () => {
    const newRow = new Array(section.columns?.length || 0).fill('');
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
    onUpdate?.({ ...section, rows: updatedRows });
  };

  const removeRow = (rowIndex: number) => {
    const updatedRows = rows.filter((_, idx) => idx !== rowIndex);
    setRows(updatedRows);
    onUpdate?.({ ...section, rows: updatedRows });
  };

  const borderStyle = section.style?.border === 'laser-grid' ? 'laser-grid-border' : '';
  const hoverEffect = section.style?.hoverEffect === 'glow' ? 'glow-row' : '';

  return (
    <div className="section-content">
      <div className={`table-wrapper ${borderStyle}`}>
        <table className="data-table">
          <thead>
            <tr>
              {section.columns?.map((col, idx) => (
                <th
                  key={idx}
                  style={{
                    width: col.width,
                    backgroundColor: (section.style?.rowColor as string) || '#1E90FF',
                  }}
                >
                  {col.header}
                </th>
              ))}
              {editMode && <th style={{ width: '50px' }}>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className={hoverEffect}>
                {row.map((cell, colIdx) => (
                  <td key={colIdx} style={{ width: section.columns?.[colIdx]?.width }}>
                    {editMode ? (
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => handleRowChange(rowIdx, colIdx, e.target.value)}
                        className="table-input"
                      />
                    ) : (
                      <span>{cell}</span>
                    )}
                  </td>
                ))}
                {editMode && (
                  <td>
                    <button
                      className="btn-remove-row"
                      onClick={() => removeRow(rowIdx)}
                      title="Remover linha"
                    >
                      ✕
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editMode && (
        <button className="btn-add-row" onClick={addRow}>
          + Adicionar Linha
        </button>
      )}
    </div>
  );
};

// ============================================================================
// DRAGGABLE SECTION WRAPPER
// ============================================================================

interface SectionWrapperProps {
  section: SectionConfig;
  editMode?: boolean;
  isDraggable?: boolean;
  onUpdate?: (updatedSection: SectionConfig) => void;
  children: ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  section,
  editMode,
  isDraggable,
  onUpdate,
  children,
}) => {
  const convertPosition = (pos: Position) => {
    return {
      x: typeof pos.x === 'string' ? parseInt(pos.x) * 15 : pos.x,
      y: typeof pos.y === 'string' ? parseInt(pos.y) * 15 : pos.y,
      width: typeof pos.width === 'string' ? pos.width : `${pos.width}px`,
      height: pos.height === 'auto' ? 'auto' : pos.height,
    };
  };

  const position = convertPosition(section.position);
  const defaultSize = {
    width: position.width,
    height: position.height || 200,
  };

  const handleDragStop = (_e: any, d: any) => {
    onUpdate?.({
      ...section,
      position: {
        ...section.position,
        x: d.x,
        y: d.y,
      },
    });
  };

  const handleResizeStop = (_e: any, _direction: any, ref: any, _delta: any, position: any) => {
    onUpdate?.({
      ...section,
      position: {
        ...section.position,
        width: ref.style.width,
        height: ref.style.height,
      },
      ...position,
    });
  };

  if (!isDraggable) {
    return (
      <div className="section-card">
        <div className="section-header">
          <h2 className="section-title">{section.title}</h2>
        </div>
        {children}
      </div>
    );
  }

  return (
    <Rnd
      default={{
        x: (typeof position.x === 'string' ? parseInt(position.x) : position.x) || 0,
        y: (typeof position.y === 'string' ? parseInt(position.y) : position.y) || 0,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      dragHandleClassName="section-header"
      minWidth={200}
      minHeight={100}
      className={editMode ? 'rnd-draggable-edit' : 'rnd-draggable'}
    >
      <div className="section-card">
        <div className="section-header">
          <h2 className="section-title">{section.title}</h2>
          {editMode && <span className="drag-indicator">⋮⋮</span>}
        </div>
        {children}
      </div>
    </Rnd>
  );
};

// ============================================================================
// MAIN XCOM CHARACTER SHEET COMPONENT
// ============================================================================

const XcomCharacterSheet: React.FC<XcomCharacterSheetProps> = ({
  data,
  onDataChange,
  editMode = false,
  theme = 'xcom',
  customTheme,
}) => {
  const [sheetData, setSheetData] = useState<SheetConfig>(data);
  const [localEditMode, setLocalEditMode] = useState(editMode);

  const handleSectionUpdate = (updatedSection: SectionConfig) => {
    const updatedData = {
      ...sheetData,
      sections: sheetData.sections.map((s) =>
        s.id === updatedSection.id ? updatedSection : s
      ),
    };
    setSheetData(updatedData);
    onDataChange?.(updatedData);
  };

  const themeClass = theme === 'custom' ? '' : `theme-${theme}`;
  const themeVars = customTheme
    ? {
        '--primary-color': customTheme.primaryColor,
        '--secondary-color': customTheme.secondaryColor,
        '--bg-color': customTheme.backgroundColor,
        '--font-family': customTheme.fontFamily,
      }
    : {};

  const renderSection = (section: SectionConfig) => {
    if (section.type === 'table') {
      return (
        <TableSection
          section={section}
          editMode={localEditMode}
          onUpdate={handleSectionUpdate}
        />
      );
    }

    if (section.id === 'attributes') {
      return (
        <AttributesSection
          section={section}
          editMode={localEditMode}
          onUpdate={handleSectionUpdate}
        />
      );
    }

    return (
      <BasicInfoSection
        section={section}
        editMode={localEditMode}
        onUpdate={handleSectionUpdate}
      />
    );
  };

  return (
    <div
      className={`xcom-character-sheet ${themeClass} ${localEditMode ? 'edit-mode' : 'view-mode'}`}
      style={themeVars as React.CSSProperties}
    >
      {/* HEADER */}
      <div className="sheet-header">
        <div className="header-content">
          <h1 className="sheet-title">{sheetData.name}</h1>
          <p className="sheet-description">{sheetData.description}</p>
        </div>
        <div className="header-controls">
          <button
            className={`btn-toggle-edit ${localEditMode ? 'active' : ''}`}
            onClick={() => setLocalEditMode(!localEditMode)}
            title={localEditMode ? 'Sair do modo edição' : 'Entrar no modo edição'}
          >
            {localEditMode ? '✓ Edições' : '✎ Editar'}
          </button>
        </div>
      </div>

      {/* SECTIONS CONTAINER */}
      <div className="sections-container">
        {sheetData.sections.map((section) => (
          <SectionWrapper
            key={section.id}
            section={section}
            editMode={localEditMode}
            isDraggable={localEditMode}
            onUpdate={handleSectionUpdate}
          >
            {renderSection(section)}
          </SectionWrapper>
        ))}
      </div>

      {/* FOOTER */}
      {localEditMode && (
        <div className="sheet-footer">
          <button
            className="btn-export"
            onClick={() => {
              console.log('Export data:', sheetData);
              const json = JSON.stringify(sheetData, null, 2);
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'ficha-xcom.json';
              a.click();
            }}
          >
            ⬇ Exportar JSON
          </button>
        </div>
      )}
    </div>
  );
};

export { XcomCharacterSheet };
export default XcomCharacterSheet;

// ============================================================================
// EXAMPLE USAGE (uncomment to use)
// ============================================================================

/*
import XcomCharacterSheet from './components/XcomCharacterSheet';

const XCOM_TEMPLATE: SheetConfig = {
  name: "Ficha XCOM TTRPG",
  description: "Modelo de ficha editável para TTRPG inspirado no universo XCOM",
  layout: "grid",
  sections: [
    {
      id: "basic-info",
      title: "Informações Básicas",
      position: { x: 0, y: 0, width: "30%", height: "auto" },
      fields: [
        { name: "Apelido", type: "text", default: "BandAid", style: { } }
      ]
    },
    {
      id: "attributes",
      title: "Atributos",
      position: { x: 0, y: 1, width: "40%", height: "auto" },
      fields: [
        { name: "Vida", type: "progress-bar", value: "7/8", style: { barColor: "#FF4500" } },
        { name: "Precisão", type: "number", value: 4, style: { icon: "🎯" } },
        { name: "Movimentação", type: "number", value: 8, style: { icon: "👢" } }
      ]
    },
    {
      id: "weapons",
      title: "Armas",
      position: { x: 1, y: 0, width: "60%", height: "auto" },
      type: "table",
      columns: [
        { header: "Nome", width: "20%" },
        { header: "Dano", width: "15%" },
        { header: "Curto Alcance", width: "20%" },
        { header: "Médio Alcance", width: "20%" },
        { header: "Longo Alcance", width: "20%" },
        { header: "Disparos", width: "15%" }
      ],
      rows: [
        ["Rifle de Assalto", "", "3 Neutro", "Vantagem", "Desvantagem", "2/4"],
        ["Pistola", "", "2 Vantagem", "Neutro", "Desvantagem", "Ilimitado"]
      ],
      style: { border: "laser-grid", rowColor: "#1E90FF", hoverEffect: "glow" }
    }
  ],
  globalStyle: {
    theme: "xcom",
    background: "#000000",
    fontFamily: "Orbitron",
    primaryColor: "#00BFFF",
    secondaryColor: "#FF4500"
  }
};

export function App() {
  return (
    <XcomCharacterSheet
      data={XCOM_TEMPLATE}
      editMode={false}
      theme="xcom"
      onDataChange={(updatedData) => console.log('Sheet updated:', updatedData)}
    />
  );
}
*/
