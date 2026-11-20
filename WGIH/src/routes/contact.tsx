import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, MapPin } from "lucide-react";
import { sendContact } from "@/services/api";
import { countries } from "@/data/mock";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — WGIH" },
      {
        name: "description",
        content: "Get in touch with WGIH — general enquiries and per-country office details.",
      },
      { property: "og:title", content: "Contact Us — WGIH" },
      { property: "og:description", content: "Contact the World Geospatial Information Home." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await sendContact(form);
    setSent(true);
    setSending(false);
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="mt-2 text-muted-foreground">
        Questions about courses, partnerships or anything geospatial — we'd love to hear from you.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="rounded-xl border border-border bg-surface p-6">
          {sent ? (
            <p className="flex items-center gap-2 font-semibold text-primary">
              <CheckCircle2 className="h-5 w-5" /> Message sent! We'll reply within one business
              day.
            </p>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="Full name"
                  aria-label="Full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
              <input
                required
                placeholder="Subject"
                aria-label="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <textarea
                required
                placeholder="Your message"
                aria-label="Message"
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <button
                disabled={sending}
                className="rounded-md bg-primary px-6 py-2.5 font-semibold text-primary-foreground hover:bg-primary-dark disabled:opacity-50"
              >
                {sending ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>

        <aside>
          <h2 className="mb-4 text-xl font-bold">Country Offices</h2>
          <div className="space-y-3">
            {countries.map((c) => (
              <div
                key={c.code}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <span className="text-2xl">{c.flag}</span>
                <div className="text-sm">
                  <p className="font-semibold">{c.name}</p>
                  <p className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {c.nameZh} · {c.language}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Phone: {c.dialCode} (local office) · info-{c.code.toLowerCase()}@wgih.org
                  </p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
