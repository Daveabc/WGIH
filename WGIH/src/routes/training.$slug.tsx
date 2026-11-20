import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  CheckCircle2,
  XCircle,
  Plane,
  Hotel,
  Utensils,
  Car,
  Wallet,
  CalendarClock,
  ListChecks,
} from "lucide-react";
import { getCourse, getAgents, submitEnquiry } from "@/services/api";
import { useCountry } from "@/context/CountryContext";
import { ContactUnlock } from "@/components/ContactUnlock";
import { FundingBadge } from "@/components/Cards";
import { localPrice, type Agent, type Course } from "@/data/mock";

export const Route = createFileRoute("/training/$slug")({
  head: () => ({
    meta: [
      { title: "Course Details — WGIH Training" },
      {
        name: "description",
        content: "Course outline, duration, pricing, funding, eligibility and upcoming sessions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CourseDetail,
});

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="font-semibold">{agent.name}</p>
      <p className="text-sm text-muted-foreground">
        {agent.city} · {agent.languages.join(", ")}
      </p>
      <p className="mt-2 text-sm">
        <a className="text-primary hover:underline" href={`mailto:${agent.email}`}>
          {agent.email}
        </a>
      </p>
      <p className="text-sm">
        <a
          className="text-primary hover:underline"
          href={`https://wa.me/${agent.whatsapp.replace(/\D/g, "")}`}
        >
          WhatsApp: {agent.phone}
        </a>
      </p>
    </div>
  );
}

const fundingBreakdownItems: {
  key: keyof NonNullable<Course["fundingBreakdown"]>;
  icon: typeof Plane;
  label: string;
}[] = [
  { key: "airfare", icon: Plane, label: "Airfare" },
  { key: "accommodation", icon: Hotel, label: "Accommodation" },
  { key: "meals", icon: Utensils, label: "Meals" },
  { key: "localTransport", icon: Car, label: "Local Transport" },
  { key: "pocketMoney", icon: Wallet, label: "Pocket Money" },
];

function CourseDetail() {
  const { slug } = Route.useParams();
  const { country } = useCountry();
  const [course, setCourse] = useState<Course | null>(null);
  const [courseAgents, setCourseAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({ name: "", email: "", phone: "", mode: "onsite", message: "" });
  const [assigned, setAssigned] = useState<Agent | null | "none">(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getCourse(slug).then(async (c) => {
      setCourse(c ?? null);
      if (c) {
        const all = await getAgents();
        setCourseAgents(all.filter((a) => a.courseIds.includes(c.id)));
      }
      setLoading(false);
    });
  }, [slug]);

  useEffect(() => {
    if (country.dialCode && !form.phone) setForm((f) => ({ ...f, phone: country.dialCode + " " }));
  }, [country.code]);

  if (loading)
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
      </main>
    );
  if (!course)
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <p>
          Course not found.{" "}
          <Link to="/training" className="text-primary underline">
            Back to catalog
          </Link>
        </p>
      </main>
    );

  const local = course.countries.includes(country.code);
  const priceDisplay = course.priceUSD === 0 ? "No fee" : localPrice(course.priceUSD, country.code);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await submitEnquiry({ ...form, country_code: country.code, course_id: course.id });
    setAssigned(res.agent ?? "none");
    setSubmitting(false);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <Link to="/training" className="text-sm text-primary hover:underline">
        ← All programs
      </Link>
      <div className="mt-4 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
              {course.category}
            </span>
            <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
              {course.level}
            </span>
            <FundingBadge funding={course.funding} />
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${local ? "bg-accent/20" : "bg-muted text-muted-foreground"}`}
            >
              {local ? `Available in ${country.name}` : "Online – Worldwide"}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold">{course.title}</h1>
          <p className="mt-3 text-muted-foreground">{course.description}</p>

          {/* Eligibility — always visible */}
          {course.eligibility && (
            <>
              <h2 className="mt-8 flex items-center gap-2 text-xl font-bold">
                <ListChecks className="h-5 w-5 text-primary" /> Eligibility
              </h2>
              <ul className="mt-3 space-y-2">
                {course.eligibility.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {e}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Funding breakdown — always visible */}
          {course.fundingBreakdown && (
            <>
              <h2 className="mt-8 text-xl font-bold">What's Covered</h2>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-5">
                {fundingBreakdownItems.map(({ key, icon: Icon, label }) => {
                  const covered = course.fundingBreakdown![key];
                  return (
                    <div
                      key={key}
                      className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center ${
                        covered ? "border-primary/30 bg-primary-light" : "border-border bg-muted/40"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${covered ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <span className="text-[11px] font-medium leading-tight">{label}</span>
                      {covered ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <h2 className="mt-8 text-xl font-bold">Course Outline</h2>
          <ul className="mt-3 space-y-2">
            {course.outline.map((o) => (
              <li key={o} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {o}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-xl font-bold">Upcoming Sessions</h2>
          <ul className="mt-3 space-y-2">
            {course.sessions.map((s) => (
              <li
                key={s.date + s.city}
                className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm"
              >
                <CalendarDays className="h-4 w-4 text-primary" />
                {s.date}
                <MapPin className="ml-2 h-4 w-4 text-primary" />
                {s.city}
              </li>
            ))}
          </ul>

          <h2 className="mt-8 text-xl font-bold">Local Agents for This Program</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            WGIH's own local agents — contact details are always public, never gated.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {courseAgents.length ? (
              courseAgents.map((a) => <AgentCard key={a.id} agent={a} />)
            ) : (
              <p className="text-sm text-muted-foreground">Handled by our head-office team.</p>
            )}
          </div>

          {/* Organizer/coordinator contact — may be gated; program fee stays visible & distinct */}
          {course.organizerContact && (
            <div className="mt-8">
              <ContactUnlock
                contact={course.organizerContact}
                label="Program Coordinator"
                note="Unlock the direct contact for this program's coordinator."
                programFee={{
                  amount: priceDisplay,
                  description: "Paid directly to WGIH upon enrollment.",
                }}
              />
            </div>
          )}
        </div>

        {/* Enquiry form */}
        <aside className="h-fit rounded-xl border border-border bg-surface p-6 lg:sticky lg:top-24">
          <p className="font-heading text-3xl font-bold text-primary">{priceDisplay}</p>
          <p className="text-sm text-muted-foreground">
            {course.duration} · {course.mode}
          </p>
          {course.applicationDeadline && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarClock className="h-3.5 w-3.5" /> Deadline: {course.applicationDeadline}
            </p>
          )}

          {assigned ? (
            <div className="mt-6">
              <p className="flex items-center gap-2 font-semibold text-primary">
                <CheckCircle2 className="h-5 w-5" /> Enquiry sent!
              </p>
              {assigned === "none" ? (
                <p className="mt-2 text-sm text-muted-foreground">
                  Our head-office team will contact you shortly — no local agent in your region yet,
                  but you're in good hands.
                </p>
              ) : (
                <div className="mt-3">
                  <p className="text-sm text-muted-foreground">Your assigned local agent:</p>
                  <div className="mt-2">
                    <AgentCard agent={assigned} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-3">
              <h2 className="font-semibold">Enquire Now</h2>
              <input
                required
                placeholder="Full name"
                aria-label="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <input
                required
                type="email"
                placeholder="Email"
                aria-label="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <input
                required
                placeholder="Phone"
                aria-label="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <select
                value={form.mode}
                onChange={(e) => setForm({ ...form, mode: e.target.value })}
                aria-label="Preferred mode"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="onsite">On-site</option>
                <option value="online">Online</option>
              </select>
              <textarea
                placeholder="Message (optional)"
                aria-label="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Your country ({country.flag} {country.name}) is attached automatically so we can
                assign your local agent.
              </p>
              <button
                disabled={submitting}
                className="w-full rounded-md bg-accent px-4 py-2.5 font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? "Sending…" : "Send Enquiry"}
              </button>
            </form>
          )}
        </aside>
      </div>
    </main>
  );
}
