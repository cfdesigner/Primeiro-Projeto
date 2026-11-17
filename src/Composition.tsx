import { AbsoluteFill, Interactive, interpolate } from "remotion";
import { useCurrentFrame } from "remotion";

export const MyComponent: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
        padding: "100px 80px",
      }}
    >
      <Interactive.Div
        name="Titulo"
        style={{
          color: "#ffffff",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 140,
          fontWeight: 800,
          textAlign: "center",
          lineHeight: 1.2,
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Meu primeiro projeto
      </Interactive.Div>
    </AbsoluteFill>
  );
};
