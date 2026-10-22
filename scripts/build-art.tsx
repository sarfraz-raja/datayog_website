// Generates the brand illustrations as standalone SVG files in public/art/.
// Runs automatically before `npm run dev` and `npm run build`.
//
// Serving them as <img> files keeps thousands of SVG nodes out of each page's
// HTML and React payload, which keeps the pages fast.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { HeroDashboardScene } from "../src/components/art/hero-dashboard";
import { scenes } from "../src/components/art/scenes";
import { artCss } from "../src/components/art/styles";

const outDir = join(process.cwd(), "public", "art");
mkdirSync(outDir, { recursive: true });

const files: [name: string, Scene: () => ReactNode, viewBox: string][] = [
  ["hero-dashboard", HeroDashboardScene, "0 0 520 520"],
  ...Object.entries(scenes).map(([name, Scene]) => [name, Scene, "0 0 480 300"] as [string, () => ReactNode, string]),
];

for (const [name, Scene, viewBox] of files) {
  const svg = renderToStaticMarkup(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
      <style>{artCss}</style>
      <Scene />
    </svg>,
  );
  writeFileSync(join(outDir, `${name}.svg`), svg);
}

console.log(`✓ Generated ${files.length} illustrations in public/art`);
