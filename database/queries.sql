-- ============================================================================
-- TI VERDE — OPERAÇÕES CRUD E CONSULTAS DO MÓDULO 3
-- ============================================================================
-- Os comandos abaixo são exemplos executáveis para desenvolvimento local.
-- Em produção, a aplicação usa parâmetros validados pelo tRPC e Drizzle.

-- C — Create: cadastrar colaborador.
INSERT INTO colaboradores (nome, emailCorporativo, setor)
VALUES ('Nome do Colaborador', 'nome.colaborador@inpasa.com.br', 'Tecnologia da Informação');

-- C — Create: registrar descarte vinculado a um colaborador existente.
INSERT INTO descartes (colaboradorId, tipoResiduo, pesoEstimadoG, dataRegistro, observacoes)
VALUES (1, 'Celulares e carregadores', 500, CURRENT_DATE, 'Registro realizado pelo portal TI Verde.');

-- R — Read: consulta consolidada com JOIN para o dashboard.
SELECT
    d.id,
    c.nome AS colaborador,
    c.emailCorporativo,
    c.setor,
    d.tipoResiduo,
    d.pesoEstimadoG,
    d.dataRegistro,
    d.observacoes
FROM descartes AS d
INNER JOIN colaboradores AS c ON c.id = d.colaboradorId
ORDER BY d.dataRegistro DESC, d.id DESC;

-- R — Read: métricas agregadas para o dashboard.
SELECT
    COUNT(*) AS totalDescartes,
    COALESCE(SUM(pesoEstimadoG), 0) AS totalPesoG
FROM descartes;

SELECT COUNT(*) AS totalColaboradores FROM colaboradores;

-- U — Update: corrigir dados de um descarte após conferência física.
UPDATE descartes
SET tipoResiduo = 'Placas e hardware leve',
    pesoEstimadoG = 750,
    observacoes = 'Peso conferido pela equipe responsável.'
WHERE id = 1;

-- U — Update: atualizar setor do colaborador.
UPDATE colaboradores
SET setor = 'SGI / Segurança'
WHERE id = 1;

-- D — Delete: remover um registro de descarte solicitado pelo administrador.
DELETE FROM descartes WHERE id = 1;

-- D — Delete: a FK com ON DELETE CASCADE remove os descartes vinculados.
DELETE FROM colaboradores WHERE id = 1;
