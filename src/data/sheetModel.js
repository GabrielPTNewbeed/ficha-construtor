export const sheetModel = {
  id: "dnd5e_base",
  system: "dnd5e",

  blocks: [
    {
      id: "attributes",
      title: "Atributos",

      layout: {
        columns: 3
      },

      fields: [
        {
          id: "str",
          label: "Força",
          type: "number",
          path: "abilities.str",
          default: 10
        },
        {
          id: "dex",
          label: "Destreza",
          type: "number",
          path: "abilities.dex",
          default: 10
        },
        {
          id: "con",
          label: "Constituição",
          type: "number",
          path: "abilities.con",
          default: 10
        }
      ]
    }
  ]
};
