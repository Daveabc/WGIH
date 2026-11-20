import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { getBlogPosts } from "@/services/api";
import { ArticleCard } from "@/components/Cards";
import { blog as blogData, type Article } from "@/data/mock";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — WGIH" },
      {
        name: "description",
        content: "Expert geospatial guides, tutorials and career advice from the WGIH team.",
      },
      { property: "og:title", content: "Blog — WGIH" },
      { property: "og:description", content: "Expert geospatial guides and tutorials." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Blog,
});

const allTags = [...new Set(blogData.flatMap((a) => a.tags))];

function Blog() {
  const [tag, setTag] = useState("");
  const [q, setQ] = useState("");
  const [list, setList] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getBlogPosts({ tag, q }).then((b) => {
      setList(b);
      setLoading(false);
    });
  }, [tag, q]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">Blog</h1>
      <p className="mt-2 text-muted-foreground">
        Guides, tutorials and career advice from our geospatial experts.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search posts…"
            aria-label="Search blog posts"
            className="rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTag("")}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${tag === "" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary-light"}`}
          >
            All
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${tag === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary-light"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <p className="mt-12 text-center text-muted-foreground">No posts found.</p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <ArticleCard key={a.id} article={a} type="blog" />
          ))}
        </div>
      )}
    </main>
  );
}
