import React from "react";
import { Easing, OffthreadVideo, Sequence } from "remotion";

export type RampedVideoProps = {
  src: string;
  /** Quadro de origem em que o trecho começa (no fps da composição). */
  startFromFrame?: number;
  /** Velocidade no começo e no fim da rampa (1 = normal). */
  rateFrom: number;
  rateTo: number;
  /** Duração da rampa, em quadros da composição. Depois dela, segue na velocidade final. */
  rampFrames: number;
  /** Tamanho de cada trecho de velocidade constante (quadros). Menor = rampa mais suave, mais lenta de renderizar. */
  segment?: number;
  easing?: (t: number) => number;
  style?: React.CSSProperties;
};

/**
 * Speed ramp: o vídeo muda de velocidade de forma gradual (ex.: rápido que desacelera até o normal).
 * Aproxima a rampa por trechos curtos de velocidade constante, cada um começando onde o anterior terminou.
 */
export const RampedVideo: React.FC<RampedVideoProps> = ({
  src,
  startFromFrame = 0,
  rateFrom,
  rateTo,
  rampFrames,
  segment = 3,
  easing = Easing.out(Easing.cubic),
  style,
}) => {
  const n = Math.ceil(rampFrames / segment);
  const parts: { from: number; rate: number; start: number }[] = [];
  let pos = startFromFrame;
  for (let j = 0; j < n; j++) {
    const mid = Math.min((j + 0.5) * segment, rampFrames) / rampFrames;
    const rate = rateFrom + (rateTo - rateFrom) * easing(mid);
    parts.push({ from: j * segment, rate, start: Math.round(pos) });
    pos += rate * segment;
  }
  const vs: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    ...style,
  };
  return (
    <>
      {parts.map((p) => (
        <Sequence key={p.from} from={p.from} durationInFrames={segment}>
          <OffthreadVideo
            src={src}
            startFrom={p.start}
            playbackRate={p.rate}
            muted
            style={vs}
          />
        </Sequence>
      ))}
      <Sequence from={n * segment}>
        <OffthreadVideo
          src={src}
          startFrom={Math.round(pos)}
          playbackRate={rateTo}
          muted
          style={vs}
        />
      </Sequence>
    </>
  );
};
