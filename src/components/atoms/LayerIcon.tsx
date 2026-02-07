import type { LayerIconType } from "@/data/layers";

const color = "var(--fpl-icon-color, var(--color-icon, currentColor))";

/** Frame / Component / Group / Image / Text icons (Figma layer types). */
export function LayerIcon({ type }: { type: LayerIconType }) {
  switch (type) {
    case "frame":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color }}>
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.5 3a.5.5 0 0 1 .5.5V5h4V3.5a.5.5 0 0 1 1 0V5h1.5a.5.5 0 0 1 0 1H11v4h1.5a.5.5 0 0 1 0 1H11v1.5a.5.5 0 0 1-1 0V11H6v1.5a.5.5 0 0 1-1 0V11H3.5a.5.5 0 0 1 0-1H5V6H3.5a.5.5 0 0 1 0-1H5V3.5a.5.5 0 0 1 .5-.5m4.5 7V6H6v4z"
          />
        </svg>
      );
    case "component":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color }}>
          <path
            fill="currentColor"
            d="M8 5.838 6.66 4.5 8 3.162 9.34 4.5zm-.43-3.66L5.68 4.066a.613.613 0 0 0 0 .868l1.89 1.888a.61.61 0 0 0 .86 0l1.89-1.888a.613.613 0 0 0 0-.868L8.43 2.178a.61.61 0 0 0-.86 0M10.161 8 11.5 6.66 12.838 8 11.5 9.34zm-.984.43 1.888 1.89c.24.24.628.24.868 0l1.888-1.89a.61.61 0 0 0 0-.86l-1.888-1.89a.613.613 0 0 0-.868 0L9.178 7.57a.61.61 0 0 0 0 .86M6.66 11.5 8 12.838 9.34 11.5 8 10.162zm-.98-.434 1.89-1.888a.61.61 0 0 1 .86 0l1.89 1.888c.24.24.24.628 0 .868l-1.89 1.888a.61.61 0 0 1-.86 0l-1.89-1.888a.613.613 0 0 1 0-.868M3.162 8 4.5 6.66 5.838 8 4.5 9.34zm-.984.43 1.888 1.89c.24.24.628.24.868 0l1.888-1.89a.61.61 0 0 0 0-.86L4.934 5.68a.613.613 0 0 0-.868 0L2.178 7.57a.61.61 0 0 0 0 .86"
          />
        </svg>
      );
    case "group":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color }}>
          <path
            fill="currentColor"
            d="M3 4a1 1 0 0 1 1-1 .5.5 0 0 1 0 1 .5.5 0 0 1-1 0m2.5-.5A.5.5 0 0 1 6 3h1a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5m3 0A.5.5 0 0 1 9 3h1a.5.5 0 0 1 0 1H9a.5.5 0 0 1-.5-.5m3 0A.5.5 0 0 1 12 3a1 1 0 0 1 1 1 .5.5 0 0 1-1 0 .5.5 0 0 1-.5-.5m-8 2A.5.5 0 0 1 4 6v1a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m9 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m-9 3A.5.5 0 0 1 4 9v1a.5.5 0 0 1-1 0V9a.5.5 0 0 1 .5-.5m9 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V9a.5.5 0 0 1 .5-.5m-9 3a.5.5 0 0 1 .5.5.5.5 0 0 1 0 1 1 1 0 0 1-1-1 .5.5 0 0 1 .5-.5m9 0a.5.5 0 0 1 .5.5 1 1 0 0 1-1 1 .5.5 0 0 1 0-1 .5.5 0 0 1 .5-.5m-7 1A.5.5 0 0 1 6 12h1a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5m3 0A.5.5 0 0 1 9 12h1a.5.5 0 0 1 0 1H9a.5.5 0 0 1-.5-.5"
          />
        </svg>
      );
    case "image":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color }}>
          <path
            fill="currentColor"
            d="M11.5 3A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7l-.153-.008A1.5 1.5 0 0 1 3 11.5v-7A1.5 1.5 0 0 1 4.5 3zm-7 1a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5zm1.725 3.082a.5.5 0 0 1 .629.064l3 3a.5.5 0 1 1-.708.707L6.5 8.208l-.646.647a.5.5 0 1 1-.708-.708l1-1zM9.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
          />
        </svg>
      );
    case "text":
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden style={{ color }}>
          <path
            fill="currentColor"
            d="M3 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V4H8v7h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H7V4H4v.5a.5.5 0 0 1-1 0z"
          />
        </svg>
      );
  }
}
