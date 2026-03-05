/**
 * EXEMPLO PRONTO PARA PRODUÇÃO - App.tsx
 * 
 * Copie este código completo ao seu App.tsx para ter um aplicativo
 * funcional e profissional de gerenciador de fichas XCOM TTRPG
 * 
 * Inclui:
 * ✓ Múltiplas fichas
 * ✓ Auto-save
 * ✓ Múltiplos templates
 * ✓ Seleção de temas
 * ✓ Exportação/importação
 * ✓ UI profissional
 */

import React, { useState, useEffect } from 'react';
import { XcomCharacterSheet } from './components/XcomCharacterSheet';
import {
  XCOM_COMPLETE_TEMPLATE,
  XCOM_MINIMAL_TEMPLATE,
  XCOM_LIGHT_TEMPLATE,
} from './data/xcomTemplates';
import type { SheetConfig } from './types/sheetTypes';
import './styles/app.css';

// ============================================================================
// TIPOS
// ============================================================================

interface Character {
  id: string;
  name: string;
  data: SheetConfig;
  createdAt: string;
  updatedAt: string;
}

type ThemeType = 'xcom' | 'xcom-light' | 'custom';

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export function App() {
  // Estado de fichas
  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem('xcom-characters-db');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeId, setActiveId] = useState<string>(() => {
    const saved = localStorage.getItem('xcom-active-id');
    return saved || (characters.length > 0 ? characters[0].id : '');
  });

  // Estado de UI
  const [editMode, setEditMode] = useState(false);
  const [theme, setTheme] = useState<ThemeType>('xcom');
  const [showNav, setShowNav] = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);

  // Auto-save
  useEffect(() => {
    localStorage.setItem('xcom-characters-db', JSON.stringify(characters));
  }, [characters]);

  useEffect(() => {
    localStorage.setItem('xcom-active-id', activeId);
  }, [activeId]);

  // Helpers
  const activeCharacter = characters.find((c) => c.id === activeId);

  const createNewCharacter = (template: SheetConfig) => {
    const newChar: Character = {
      id: `char-${Date.now()}`,
      name: template.name,
      data: template,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCharacters([...characters, newChar]);
    setActiveId(newChar.id);
    setShowTemplates(false);
  };

  const updateActiveCharacter = (data: SheetConfig) => {
    setCharacters(
      characters.map((c) =>
        c.id === activeId
          ? {
              ...c,
              data,
              updatedAt: new Date().toISOString(),
            }
          : c
      )
    );
  };

  const deleteCharacter = (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar esta ficha? Esta ação não pode ser desfeita.')) {
      return;
    }

    const updated = characters.filter((c) => c.id !== id);
    setCharacters(updated);

    if (id === activeId && updated.length > 0) {
      setActiveId(updated[0].id);
    }
  };

  const renameCharacter = (id: string) => {
    const char = characters.find((c) => c.id === id);
    if (!char) return;

    const newName = prompt('Novo nome da ficha:', char.name);
    if (newName && newName.trim()) {
      setCharacters(
        characters.map((c) =>
          c.id === id
            ? {
                ...c,
                name: newName.trim(),
                updatedAt: new Date().toISOString(),
              }
            : c
        )
      );
    }
  };

  const exportCharacter = (char: Character) => {
    const json = JSON.stringify(char.data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${char.name.replace(/\s+/g, '-')}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importCharacter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string) as SheetConfig;
        createNewCharacter(data);
        alert('Ficha importada com sucesso!');
      } catch (error) {
        alert('Erro ao importar ficha: ' + error);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Limpar input
  };

  // =========================================================================
  // RENDER
  // =========================================================================

  return (
    <div className={`xcom-app ${theme}`}>
      {/* HEADER */}
      <header className="app-header">
        <div className="header-left">
          <button
            className="btn-toggle-nav"
            onClick={() => setShowNav(!showNav)}
            title={showNav ? 'Fechar painel' : 'Abrir painel'}
          >
            ☰
          </button>
          <h1>XCOM TTRPG - Character Builder</h1>
        </div>

        <div className="header-right">
          {activeCharacter && (
            <>
              <span className="header-name">{activeCharacter.name}</span>
              <button
                className={`btn-edit ${editMode ? 'active' : ''}`}
                onClick={() => setEditMode(!editMode)}
                title={editMode ? 'Modo visualização' : 'Modo edição'}
              >
                {editMode ? '✓ Edição' : '✎ Editar'}
              </button>
            </>
          )}

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value as ThemeType)}
            className="theme-select"
            title="Selecionar tema"
          >
            <option value="xcom">🌃 Dark (XCOM)</option>
            <option value="xcom-light">☀️ Light</option>
          </select>
        </div>
      </header>

      {/* LAYOUT FLEX */}
      <div className="app-layout">
        {/* SIDEBAR */}
        {showNav && (
          <aside className="app-sidebar">
            {/* CRIAR NOVA */}
            <section className="sidebar-section">
              <h3>Criar Nova Ficha</h3>
              <div className="templates-quick">
                <button
                  className="btn-template"
                  onClick={() => createNewCharacter(XCOM_COMPLETE_TEMPLATE)}
                >
                  📋 Template Completo
                </button>
                <button
                  className="btn-template"
                  onClick={() => createNewCharacter(XCOM_MINIMAL_TEMPLATE)}
                >
                  ✓ Template Rápido
                </button>
                <button
                  className="btn-template"
                  onClick={() => createNewCharacter(XCOM_LIGHT_TEMPLATE)}
                >
                  ☀️ Template Light
                </button>
              </div>
            </section>

            {/* FICHAS SALVAS */}
            <section className="sidebar-section">
              <h3>Minhas Fichas ({characters.length})</h3>
              <div className="characters-list">
                {characters.length === 0 ? (
                  <p className="empty-text">Nenhuma ficha criada ainda</p>
                ) : (
                  characters.map((char) => (
                    <div
                      key={char.id}
                      className={`character-card ${char.id === activeId ? 'active' : ''}`}
                    >
                      <button
                        className="char-select"
                        onClick={() => setActiveId(char.id)}
                      >
                        <div className="char-info">
                          <strong>{char.name}</strong>
                          <small>
                            {new Date(char.updatedAt).toLocaleDateString('pt-BR', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </small>
                        </div>
                      </button>

                      {char.id === activeId && (
                        <div className="char-actions">
                          <button
                            className="action-btn rename"
                            onClick={() => renameCharacter(char.id)}
                            title="Renomear"
                          >
                            ✏️
                          </button>
                          <button
                            className="action-btn export"
                            onClick={() => exportCharacter(char)}
                            title="Exportar"
                          >
                            ⬇️
                          </button>
                          <button
                            className="action-btn delete"
                            onClick={() => deleteCharacter(char.id)}
                            title="Deletar"
                          >
                            🗑️
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* IMPORTAR */}
            {activeCharacter && (
              <section className="sidebar-section">
                <h3>Ações</h3>
                <label className="btn-import">
                  ⬆️ Importar JSON
                  <input
                    type="file"
                    accept=".json"
                    onChange={importCharacter}
                    style={{ display: 'none' }}
                  />
                </label>
              </section>
            )}

            {/* FOOTER */}
            <section className="sidebar-footer">
              <div className="footer-info">
                <small>v1.0.0</small>
                <small>{characters.length} ficha(s)</small>
              </div>
            </section>
          </aside>
        )}

        {/* MAIN CONTENT */}
        <main className="app-main">
          {activeCharacter ? (
            <XcomCharacterSheet
              data={activeCharacter.data}
              editMode={editMode}
              theme={theme}
              onDataChange={updateActiveCharacter}
            />
          ) : (
            <div className="empty-state">
              <div className="empty-content">
                <h2>👋 Bem-vindo ao XCOM Character Builder</h2>
                <p>Crie sua primeira ficha para começar</p>
                <div className="empty-buttons">
                  <button
                    className="btn-primary"
                    onClick={() => createNewCharacter(XCOM_COMPLETE_TEMPLATE)}
                  >
                    + Criar Ficha Completa
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => createNewCharacter(XCOM_MINIMAL_TEMPLATE)}
                  >
                    + Criar Ficha Rápida
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
