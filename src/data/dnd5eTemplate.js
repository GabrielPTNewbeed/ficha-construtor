/**
 * Template D&D 5e para CanvasSheet
 * Posicionado aproximadamente como a ficha oficial de D&D 5e
 */

export const DND5E_TEMPLATE = {
  name: "D&D 5e",
  widgets: [
    // ========== HEADER: Basic Character Info ==========
    {
      id: "name",
      type: "text",
      label: "Character Name",
      value: "",
      position: { x: 10, y: 10 },
      size: { width: 280, height: 60 },
      category: "header"
    },
    {
      id: "player",
      type: "text",
      label: "Player Name",
      value: "",
      position: { x: 300, y: 10 },
      size: { width: 200, height: 60 },
      category: "header"
    },
    {
      id: "race",
      type: "text",
      label: "Race",
      value: "",
      position: { x: 510, y: 10 },
      size: { width: 150, height: 60 },
      category: "header"
    },
    {
      id: "class",
      type: "text",
      label: "Class",
      value: "",
      position: { x: 670, y: 10 },
      size: { width: 150, height: 60 },
      category: "header"
    },
    {
      id: "background",
      type: "text",
      label: "Background",
      value: "",
      position: { x: 830, y: 10 },
      size: { width: 150, height: 60 },
      category: "header"
    },
    {
      id: "alignment",
      type: "text",
      label: "Alignment",
      value: "",
      position: { x: 990, y: 10 },
      size: { width: 150, height: 60 },
      category: "header"
    },

    // ========== LEVEL & EXP ==========
    {
      id: "level",
      type: "number",
      label: "Level",
      value: 1,
      position: { x: 10, y: 80 },
      size: { width: 100, height: 60 },
      category: "progress"
    },
    {
      id: "experience",
      type: "number",
      label: "Experience",
      value: 0,
      position: { x: 120, y: 80 },
      size: { width: 180, height: 60 },
      category: "progress"
    },

    // ========== ABILITY SCORES ==========
    {
      id: "str",
      type: "number",
      label: "STR",
      value: 10,
      position: { x: 10, y: 150 },
      size: { width: 80, height: 80 },
      category: "abilities"
    },
    {
      id: "str_mod",
      type: "calculated",
      label: "STR Mod",
      formula: "floor((getValue('str') - 10) / 2)",
      position: { x: 10, y: 240 },
      size: { width: 80, height: 50 },
      category: "abilities"
    },

    {
      id: "dex",
      type: "number",
      label: "DEX",
      value: 10,
      position: { x: 100, y: 150 },
      size: { width: 80, height: 80 },
      category: "abilities"
    },
    {
      id: "dex_mod",
      type: "calculated",
      label: "DEX Mod",
      formula: "floor((getValue('dex') - 10) / 2)",
      position: { x: 100, y: 240 },
      size: { width: 80, height: 50 },
      category: "abilities"
    },

    {
      id: "con",
      type: "number",
      label: "CON",
      value: 10,
      position: { x: 190, y: 150 },
      size: { width: 80, height: 80 },
      category: "abilities"
    },
    {
      id: "con_mod",
      type: "calculated",
      label: "CON Mod",
      formula: "floor((getValue('con') - 10) / 2)",
      position: { x: 190, y: 240 },
      size: { width: 80, height: 50 },
      category: "abilities"
    },

    {
      id: "int",
      type: "number",
      label: "INT",
      value: 10,
      position: { x: 280, y: 150 },
      size: { width: 80, height: 80 },
      category: "abilities"
    },
    {
      id: "int_mod",
      type: "calculated",
      label: "INT Mod",
      formula: "floor((getValue('int') - 10) / 2)",
      position: { x: 280, y: 240 },
      size: { width: 80, height: 50 },
      category: "abilities"
    },

    {
      id: "wis",
      type: "number",
      label: "WIS",
      value: 10,
      position: { x: 370, y: 150 },
      size: { width: 80, height: 80 },
      category: "abilities"
    },
    {
      id: "wis_mod",
      type: "calculated",
      label: "WIS Mod",
      formula: "floor((getValue('wis') - 10) / 2)",
      position: { x: 370, y: 240 },
      size: { width: 80, height: 50 },
      category: "abilities"
    },

    {
      id: "cha",
      type: "number",
      label: "CHA",
      value: 10,
      position: { x: 460, y: 150 },
      size: { width: 80, height: 80 },
      category: "abilities"
    },
    {
      id: "cha_mod",
      type: "calculated",
      label: "CHA Mod",
      formula: "floor((getValue('cha') - 10) / 2)",
      position: { x: 460, y: 240 },
      size: { width: 80, height: 50 },
      category: "abilities"
    },

    // ========== PROFICIENCY BONUS ==========
    {
      id: "proficiency_bonus",
      type: "calculated",
      label: "Prof Bonus",
      formula: "2 + floor((getValue('level') - 1) / 4)",
      position: { x: 560, y: 150 },
      size: { width: 100, height: 60 },
      category: "combat"
    },

    // ========== COMBAT STATS ==========
    {
      id: "ac",
      type: "number",
      label: "AC",
      value: 10,
      position: { x: 670, y: 150 },
      size: { width: 80, height: 60 },
      category: "combat"
    },
    {
      id: "hp",
      type: "number",
      label: "Current HP",
      value: 10,
      position: { x: 760, y: 150 },
      size: { width: 100, height: 60 },
      category: "combat"
    },
    {
      id: "maxHp",
      type: "number",
      label: "Max HP",
      value: 10,
      position: { x: 870, y: 150 },
      size: { width: 100, height: 60 },
      category: "combat"
    },
    {
      id: "tempHp",
      type: "number",
      label: "Temp HP",
      value: 0,
      position: { x: 980, y: 150 },
      size: { width: 100, height: 60 },
      category: "combat"
    },
    {
      id: "speed",
      type: "text",
      label: "Speed",
      value: "30",
      position: { x: 1090, y: 150 },
      size: { width: 90, height: 60 },
      category: "combat"
    },

    // ========== CHARACTER TRAITS (BOTTOM) ==========
    {
      id: "traits",
      type: "textarea",
      label: "Personality Traits",
      value: "",
      position: { x: 10, y: 310 },
      size: { width: 280, height: 120 },
      category: "traits"
    },
    {
      id: "ideals",
      type: "textarea",
      label: "Ideals",
      value: "",
      position: { x: 300, y: 310 },
      size: { width: 280, height: 120 },
      category: "traits"
    },
    {
      id: "bonds",
      type: "textarea",
      label: "Bonds",
      value: "",
      position: { x: 590, y: 310 },
      size: { width: 280, height: 120 },
      category: "traits"
    },
    {
      id: "flaws",
      type: "textarea",
      label: "Flaws",
      value: "",
      position: { x: 880, y: 310 },
      size: { width: 280, height: 120 },
      category: "traits"
    },

    // ========== FEATURES & TRAITS ==========
    {
      id: "feature",
      type: "textarea",
      label: "Features & Traits",
      value: "",
      position: { x: 10, y: 440 },
      size: { width: 400, height: 150 },
      category: "details"
    },
    {
      id: "backstory",
      type: "textarea",
      label: "Backstory",
      value: "",
      position: { x: 420, y: 440 },
      size: { width: 400, height: 150 },
      category: "details"
    },
    {
      id: "equipment",
      type: "textarea",
      label: "Equipment",
      value: "",
      position: { x: 830, y: 440 },
      size: { width: 350, height: 150 },
      category: "details"
    }
  ]
};
