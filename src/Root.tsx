import { Composition, Still } from "remotion";
import { ExemploEfeitos } from "../design-systems/cfdesigner/exemplo/ExemploEfeitos";
import { ExemploLegendas } from "../design-systems/cfdesigner/exemplo/ExemploLegendas";
import { CFDesignerShowcase } from "../design-systems/cfdesigner/Showcase";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Quadro de referência do design system CFDesigner. Os vídeos novos entram aqui como <Composition>. */}
      <Still
        id="CFDesigner-Componentes"
        component={CFDesignerShowcase}
        width={1600}
        height={1500}
      />
      {/* Exemplo de legendas (dia a dia + frase de efeito). Pode apagar quando quiser. */}
      <Composition
        id="CFDesigner-Legendas-Exemplo"
        component={ExemploLegendas}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="CFDesigner-Efeitos-Exemplo"
        component={ExemploEfeitos}
        durationInFrames={210}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
