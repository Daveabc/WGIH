import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { getBlogPost, getBlogPosts } from "@/services/api";
import { ArticleCard } from "@/components/Cards";
import type { Article } from "@/data/mock";

export const Route = createFileRoute("/blog/$slug")({
  head: () => ({
    meta: [
      { title: "Blog Post — WGIH" },
      { name: "description", content: "Read the full post on the WGIH blog." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BlogDetail,
});

function BlogDetail() {
  const { slug } = Route.useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPost(slug).then(async (a) => {
      setArticle(a ?? null);
      if (a) {
        const all = await getBlogPosts();
        setRelated(all.filter((x) => x.slug !== slug).slice(0, 3));
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading)
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="h-64 animate-pulse rounded-xl bg-muted" />
      </main>
    );
  if (!article)
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p>
          Post not found.{" "}
          <Link to="/blog" className="text-primary underline">
            Back to blog
          </Link>
        </p>
      </main>
    );

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link to="/blog" className="text-sm text-primary hover:underline">
        ← All posts
      </Link>
      <h1 className="mt-4 text-3xl font-bold leading-tight">{article.title}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>
          By <strong className="text-foreground">{article.author}</strong>
        </span>
        <span>{article.date}</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {article.readingTime} min read
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {article.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary"
          >
            #{t}
          </span>
        ))}
      </div>
      <div className="mt-8 space-y-4 leading-relaxed">
        {article.content.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 text-xl font-bold">More from the Blog</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} type="blog" />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
