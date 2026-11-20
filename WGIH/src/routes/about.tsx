import { createFileRoute } from "@tanstack/react-router";
import { Globe2, Target, Eye, Award } from "lucide-react";
import logo from "@/assets/wgih-logo.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About WGIH — World Geospatial Information Home" },
      {
        name: "description",
        content:
          "The story, mission and team behind the World Geospatial Information Home (世界地信之家).",
      },
      { property: "og:title", content: "About WGIH" },
      {
        property: "og:description",
        content: "The story and mission of the World Geospatial Information Home.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: About,
});

const team = [
  {
    name: "Dr. Amara Chen",
    role: "Founder & Director",
    bio: "Former UN geospatial advisor with 15 years in Earth observation.",
  },
  {
    name: "Prof. David Ochieng",
    role: "Head of Training",
    bio: "Remote sensing professor and author of three textbooks on satellite analysis.",
  },
  {
    name: "Li Wei",
    role: "Head of China Operations",
    bio: "GIS engineer leading our Beijing training center and agent network.",
  },
  {
    name: "Sarah Johnson",
    role: "Head of Content",
    bio: "Geospatial journalist covering the industry for over a decade.",
  },
];

const partners = [
  "Open Geospatial Consortium",
  "UN-GGIM",
  "Copernicus Programme",
  "OSGeo Foundation",
  "FIG — International Federation of Surveyors",
];

function About() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="flex flex-col items-center text-center">
        <img src={logo} alt="WGIH seal" className="h-32 w-32 rounded-full shadow-lg" />
        <h1 className="mt-6 text-3xl font-bold">About WGIH</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          世界地信之家 — World Geospatial Information Home
        </p>
      </div>

      <section className="mt-12 space-y-4 leading-relaxed">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          <Globe2 className="h-6 w-6 text-primary" /> Our Story
        </h2>
        <p>
          WGIH was founded with a simple belief: geospatial knowledge should have a home in every
          country. What began as a small training center has grown into a global network spanning 7+
          countries, combining daily industry news, expert commentary and hands-on professional
          training.
        </p>
        <p>
          Through our local agent model, every trainee is supported by someone who speaks their
          language, understands their market and can organize on-site courses close to home.
        </p>
      </section>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="card-soft p-6">
          <h3 className="flex items-center gap-2 text-xl font-bold">
            <Target className="h-5 w-5 text-primary" /> Mission
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            To make world-class geospatial education and information accessible to professionals
            everywhere, in their own region and language.
          </p>
        </div>
        <div className="card-soft p-6">
          <h3 className="flex items-center gap-2 text-xl font-bold">
            <Eye className="h-5 w-5 text-primary" /> Vision
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            A world where every surveyor, planner and analyst can harness the power of location
            intelligence to build better communities.
          </p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">Our Team</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t) => (
            <div key={t.name} className="card-soft p-5 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-light font-heading text-xl font-bold text-primary">
                {t.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <p className="mt-3 font-semibold">{t.name}</p>
              <p className="text-xs font-medium text-primary">{t.role}</p>
              <p className="mt-2 text-xs text-muted-foreground">{t.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <Award className="h-6 w-6 text-primary" /> Partners & Certifications
        </h2>
        <div className="flex flex-wrap gap-3">
          {partners.map((p) => (
            <span
              key={p}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium"
            >
              {p}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          All WGIH courses issue internationally recognized certificates of completion.
        </p>
      </section>
    </main>
  );
}
