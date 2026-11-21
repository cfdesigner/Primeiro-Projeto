// TÉCNICA GERAL (sem marca): teste do pacote @remotion/motion-blur. RESULTADOS (Remotion 4.0.544, Chromium 153, sem GPU):
//  - HtmlInCanvasMotionBlur: FUNCIONA. Rastro centrado, cores exatas, estável (3 renderizações idênticas), também sobre vídeo real.
//    Custo: ~2,8x o tempo de render (30 quadros 1920x1080: 8,6 s sem blur, 24,1 s com blur, 8 amostras).
//  - CameraMotionBlur: funciona e é estável, mas o rastro vem deslocado ~meio quadro à frente do movimento e TINGE o fundo
//    (preto 11,12,14 virou 8,16,16). Evitar.
//  - Trail: não teve efeito algum (imagem idêntica ao controle, mesmo com parâmetros fortes). Não usar.
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  CameraMotionBlur,
  HtmlInCanvasMotionBlur,
  Trail,
} from "@remotion/motion-blur";

export type ModoBlur =
  | "nenhum"
  | "html"
  | "camera"
  | "trail"
  | "video-nenhum"
  | "video-html";

const Caixa: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 30], [40, 880], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ background: "#0b0c0e" }}>
      <div
        style={{
          position: "absolute",
          left: x,
          top: 800,
          width: 160,
          height: 160,
          background: "#d9a441",
          color: "#0b0c0e",
          fontFamily: "sans-serif",
          fontWeight: 800,
          fontSize: 44,
          display: "grid",
          placeItems: "center",
        }}
      >
        TESTE
      </div>
    </AbsoluteFill>
  );
};

/** Caixa de 160 px que cruza o quadro em 1 s (28 px por quadro). O modo escolhe o tipo de motion blur. */
export const ExemploMotionBlur: React.FC<{ modo?: ModoBlur }> = ({
  modo = "nenhum",
}) => {
  const { width, height } = useVideoConfig();
  if (modo === "html")
    return (
      <HtmlInCanvasMotionBlur
        width={width}
        height={height}
        samples={8}
        shutterAngle={180}
      >
        <Caixa />
      </HtmlInCanvasMotionBlur>
    );
  if (modo === "camera")
    return (
      <CameraMotionBlur shutterAngle={180} samples={8}>
        <Caixa />
      </CameraMotionBlur>
    );
  if (modo === "trail")
    return (
      <Trail layers={5} lagInFrames={1} trailOpacity={0.7}>
        <Caixa />
      </Trail>
    );
  return <Caixa />;
};

/** Vídeo real com zoom de impacto (1x a 1,6x em 0,4 s): o caso de uso de verdade. Usa public/entrada/clips/d.mp4 (ignorada pelo Git). */
const VideoZoom: React.FC = () => {
  const frame = useCurrentFrame();
  const z = interpolate(frame, [4, 16], [1, 1.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad),
  });
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${z})` }}>
        <OffthreadVideo
          src={staticFile("entrada/clips/d.mp4")}
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const ExemploMotionBlurVideo: React.FC<{ comBlur: boolean }> = ({
  comBlur,
}) => {
  const { width, height } = useVideoConfig();
  if (!comBlur) return <VideoZoom />;
  return (
    <HtmlInCanvasMotionBlur
      width={width}
      height={height}
      samples={8}
      shutterAngle={180}
    >
      <VideoZoom />
    </HtmlInCanvasMotionBlur>
  );
};
