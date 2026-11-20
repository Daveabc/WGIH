import { useState } from "react";

/** Multi-photo gallery for news articles and products. */
export function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  if (!images.length) return null;

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-border bg-muted">
        <img
          src={images[active]}
          alt={`${alt} — image ${active + 1}`}
          className="aspect-[16/10] w-full object-cover"
          loading="lazy"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === active}
              className={`overflow-hidden rounded-lg border-2 transition ${i === active ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}
            >
              <img src={src} alt="" className="h-16 w-20 object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
