/**
 * Template XCOM para CanvasSheet
 * Baseado na estrutura fornecida pelo usuário
 * Posicionado de forma organizada no canvas
 */

export const XCOM_TEMPLATE = {
  name: "XCOM TTRPG",
  widgets: [
    // ========== HEADER: Basic Info ==========
    {
      id: "nickname",
      type: "text",
      label: "Apelido",
      value: "BandAid",
      position: { x: 10, y: 10 },
      size: { width: 200, height: 60 },
      category: "header"
    },
    {
      id: "class",
      type: "text",
      label: "Classe",
      value: "Soldado",
      position: { x: 220, y: 10 },
      size: { width: 150, height: 60 },
      category: "header"
    },
    {
      id: "level",
      type: "number",
      label: "Nível",
      value: 1,
      position: { x: 380, y: 10 },
      size: { width: 100, height: 60 },
      category: "header"
    },
    {
      id: "experience",
      type: "number",
      label: "Experiência",
      value: 0,
      position: { x: 490, y: 10 },
      size: { width: 150, height: 60 },
      category: "header"
    },

    // ========== ATTRIBUTES ==========
    {
      id: "health",
      type: "text",
      label: "Vida",
      value: "7/8",
      position: { x: 10, y: 80 },
      size: { width: 200, height: 60 },
      category: "attributes"
    },
    {
      id: "accuracy",
      type: "number",
      label: "Precisão",
      value: 4,
      position: { x: 220, y: 80 },
      size: { width: 120, height: 60 },
      category: "attributes"
    },
    {
      id: "movement",
      type: "number",
      label: "Movimentação",
      value: 8,
      position: { x: 350, y: 80 },
      size: { width: 120, height: 60 },
      category: "attributes"
    },
    {
      id: "concentration",
      type: "number",
      label: "Concentração",
      value: 5,
      position: { x: 480, y: 80 },
      size: { width: 120, height: 60 },
      category: "attributes"
    },

    // ========== WEAPONS TABLE ==========
    // Headers
    {
      id: "weapons_header",
      type: "text",
      label: "ARMAS",
      value: "",
      position: { x: 10, y: 160 },
      size: { width: 600, height: 40 },
      category: "weapons"
    },
    // Row 1
    {
      id: "weapon1_name",
      type: "text",
      label: "Nome",
      value: "Rifle de Assalto",
      position: { x: 10, y: 210 },
      size: { width: 120, height: 40 },
      category: "weapons"
    },
    {
      id: "weapon1_damage",
      type: "text",
      label: "Dano",
      value: "3",
      position: { x: 140, y: 210 },
      size: { width: 80, height: 40 },
      category: "weapons"
    },
    {
      id: "weapon1_short",
      type: "text",
      label: "Curto Alcance",
      value: "3 Neutro",
      position: { x: 230, y: 210 },
      size: { width: 120, height: 40 },
      category: "weapons"
    },
    {
      id: "weapon1_medium",
      type: "text",
      label: "Médio Alcance",
      value: "Vantagem",
      position: { x: 360, y: 210 },
      size: { width: 120, height: 40 },
      category: "weapons"
    },
    {
      id: "weapon1_long",
      type: "text",
      label: "Longo Alcance",
      value: "Desvantagem",
      position: { x: 490, y: 210 },
      size: { width: 120, height: 40 },
      category: "weapons"
    },
    {
      id: "weapon1_shots",
      type: "text",
      label: "Disparos",
      value: "2/4",
      position: { x: 620, y: 210 },
      size: { width: 80, height: 40 },
      category: "weapons"
    },

    // Row 2
    {
      id: "weapon2_name",
      type: "text",
      label: "Nome",
      value: "Pistola",
      position: { x: 10, y: 260 },
      size: { width: 120, height: 40 },
      category: "weapons"
    },
    {
      id: "weapon2_damage",
      type: "text",
      label: "Dano",
      value: "2",
      position: { x: 140, y: 260 },
      size: { width: 80, height: 40 },
      category: "weapons"
    },
    {
      id: "weapon2_short",
      type: "text",
      label: "Curto Alcance",
      value: "2 Vantagem",
      position: { x: 230, y: 260 },
      size: { width: 120, height: 40 },
      category: "weapons"
    },
    {
      id: "weapon2_medium",
      type: "text",
      label: "Médio Alcance",
      value: "Neutro",
      position: { x: 360, y: 260 },
      size: { width: 120, height: 40 },
      category: "weapons"
    },
    {
      id: "weapon2_long",
      type: "text",
      label: "Longo Alcance",
      value: "Desvantagem",
      position: { x: 490, y: 260 },
      size: { width: 120, height: 40 },
      category: "weapons"
    },
    {
      id: "weapon2_shots",
      type: "text",
      label: "Disparos",
      value: "Ilimitado",
      position: { x: 620, y: 260 },
      size: { width: 80, height: 40 },
      category: "weapons"
    },

    // Row 3
    {
      id: "weapon3_name",
      type: "text",
      label: "Nome",
      value: "Granada",
      position: { x: 10, y: 310 },
      size: { width: 120, height: 40 },
      category: "weapons"
    },
    {
      id: "weapon3_damage",
      type: "text",
      label: "Dano",
      value: "4 (Área)",
      position: { x: 140, y: 310 },
      size: { width: 80, height: 40 },
      category: "weapons"
    },
    {
      id: "weapon3_short",
      type: "text",
      label: "Curto Alcance",
      value: "Alcance 4",
      position: { x: 230, y: 310 },
      size: { width: 120, height: 40 },
      category: "weapons"
    },
    {
      id: "weapon3_medium",
      type: "text",
      label: "Médio Alcance",
      value: "Alcance 5",
      position: { x: 360, y: 310 },
      size: { width: 120, height: 40 },
      category: "weapons"
    },
    {
      id: "weapon3_long",
      type: "text",
      label: "Longo Alcance",
      value: "Alcance 6",
      position: { x: 490, y: 310 },
      size: { width: 120, height: 40 },
      category: "weapons"
    },
    {
      id: "weapon3_shots",
      type: "text",
      label: "Disparos",
      value: "2",
      position: { x: 620, y: 310 },
      size: { width: 80, height: 40 },
      category: "weapons"
    },

    // ========== EQUIPMENT ==========
    {
      id: "equipment_header",
      type: "text",
      label: "EQUIPAMENTOS",
      value: "",
      position: { x: 10, y: 370 },
      size: { width: 300, height: 40 },
      category: "equipment"
    },
    {
      id: "equipment1",
      type: "text",
      label: "Equipamento 1",
      value: "Medkit (2 usos)",
      position: { x: 10, y: 420 },
      size: { width: 300, height: 40 },
      category: "equipment"
    },
    {
      id: "equipment2",
      type: "text",
      label: "Equipamento 2",
      value: "Munição Extra",
      position: { x: 10, y: 470 },
      size: { width: 300, height: 40 },
      category: "equipment"
    },
    {
      id: "supplies",
      type: "text",
      label: "Suprimentos",
      value: "Ração de Sobrevivência",
      position: { x: 10, y: 520 },
      size: { width: 300, height: 40 },
      category: "equipment"
    },

    // ========== ARMOR & DEFENSE ==========
    {
      id: "armor_header",
      type: "text",
      label: "ARMADURA & DEFESA",
      value: "",
      position: { x: 320, y: 370 },
      size: { width: 300, height: 40 },
      category: "armor"
    },
    {
      id: "armor_points",
      type: "number",
      label: "Armadura (pontos)",
      value: 2,
      position: { x: 320, y: 420 },
      size: { width: 150, height: 40 },
      category: "armor"
    },
    {
      id: "evasion",
      type: "number",
      label: "Esquiva",
      value: 3,
      position: { x: 480, y: 420 },
      size: { width: 140, height: 40 },
      category: "armor"
    },
    {
      id: "elemental_resistance",
      type: "text",
      label: "Resistência Elemental",
      value: "Nenhuma",
      position: { x: 320, y: 470 },
      size: { width: 300, height: 40 },
      category: "armor"
    },

    // ========== ABILITIES TABLE ==========
    {
      id: "abilities_header",
      type: "text",
      label: "HABILIDADES & PODERES",
      value: "",
      position: { x: 10, y: 580 },
      size: { width: 600, height: 40 },
      category: "abilities"
    },
    // Row 1
    {
      id: "ability1_name",
      type: "text",
      label: "Nome",
      value: "Granada de Fumaça",
      position: { x: 10, y: 630 },
      size: { width: 120, height: 40 },
      category: "abilities"
    },
    {
      id: "ability1_desc",
      type: "text",
      label: "Descrição",
      value: "5 de cobertura até o fim do turno inimigo. Uso único",
      position: { x: 140, y: 630 },
      size: { width: 300, height: 40 },
      category: "abilities"
    },
    {
      id: "ability1_cost",
      type: "text",
      label: "Custo",
      value: "1 AP",
      position: { x: 450, y: 630 },
      size: { width: 80, height: 40 },
      category: "abilities"
    },
    {
      id: "ability1_cooldown",
      type: "text",
      label: "Cooldown",
      value: "Turno",
      position: { x: 540, y: 630 },
      size: { width: 80, height: 40 },
      category: "abilities"
    },

    // Row 2
    {
      id: "ability2_name",
      type: "text",
      label: "Nome",
      value: "Disparo Certeiro",
      position: { x: 10, y: 680 },
      size: { width: 120, height: 40 },
      category: "abilities"
    },
    {
      id: "ability2_desc",
      type: "text",
      label: "Descrição",
      value: "Próximo ataque tem vantagem. Requer linha de visão",
      position: { x: 140, y: 680 },
      size: { width: 300, height: 40 },
      category: "abilities"
    },
    {
      id: "ability2_cost",
      type: "text",
      label: "Custo",
      value: "2 AP",
      position: { x: 450, y: 680 },
      size: { width: 80, height: 40 },
      category: "abilities"
    },
    {
      id: "ability2_cooldown",
      type: "text",
      label: "Cooldown",
      value: "2 turnos",
      position: { x: 540, y: 680 },
      size: { width: 80, height: 40 },
      category: "abilities"
    },

    // Row 3
    {
      id: "ability3_name",
      type: "text",
      label: "Nome",
      value: "Cobertura Total",
      position: { x: 10, y: 730 },
      size: { width: 120, height: 40 },
      category: "abilities"
    },
    {
      id: "ability3_desc",
      type: "text",
      label: "Descrição",
      value: "Ganhe +4 de defesa até o próximo turno",
      position: { x: 140, y: 730 },
      size: { width: 300, height: 40 },
      category: "abilities"
    },
    {
      id: "ability3_cost",
      type: "text",
      label: "Custo",
      value: "1 AP",
      position: { x: 450, y: 730 },
      size: { width: 80, height: 40 },
      category: "abilities"
    },
    {
      id: "ability3_cooldown",
      type: "text",
      label: "Cooldown",
      value: "Permanente no turno",
      position: { x: 540, y: 730 },
      size: { width: 80, height: 40 },
      category: "abilities"
    },

    // ========== NOTES ==========
    {
      id: "notes",
      type: "textarea",
      label: "Notas & Histórico",
      value: "Uma descrição breve do seu soldado XCOM. Histórico, motivação, aparência...",
      position: { x: 10, y: 790 },
      size: { width: 600, height: 100 },
      category: "notes"
    }
  ]
};