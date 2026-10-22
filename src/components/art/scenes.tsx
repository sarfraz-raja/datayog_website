// Original line illustrations for DATAYOG, drawn on a 480×300 canvas.
// Animation classes (art-pulse, art-flow, …) live in globals.css.
import type { CSSProperties, ReactNode } from "react";

export const C = {
  orange: "#FE852D",
  amber: "#FFB066",
  blue: "#5AA9FF",
  white: "rgba(255,255,255,0.85)",
  dim: "rgba(255,255,255,0.45)",
  line: "rgba(255,255,255,0.14)",
  panel: "#132A4D",
  deep: "#0B1B33",
};

export const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

export function Panel({ x, y, w, h, title }: { x: number; y: number; w: number; h: number; title?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill={C.panel} stroke={C.line} />
      {title && (
        <>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={x + 16 + i * 11} cy={y + 15} r={3} fill={C.line} />
          ))}
          <text x={x + 56} y={y + 19} fontSize={10} fill={C.dim}>
            {title}
          </text>
          <line x1={x} x2={x + w} y1={y + 30} y2={y + 30} stroke={C.line} />
        </>
      )}
    </g>
  );
}

export function Pulse({ cx, cy, r = 10, color = C.orange, at = 0 }: { cx: number; cy: number; r?: number; color?: string; at?: number }) {
  return <circle className="art-pulse" style={delay(at)} cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={2} />;
}

/** A path drawn twice: a faint base line and a moving dashed "signal" on top. */
export function Flow({ d, color = C.orange, at = 0, width = 2 }: { d: string; color?: string; at?: number; width?: number }) {
  return (
    <>
      <path d={d} fill="none" stroke={C.line} strokeWidth={width + 1.5} strokeLinecap="round" />
      <path className="art-flow" style={delay(at)} d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />
    </>
  );
}

export function Bars({ x, base, heights, gap = 18, width = 10 }: { x: number; base: number; heights: number[]; gap?: number; width?: number }) {
  return (
    <>
      {heights.map((h, i) => (
        <rect
          key={i}
          className="art-grow"
          style={delay(i * 0.15)}
          x={x + i * gap}
          y={base - h}
          width={width}
          height={h}
          rx={3}
          fill={i % 2 ? C.blue : C.orange}
        />
      ))}
    </>
  );
}

function Dashboard() {
  const kpis = [
    { label: "Availability", value: "99.4%", color: C.orange },
    { label: "Throughput", value: "8.2 Gb", color: C.blue },
    { label: "Alarms", value: "3", color: C.amber },
  ];
  return (
    <>
      <Panel x={70} y={36} w={340} h={228} title="Unified dashboard" />
      {kpis.map((k, i) => (
        <g key={k.label}>
          <rect x={86 + i * 104} y={78} width={96} height={46} rx={8} fill={C.deep} stroke={C.line} />
          <text x={98 + i * 104} y={95} fontSize={8} fill={C.dim}>
            {k.label}
          </text>
          <text x={98 + i * 104} y={115} fontSize={16} fontWeight={700} fill={k.color}>
            {k.value}
          </text>
        </g>
      ))}
      <rect x={86} y={134} width={200} height={114} rx={8} fill={C.deep} stroke={C.line} />
      <polyline
        className="art-draw"
        points="96,226 124,210 150,216 176,186 202,194 228,164 254,172 278,146"
        fill="none"
        stroke={C.orange}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <polyline points="96,236 124,228 150,230 176,214 202,220 228,204 254,208 278,194" fill="none" stroke={C.blue} strokeOpacity={0.5} strokeWidth={2} />
      <rect x={294} y={134} width={100} height={114} rx={8} fill={C.deep} stroke={C.line} />
      <Bars x={306} base={236} heights={[40, 64, 50, 82, 58]} gap={17} width={9} />
    </>
  );
}

function Ran() {
  const braces = [130, 170, 210];
  return (
    <>
      {[0, 0.8, 1.6].map((at) => (
        <Pulse key={at} cx={240} cy={86} r={44} at={at} />
      ))}
      <line x1={110} x2={370} y1={252} y2={252} stroke={C.line} strokeWidth={2} />
      <g stroke={C.white} strokeWidth={2} strokeLinecap="round">
        <line x1={212} y1={252} x2={234} y2={96} />
        <line x1={268} y1={252} x2={246} y2={96} />
        {braces.map((y) => {
          const left = 212 + ((252 - y) / 156) * 22;
          const right = 268 - ((252 - y) / 156) * 22;
          return <line key={y} x1={left} y1={y} x2={right} y2={y - 26} strokeOpacity={0.5} />;
        })}
      </g>
      <rect x={226} y={92} width={7} height={22} rx={2} fill={C.white} />
      <rect x={247} y={92} width={7} height={22} rx={2} fill={C.white} />
      <rect x={231} y={78} width={18} height={10} rx={3} fill={C.orange} />
      {[
        [126, 214, 30, 38],
        [160, 196, 26, 56],
        [306, 204, 28, 48],
        [340, 222, 32, 30],
      ].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} rx={3} fill={C.panel} stroke={C.line} />
          <rect className="art-blink" style={delay(i * 0.4)} x={x + 8} y={y + 10} width={6} height={6} fill={C.amber} />
        </g>
      ))}
    </>
  );
}

function House({ x, y, at }: { x: number; y: number; at: number }) {
  return (
    <g>
      <path d={`M${x - 14} ${y + 12} V${y - 2} L${x} ${y - 16} L${x + 14} ${y - 2} V${y + 12} Z`} fill={C.panel} stroke={C.amber} strokeWidth={1.5} />
      <rect className="art-blink" style={delay(at)} x={x - 4} y={y} width={8} height={8} fill={C.amber} />
    </g>
  );
}

function Fiber() {
  const inputs = [70, 120, 180, 230];
  const homes = [62, 118, 182, 238];
  return (
    <>
      {inputs.map((y, i) => (
        <Flow key={y} d={`M30 ${y} C 120 ${y}, 130 150, 212 150`} color={i % 2 ? C.blue : C.orange} at={i * 0.3} />
      ))}
      {homes.map((y, i) => (
        <Flow key={y} d={`M252 150 C 320 150, 320 ${y}, 386 ${y}`} color={C.orange} at={0.2 + i * 0.25} />
      ))}
      <rect x={212} y={130} width={40} height={40} rx={10} fill={C.panel} stroke={C.orange} strokeWidth={2} />
      <Pulse cx={232} cy={150} r={16} />
      <text x={232} y={154} fontSize={9} fontWeight={700} fill={C.white} textAnchor="middle">
        1:8
      </text>
      {homes.map((y, i) => (
        <House key={y} x={410} y={y} at={i * 0.35} />
      ))}
    </>
  );
}

function DataCenter() {
  return (
    <>
      <ellipse cx={240} cy={252} rx={180} ry={10} fill={C.blue} opacity={0.08} />
      {[110, 205, 300].map((x, r) => (
        <g key={x}>
          <rect x={x} y={52} width={70} height={196} rx={6} fill={C.panel} stroke={C.line} />
          {Array.from({ length: 8 }, (_, i) => (
            <g key={i}>
              <rect x={x + 8} y={64 + i * 22} width={54} height={15} rx={3} fill={C.deep} stroke={C.line} />
              <circle className="art-blink" style={delay(((r * 8 + i) * 0.37) % 1.6)} cx={x + 16} cy={71.5 + i * 22} r={2.5} fill={(r + i) % 3 ? C.blue : C.orange} />
              <circle cx={x + 24} cy={71.5 + i * 22} r={2.5} fill={C.line} />
              <line x1={x + 34} x2={x + 54} y1={71.5 + i * 22} y2={71.5 + i * 22} stroke={C.line} strokeWidth={3} strokeDasharray="2 2" />
            </g>
          ))}
        </g>
      ))}
    </>
  );
}

function Layers() {
  const ran = [170, 230, 290, 350, 410];
  const transport = [210, 300, 390];
  const core = [255, 345];
  const label = (y: number, text: string) => (
    <text x={40} y={y + 4} fontSize={10} fontWeight={600} letterSpacing={1.5} fill={C.dim}>
      {text}
    </text>
  );
  return (
    <>
      {[75, 150, 225].map((y) => (
        <line key={y} x1={130} x2={440} y1={y} y2={y} stroke={C.line} strokeDasharray="3 6" />
      ))}
      {label(75, "RAN")}
      {label(150, "TRANSPORT")}
      {label(225, "CORE")}
      {ran.map((x, i) => (
        <Flow key={x} d={`M${x} 75 L${transport[Math.min(2, Math.round(i / 2))]} 150`} color={C.blue} at={i * 0.2} width={1.5} />
      ))}
      {transport.map((x, i) => (
        <Flow key={x} d={`M${x} 150 L${core[i < 2 ? 0 : 1]} 225`} at={0.4 + i * 0.2} width={1.5} />
      ))}
      <Flow d="M255 225 L345 225" at={0.6} width={1.5} />
      {ran.map((x) => (
        <circle key={x} cx={x} cy={75} r={7} fill={C.blue} />
      ))}
      {transport.map((x) => (
        <path key={x} d={`M${x} 139 L${x + 11} 150 L${x} 161 L${x - 11} 150 Z`} fill={C.amber} />
      ))}
      {core.map((x, i) => (
        <g key={x}>
          <Pulse cx={x} cy={225} r={14} at={i * 0.9} />
          <circle cx={x} cy={225} r={12} fill={C.orange} />
        </g>
      ))}
    </>
  );
}

function Analytics() {
  const r = 46;
  const circumference = 2 * Math.PI * r;
  return (
    <>
      <Panel x={60} y={36} w={360} h={228} title="Analytics report" />
      <g transform="rotate(-90 140 155)">
        <circle cx={140} cy={155} r={r} fill="none" stroke={C.deep} strokeWidth={16} />
        <circle cx={140} cy={155} r={r} fill="none" stroke={C.orange} strokeWidth={16} strokeDasharray={`${circumference * 0.62} ${circumference}`} />
        <circle
          cx={140}
          cy={155}
          r={r}
          fill="none"
          stroke={C.blue}
          strokeWidth={16}
          strokeDasharray={`${circumference * 0.22} ${circumference}`}
          strokeDashoffset={-circumference * 0.62}
        />
      </g>
      <text x={140} y={160} fontSize={16} fontWeight={700} fill={C.white} textAnchor="middle">
        84%
      </text>
      <Bars x={226} base={240} heights={[50, 80, 62, 104, 76, 120, 92]} gap={24} width={14} />
      <polyline className="art-draw" points="233,180 257,160 281,172 305,130 329,148 353,108 377,124" fill="none" stroke={C.amber} strokeWidth={2.5} strokeLinejoin="round" />
    </>
  );
}

function Globe() {
  const nodes: [number, number][] = [
    [180, 110],
    [300, 96],
    [330, 180],
    [210, 200],
    [256, 146],
  ];
  return (
    <>
      <circle cx={240} cy={150} r={108} fill="#0E2140" stroke={C.line} strokeWidth={1.5} />
      <g fill="none" stroke={C.line}>
        <ellipse cx={240} cy={150} rx={36} ry={108} />
        <ellipse cx={240} cy={150} rx={72} ry={108} />
        <ellipse cx={240} cy={150} rx={108} ry={36} />
        <ellipse cx={240} cy={150} rx={108} ry={72} />
      </g>
      <Flow d="M180 110 Q 240 50 300 96" at={0} />
      <Flow d="M300 96 Q 350 130 330 180" color={C.blue} at={0.3} />
      <Flow d="M330 180 Q 270 240 210 200" at={0.6} />
      <Flow d="M210 200 Q 170 160 180 110" color={C.blue} at={0.9} />
      <Flow d="M256 146 L300 96" color={C.amber} at={0.4} width={1.5} />
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <Pulse cx={x} cy={y} r={8} at={i * 0.5} />
          <circle cx={x} cy={y} r={5} fill={i === 4 ? C.orange : C.amber} />
        </g>
      ))}
    </>
  );
}

function NeuralNet() {
  const layers = [
    { x: 110, ys: [80, 130, 180, 230] },
    { x: 200, ys: [60, 105, 150, 195, 240] },
    { x: 290, ys: [60, 105, 150, 195, 240] },
  ];
  const out = { x: 385, y: 150 };
  const links: string[] = [];
  for (let l = 0; l < layers.length - 1; l++)
    for (const a of layers[l].ys) for (const b of layers[l + 1].ys) links.push(`M${layers[l].x} ${a} L${layers[l + 1].x} ${b}`);
  return (
    <>
      <g stroke={C.line}>
        {links.map((d) => (
          <path key={d} d={d} />
        ))}
        {layers[2].ys.map((y) => (
          <path key={y} d={`M290 ${y} L${out.x} ${out.y}`} />
        ))}
      </g>
      <Flow d="M110 130 L200 105 L290 150 L385 150" at={0} width={2} />
      <Flow d="M110 180 L200 195 L290 150" color={C.blue} at={0.5} width={2} />
      {layers.map((layer) =>
        layer.ys.map((y) => <circle key={`${layer.x}-${y}`} cx={layer.x} cy={y} r={7} fill={C.panel} stroke={C.blue} strokeWidth={2} />),
      )}
      <Pulse cx={out.x} cy={out.y} r={16} />
      <circle cx={out.x} cy={out.y} r={14} fill={C.orange} />
      <rect x={336} y={90} width={98} height={24} rx={12} fill={C.orange} />
      <text x={385} y={106} fontSize={10} fontWeight={700} fill={C.deep} textAnchor="middle">
        Root cause
      </text>
    </>
  );
}

function Cloud() {
  const dbs = [160, 240, 320];
  return (
    <>
      {dbs.map((x, i) => (
        <g key={x}>
          <Flow d={`M${x} 148 V202`} color={i === 1 ? C.blue : C.orange} at={i * 0.3} />
        </g>
      ))}
      <path
        d="M168 148 H316 A40 40 0 0 0 308 70 A58 58 0 0 0 196 76 A38 38 0 0 0 168 148 Z"
        fill={C.panel}
        stroke={C.blue}
        strokeWidth={2}
      />
      <path className="art-pulse-soft" d="M168 148 H316 A40 40 0 0 0 308 70 A58 58 0 0 0 196 76 A38 38 0 0 0 168 148 Z" fill="none" stroke={C.orange} strokeWidth={2} />
      {dbs.map((x) => (
        <g key={x} fill={C.panel} stroke={C.amber} strokeWidth={1.5}>
          <path d={`M${x - 24} 212 V246 A24 7 0 0 0 ${x + 24} 246 V212`} />
          <ellipse cx={x} cy={212} rx={24} ry={7} />
          <path d={`M${x - 24} 229 A24 7 0 0 0 ${x + 24} 229`} fill="none" />
        </g>
      ))}
    </>
  );
}

function Code() {
  const lines: [number, number, string][] = [
    [0, 90, C.orange],
    [1, 140, C.blue],
    [1, 110, C.dim],
    [2, 120, C.amber],
    [2, 80, C.blue],
    [1, 150, C.dim],
    [0, 70, C.orange],
  ];
  return (
    <>
      <Panel x={80} y={46} w={320} h={208} title="site_integration.py" />
      {lines.map(([indent, w, color], i) => (
        <g key={i}>
          <text x={98} y={98 + i * 20} fontSize={8} fill={C.line} textAnchor="end">
            {i + 1}
          </text>
          <rect className="art-type" style={delay(i * 0.35)} x={110 + indent * 18} y={92 + i * 20} width={w} height={7} rx={3.5} fill={color} />
        </g>
      ))}
      <rect className="art-blink" x={110 + 70 + 6} y={90 + 6 * 20} width={7} height={11} fill={C.white} />
      <rect x={300} y={204} width={84} height={34} rx={8} fill={C.deep} stroke={C.orange} />
      <text x={342} y={225} fontSize={9} fontWeight={700} fill={C.orange} textAnchor="middle">
        ✓ Deployed
      </text>
    </>
  );
}

function Blueprint() {
  return (
    <>
      <g stroke={C.line} strokeWidth={12} strokeLinecap="square">
        <line x1={30} x2={450} y1={110} y2={110} />
        <line x1={30} x2={450} y1={205} y2={205} />
        <line x1={150} x2={150} y1={30} y2={270} />
        <line x1={320} x2={320} y1={30} y2={270} />
      </g>
      {[
        [40, 40, 96, 56],
        [164, 40, 142, 56],
        [334, 124, 106, 68],
        [40, 124, 96, 68],
        [164, 219, 142, 44],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx={4} fill="none" stroke={C.line} strokeDasharray="4 4" />
      ))}
      <Flow d="M40 110 H150 V205 H320 V110 H440" width={3} />
      {[
        [150, 110],
        [150, 205],
        [320, 205],
        [320, 110],
      ].map(([x, y], i) => (
        <g key={i}>
          <Pulse cx={x} cy={y} r={7} at={i * 0.4} />
          <circle cx={x} cy={y} r={6} fill={C.amber} />
        </g>
      ))}
      <rect x={350} y={232} width={92} height={28} rx={6} fill={C.panel} stroke={C.orange} />
      <text x={396} y={250} fontSize={10} fontWeight={700} fill={C.orange} textAnchor="middle">
        HLD · Route A
      </text>
    </>
  );
}

function Pin({ x, y, at }: { x: number; y: number; at: number }) {
  return (
    <g>
      <ellipse cx={x} cy={y + 2} rx={10} ry={3} fill={C.orange} opacity={0.3} />
      <Pulse cx={x} cy={y} r={10} at={at} />
      <g className="art-bob" style={delay(at)}>
        <path d={`M${x} ${y} C ${x - 4} ${y - 10}, ${x - 14} ${y - 18}, ${x - 14} ${y - 28} A14 14 0 0 1 ${x + 14} ${y - 28} C ${x + 14} ${y - 18}, ${x + 4} ${y - 10}, ${x} ${y} Z`} fill={C.orange} />
        <circle cx={x} cy={y - 28} r={5} fill={C.deep} />
      </g>
    </g>
  );
}

function Survey() {
  return (
    <>
      <path d="M40 240 C 120 200, 140 120, 220 130 S 360 60, 440 80" fill="none" stroke={C.line} strokeWidth={14} strokeLinecap="round" />
      <path d="M60 60 L180 260" stroke={C.line} strokeWidth={8} />
      <path d="M300 280 L420 150" stroke={C.line} strokeWidth={8} />
      <Flow d="M110 205 C 150 170, 170 132, 220 130 S 330 90, 370 82" color={C.amber} width={2} />
      <Pin x={110} y={205} at={0} />
      <Pin x={220} y={130} at={0.5} />
      <Pin x={370} y={82} at={1} />
      <rect x={60} y={40} width={112} height={44} rx={8} fill={C.panel} stroke={C.line} />
      <text x={74} y={58} fontSize={8} fill={C.dim}>
        Poles surveyed
      </text>
      <text x={74} y={75} fontSize={13} fontWeight={700} fill={C.orange}>
        128 / 140
      </text>
    </>
  );
}

function Lld() {
  return (
    <>
      {[105, 150, 195].map((y, i) => (
        <Flow key={y} d={`M30 ${y} H150`} color={[C.orange, C.blue, C.amber][i]} at={i * 0.3} />
      ))}
      <rect x={150} y={70} width={180} height={160} rx={14} fill={C.panel} stroke={C.amber} strokeWidth={2} />
      {Array.from({ length: 8 }, (_, i) => {
        const x = 188 + (i % 4) * 35;
        const y = 120 + Math.floor(i / 4) * 60;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={11} fill={C.deep} stroke={C.line} strokeWidth={2} />
            <circle className="art-blink" style={delay(i * 0.2)} cx={x} cy={y} r={4} fill={i % 3 ? C.blue : C.orange} />
          </g>
        );
      })}
      <g stroke={C.dim} strokeWidth={1}>
        <line x1={150} x2={330} y1={250} y2={250} />
        <line x1={150} x2={150} y1={244} y2={256} />
        <line x1={330} x2={330} y1={244} y2={256} />
        <line x1={350} x2={350} y1={70} y2={230} />
        <line x1={344} x2={356} y1={70} y2={70} />
        <line x1={344} x2={356} y1={230} y2={230} />
      </g>
      <text x={240} y={268} fontSize={9} fill={C.dim} textAnchor="middle">
        Splice closure · 1×8
      </text>
      <Flow d="M330 150 H450" at={0.5} width={2} />
    </>
  );
}

function Quality() {
  return (
    <>
      <Panel x={110} y={44} w={230} h={212} title="Acceptance checklist" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={130} y={92 + i * 38} width={20} height={20} rx={5} fill={C.deep} stroke={C.line} />
          <path className="art-check" style={delay(i * 0.5)} d={`M134 ${102 + i * 38} l5 5 l8 -10`} fill="none" stroke={C.orange} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
          <rect x={162} y={96 + i * 38} width={[120, 96, 132, 88][i]} height={6} rx={3} fill={C.dim} />
          <rect x={162} y={106 + i * 38} width={[70, 90, 60, 80][i]} height={4} rx={2} fill={C.line} />
        </g>
      ))}
      <g className="art-bob">
        <path d="M372 150 L410 164 V196 C 410 222, 392 238, 372 246 C 352 238, 334 222, 334 196 V164 Z" fill={C.orange} />
        <path d="M356 196 l11 11 l20 -24" fill="none" stroke={C.deep} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  );
}

function Avatar({ x, y, r = 24, accent = false }: { x: number; y: number; r?: number; accent?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={C.panel} stroke={accent ? C.orange : C.blue} strokeWidth={2} />
      <circle cx={x} cy={y - r * 0.22} r={r * 0.3} fill={accent ? C.orange : C.white} />
      <path d={`M${x - r * 0.5} ${y + r * 0.55} A ${r * 0.5} ${r * 0.42} 0 0 1 ${x + r * 0.5} ${y + r * 0.55}`} fill={accent ? C.orange : C.white} />
    </g>
  );
}

function Team() {
  const around: [number, number][] = [
    [120, 84],
    [360, 84],
    [100, 214],
    [380, 214],
    [240, 262],
  ];
  return (
    <>
      {around.map(([x, y], i) => (
        <Flow key={i} d={`M240 150 L${x} ${y}`} color={i % 2 ? C.blue : C.orange} at={i * 0.3} />
      ))}
      <Pulse cx={240} cy={150} r={38} />
      <Avatar x={240} y={150} r={36} accent />
      {around.map(([x, y], i) => (
        <Avatar key={i} x={x} y={y} />
      ))}
    </>
  );
}

export const scenes = {
  dashboard: Dashboard,
  ran: Ran,
  fiber: Fiber,
  datacenter: DataCenter,
  layers: Layers,
  analytics: Analytics,
  globe: Globe,
  ai: NeuralNet,
  cloud: Cloud,
  code: Code,
  blueprint: Blueprint,
  survey: Survey,
  lld: Lld,
  quality: Quality,
  team: Team,
} satisfies Record<string, () => ReactNode>;

export type ArtName = keyof typeof scenes;
