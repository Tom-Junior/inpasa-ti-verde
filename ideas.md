# Direção visual — TI Verde

## Abordagens consideradas

### Tema: Manifesto Verde Digital
Uma direção editorial e industrial que combina papel claro, azul tecnológico e verde de ação. A interface parece uma página de campanha interna: humana, objetiva e com dados visíveis.

**Probabilidade:** 0,08

### Tema: Estação Circular
Uma direção mais modular, inspirada em painéis de operação e logística reversa, com blocos de status, mapas e sinais de coleta.

**Probabilidade:** 0,06

### Tema: Jardim de Circuitos
Uma linguagem mais experimental, com texturas orgânicas, ilustrações de componentes e uma narrativa visual de tecnologia regenerativa.

**Probabilidade:** 0,04

## Abordagem escolhida: Manifesto Verde Digital

**Design Movement:** editorial corporativo contemporâneo, com influência de publicações independentes de sustentabilidade e sinalização industrial.

**Core Principles:** conteúdo em primeiro plano, contraste alto e legível, dados apresentados como prova de impacto e composição assimétrica para evitar aparência de template.

**Color Philosophy:** o verde-esmeralda representa ação ambiental concreta; o azul-cobalto conecta a campanha à tecnologia e à confiança corporativa; o creme funciona como papel editorial e reduz a sensação de interface fria; o coral aparece somente como alerta e energia visual.

**Layout Paradigm:** composição em trilhos, com textos e dados alinhados à esquerda e um módulo visual deslocado à direita. As seções alternam blocos editoriais e painéis de ação, mantendo ritmo vertical e âncoras claras.

**Signature Elements:** filetes verticais numerados, marcadores circulares de etapa e uma faixa de metadados com o contexto do mutirão.

**Interaction Philosophy:** toda ação deve responder de forma objetiva. O formulário mantém o usuário orientado, o menu móvel não bloqueia a página e o envio mostra confirmação com protocolo local.

**Animation:** entrada suave e escalonada somente em blocos de conteúdo; hover usa transições curtas de cor, deslocamento e sombra. A preferência `prefers-reduced-motion` desativa animações não essenciais.

**Typography System:** `Plus Jakarta Sans` para títulos e números, pela presença geométrica; `DM Sans` para textos, labels e instruções, pela leitura em telas pequenas. Títulos usam peso 800 e corpo permanece entre 400 e 600.

**Brand Essence:** um portal interno para transformar descarte eletrônico em hábito mensurável, aproximando colaboradores da logística reversa com menos atrito. Personalidade: **claro, responsável, mobilizador**.

**Brand Voice:** headlines são diretas e orientadas à ação; CTAs explicam o próximo passo; microcopy reduz dúvida e não usa linguagem promocional vazia. Exemplos: “Cada equipamento tem um próximo destino.” e “Reserve seu descarte em menos de dois minutos.”

**Wordmark & Logo:** o símbolo é um broto que se ramifica em trilhas de circuito, usado ao lado do wordmark textual em caixa alta. O símbolo aparece sozinho em contextos compactos, como favicon e avatar.

**Signature Brand Color:** verde-esmeralda `#157A52`, usado para ações primárias, estados positivos e o marcador visual da campanha.

## Ativos visuais

O portal usa um símbolo original de folha com circuito e um banner editorial de tecnologia verde no hero. Os assets ficam fora do repositório de código, conforme a política do projeto, e são referenciados por URLs permanentes do armazenamento do WebDev.

## Regra de decisão

> Diante de qualquer escolha visual, a pergunta é: “Isso deixa o compromisso ambiental mais claro e acionável, ou apenas adiciona decoração?”

Se a resposta for decoração sem função, a escolha deve ser simplificada.

---

## Checklist de implementação

- React 19 + TypeScript como base de componentes e estados.
- Tailwind CSS 4 para tokens e responsividade, com CSS global documentado.
- HTML semântico: `header`, `nav`, `main`, `section`, `form`, `footer` e hierarquia de headings.
- Foco visível, labels associados a todos os campos e mensagens de status anunciadas por tecnologia assistiva.
- Formulário com validação client-side e confirmação de agendamento local, sem simular persistência em backend.
- README com instalação, comandos, estrutura, acessibilidade, ativos e próximos passos.
- Projeto sem backend; integrações reais ficam explicitamente documentadas como evolução futura.

## Style Decisions

- A paleta creme + verde + azul foi mantida para preservar a intenção do material original, mas recebeu contraste e tokens mais explícitos.
- A ilustração circular foi substituída por uma composição editorial com imagem realista e dados para aumentar credibilidade sem perder leveza.
- A navegação mobile usa um botão acessível com `aria-expanded` e um painel de links; não depende apenas de hover.
- A ação “Baixar cartilha” é apresentada como recurso futuro e comunica isso em vez de apontar para um link quebrado.
- O formulário é funcional no navegador, mas o README deixa claro que o envio é demonstrativo enquanto não existir API ou banco.

---

_Última atualização: 2026-08-14._

autor: Manus AI

## Como validar o design

O primeiro checkpoint visual deve revisar desktop e mobile, com atenção especial ao contraste do hero, à leitura dos cards de métricas e à confirmação do formulário. Mudanças posteriores devem preservar o ritmo editorial e evitar voltar a layouts centralizados genéricos.

## Decisões de acessibilidade

A interface usa landmarks nativos, skip link, texto alternativo contextual, controles com nome acessível, foco visível, `aria-live` para feedback e respeito a `prefers-reduced-motion`. A cor nunca é o único canal de comunicação de estado.

## Decisões técnicas

A arquitetura é deliberadamente frontend-only. O React concentra comportamento e composição, enquanto o Tailwind e o CSS global concentram tokens e responsividade. O estado do formulário fica na página até que a equipe conecte uma API de agendamento; nenhum dado é enviado ou armazenado sem backend.

## GitHub

A organização foi pensada para funcionar em repositório público: nomes de pastas previsíveis, scripts de verificação, documentação das limitações atuais e instruções para configurar GitHub Pages ou outro provedor compatível com uma SPA estática.

## Assets

- `logo_mark_cb75fd1f.png`: símbolo original da marca.
- `hero_banner_da645c7c.png`: banner visual da seção principal.

Os arquivos de origem ficam em `/home/ubuntu/webdev-static-assets/`; o código aponta para as URLs do armazenamento permanente do projeto.

## Conteúdo e governança

Os números exibidos no dashboard são indicadores editoriais da campanha e devem ser conectados a uma fonte oficial antes de produção. O portal não inclui avaliações ou depoimentos fabricados.

## Próximos incrementos

- Integrar autenticação corporativa e API para criação real de agendamentos.
- Substituir indicadores estáticos por dados do SGI/TI.
- Adicionar arquivo PDF oficial da cartilha no armazenamento do projeto.
- Criar testes automatizados de acessibilidade e fluxos de formulário.
- Configurar deploy contínuo com GitHub Actions depois da definição do provedor de hospedagem.

## Contribuição

Contribuições devem manter o vocabulário de TI Verde, preservar a semântica HTML e atualizar a documentação quando uma decisão estrutural mudar.

## Licença

O código pode ser distribuído sob licença MIT. Conteúdos institucionais, marcas e documentos da Inpasa devem permanecer sujeitos às autorizações da organização.

## Histórico de versões

- 0.1.0 — Primeira arquitetura React/TypeScript e revisão visual do portal.

## Contato

Para questões sobre conteúdo institucional ou integração com o SGI/TI, abrir uma issue no repositório ou encaminhar a demanda ao responsável pelo projeto integrador.

## Aviso

Este arquivo é uma decisão de design e arquitetura do projeto; o `README.md` é a porta de entrada operacional para desenvolvimento, revisão e hospedagem.

## Referências internas

- `client/src/App.tsx`
- `client/src/pages/Home.tsx`
- `client/src/components/site/`
- `client/src/index.css`
- `docs/decisoes-arquiteturais.md`

## Critérios de aceite

A primeira entrega é considerada consistente quando o projeto inicia com `pnpm dev`, gera build com `pnpm build`, o formulário pode ser completado via teclado, a navegação funciona em viewport estreita e o README explica como conectar backend futuramente.

## Nota de manutenção

Alterações de identidade, textos institucionais ou indicadores devem ser tratadas como mudança de produto e acompanhadas por revisão da equipe responsável. O portal não deve transformar dados estimados em promessa de resultado.

## Nota sobre imagens

O hero utiliza imagem de baixa complexidade textual para manter o contraste do conteúdo principal. A marca usa o símbolo gerado como recurso visual e mantém o nome “INPASA TI VERDE” em texto para garantir legibilidade e acessibilidade.

## Encerramento

A direção Manifesto Verde Digital foi escolhida porque conecta sustentabilidade, operação e tecnologia sem depender de efeitos decorativos. O resultado esperado é um portal que ajude a pessoa a agir, entender o impacto e voltar para consultar o próximo passo.

## Pergunta de revisão

> Se o visitante abrir o portal em um celular durante o expediente, ele consegue saber o que fazer, por que fazer e como confirmar o descarte sem pedir ajuda?

Essa pergunta orienta as próximas revisões de interface.

## Responsabilidade de conteúdo

Os textos de conformidade e LGPD devem ser validados pela área jurídica e pelo SGI antes de publicação externa.

## Compatibilidade

A implementação deve ser verificada nos navegadores Chromium, Firefox e Safari em versões atuais, com teste em teclado e zoom de 200%.

## Princípio de simplificação

Se uma seção não facilitar o cadastro, a compreensão do impacto ou a consulta de orientação, ela deve ser reduzida ou removida.

## Estado atual

A aplicação é uma experiência estática interativa. A confirmação do agendamento é local e serve para demonstrar o fluxo da interface, não para representar um registro oficial.

## Roteiro de publicação

1. Executar os comandos do README.
2. Rodar a revisão visual nos breakpoints documentados.
3. Conectar variáveis de ambiente somente quando houver backend autorizado.
4. Publicar após revisar textos institucionais e indicadores.

## Fim

A estética deve permanecer sóbria, humana e orientada à ação.
