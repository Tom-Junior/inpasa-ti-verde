# Decisões arquiteturais

## Contexto

O portal Inpasa TI Verde nasceu de uma base HTML/CSS estática com quatro necessidades: demonstrar uma experiência institucional de TI Verde, permitir o agendamento de descarte, comunicar indicadores e disponibilizar conteúdo educativo. A arquitetura atual prioriza clareza de código, acessibilidade e possibilidade de conexão posterior com o SGI/TI.

## Decisão 1 — React + TypeScript + Vite

**Escolha:** React 19 com TypeScript e Vite.

**Motivo:** o projeto precisa cumprir o requisito de uso de framework para web e evoluir além de uma página HTML monolítica. React permite separar seções em componentes; TypeScript explicita contratos de dados; Vite oferece feedback rápido durante desenvolvimento e um build estático adequado para hospedagem.

**Consequência:** a equipe precisa manter a disciplina de não transformar cada seção em um componente excessivamente genérico. Componentes devem existir quando houver responsabilidade clara ou reutilização provável.

## Decisão 2 — Arquitetura frontend-only

**Escolha:** não introduzir backend, banco ou autenticação nesta etapa.

**Motivo:** os arquivos de origem não fornecem contrato de API, regras de autorização, modelo de dados ou definição de integração com o SGI/TI. Inventar esses elementos criaria uma aparência de produto funcionando sem governança dos dados.

**Consequência:** o formulário valida no navegador e cria um protocolo local apenas para demonstrar o fluxo. Antes de produção, `handleSubmit` deve chamar uma API segura, e os números do impacto devem vir de fonte oficial.

## Decisão 3 — Componentes por responsabilidade

A página `Home.tsx` funciona como composição de alto nível. O comportamento e a marca ficam em `components/site/`, separados em `SiteHeader`, `HeroSection`, `ImpactSection`, `StepsSection`, `SchedulingForm`, `EducationSection`, `SiteFooter` e `BrandMark`. Essa organização facilita revisão por domínio e reduz o risco de alterações de estilo quebrarem o formulário.

## Decisão 4 — HTML semântico e acessível

A interface usa landmarks nativos, hierarquia de headings, `label` associado a cada controle, skip link, `aria-label` apenas quando necessário e mensagens com live regions. O menu móvel não depende de hover. Foco visível, contraste e redução de movimento são tratados no CSS global.

A acessibilidade é uma condição de implementação, não uma etapa opcional. O projeto ainda deve passar por auditoria automatizada e teste manual com teclado, zoom de 200% e leitor de tela antes de uma publicação oficial.

## Decisão 5 — Tokens visuais centralizados

Os tokens de cor, tipografia, espaçamento conceitual, transições e breakpoints ficam em `client/src/index.css`. Componentes usam classes semânticas como `button--primary`, `metric-card--green` e `form-panel`, evitando que o valor de uma cor seja espalhado em dezenas de arquivos.

A direção **Manifesto Verde Digital** combina creme, verde-esmeralda, azul-cobalto e coral. A paleta preserva a intenção da base enviada, porém com contraste e hierarquia mais controlados.

## Decisão 6 — Ativos externos ao repositório

Imagens e mídia não ficam em `client/public` ou `client/src/assets`. O template usa URLs permanentes de armazenamento do projeto para evitar peso no deploy. Em uma publicação independente no GitHub Pages, as URLs devem ser trocadas por um CDN ou por arquivos liberados pela organização.

## Decisão 7 — GitHub como fonte de colaboração

O repositório inclui CI com `pnpm check` e build do Vite. Também existe um workflow opcional de GitHub Pages que publica `dist/public`. A equipe deve habilitar Pages via GitHub Actions, revisar o `VITE_BASE_PATH` e validar se os assets externos continuam disponíveis no ambiente de destino.

## Fluxo futuro recomendado

```text
Colaborador
    │
    ▼
Formulário React
    │ validação client-side
    ▼
API autenticada
    │ validação de domínio + consentimento
    ├── Banco relacional de agendamentos
    ├── Fila ou serviço de coleta
    └── Dashboard oficial do SGI/TI
```

## Riscos conhecidos

O principal risco é publicar indicadores estáticos como se fossem dados em tempo real. O README e o rodapé sinalizam essa limitação, mas a integração oficial deve acontecer antes de comunicação externa.

Outro risco é o uso do formulário com dados pessoais sem uma política de retenção. Por isso, a aplicação atual não envia nem armazena os campos. A decisão sobre LGPD precisa ser validada pelo responsável jurídico da organização.

## Critérios para a próxima fase

A evolução para backend deve definir contrato de API, autenticação corporativa, esquema de dados, perfis de acesso, trilha de auditoria, tratamento de erros, política de retenção e fonte dos indicadores. Somente depois disso o estado local deve ser substituído por persistência real.
