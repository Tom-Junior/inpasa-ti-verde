# TI Verde

Portal web institucional e operacional para apoiar o descarte responsável de resíduos eletroeletrônicos na Inpasa Agroindustrial. A aplicação combina uma experiência pública de conscientização e agendamento com uma área autenticada de gestão, mantendo o código organizado para evolução no GitHub.

> **Estado atual:** o projeto foi evoluído para uma aplicação full-stack com React, TypeScript, Express, tRPC, Drizzle ORM e MySQL/TiDB. O formulário público persiste colaboradores e descartes no banco, o dashboard consulta métricas agregadas e a rota `/gestao` permite consultar, atualizar e remover descartes com controle administrativo.

## Objetivos atendidos

| Requisito | Implementação |
| --- | --- |
| Framework web | React 19 + TypeScript + Vite no cliente e Express 4 + tRPC 11 no servidor. |
| Organização de código | Separação entre páginas, componentes de apresentação, procedures tRPC, helpers Drizzle, schema, migrações e documentação. |
| HTML semântico e acessível | Landmarks nativos, headings hierárquicos, labels associados, skip link, tabela com caption, foco visível, feedback com `role="status"`/`role="alert"` e suporte a teclado. |
| CSS responsivo | Tailwind CSS 4 combinado com tokens CSS existentes, layout mobile-first, grids adaptáveis e `prefers-reduced-motion`. |
| Banco de dados | Modelo relacional com `Colaborador`, `Descarte` e `Informativo`, PKs, FK, unicidade, índices, restrição de peso positivo e timestamps. |
| Manipulação de dados | Procedures tRPC para inserção, consulta, atualização e remoção; o formulário usa Create e a área `/gestao` usa Read, Update e Delete. |
| Controle de versão | Repositório preparado para GitHub, workflow de CI, convenção de commits e documentação de pull requests. |
| Documentação | Este README, decisões arquiteturais, modelo de dados, operações SQL e guia de contribuição/versionamento. |

## Funcionalidades

A página pública apresenta o manifesto TI Verde, etapas do descarte, cartilha educativa, métricas consultadas do banco e formulário de agendamento. Ao enviar o formulário, a aplicação valida os campos, localiza ou cria o colaborador, registra o descarte, invalida as consultas derivadas e apresenta um protocolo gerado a partir do identificador persistido.

A área `/gestao` é um painel autenticado baseado no componente `DashboardLayout` do template. Ela lista descartes com `JOIN` entre as tabelas de negócio, exibe peso e contagens consolidadas, permite editar um descarte e remover um registro. As procedures de escrita exigem o perfil `admin`; a API não confia apenas na ocultação de botões no navegador.

## Stack

| Camada | Tecnologia | Responsabilidade |
| --- | --- | --- |
| Interface | React 19, TypeScript, Wouter | Composição, rotas e contratos tipados. |
| Design | Tailwind CSS 4, CSS global, Lucide React | Responsividade, acessibilidade visual e linguagem editorial. |
| Transporte | tRPC 11, TanStack Query, SuperJSON | API tipada, cache, invalidação e serialização. |
| Servidor | Express 4, runtime Manus | Entrada HTTP, OAuth, contexto e montagem do endpoint tRPC. |
| Persistência | Drizzle ORM, MySQL/TiDB | Schema, consultas relacionais e migrações. |
| Qualidade | TypeScript, Vitest, Prettier | Checagem estática, testes unitários e padronização. |
| Automação | GitHub Actions | CI a cada push e pull request. |

## Pré-requisitos

É necessário ter Node.js 20 ou superior, pnpm 10 ou superior e acesso a uma instância MySQL/TiDB para executar as operações de persistência. Em ambiente, `DATABASE_URL`, `JWT_SECRET` e as variáveis de OAuth são injetadas pelo projeto. Nunca publique valores reais de segredo em arquivos `.env`, commits ou screenshots.

## Instalação e execução

```bash
git clone https://github.com/SEU-USUARIO/inpasa-ti-verde.git
cd inpasa-ti-verde
pnpm install
pnpm dev
```

O servidor de desenvolvimento utiliza a porta definida pelo ambiente e disponibiliza a aplicação pelo endereço exibido no terminal. Para executar apenas a verificação de tipos, use `pnpm check`.

## Scripts principais

| Comando | Finalidade |
| --- | --- |
| `pnpm dev` | Inicia o servidor full-stack em modo de desenvolvimento. |
| `pnpm check` | Executa o TypeScript sem emitir arquivos. |
| `pnpm test` | Executa os testes Vitest do servidor. |
| `pnpm build` | Gera o build do cliente e empacota o servidor. |
| `pnpm format` | Formata o código com Prettier. |
| `pnpm drizzle-kit generate` | Gera SQL de migração a partir de `drizzle/schema.ts`. |
| `pnpm db:push` | Gera e aplica migrações pelo fluxo Drizzle configurado. |

## Arquitetura de pastas

```text
inpasa-ti-verde/
├── .github/workflows/
│   ├── ci.yml
│   └── deploy-pages.yml
├── client/
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── components/site/       # seções da página pública
│       ├── components/ui/         # primitives reutilizáveis do template
│       ├── pages/Home.tsx
│       ├── pages/Management.tsx   # consulta e CRUD administrativo
│       ├── lib/trpc.ts
│       ├── App.tsx
│       └── index.css
├── database/
│   ├── schema.sql                 # DDL documentado e não destrutivo
│   └── queries.sql                # exemplos de INSERT, SELECT, UPDATE e DELETE
├── docs/
│   ├── decisoes-arquiteturais.md
│   ├── modelo-de-dados.md
│   ├── operacoes-sql-e-crud.md
│   └── guia-de-contribuicao.md
├── drizzle/
│   ├── schema.ts                  # fonte de verdade tipada do modelo
│   └── migrations/                # SQL gerado e versionado
├── server/
│   ├── db.ts                      # conexão e helpers de persistência
│   ├── routers.ts                 # composição do AppRouter
│   └── routers/                   # procedures por contexto de negócio
├── shared/
├── ideas.md
├── package.json
└── README.md
```

## Modelo de dados

O domínio foi normalizado em três entidades de negócio. `Colaborador` armazena a pessoa e seu setor; `Descarte` registra o resíduo e referencia obrigatoriamente um colaborador; `Informativo` mantém materiais educativos independentes do fluxo transacional. A tabela `users` pertence ao mecanismo de autenticação do template e foi preservada separadamente.

| Entidade | Chave e restrições | Relacionamentos |
| --- | --- | --- |
| `colaboradores` | `id` PK, `emailCorporativo` UNIQUE, nome/setor obrigatórios. | 1:N com `descartes`. |
| `descartes` | `id` PK, `colaboradorId` FK, peso positivo, data obrigatória. | N:1 com `colaboradores`; `ON DELETE CASCADE`. |
| `informativos` | `id` PK, título, URL e data obrigatórios. | Entidade independente de apoio pedagógico. |

O diagrama conceitual e as decisões de normalização estão em [`docs/modelo-de-dados.md`](docs/modelo-de-dados.md). O DDL correspondente está em [`database/schema.sql`](database/schema.sql) e a migração aplicada pelo projeto está em `drizzle/migrations/`.

## Fluxo de dados e CRUD

O cliente não chama endpoints REST manualmente. A interface usa hooks gerados pelo `AppRouter`, o servidor valida entradas com Zod e os helpers de `server/db.ts` executam as consultas Drizzle. Depois de uma mutação, o TanStack Query invalida métricas, lista de descartes e lista de colaboradores para manter a tela consistente.

| Operação | Procedure | Perfil | Uso na interface |
| --- | --- | --- | --- |
| Inserir colaborador | `colaboradores.create` | Público | Formulário público, quando o e-mail ainda não existe. |
| Inserir descarte | `descartes.create` | Público | Formulário público de agendamento. |
| Consultar descartes | `descartes.list` | Público | Dashboard e painel de gestão. |
| Atualizar descarte | `descartes.update` | Administrador | Formulário de edição em `/gestao`. |
| Remover descarte | `descartes.remove` | Administrador | Ação de remoção em `/gestao`. |
| Consultar métricas | `dashboard.metrics` | Público | Cards de impacto e resumo da gestão. |
| Consultar informativos | `informativos.list` | Público | Camada de conteúdo educativo. |
| Inserir informativo | `informativos.create` | Administrador | Preparado para a futura área editorial. |

Os exemplos SQL equivalentes estão em [`database/queries.sql`](database/queries.sql). O arquivo contém comandos ilustrativos, mas o banco do ambiente não é preenchido com dados fictícios automaticamente.

## Migrações e banco

A fonte de verdade do modelo é `drizzle/schema.ts`. Ao alterá-la, siga o fluxo abaixo:

```bash
pnpm drizzle-kit generate
# revisar o SQL gerado em drizzle/migrations/
pnpm db:push
```

Em ambientes gerenciados, aplique a migração pelo mecanismo oficial do projeto e valide a presença das tabelas com consultas de inspeção. Não use `DROP TABLE` para corrigir uma evolução comum e sempre avalie dependências antes de alterar uma coluna ou constraint.

## Testes e validação

Antes de abrir um pull request, execute:

```bash
pnpm check
pnpm test
pnpm build
```

Os testes devem cobrir procedures de autenticação e os contratos de validação do domínio. Os testes de navegador são complementares: não substituem os testes Vitest do servidor. A validação visual deve incluir desktop, largura móvel, teclado, foco, mensagens de erro e a rota `/gestao` com uma conta administrativa autorizada.

## Controle de versão e GitHub

O repositório deve usar a branch `main` como linha estável e branches curtas para cada mudança, por exemplo `feat/crud-descartes`, `fix/validacao-peso` ou `docs/modulo-3`. Commits devem ser pequenos, frequentes e explicativos, seguindo Conventional Commits:

```bash
git checkout -b feat/crud-descartes
git add drizzle server client database docs README.md
git commit -m "feat: integrar CRUD de descartes ao banco"
git push -u origin feat/crud-descartes
```

Mensagens recomendadas incluem `feat:` para funcionalidade, `fix:` para correção, `docs:` para documentação, `test:` para cobertura e `chore:` para manutenção. Pull requests devem explicar objetivo, arquivos alterados, validações executadas e impactos de banco de dados. O workflow `ci.yml` executa a checagem estática, testes e build a cada alteração enviada ao GitHub.

O workflow de GitHub Pages é opcional e atende somente ao cliente estático. A área full-stack, a API tRPC, o OAuth e o banco precisam de um ambiente capaz de executar Node.js e oferecer `DATABASE_URL`; portanto, para produção integrada, prefira o hosting full-stack do WebDev ou outro servidor compatível, mantendo o GitHub como fonte de versionamento.

## Acessibilidade e privacidade

A interface usa landmarks semânticos, navegação com foco, labels explícitos e feedbacks anunciados. O campo de consentimento informa que o uso dos dados corporativos é destinado ao controle logístico. Antes do uso operacional, a área jurídica e o SGI/TI devem validar finalidade, retenção, base legal, perfil de acesso e canal para solicitações relacionadas à LGPD.

O backend não deve registrar mais dados do que os necessários para o fluxo. Logs não devem expor e-mails completos, tokens, cookies ou segredos. A função administrativa deve ser concedida somente a usuários autorizados pelo campo `role` da tabela de autenticação.

## Documentação complementar

- [`docs/modelo-de-dados.md`](docs/modelo-de-dados.md): entidades, normalização, cardinalidade e restrições.
- [`docs/operacoes-sql-e-crud.md`](docs/operacoes-sql-e-crud.md): relação entre SQL, helpers Drizzle e procedures tRPC.
- [`docs/decisoes-arquiteturais.md`](docs/decisoes-arquiteturais.md): decisões visuais, técnicas e caminho de evolução.
- [`docs/guia-de-contribuicao.md`](docs/guia-de-contribuicao.md): padrão de contribuição, revisão e versionamento.

## Licença e créditos

O código pode ser distribuído sob licença MIT, desde que as autorizações institucionais sejam preservadas. Marcas, textos, documentos e ativos visuais da Inpasa permanecem sujeitos às autorizações de seus proprietários.

Projeto Integrador II · Curso de Tecnologia da Informação · UFMS Digital · 2026.2.
Desenvolvido por @Tom-Junior.
