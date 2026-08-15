# Decisões arquiteturais

## Contexto

O portal Inpasa TI Verde nasceu de uma base HTML/CSS institucional. A primeira evolução adotou React, TypeScript, Vite e Tailwind para separar a página em componentes, atender ao requisito de framework e garantir responsividade. O Módulo 3 acrescentou a camada de persistência, as operações CRUD e o controle de versão necessário para transformar a demonstração em uma aplicação full-stack documentada.

## React, TypeScript e Vite

React 19 organiza a interface em componentes com responsabilidade clara. TypeScript mantém contratos explícitos entre frontend, procedures tRPC e helpers de banco. Vite fornece desenvolvimento rápido e build reprodutível. A decisão foi mantida porque o framework atende simultaneamente organização, acessibilidade, manutenção e publicação.

## tRPC como contrato de aplicação

A comunicação entre cliente e servidor usa tRPC 11, TanStack Query e SuperJSON. Isso evita duplicar tipos em REST manual e permite que a interface consuma `trpc.descartes.list`, `trpc.descartes.create` e demais procedures com inferência de tipos. A invalidação de cache depois das mutações mantém os cards e a tabela coerentes.

## Drizzle ORM e modelo relacional

Drizzle foi escolhido por permitir declarar o schema em TypeScript e gerar migrações SQL revisáveis. O domínio foi separado em `colaboradores`, `descartes` e `informativos`, com PKs, FK, unicidade, índices e restrição de peso positivo. O SQL versionado em `database/` complementa o schema tipado e serve como material didático do Módulo 3.

A aplicação não usa dados fictícios para preencher indicadores. Quando a base está vazia, a interface exibe zero; quando há registros autorizados, os valores vêm de `COUNT` e `SUM` reais. Essa decisão evita confundir números editoriais com métricas operacionais.

## Segurança e papéis

A rota pública permite cadastrar o fluxo necessário ao agendamento, com validação de entrada no servidor. Atualização e remoção são protegidas por `adminProcedure`, que verifica o papel do usuário autenticado. A proteção não depende apenas da interface: mesmo que alguém invoque a procedure manualmente, a camada de servidor deve rejeitar uma sessão sem perfil administrativo.

## Dados pessoais e LGPD

O modelo guarda apenas nome, e-mail corporativo e setor necessários para logística reversa. O texto do formulário informa a finalidade do uso. Antes de operar com dados reais, a organização deve confirmar base legal, retenção, perfis autorizados, trilha de auditoria e processo de atendimento ao titular. Logs não devem registrar tokens, cookies ou dados pessoais desnecessários.

## Componentes por responsabilidade

`Home.tsx` funciona como composição de alto nível. A apresentação pública permanece em `components/site/`, enquanto a gestão fica em `pages/Management.tsx` e reutiliza o `DashboardLayout` do template para autenticação e navegação interna. Procedures e queries ficam no servidor, separados por contexto em `server/routers/`.

## HTML, acessibilidade e CSS

A interface usa landmarks, headings hierárquicos, labels associados, skip link, tabela com caption, feedbacks em live regions, foco visível e controles alcançáveis por teclado. A camada CSS preserva a direção visual **Manifesto Verde Digital**, com fundo creme, verde-esmeralda para ação, azul tecnológico e coral para alertas. Breakpoints mobile-first e `prefers-reduced-motion` permanecem como requisitos de qualidade.

## GitHub e evolução

O GitHub é a fonte de colaboração e histórico, enquanto o CI executa checagem, testes e build. A equipe deve trabalhar em branches curtas, fazer commits pequenos e usar mensagens Conventional Commits. Migrações de banco precisam ser revisadas junto com o código que as consome; um pull request que muda schema deve explicar impacto, compatibilidade e procedimento de rollback.

## Fluxo atual

```text
Colaborador
    │
    ▼
Formulário React
    │ validação client-side + Zod no servidor
    ▼
tRPC / Express
    │
    ├── Drizzle ORM → colaboradores
    ├── Drizzle ORM → descartes
    └── Drizzle ORM → informativos
    │
    ▼
Dashboard público e gestão administrativa
```

## Próxima evolução recomendada

As próximas etapas podem incluir autenticação corporativa, trilha de auditoria para alterações, notificações de coleta, filtros por período e exportação autorizada. Essas funcionalidades devem preservar o princípio de baixo acoplamento: regras no servidor, componentes de interface focados em apresentação e banco com migrações explícitas.
