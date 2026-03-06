# Ficha Construtor

🎭 **Character Sheet Builder para TTRPG** - aplicativo web para criar e gerenciar fichas de personagem para jogos de mesa usando um canvas totalmente editável.

**Live:** https://ficha-construtor.vercel.app

## 🎮 Templates Disponíveis

### D&D 5e Character Sheet
- ✅ Ficha completa D&D 5e
- ✅ Dashboard com 16 skills e 6 saving throws
- ✅ Gerenciamento de magias (9 níveis + cantrips)
- ✅ Proficiências, sentidos, resistências
- ✅ Combate tático integrado

### XCOM Tactical Character Sheet
- ✅ Ficha XCOM TTRPG baseada na estrutura fornecida
- ✅ Sistema de atributos (Vida, Precisão, Movimentação, Concentração)
- ✅ Tabelas de armas com alcances e danos
- ✅ Equipamentos e armadura
- ✅ Habilidades e poderes com custos e cooldowns
- ✅ Notas e histórico personalizáveis

## ✨ Features Gerais

- 💾 **Persistência**: localStorage + import/export JSON
- 🎨 **Temas**: Dark/Light modes + 5 temas premium
- 📐 **Drag-Drop**: Reposicione elementos livremente no canvas
- 🔧 **Customizável**: Campos e layouts personalizáveis
- 📱 **Responsivo**: Funciona em desktop, tablet, mobile
- 🚀 **TypeScript**: Type-safe em toda parte
- 🎯 **Canvas Editável**: Interface totalmente customizável com widgets móveis

## 🚀 Começar

### Instalação Rápida
```bash
npm install
npm run dev
```

Abra `http://localhost:5173` no navegador

### Build para Produção
```bash
npm run build
npm run preview
```

## 📚 Documentação

- [Quick Start](./QUICK_START.md) - primeiros 5 minutos
- [Componente XCOM](./XCOM_COMPONENT_README.md) - guia completo
- [Integração](./INTEGRATION_GUIDE.md) - integrar em seu projeto
- [Arquitetura](./ARCHITECTURE.md) - estrutura técnica
- [Checklist de Implementação](./IMPLEMENTATION_CHECKLIST.md) - passo-a-passo

## 🛠️ Stack Tecnológico

- **React** 19.1.1
- **Vite** (rolldown)
- **TypeScript** (parcial)
- **react-rnd** - drag-drop
- **mathjs** - cálculos matemáticos
- **CSS3** - temas com variáveis

## 🌐 Deploy

### Vercel (padrão)
```bash
git push origin main
# Deploy automático
```

**Ambiente**: https://ficha-construtor.vercel.app

### Configuração Vercel
- **Build**: `npm run build`
- **Output**: `dist/`
- **Auto-deploy**: On git push

## 📝 Licença

MIT - use livremente em seus projetos
