-- ============================================================================
-- TI VERDE — MODELO RELACIONAL DO MÓDULO 3
-- ============================================================================
-- Este arquivo documenta o DDL do domínio de descarte de e-waste.
-- A tabela `users` é gerenciada pelo template de autenticação Manus e não é
-- recriada aqui. A migração efetivamente aplicada está em drizzle/migrations/.
-- Não há DROP TABLE neste script: a evolução do banco deve ser não destrutiva.

CREATE TABLE IF NOT EXISTS colaboradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    emailCorporativo VARCHAR(100) NOT NULL UNIQUE,
    setor VARCHAR(80) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX colaboradores_setor_idx (setor)
);

CREATE TABLE IF NOT EXISTS descartes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    colaboradorId INT NOT NULL,
    tipoResiduo VARCHAR(80) NOT NULL,
    pesoEstimadoG INT NOT NULL,
    dataRegistro DATE NOT NULL,
    observacoes VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT descartes_peso_positivo_chk CHECK (pesoEstimadoG > 0),
    CONSTRAINT descartes_colaborador_fk FOREIGN KEY (colaboradorId)
        REFERENCES colaboradores(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    INDEX descartes_colaborador_idx (colaboradorId),
    INDEX descartes_data_idx (dataRegistro)
);

CREATE TABLE IF NOT EXISTS informativos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tituloTema VARCHAR(150) NOT NULL,
    urlDocumento VARCHAR(255) NOT NULL,
    dataPublicacao DATE NOT NULL,
    INDEX informativos_publicacao_idx (dataPublicacao)
);

-- Relacionamento: um colaborador pode registrar zero ou muitos descartes;
-- cada descarte pertence obrigatoriamente a um único colaborador (1:N).
