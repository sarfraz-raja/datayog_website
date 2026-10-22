import type { CSSProperties } from "react";
import { Art } from "./art";
import { Bars, C, Flow } from "./scenes";

// The dashboard is drawn on a 520×520 canvas. The static drawing is a generated
// SVG file; the motion is a thin HTML layer on top that only animates transform
// and opacity, so it runs on the GPU and costs the main thread nothing.
const SIZE = 520;
const pct = (v: number) => `${(v / SIZE) * 100}%`;

// Illustrative network map: node positions and the links between them.
const nodes: [number, number][] = [
  [70, 130],
  [150, 100],
  [240, 120],
  [110, 200],
  [200, 190],
  [290, 210],
  [160, 270],
  [260, 280],
];
const links: [number, number][] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 4],
  [2, 5],
  [3, 4],
  [4, 5],
  [3, 6],
  [4, 7],
  [6, 7],
  [5, 7],
];
const ALERT = 4; // the node the "AI RCA" toast points at
const LIVE_DOT: [number, number] = [446, 34];

// Links that carry a moving data packet: [link index, duration s, delay s].
const packets: [number, number, number][] = [
  [0, 2.6, 0],
  [1, 2.2, 0.8],
  [3, 2.4, 0.4],
  [5, 2.8, 1.4],
  [6, 2.2, 0.2],
  [8, 2.6, 1.1],
  [10, 3, 0.6],
];

const kpis = [
  { label: "Cell availability", value: "99.4%", color: C.orange, spark: [14, 20, 17, 24, 22, 28] },
  { label: "Throughput", value: "8.2 Gbps", color: C.blue, spark: [10, 16, 22, 18, 26, 30] },
  { label: "Active alarms", value: "3", color: C.amber, spark: [24, 18, 20, 12, 10, 8] },
];

/** Static drawing of the DataPlus dashboard, rendered to /art/hero-dashboard.svg. */
export function HeroDashboardScene() {
  return (
    <>
      {/* Window chrome */}
      <rect x={8} y={8} width={504} height={504} rx={22} fill="#0E2140" stroke={C.line} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={34 + i * 14} cy={34} r={4} fill={C.line} />
      ))}
      <text x={86} y={38} fontSize={12} fontWeight={600} fill={C.white}>
        DataPlus
      </text>
      <text x={146} y={38} fontSize={12} fill={C.dim}>
        · Network overview
      </text>
      <rect x={430} y={22} width={62} height={24} rx={12} fill="rgba(254,133,45,0.15)" stroke={C.orange} />
      <text x={456} y={38} fontSize={10} fontWeight={700} fill={C.orange}>
        LIVE
      </text>
      <line x1={8} x2={512} y1={58} y2={58} stroke={C.line} />

      {/* Network map */}
      <rect x={26} y={74} width={304} height={250} rx={14} fill={C.deep} stroke={C.line} />
      <text x={42} y={96} fontSize={10} fill={C.dim}>
        Multi-vendor network map
      </text>
      {links.map(([a, b], i) => (
        <Flow
          key={i}
          d={`M${nodes[a][0]} ${nodes[a][1]} L${nodes[b][0]} ${nodes[b][1]}`}
          color={i % 3 ? C.blue : C.orange}
          width={1.6}
        />
      ))}
      {nodes.map(([x, y], i) =>
        i === ALERT ? (
          <circle key={i} cx={x} cy={y} r={9} fill={C.orange} />
        ) : (
          <circle key={i} cx={x} cy={y} r={6} fill={C.panel} stroke={C.blue} strokeWidth={2} />
        ),
      )}

      {/* KPI tiles */}
      {kpis.map((k, i) => {
        const y = 74 + i * 86;
        return (
          <g key={k.label}>
            <rect x={346} y={y} width={148} height={74} rx={12} fill={C.deep} stroke={C.line} />
            <text x={360} y={y + 22} fontSize={10} fill={C.dim}>
              {k.label}
            </text>
            <text x={360} y={y + 50} fontSize={20} fontWeight={700} fill={k.color}>
              {k.value}
            </text>
            <Bars x={452} base={y + 60} heights={k.spark.map((h) => h * 0.9)} gap={6} width={4} />
          </g>
        );
      })}

      {/* Throughput chart */}
      <rect x={26} y={340} width={468} height={154} rx={14} fill={C.deep} stroke={C.line} />
      <text x={42} y={362} fontSize={10} fill={C.dim}>
        Throughput · last 24h
      </text>
      {[400, 430, 460].map((y) => (
        <line key={y} x1={42} x2={478} y1={y} y2={y} stroke={C.line} strokeDasharray="3 6" />
      ))}
      <path
        d="M42 470 L90 452 L138 460 L186 428 L234 438 L282 404 L330 414 L378 386 L426 396 L478 372 L478 482 L42 482 Z"
        fill={C.orange}
        opacity={0.1}
      />
      <polyline
        points="42,470 90,452 138,460 186,428 234,438 282,404 330,414 378,386 426,396 478,372"
        fill="none"
        stroke={C.orange}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <polyline
        points="42,478 90,470 138,474 186,458 234,462 282,446 330,452 378,436 426,442 478,428"
        fill="none"
        stroke={C.blue}
        strokeOpacity={0.6}
        strokeWidth={2}
      />
    </>
  );
}

/** Home hero visual: the static dashboard image plus its GPU-friendly motion layer. */
export function HeroDashboard() {
  const [ax, ay] = nodes[ALERT];
  return (
    <div className="hero-dash absolute inset-0">
      <Art
        name="hero-dashboard"
        label="DataPlus dashboard showing a live network map, KPIs and AI root cause analysis"
        priority
        className="rounded-3xl"
      />
      <div aria-hidden="true" className="absolute inset-0">
        <span className="hero-blink absolute size-[1.6cqw] -translate-1/2 rounded-full bg-brand-500" style={{ left: pct(LIVE_DOT[0]), top: pct(LIVE_DOT[1]) }} />

        {packets.map(([link, duration, wait]) => {
          const [a, b] = links[link];
          const [x1, y1] = nodes[a];
          const [x2, y2] = nodes[b];
          return (
            <span
              key={link}
              className="hero-packet absolute size-[1.4cqw] -translate-1/2 rounded-full bg-brand-500 shadow-[0_0_10px_2px_rgba(254,133,45,0.8)]"
              style={
                {
                  left: pct(x1),
                  top: pct(y1),
                  "--dx": `${((x2 - x1) / SIZE) * 100}cqw`,
                  "--dy": `${((y2 - y1) / SIZE) * 100}cqw`,
                  animationDuration: `${duration}s`,
                  animationDelay: `${wait}s`,
                } as CSSProperties
              }
            />
          );
        })}

        {[0, 1.2].map((wait) => (
          <span
            key={wait}
            className="hero-ping absolute size-[6cqw] -translate-1/2 rounded-full border-2 border-brand-500"
            style={{ left: pct(ax), top: pct(ay), animationDelay: `${wait}s` }}
          />
        ))}

        <div
          className="hero-toast absolute flex items-center gap-[2cqw] rounded-[2.4cqw] bg-white px-[2.6cqw] py-[1.8cqw] shadow-xl"
          style={{ left: pct(150), top: pct(246), width: pct(250) }}
        >
          <span className="flex size-[5.4cqw] shrink-0 items-center justify-center rounded-full bg-brand-500 text-[2.6cqw] font-extrabold text-navy-950">
            !
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block text-[2.2cqw] font-bold text-navy-900">AI RCA · Root cause identified</span>
            <span className="block text-[1.9cqw] text-slate-600">Sector 21 · VSWR alarm on RRU-2</span>
          </span>
        </div>
      </div>
    </div>
  );
}
