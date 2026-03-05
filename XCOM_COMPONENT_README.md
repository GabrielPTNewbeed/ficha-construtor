# XcomCharacterSheet - Componente React Editável para TTRPG

Componente React completo e customizável para fichas de personagem de TTRPG inspiradas em XCOM. Totalmente arrastável, redimensionável, editável e pronto para produção.

## 📋 Características

✅ **Totalmente Editável** - Modo edição/visualização com drag-and-drop e resize  
✅ **Componentes Dinâmicos** - Suporte a campos de texto, números, progress bars e tabelas  
✅ **Temas Customizáveis** - Dark theme (XCOM), Light theme, e suporte a custom themes  
✅ **Arrastável & Redimensionável** - Usa react-rnd para gerenciar layouts  
✅ **Auto-save** - Integração pronta com localStorage  
✅ **Exportação/Importação** - JSON export/import de fichas completas  
✅ **TypeScript** - Totalmente tipado para segurança  
✅ **Responsivo** - Funciona em desktop, tablet e mobile  
✅ **Sem Dependências Pesadas** - Apenas react-rnd como dependência extra  

## 📁 Estrutura de Arquivos

```
src/
├── components/
│   └── XcomCharacterSheet.tsx      # Componente principal (Todo o código)
├── styles/
│   └── XcomCharacterSheet.css      # Estilos temáticos
├── data/
│   ├── xcomTemplates.ts            # Templates pré-configurados
│   ├── XcomCharacterSheetExample.tsx # Exemplo de uso completo
│   └── XcomCharacterSheetExample.css # Estilos do exemplo
```

## 🚀 Uso Rápido

### Instalação

O componente já vem pronto para usar. Ele usa `react-rnd` que já está instalado no `package.json`.

### Exemplo Simples

```tsx
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
```

### Exemplo Completo com Gerenciamento

Veja `src/data/XcomCharacterSheetExample.tsx` para um exemplo completo com:
- Múltiplas fichas
- Auto-save em localStorage
- Seleção de templates
- Exportação/importação de dados
- Gerenciamento de temas

## 📦 Props do Componente

```tsx
interface XcomCharacterSheetProps {
  data: SheetConfig;                    // Configuração da ficha (obrigatório)
  editMode?: boolean;                   // Ativa modo edição (default: false)
  theme?: 'xcom' | 'xcom-light' | 'custom';  // Tema da ficha
  customTheme?: {                       // Cores customizadas
    primaryColor: string;
    secondaryColor: string;
    backgroundColor: string;
    fontFamily: string;
  };
  onDataChange?: (data: SheetConfig) => void;  // Callback quando dados mudam
}
```

## 🎨 Estrutura de Dados (SheetConfig)

```tsx
interface SheetConfig {
  name: string;                         // Nome da ficha
  description: string;                  // Descrição
  layout: string;                       // Tipo de layout ("grid")
  sections: SectionConfig[];            // Array de seções
  globalStyle?: {
    theme: string;
    background: string;
    fontFamily: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

interface SectionConfig {
  id: string;                           // ID único da seção
  title: string;                        // Título exibido
  position: Position;                   // x, y, width, height
  fields?: Field[];                     // Para formulários
  columns?: TableColumn[];              // Para tabelas
  rows?: (string | number)[][];         // Dados da tabela
  type?: 'table' | 'form';              // Tipo de renderização
  style?: StyleObject;                  // Estilos customizados
}

interface Field {
  name: string;
  type: 'text' | 'number' | 'progress-bar' | 'textarea';
  value?: string | number;
  default?: string | number;
  style?: StyleObject;
}
```

## 🎭 Templates Pré-Configurados

### XCOM_COMPLETE_TEMPLATE
Ficha completa com todas as seções: Informações Básicas, Atributos, Armas, Equipamentos, Armadura, Habilidades. Perfeito para campanha full-featured.

### XCOM_MINIMAL_TEMPLATE
Versão simplificada para uso rápido em mesa com essencial: Identity, Health e Combat.

### XCOM_LIGHT_TEMPLATE
Mesma estrutura do completo mas com tema light (fundo claro).

### Criar Template Customizado

```tsx
import { createCustomTemplate } from './data/xcomTemplates';

const meuTemplate = createCustomTemplate({
  name: 'Minha Ficha Customizada',
  sections: [
    {
      id: 'custom-section',
      title: 'Minha Seção',
      position: { x: 0, y: 0, width: '50%', height: 'auto' },
      fields: [
        { name: 'Campo 1', type: 'text', default: '' }
      ]
    }
  ]
});
```

## 🎨 Customização de Temas

### Dark Theme (Default - XCOM)
```tsx
<XcomCharacterSheet
  data={sheetData}
  theme="xcom"
/>
```

### Light Theme
```tsx
<XcomCharacterSheet
  data={sheetData}
  theme="xcom-light"
/>
```

### Custom Theme
```tsx
<XcomCharacterSheet
  data={sheetData}
  theme="custom"
  customTheme={{
    primaryColor: '#FF00FF',
    secondaryColor: '#00FF00',
    backgroundColor: '#1a1a2e',
    fontFamily: 'Arial, sans-serif'
  }}
/>
```

## 💾 Save/Load

### Auto-save em localStorage

```tsx
const [sheetData, setSheetData] = useState(() => {
  const saved = localStorage.getItem('minha-ficha');
  return saved ? JSON.parse(saved) : XCOM_COMPLETE_TEMPLATE;
});

useEffect(() => {
  localStorage.setItem('minha-ficha', JSON.stringify(sheetData));
}, [sheetData]);

return (
  <XcomCharacterSheet
    data={sheetData}
    onDataChange={setSheetData}
  />
);
```

### Exportar para JSON

```tsx
const exportData = () => {
  const json = JSON.stringify(sheetData, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'ficha.json';
  a.click();
};
```

### Importar de JSON

```tsx
const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = JSON.parse(event.target?.result as string);
    setSheetData(data);
  };
  reader.readAsText(file);
};
```

## 🌐 Modos de Operação

### View Mode (Padrão)
- Usuário visualiza a ficha
- Nenhum drag/drop
- Apenas leitura

### Edit Mode
- Usuário pode editar campos
- Pode fazer drag/drop de seções
- Pode redimensionar seções
- Pode adicionar/remover linhas em tabelas

## 🔧 Extensões & Roadmap

### ✅ Implementado
- [x] Componentes customizáveis
- [x] Drag-and-drop
- [x] Resize
- [x] Modo edição
- [x] Tabelas dinâmicas
- [x] Progress bars
- [x] Temas customizáveis
- [x] Export JSON
- [x] TypeScript completo

### 🚀 Roadmap para Monetização

#### Phase 1: Funcionalidades Gratuitas (MVP)
- [x] Editor de fichas online
- [x] Templates básicos
- [x] Export JSON

#### Phase 2: Freemium (Temas Premium)
- [ ] Temas premium (Cyberpunk, Fantasy, Space Opera, etc.)
- [ ] Ícones premium
- [ ] Fontes premium
- [ ] Backgrounds customizados

**Como Implementar:**
```tsx
// Adicionar sistema de temas premium
const PREMIUM_THEMES = {
  cyberpunk: { /* cores e estilos */ },
  fantasy: { /* cores e estilos */ },
  spaceOpera: { /* cores e estilos */ }
};

// Validar se tema está desbloqueado
const isPremiumThemeUnlocked = (userId: string, theme: string) => {
  // Verificar em backend/database
};
```

#### Phase 3: PDF Export
- [ ] Export para PDF com estilos
- [ ] Export para imagem (PNG/JPG)
- [ ] Print-friendly version

**Implementação:**
```tsx
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const exportToPDF = async (sheetRef: HTMLDivElement) => {
  const canvas = await html2canvas(sheetRef);
  const pdf = new jsPDF();
  pdf.addImage(canvas.toDataURL(), 'PNG', 10, 10);
  pdf.save('ficha.pdf');
};
```

#### Phase 4: Colaboração Cloud
- [ ] Sincronização em cloud
- [ ] Compartilhamento de fichas
- [ ] Notas compartilhadas
- [ ] Histórico de versões

**Stack Sugerida:**
- Firebase Realtime/Firestore para sync
- Auth0 para autenticação
- Stripe para pagamentos

#### Phase 5: Integrações
- [ ] Integração com D&D Beyond
- [ ] API para mestres (criar campanhas)
- [ ] Mobile app nativa (React Native)
- [ ] Plugin para VTT (Roll20, Foundry)

### Receita Potencial
1. **Subscription** - Fichas ilimitadas + nuvem ($5-10/mês)
2. **Temas Premium** - $2.99-9.99 cada
3. **PDF Export** - Um-off payment ($9.99)
4. **API para Mestres** - $20-50/mês
5. **Licença Comercial** - $99-299

## 📚 Desenvolvimento Avançado

### Adicionar Novo Tipo de Campo

```tsx
// 1. Adicionar ao type Field em XcomCharacterSheet.tsx
type: 'text' | 'number' | 'progress-bar' | 'textarea' | 'select' | 'date';

// 2. Adicionar ao switch em EditableField
case 'select':
  return editMode ? (
    <select value={internalValue} onChange={(e) => handleChange(e.target.value)}>
      {field.options?.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  ) : (
    <div className="field-display">{internalValue}</div>
  );
```

### Adicionar Nova Seção Especializada

```tsx
// 1. Criar componente
const SkillsSection: React.FC<SectionProps> = ({ section, editMode, onUpdate }) => {
  // Implementar
};

// 2. Adicionar ao switch em XcomCharacterSheet::renderSection
case 'skills':
  return <SkillsSection section={section} editMode={editMode} onUpdate={handleSectionUpdate} />;
```

### Validação de Dados

```tsx
const validateSheetData = (data: SheetConfig): boolean => {
  if (!data.name || !data.sections.length) return false;
  // Adicionar mais validações
  return true;
};
```

## 🐛 Troubleshooting

### Componente não renderiza
- Verificar se CSS foi importado
- Verificar se react-rnd está instalado (`npm ls react-rnd`)

### Drag-drop não funciona em Edit Mode
- Verificar se `editMode={true}` está sendo passado
- Verificar se `dragHandleClassName="section-header"` está correto em react-rnd

### Tabelas não mostram dados
- Verificar se `type: 'table'` está setado na seção
- Verificar estrutura de `columns` e `rows`

## 📝 Licença

Este componente foi criado com foco em ser base para um web app de fichas de TTRPG. Sinta-se livre para usar, modificar e comercializar.

## 🤝 Contribuições

Sugestões de features e melhorias são bem-vindas!

---

**Created with ❤️ for TTRPG Masters and Players**
