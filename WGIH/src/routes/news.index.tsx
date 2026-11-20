import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Search,
  Star,
  Newspaper,
  Globe2,
  Cpu,
  Briefcase,
  CalendarDays,
  CalendarCheck,
  Image as ImageIcon,
  Video,
  FileText,
  Play,
  Clock,
  MapPin,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getNews } from "@/services/api";
import { ArticleCard } from "@/components/Cards";
import { ScrollReveal } from "@/components/ScrollReveal";
import { countries, latestEvents, galleryItems, type Article } from "@/data/mock";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News & Events — WGIH" },
      {
        name: "description",
        content:
          "WGIH's international newsroom: featured news, country office updates, technology and business news, upcoming and completed events, photo and video galleries.",
      },
      { property: "og:title", content: "News & Events — WGIH" },
      { property: "og:description", content: "The WGIH international newsroom." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: News,
});

const PAGE_SIZE = 6;

function News() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [list, setList] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getNews({ q }).then((n) => {
      setList(n);
      setPage(1);
      setLoading(false);
    });
  }, [q]);

  const featured = list.find((a) => a.featured) ?? list[0];
  const rest = list.filter((a) => a.id !== featured?.id);

  const countryUpdates = rest.filter((a) => a.countryCode);
  const technology = rest.filter((a) =>
    ["Remote Sensing", "GNSS", "Drones", "GIS"].includes(a.category),
  );
  const business = rest.filter((a) => ["Industry", "Events"].includes(a.category));

  const paged = rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pages = Math.ceil(rest.length / PAGE_SIZE);

  const upcomingEvents = latestEvents.filter((e) => !e.completed);
  const completedEvents = latestEvents.filter((e) => e.completed);

  return (
    <main>
      {/* Hero */}
      <section className="bg-primary-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
            <Newspaper className="h-4 w-4" /> The WGIH Newsroom
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">News &amp; Events</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Daily coverage of the geospatial industry — from country office updates to technology
            breakthroughs, business news, and international events.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Featured news */}
        {!loading && featured && (
          <ScrollReveal>
            <Link
              to="/news/$slug"
              params={{ slug: featured.slug }}
              className="group grid overflow-hidden rounded-2xl border border-border md:grid-cols-2"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted md:aspect-auto">
                <img
                  src={featured.image}
                  alt=""
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                  <Star className="h-3 w-3" /> Featured
                </span>
                <h2 className="mt-3 text-2xl font-bold leading-snug">{featured.title}</h2>
                <p className="mt-2 text-muted-foreground">{featured.excerpt}</p>
                <p className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{featured.author}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {featured.readingTime} min read
                  </span>
                </p>
              </div>
            </Link>
          </ScrollReveal>
        )}

        {/* Search */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search news…"
              aria-label="Search news"
              className="rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm"
            />
          </div>
        </div>

        {/* Tabs: Latest / Country Updates / Technology / Business & Industry */}
        <Tabs defaultValue="latest" className="mt-6">
          <TabsList className="h-auto flex-wrap justify-start gap-1 overflow-x-auto bg-muted p-1.5">
            <TabsTrigger value="latest" className="gap-1.5">
              <Newspaper className="h-4 w-4" /> Latest News
            </TabsTrigger>
            <TabsTrigger value="country" className="gap-1.5">
              <Globe2 className="h-4 w-4" /> Country Office Updates
            </TabsTrigger>
            <TabsTrigger value="tech" className="gap-1.5">
              <Cpu className="h-4 w-4" /> Technology
            </TabsTrigger>
            <TabsTrigger value="business" className="gap-1.5">
              <Briefcase className="h-4 w-4" /> Business &amp; Industry
            </TabsTrigger>
          </TabsList>

          <TabsContent value="latest" className="mt-6">
            {loading ? (
              <div className="grid gap-5 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-44 animate-pulse rounded-xl bg-muted" />
                ))}
              </div>
            ) : paged.length === 0 ? (
              <p className="py-10 text-center text-muted-foreground">No articles found.</p>
            ) : (
              <>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {paged.map((a) => (
                    <ArticleCard key={a.id} article={a} type="news" />
                  ))}
                </div>
                {pages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
                    {Array.from({ length: pages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`h-9 w-9 rounded-md text-sm font-semibold ${page === i + 1 ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-primary-light"}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="country" className="mt-6">
            {countryUpdates.length === 0 ? (
              <p className="py-10 text-center text-muted-foreground">
                No country office updates right now.
              </p>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {countryUpdates.map((a) => {
                  const c = countries.find((x) => x.code === a.countryCode);
                  return (
                    <div key={a.id} className="relative">
                      <span className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-xs font-semibold shadow">
                        {c?.flag} {c?.name}
                      </span>
                      <ArticleCard article={a} type="news" />
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="tech" className="mt-6">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {technology.map((a) => (
                <ArticleCard key={a.id} article={a} type="news" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="business" className="mt-6">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {business.map((a) => (
                <ArticleCard key={a.id} article={a} type="news" />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Upcoming & Completed Events */}
        <section className="mt-16 border-t border-border pt-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <CalendarDays className="h-5 w-5 text-primary" /> Upcoming Events
              </h2>
              <div className="mt-4 space-y-3">
                {upcomingEvents.map((e) => (
                  <Link
                    key={e.id}
                    to={e.to}
                    className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3 hover:bg-muted"
                  >
                    <img
                      src={e.image}
                      alt=""
                      className="h-14 w-20 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{e.title}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {e.location} · {e.day} {e.monthYear}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <CalendarCheck className="h-5 w-5 text-primary" /> Completed Events
              </h2>
              <div className="mt-4 space-y-3">
                {completedEvents.map((e) => (
                  <Link
                    key={e.id}
                    to={e.to}
                    className="flex items-center gap-3 rounded-xl border border-border bg-surface/60 p-3 opacity-80 hover:opacity-100"
                  >
                    <img
                      src={e.image}
                      alt=""
                      className="h-14 w-20 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{e.title}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {e.location} · {e.day} {e.monthYear}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Photo & Video Gallery */}
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <ImageIcon className="h-5 w-5 text-primary" /> Photo &amp; Video Gallery
          </h2>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {galleryItems.map((g) => (
              <div key={g.id} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  src={g.image}
                  alt={g.title}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
                <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-semibold">
                  {g.type === "video" ? (
                    <Video className="h-3 w-3" />
                  ) : (
                    <ImageIcon className="h-3 w-3" />
                  )}
                  {g.type === "video" ? "Video" : "Photo"}
                </span>
                {g.type === "video" && (
                  <span className="absolute inset-0 grid place-items-center">
                    <Play className="h-8 w-8 fill-white text-white drop-shadow" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Publications & Reports */}
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <FileText className="h-5 w-5 text-primary" /> Publications &amp; Reports
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Illustrative reports from WGIH's global network — see each country office page for local
            publications.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/representatives"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              <FileText className="h-4 w-4 text-primary" /> Browse Country Office Publications
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
