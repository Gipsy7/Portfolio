# Guia de divulgação do portfólio

Checklist prático para o site ser encontrado no Google e chegar a quem contrata.
Marque conforme for fazendo. A ordem importa: as tarefas da Semana 1 destravam as outras.

**URL do site:** https://mikaelfrancisco.vercel.app
_(se o nome do projeto na Vercel for outro, troque a URL aqui e nos arquivos listados em "Se a URL mudar", no fim deste documento)_

---

## Semana 1 — Colocar no ar e pedir indexação

Sem isso, nada mais importa: o Google não ranqueia o que não conhece.

- [ ] **Deploy na Vercel.** Acesse [vercel.com/new](https://vercel.com/new), importe o repositório `Gipsy7/Portfolio`. Em *Project Name*, use `mikaelfrancisco` (a URL sai de lá). Framework Preset: **Other**. Não precisa de build command. Deploy.
- [ ] **Confirme que o site abre** e que as 4 páginas funcionam: `/`, `/petrukio`, `/rollflix`, `/silva`.
- [ ] **Google Search Console** — [search.google.com/search-console](https://search.google.com/search-console)
  - Adicionar propriedade → **Prefixo do URL** → cole a URL do site.
  - Verificação: escolha **Tag HTML**, copie a meta tag e cole no `<head>` do `index.html` (logo abaixo de `<meta name="theme-color">`). Faça commit e push, espere o deploy, depois clique em Verificar.
  - Menu **Sitemaps** → digite `sitemap.xml` → Enviar.
  - Menu **Inspeção de URL** → cole cada uma das 4 URLs → **Solicitar indexação**.
- [ ] **Bing Webmaster Tools** — [bing.com/webmasters](https://www.bing.com/webmasters). Dá para importar direto do Search Console em 2 cliques. Vale a pena: o índice do Bing alimenta o Copilot e parte das buscas de IA.
- [ ] **Teste o preview de compartilhamento**: cole a URL no [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) e no [opengraph.xyz](https://www.opengraph.xyz/). Deve aparecer o cartão com seu nome e cargo.
- [ ] **Ative o Vercel Web Analytics**: no painel do projeto → aba *Analytics* → Enable. É grátis, não precisa de banner de cookies.

> ⏱️ Indexação leva de 2 dias a 2 semanas. Depois desse prazo, busque `site:mikaelfrancisco.vercel.app` no Google — devem aparecer as 4 páginas.

---

## Semana 1–2 — Backlinks (o que mais move o ranqueamento)

O Google ranqueia por autoridade, e autoridade vem de outros sites apontando para o seu.
**Cinco links reais valem mais que qualquer ajuste de meta tag.** Todos abaixo são gratuitos e levam minutos.

- [ ] **README do seu perfil do GitHub.** Crie o repositório `Gipsy7/Gipsy7` (mesmo nome do usuário) com um `README.md` — ele aparece no topo do seu perfil. Inclua o link do portfólio na primeira linha.
- [ ] **Campo `homepage` nos 3 repositórios de projeto** (`PetrukioApp`, `RollFlix`, `SilvaAssociadosLandingPage`): abra o repo → engrenagem ao lado de *About* → campo *Website* → cole a URL do portfólio. Aproveite e adicione *topics* (`dotnet`, `csharp`, `aspnetcore`, `flutter`, `saas`).
- [ ] **Perfil do LinkedIn** → editar seção principal → campo **Site** → cole a URL. Coloque também no "Sobre".
- [ ] **TabNews** ([tabnews.com.br](https://www.tabnews.com.br)) — publique 1 artigo técnico. É o site de maior autoridade em português para dev e ranqueia muito bem no Google. Sugestão de pauta que você já tem pronta: *"Como implementei multi-tenancy com isolamento de dados em .NET"*.
- [ ] **dev.to** — republique o mesmo artigo em inglês ou português, com link canônico para o seu site.

**Meta da quinzena: 5 backlinks.** Isso já coloca você na primeira página para buscas pelo seu nome.

---

## Semana 2–4 — Distribuição ativa

### LinkedIn (seu canal de maior retorno)
- [ ] **Post de lançamento.** Fórmula que funciona: problema → o que você construiu → o que aprendeu → link no *primeiro comentário* (o LinkedIn reduz o alcance de posts com link no corpo).
- [ ] **Um post técnico por projeto**, espaçados ~1 semana. Você já tem material de sobra nos case studies:
  - Petrukio: arquitetura multi-tenant, 40+ endpoints, i18n com 612+ chaves de tradução.
  - RollFlix: integração TMDb, Firebase Auth, assinaturas com RevenueCat.
  - Silva: landing page de conversão, glassmorphism, performance.
- [ ] **Headline do perfil**: "Desenvolvedor Backend .NET | C# · ASP.NET Core · Azure" — são os termos que recrutador realmente busca.
- [ ] Comente com consistência em posts de outros devs .NET. Alcance no LinkedIn vem de atividade, não só de publicar.

### Comunidades brasileiras
- [ ] **r/brdev** e **r/dotnet** no Reddit — compartilhe um projeto específico e peça feedback técnico. Nunca poste só "olha meu portfólio": leve conteúdo, o link vem junto.
- [ ] Discord/Telegram de **.NET Brasil**, comunidade do **balta.io**.

### Onde mais colar o link
- [ ] Assinatura de e-mail
- [ ] Bio do WhatsApp e do Instagram
- [ ] Perfis em Gupy, Trampos.co, Programathor, Coodesh
- [ ] Cabeçalho do seu currículo em PDF

---

## Mensal — Manutenção

- [ ] **Search Console → Desempenho.** Olhe impressões e cliques. As buscas que importam: *"Mikael Francisco"*, *"desenvolvedor backend .NET"*, *"programador C# [sua cidade]"*.
- [ ] Publique 1 artigo técnico por mês. É o que faz o site crescer de forma composta.
- [ ] Adicione projeto novo assim que tiver — e **atualize a data em `sitemap.xml`** (`<lastmod>`).
- [ ] Reveja a seção Experiência quando mudar de cargo ou empresa.

---

## O que esperar, de forma realista

| Prazo | Resultado |
|---|---|
| 2–14 dias | Site indexado; aparece em `site:mikaelfrancisco.vercel.app` |
| 3–6 semanas | 1ª página do Google para o seu nome completo |
| 3–6 meses | Tráfego orgânico de termos técnicos, se você mantiver os artigos |

Buscas pelo seu nome são fáceis de ganhar — pouca gente disputa. Termos genéricos como
"desenvolvedor .NET" disputam com empresas e levam bem mais tempo; não use isso como métrica de sucesso.

---

## Se a URL mudar

Se o nome do projeto na Vercel não for `mikaelfrancisco`, ou se você registrar um domínio próprio,
a URL precisa ser trocada em **todos** estes pontos — senão o `canonical` aponta para o lugar errado
e o Google pode ignorar as páginas:

| Arquivo | O que trocar |
|---|---|
| `index.html`, `petrukio.html`, `rollflix.html`, `silva.html` | `canonical`, `hreflang`, `og:url`, `og:image`, `twitter:image` e as URLs dentro do bloco JSON-LD |
| `sitemap.xml` | as 4 tags `<loc>` |
| `robots.txt` | a linha `Sitemap:` |
| `PROMOCAO.md` | a URL no topo deste arquivo |

Busca rápida para achar todas de uma vez:

```bash
grep -rn "mikaelfrancisco.vercel.app" --include="*.html" --include="*.xml" --include="*.txt" .
```

> 💡 **Vale registrar um domínio próprio?** Sim, quando puder. `mikaelfrancisco.dev` custa
> ~R$ 50/ano, ranqueia melhor, cabe no currículo e não te prende à Vercel. A troca leva 10 minutos:
> compra o domínio, aponta o DNS para a Vercel e roda o `grep` acima para atualizar as URLs.
> Faça isso **antes** de acumular muitos backlinks — trocar de domínio depois custa parte da autoridade conquistada.
