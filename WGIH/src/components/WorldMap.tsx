import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { countries, type Representative } from "@/data/mock";

/** Stylized interactive world map with a clickable pin per WGIH office. */
export function WorldMap({ reps }: { reps: Representative[] }) {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border bg-primary-dark">
      <svg
        viewBox="0 0 100 60"
        className="block w-full"
        role="img"
        aria-label="World map of WGIH offices"
      >
        {/* soft dotted ocean */}
        <defs>
          <pattern id="dots" width="2.2" height="2.2" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.35" fill="rgba(255,255,255,0.08)" />
          </pattern>
        </defs>
        <rect width="100" height="60" fill="url(#dots)" />
        {/* rough continent blobs (decorative, not geographically precise) */}
        <g fill="rgba(255,255,255,0.12)">
          <path d="M14,16 Q22,10 30,16 L31,28 Q24,36 16,30 Z" /> {/* N America */}
          <path d="M28,38 Q34,34 36,42 L33,54 Q28,56 27,48 Z" /> {/* S America */}
          <path d="M45,16 Q52,12 55,18 L54,24 Q49,26 46,22 Z" /> {/* Europe */}
          <path d="M48,26 Q58,24 60,34 L56,50 Q50,54 48,44 Z" /> {/* Africa */}
          <path d="M60,16 Q76,10 88,18 L86,34 Q74,38 62,32 Z" /> {/* Asia */}
          <path d="M78,50 Q85,46 90,52 L87,58 Q81,60 78,56 Z" /> {/* Oceania */}
        </g>
      </svg>

      {reps.map((r) => {
        const c = countries.find((x) => x.code === r.countryCode);
        return (
          <div
            key={r.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${r.map.x}%`, top: `${r.map.y}%` }}
            onMouseEnter={() => setHover(r.id)}
            onMouseLeave={() => setHover(null)}
          >
            <Link
              to="/representatives/$id"
              params={{ id: r.id }}
              aria-label={`${r.city} office — ${r.name}`}
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full border border-white bg-accent" />
              </span>
            </Link>
            {hover === r.id && (
              <div className="pointer-events-none absolute left-1/2 top-4 z-10 w-max -translate-x-1/2 rounded-lg bg-background px-2.5 py-1.5 text-xs shadow-lg">
                <span className="font-semibold">
                  {c?.flag} {c?.name}
                </span>
                <span className="block text-muted-foreground">
                  {r.city} · {r.name}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
