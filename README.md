# Ficha Construtor

🎭 **Character Sheet Builder para TTRPG** - aplicativo web para criar e gerenciar fichas de personagem para jogos de mesa.

**Live:** https://ficha-construtor.vercel.app

## 🎮 Componentes Suportados

### D&D 5e Character Sheet
- ✅ Ficha completa D&D 5e
- ✅ Dashboard com 16 skills e 6 saving throws
- ✅ Gerenciamento de magias (9 níveis + cantrips)
- ✅ Proficiências, sentidos, resistências
- ✅ Combate tático integrado

### XCOM Tactical Character Sheet
- ✅ Ficha XCOM TTRPG (novo!)
- ✅ Sistema de atributos customizável
- ✅ Tabelas de armas, equipamentos, habilidades
- ✅ Temas premium (Cyberpunk, Fantasy, Matrix, Steampunk, Eldritch)
- ✅ Drag-and-drop customizável

## ✨ Features Gerais

- 💾 **Persistência**: localStorage + import/export JSON
- 🎨 **Temas**: Dark/Light modes + 5 temas premium
- 📐 **Drag-Drop**: Reposicione elementos livremente
- 🔧 **Customizável**: Campos e layouts personalizáveis
- 📱 **Responsivo**: Funciona em desktop, tablet, mobile
- 🚀 **TypeScript**: Type-safe em toda parte

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
