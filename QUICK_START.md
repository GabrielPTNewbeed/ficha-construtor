# 🚀 QUICK START - Canvas Character Sheet Builder

## 5 Minutos para Rodar

### Passo 1: Verificar Dependências
```bash
npm ls react-rnd
```

Se não estiver instalado:
```bash
npm install react-rnd @types/react-rnd
```

### Passo 2: Usar em Seu App.tsx

Copie **APENAS ISSO** em seu `App.tsx`:

```tsx
import React from 'react';
import CanvasSheet from './components/CanvasSheet';

export function App() {
  return (
    <div className="app-root">
      <CanvasSheet />
    </div>
  );
}

export default App;
```

### Passo 3: Rodar
```bash
npm run dev
```

**PRONTO!** ✨ Abra http://localhost:5173

---

## Próximos Passos

### Ativar Auto-Save
```tsx
useEffect(() => {
  localStorage.setItem('minha-ficha', JSON.stringify(sheetData));
}, [sheetData]);
```

### Usar Temas Premium
```tsx
import { PREMIUM_THEMES_CATALOG } from './data/premiumThemes';

// Em um select:
<select onChange={(e) => {
  const theme = PREMIUM_THEMES_CATALOG[e.target.value];
  if (theme) setSheetData(theme.creator(sheetData));
}}>
  <option value="xcom">Dark</option>
  <option value="cyberpunk">Cyberpunk</option>
  <option value="fantasy">Fantasy</option>
  <option value="matrix">Matrix</option>
  <option value="steampunk">Steampunk</option>
  <option value="eldritch">Eldritch</option>
</select>
```

### Gerenciar Múltiplas Fichas
Veja `src/data/XcomCharacterSheetExample.tsx` para exemplo completo.

---

## Estrutura de Arquivos Criados

```
src/
├── components/
│   └── XcomCharacterSheet.tsx          ← Componente principal
├── styles/
│   └── XcomCharacterSheet.css          ← Estilos (já importado no .tsx)
├── data/
│   ├── xcomTemplates.ts                ← Templates pré-configurados
│   ├── premiumThemes.ts                ← Temas premium para monetização
│   ├── XcomCharacterSheetExample.tsx   ← Exemplo completo com múltiplas fichas
│   └── XcomCharacterSheetExample.css   ← Estilos do exemplo
├── types/
│   └── sheetTypes.ts                   ← Tipos TypeScript (opcional)
└── index.ts                            ← Índice de importações (opcional)
```

---

## Comandos Rápidos

| Ação | Código |
|------|--------|
| **Criar nova ficha** | `<XcomCharacterSheet data={XCOM_COMPLETE_TEMPLATE} />` |
| **Edit mode** | `editMode={true}` |
| **Tema light** | `theme="xcom-light"` |
| **Tema custom** | `theme="custom"` customTheme={{...}} |
| **Salvar mudanças** | `onDataChange={(data) => {...}}` |

---

## Problemas? 🔧

### CSS não aparece
- [ ] Verificar se arquivo CSS existe em `src/styles/XcomCharacterSheet.css`
- [ ] Verificar se import está em `XcomCharacterSheet.tsx`: `import '../styles/XcomCharacterSheet.css'`

### Drag-drop não funciona
- [ ] Verificar se `editMode={true}`
- [ ] Abrir DevTools > Console e procurar erros
- [ ] Verificar se `react-rnd` está instalado: `npm ls react-rnd`

### TypeScript errors
- [ ] `npm run lint` para verificar
- [ ] Adicionar `// @ts-ignore` acima da linha problemática (temporário)

---

## 📚 Documentação Completa

- **[XCOM_COMPONENT_README.md](./XCOM_COMPONENT_README.md)** - Documentação completa, props, customização
- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - 4 exemplos de uso, roadmap, monetização
- **[src/data/XcomCharacterSheetExample.tsx](./src/data/XcomCharacterSheetExample.tsx)** - Código pronto para copiar/colar
- **[src/data/premiumThemes.ts](./src/data/premiumThemes.ts)** - 5 temas premium para vender

---

## Monetização 💰

O componente já vem pronto para:
1. **Temas Premium** - Venda temas por $2.99-9.99 cada
2. **PDF Export** - Feature premium
3. **Subscription** - Modelo mensal ($5-10/mês)
4. **API** - Para mestres ($20/mês)

Veja `src/data/premiumThemes.ts` para exemplos.

---

## Community & Support

- Ver `XCOM_COMPONENT_README.md` para troubleshooting detalhado
- Checar `INTEGRATION_GUIDE.md` para mais exemplos

---

**Bom jogo! 🎲**
