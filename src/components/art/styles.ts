// Styles embedded inside every generated illustration SVG (scripts/build-art.tsx).
//
// The illustrations are deliberately static: animating inside an SVG image makes
// the browser re-render the whole image on the main thread every frame, which is
// slow on low-end phones. Motion lives in HTML overlays instead (transform/opacity,
// GPU-composited) — see components/art/hero-dashboard.tsx.
export const artCss = `
text { font-family: Inter, "Segoe UI", system-ui, -apple-system, sans-serif; }
.art-flow { stroke-dasharray: 8 14; }
.art-pulse { opacity: 0.3; }
`;
