# Plano de edição: C02 (efeitos, caixas de texto e b-roll)

Status: PROPOSTA, aguardando aprovação do dono. Design system: CFDesigner. Vídeo base: 19,5 s, vertical, uma pessoa falando.
Atenção: o rosto ocupa o centro (cabeça ≈ 17% a 50% da altura). Nenhuma caixa pode cobrir o rosto.

| Tempo | Fala | Proposta |
|---|---|---|
| 0,0 a 2,7 s | "Sabe quando tu olha para uma imagem e sente que ela poderia ser muito mais interessante?" | Sem gráfico (gancho limpo). B-roll 1 (opcional): imagem "sem vida" (plano plano, cinza) por ~1,5 s em "uma imagem". |
| 4,1 a 5,4 s | "não precisa de uma câmera melhor" | Frase de efeito já aprovada. Corte com zoom leve (PushIn) na palavra "câmera". |
| 5,5 a 6,8 s | "nem de uma produção gigantesca" | B-roll 2: set grande/equipe de cinema por ~1,3 s, entrando com FlashCut e voltando ao rosto. |
| 7,8 a 10,6 s | "direção, composição, cor, iluminação e som" | Checklist com 5 itens, todos ✓ dourados, cada um marcado ~0,2 s antes da palavra. Posição: no topo (acima da cabeça), nunca sobre o rosto. Precisa adaptar o card para 2 linhas. |
| 11,3 a 13,7 s | "transformar completamente a composição daquela cena" | B-roll 3: a MESMA cena "antes e depois" (sem tratamento → com cor e luz) revelada por WipeReveal na palavra "transformar". |
| 13,9 s | "E é justamente aí..." | Vazamento de luz dourado (LightLeak CSS) marcando a virada do texto. |
| 15,9 a 16,8 s | "simplesmente editar" | Palavra riscada: chamada "SIMPLESMENTE", palavra "EDITAR" com o fio dourado. |
| 17,5 a 18,8 s | "construir uma experiência visual" | Frase de efeito já aprovada. |
| 19,5 s | fim | Transição já feita (zoom, desfoque, luz) e fecho com o logo. |

Regras: sem terceiro de nome, sem barras de REC, legenda sem ponto final, light leak oficial não usar (usar o CSS do CFDesigner), motion blur só `HtmlInCanvasMotionBlur`.

## Perguntas em aberto
1. De onde vem o b-roll? (a) clipes seus; (b) vídeos de banco de imagens; (c) gerados por IA. Nenhuma das opções gasta nada até você escolher.
2. Quantos b-rolls: os 3 acima ou só 2?
