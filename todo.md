
# Atualização: Banco de dados e controle de versão

- [x] Resolver conflitos gerados pela evolução para o template full-stack sem perder a identidade visual existente
- [x] Criar schema Drizzle normalizado para colaboradores, descartes e informativos
- [x] Gerar e aplicar a migração SQL do modelo relacional
- [x] Implementar operações CRUD e consulta consolidada com JOIN via tRPC
- [x] Integrar o formulário da interface ao backend e atualizar indicadores com dados persistidos
- [x] Criar testes Vitest para contratos de validação, autorização e integridade das operações CRUD
- [x] Documentar modelo de dados, DDL/DML, normalização, LGPD e fluxo GitHub Flow
- [x] Validar tipos, testes, build e experiência visual

# Validações adicionais identificadas

- [x] Adicionar testes Vitest para as procedures tRPC em caminhos felizes de CRUD, JOIN e métricas usando mocks controlados do banco
- [x] Registrar que `/gestao` foi validada no estado sem sessão e que a validação autenticada com perfil administrador depende de uma sessão autorizada
