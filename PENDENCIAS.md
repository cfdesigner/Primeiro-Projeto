# Pendências

Lista viva do que ainda falta. **No começo de cada sessão e quando fizer sentido, lembre o dono das pendências abertas** (ele pediu, porque pode esquecer). Ao concluir uma, mova para "Feitas".

## Abertas

1. **Trocar o nome do repositório** (o dono faz no GitHub, em Settings; depois avisa o novo nome). Eu ajusto, uma vez só:
   - o script de preparação do ambiente `primeiro-projeto`, que procura a pasta pelo nome antigo (sem isso o Whisper e o `npm ci` deixam de instalar sozinhos);
   - a lista de repositórios desse ambiente;
   - citações do nome antigo nos arquivos.
2. **Abrir sessões novas no ambiente `primeiro-projeto`, não no Default.** Só ele tem a rede liberada (Hugging Face, GitHub) e o script que instala o Whisper.
3. **Provar o script de preparação numa sessão nova.** Foi testado, mas nunca rodou de verdade ao criar uma sessão. Conferir `/opt/whisper-venv` e `node_modules`.
4. **Testar legendas com um vídeo real:** fala real (ruído/música), vídeo longo, horizontal, o vídeo animado inteiro, e descobrir como o arquivo de vídeo chega até a sessão.
5. **Testar `criar-design-system` com a primeira referência real** (imagem ou vídeo). Pedir logo e fontes originais ao dono.
6. **Próximas skills da lista do dono** (ele traz os nomes): achar, ver se é gratuita, ler antes de instalar, checar conflito com Remotion/design systems.
7. **Limpezas pequenas (perguntar):** branch `previews-legenda` e branch `remover-video-teste` no GitHub; composições de exemplo no Root; artefato "Design System" duplicado no claude.ai; decidir se reticências também somem das legendas.

## Feitas

- Remotion + repositório configurados; vídeo de teste removido.
- Design system CFDesigner (tokens, componentes, brand book).
- Whisper (faster-whisper, CPU) e transcrição para legendas.
- Legendas do CFDesigner (dia a dia + frase de efeito), sem ponto final.
- Efeitos de movimento do CFDesigner, inspirados no HyperFrames (que não foi instalado).
- Reorganização como repositório master (design systems independentes, `tecnicas/`, `producoes/`, `CLAUDE.md`).
