# 🚀 GUIA DE DEPLOY - GitHub + Vercel

## Antes de Tudo

### Local (sua máquina)

#### 1. Limpar Pasta Anômala
```bash
# Remover pasta "workflow t"
Remove-Item -Path "workflow t" -Force -Recurse
```

#### 2. Testar Build
```bash
npm run build
```

✅ Sucesso = pronto para subir  
❌ Erro = veja mensagens de erro

#### 3. Testar Dev Server
```bash
npm run dev
```

Abra http://localhost:5173 e verifique se tudo funciona

---

## 📤 Subir para GitHub

### Paso 1: Initialize Git (se não estiver feito)
```bash
git init
git config user.email "seu@email.com"
git config user.name "Seu Nome"
```

### Passo 2: Add & Commit
```bash
# Adicionar todos os arquivos
git add .

# Commit inicial
git commit -m "feat: Initial commit - D&D 5e + XCOM character sheets"
```

### Passo 3: Push para GitHub

#### Se repo já existe:
```bash
git remote add origin https://github.com/GabrielPTNewbeed/ficha-construtor.git
git branch -M main
git push -u origin main
```

#### Se repo já tem origin:
```bash
git push -u origin main
```

### Verificar no GitHub
- Acesse https://github.com/GabrielPTNewbeed/ficha-construtor
- ✅ Todos os arquivos lá?
- ✅ .git e .gitignore funcionando?

---

## 🌐 Deploy no Vercel

### Passo 1: Conectar no Vercel

1. Acesse https://vercel.com
2. Login com GitHub (se não tem, criar conta)
3. Clique em **"Add New..."** → **"Project"**
4. Selecione **"Import Git Repository"**
5. Busque por `ficha-construtor` na lista

### Passo 2: Configuração Automática

Vercel detectará:
- ✅ Framework: Vite
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`

**Não precisa mudar nada** - tá tudo pronto!

### Passo 3: Deploy

1. Clique **"Deploy"**
2. Aguarde ~2-3 minutos
3. Vercel te dará um URL temporário (ex: `ficha-construtor-5xyz.vercel.app`)

### Passo 4: Domínio Customizado (Opcional)

1. No Dashboard Vercel
2. Vá para **"Domains"**
3. Clique **"Add"**
4. Digite `ficha-construtor.vercel.app` (ou seu domínio customizado)

---

## ✅ Verificação Pós-Deploy

### 1. Acessar o Site
```
https://ficha-construtor.vercel.app
```

### 2. Testar Funcionalidades
- ✅ Página carrega?
- ✅ D&D 5e Component abre?
- ✅ XCOM Component abre?
- ✅ Temas funcionam?
- ✅ Drag-drop funciona?
- ✅ Console sem erros (F12)?

### 3. Se Algo Está Errado

**Verificar Logs Vercel:**
1. Dashboard → Seu Projeto
2. Aba **"Deployments"**
3. Último deploy → **"View Logs"**
4. Procurar por erros (em vermelho)

---

## 🔄 Workflow: Atualizar Site

Toda vez que você faz um push para main, Vercel redeploya automaticamente!

```bash
# Modificar arquivos localmente
# ...

# Fazer commit
git add .
git commit -m "feat: Add new feature"

# Push
git push origin main

# Vercel detecta automaticamente e redeploya
# ~1-2 min depois seu site está atualizado
```

---

## 🐛 Troubleshooting

### Build Falha no Vercel
- Rodar localmente: `npm run build`
- Se funcionar localmente mas falha no Vercel:
  - Verificar se package-lock.json está no git
  - Rodar `npm install` novamente
  - Fazer push de novo

### Erro 404 após Deploy
- Vercel carrega `dist/index.html`?
- Vite está gerando dist corretamente?
- Testar: `npm run build && npm run preview`

### Funciona localmente mas não em produção
- F12 → Console → tem erros em vermelho?
- Verificar se imports de caminho estão corretos
- API calls com domínio errado?

---

## 📊 Environment Variables em Vercel

Se precisar adicionar variáveis de ambiente:

1. Dashboard Vercel
2. Seu Projeto → **"Settings"**
3. **"Environment Variables"**
4. Adicionar variáveis

Exemplo:
```
VITE_API_URL = https://api.example.com
VITE_API_KEY = seu_chave_secreta
```

---

## 🎯 Próximos Passos

1. ✅ GitHub push
2. ✅ Vercel deploy
3. ✅ Testar site live
4. ✅ Compartilhar URL: https://ficha-construtor.vercel.app

---

## 📞 Suporte

- **Erros de Build?** → Verificar logs Vercel
- **Site não carrega?** → F12 e procurar erros
- **Funcionalidade quebrada?** → Testar em dev local primeiro

---

**Gerado:** 2024-03-05  
**Próximo:** `git push origin main` → Deploy automático
