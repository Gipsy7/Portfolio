# 🚀 Portfólio Pessoal

Site de portfólio moderno e responsivo desenvolvido com **HTML, CSS e JavaScript puro**.

## ✨ Características

- ✅ Design moderno com tema dark
- ✅ Totalmente responsivo (mobile e desktop)
- ✅ Animações suaves ao scroll
- ✅ Cards de projetos interativos
- ✅ Seções: Hero, Projetos, Sobre, Contato
- ✅ Código limpo e comentado
- ✅ Sem dependências de frameworks

## 📁 Estrutura do Projeto

```
Portfolio/
├── index.html          # Estrutura HTML principal
├── style.css           # Estilos CSS
├── script.js           # JavaScript
├── assets/
│   ├── images/         # Imagens dos projetos
│   ├── gifs/           # GIFs animados
│   └── videos/         # Vídeos de demonstração
└── README.md           # Este arquivo
```

## 🎨 Personalização

### 1. Informações Pessoais

Edite o [index.html](index.html) e substitua:

- `"Seu Nome"` - Seu nome completo
- `"Desenvolvedor Backend .NET"` - Seu título profissional
- Links do GitHub, LinkedIn e currículo
- Email e informações de contato

### 2. Projetos

No [index.html](index.html), encontre a seção `<section id="projects">` e edite os cards:

- **Imagens**: Substitua os placeholders por imagens reais dos seus projetos
- **Título**: Nome do projeto
- **Descrição**: Breve descrição do que o projeto faz
- **Tecnologias**: Tags com as tecnologias utilizadas
- **Links**: URLs do GitHub e demo

### 3. Adicionar Imagens/Vídeos

Coloque seus arquivos nas pastas:

- `assets/images/` - Imagens estáticas (.jpg, .png, .webp)
- `assets/gifs/` - GIFs animados
- `assets/videos/` - Vídeos (.mp4, .webm)

Depois, atualize o HTML:

```html
<!-- Imagem -->
<img src="assets/images/meu-projeto.png" alt="Meu Projeto">

<!-- GIF -->
<img src="assets/gifs/demo.gif" alt="Demo animada">

<!-- Vídeo -->
<video autoplay loop muted>
    <source src="assets/videos/demo.mp4" type="video/mp4">
</video>
```

### 4. Cores e Tema

Edite as variáveis CSS no início do [style.css](style.css):

```css
:root {
    --bg-primary: #0a0a0a;        /* Cor de fundo principal */
    --bg-secondary: #1a1a1a;      /* Cor de fundo secundária */
    --accent-primary: #6366f1;    /* Cor de destaque */
    --text-primary: #f5f5f5;      /* Cor do texto */
    /* ... */
}
```

### 5. Adicionar Novas Habilidades

No [index.html](index.html), encontre `.skills-grid` e adicione:

```html
<div class="skill-item">Nova Tecnologia</div>
```

## 🚀 Como Usar

### Opção 1: Abrir Localmente

1. Abra o arquivo `index.html` no seu navegador
2. Pronto! O site estará funcionando

### Opção 2: Live Server (VS Code)

1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"

### Opção 3: Deploy na Web

**GitHub Pages:**
1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings > Pages
4. Selecione a branch `main` e pasta `root`
5. Seu site estará em: `https://seu-usuario.github.io/nome-repo`

**Netlify:**
1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta do projeto
3. Pronto! URL gerada automaticamente

**Vercel:**
1. Acesse [vercel.com](https://vercel.com)
2. Importe o repositório do GitHub
3. Deploy automático

## 📝 Funcionalidades Opcionais

No [script.js](script.js) há código comentado para:

- 🔝 Botão "Voltar ao topo"
- 📧 Formulário de contato
- 🌙 Toggle de tema claro/escuro

Descomente as seções relevantes para ativar.

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (Flexbox, Grid, Custom Properties)
- JavaScript ES6+
- Intersection Observer API

## 📱 Responsividade

O site é totalmente responsivo com breakpoints em:

- Desktop: > 768px
- Tablet: 481px - 768px
- Mobile: < 480px

## 🎯 Próximos Passos

Sugestões de melhorias:

- [ ] Adicionar formulário de contato funcional
- [ ] Integrar com API do GitHub para mostrar repos automaticamente
- [ ] Adicionar seção de blog
- [ ] Implementar sistema de filtros nos projetos
- [ ] Adicionar modo claro/escuro
- [ ] Integrar Google Analytics

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar e modificar.

---

**Desenvolvido com 💜**
