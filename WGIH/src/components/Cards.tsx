import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { localPrice, type Article, type Course } from "@/data/mock";
import { useCountry } from "@/context/CountryContext";
import { solutionIcon } from "@/lib/solution-icons";
import type { Solution } from "@/data/solutions";

const fundingStyle: Record<Course["funding"], string> = {
  "Fully Funded": "bg-emerald-100 text-emerald-700",
  "Partially Funded": "bg-sky-100 text-sky-700",
  "Free Participation": "bg-violet-100 text-violet-700",
  "Self-Funded": "bg-muted text-muted-foreground",
};

export function FundingBadge({ funding }: { funding: Course["funding"] }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${fundingStyle[funding]}`}>
      {funding}
    </span>
  );
}

export function SolutionCard({ solution }: { solution: Solution }) {
  const Icon = solutionIcon(solution.icon);
  return (
    <Link
      to="/solutions/$slug"
      params={{ slug: solution.slug }}
      className="card-soft flex flex-col gap-3 p-5"
    >
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-light text-primary">
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {solution.category}
        </p>
        <h3 className="mt-1 text-base font-bold leading-snug">{solution.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{solution.summary}</p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary">
        View Solution <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}

export function CourseCard({ course }: { course: Course }) {
  const { country } = useCountry();
  const local = course.countries.includes(country.code);
  return (
    <Link to="/training/$slug" params={{ slug: course.slug }} className="card-soft block p-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-semibold text-primary">
          {course.category}
        </span>
        <FundingBadge funding={course.funding} />
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${local ? "bg-accent/20 text-accent-foreground" : "bg-muted text-muted-foreground"}`}
        >
          {local ? `Available in ${country.name}` : "Online – Worldwide"}
        </span>
      </div>
      <h3 className="text-lg font-bold leading-snug">{course.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-4 w-4" />
          {course.duration}
        </span>
        <span className="font-heading text-lg font-bold text-primary">
          {course.priceUSD === 0 ? "No fee" : localPrice(course.priceUSD, country.code)}
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {course.level} ·{" "}
        {course.mode === "online" ? "Online" : course.mode === "onsite" ? "On-site" : "Hybrid"}
      </p>
    </Link>
  );
}

export function ArticleCard({ article, type }: { article: Article; type: "news" | "blog" }) {
  return (
    <Link
      to={type === "news" ? "/news/$slug" : "/blog/$slug"}
      params={{ slug: article.slug }}
      className="card-soft block p-5"
    >
      <div className="mb-2 flex items-center gap-2 text-xs">
        <span className="rounded-full bg-primary-light px-2.5 py-0.5 font-semibold text-primary">
          {article.category}
        </span>
        <span className="text-muted-foreground">{article.date}</span>
      </div>
      <h3 className="text-lg font-bold leading-snug">{article.title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
        <span>{article.author}</span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {article.readingTime} min read
        </span>
      </div>
    </Link>
  );
}

export function CountryBanner() {
  const { country, detected, bannerDismissed, dismissBanner } = useCountry();
  if (!detected || bannerDismissed || country.code === "INT") return null;
  return (
    <div className="bg-primary-light px-4 py-2 text-center text-sm text-primary" role="status">
      <MapPin className="mr-1 inline h-4 w-4" />
      We detected you're in <strong>{country.name}</strong>. Showing opportunities and content for
      your region.{" "}
      <button onClick={dismissBanner} className="ml-2 underline">
        Dismiss
      </button>
    </div>
  );
}
