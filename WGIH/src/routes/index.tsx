import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Satellite,
  Building2,
  ShoppingCart,
  GraduationCap,
  Handshake,
  Globe2,
  Star,
  Radio,
  Trophy,
  Megaphone,
  CalendarDays,
  Camera,
  Play,
  type LucideIcon,
} from "lucide-react";
import {
  getHeroSlides,
  getCoreServices,
  getPulseNews,
  getFeaturedEvent,
  getLatestEvents,
  getGalleryItems,
  getFeaturedBrands,
  getStats,
} from "@/services/api";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WGIH — World Geospatial Information Home" },
      {
        name: "description",
        content:
          "Connect the World · Empower the Future. Geospatial solutions, global business, training and partnerships.",
      },
      { property: "og:title", content: "WGIH — World Geospatial Information Home" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

const serviceIcons: Record<string, LucideIcon> = {
  Satellite,
  Building2,
  ShoppingCart,
  GraduationCap,
  Handshake,
  Globe2,
};

/** Render a headline with its highlighted substring wrapped in <span>. */
function Headline({ title, highlight }: { title: string; highlight: string }) {
  const idx = title.indexOf(highlight);
  if (idx === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, idx)}
      <span>{highlight}</span>
      {title.slice(idx + highlight.length)}
    </>
  );
}

function Home() {
  const slides = getHeroSlides();
  const services = getCoreServices();
  const pulse = getPulseNews();
  const featuredEvent = getFeaturedEvent();
  const events = getLatestEvents();
  const gallery = getGalleryItems();
  const brands = getFeaturedBrands();
  const stats = getStats();

  const [slide, setSlide] = useState(0);
  const [brand, setBrand] = useState(0);

  const current = slides[slide % slides.length]!;
  const summitEvent = events[0] ?? featuredEvent;

  return (
    <main className="portal-home">
      <div className="portal-top-grid">
        <section
          className="portal-hero"
          style={{
            backgroundImage: `linear-gradient(90deg,rgba(0,19,61,.65),transparent),url(${current.image})`,
          }}
          aria-label="Featured solutions"
        >
          <Satellite className="portal-hero-satellite" strokeWidth={1} />
          <div className="portal-hero-copy">
            <h1>
              <Headline title={current.title} highlight={current.highlight} />
            </h1>
            <p>{current.subtitle}</p>
            <Link to={current.ctaTo} className="portal-button yellow">
              {current.ctaLabel} <ArrowRight />
            </Link>
          </div>
          <button
            className="portal-slide-arrow previous"
            aria-label="Previous slide"
            onClick={() => setSlide((slide + slides.length - 1) % slides.length)}
          >
            <ChevronLeft />
          </button>
          <div className="portal-slide-dots">
            {slides.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Show slide ${i + 1}`}
                aria-pressed={slide === i}
                className={slide === i ? "active" : ""}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
          <button
            className="portal-slide-arrow next"
            aria-label="Next slide"
            onClick={() => setSlide((slide + 1) % slides.length)}
          >
            <ChevronRight />
          </button>
        </section>
        <aside className="portal-pulse portal-panel">
          <div className="portal-panel-heading">
            <h2>
              <Radio className="pulse-icon" /> Pulse News Today
            </h2>
            <Link to="/news" className="portal-more-chip">
              More <ArrowRight />
            </Link>
          </div>
          <div className="portal-news-list">
            {pulse.map((item) => (
              <Link
                to="/news/$slug"
                params={{ slug: item.slug }}
                className="portal-news-item"
                key={item.id}
              >
                <img src={item.image} alt="" />
                <time>{item.date}</time>
                <span>{item.title}</span>
                <ChevronRight />
              </Link>
            ))}
          </div>
          <Link
            to={featuredEvent.to}
            className="portal-summit"
            style={{
              backgroundImage: `linear-gradient(90deg,#063689,transparent),url(${featuredEvent.image})`,
            }}
          >
            <span>
              <strong>{featuredEvent.title}</strong>
              <small>
                {featuredEvent.location} · {featuredEvent.dateRange}
              </small>
            </span>
            <ChevronRight />
          </Link>
        </aside>
      </div>

      <section className="portal-services portal-panel">
        <div className="portal-panel-heading">
          <h2 className="portal-ribbon">
            <Star /> Our Core Services
          </h2>
          <Link to="/solutions">
            Discover More <ArrowRight />
          </Link>
        </div>
        <div className="portal-service-grid">
          {services.map((svc) => {
            const Icon = serviceIcons[svc.icon] ?? Satellite;
            return (
              <div className="portal-service" key={svc.id}>
                <div className="portal-service-art" style={{ color: svc.color }}>
                  <Icon strokeWidth={1.5} />
                </div>
                <h3>{svc.title}</h3>
                <p>{svc.tagline}</p>
                <Link className="portal-button" to={svc.to}>
                  {svc.buttonLabel} <ArrowRight />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <div className="portal-promo-grid">
        <section className="portal-network portal-promo">
          <h2>
            <Globe2 /> Our Global Network <small>全球网络</small>
          </h2>
          <div className="portal-world-map" aria-hidden="true">
            <svg viewBox="0 0 600 190">
              <defs>
                <pattern id="map-dots" width="6" height="6" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="2" fill="#38c6ff" />
                </pattern>
              </defs>
              <path
                d="M20 32L65 13 124 21 151 49 128 72 104 82 100 112 81 106 64 73 35 68ZM111 107L142 111 159 131 148 162 130 185 121 157 115 137ZM209 32L238 18 262 24 270 39 250 51 255 67 231 75 217 57ZM236 77L276 70 301 96 289 135 265 162 244 132 232 101ZM272 32L318 13 381 23 416 15 469 35 514 52 551 78 509 96 476 82 457 107 425 98 417 128 391 103 365 88 346 108 327 91 299 71 274 63ZM457 139L498 128 525 148 515 170 478 175 456 158ZM158 8L190 0 197 28 177 47 158 32Z"
                fill="url(#map-dots)"
              />
              <g stroke="#70dcff" fill="none" opacity=".8">
                <path d="M75 50Q300 -15 455 66M75 50Q200 180 270 100M270 100Q370 0 455 66M455 66Q500 99 492 151M145 131Q300 12 455 66" />
              </g>
              <g fill="#ffdf41">
                <circle cx="75" cy="50" r="4" />
                <circle cx="270" cy="100" r="4" />
                <circle cx="455" cy="66" r="5" />
                <circle cx="492" cy="151" r="4" />
                <circle cx="145" cy="131" r="4" />
              </g>
            </svg>
          </div>
          <p>
            {stats[0]?.value}
            {stats[0]?.suffix} {stats[0]?.label} <span>|</span> Worldwide Cooperation
          </p>
          <Link to="/representatives" className="portal-button yellow">
            View Map <ArrowRight />
          </Link>
          <ChevronRight className="promo-edge" />
        </section>
        <section className="portal-companies portal-promo">
          <div className="portal-promo-heading">
            <h2>
              <Trophy /> Featured Chinese Companies
            </h2>
            <span className="portal-badge">Premium</span>
          </div>
          <div className="portal-company-logos">
            <button
              className="logo-arrow left"
              aria-label="Previous companies"
              onClick={() => setBrand((brand + brands.length - 1) % brands.length)}
            >
              <ChevronLeft />
            </button>
            {Array.from(
              { length: Math.min(4, brands.length) },
              (_, i) => brands[(i + brand) % brands.length]!,
            ).map((b) => (
              <Link to={b.to} className="company-logo" key={b.id} style={{ color: b.color }}>
                <span>{b.name}</span>
              </Link>
            ))}
            <button
              className="logo-arrow right"
              aria-label="Next companies"
              onClick={() => setBrand((brand + 1) % brands.length)}
            >
              <ChevronRight />
            </button>
          </div>
          <p>Leading Technology, Global Opportunities</p>
        </section>
        <section
          className="portal-training portal-promo"
          style={{
            backgroundImage: `linear-gradient(0deg,rgba(25,6,70,.9),transparent 70%),url(${gallery[3]?.image ?? gallery[0]?.image})`,
          }}
        >
          <div className="portal-promo-heading">
            <h2>
              <Megaphone /> International Training
            </h2>
            <span className="portal-badge">
              Funded Programs
              <br />
              Available
            </span>
          </div>
          <div className="portal-training-bottom">
            <p>Join Global Training &amp; Conferences</p>
            <Link to="/training" className="portal-button yellow">
              View Programs <ArrowRight />
            </Link>
          </div>
        </section>
      </div>

      <div className="portal-bottom-grid">
        <section className="portal-panel portal-events">
          <div className="portal-panel-heading">
            <h2>
              <CalendarDays /> Latest Events
            </h2>
            <Link to="/news">
              More Events <ArrowRight />
            </Link>
          </div>
          <Link to={summitEvent.to} className="portal-event">
            <img src={summitEvent.image} alt={summitEvent.title} />
            <time>
              {"monthYear" in summitEvent ? (
                <>
                  {summitEvent.monthYear.split(" ")[0]}
                  <br />
                  <strong>{summitEvent.day}</strong>
                  <br />
                  {summitEvent.monthYear.split(" ")[1]}
                </>
              ) : (
                <strong>Soon</strong>
              )}
            </time>
            <span>
              <strong>{summitEvent.title}</strong>
              <small>{summitEvent.location}</small>
            </span>
          </Link>
        </section>
        <section className="portal-panel portal-gallery">
          <div className="portal-panel-heading">
            <h2>
              <Camera /> Multimedia Gallery
            </h2>
            <Link to="/news">
              More Photos <ArrowRight />
            </Link>
          </div>
          <div className="portal-gallery-images">
            {gallery.map((g, i) => (
              <Link
                to="/news"
                key={g.id}
                aria-label={
                  g.type === "video" ? `View video: ${g.title}` : `View photo: ${g.title}`
                }
              >
                <img src={g.image} alt={g.title} />
                {g.type === "video" && <Play />}
              </Link>
            ))}
          </div>
        </section>
        <section className="portal-panel portal-partners">
          <div className="portal-panel-heading">
            <h2>
              <Handshake /> Our Partners
            </h2>
            <Link to="/partners">
              View All <ArrowRight />
            </Link>
          </div>
          <div className="portal-partner-logos">
            {stats.slice(1).map((s) => (
              <Link to="/partners" key={s.label} className="partner-stat">
                <strong>
                  {s.value}
                  {s.suffix}
                </strong>
                <small>{s.label}</small>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
