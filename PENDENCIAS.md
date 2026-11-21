# Pendências

Lista viva do que ainda falta. **No começo de cada sessão e quando fizer sentido, lembre o dono das pendências abertas** (ele pediu, porque pode esquecer). Ao concluir uma, mova para "Feitas".

## Abertas

1. **Conferir a lista de repositórios do ambiente `cf-studio`** (nas configurações do ambiente, no claude.ai): ela ainda pode mostrar o nome antigo `cfdesigner/primeiro-projeto`. As minhas ferramentas não conseguem editar essa lista. O GitHub redireciona o nome antigo, então provavelmente funciona, mas vale conferir ao abrir a primeira sessão nova.
2. **Abrir sessões novas no ambiente `cf-studio`, não no Default.** Só ele tem a rede liberada (Hugging Face, GitHub) e o script que instala o Whisper.
3. **Provar o script de preparação numa sessão nova.** Foi testado, mas nunca rodou de verdade ao criar uma sessão. Conferir `/opt/whisper-venv` e `node_modules`.
4. **Testar legendas com um vídeo real:** fala real (ruído/música), vídeo longo, horizontal, o vídeo animado inteiro, e descobrir como o arquivo de vídeo chega até a sessão.
5. **Testar `criar-design-system` com a primeira referência real** (imagem ou vídeo). Pedir logo e fontes originais ao dono.
6. **Design system `certi`: continuar (etapa 1 aprovada e no `main`).** Decisões do dono: texto branco sobre as cores, Nunito Sans em tudo, cantos/sombras opção B. Faltam: **vídeo de tela do site** (para movimento e transições), **versão negativa (branca) do logo** e do símbolo, fotos, manual da marca se houver. Etapas seguintes: movimento/transições, 4 opções de legenda (simuladas em Reels), terceiro/números/fecho. O site `certi.org.br` está bloqueado na rede (o dono negou liberar): trabalhar com prints. O dono é muito visual: mostrar decisões como imagens simuladas em Reels, lado a lado.
7. **Próximas skills da lista do dono** (ele traz os nomes): achar, ver se é gratuita, ler antes de instalar, checar conflito com Remotion/design systems.
8. **Limpezas pequenas (perguntar):** branch `previews-legenda` e branch `remover-video-teste` no GitHub; composições de exemplo no Root; artefato "Design System" duplicado no claude.ai; decidir se reticências também somem das legendas.

## Feitas

- Design system `certi`, etapa 1: cores do logo, Nunito Sans, logo, componentes base, brand book e ficha (aprovada).
- Repositório renomeado para `cf-studio`: remoto local atualizado, ambiente renomeado para `cf-studio` e script de preparação reescrito para achar o projeto pelo conteúdo (não depende mais do nome da pasta).
- Remotion + repositório configurados; vídeo de teste removido.
- Design system CFDesigner (tokens, componentes, brand book).
- Whisper (faster-whisper, CPU) e transcrição para legendas.
- Legendas do CFDesigner (dia a dia + frase de efeito), sem ponto final.
- Efeitos de movimento do CFDesigner, inspirados no HyperFrames (que não foi instalado).
- Reorganização como repositório master (design systems independentes, `tecnicas/`, `producoes/`, `CLAUDE.md`).
