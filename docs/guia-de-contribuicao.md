# Guia de contribuição

## Antes de alterar

Leia `README.md`, `ideas.md` e `docs/decisoes-arquiteturais.md`. O projeto usa a direção visual Manifesto Verde Digital: editorial, claro, responsável e orientado à ação.

## Fluxo recomendado

Crie uma branch descritiva, altere o menor número possível de arquivos, rode `pnpm check` e `pnpm exec vite build`, valide teclado e mobile e só então abra um pull request.

```bash
git checkout -b feat/nova-secao
git add .
git commit -m "feat: descreva a mudança"
pnpm check
pnpm exec vite build
```

## Regras de interface

Preserve HTML semântico, labels de formulário, foco visível e os tokens definidos em `client/src/index.css`. Não use uma imagem para comunicar informação que poderia estar em texto. Não crie botões sem ação; quando algo for futuro, informe isso com um aviso claro.

A cor não deve ser o único canal para indicar sucesso ou erro. Toda animação não essencial deve respeitar `prefers-reduced-motion`. Textos institucionais, números de impacto e mensagens de LGPD precisam de validação do responsável pelo conteúdo.

## Regras de dados

Não adicione dados pessoais reais, tokens, chaves de API ou avaliações fabricadas. O formulário atual é demonstrativo e não deve ser alterado para sugerir persistência sem contrato de backend.

## Pull requests

Descreva o problema, os arquivos alterados, como testar e eventuais limitações. Inclua uma captura de desktop e outra de mobile quando a mudança for visual. Se alterar uma decisão arquitetural, atualize a documentação na mesma entrega.
