import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Loader2,
  Handshake,
  Users,
  PartyPopper,
  GraduationCap,
  FileText,
  Newspaper,
  ExternalLink,
} from "lucide-react";
import { getRepresentative, getNews } from "@/services/api";
import { countries, type Representative, type Article } from "@/data/mock";
import { ArticleCard } from "@/components/Cards";

export const Route = createFileRoute("/representatives/$id")({
  head: () => ({
    meta: [
      { title: "Representative Profile — WGIH" },
      {
        name: "description",
        content:
          "WGIH country representative profile: achievements, projects, partnerships and cooperation opportunities.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RepDetail,
});

function RepDetail() {
  const { id } = Route.useParams();
  const [rep, setRep] = useState<Representative | null>(null);
  const [countryNews, setCountryNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRepresentative(id).then(async (r) => {
      setRep(r ?? null);
      if (r) setCountryNews(await getNews({ country: r.countryCode }));
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
      </main>
    );
  if (!rep)
    return (
      <main className="mx-auto max-w-5xl px-4 py-12">
        <p>
          Representative not found.{" "}
          <Link to="/representatives" className="text-primary underline">
            Back to representatives
          </Link>
        </p>
      </main>
    );

  const country = countries.find((c) => c.code === rep.countryCode);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <Link to="/representatives" className="text-sm text-primary hover:underline">
        ← All representatives
      </Link>

      <header className="mt-4 grid gap-6 md:grid-cols-[220px_1fr]">
        <img
          src={rep.photo}
          alt={rep.name}
          className="aspect-square w-full rounded-2xl border border-border object-cover"
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">{country?.flag}</span>
            <h1 className="text-3xl font-bold">{rep.name}</h1>
            {rep.nameZh && <span className="text-lg text-muted-foreground">{rep.nameZh}</span>}
          </div>
          <p className="mt-1 text-lg text-primary">{rep.position}</p>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {rep.city}, {country?.name} · {rep.languages.join(", ")}
          </p>
          <p className="mt-4 max-w-2xl text-muted-foreground">{rep.bio}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={`mailto:${rep.email}`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-dark"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
            <a
              href={`tel:${rep.phone}`}
              className="inline-flex items-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-light"
            >
              <Phone className="h-4 w-4" />
              {rep.phone}
            </a>
            <a
              href={`https://wa.me/${rep.whatsapp.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              <MessageCircle className="h-4 w-4 text-primary" />
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Key Achievements
          </h2>
          <ul className="space-y-2">
            {rep.achievements.map((a, i) => (
              <li key={i} className="flex gap-2 text-sm">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {a}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <Users className="h-5 w-5 text-primary" />
            Local Partnerships
          </h2>
          <div className="flex flex-wrap gap-2">
            {rep.partnerships.map((p, i) => (
              <span
                key={i}
                className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground"
              >
                {p}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <Loader2 className="h-5 w-5 text-primary" />
            Ongoing Projects
          </h2>
          <div className="space-y-3">
            {rep.projectsOngoing.map((p, i) => (
              <div key={i} className="card-soft p-4">
                <p className="font-semibold">{p.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Completed Projects
          </h2>
          <div className="space-y-3">
            {rep.projectsCompleted.map((p, i) => (
              <div key={i} className="card-soft p-4">
                <p className="font-semibold">{p.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {(rep.culturalEvents || rep.trainingActivities || rep.publications) && (
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {rep.culturalEvents && (
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <PartyPopper className="h-5 w-5 text-primary" />
                Cultural Events
              </h2>
              <ul className="space-y-2">
                {rep.culturalEvents.map((e) => (
                  <li
                    key={e.title}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm"
                  >
                    <span>{e.title}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{e.date}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {rep.trainingActivities && (
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <GraduationCap className="h-5 w-5 text-primary" />
                Training Activities
              </h2>
              <ul className="space-y-2">
                {rep.trainingActivities.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                to="/training"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                Browse Academy &amp; Training <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </section>
          )}

          {rep.publications && (
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <FileText className="h-5 w-5 text-primary" />
                Reports &amp; Publications
              </h2>
              <ul className="space-y-2">
                {rep.publications.map((p) => (
                  <li key={p.title}>
                    <Link
                      to={p.url}
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                    >
                      <FileText className="h-3.5 w-3.5" /> {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {countryNews.length > 0 && (
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
                <Newspaper className="h-5 w-5 text-primary" />
                News from This Office
              </h2>
              <div className="space-y-4">
                {countryNews.slice(0, 2).map((a) => (
                  <ArticleCard key={a.id} article={a} type="news" />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      <section className="mt-12 rounded-2xl border border-border bg-surface p-6">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Handshake className="h-5 w-5 text-primary" />
          Cooperation Opportunities
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Areas where {country?.name} and Chinese companies or institutions can work together
          through WGIH.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {rep.cooperation.map((c, i) => (
            <span
              key={i}
              className="rounded-full bg-primary-light px-3 py-1 text-sm font-semibold text-primary"
            >
              {c}
            </span>
          ))}
        </div>
        <Link
          to="/cooperate"
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90"
        >
          Start a Conversation
        </Link>
      </section>
    </main>
  );
}
