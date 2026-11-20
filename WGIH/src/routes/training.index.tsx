import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GraduationCap, BookOpen, Briefcase } from "lucide-react";
import { getCourses } from "@/services/api";
import { CourseCard } from "@/components/Cards";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useCountry } from "@/context/CountryContext";
import type { Course } from "@/data/mock";

export const Route = createFileRoute("/training/")({
  head: () => ({
    meta: [
      { title: "Academy & Training — WGIH" },
      {
        name: "description",
        content:
          "Scholarships and degree programs (Bachelor's, Master's, PhD, Postdoctoral) plus professional training, certifications and workshops — with transparent funding information.",
      },
      { property: "og:title", content: "Academy & Training — WGIH" },
      {
        property: "og:description",
        content: "Degree scholarships and professional geospatial training.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Academy,
});

const fundingTypes = ["", "Fully Funded", "Partially Funded", "Self-Funded", "Free Participation"];
const degreeLevels = ["", "Bachelor's", "Master's", "PhD", "Postdoctoral", "Other Postgraduate"];
const categories = ["", "GIS", "Remote Sensing", "GNSS", "Drones", "Spatial Analysis"];
const profLevels = ["", "Beginner", "Intermediate", "Advanced"];
const modes = ["", "online", "onsite", "hybrid"];

function Select({
  value,
  set,
  options,
  label,
}: {
  value: string;
  set: (v: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => set(e.target.value)}
      aria-label={label}
      className="rounded-md border border-input bg-background px-3 py-2 text-sm"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o || `All ${label}`}
        </option>
      ))}
    </select>
  );
}

function Academy() {
  const { country } = useCountry();

  // Scholarships & Degree Programs filters
  const [degreeLevel, setDegreeLevel] = useState("");
  const [degreeFunding, setDegreeFunding] = useState("");
  const [degreeList, setDegreeList] = useState<Course[]>([]);
  const [degreeLoading, setDegreeLoading] = useState(true);

  // Professional Programs filters
  const [category, setCategory] = useState("");
  const [profLevel, setProfLevel] = useState("");
  const [mode, setMode] = useState("");
  const [profFunding, setProfFunding] = useState("");
  const [profList, setProfList] = useState<Course[]>([]);
  const [profLoading, setProfLoading] = useState(true);

  useEffect(() => {
    setDegreeLoading(true);
    getCourses({ track: "degree", level: degreeLevel, funding: degreeFunding }).then((c) => {
      setDegreeList(c);
      setDegreeLoading(false);
    });
  }, [degreeLevel, degreeFunding]);

  useEffect(() => {
    setProfLoading(true);
    getCourses({
      track: "professional",
      country: country.code,
      category,
      level: profLevel,
      mode,
      funding: profFunding,
    }).then((c) => {
      setProfList(c);
      setProfLoading(false);
    });
  }, [category, profLevel, mode, profFunding, country.code]);

  return (
    <main>
      {/* Hero */}
      <section className="bg-primary-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-accent">
            <GraduationCap className="h-4 w-4" /> Learn · Grow · Excel
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Academy &amp; Training</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Fully funded scholarships, degree pathways and professional training — every listing
            shows its funding type, eligibility, deadlines and fees up front.
          </p>
        </div>
      </section>

      {/* Scholarships & Degree Programs */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Scholarships &amp; Degree Programs</h2>
        </div>
        <p className="mt-1 max-w-2xl text-muted-foreground">
          Bachelor's, Master's, PhD, Postdoctoral and other postgraduate pathways. Figures shown are
          illustrative — confirm current offerings directly with WGIH.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Select
            value={degreeLevel}
            set={setDegreeLevel}
            options={degreeLevels}
            label="Degree Level"
          />
          <Select
            value={degreeFunding}
            set={setDegreeFunding}
            options={fundingTypes}
            label="Funding"
          />
        </div>
        {degreeLoading ? (
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-52 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : degreeList.length === 0 ? (
          <p className="mt-10 text-center text-muted-foreground">
            No degree programs match your filters. Try clearing them.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {degreeList.map((c, i) => (
              <ScrollReveal key={c.id} delayMs={(i % 3) * 60}>
                <CourseCard course={c} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {/* Professional Programs */}
      <section className="mx-auto max-w-7xl border-t border-border px-4 py-12">
        <div className="flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Professional Programs</h2>
        </div>
        <p className="mt-1 max-w-2xl text-muted-foreground">
          Conferences, seminars, workshops, short courses, online certifications, study visits and
          capacity building. Courses available in {country.flag} {country.name} appear first, with
          prices in {country.currency}.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Select value={category} set={setCategory} options={categories} label="Categories" />
          <Select value={profLevel} set={setProfLevel} options={profLevels} label="Levels" />
          <Select value={mode} set={setMode} options={modes} label="Modes" />
          <Select value={profFunding} set={setProfFunding} options={fundingTypes} label="Funding" />
        </div>
        {profLoading ? (
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-52 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : profList.length === 0 ? (
          <p className="mt-10 text-center text-muted-foreground">
            No programs match your filters. Try clearing them.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {profList.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
