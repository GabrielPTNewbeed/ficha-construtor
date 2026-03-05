import type { SheetConfig } from '../types/sheetTypes';

/**
 * XCOM TTRPG Character Sheet Templates
 * 
 * Pré-configurações de fichas para TTRPG inspiradas em XCOM
 * Use como referência ou importe diretamente em seus componentes
 */

// ============================================================================
// TEMPLATE COMPLETO XCOM (baseado no modelo fornecido)
// ============================================================================

export const XCOM_COMPLETE_TEMPLATE: SheetConfig = {
  name: 'Ficha XCOM TTRPG',
  description:
    'Modelo de ficha editável para TTRPG inspirado no universo XCOM, com foco em táticas de turno, sobrevivência contra alienígenas e gerenciamento de recursos.',
  layout: 'grid',
  sections: [
    {
      id: 'basic-info',
      title: 'Informações Básicas',
      position: { x: 0, y: 0, width: '30%', height: 'auto' },
      fields: [
        {
          name: 'Apelido',
          type: 'text',
          default: 'BandAid',
          style: { color: '#00BFFF' },
        },
        {
          name: 'Classe',
          type: 'text',
          default: 'Soldado',
          style: {},
        },
        {
          name: 'Nível',
          type: 'number',
          default: 1,
          style: {},
        },
        {
          name: 'Experiência',
          type: 'number',
          default: 0,
          style: {},
        },
      ],
    },
    {
      id: 'attributes',
      title: 'Atributos Principais',
      position: { x: 0, y: 1, width: '40%', height: 'auto' },
      fields: [
        {
          name: 'Vida',
          type: 'progress-bar',
          value: '7/8',
          style: { barColor: '#FF4500', background: '#2F4F4F' },
        },
        {
          name: 'Precisão',
          type: 'number',
          value: 4,
          style: { icon: '🎯' },
        },
        {
          name: 'Movimentação',
          type: 'number',
          value: 8,
          style: { icon: '👢' },
        },
        {
          name: 'Concentração',
          type: 'number',
          value: 5,
          style: { icon: '🎓' },
        },
      ],
    },
    {
      id: 'weapons',
      title: 'Armas',
      position: { x: 1, y: 0, width: '60%', height: 'auto' },
      type: 'table',
      columns: [
        { header: 'Nome', width: '20%' },
        { header: 'Dano', width: '15%' },
        { header: 'Curto Alcance', width: '20%' },
        { header: 'Médio Alcance', width: '20%' },
        { header: 'Longo Alcance', width: '20%' },
        { header: 'Disparos', width: '15%' },
      ],
      rows: [
        ['Rifle de Assalto', '3', '3 Neutro', 'Vantagem', 'Desvantagem', '2/4'],
        ['Pistola', '2', '2 Vantagem', 'Neutro', 'Desvantagem', 'Ilimitado'],
        ['Granada', '4 (Área)', 'Alcance 4', 'Alcance 5', 'Alcance 6', '2'],
      ],
      style: { border: 'laser-grid', rowColor: '#1E90FF', hoverEffect: 'glow' },
    },
    {
      id: 'equipment',
      title: 'Equipamentos',
      position: { x: 1, y: 1, width: '30%', height: 'auto' },
      fields: [
        {
          name: 'Equipamento 1',
          type: 'text',
          default: 'Medkit (2 usos)',
          style: {},
        },
        {
          name: 'Equipamento 2',
          type: 'text',
          default: 'Munição Extra',
          style: {},
        },
        {
          name: 'Suprimentos',
          type: 'text',
          default: 'Ração de Sobrevivência',
          style: {},
        },
      ],
    },
    {
      id: 'armor',
      title: 'Armadura & Defesa',
      position: { x: 1, y: 2, width: '30%', height: 'auto' },
      fields: [
        {
          name: 'Armadura (pontos)',
          type: 'number',
          value: 2,
          style: { icon: '🛡️' },
        },
        {
          name: 'Esquiva',
          type: 'number',
          value: 3,
          style: { icon: '⚡' },
        },
        {
          name: 'Resistência Elemental',
          type: 'text',
          default: 'Nenhuma',
          style: {},
        },
      ],
    },
    {
      id: 'abilities',
      title: 'Habilidades & Poderes',
      position: { x: 0, y: 2, width: '70%', height: 'auto' },
      type: 'table',
      columns: [
        { header: 'Nome', width: '20%' },
        { header: 'Descrição', width: '50%' },
        { header: 'Custo', width: '15%' },
        { header: 'Cooldown', width: '15%' },
      ],
      rows: [
        [
          'Granada de Fumaça',
          '5 de cobertura até o fim do turno inimigo. Uso único',
          '1 AP',
          'Turno',
        ],
        [
          'Disparo Certeiro',
          'Próximo ataque tem vantagem. Requer linha de visão',
          '2 AP',
          '2 turnos',
        ],
        [
          'Cobertura Total',
          'Ganhe +4 de defesa até o próximo turno',
          '1 AP',
          'Permanente no turno',
        ],
      ],
      style: { border: 'laser-grid', rowColor: '#1E90FF', hoverEffect: 'glow' },
    },
    {
      id: 'notes',
      title: 'Notas & Histórico (opcional)',
      position: { x: 0, y: 3, width: '70%', height: 'auto' },
      fields: [
        {
          name: 'Descrição do Personagem',
          type: 'textarea',
          default:
            'Uma descrição breve do seu soldado XCOM. Histórico, motivação, aparência...',
          style: {},
        },
      ],
    },
  ],
  globalStyle: {
    name: 'XCOM Complete',
    primaryColor: '#00BFFF',
    secondaryColor: '#FF4500',
    backgroundColor: '#000000',
    fontFamily: 'Orbitron, monospace',
  },
};

// ============================================================================
// TEMPLATE MINIMALISTA (para rápido protótipo)
// ============================================================================

export const XCOM_MINIMAL_TEMPLATE: SheetConfig = {
  name: 'Ficha XCOM Rápida',
  description: 'Versão minimalista para uso rápido em mesa',
  layout: 'grid',
  sections: [
    {
      id: 'identity',
      title: 'Identidade',
      position: { x: 0, y: 0, width: '50%', height: 'auto' },
      fields: [
        { name: 'Apelido', type: 'text', default: '', style: {} },
        { name: 'Classe', type: 'text', default: '', style: {} },
      ],
    },
    {
      id: 'health',
      title: 'Saúde',
      position: { x: 50, y: 0, width: '50%', height: 'auto' },
      fields: [
        {
          name: 'Vida',
          type: 'progress-bar',
          value: '0/0',
          style: { barColor: '#FF4500' },
        },
      ],
    },
    {
      id: 'combat',
      title: 'Combate',
      position: { x: 0, y: 200, width: '100%', height: 'auto' },
      type: 'table',
      columns: [
        { header: 'Arma/Habilidade', width: '40%' },
        { header: 'Bônus', width: '30%' },
        { header: 'Alcance', width: '30%' },
      ],
      rows: [
        ['', '', ''],
        ['', '', ''],
      ],
      style: {},
    },
  ],
  globalStyle: {
    name: 'XCOM Minimal',
    primaryColor: '#00BFFF',
    secondaryColor: '#FF4500',
    backgroundColor: '#000000',
    fontFamily: 'Orbitron, monospace',
  },
};

// ============================================================================
// TEMPLATE TEMA ALTERNATIVO (Light Theme)
// ============================================================================

export const XCOM_LIGHT_TEMPLATE: SheetConfig = {
  name: 'Ficha XCOM Light',
  description: 'Versão com tema claro - adequado para ambientes bem iluminados',
  layout: 'grid',
  sections: [
    {
      id: 'basic-info',
      title: 'Informações Básicas',
      position: { x: 0, y: 0, width: '30%', height: 'auto' },
      fields: [
        {
          name: 'Apelido',
          type: 'text',
          default: 'Soldado',
          style: {},
        },
      ],
    },
    {
      id: 'attributes',
      title: 'Atributos',
      position: { x: 0, y: 1, width: '40%', height: 'auto' },
      fields: [
        {
          name: 'Vida',
          type: 'progress-bar',
          value: '10/10',
          style: { barColor: '#00AA00' },
        },
        { name: 'Força', type: 'number', value: 3, style: {} },
        { name: 'Agilidade', type: 'number', value: 4, style: {} },
      ],
    },
  ],
  globalStyle: {
    name: 'XCOM Light',
    primaryColor: '#0080ff',
    secondaryColor: '#ff6600',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Courier New, monospace',
  },
};

// ============================================================================
// BUILDER FUNCTION - Criar template customizado
// ============================================================================

/**
 * Cria um template customizado de ficha
 * Útil para permitir aos mestres criar fichas personalizadas
 */
export function createCustomTemplate(overrides: Partial<SheetConfig>): SheetConfig {
  return {
    ...XCOM_COMPLETE_TEMPLATE,
    ...overrides,
  };
}

// ============================================================================
// EXEMPLO DE USO PARA APP.TSX
// ============================================================================

/*
import React, { useState } from 'react';
import XcomCharacterSheet from './components/XcomCharacterSheet';
import { XCOM_COMPLETE_TEMPLATE } from './data/xcomTemplates';
import type { SheetConfig } from './components/XcomCharacterSheet';

export function App() {
  const [characters, setCharacters] = useState<SheetConfig[]>([XCOM_COMPLETE_TEMPLATE]);
  const [editingIndex, setEditingIndex] = useState(0);

  const handleDataChange = (updatedData: SheetConfig) => {
    const newCharacters = [...characters];
    newCharacters[editingIndex] = updatedData;
    setCharacters(newCharacters);
    
    // Auto-save para localStorage
    localStorage.setItem('xcom-characters', JSON.stringify(newCharacters));
  };

  return (
    <div className="app">
      <header>
        <h1>XCOM Character Sheet Builder</h1>
        <nav>
          {characters.map((char, idx) => (
            <button
              key={idx}
              onClick={() => setEditingIndex(idx)}
              className={editingIndex === idx ? 'active' : ''}
            >
              {char.name}
            </button>
          ))}
          <button onClick={() => setCharacters([...characters, XCOM_COMPLETE_TEMPLATE])}>
            + Nova Ficha
          </button>
        </nav>
      </header>

      <main>
        <XcomCharacterSheet
          data={characters[editingIndex]}
          editMode={true}
          theme="xcom"
          onDataChange={handleDataChange}
        />
      </main>
    </div>
  );
}

export default App;
*/
