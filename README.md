# Inpasa TI Verde

Portal institucional e operacional para incentivar o descarte responsável de resíduos eletroeletrônicos na Inpasa Agroindustrial. A aplicação transforma o fluxo de logística reversa em uma jornada simples: entender o impacto, agendar a entrega e consultar princípios de TI Verde.

> **Estado atual:** frontend estático interativo. O formulário valida e confirma o fluxo localmente, mas ainda não envia dados para uma API ou banco de dados. Os indicadores do dashboard são os números editoriais fornecidos no material-base e devem ser substituídos por uma fonte oficial antes de uma publicação operacional.

## O que este projeto atende

| Requisito | Como foi atendido |
| --- | --- |
| Framework web | React 19 com TypeScript e Vite, organizado por páginas e componentes reutilizáveis. |
| HTML semântico e acessível | `header`, `nav`, `main`, `section`, `form`, `footer`, hierarquia de headings, skip link, labels associados, foco visível e feedback anunciado. |
| CSS responsivo | Tailwind CSS 4 integrado ao Vite e uma camada CSS global com tokens, breakpoints mobile-first e `prefers-reduced-motion`. |
| Documentação | Este README, `ideas.md`, `docs/decisoes-arquiteturais.md` e comentários de direção visual nos arquivos principais. |
| GitHub | Scripts de verificação, arquivos de CI e instruções de publicação no GitHub Pages ou em outro host estático. |

## Demonstração local

O projeto é uma SPA de uma página com as seguintes áreas:

- hero editorial com chamada para ação;
- indicadores de impacto da campanha;
- fluxo de descarte em três etapas;
- formulário de agendamento com validação local e confirmação por protocolo;
- pilares de ética digital, TI Verde e conformidade;
- rodapé institucional com navegação e links de projeto.

## Stack

- **React 19** para composição declarativa e estado da interface;
- **TypeScript** para contratos de tipos e manutenção segura;
- **Vite** para desenvolvimento rápido e build de produção;
- **Tailwind CSS 4** para tokens e integração de utilitários;
- **Lucide React** para ícones consistentes e acessíveis;
- **Wouter** para roteamento client-side já preparado para futuras páginas;
- **Sonner** para avisos não bloqueantes, como a cartilha ainda não publicada;
- **pnpm** para instalação reprodutível.

## Pré-requisitos

- Node.js 20 ou superior;
- pnpm 10 ou superior;
- navegador moderno com suporte a ES Modules.

## Instalação e execução

```bash
git clone https://github.com/SEU-USUARIO/inpasa-ti-verde.git
cd inpasa-ti-verde
pnpm install
pnpm dev
```

O Vite disponibiliza a aplicação em `http://localhost:3000` ou na porta alternativa informada no terminal.

## Scripts disponíveis

| Comando | Finalidade |
| --- | --- |
| `pnpm dev` | Inicia o ambiente de desenvolvimento com Vite. |
| `pnpm check` | Executa o TypeScript sem emitir arquivos. |
| `pnpm build` | Gera o build de produção e empacota o servidor compatível com o template. |
| `pnpm preview` | Abre uma prévia local do build. |
| `pnpm format` | Formata o repositório com Prettier. |

Antes de abrir um pull request, execute pelo menos `pnpm check`, `pnpm build` e `pnpm format`.

## Arquitetura de pastas

```text
inpasa-ti-verde/
├── .github/
│   └── workflows/
│       └── ci.yml
├── client/
│   ├── index.html
│   ├── public/
│   │   ├── robots.txt
│   │   └── site.webmanifest
│   └── src/
│       ├── components/
│       │   ├── site/
│       │   │   ├── BrandMark.tsx
│       │   │   ├── EducationSection.tsx
│       │   │   ├── HeroSection.tsx
│       │   │   ├── ImpactSection.tsx
│       │   │   ├── SchedulingForm.tsx
│       │   │   ├── SiteFooter.tsx
│       │   │   ├── SiteHeader.tsx
│       │   │   └── StepsSection.tsx
│       │   └── ui/
│       │       └── componentes reutilizáveis do template
│       ├── contexts/
│       ├── hooks/
│       ├── lib/
│       ├── pages/
│       │   ├── Home.tsx
│       │   └── NotFound.tsx
│       ├── App.tsx
│       ├── index.css
│       └── main.tsx
├── docs/
│   ├── decisoes-arquiteturais.md
│   └── guia-de-contribuicao.md
├── ideas.md
├── package.json
├── pnpm-lock.yaml
├── README.md
├── tsconfig.json
├── vite.config.ts
└── server/
    └── index.ts
```

O diretório `server/` permanece como compatibilidade do template. A experiência atual não implementa rotas de API, autenticação, banco de dados ou persistência de agendamento.

## Decisões de arquitetura

A interface usa uma arquitetura de composição: `Home.tsx` organiza seções e cada componente de `components/site/` contém sua própria responsabilidade visual e comportamental. Essa separação evita uma página monolítica e permite substituir o formulário, os dados de impacto ou a cartilha sem reescrever o shell.

A direção visual escolhida foi **Manifesto Verde Digital**. A composição editorial usa fundo creme, verde-esmeralda para ações, azul-cobalto para tecnologia e coral para alertas e marcadores. A tipografia `Plus Jakarta Sans` aparece em títulos e números; `DM Sans` permanece nos textos de leitura.

O formulário possui estado local para demonstrar o caminho feliz e o erro de validação. O protocolo gerado não é um identificador oficial. Quando houver backend, a função `handleSubmit` deverá ser substituída por uma chamada a uma API autenticada, com tratamento de carregamento, erro de rede e persistência de consentimento conforme orientação jurídica.

Mais detalhes estão em [`docs/decisoes-arquiteturais.md`](docs/decisoes-arquiteturais.md) e na especificação visual [`ideas.md`](ideas.md).

## Acessibilidade

A aplicação foi estruturada com landmarks nativos e uma ordem de leitura coerente. O menu mobile possui nome acessível, estado exposto por `aria-expanded` e conexão com `aria-controls`. Todos os campos do formulário têm `label` associado, instruções contextuais e mensagens de sucesso ou erro com `role="status"` ou `role="alert"`.

O foco de teclado é visível, a cor não é o único canal para comunicar estado e o link “Pular para o conteúdo principal” aparece quando recebe foco. Animações não essenciais são desativadas para usuários com `prefers-reduced-motion: reduce`. O próximo ciclo de qualidade deve validar contraste com ferramentas automatizadas e testar zoom de 200%.

## Imagens e ativos

Os ativos gerados para a identidade visual ficam fora do repositório de código e são referenciados por URLs permanentes do armazenamento do projeto:

- `/manus-storage/inpasa_logo_mark_cb75fd1f.png`: símbolo de folha e circuito usado na marca e no favicon;
- `/manus-storage/inpasa_hero_banner_da645c7c.png`: imagem do hero, com tecnologia e sustentabilidade.

Não mova esses arquivos para `client/public/` ou `client/src/assets/`. O template utiliza armazenamento externo para evitar que mídia pesada atrase a publicação.

## Publicação no GitHub

### Publicar o código em um repositório

```bash
git init
git add .
git commit -m "feat: estrutura inicial do portal Inpasa TI Verde"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/inpasa-ti-verde.git
git push -u origin main
```

### GitHub Pages

O projeto pode ser hospedado como site estático. Para usar GitHub Pages, habilite **Settings → Pages → GitHub Actions** no repositório e adicione um workflow de build/deploy compatível com a política da sua organização. O build precisa publicar o conteúdo gerado em `dist/public` e preservar os assets referenciados pelo portal.

Quando o repositório usar um subcaminho, ajuste `base` no `vite.config.ts` para `/<nome-do-repositorio>/`. Se publicar em domínio próprio ou na raiz do Pages, mantenha `base: "/"`.

O projeto foi preparado para hospedar o código no GitHub. A publicação final deve ser validada pela equipe responsável porque os assets `manus-storage` dependem do armazenamento do ambiente atual. Para uma publicação independente do WebDev, substitua essas URLs por um CDN ou pelos arquivos autorizados da organização.

## Dados, LGPD e integração futura

A implementação não armazena dados pessoais e não envia o formulário. Antes de ativar a coleta real, a equipe deverá definir controlador e operador, finalidade, retenção, base legal, canal de atendimento e controles de acesso. O texto exibido no consentimento deve ser revisado pelo responsável jurídico e pelo SGI/TI.

A próxima arquitetura recomendada é:

```text
React + TypeScript
        │
        ▼
API autenticada de agendamentos
        │
        ├── validação e consentimento
        ├── banco de dados relacional
        └── dashboard oficial do SGI/TI
```

## Contribuição

Leia [`docs/guia-de-contribuicao.md`](docs/guia-de-contribuicao.md) antes de alterar componentes. Toda mudança que afete conteúdo institucional, indicadores ou tratamento de dados deve incluir atualização da documentação correspondente.

## Licença

O código pode ser distribuído sob licença MIT. Marcas, imagens, textos institucionais, documentos da Inpasa e dados da campanha permanecem sujeitos às autorizações de seus proprietários.

## Créditos

Projeto Integrador II · Curso de Tecnologia da Informação · UFMS Digital · 2026.2. Desenvolvido para apoiar a ação de TI Verde em parceria com o Sistema de Gestão Integrada da Inpasa Agroindustrial.
