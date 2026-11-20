import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Target,
  Workflow,
  Database,
  MonitorCog,
  HardDrive,
  PackageCheck,
  CheckCircle2,
  Send,
} from "lucide-react";
import { getSolution } from "@/services/api";
import { InquiryForm } from "@/routes/cooperate";
import { solutionIcon } from "@/lib/solution-icons";
import type { Solution } from "@/data/solutions";

export const Route = createFileRoute("/solutions/$slug")({
  head: () => ({
    meta: [
      { title: "Geospatial Solution — WGIH" },
      {
        name: "description",
        content: "Challenge, workflow, data, software, hardware and outputs for this solution.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SolutionDetail,
});

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        <Icon className="h-5 w-5 text-primary" /> {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function SolutionDetail() {
  const { slug } = Route.useParams();
  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSolution(slug).then((s) => {
      setSolution(s ?? null);
      setLoading(false);
    });
  }, [slug]);

  if (loading)
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
      </main>
    );
  if (!solution)
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <p>
          Solution not found.{" "}
          <Link to="/solutions" className="text-primary underline">
            Back to solutions
          </Link>
        </p>
      </main>
    );

  const Icon = solutionIcon(solution.icon);

  return (
    <main>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-primary-dark text-white"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(10,30,70,.88), rgba(10,30,70,.55)), url(${solution.heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-5xl px-4 py-14">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> All solutions
          </Link>
          <div className="mt-5 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/15">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              {solution.category}
            </p>
          </div>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">{solution.name}</h1>
          <p className="mt-3 max-w-2xl text-white/85">{solution.summary}</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10">
        <Section icon={Target} title="The Challenge">
          <p className="text-muted-foreground">{solution.challenge}</p>
        </Section>

        <Section icon={Workflow} title="Proposed Workflow">
          <ol className="space-y-2">
            {solution.workflow.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-light text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </Section>

        <div className="grid gap-8 md:grid-cols-2">
          <Section icon={Database} title="Data Requirements">
            <BulletList items={solution.dataRequirements} />
          </Section>
          <Section icon={MonitorCog} title="Software Capabilities">
            <BulletList items={solution.softwareCapabilities} />
          </Section>
          <Section icon={HardDrive} title="Necessary Hardware">
            <BulletList items={solution.hardware} />
          </Section>
          <Section icon={PackageCheck} title="Expected Outputs">
            <BulletList items={solution.outputs} />
          </Section>
        </div>

        {/* Request This Solution */}
        <section className="mt-12 rounded-2xl border border-border bg-surface p-6 md:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Send className="h-5 w-5 text-primary" /> Request This Solution
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Tell WGIH about your project and we'll connect you with the right technology partners
            and local representative for {solution.name.toLowerCase()}.
          </p>
          <div className="mt-6">
            <InquiryForm defaultInterest={solution.name} />
          </div>
        </section>
      </div>
    </main>
  );
}
