import { TecnicasComposicoes } from "../tecnicas/composicoes";
import { CertiComposicoes } from "../design-systems/certi/composicoes";
import { CFDesignerComposicoes } from "../design-systems/cfdesigner/composicoes";
import { Producoes } from "../producoes";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Um bloco por design system (exemplos de referência) */}
      <CFDesignerComposicoes />
      <CertiComposicoes />
      {/* Exemplos das técnicas gerais */}
      <TecnicasComposicoes />
      {/* Produções de verdade */}
      <Producoes />
    </>
  );
};
