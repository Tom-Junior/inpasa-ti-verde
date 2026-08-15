# Validação visual — Módulo 3

A página pública foi capturada em viewport desktop e manteve o layout editorial, a navegação superior, o hero com imagem, a hierarquia tipográfica e os CTAs legíveis. As métricas agora são carregadas pelo dashboard tRPC e, com a base vazia, exibem zero em vez de números demonstrativos.

A rota `/gestao` foi capturada sem sessão e apresentou corretamente a barreira de autenticação fornecida pelo `DashboardLayout`, com ação de login visível e foco visual preservado. A tabela e as operações administrativas devem ser validadas novamente em uma sessão autorizada com perfil `admin`.

A checagem TypeScript, os testes Vitest e o build de produção foram executados com sucesso. O build emite apenas um aviso de tamanho de bundle do cliente, sem falha funcional.
