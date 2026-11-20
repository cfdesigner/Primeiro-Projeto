import React from "react";
import { palette, fam, type BaseProps } from "./shared";

export type HighlightIcon = "reels" | "process" | "clients" | "collabs" | "cinestyle";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "square",
  strokeLinejoin: "miter",
} as const;

const icons: Record<HighlightIcon, React.ReactNode> = {
  reels: (
    <>
      <rect x={3} y={4} width={18} height={16} {...stroke} />
      <path d="M3 8h18M3 16h18M7 4v4M12 4v4M17 4v4M7 16v4M12 16v4M17 16v4" {...stroke} />
    </>
  ),
  process: (
    <>
      <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" {...stroke} />
      <rect x={14} y={4} width={4} height={4} {...stroke} />
      <rect x={8} y={10} width={4} height={4} {...stroke} />
      <rect x={16} y={16} width={4} height={4} {...stroke} />
    </>
  ),
  clients: (
    <>
      <path d="M4 5h16v11H10l-4 3v-3H4z" {...stroke} />
      <path d="M8 9h8M8 12h5" {...stroke} />
    </>
  ),
  collabs: (
    <>
      <circle cx={12} cy={12} r={8.5} {...stroke} />
      <path d="M3.5 12h17M12 3.5c-3 3.2-3 13.8 0 17M12 3.5c3 3.2 3 13.8 0 17" {...stroke} />
    </>
  ),
  cinestyle: (
    <>
      <path d="M3 10h18v10H3z" {...stroke} />
      <path d="M3 10l1-5 17 2-1 3M8 5.6 7 10M14 6.3 13 10" {...stroke} />
    </>
  ),
};

export type HighlightCoverProps = BaseProps & { icon: HighlightIcon; label: string };

export const HighlightCover: React.FC<HighlightCoverProps> = ({
  icon,
  label,
  scale = 1,
  style,
}) => {
  const c = palette("cinema");
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8 * scale,
        width: 88 * scale,
        ...style,
      }}
    >
      <div
        style={{
          width: 76 * scale,
          height: 76 * scale,
          borderRadius: 999,
          background: c.surface,
          border: `${scale}px solid ${c.line}`,
          display: "grid",
          placeItems: "center",
          color: c.amberText,
          boxShadow: `inset 0 0 0 ${4 * scale}px ${c.void}, inset 0 0 0 ${5 * scale}px ${c.line}`,
        }}
      >
        <svg viewBox="0 0 24 24" style={{ width: 28 * scale, height: 28 * scale }}>
          {icons[icon]}
        </svg>
      </div>
      <span style={{ fontFamily: fam.body, fontSize: 12 * scale, color: c.ink }}>{label}</span>
    </div>
  );
};
