import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Clock, Share2, Globe2 } from "lucide-react";
import { getNewsArticle, getNews } from "@/services/api";
import { ArticleCard } from "@/components/Cards";
import { ImageGallery } from "@/components/ImageGallery";
import { countries, type Article } from "@/data/mock";

export const Route = createFileRoute("/news/$slug")({
  head: () => ({
    meta: [
      { title: "News Article — WGIH" },
      { name: "description", content: "Read the full story on WGIH." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NewsDetail,
});

function NewsDetail() {
  const { slug } = Route.useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getNewsArticle(slug).then(async (a) => {
      setArticle(a ?? null);
      if (a) {
        const all = await getNews({ category: a.category });
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
          Article not found.{" "}
          <Link to="/news" className="text-primary underline">
            Back to news
          </Link>
        </p>
      </main>
    );

  const share = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link to="/news" className="text-sm text-primary hover:underline">
        ← All news
      </Link>
      <div className="mt-4 flex items-center gap-2 text-xs">
        <span className="rounded-full bg-primary-light px-2.5 py-0.5 font-semibold text-primary">
          {article.category}
        </span>
        {article.countryCode && (
          <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 font-semibold text-muted-foreground">
            <Globe2 className="h-3 w-3" />
            {countries.find((c) => c.code === article.countryCode)?.flag} Country Office Update
          </span>
        )}
        <span className="text-muted-foreground">{article.date}</span>
      </div>
      <h1 className="mt-3 text-3xl font-bold leading-tight">{article.title}</h1>
      <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          By {article.author} · <Clock className="inline h-3.5 w-3.5" /> {article.readingTime} min
          read
        </span>
        <button
          onClick={share}
          className="flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted"
          aria-label="Share article"
        >
          <Share2 className="h-3.5 w-3.5" /> {copied ? "Link copied!" : "Share"}
        </button>
      </div>
      {article.images && article.images.length > 0 && (
        <div className="mt-8">
          <ImageGallery images={article.images} alt={article.title} />
        </div>
      )}
      <div className="prose mt-8 max-w-none space-y-4 leading-relaxed text-foreground">
        {article.content.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-5 text-xl font-bold">Related Articles</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} type="news" />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
