# Operações SQL e CRUD

## Estratégia

A aplicação usa tRPC como contrato entre cliente e servidor. Os dados enviados pelo formulário são validados por Zod antes de chegar aos helpers de `server/db.ts`. Esses helpers utilizam Drizzle ORM, evitando concatenação de SQL com valores fornecidos pelo usuário. O arquivo `database/queries.sql` mantém exemplos SQL equivalentes para fins de estudo e validação do Módulo 3.

## Mapeamento das operações

| CRUD | Banco | Helper | Procedure | Interface |
| --- | --- | --- | --- | --- |
| Create | `INSERT colaboradores` | `createColaborador` | `colaboradores.create` | `SchedulingForm` cria o colaborador quando necessário. |
| Create | `INSERT descartes` | `createDescarte` | `descartes.create` | `SchedulingForm` registra o descarte. |
| Read | `SELECT` com `INNER JOIN` | `listDescartes` | `descartes.list` | Cards de impacto e tabela da gestão. |
| Read | `COUNT`/`SUM` | `getDashboardMetrics` | `dashboard.metrics` | Impacto e resumo administrativo. |
| Update | `UPDATE descartes` | `updateDescarte` | `descartes.update` | Formulário de edição em `/gestao`. |
| Delete | `DELETE descartes` | `deleteDescarte` | `descartes.remove` | Botão de remoção administrativa. |

## Segurança e consistência

As entradas possuem limites de tamanho, e-mail válido, data no padrão ISO e peso inteiro positivo. As procedures de leitura necessárias à experiência pública são públicas; alterações administrativas passam por `adminProcedure`, que verifica `ctx.user.role`. A validação no frontend melhora a experiência, mas a validação do servidor é a regra definitiva.

Após a criação de um descarte, a interface invalida as consultas de métricas, descartes e colaboradores. Isso evita que os cards mostrem um valor antigo depois de uma operação bem-sucedida. Na área de gestão, atualização e remoção seguem o mesmo padrão de invalidação.

## Validação manual

Para validar o fluxo em ambiente autorizado:

1. Abra a página inicial e preencha o formulário com dados corporativos permitidos.
2. Confirme que a resposta apresenta um protocolo e que os cards de impacto refletem o peso persistido.
3. Acesse `/gestao` com uma conta autenticada que tenha `role = 'admin'`.
4. Confirme que a tabela apresenta o `JOIN` entre colaborador e descarte.
5. Edite o tipo ou peso de um descarte e verifique a atualização nos cards.
6. Remova o registro e confirme que a linha e os totais foram atualizados.

Nenhum dado fictício é inserido automaticamente no banco. A validação deve usar registros autorizados e removê-los ao final, se a política do ambiente exigir.
