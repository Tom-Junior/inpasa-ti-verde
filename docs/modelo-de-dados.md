# Modelo de dados — Inpasa TI Verde

## Escopo

O modelo representa o fluxo de logística reversa de resíduos eletroeletrônicos. O domínio precisa identificar o colaborador responsável, registrar o descarte agendado e disponibilizar materiais educativos para a campanha. A identidade de autenticação permanece na tabela `users`, fornecida pelo template full-stack, enquanto as três tabelas abaixo representam o domínio funcional da aplicação.

## Entidades

| Entidade | Responsabilidade | Atributos principais |
| --- | --- | --- |
| `Colaborador` | Identificar quem agenda ou entrega o material. | `id`, `nome`, `emailCorporativo`, `setor`, timestamps. |
| `Descarte` | Registrar o tipo, peso, data e observações do resíduo. | `id`, `colaboradorId`, `tipoResiduo`, `pesoEstimadoG`, `dataRegistro`, `observacoes`. |
| `Informativo` | Organizar materiais de conscientização e conformidade. | `id`, `tituloTema`, `urlDocumento`, `dataPublicacao`. |

## Relacionamentos

Um `Colaborador` pode possuir zero, um ou muitos `Descartes`. Cada `Descarte` deve pertencer a exatamente um `Colaborador`; por isso, `descartes.colaboradorId` é obrigatório e referencia `colaboradores.id`. A exclusão de um colaborador usa `ON DELETE CASCADE` porque um descarte sem responsável não teria significado operacional, mas essa operação é protegida pela procedure administrativa.

`Informativo` é independente do fluxo transacional. A separação evita repetir título e URL em cada descarte e permite que a futura área editorial altere o conteúdo educativo sem modificar registros históricos.

```text
Colaborador (1) ──────────── (N) Descarte

Informativo (entidade independente de apoio)
```

## Normalização e integridade

O modelo está na Terceira Forma Normal. Cada tabela representa uma entidade ou fato específico, os atributos são atômicos, não há grupos repetidos e os dados de identificação do colaborador não são duplicados em `Descarte`. A dependência entre descarte e colaborador é representada por chave estrangeira, não por cópia de nome ou setor.

| Regra | Implementação |
| --- | --- |
| Identificação única | PK auto incremental em todas as entidades. |
| E-mail não duplicado | `UNIQUE(emailCorporativo)`. |
| Descarte com responsável | FK não nula para `colaboradores`. |
| Peso válido | `CHECK(pesoEstimadoG > 0)` e validação Zod no servidor. |
| Busca por setor e data | Índices em `colaboradores.setor`, `descartes.dataRegistro` e `informativos.dataPublicacao`. |
| Auditoria básica | `createdAt`/`updatedAt` em entidades mutáveis. |
| Proteção de acesso | Procedures de atualização e remoção usam `adminProcedure`. |

## Fonte de verdade e migração

`drizzle/schema.ts` é a fonte tipada utilizada pelo código. `database/schema.sql` documenta o DDL equivalente para estudo e execução local. O SQL gerado pelo Drizzle fica em `drizzle/migrations/` e deve ser revisado antes da aplicação. A tabela `users` não é recriada pelo script de domínio porque pertence ao mecanismo de autenticação do template.
