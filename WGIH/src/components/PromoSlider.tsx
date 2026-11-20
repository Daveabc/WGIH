import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Megaphone, ChevronLeft, ChevronRight } from "lucide-react";
import { getSponsors } from "@/services/api";
import { LogoTile } from "@/components/LogoTile";
import type { Sponsor } from "@/data/mock";

/** Rotating promotional slider for paid Chinese-company advertising placements. */
export function PromoSlider() {
  const [items, setItems] = useState<Sponsor[]>([]);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    getSponsors().then(setItems);
  }, []);

  useEffect(() => {
    if (items.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 4000);
    return () => clearInterval(t);
  }, [items.length]);

  const s = items[idx];
  if (!items.length || !s) return null;
  const go = (d: number) => setIdx((i) => (i + d + items.length) % items.length);

  return (
    <div className="card-soft overflow-hidden">
      <div className="flex items-center justify-between bg-primary px-3 py-1.5 text-primary-foreground">
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide">
          <Megaphone className="h-3.5 w-3.5" /> Sponsored
        </span>
        <span className="text-[10px] opacity-80">Advertise with WGIH</span>
      </div>

      <Link to={s.link} className="block p-4" aria-label={`Sponsor: ${s.name}`}>
        <div className="flex items-center gap-3">
          <LogoTile name={s.name} color={s.color} size={52} />
          <div className="min-w-0">
            <p className="truncate font-bold">{s.name}</p>
            {s.nameZh && <p className="truncate text-xs text-muted-foreground">{s.nameZh}</p>}
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{s.tagline}</p>
        <span className="mt-2 inline-block rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary">
          {s.category}
        </span>
      </Link>

      <div className="flex items-center justify-between border-t border-border px-3 py-2">
        <button
          onClick={() => go(-1)}
          aria-label="Previous sponsor"
          className="rounded-md p-1 hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-1.5" role="tablist" aria-label="Sponsor slides">
          {items.map((it, i) => (
            <button
              key={it.id}
              onClick={() => setIdx(i)}
              aria-label={`Show ${it.name}`}
              aria-selected={i === idx}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-5 bg-primary" : "w-1.5 bg-border"}`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label="Next sponsor"
          className="rounded-md p-1 hover:bg-muted"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
