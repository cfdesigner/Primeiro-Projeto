import { Still } from "remotion";
import { CFDesignerShowcase } from "../design-systems/cfdesigner/Showcase";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Quadro de referência do design system CFDesigner. Os vídeos novos entram aqui como <Composition>. */}
      <Still id="CFDesigner-Componentes" component={CFDesignerShowcase} width={1600} height={1500} />
    </>
  );
};
