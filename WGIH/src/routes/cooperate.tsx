import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Handshake, Search } from "lucide-react";
import { submitInquiry, registerInterest } from "@/services/api";
import { countries } from "@/data/mock";

export const Route = createFileRoute("/cooperate")({
  head: () => ({
    meta: [
      { title: "Cooperate with WGIH" },
      {
        name: "description",
        content:
          "Register your interest to cooperate with WGIH, or submit a business inquiry to find Chinese products and manufacturers.",
      },
      { property: "og:title", content: "Cooperate with WGIH" },
      { property: "og:description", content: "Register interest or submit a business inquiry." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Cooperate,
});

const inputCls = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

function Cooperate() {
  const [tab, setTab] = useState<"inquiry" | "register">("inquiry");

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Cooperate with WGIH</h1>
      <p className="mt-2 text-muted-foreground">
        Looking for a product or manufacturer? Submit a business inquiry. Want to join our network?
        Register your interest and a representative will be in touch.
      </p>

      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setTab("inquiry")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${tab === "inquiry" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
        >
          <Search className="h-4 w-4" /> Business Inquiry
        </button>
        <button
          onClick={() => setTab("register")}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${tab === "register" ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"}`}
        >
          <Handshake className="h-4 w-4" /> Register Interest
        </button>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        {tab === "inquiry" ? <InquiryForm /> : <RegisterForm />}
      </div>
    </main>
  );
}

export function InquiryForm({ defaultInterest = "" }: { defaultInterest?: string } = {}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    interest: defaultInterest,
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await submitInquiry(form);
    setBusy(false);
    setSent(true);
  };

  if (sent)
    return (
      <p className="flex items-center gap-2 font-semibold text-primary">
        <CheckCircle2 className="h-5 w-5" /> Thank you! WGIH will match you with the right
        manufacturer and reply within two business days.
      </p>
    );

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Full name"
          aria-label="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={inputCls}
        />
        <input
          required
          type="email"
          placeholder="Email"
          aria-label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputCls}
        />
        <input
          placeholder="Company (optional)"
          aria-label="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className={inputCls}
        />
        <select
          required
          aria-label="Country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className={inputCls}
        >
          <option value="">Select your country</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>
      </div>
      <input
        required
        placeholder="Product or category you're interested in"
        aria-label="Interest"
        value={form.interest}
        onChange={(e) => setForm({ ...form, interest: e.target.value })}
        className={inputCls}
      />
      <textarea
        required
        rows={5}
        placeholder="Describe what you're looking for"
        aria-label="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className={inputCls}
      />
      <button
        disabled={busy}
        className="rounded-md bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:bg-primary-dark disabled:opacity-50"
      >
        {busy ? "Sending…" : "Submit Inquiry"}
      </button>
    </form>
  );
}

const orgTypes = [
  "Company",
  "Manufacturer / Factory",
  "University",
  "Research Institution",
  "Government / Institution",
  "Investor",
  "Other",
];
const sectors = [
  "Automotive & EV",
  "Machinery",
  "GIS & Geospatial",
  "Solar & Renewables",
  "EV Charging",
  "Spare Parts",
  "Electronics",
  "Investment / JV",
  "Other",
];

export function RegisterForm() {
  const [form, setForm] = useState({
    orgName: "",
    contactName: "",
    email: "",
    country: "",
    orgType: "",
    sector: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    await registerInterest(form);
    setBusy(false);
    setSent(true);
  };

  if (sent)
    return (
      <p className="flex items-center gap-2 font-semibold text-primary">
        <CheckCircle2 className="h-5 w-5" /> Welcome aboard! Your interest is registered. A WGIH
        representative will contact you soon.
      </p>
    );

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Organization name"
          aria-label="Organization name"
          value={form.orgName}
          onChange={(e) => setForm({ ...form, orgName: e.target.value })}
          className={inputCls}
        />
        <input
          required
          placeholder="Contact person"
          aria-label="Contact person"
          value={form.contactName}
          onChange={(e) => setForm({ ...form, contactName: e.target.value })}
          className={inputCls}
        />
        <input
          required
          type="email"
          placeholder="Email"
          aria-label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={inputCls}
        />
        <select
          required
          aria-label="Country"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
          className={inputCls}
        >
          <option value="">Select country</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.name}
            </option>
          ))}
        </select>
        <select
          required
          aria-label="Organization type"
          value={form.orgType}
          onChange={(e) => setForm({ ...form, orgType: e.target.value })}
          className={inputCls}
        >
          <option value="">Organization type</option>
          {orgTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          required
          aria-label="Sector of interest"
          value={form.sector}
          onChange={(e) => setForm({ ...form, sector: e.target.value })}
          className={inputCls}
        >
          <option value="">Sector of interest</option>
          {sectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <textarea
        required
        rows={5}
        placeholder="Tell us how you'd like to cooperate with WGIH"
        aria-label="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className={inputCls}
      />
      <button
        disabled={busy}
        className="rounded-md bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:bg-primary-dark disabled:opacity-50"
      >
        {busy ? "Submitting…" : "Register Interest"}
      </button>
    </form>
  );
}
