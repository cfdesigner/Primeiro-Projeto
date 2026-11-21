# Checklist do projeto

**No começo de cada sessão e quando fizer sentido, lembre o dono do que está aberto** (ele pediu, porque pode esquecer). Ao concluir um item, marque `[x]`. Cada item diz quem faz: **[dono]** ou **[Claude]**.

## Feito

### Base do repositório

- [x] Remotion configurado e vídeo de teste removido
- [x] Repositório renomeado para `cf-studio` (remoto, ambiente e script de preparação ajustados)
- [x] Repositório reorganizado como "master": design systems independentes, `tecnicas/`, `producoes/`, `CLAUDE.md` com as regras do dono

### Design system CFDesigner

- [x] Tokens, componentes, logos, fotos e brand book (vindos do artefato do claude.ai)
- [x] Legendas: dia a dia (Montserrat, contorno fino, sem tarja) e frase de efeito (Título de cinema), **sem ponto final**
- [x] 10 efeitos de movimento (terceiro de nome, contador, câmera, clarão, cortina, granulado...) e fecho discreto com o logo
- [x] Barras de REC/timecode desligadas por padrão

### Ferramentas e skills

- [x] Whisper instalado (transcrição em português, só CPU) e script de transcrição
- [x] Skills: `producao-de-video`, `design-systems`, `criar-design-system`, `legendas`, `whisper`
- [x] HyperFrames avaliado: não instalado (conflita com o Remotion); virou inspiração para os efeitos

### Design system CERTI

- [x] Etapa 2 aprovada e no `main`: movimento e transições medidos (site e institucional), terceiro de nome e vídeos de teste
- [x] Etapa 1 aprovada: cores medidas do logo, Nunito Sans, logo com fundo transparente, componentes base, brand book e ficha
- [x] Decisões do dono: texto branco sobre as cores, Nunito Sans em tudo, cantos e sombras opção B
- [x] Logos: vertical (colorido e negativo) fornecidos; horizontal negativo e símbolo derivados dos arquivos do dono

## Próximos passos

### CERTI: o que depende do dono

- [ ] **[dono]** (opcional) fotos, manual da marca e, se existirem, os arquivos oficiais do horizontal negativo e do símbolo (hoje derivados por mim)

### CERTI: o que o Claude faz depois

- [ ] **[Claude]** Etapa 3: 4 opções de legenda, simuladas em Reels, para o dono escolher
- [ ] **[Claude]** Etapa 4: números e fecho (o terceiro de nome já foi feito na etapa 2)
- [ ] **[Claude]** Apresentações (slides) do CERTI: à parte, no claude.ai, reaproveitando cores e fontes

### Testes que ainda não foram feitos

- [ ] **[dono + Claude]** Legendas com um **vídeo real do dono**: fala real, música ao fundo, vídeo longo, horizontal, e descobrir como o arquivo chega até a sessão
- [ ] **[Claude]** Provar o script de preparação numa **sessão nova** (Whisper e `npm ci` instalados sozinhos?)
- [ ] **[Claude]** Confirmar com mais uma referência real o processo `criar-design-system` (já usado no CERTI com prints, sem vídeo)

### Conferências rápidas

- [ ] **[dono]** Conferir, nas configurações do ambiente `cf-studio` no claude.ai, se a lista de repositórios mostra `cf-studio` (pode mostrar o nome antigo; minhas ferramentas não editam essa lista)
- [ ] **[dono]** Abrir as sessões novas no ambiente **`cf-studio`**, não no Default (só ele tem a rede liberada e o Whisper)

### Skills da lista do dono

- [ ] **[dono]** Trazer os nomes das próximas skills
- [ ] **[Claude]** Para cada uma: achar, ver se é gratuita, ler antes de instalar, checar conflito com Remotion/design systems

### Limpezas pequenas

- [ ] **[dono]** Apagar no GitHub as branches antigas: `design-system-certi`, `previews-legenda`, `remover-video-teste` (o servidor recusou que eu apague)
- [ ] **[dono]** Apagar o artefato "Design System" duplicado no claude.ai (não foi usado)
- [ ] **[dono]** Decidir se os vídeos de exemplo do Root ficam ou saem
- [ ] **[dono]** Decidir se as reticências ("...") também somem das legendas (hoje ficam)

## Regras que valem para tudo

Estão no `CLAUDE.md`: sem ponto final nas legendas, sem barras de REC, visual limpo e premium, aprovar escolhas de estilo antes de renderizar, nunca versionar vídeos.
