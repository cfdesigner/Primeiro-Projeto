import type * as React from "react";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "petrol" | "ghost";
  size?: "md" | "sm";
}
export declare function Button(props: ButtonProps): React.ReactElement;
export interface TagProps {
  tone?: "neutral" | "amber" | "petrol" | "rec" | "time";
  children?: React.ReactNode;
}
export declare function Tag(props: TagProps): React.ReactElement;
export interface LogoProps {
  layout?: "horizontal" | "stacked" | "symbol";
  finish?: "white" | "metal";
  height?: number;
  alt?: string;
}
export declare function Logo(props: LogoProps): React.ReactElement;
export interface HighlightCoverProps {
  icon: "reels" | "process" | "clients" | "collabs" | "cinestyle";
  label: string;
}
export declare function HighlightCover(
  props: HighlightCoverProps,
): React.ReactElement;
export interface ReelFrameProps {
  hook: string;
  accent?: string;
  eyebrow?: string;
  image?: string;
  imagePosition?: string;
  timecode?: string;
  fps?: string;
  width?: number;
}
export declare function ReelFrame(props: ReelFrameProps): React.ReactElement;
export interface ProfileBannerProps {
  image?: string;
  role?: string;
  headline?: string;
  accent?: string;
  sub?: string;
}
export declare function ProfileBanner(
  props: ProfileBannerProps,
): React.ReactElement;
export interface ServiceCardProps {
  title: string;
  price: string;
  unit?: string;
  items?: string[];
  badge?: string;
  featured?: boolean;
  cta?: string;
}
export declare function ServiceCard(
  props: ServiceCardProps,
): React.ReactElement;
export interface TestimonialProps {
  quote: string;
  author: string;
  context?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}
export declare function Testimonial(
  props: TestimonialProps,
): React.ReactElement;
export interface ManifestoProps {
  quote?: string;
  translation?: string | null;
  author?: string;
}
export declare function Manifesto(props: ManifestoProps): React.ReactElement;
declare global {
  interface Window {
    CF: {
      Button: typeof Button;
      Tag: typeof Tag;
      Logo: typeof Logo;
      HighlightCover: typeof HighlightCover;
      ReelFrame: typeof ReelFrame;
      ProfileBanner: typeof ProfileBanner;
      ServiceCard: typeof ServiceCard;
      Testimonial: typeof Testimonial;
      Manifesto: typeof Manifesto;
    };
  }
}
