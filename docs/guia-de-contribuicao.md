# Guia de contribuição

## Antes de alterar

Leia `README.md`, `ideas.md`, `docs/decisoes-arquiteturais.md` e `docs/modelo-de-dados.md`. O projeto usa a direção visual **Manifesto Verde Digital** e uma arquitetura full-stack com React, tRPC e Drizzle.

## Branches e commits

Crie uma branch curta e descritiva a partir de `main`. Prefira nomes como `feat/crud-descartes`, `fix/validacao-peso`, `test/routers` ou `docs/modulo-3`. Faça commits frequentes, coesos e explicativos usando Conventional Commits.

```bash
git checkout main
git pull origin main
git checkout -b feat/crud-descartes

git add client server drizzle database docs README.md
git commit -m "feat: integrar CRUD de descartes ao banco"
git push -u origin feat/crud-descartes
```

Não misture refatoração ampla, mudança visual e migração de banco em um commit sem relação. Cada commit deve deixar o projeto em um estado compreensível e verificável.

## Mudanças de banco

Ao alterar `drizzle/schema.ts`, gere a migração, leia o SQL e revise PKs, FK, índices, nulabilidade e impacto sobre dados existentes. Não use `DROP TABLE` como atalho. Atualize também `database/schema.sql`, `database/queries.sql` e `docs/modelo-de-dados.md` quando o contrato do domínio mudar.

```bash
pnpm drizzle-kit generate
pnpm check
pnpm test
pnpm build
```

O banco de produção nunca deve receber dados de teste pelo processo automatizado de entrega. Para validação manual, utilize somente dados autorizados e remova-os segundo a política do ambiente.

## Regras de interface

Preserve HTML semântico, labels associados, foco visível, skip link, estados de carregamento e feedbacks acessíveis. A cor não deve ser o único canal para indicar sucesso ou erro. Animações não essenciais devem respeitar `prefers-reduced-motion`.

O cliente deve chamar o backend por tRPC; não adicione wrappers REST ou `fetch` paralelo sem uma decisão arquitetural documentada. Componentes públicos devem continuar desacoplados da área de gestão.

## Segurança e privacidade

Não adicione dados pessoais reais, tokens, chaves de API ou avaliações fabricadas. Não registre credenciais nos logs. Procedures de escrita administrativa devem usar `adminProcedure` ou política equivalente. Toda coleta de dados pessoais precisa de finalidade, retenção e revisão da área responsável.

## Pull requests

Descreva o problema, a solução, os arquivos alterados e as limitações conhecidas. Quando houver banco, inclua uma seção de migração com o SQL gerado e o procedimento de aplicação. Quando houver mudança visual, inclua capturas desktop e mobile e informe como testar teclado e mensagens de erro.

O CI deve passar antes da aprovação:

```bash
pnpm check
pnpm test
pnpm build
```
Link: https://github.com/Tom-Junior/inpasa-ti-verde