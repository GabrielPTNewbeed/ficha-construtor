export const sheetlayout = {
    pages: {
        ficha: [
            {
                id: "basic-info",
                title: "Informações Básicas",
                columns: 3,
                fields: [
                    { label: "Nome", path: "name", type: "text" },
                    { label: "Classe", path: "class", type: "text" },
                    { label: "Raça", path: "race", type: "text" },
                    { label: "Antecedente", path: "background", type: "text" },
                    { label: "jogador", path: "player", type: "text" },
                ]
            },
            {
                id: "level-info",
                title: "Progressão",
                columns: 2,
                fields: [
                    { label: "Nível", path: "level", type: "number" },
                    { label: "XP", path: "experience", type: "number" },
                ]
            }
        ]
    }
};