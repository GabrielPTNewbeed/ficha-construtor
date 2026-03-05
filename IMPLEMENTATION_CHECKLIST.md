# ✅ CHECKLIST DE IMPLEMENTAÇÃO

Use este arquivo para acompanhar seu progresso na implementação do XcomCharacterSheet.

---

## 🟢 FASE 1: SETUP (30 min)

- [ ] **1.1** - Ler `QUICK_START.md` (5 min)
- [ ] **1.2** - Verificar que react-rnd está instalado: `npm ls react-rnd`
- [ ] **1.3** - Se não tiver: `npm install react-rnd @types/react-rnd`
- [ ] **1.4** - Todos os 15 arquivos estão na pasta certa?
  - [ ] `src/components/XcomCharacterSheet.tsx` ✓
  - [ ] `src/styles/XcomCharacterSheet.css` ✓
  - [ ] `src/data/xcomTemplates.ts` ✓
  - [ ] `src/data/premiumThemes.ts` ✓
  - [ ] `src/data/XcomCharacterSheetExample.tsx` ✓
  - [ ] `src/data/XcomCharacterSheetExample.css` ✓
  - [ ] `src/types/sheetTypes.ts` ✓
  - [ ] `src/index.ts` ✓
  - [ ] `src/AppExample.tsx` ✓
  - [ ] `src/styles/app.css` ✓

---

## 🟢 FASE 2: TESTE RÁPIDO (15 min)

### Opção A: Uso Mínimo

- [ ] **2.1** - Abrir seu `App.tsx`
- [ ] **2.2** - Adicionar imports:
```tsx
import XcomCharacterSheet from './components/XcomCharacterSheet';
import { XCOM_COMPLETE_TEMPLATE } from './data/xcomTemplates';
```
- [ ] **2.3** - Adicionar componente:
```tsx
<XcomCharacterSheet
  data={XCOM_COMPLETE_TEMPLATE}
  editMode={true}
  theme="xcom"
/>
```
- [ ] **2.4** - Rodar: `npm run dev`
- [ ] **2.5** - Abrir `http://localhost:5173`
- [ ] **2.6** - Ver ficha XCOM renderizando ✓
- [ ] **2.7** - Testar botão "Editar"
- [ ] **2.8** - Tentar arrastar seção (se editMode=true)

### Opção B: Usar AppExample.tsx

- [ ] **2.1** - Rename `App.tsx` para `App.bak.tsx` (backup)
- [ ] **2.2** - Rename `AppExample.tsx` para `App.tsx`
- [ ] **2.3** - Rodar: `npm run dev`
- [ ] **2.4** - Testar tudo (criar, editar, salvar, exportar)

---

## 🟡 FASE 3: CUSTOMIZAÇÃO (1-2 horas)

- [ ] **3.1** - Ler `XCOM_COMPONENT_README.md`
- [ ] **3.2** - Entender Props do componente
- [ ] **3.3** - Customizar template para sua TTRPG:
  - [ ] Adicionar/remover seções
  - [ ] Renomear campos
  - [ ] Adicionar novos campos
  - [ ] Mudar número de atributos

- [ ] **3.4** - Customizar tema:
  ```tsx
  <XcomCharacterSheet
    theme="custom"
    customTheme={{
      primaryColor: '#suas-cores',
      secondaryColor: '#suas-cores',
      backgroundColor: '#suas-cores',
      fontFamily: 'sua-fonte'
    }}
  />
  ```

- [ ] **3.5** - Testar responsividade:
  - [ ] Desktop (1920px)
  - [ ] Tablet (768px)
  - [ ] Mobile (360px)

---

## 🟡 FASE 4: ARMAZENAMENTO (1 hora)

### Local Storage (Mais Simples)

- [ ] **4.1** - Adicionar auto-save em App.tsx:
```tsx
useEffect(() => {
  localStorage.setItem('minha-ficha', JSON.stringify(sheetData));
}, [sheetData]);
```

- [ ] **4.2** - Adicionar load ao montar:
```tsx
const [sheetData] = useState(() => {
  const saved = localStorage.getItem('minha-ficha');
  return saved ? JSON.parse(saved) : XCOM_COMPLETE_TEMPLATE;
});
```

- [ ] **4.3** - Testar:
  - [ ] Editar campo
  - [ ] Recarregar página (F5)
  - [ ] Dado está salvo? ✓

### Database (Firebase ou similar)

- [ ] **4.4** - Criar conta Firebase (ou similar)
- [ ] **4.5** - Setup Firestore
- [ ] **4.6** - Criar função `saveToDB()`:
```tsx
const saveToDB = async (data: SheetConfig) => {
  await db.collection('fichas')
    .doc(userId)
    .set(data);
};
```
- [ ] **4.7** - Chamar no `onDataChange`

---

## 🟠 FASE 5: AUTENTICAÇÃO (2 horas)

### Opção A: Auth0

- [ ] **5.1** - Criar conta Auth0
- [ ] **5.2** - Instalar: `npm install @auth0/auth0-react`
- [ ] **5.3** - Configurar provider
- [ ] **5.4** - Adicionar login/logout buttons
- [ ] **5.5** - Proteger dados com userId

### Opção B: Firebase Auth

- [ ] **5.1** - Usar Firebase já instalado
- [ ] **5.2** - Adicionar autenticação
- [ ] **5.3** - Salvar fichas por user

### Opção C: Saltar por agora

- [ ] **5.99** - Pular para fase 6

---

## 🟠 FASE 6: MÚLTIPLAS FICHAS (2 horas)

- [ ] **6.1** - Adicionar gerenciador (como em AppExample.tsx)
- [ ] **6.2** - Criar função para novo personagem
- [ ] **6.3** - Adicionar lista de personagens
- [ ] **6.4** - Permitir deletar personagem
- [ ] **6.5** - Salvar ativa na localStorage
- [ ] **6.6** - Testar tudo

---

## 🔴 FASE 7: EXTRA [OPCIONAL]

### Import/Export JSON

- [ ] **7.1** - Implementar export:
```tsx
const exportData = () => {
  const json = JSON.stringify(sheetData);
  // ... criar download
};
```

- [ ] **7.2** - Implementar import:
```tsx
const importData = (file: File) => {
  // ... carregar e parsear JSON
};
```

- [ ] **7.3** - Testar

### PDF Export

- [ ] **7.4** - Instalar: `npm install jspdf html2canvas`
- [ ] **7.5** - Criar função de export para PDF
- [ ] **7.6** - Testar

### Temas Premium

- [ ] **7.7** - Ler `src/data/premiumThemes.ts`
- [ ] **7.8** - Entender sistema de license
- [ ] **7.9** - Implementar unlock de temas
- [ ] **7.10** - Testar temas diferentes

---

## ✅ CHECKLIST FINAL - PRÉ-DEPLOY

- [ ] **Funcionalidade**
  - [ ] Criar ficha funciona
  - [ ] Editar campos funciona
  - [ ] Drag-drop funciona
  - [ ] Tabelas funcionam
  - [ ] Salvar funciona
  - [ ] Carregar funciona
  - [ ] Deletar funciona

- [ ] **Design**
  - [ ] Tema está aplicado
  - [ ] Cores estão customizadas
  - [ ] Fonte está customizada
  - [ ] Responsive em mobile

- [ ] **Performance**
  - [ ] Sem console errors
  - [ ] Sem console warnings
  - [ ] App carrega em < 3s
  - [ ] Edição é smooth (sem lag)

- [ ] **Segurança**
  - [ ] Autenticação implementada
  - [ ] Dados salvos com segurança
  - [ ] Sem dados sensíveis no localStorage
  - [ ] HTTPS configurado (se deploy)

- [ ] **Documentação**
  - [ ] README está atualizado
  - [ ] Instruções de uso claras
  - [ ] Exemplos bem documentados

- [ ] **Testes**
  - [ ] Testado em Chrome
  - [ ] Testado em Firefox
  - [ ] Testado em Safari (se Mac)
  - [ ] Testado em Mobile

---

## 🚀 DEPLOY CHECKLIST

### Build

- [ ] **Build.1** - `npm run build`
- [ ] **Build.2** - Sem erros?
- [ ] **Build.3** - Arquivo `.dist` criado?

### Vercel (Recomendado)

- [ ] **Deploy.1** - Conectar GitHub repo
- [ ] **Deploy.2** - Vercel detecta Vite?
- [ ] **Deploy.3** - Build automático ligado?
- [ ] **Deploy.4** - Deployar
- [ ] **Deploy.5** - Testar em produção
- [ ] **Deploy.6** - Domínio customizado?

### Netlify (Alternativa)

- [ ] **Deploy.1** - Conectar repo
- [ ] **Deploy.2** - Build command: `npm run build`
- [ ] **Deploy.3** - Publish dir: `dist`
- [ ] **Deploy.4** - Deploy

### Local (para demo)

- [ ] **Deploy.1** - `npm run preview`
- [ ] **Deploy.2** - Abrir `http://localhost:4173`
- [ ] **Deploy.3** - Tudo funciona?

---

## 💰 MONETIZAÇÃO CHECKLIST [FUTURO]

- [ ] **Mon.1** - Entender sistema premium em `premiumThemes.ts`
- [ ] **Mon.2** - Setup Stripe account
- [ ] **Mon.3** - Implementar pagamento
- [ ] **Mon.4** - Unlock de temas após pagamento
- [ ] **Mon.5** - Analytics de vendas

---

## 📋 TROUBLESHOOTING

Se algo não funcionar:

### CSS não aparece
- [ ] Verificar path: `src/styles/XcomCharacterSheet.css` existe?
- [ ] Verificar import em XcomCharacterSheet.tsx
- [ ] Abrir DevTools > Elements, procurar por `<link...css>`
- [ ] Se não estiver aí: import está errado

### Drag-drop não funciona
- [ ] Verificar `editMode={true}` está sendo passado
- [ ] Verificar `react-rnd` está instalado: `npm ls react-rnd`
- [ ] Abrir DevTools > Console, procurar por erros
- [ ] Se houver erro: ler mensagem e googlá

### Tipos TypeScript com erro
- [ ] Executar `npm run lint`
- [ ] Verificar `src/types/sheetTypes.ts`
- [ ] Se estiver confuso: usar `// @ts-ignore` temporariamente

### Página branca ao abrir
- [ ] Abrir DevTools > Console
- [ ] Há erros?
- [ ] Verificar `App.tsx` return
- [ ] Verificar imports estão corretos

---

## 📞 ONDE PEDIR AJUDA

1. **Documentação interna:**
   - `QUICK_START.md`
   - `XCOM_COMPONENT_README.md`
   - `INTEGRATION_GUIDE.md`

2. **Código comentado:**
   - Cada arquivo tem comentários detalhados
   - Ver `src/components/XcomCharacterSheet.tsx`

3. **Exemplos:**
   - `src/data/XcomCharacterSheetExample.tsx`
   - `src/AppExample.tsx`

4. **Tipos:**
   - `src/types/sheetTypes.ts`
   - Hover sobre componentes no VS Code

5. **Stack Overflow:**
   - Search por "react-rnd drag and drop"
   - Search por seus erros específicos

---

## ✨ PRÓXIMOS PASSOS RECOMENDADOS

1. **Agora:** Fazer FASE 1 + 2 (1 hora)
2. **Hoje:** Fazer FASE 3 (customizar para sua TTRPG)
3. **Essa semana:** Fazer FASE 4 + 5 (autenticação)
4. **Próxima semana:** FASE 6 (múltiplas fichas)
5. **Mês 1:** Publicar MVP
6. **Mês 2:** Implementar temas premium
7. **Mês 3:** Expandir features

---

**Status:** 🟢 Pronto para começar!

Marque as [ ] conforme avança.

Boa sorte! 🎲🚀
