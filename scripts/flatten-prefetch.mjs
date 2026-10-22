// Runs after `next build` (static export into out/).
//
// The App Router prefetches each linked page in small "segment" files and asks
// for them with dot-joined names, e.g. /blog/__next.blog.__PAGE__.txt, but the
// static export writes them as nested folders: /blog/__next.blog/__PAGE__.txt.
// A static host (Cloudflare Pages) can't map one onto the other, so the prefetch
// requests fail and link prefetching stops working. This copies every nested
// segment file to the dot-joined name next to its folder. Nothing is removed.
import { copyFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
let copied = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (!statSync(path).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(path, dir, name);
    else walk(path);
  }
}

// out/blog/__next.blog/$d$slug/__PAGE__.txt → out/blog/__next.blog.$d$slug.__PAGE__.txt
function flatten(segmentDir, parent, segmentName) {
  const files = [];
  (function collect(dir) {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) collect(path);
      else if (name.endsWith(".txt")) files.push(path);
    }
  })(segmentDir);

  for (const file of files) {
    const dotted = [segmentName, ...relative(segmentDir, file).split(sep)].join(".");
    copyFileSync(file, join(parent, dotted));
    copied++;
  }
}

walk(OUT);
console.log(`✓ Prefetch segments: ${copied} files made reachable for static hosting`);
