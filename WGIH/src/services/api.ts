import {
  countries,
  agents,
  courses,
  news,
  blog,
  internationalCountry,
  representatives,
  sponsors,
  companies,
  productCategories,
  partners,
  opportunities,
  heroSlides,
  coreServices,
  pulseNews,
  featuredEvent,
  latestEvents,
  galleryItems,
  featuredBrands,
  partnerLogos,
  stats,
  type Country,
  type Agent,
  type Course,
  type Article,
  type Representative,
  type Sponsor,
  type Company,
  type Partner,
  type Opportunity,
  type ProductCategory,
} from "@/data/mock";
import { solutions, type Solution } from "@/data/solutions";

const BASE_URL = import.meta.env["VITE_API_BASE_URL"] ?? "http://localhost:8000/api";
const USE_MOCK = true; // flip to false (or remove) when the FastAPI backend is live

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem("wgih_token");
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

// GET /countries
export async function getCountries(): Promise<Country[]> {
  if (USE_MOCK) {
    await delay();
    return [internationalCountry, ...countries];
  }
  return request("/countries");
}

// GET /agents?country=CODE
export async function getAgents(countryCode?: string): Promise<Agent[]> {
  if (USE_MOCK) {
    await delay();
    return countryCode && countryCode !== "INT"
      ? agents.filter((a) => a.countryCode === countryCode)
      : agents;
  }
  return request(`/agents${countryCode ? `?country=${countryCode}` : ""}`);
}

// GET /courses?country=CODE&category=&level=&mode=&track=&funding=
export async function getCourses(
  params: {
    country?: string;
    category?: string;
    level?: string;
    mode?: string;
    track?: string;
    funding?: string;
  } = {},
): Promise<Course[]> {
  if (USE_MOCK) {
    await delay();
    let list = [...courses];
    if (params.track) list = list.filter((c) => c.track === params.track);
    if (params.category) list = list.filter((c) => c.category === params.category);
    if (params.level) list = list.filter((c) => c.level === params.level);
    if (params.mode) list = list.filter((c) => c.mode === params.mode || c.mode === "hybrid");
    if (params.funding) list = list.filter((c) => c.funding === params.funding);
    if (params.country && params.country !== "INT") {
      list.sort(
        (a, b) =>
          Number(b.countries.includes(params.country!)) -
          Number(a.countries.includes(params.country!)),
      );
    }
    return list;
  }
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]);
  return request(`/courses?${q}`);
}

// GET /courses/{slug}
export async function getCourse(slug: string): Promise<Course | undefined> {
  if (USE_MOCK) {
    await delay();
    return courses.find((c) => c.slug === slug);
  }
  return request(`/courses/${slug}`);
}

// GET /news?category=&q=
export async function getNews(
  params: { category?: string; q?: string; country?: string } = {},
): Promise<Article[]> {
  if (USE_MOCK) {
    await delay();
    let list = [...news];
    if (params.category) list = list.filter((a) => a.category === params.category);
    if (params.country) list = list.filter((a) => a.countryCode === params.country);
    if (params.q)
      list = list.filter((a) => a.title.toLowerCase().includes(params.q!.toLowerCase()));
    return list;
  }
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]);
  return request(`/news?${q}`);
}

export async function getNewsArticle(slug: string): Promise<Article | undefined> {
  if (USE_MOCK) {
    await delay();
    return news.find((a) => a.slug === slug);
  }
  return request(`/news/${slug}`);
}

export async function getBlogPosts(params: { tag?: string; q?: string } = {}): Promise<Article[]> {
  if (USE_MOCK) {
    await delay();
    let list = [...blog];
    if (params.tag) list = list.filter((a) => a.tags.includes(params.tag!));
    if (params.q)
      list = list.filter((a) => a.title.toLowerCase().includes(params.q!.toLowerCase()));
    return list;
  }
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]);
  return request(`/blog?${q}`);
}

export async function getBlogPost(slug: string): Promise<Article | undefined> {
  if (USE_MOCK) {
    await delay();
    return blog.find((a) => a.slug === slug);
  }
  return request(`/blog/${slug}`);
}

export interface Enquiry {
  name: string;
  email: string;
  phone: string;
  country_code: string;
  course_id: string;
  mode: string;
  message: string;
}

// POST /enquiries — returns the assigned agent (or null for head office)
export async function submitEnquiry(e: Enquiry): Promise<{ agent: Agent | null }> {
  if (USE_MOCK) {
    await delay(600);
    const local =
      agents.find((a) => a.countryCode === e.country_code && a.courseIds.includes(e.course_id)) ??
      agents.find((a) => a.countryCode === e.country_code);
    return { agent: local ?? null };
  }
  return request("/enquiries", { method: "POST", body: JSON.stringify(e) });
}

// ---- Representatives ----
export async function getRepresentatives(countryCode?: string): Promise<Representative[]> {
  if (USE_MOCK) {
    await delay();
    return countryCode && countryCode !== "INT"
      ? representatives.filter((r) => r.countryCode === countryCode)
      : representatives;
  }
  return request(`/representatives${countryCode ? `?country=${countryCode}` : ""}`);
}

export async function getRepresentative(id: string): Promise<Representative | undefined> {
  if (USE_MOCK) {
    await delay();
    return representatives.find((r) => r.id === id);
  }
  return request(`/representatives/${id}`);
}

// ---- Promotional sponsors ----
export async function getSponsors(): Promise<Sponsor[]> {
  if (USE_MOCK) {
    await delay(150);
    return sponsors;
  }
  return request("/sponsors");
}

// ---- Marketplace: companies & products ----
export async function getCompanies(categoryId?: string): Promise<Company[]> {
  if (USE_MOCK) {
    await delay();
    return categoryId ? companies.filter((c) => c.categoryId === categoryId) : companies;
  }
  return request(`/companies${categoryId ? `?category=${categoryId}` : ""}`);
}

export async function getCompany(id: string): Promise<Company | undefined> {
  if (USE_MOCK) {
    await delay();
    return companies.find((c) => c.id === id);
  }
  return request(`/companies/${id}`);
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  if (USE_MOCK) {
    await delay(100);
    return productCategories;
  }
  return request("/product-categories");
}

// ---- Partners ----
export async function getPartners(): Promise<Partner[]> {
  if (USE_MOCK) {
    await delay();
    return partners;
  }
  return request("/partners");
}

// ---- Opportunities ----
export async function getOpportunities(
  params: { country?: string; type?: string } = {},
): Promise<Opportunity[]> {
  if (USE_MOCK) {
    await delay();
    let list = [...opportunities];
    if (params.country && params.country !== "INT")
      list = list.filter((o) => o.countryCode === params.country);
    if (params.type) list = list.filter((o) => o.type === params.type);
    return list;
  }
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]);
  return request(`/opportunities?${q}`);
}

export async function getOpportunity(id: string): Promise<Opportunity | undefined> {
  if (USE_MOCK) {
    await delay();
    return opportunities.find((o) => o.id === id);
  }
  return request(`/opportunities/${id}`);
}

// ---- Space & Geospatial Solutions ----
export async function getSolutions(): Promise<Solution[]> {
  if (USE_MOCK) {
    await delay();
    return solutions;
  }
  return request("/solutions");
}

export async function getSolution(slug: string): Promise<Solution | undefined> {
  if (USE_MOCK) {
    await delay();
    return solutions.find((s) => s.slug === slug);
  }
  return request(`/solutions/${slug}`);
}

// ---- Business inquiry (marketplace / product request) ----
export interface BusinessInquiry {
  name: string;
  email: string;
  company: string;
  country: string;
  interest: string;
  message: string;
}
export async function submitInquiry(data: BusinessInquiry): Promise<void> {
  if (USE_MOCK) {
    await delay(500);
    return;
  }
  await request("/inquiries", { method: "POST", body: JSON.stringify(data) });
}

// ---- Register cooperation interest ----
export interface InterestRegistration {
  orgName: string;
  contactName: string;
  email: string;
  country: string;
  orgType: string;
  sector: string;
  message: string;
}
export async function registerInterest(data: InterestRegistration): Promise<void> {
  if (USE_MOCK) {
    await delay(500);
    return;
  }
  await request("/cooperation/register", { method: "POST", body: JSON.stringify(data) });
}

export async function subscribeNewsletter(email: string): Promise<void> {
  if (USE_MOCK) {
    await delay(400);
    return;
  }
  await request("/newsletter", { method: "POST", body: JSON.stringify({ email }) });
}

export async function sendContact(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  if (USE_MOCK) {
    await delay(400);
    return;
  }
  await request("/contact", { method: "POST", body: JSON.stringify(data) });
}

// POST /auth/login
export async function login(email: string, password: string): Promise<{ access_token: string }> {
  if (USE_MOCK) {
    await delay(500);
    if (email === "admin@wgih.org" && password === "admin123") {
      const token = "mock-admin-token";
      localStorage.setItem("wgih_token", token);
      return { access_token: token };
    }
    throw new Error("Invalid credentials");
  }
  const res = await request<{ access_token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem("wgih_token", res.access_token);
  return res;
}

export function logout() {
  localStorage.removeItem("wgih_token");
}

export function isLoggedIn() {
  return Boolean(localStorage.getItem("wgih_token"));
}

// ===================================================================
// Homepage content — synchronous reads of curated display data.
// Kept as plain getters so the homepage can render immediately in SSR
// without a loading flash, while still routing through this service layer.
// ===================================================================
export const getHeroSlides = () => heroSlides;
export const getCoreServices = () => coreServices;
export const getPulseNews = () => pulseNews;
export const getFeaturedEvent = () => featuredEvent;
export const getLatestEvents = () => latestEvents;
export const getGalleryItems = () => galleryItems;
export const getFeaturedBrands = () => featuredBrands;
export const getPartnerLogos = () => partnerLogos;
export const getStats = () => stats;
