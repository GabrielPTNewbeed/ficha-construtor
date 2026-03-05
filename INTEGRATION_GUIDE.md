/**
 * GUIA RÁPIDO DE INTEGRAÇÃO - XcomCharacterSheet
 * 
 * Este arquivo contém exemplos prontos para usar no seu App.tsx
 * Escolha um e cole no seu arquivo principal
 */

// ============================================================================
// OPÇÃO 1: USO MAIS SIMPLES (RECOMENDADO PARA COMEÇAR)
// ============================================================================

/*
// App.tsx

import React, { useState } from 'react';
import XcomCharacterSheet from './components/XcomCharacterSheet';
import { XCOM_COMPLETE_TEMPLATE } from './data/xcomTemplates';

export function App() {
  const [sheetData, setSheetData] = useState(XCOM_COMPLETE_TEMPLATE);

  return (
    <XcomCharacterSheet
      data={sheetData}
      editMode={true}
      theme="xcom"
      onDataChange={setSheetData}
    />
  );
}

export default App;
*/

// ============================================================================
// OPÇÃO 2: COM AUTO-SAVE EM LOCALSTORAGE
// ============================================================================

/*
// App.tsx

import React, { useState, useEffect } from 'react';
import XcomCharacterSheet from './components/XcomCharacterSheet';
import { XCOM_COMPLETE_TEMPLATE } from './data/xcomTemplates';
import type { SheetConfig } from './components/XcomCharacterSheet';

export function App() {
  const [sheetData, setSheetData] = useState<SheetConfig>(() => {
    // Carregar do localStorage ou usar template padrão
    const saved = localStorage.getItem('minha-ficha');
    return saved ? JSON.parse(saved) : XCOM_COMPLETE_TEMPLATE;
  });

  const [editMode, setEditMode] = useState(false);

  // Auto-save quando dados mudam
  useEffect(() => {
    localStorage.setItem('minha-ficha', JSON.stringify(sheetData));
  }, [sheetData]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Ficha XCOM - Character Builder</h1>
        <button
          onClick={() => setEditMode(!editMode)}
          className={editMode ? 'btn-active' : ''}
        >
          {editMode ? '✓ Salvo' : '✎ Editar'}
        </button>
      </header>

      <main>
        <XcomCharacterSheet
          data={sheetData}
          editMode={editMode}
          theme="xcom"
          onDataChange={setSheetData}
        />
      </main>
    </div>
  );
}

export default App;

// CSS simples para header
// .app-container { display: flex; flex-direction: column; height: 100vh; }
// .app-header { padding: 20px; border-bottom: 2px solid #00BFFF; }
// .btn-active { background-color: #00BFFF; color: #000; }
*/

// ============================================================================
// OPÇÃO 3: GERENCIADOR DE MÚLTIPLAS FICHAS (RECOMENDADO PARA PRODUÇÃO)
// ============================================================================

/*
// App.tsx

import React, { useState, useEffect } from 'react';
import XcomCharacterSheet from './components/XcomCharacterSheet';
import {
  XCOM_COMPLETE_TEMPLATE,
  XCOM_MINIMAL_TEMPLATE,
  XCOM_LIGHT_TEMPLATE,
} from './data/xcomTemplates';
import type { SheetConfig } from './components/XcomCharacterSheet';

interface Character {
  id: string;
  name: string;
  data: SheetConfig;
  createdAt: string;
  updatedAt: string;
}

export function App() {
  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem('xcom-characters');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeId, setActiveId] = useState<string>(() => {
    const saved = localStorage.getItem('active-character-id');
    return saved || characters[0]?.id || '';
  });

  const [editMode, setEditMode] = useState(false);

  // Auto-save
  useEffect(() => {
    localStorage.setItem('xcom-characters', JSON.stringify(characters));
  }, [characters]);

  useEffect(() => {
    localStorage.setItem('active-character-id', activeId);
  }, [activeId]);

  const activeCharacter = characters.find((c) => c.id === activeId);

  const createNewChar = (template: SheetConfig) => {
    const newChar: Character = {
      id: `char-${Date.now()}`,
      name: template.name,
      data: template,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCharacters([...characters, newChar]);
    setActiveId(newChar.id);
  };

  const updateActiveChar = (data: SheetConfig) => {
    setCharacters(
      characters.map((c) =>
        c.id === activeId
          ? { ...c, data, updatedAt: new Date().toISOString() }
          : c
      )
    );
  };

  const deleteChar = (id: string) => {
    const filtered = characters.filter((c) => c.id !== id);
    setCharacters(filtered);
    if (id === activeId && filtered.length > 0) {
      setActiveId(filtered[0].id);
    }
  };

  return (
    <div className="app-flex-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Minhas Fichas</h2>

        <div className="template-buttons">
          <button onClick={() => createNewChar(XCOM_COMPLETE_TEMPLATE)}>
            📋 Template Completo
          </button>
          <button onClick={() => createNewChar(XCOM_MINIMAL_TEMPLATE)}>
            ✓ Template Rápido
          </button>
          <button onClick={() => createNewChar(XCOM_LIGHT_TEMPLATE)}>
            ☀️ Template Light
          </button>
        </div>

        <div className="character-list">
          {characters.map((char) => (
            <button
              key={char.id}
              className={`char-button ${char.id === activeId ? 'active' : ''}`}
              onClick={() => setActiveId(char.id)}
            >
              <span className="char-name">{char.name}</span>
              <span className="char-delete" onClick={(e) => {
                e.stopPropagation();
                if (window.confirm('Deletar esta ficha?')) deleteChar(char.id);
              }}>
                ✕
              </span>
            </button>
          ))}
        </div>
      </aside>

      {/* SHEET */}
      <main className="sheet-area">
        {activeCharacter && (
          <>
            <div className="top-bar">
              <h1>{activeCharacter.name}</h1>
              <button onClick={() => setEditMode(!editMode)}>
                {editMode ? '✓ Salvar' : '✎ Editar'}
              </button>
            </div>
            <XcomCharacterSheet
              data={activeCharacter.data}
              editMode={editMode}
              theme="xcom"
              onDataChange={updateActiveChar}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;

// CSS para layout flex
/*
.app-flex-layout {
  display: flex;
  height: 100vh;
  gap: 0;
}

.sidebar {
  width: 250px;
  padding: 20px;
  background: #1a1f3a;
  border-right: 2px solid #00BFFF;
  overflow-y: auto;
}

.sidebar h2 {
  color: #00BFFF;
  margin-top: 0;
}

.template-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.template-buttons button,
.char-button {
  padding: 10px;
  background: rgba(0, 191, 255, 0.1);
  border: 1px solid #00BFFF;
  color: #00BFFF;
  border-radius: 4px;
  cursor: pointer;
  font-family: monospace;
}

.template-buttons button:hover,
.char-button:hover {
  background: rgba(0, 191, 255, 0.2);
}

.char-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
}

.char-button.active {
  background: #00BFFF;
  color: #000;
}

.sheet-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #00BFFF;
  background: rgba(0, 191, 255, 0.05);
}
*/
*/

// ============================================================================
// OPÇÃO 4: COM TEMAS CUSTOMIZÁVEIS & PREMIUM
// ============================================================================

/*
// App.tsx

import React, { useState, useEffect } from 'react';
import XcomCharacterSheet from './components/XcomCharacterSheet';
import { XCOM_COMPLETE_TEMPLATE } from './data/xcomTemplates';
import { PREMIUM_THEMES_CATALOG, isThemePremiumUnlocked } from './data/premiumThemes';
import type { SheetConfig } from './components/XcomCharacterSheet';

export function App() {
  const [sheetData, setSheetData] = useState(XCOM_COMPLETE_TEMPLATE);
  const [selectedTheme, setSelectedTheme] = useState<'xcom' | 'xcom-light' | 'custom'>('xcom');
  const [userId] = useState('demo-user'); // Em produção, vem de autenticação

  const handleThemeChange = (themeId: string) => {
    // Verificar se tema é premium
    if (['cyberpunk', 'fantasy', 'matrix', 'steampunk', 'eldritch'].includes(themeId)) {
      if (!isThemePremiumUnlocked(userId, themeId)) {
        alert('Este tema é premium. Compre para desbloquear!');
        return;
      }
      const themeMeta = PREMIUM_THEMES_CATALOG[themeId];
      if (themeMeta) {
        setSheetData(themeMeta.creator(sheetData));
      }
    } else {
      setSelectedTheme(themeId as 'xcom' | 'xcom-light');
    }
  };

  return (
    <div>
      <header>
        <h1>Character Sheet Builder</h1>
        <select value={selectedTheme} onChange={(e) => handleThemeChange(e.target.value)}>
          <option value="xcom">XCOM Dark</option>
          <option value="xcom-light">XCOM Light</option>
          {Object.values(PREMIUM_THEMES_CATALOG).map((theme) => (
            <option key={theme.id} value={theme.id}>
              {isThemePremiumUnlocked(userId, theme.id) ? '✓' : '🔒'} {theme.displayName}
            </option>
          ))}
        </select>
      </header>

      <XcomCharacterSheet
        data={sheetData}
        editMode={true}
        theme={selectedTheme}
        onDataChange={setSheetData}
      />
    </div>
  );
}

export default App;
*/

// ============================================================================
// CHECKLIST DE INTEGRAÇÃO
// ============================================================================

/*
PASO A PASO PARA INTEGRAR:

1. ✓ Garantir que react-rnd está instalado:
   npm ls react-rnd
   Se não estiver: npm install react-rnd

2. ✓ Copiar os arquivos criados para src/:
   - src/components/XcomCharacterSheet.tsx
   - src/styles/XcomCharacterSheet.css
   - src/data/xcomTemplates.ts
   - src/data/premiumThemes.ts
   - src/data/XcomCharacterSheetExample.tsx (opcional)

3. ✓ Importar o componente em App.tsx:
   import XcomCharacterSheet from './components/XcomCharacterSheet';
   import { XCOM_COMPLETE_TEMPLATE } from './data/xcomTemplates';

4. ✓ Montar o componente:
   <XcomCharacterSheet
     data={XCOM_COMPLETE_TEMPLATE}
     editMode={true}
     theme="xcom"
     onDataChange={(data) => console.log(data)}
   />

5. ✓ Testar:
   npm run dev

6. (Optional) Para usar gerenciador completo:
   Copiar o código de XcomCharacterSheetExample.tsx para App.tsx

PRONTO! O componente está rodando!
*/

// ============================================================================
// TROUBLESHOOTING COMMON ISSUES
// ============================================================================

/*
PROBLEMA: "Cannot find module 'react-rnd'"
SOLUÇÃO: 
  - npm install react-rnd
  - npm install @types/react-rnd

PROBLEMA: CSS não está sendo aplicado
SOLUÇÃO:
  - Verificar se o import do CSS está em XcomCharacterSheet.tsx:
    import '../styles/XcomCharacterSheet.css';
  - Verificar se o caminho do CSS está correto

PROBLEMA: Drag-drop não funciona
SOLUÇÃO:
  - Verificar se editMode={true}
  - Verificar se isDraggable={true} está sendo passado em SectionWrapper
  - Verificar browser console para erros

PROBLEMA: Tabelas comportam-se estranho
SOLUÇÃO:
  - Verificar se section.type === 'table'
  - Verificar se columns e rows estão definidas corretamente
  - Usar console.log para verificar a estrutura dos dados

PROBLEMA: Performance lenta com muitos dados
SOLUÇÃO:
  - Usar React.memo() em componentes
  - Implementar useMemo() para cálculos pesados
  - Separar em múltiplos componentes menores
*/

// ============================================================================
// PRÓXIMOS PASSOS / ROADMAP
// ============================================================================

/*
PARA VIRAR UM PRODUTO COMERCIAL:

CURTO PRAZO (1-2 semanas):
- [ ] Deploy em Vercel/Netlify
- [ ] Setup de autenticação (Auth0, Firebase Auth)
- [ ] localStorage -> Firebase Firestore sync
- [ ] Página de pricing para temas premium

MÉDIO PRAZO (1-2 meses):
- [ ] Integração Stripe/PayPal
- [ ] Email notifications
- [ ] Admin dashboard para analytics
- [ ] Suporte a múltiplos idiomas

LONGO PRAZO (3-6 meses):
- [ ] PDF export
- [ ] Compartilhamento público de fichas
- [ ] Colaboração em tempo real
- [ ] App mobile (React Native)
- [ ] VTT plugins (Roll20, Foundry)

REVENUE STREAMS:
1. Subscription model ($5-10/mês)
2. Theme marketplace ($2.99-9.99 cada)
3. PDF export ($9.99 one-time)
4. API para mestres ($20/mês)
5. White-label solution ($100+)
*/

export {};
