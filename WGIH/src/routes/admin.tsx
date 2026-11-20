import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  login,
  logout,
  isLoggedIn,
  getNews,
  getBlogPosts,
  getCourses,
  getAgents,
  getCountries,
} from "@/services/api";
import type { Article, Course, Agent, Country } from "@/data/mock";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — WGIH" },
      { name: "description", content: "WGIH content administration dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});

type Tab = "news" | "blog" | "courses" | "agents" | "countries" | "enquiries";
const tabs: Tab[] = ["news", "blog", "courses", "agents", "countries", "enquiries"];

function Admin() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("news");

  const [newsList, setNewsList] = useState<Article[]>([]);
  const [blogList, setBlogList] = useState<Article[]>([]);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [agentList, setAgentList] = useState<Agent[]>([]);
  const [countryList, setCountryList] = useState<Country[]>([]);

  useEffect(() => {
    setAuthed(isLoggedIn());
  }, []);

  useEffect(() => {
    if (!authed) return;
    getNews().then(setNewsList);
    getBlogPosts().then(setBlogList);
    getCourses().then(setCourseList);
    getAgents().then(setAgentList);
    getCountries().then(setCountryList);
  }, [authed]);

  const doLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      setAuthed(true);
    } catch {
      setError("Invalid credentials. Try admin@wgih.org / admin123 (mock).");
    }
  };

  if (!authed) {
    return (
      <main className="mx-auto flex max-w-sm flex-col px-4 py-20">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <form onSubmit={doLogin} className="mt-6 space-y-3">
          <input
            required
            type="email"
            placeholder="Email"
            aria-label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <input
            required
            type="password"
            placeholder="Password"
            aria-label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button className="w-full rounded-md bg-primary px-4 py-2.5 font-semibold text-primary-foreground hover:bg-primary-dark">
            Sign In
          </button>
        </form>
      </main>
    );
  }

  const articleTable = (rows: Article[]) => (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-border text-xs uppercase text-muted-foreground">
          <th className="py-2 pr-4">Title</th>
          <th className="py-2 pr-4">Category</th>
          <th className="py-2 pr-4">Date</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((a) => (
          <tr key={a.id} className="border-b border-border">
            <td className="py-2 pr-4 font-medium">{a.title}</td>
            <td className="py-2 pr-4">{a.category}</td>
            <td className="py-2 pr-4">{a.date}</td>
            <td className="py-2">
              <button className="text-primary hover:underline">Edit</button> ·{" "}
              <button className="text-destructive hover:underline">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => {
            logout();
            setAuthed(false);
          }}
          className="rounded-md border border-border px-4 py-2 text-sm hover:bg-muted"
        >
          Sign Out
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "News Articles", value: newsList.length },
          { label: "Blog Posts", value: blogList.length },
          { label: "Courses", value: courseList.length },
          { label: "Agents", value: agentList.length },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-surface p-4 text-center">
            <p className="font-heading text-3xl font-bold text-primary">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize ${tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary-light"}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card p-5">
        {tab === "news" && articleTable(newsList)}
        {tab === "blog" && articleTable(blogList)}
        {tab === "courses" && (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                <th className="py-2 pr-4">Course</th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Level</th>
                <th className="py-2 pr-4">Price (USD)</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courseList.map((c) => (
                <tr key={c.id} className="border-b border-border">
                  <td className="py-2 pr-4 font-medium">{c.title}</td>
                  <td className="py-2 pr-4">{c.category}</td>
                  <td className="py-2 pr-4">{c.level}</td>
                  <td className="py-2 pr-4">${c.priceUSD}</td>
                  <td className="py-2">
                    <button className="text-primary hover:underline">Edit</button> ·{" "}
                    <button className="text-destructive hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "agents" && (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">City</th>
                <th className="py-2 pr-4">Country</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {agentList.map((a) => (
                <tr key={a.id} className="border-b border-border">
                  <td className="py-2 pr-4 font-medium">{a.name}</td>
                  <td className="py-2 pr-4">{a.city}</td>
                  <td className="py-2 pr-4">{a.countryCode}</td>
                  <td className="py-2 pr-4">{a.email}</td>
                  <td className="py-2">
                    <button className="text-primary hover:underline">Edit</button> ·{" "}
                    <button className="text-destructive hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "countries" && (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase text-muted-foreground">
                <th className="py-2 pr-4">Country</th>
                <th className="py-2 pr-4">Code</th>
                <th className="py-2 pr-4">Currency</th>
                <th className="py-2 pr-4">Dial Code</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {countryList.map((c) => (
                <tr key={c.code} className="border-b border-border">
                  <td className="py-2 pr-4 font-medium">
                    {c.flag} {c.name}
                  </td>
                  <td className="py-2 pr-4">{c.code}</td>
                  <td className="py-2 pr-4">{c.currency}</td>
                  <td className="py-2 pr-4">{c.dialCode || "—"}</td>
                  <td className="py-2">
                    <button className="text-primary hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "enquiries" && (
          <p className="text-sm text-muted-foreground">
            Enquiries will appear here once the FastAPI backend is connected. Each enquiry carries
            the sender's country code so you can assign the matching local agent and update its
            status.
          </p>
        )}
      </div>
    </main>
  );
}
