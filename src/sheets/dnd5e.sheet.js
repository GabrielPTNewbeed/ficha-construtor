export const dnd5eSheet = {
  id: "dnd5e",
  name: "D&D 5e",

  fields: [
    { id: "name", label: "Nome", type: "text" },
    { id: "class", label: "Classe", type: "text" },
    { id: "race", label: "Raça", type: "text" },

    {
      id: "abilities",
      type: "group",
      children: [
        { id: "str", label: "Força", type: "number", default: 10 },
        { id: "dex", label: "Destreza", type: "number", default: 10 },
      ]
    }
  ],

  skills: [
    { id: "acrobatics", label: "Acrobacia", basedOn: "dex" },
    { id: "arcana", label: "Arcanismo", basedOn: "int" }
  ]
};
