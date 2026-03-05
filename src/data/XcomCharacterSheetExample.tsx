/**
 * EXEMPLO DE USO - XcomCharacterSheet
 * 
 * Copie este código para seu App.tsx ou crie um novo componente
 * para usar o XcomCharacterSheet completo com suporte a múltiplas fichas,
 * auto-save e gerenciamento de temas.
 */

import React, { useState, useEffect } from 'react';
import XcomCharacterSheet from '../components/XcomCharacterSheet';
import { XCOM_COMPLETE_TEMPLATE, XCOM_MINIMAL_TEMPLATE, XCOM_LIGHT_TEMPLATE } from './xcomTemplates';
import type { SheetConfig } from '../types/sheetTypes';
import './XcomCharacterSheetExample.css';

interface SavedCharacter {
  id: string;
  name: string;
  data: SheetConfig;
  createdAt: string;
  updatedAt: string;
}

/**
 * Componente exemplo completo com:
 * - Múltiplas fichas abertas
 * - Auto-save em localStorage
 * - Seleção de template
 * - Exportação de dados
 * - Importação de dados
 */
export function XcomCharacterSheetExample() {
  const [characters, setCharacters] = useState<SavedCharacter[]>([]);
  const [activeCharacterId, setActiveCharacterId] = useState<string>('');
  const [editMode, setEditMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<'xcom' | 'xcom-light' | 'custom'>('xcom');

  // Carregar fichas do localStorage ao montar
  useEffect(() => {
    const saved = localStorage.getItem('xcom-characters');
    if (saved) {
      try {
        const parsed: SavedCharacter[] = JSON.parse(saved);
        setCharacters(parsed);
        if (parsed.length > 0) {
          setActiveCharacterId(parsed[0].id);
        }
      } catch (e) {
        console.warn('Erro ao carregar fichas salvas:', e);
      }
    } else {
      // Criar primeira ficha de exemplo
      createNewCharacter('Ficha Exemplo 1', XCOM_COMPLETE_TEMPLATE);
    }
  }, []);

  // Auto-save quando dados mudam
  useEffect(() => {
    if (characters.length > 0) {
      localStorage.setItem('xcom-characters', JSON.stringify(characters));
    }
  }, [characters]);

  const createNewCharacter = (name: string, template: SheetConfig) => {
    const newCharacter: SavedCharacter = {
      id: `char-${Date.now()}`,
      name,
      data: {
        ...template,
        name,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCharacters([...characters, newCharacter]);
    setActiveCharacterId(newCharacter.id);
  };

  const updateActiveCharacter = (updatedData: SheetConfig) => {
    setCharacters(
      characters.map((char) =>
        char.id === activeCharacterId
          ? {
              ...char,
              data: updatedData,
              updatedAt: new Date().toISOString(),
            }
          : char
      )
    );
  };

  const deleteCharacter = (id: string) => {
    const filtered = characters.filter((c) => c.id !== id);
    setCharacters(filtered);
    if (activeCharacterId === id && filtered.length > 0) {
      setActiveCharacterId(filtered[0].id);
    }
  };

  const renameCharacter = (id: string, newName: string) => {
    setCharacters(
      characters.map((char) =>
        char.id === id ? { ...char, name: newName } : char
      )
    );
  };

  const exportCharacter = (character: SavedCharacter) => {
    const json = JSON.stringify(character.data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ficha-${character.name.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importCharacter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string) as SheetConfig;
        createNewCharacter(data.name || 'Ficha Importada', data);
      } catch (error) {
        alert('Erro ao importar ficha: ' + error);
      }
    };
    reader.readAsText(file);
  };

  const activeCharacter = characters.find((c) => c.id === activeCharacterId);

  return (
    <div className="xcom-app-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Minhas Fichas</h2>
          <button className="btn-sidebar" title="Adicionar nova ficha">
            ➕
          </button>
        </div>

        <div className="sidebar-menu">
          <div className="menu-section">
            <h3>Fichas Rápidas</h3>
            <button
              className="quick-template"
              onClick={() => createNewCharacter('Ficha Completa', XCOM_COMPLETE_TEMPLATE)}
            >
              Template Completo
            </button>
            <button
              className="quick-template"
              onClick={() => createNewCharacter('Ficha Rápida', XCOM_MINIMAL_TEMPLATE)}
            >
              Template Minimalista
            </button>
            <button
              className="quick-template"
              onClick={() => createNewCharacter('Ficha Light', XCOM_LIGHT_TEMPLATE)}
            >
              Theme Light
            </button>
          </div>

          <div className="menu-section">
            <h3>Fichas Salvas ({characters.length})</h3>
            <div className="character-list">
              {characters.map((character) => (
                <button
                  key={character.id}
                  className={`character-item ${
                    activeCharacterId === character.id ? 'active' : ''
                  }`}
                  onClick={() => setActiveCharacterId(character.id)}
                >
                  <span className="char-name">{character.name}</span>
                  <span className="char-info">
                    {new Date(character.updatedAt).toLocaleDateString('pt-BR')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {activeCharacter && (
            <div className="menu-section actions">
              <h3>Ações</h3>
              <button
                className="action-btn"
                onClick={() => {
                  const newName = prompt('Novo nome:', activeCharacter.name);
                  if (newName) renameCharacter(activeCharacter.id, newName);
                }}
              >
                ✏️ Renomear
              </button>
              <button
                className="action-btn"
                onClick={() => exportCharacter(activeCharacter)}
              >
                ⬇️ Exportar
              </button>
              <label className="action-btn import-btn">
                ⬆️ Importar
                <input
                  type="file"
                  accept=".json"
                  onChange={importCharacter}
                  style={{ display: 'none' }}
                />
              </label>
              <button
                className="action-btn delete"
                onClick={() => {
                  if (
                    window.confirm(
                      `Deletar ficha "${activeCharacter.name}"? Esta ação não pode ser desfeita.`
                    )
                  ) {
                    deleteCharacter(activeCharacter.id);
                  }
                }}
              >
                🗑️ Deletar
              </button>
            </div>
          )}
        </div>

        <div className="sidebar-footer">
          <div className="theme-selector">
            <label>Tema:</label>
            <select
              value={selectedTheme}
              onChange={(e) =>
                setSelectedTheme(e.target.value as 'xcom' | 'xcom-light' | 'custom')
              }
            >
              <option value="xcom">Dark (XCOM)</option>
              <option value="xcom-light">Light</option>
            </select>
          </div>

          <div className="info">
            <small>Fichas Auto-salvam</small>
            <small>{characters.length} ficheiro(s) armazenado(s)</small>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        {activeCharacter ? (
          <>
            <XcomCharacterSheet
              data={activeCharacter.data}
              editMode={editMode}
              theme={selectedTheme}
              onDataChange={updateActiveCharacter}
            />
          </>
        ) : (
          <div className="empty-state">
            <h2>Nenhuma ficha aberta</h2>
            <button onClick={() => createNewCharacter('Nova Ficha', XCOM_COMPLETE_TEMPLATE)}>
              Criar Primeira Ficha
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default XcomCharacterSheetExample;

// ============================================================================
// SIMPLE USAGE (para usar direto em App.tsx)
// ============================================================================

/**
 * Para uso simples, sem gerenciamento de múltiplas fichas:
 */

export function SimpleXcomSheet() {
  const [sheetData, setSheetData] = useState(XCOM_COMPLETE_TEMPLATE);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="simple-container">
      <header className="simple-header">
        <h1>Character Sheet</h1>
        <button onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Salvar' : 'Editar'}
        </button>
      </header>

      <XcomCharacterSheet
        data={sheetData}
        editMode={editMode}
        theme="xcom"
        onDataChange={setSheetData}
      />
    </div>
  );
}

/*
// PARA USAR NO APP.TSX, SIMPLESMENTE FAÇA:

import { SimpleXcomSheet } from './data/XcomCharacterSheetExample';

export function App() {
  return <SimpleXcomSheet />;
}

// OU USE O EXEMPLO COMPLETO COM GERENCIAMENTO:

import { XcomCharacterSheetExample } from './data/XcomCharacterSheetExample';

export function App() {
  return <XcomCharacterSheetExample />;
}
*/
