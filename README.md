# Portfólio — Mikael Francisco

Site pessoal de **Mikael Francisco**, desenvolvedor backend .NET.
HTML, CSS e JavaScript puro — sem framework, sem build step.

🔗 **[mikaelfrancisco.vercel.app](https://mikaelfrancisco.vercel.app)**

## Estrutura

```
Portfolio/
├── index.html              # Home: hero, projetos, experiência, sobre, contato
├── petrukio.html           # Case study — SaaS multi-tenant (.NET + Next.js)
├── rollflix.html           # Case study — app Flutter
├── silva.html              # Case study — landing page jurídica
├── youtube-clipper.html    # Case study — app desktop de cortes (Python + React)
├── freelalivre.html        # Case study — plataforma de freelance (.NET 10 + React)
├── style.css               # Folha de estilo única (tokens + componentes + case studies)
├── script.js               # Navbar, tema, lightbox, animações de scroll
│
├── robots.txt              # Libera crawl + aponta o sitemap
├── sitemap.xml             # As 6 URLs (atualize <lastmod> ao publicar mudanças)
├── site.webmanifest        # PWA / ícones
├── vercel.json             # cleanUrls, cache de assets, headers de segurança
├── og-image.png            # Cartão de compartilhamento 1200×630
├── favicon.svg · favicon-32.png · apple-touch-icon.png · icon-192.png · icon-512.png
│
├── PROMOCAO.md             # ⭐ Checklist de divulgação e SEO
└── assets/
    ├── curriculo-mikael-francisco-2026.pdf
    ├── video/              # Demos em MP4 (convertidas dos GIFs originais)
    └── images/             # Screenshots em WebP + posters dos vídeos
```

## Rodar localmente

```bash
python -m http.server 8000
# abre http://localhost:8000
```

Ou use a extensão **Live Server** do VS Code (já configurada na porta 5501).

## Como o CSS está organizado

Tudo vive em `style.css` — as páginas de case study **não** têm mais `<style>` inline.

A cor de destaque de cada case study vem de um atributo no `<body>`:

```html
<body data-project="petrukio">   <!-- verde  -->
<body data-project="rollflix">   <!-- âmbar  -->
<body data-project="silva">      <!-- dourado -->
```

O CSS redefine `--accent-primary` / `--accent-secondary` por atributo, e todos os componentes
herdam automaticamente. Para acrescentar um projeto novo, basta um novo bloco `[data-project="..."]`.

O tema claro/escuro funciona do mesmo jeito, via `data-theme` no `<html>`: respeita o
`prefers-color-scheme` na primeira visita e depois salva a escolha em `localStorage`.

## Adicionar um projeto

1. Card novo em `index.html`, dentro de `.projects-grid` (copie um `<article class="project-card">` existente).
2. Página `nome-do-projeto.html` — copie uma existente e troque `<head>` e conteúdo.
3. `<body data-project="nome">` + o bloco de cores em `style.css`.
4. Acrescente a URL em `sitemap.xml`.
5. Adicione o card nos blocos "Outros projetos" das outras páginas de case study.

## Mídia

Os GIFs originais (~25 MB) foram convertidos para MP4 e os PNGs para WebP — **28 MB → 1,7 MB**.
Os originais continuam no histórico do git, caso precise.

Para converter mídia nova:

```bash
# GIF → MP4 + poster
ffmpeg -i entrada.gif -vf "fps=20,format=yuv420p" -c:v libx264 -crf 28 -movflags +faststart -an saida.mp4
ffmpeg -i entrada.gif -frames:v 1 -vf format=rgba -c:v libwebp -quality 80 poster.webp

# PNG/JPG → WebP
ffmpeg -i entrada.png -vf format=rgba -c:v libwebp -quality 82 saida.webp
```

## Deploy

Push na `main` → a Vercel publica sozinha.

⚠️ `vercel.json` usa `cleanUrls: true`, então as URLs públicas **não têm `.html`**
(`/petrukio`, não `/petrukio.html`). Os `canonical` e o `sitemap.xml` já seguem esse formato.

## Divulgação e SEO

Veja **[PROMOCAO.md](PROMOCAO.md)** — checklist de indexação no Google, backlinks e distribuição.
