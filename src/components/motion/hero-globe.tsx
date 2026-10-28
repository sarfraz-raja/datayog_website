"use client";

import { useEffect, useRef } from "react";
import { LAND_COLS, LAND_MASK, LAND_ROWS } from "./land-mask";

// Hubs the arcs connect: DATAYOG's markets (US, Canada, Europe, Middle East, India, Africa, Asia).
const HUBS: Record<string, [lat: number, lon: number]> = {
  plano: [33.02, -96.7],
  toronto: [43.65, -79.38],
  london: [51.5, -0.12],
  dubai: [25.2, 55.27],
  mumbai: [19.07, 72.88],
  delhi: [28.61, 77.2],
  lagos: [6.52, 3.38],
  nairobi: [-1.29, 36.82],
  johannesburg: [-26.2, 28.05],
  singapore: [1.35, 103.82],
};
const ROUTES: [string, string][] = [
  ["plano", "toronto"],
  ["plano", "london"],
  ["toronto", "london"],
  ["london", "dubai"],
  ["dubai", "mumbai"],
  ["dubai", "delhi"],
  ["london", "lagos"],
  ["dubai", "nairobi"],
  ["nairobi", "johannesburg"],
  ["lagos", "johannesburg"],
  ["mumbai", "singapore"],
  ["plano", "lagos"],
];

const ORANGE = "254,133,45";
const AMBER = "255,190,120";
const BLUE = "120,175,255";
const TILT = (45 * Math.PI) / 180; // axial tilt toward the viewer — shows northern hemisphere
const SPEED = 0.025; // fraction of π radians per second (~80 s per turn)
const SAMPLES = 40; // points per arc

type Vec = [number, number, number];

const toVec = (lat: number, lon: number): Vec => {
  const phi = (lat * Math.PI) / 180;
  const lambda = (lon * Math.PI) / 180;
  return [Math.cos(phi) * Math.sin(lambda), Math.sin(phi), Math.cos(phi) * Math.cos(lambda)];
};

function landDots(count: number): Vec[] {
  const bits = Uint8Array.from(atob(LAND_MASK), (c) => c.charCodeAt(0));
  const isLand = (lat: number, lon: number) => {
    const row = Math.min(LAND_ROWS - 1, Math.floor(((90 - lat) / 180) * LAND_ROWS));
    const col = Math.min(LAND_COLS - 1, Math.floor(((lon + 180) / 360) * LAND_COLS));
    const i = row * LAND_COLS + col;
    return (bits[i >> 3] >> (i & 7)) & 1;
  };
  // Fibonacci sphere: evenly spread points, keep the ones on land.
  const dots: Vec[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const lat = (Math.asin(y) * 180) / Math.PI;
    const lon = ((((i * golden * 180) / Math.PI) % 360) + 360) % 360 - 180;
    if (lat > -60 && isLand(lat, lon)) dots.push(toVec(lat, lon));
  }
  return dots;
}

/** Great-circle arc between two points, lifted off the surface in the middle. */
function arc(a: Vec, b: Vec): Vec[] {
  const angle = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const lift = 0.08 + angle * 0.12;
  const points: Vec[] = [];
  for (let s = 0; s <= SAMPLES; s++) {
    const t = s / SAMPLES;
    const wa = Math.sin((1 - t) * angle) / Math.sin(angle);
    const wb = Math.sin(t * angle) / Math.sin(angle);
    const h = 1 + lift * Math.sin(Math.PI * t);
    points.push([(a[0] * wa + b[0] * wb) * h, (a[1] * wa + b[1] * wb) * h, (a[2] * wa + b[2] * wb) * h]);
  }
  return points;
}

/**
 * Original "digital earth" for the home hero: dotted continents, glowing network
 * arcs between DATAYOG's markets and travelling data pulses. Canvas 2D, starts
 * after the page has loaded, pauses off-screen, and draws one still frame for
 * people who prefer reduced motion.
 */
export function HeroGlobe({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let cx = 0;
    let cy = 0;
    let radius = 0;
    let lite = false;
    let dots: Vec[] = [];
    const arcs = ROUTES.map(([a, b], i) => ({
      points: arc(toVec(...HUBS[a]), toVec(...HUBS[b])),
      offset: (i * 0.37) % 1,
      color: i % 3 === 2 ? BLUE : ORANGE,
    }));
    const hubs = Object.values(HUBS).map(([lat, lon]) => toVec(lat, lon));

    let raf = 0;
    let visible = true;
    let frame = 0;
    let rotation = -1.05; // 
    let last = 0;
    let backdrop: HTMLCanvasElement | null = null;

    // The glow and the planet disc never change, so they are painted once per
    // resize into an offscreen canvas and simply copied on every frame.
    const paintBackdrop = (dpr: number) => {
      const layer = document.createElement("canvas");
      layer.width = canvas.width;
      layer.height = canvas.height;
      const g = layer.getContext("2d");
      if (!g) return null;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const glow = g.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.35);
      glow.addColorStop(0, `rgba(${ORANGE},0.28)`);
      glow.addColorStop(0.4, `rgba(${BLUE},0.08)`);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      g.fillStyle = glow;
      g.fillRect(0, 0, width, height);
      const disc = g.createRadialGradient(cx - radius * 0.35, cy - radius * 0.35, radius * 0.1, cx, cy, radius);
      disc.addColorStop(0, "#16305a");
      disc.addColorStop(1, "#071326");
      g.fillStyle = disc;
      g.beginPath();
      g.arc(cx, cy, radius, 0, Math.PI * 2);
      g.fill();
      g.strokeStyle = `rgba(${AMBER},0.35)`;
      g.lineWidth = 1;
      g.stroke();
      return layer;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      lite = width < 640;
      const dpr = lite ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Never larger than the visible window (minus header and ticker), so the whole
      // globe stays on screen even on short laptop displays.
      radius = Math.min(width, height, window.innerHeight - 140) * 0.4;
      cx = width / 2;
      cy = height / 2;
      dots = landDots(lite ? 10000 : 28000);
      backdrop = paintBackdrop(dpr);
    };

    // Rotate around the Y axis, then tilt toward the viewer; returns screen x, y and depth.
    // cos/sin of the rotation are refreshed once per frame in draw().
    let cosR = 1;
    let sinR = 0;
    const cosT = Math.cos(TILT);
    const sinT = Math.sin(TILT);
    const project = ([x, y, z]: Vec): [number, number, number] => {
      const x1 = x * cosR + z * sinR;
      const z1 = -x * sinR + z * cosR;
      const y2 = y * cosT - z1 * sinT;
      const z2 = y * sinT + z1 * cosT;
      return [cx + x1 * radius, cy - y2 * radius, z2];
    };

    const BANDS = 5; // dot brightness levels, each filled in a single draw call

    const draw = (time: number) => {
      cosR = Math.cos(rotation);
      sinR = Math.sin(rotation);
      ctx.clearRect(0, 0, width, height);
      if (backdrop) ctx.drawImage(backdrop, 0, 0, width, height);

      // Continents as dots, brighter toward the viewer. Grouping them by
      // brightness keeps it to a handful of fills instead of one per dot.
      const size = Math.max(1.4, radius / 130);
      const bands = Array.from({ length: BANDS }, () => new Path2D());
      for (const dot of dots) {
        const [x, y, z] = project(dot);
        if (z <= 0) continue;
        bands[Math.min(BANDS - 1, Math.floor(z * BANDS))].rect(x - size / 2, y - size / 2, size, size);
      }
      bands.forEach((band, i) => {
        ctx.fillStyle = `rgba(${AMBER},${0.35 + ((i + 0.5) / BANDS) * 0.65})`;
        ctx.fill(band);
      });

      // Network arcs with a travelling pulse.
      ctx.lineCap = "round";
      for (const a of arcs) {
        const projected = a.points.map(project);
        ctx.strokeStyle = `rgba(${a.color},0.35)`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        let drawing = false;
        for (const [x, y, z] of projected) {
          if (z > -0.05) {
            if (drawing) ctx.lineTo(x, y);
            else ctx.moveTo(x, y);
            drawing = true;
          } else drawing = false;
        }
        ctx.stroke();

        const head = (((time / 2600 + a.offset) % 1) * 1.3 - 0.15) * SAMPLES;
        for (let s = 0; s < 8; s++) {
          const index = Math.round(head - s);
          const point = projected[index];
          if (!point || point[2] <= -0.05) continue;
          ctx.fillStyle = `rgba(${a.color},${(1 - s / 8) * 0.95})`;
          ctx.beginPath();
          ctx.arc(point[0], point[1], (2.4 - s * 0.22) * (radius / 260), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Hub markers with a soft ping.
      const ping = (time % 2400) / 2400;
      for (const hub of hubs) {
        const [x, y, z] = project(hub);
        if (z <= 0) continue;
        ctx.fillStyle = `rgba(${ORANGE},1)`;
        ctx.beginPath();
        ctx.arc(x, y, 3 * (radius / 260), 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(${ORANGE},${0.6 * (1 - ping)})`;
        ctx.beginPath();
        ctx.arc(x, y, (4 + ping * 12) * (radius / 260), 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    const loop = (time: number) => {
      const dt = last ? Math.min(0.05, (time - last) / 1000) : 0;
      last = time;
      rotation += dt * SPEED * Math.PI;
      // Phones draw every third frame (~20fps); at this slow spin it looks the same.
      if (!lite || frame++ % 3 === 0) draw(time);
      raf = requestAnimationFrame(loop);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      last = 0;
      if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });

    // Start after the page has loaded and the browser is idle, so the globe
    // never competes with loading or hydration.
    const start = () => {
      resize();
      draw(performance.now());
      canvas.style.opacity = "1";
      resizeObserver.observe(canvas);
      viewObserver.observe(canvas);
      document.addEventListener("visibilitychange", sync);
    };
    let idle = 0;
    const schedule = () => {
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(start, { timeout: 1500 })
        : window.setTimeout(start, 300);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      window.removeEventListener("load", schedule);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      viewObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`opacity-0 transition-opacity  ${className ?? ""}`}
    />
  );
}
