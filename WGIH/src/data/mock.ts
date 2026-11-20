export interface Country {
  code: string;
  name: string;
  nameZh: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  dialCode: string;
  language: string;
}

export interface Agent {
  id: string;
  name: string;
  city: string;
  countryCode: string;
  languages: string[];
  email: string;
  phone: string;
  whatsapp: string;
  photo: string;
  courseIds: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: "GIS" | "Remote Sensing" | "GNSS" | "Drones" | "Spatial Analysis";
  /** Scholarship/degree track vs short professional programs. */
  track: "degree" | "professional";
  level:
    | "Beginner"
    | "Intermediate"
    | "Advanced"
    | "Bachelor's"
    | "Master's"
    | "PhD"
    | "Postdoctoral"
    | "Other Postgraduate";
  mode: "online" | "onsite" | "hybrid";
  duration: string;
  priceUSD: number;
  countries: string[]; // country codes where onsite is available; empty = online worldwide
  outline: string[];
  description: string;
  sessions: { date: string; city: string; countryCode: string }[];
  /** Funding category — must stay visible, never gated behind contact unlock. */
  funding: "Fully Funded" | "Partially Funded" | "Self-Funded" | "Free Participation";
  fundingBreakdown?: {
    airfare: boolean;
    accommodation: boolean;
    meals: boolean;
    localTransport: boolean;
    pocketMoney: boolean;
  };
  eligibility?: string[];
  applicationDeadline?: string;
  /** Illustrative program coordinator — contact detail may sit behind the unlock pattern. */
  organizerContact?: { name: string; role: string; email: string; phone: string };
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  readingTime: number;
  image?: string;
  images?: string[];
  /** Ties a news item to a WGIH country office for the "Country Office Updates" filter. */
  countryCode?: string;
  featured?: boolean;
}

export const countries: Country[] = [
  {
    code: "CN",
    name: "China",
    nameZh: "中国",
    flag: "🇨🇳",
    currency: "CNY",
    currencySymbol: "¥",
    dialCode: "+86",
    language: "Chinese",
  },
  {
    code: "KE",
    name: "Kenya",
    nameZh: "肯尼亚",
    flag: "🇰🇪",
    currency: "KES",
    currencySymbol: "KSh",
    dialCode: "+254",
    language: "English / Swahili",
  },
  {
    code: "NG",
    name: "Nigeria",
    nameZh: "尼日利亚",
    flag: "🇳🇬",
    currency: "NGN",
    currencySymbol: "₦",
    dialCode: "+234",
    language: "English",
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    nameZh: "阿联酋",
    flag: "🇦🇪",
    currency: "AED",
    currencySymbol: "د.إ",
    dialCode: "+971",
    language: "Arabic / English",
  },
  {
    code: "GB",
    name: "United Kingdom",
    nameZh: "英国",
    flag: "🇬🇧",
    currency: "GBP",
    currencySymbol: "£",
    dialCode: "+44",
    language: "English",
  },
  {
    code: "US",
    name: "United States",
    nameZh: "美国",
    flag: "🇺🇸",
    currency: "USD",
    currencySymbol: "$",
    dialCode: "+1",
    language: "English",
  },
  {
    code: "AU",
    name: "Australia",
    nameZh: "澳大利亚",
    flag: "🇦🇺",
    currency: "AUD",
    currencySymbol: "A$",
    dialCode: "+61",
    language: "English",
  },
  {
    code: "ET",
    name: "Ethiopia",
    nameZh: "埃塞俄比亚",
    flag: "🇪🇹",
    currency: "ETB",
    currencySymbol: "Br",
    dialCode: "+251",
    language: "Amharic / English",
  },
  {
    code: "EG",
    name: "Egypt",
    nameZh: "埃及",
    flag: "🇪🇬",
    currency: "EGP",
    currencySymbol: "E£",
    dialCode: "+20",
    language: "Arabic",
  },
  {
    code: "PK",
    name: "Pakistan",
    nameZh: "巴基斯坦",
    flag: "🇵🇰",
    currency: "PKR",
    currencySymbol: "₨",
    dialCode: "+92",
    language: "Urdu / English",
  },
  {
    code: "BR",
    name: "Brazil",
    nameZh: "巴西",
    flag: "🇧🇷",
    currency: "BRL",
    currencySymbol: "R$",
    dialCode: "+55",
    language: "Portuguese",
  },
  {
    code: "ID",
    name: "Indonesia",
    nameZh: "印度尼西亚",
    flag: "🇮🇩",
    currency: "IDR",
    currencySymbol: "Rp",
    dialCode: "+62",
    language: "Indonesian",
  },
  {
    code: "ZA",
    name: "South Africa",
    nameZh: "南非",
    flag: "🇿🇦",
    currency: "ZAR",
    currencySymbol: "R",
    dialCode: "+27",
    language: "English",
  },
  {
    code: "DE",
    name: "Germany",
    nameZh: "德国",
    flag: "🇩🇪",
    currency: "EUR",
    currencySymbol: "€",
    dialCode: "+49",
    language: "German",
  },
];

export const internationalCountry: Country = {
  code: "INT",
  name: "International",
  nameZh: "国际",
  flag: "🌍",
  currency: "USD",
  currencySymbol: "$",
  dialCode: "",
  language: "English",
};

const fx: Record<string, number> = {
  CN: 7.2,
  KE: 129,
  NG: 1550,
  AE: 3.67,
  GB: 0.79,
  US: 1,
  AU: 1.52,
  ET: 123,
  EG: 48,
  PK: 278,
  BR: 5.4,
  ID: 15800,
  ZA: 18.3,
  DE: 0.92,
  INT: 1,
};

export function localPrice(usd: number, countryCode: string): string {
  const c = countries.find((x) => x.code === countryCode) ?? internationalCountry;
  const rate = fx[c.code] ?? 1;
  const val = Math.round((usd * rate) / 5) * 5;
  return `${c.currencySymbol}${val.toLocaleString()}`;
}

export const agents: Agent[] = [
  {
    id: "ag-cn-1",
    name: "Li Wei",
    city: "Beijing",
    countryCode: "CN",
    languages: ["Chinese", "English"],
    email: "liwei@wgih.org",
    phone: "+86 10 5555 0101",
    whatsapp: "+8613855550101",
    photo: "",
    courseIds: ["c-gis-1", "c-rs-1", "c-drone-1"],
  },
  {
    id: "ag-cn-2",
    name: "Zhang Mei",
    city: "Shanghai",
    countryCode: "CN",
    languages: ["Chinese"],
    email: "zhangmei@wgih.org",
    phone: "+86 21 5555 0102",
    whatsapp: "+8613955550102",
    photo: "",
    courseIds: ["c-gnss-1", "c-sa-1"],
  },
  {
    id: "ag-ke-1",
    name: "Grace Muthoni",
    city: "Nairobi",
    countryCode: "KE",
    languages: ["English", "Swahili"],
    email: "grace@wgih.org",
    phone: "+254 20 555 0103",
    whatsapp: "+254722555103",
    photo: "",
    courseIds: ["c-gis-1", "c-rs-2", "c-drone-1"],
  },
  {
    id: "ag-ng-1",
    name: "Chinedu Okafor",
    city: "Lagos",
    countryCode: "NG",
    languages: ["English", "Yoruba"],
    email: "chinedu@wgih.org",
    phone: "+234 1 555 0104",
    whatsapp: "+2348035550104",
    photo: "",
    courseIds: ["c-gis-1", "c-gnss-1"],
  },
  {
    id: "ag-ae-1",
    name: "Fatima Al Mansoori",
    city: "Dubai",
    countryCode: "AE",
    languages: ["Arabic", "English"],
    email: "fatima@wgih.org",
    phone: "+971 4 555 0105",
    whatsapp: "+971505550105",
    photo: "",
    courseIds: ["c-rs-1", "c-drone-2", "c-sa-1"],
  },
  {
    id: "ag-gb-1",
    name: "Oliver Bennett",
    city: "London",
    countryCode: "GB",
    languages: ["English"],
    email: "oliver@wgih.org",
    phone: "+44 20 5555 0106",
    whatsapp: "+447705550106",
    photo: "",
    courseIds: ["c-gis-2", "c-rs-1", "c-sa-1"],
  },
  {
    id: "ag-us-1",
    name: "Sarah Johnson",
    city: "Denver",
    countryCode: "US",
    languages: ["English", "Spanish"],
    email: "sarah@wgih.org",
    phone: "+1 303 555 0107",
    whatsapp: "+13035550107",
    photo: "",
    courseIds: ["c-gis-2", "c-drone-2", "c-gnss-1"],
  },
  {
    id: "ag-au-1",
    name: "Jack Thompson",
    city: "Sydney",
    countryCode: "AU",
    languages: ["English"],
    email: "jack@wgih.org",
    phone: "+61 2 5555 0108",
    whatsapp: "+61415550108",
    photo: "",
    courseIds: ["c-rs-2", "c-drone-1"],
  },
];

export const courses: Course[] = [
  {
    id: "c-gis-1",
    slug: "gis-fundamentals-qgis",
    title: "GIS Fundamentals with QGIS",
    category: "GIS",
    track: "professional",
    level: "Beginner",
    mode: "hybrid",
    duration: "5 days",
    priceUSD: 450,
    countries: ["CN", "KE", "NG"],
    funding: "Self-Funded",
    eligibility: ["Open to professionals and students with basic computer literacy"],
    applicationDeadline: "Rolling — apply 2 weeks before session date",
    organizerContact: {
      name: "Li Wei",
      role: "Training Coordinator, Beijing Center",
      email: "liwei@wgih.org",
      phone: "+86 10 5555 0101",
    },
    description:
      "A hands-on introduction to geographic information systems using the free and open-source QGIS platform. Learn to create, edit, analyze and map spatial data from scratch.",
    outline: [
      "Spatial data models: vector & raster",
      "Coordinate reference systems",
      "Digitizing and georeferencing",
      "Spatial queries and geoprocessing",
      "Cartography and map layout",
      "Final project: map your own city",
    ],
    sessions: [
      { date: "2026-11-09", city: "Nairobi", countryCode: "KE" },
      { date: "2026-11-23", city: "Beijing", countryCode: "CN" },
      { date: "2026-12-07", city: "Lagos", countryCode: "NG" },
    ],
  },
  {
    id: "c-gis-2",
    slug: "advanced-arcgis-pro",
    title: "Advanced Spatial Analysis with ArcGIS Pro",
    category: "GIS",
    track: "professional",
    level: "Advanced",
    mode: "onsite",
    duration: "4 days",
    priceUSD: 890,
    countries: ["GB", "US"],
    funding: "Self-Funded",
    eligibility: ["2+ years of GIS experience recommended"],
    applicationDeadline: "Rolling — apply 3 weeks before session date",
    organizerContact: {
      name: "Oliver Bennett",
      role: "Training Coordinator, London Office",
      email: "oliver.bennett@wgih.org",
      phone: "+44 20 5555 0106",
    },
    description:
      "Master advanced geoprocessing, ModelBuilder, 3D scenes and enterprise geodatabases in ArcGIS Pro.",
    outline: [
      "Advanced geoprocessing workflows",
      "ModelBuilder & Python automation",
      "3D GIS and scenes",
      "Enterprise geodatabases",
      "Spatial statistics",
    ],
    sessions: [
      { date: "2026-11-16", city: "London", countryCode: "GB" },
      { date: "2026-12-01", city: "Denver", countryCode: "US" },
    ],
  },
  {
    id: "c-rs-1",
    slug: "remote-sensing-sentinel-landsat",
    title: "Remote Sensing with Sentinel & Landsat",
    category: "Remote Sensing",
    track: "professional",
    level: "Intermediate",
    mode: "hybrid",
    duration: "5 days",
    priceUSD: 620,
    countries: ["CN", "AE", "GB"],
    funding: "Partially Funded",
    fundingBreakdown: {
      airfare: false,
      accommodation: true,
      meals: true,
      localTransport: false,
      pocketMoney: false,
    },
    eligibility: ["Background in geography, environmental science or engineering"],
    applicationDeadline: "4 weeks before session date",
    organizerContact: {
      name: "Fatima Al Mansoori",
      role: "Training Coordinator, Dubai Office",
      email: "fatima.almansoori@wgih.org",
      phone: "+971 4 555 0105",
    },
    description:
      "Process and analyze free satellite imagery from the Copernicus and Landsat programmes for land cover, agriculture and environmental monitoring.",
    outline: [
      "Fundamentals of Earth observation",
      "Sentinel-2 & Landsat 8/9 data access",
      "Atmospheric correction",
      "Vegetation indices (NDVI, EVI)",
      "Land cover classification",
      "Change detection",
    ],
    sessions: [
      { date: "2026-11-10", city: "Dubai", countryCode: "AE" },
      { date: "2026-11-24", city: "London", countryCode: "GB" },
      { date: "2026-12-08", city: "Shanghai", countryCode: "CN" },
    ],
  },
  {
    id: "c-rs-2",
    slug: "google-earth-engine",
    title: "Cloud Geospatial with Google Earth Engine",
    category: "Remote Sensing",
    track: "professional",
    level: "Intermediate",
    mode: "online",
    duration: "4 weeks (part-time)",
    priceUSD: 380,
    countries: [],
    funding: "Self-Funded",
    eligibility: ["Basic Python or JavaScript helpful but not required"],
    applicationDeadline: "Rolling — enroll any time, cohorts start monthly",
    description:
      "Analyze petabytes of satellite data in the cloud with Earth Engine JavaScript and Python APIs.",
    outline: [
      "Earth Engine data catalog",
      "Image & feature collections",
      "Time-series analysis",
      "Machine learning classification",
      "Building web apps",
    ],
    sessions: [{ date: "2026-11-03", city: "Online", countryCode: "INT" }],
  },
  {
    id: "c-gnss-1",
    slug: "gnss-surveying-rtk",
    title: "GNSS Surveying & RTK Techniques",
    category: "GNSS",
    track: "professional",
    level: "Intermediate",
    mode: "onsite",
    duration: "3 days",
    priceUSD: 540,
    countries: ["CN", "NG", "US"],
    funding: "Self-Funded",
    eligibility: ["Working surveyors or civil engineering students"],
    applicationDeadline: "3 weeks before session date",
    organizerContact: {
      name: "Chinedu Okafor",
      role: "Training Coordinator, Lagos Office",
      email: "chinedu.okafor@wgih.org",
      phone: "+234 1 555 0104",
    },
    description:
      "Field-ready training on high-precision GNSS positioning, RTK workflows, base-rover setups and datum transformations.",
    outline: [
      "GNSS principles and error sources",
      "RTK and network RTK",
      "Base station setup",
      "Datum and coordinate transformations",
      "Field practice and QA/QC",
    ],
    sessions: [
      { date: "2026-11-12", city: "Lagos", countryCode: "NG" },
      { date: "2026-12-03", city: "Denver", countryCode: "US" },
    ],
  },
  {
    id: "c-drone-1",
    slug: "drone-mapping-photogrammetry",
    title: "Drone Mapping & Photogrammetry",
    category: "Drones",
    track: "professional",
    level: "Beginner",
    mode: "onsite",
    duration: "4 days",
    priceUSD: 720,
    countries: ["CN", "KE", "AU"],
    funding: "Self-Funded",
    eligibility: ["No prior drone experience required"],
    applicationDeadline: "3 weeks before session date",
    organizerContact: {
      name: "Grace Muthoni",
      role: "Training Coordinator, Nairobi Office",
      email: "grace.muthoni@wgih.org",
      phone: "+254 20 555 0103",
    },
    description:
      "Plan UAV missions, capture imagery and produce orthomosaics, DSMs and 3D models with industry-standard photogrammetry software.",
    outline: [
      "Regulations and flight planning",
      "Camera settings and overlap",
      "Ground control points",
      "Processing: orthomosaic, DSM, 3D mesh",
      "Accuracy assessment",
    ],
    sessions: [
      { date: "2026-11-17", city: "Nairobi", countryCode: "KE" },
      { date: "2026-12-01", city: "Sydney", countryCode: "AU" },
    ],
  },
  {
    id: "c-drone-2",
    slug: "drone-lidar-surveying",
    title: "Drone LiDAR for Surveying",
    category: "Drones",
    track: "professional",
    level: "Advanced",
    mode: "onsite",
    duration: "3 days",
    priceUSD: 1150,
    countries: ["AE", "US"],
    funding: "Self-Funded",
    eligibility: ["Prior drone mapping experience required"],
    applicationDeadline: "4 weeks before session date",
    description:
      "Advanced UAV LiDAR acquisition and point-cloud processing for corridor mapping, forestry and mining.",
    outline: [
      "LiDAR sensor fundamentals",
      "Mission planning for LiDAR",
      "Point cloud classification",
      "DTM generation under vegetation",
      "Deliverables and standards",
    ],
    sessions: [
      { date: "2026-11-19", city: "Dubai", countryCode: "AE" },
      { date: "2026-12-10", city: "Denver", countryCode: "US" },
    ],
  },
  {
    id: "c-sa-1",
    slug: "spatial-data-science-python",
    title: "Spatial Data Science with Python",
    category: "Spatial Analysis",
    track: "professional",
    level: "Intermediate",
    mode: "online",
    duration: "6 weeks (part-time)",
    priceUSD: 490,
    countries: [],
    funding: "Self-Funded",
    eligibility: ["Basic Python recommended"],
    applicationDeadline: "Rolling — cohorts start monthly",
    description:
      "Geopandas, rasterio, PySAL and machine learning for spatial data — from notebooks to production pipelines.",
    outline: [
      "GeoPandas and Shapely",
      "Raster analysis with rasterio",
      "Spatial autocorrelation",
      "Geocoding and routing",
      "ML for spatial prediction",
      "Deploying spatial APIs",
    ],
    sessions: [{ date: "2026-11-02", city: "Online", countryCode: "INT" }],
  },

  // ---- Scholarships & Degree Programs (illustrative — confirm current offerings with WGIH) ----
  {
    id: "c-deg-bsc",
    slug: "bsc-geomatics-wuhan",
    title: "BSc in Geomatics Engineering — Wuhan University",
    category: "GIS",
    track: "degree",
    level: "Bachelor's",
    mode: "onsite",
    duration: "4 years",
    priceUSD: 0,
    countries: ["CN"],
    funding: "Fully Funded",
    fundingBreakdown: {
      airfare: true,
      accommodation: true,
      meals: true,
      localTransport: false,
      pocketMoney: true,
    },
    eligibility: [
      "High-school diploma with strong mathematics and physics grades",
      "English or Chinese language proficiency (program-dependent)",
      "Age typically under 25 at time of application",
    ],
    applicationDeadline: "Illustrative — 2027 intake applications indicatively close March 2027",
    organizerContact: {
      name: "Li Wei",
      role: "Scholarship Liaison, Beijing Center",
      email: "liwei@wgih.org",
      phone: "+86 10 5555 0101",
    },
    description:
      "An illustrative fully-funded undergraduate scholarship pathway in geomatics engineering, covering surveying, remote sensing, GIS and cartography fundamentals. Figures and intake dates are indicative — confirm current offerings directly with WGIH.",
    outline: [
      "Mathematics & surveying fundamentals (Years 1–2)",
      "Remote sensing & photogrammetry (Year 2–3)",
      "GIS software development (Year 3)",
      "Capstone mapping project (Year 4)",
    ],
    sessions: [{ date: "2027-09-01", city: "Wuhan", countryCode: "CN" }],
  },
  {
    id: "c-deg-msc",
    slug: "msc-remote-sensing-beijing",
    title: "MSc in Remote Sensing & Earth Observation — Beijing",
    category: "Remote Sensing",
    track: "degree",
    level: "Master's",
    mode: "onsite",
    duration: "2 years",
    priceUSD: 0,
    countries: ["CN"],
    funding: "Fully Funded",
    fundingBreakdown: {
      airfare: true,
      accommodation: true,
      meals: true,
      localTransport: true,
      pocketMoney: true,
    },
    eligibility: [
      "Bachelor's degree in a related field (geography, surveying, engineering, physics)",
      "Research proposal outline",
      "Two academic references",
    ],
    applicationDeadline: "Illustrative — indicative annual window: Jan–Apr",
    organizerContact: {
      name: "Li Wei",
      role: "Scholarship Liaison, Beijing Center",
      email: "liwei@wgih.org",
      phone: "+86 10 5555 0101",
    },
    description:
      "An illustrative fully-funded master's scholarship pathway in remote sensing and Earth observation, including thesis research with partner satellite-data programs. Figures and intake dates are indicative — confirm current offerings directly with WGIH.",
    outline: [
      "Advanced Earth observation theory",
      "SAR and hyperspectral remote sensing",
      "Thesis research with a partner lab",
      "Field campaign participation",
    ],
    sessions: [{ date: "2027-09-01", city: "Beijing", countryCode: "CN" }],
  },
  {
    id: "c-deg-phd",
    slug: "phd-geospatial-sciences",
    title: "PhD in Geospatial Sciences — Joint Program",
    category: "Spatial Analysis",
    track: "degree",
    level: "PhD",
    mode: "onsite",
    duration: "3–4 years",
    priceUSD: 0,
    countries: ["CN"],
    funding: "Partially Funded",
    fundingBreakdown: {
      airfare: false,
      accommodation: true,
      meals: false,
      localTransport: false,
      pocketMoney: true,
    },
    eligibility: [
      "Master's degree in a geospatial, computing or environmental field",
      "Research statement aligned with a partner lab's focus areas",
      "Supervisor match required before formal application",
    ],
    applicationDeadline: "Illustrative — rolling, supervisor-match dependent",
    organizerContact: {
      name: "Li Wei",
      role: "Scholarship Liaison, Beijing Center",
      email: "liwei@wgih.org",
      phone: "+86 10 5555 0101",
    },
    description:
      "An illustrative partially-funded doctoral pathway in geospatial sciences through a joint program with partner research institutions. Stipend amounts and coverage vary by supervisor and funding cycle — confirm current offerings directly with WGIH.",
    outline: [
      "Coursework in advanced geospatial methods",
      "Independent research under a partner-lab supervisor",
      "Conference presentation requirement",
      "Dissertation defense",
    ],
    sessions: [{ date: "2027-03-01", city: "Beijing", countryCode: "CN" }],
  },
  {
    id: "c-deg-postdoc",
    slug: "postdoc-geoai-fellowship",
    title: "Postdoctoral Fellowship — Geospatial AI",
    category: "Spatial Analysis",
    track: "degree",
    level: "Postdoctoral",
    mode: "onsite",
    duration: "1–2 years",
    priceUSD: 0,
    countries: ["CN"],
    funding: "Fully Funded",
    fundingBreakdown: {
      airfare: true,
      accommodation: true,
      meals: false,
      localTransport: false,
      pocketMoney: true,
    },
    eligibility: [
      "PhD completed within the last 5 years in a relevant field",
      "Publication record in remote sensing, GIS or machine learning",
    ],
    applicationDeadline: "Illustrative — indicative annual window: Oct–Dec",
    organizerContact: {
      name: "Li Wei",
      role: "Scholarship Liaison, Beijing Center",
      email: "liwei@wgih.org",
      phone: "+86 10 5555 0101",
    },
    description:
      "An illustrative fully-funded postdoctoral fellowship applying machine learning to satellite and geospatial data, hosted at a partner research center. Figures are indicative — confirm current offerings directly with WGIH.",
    outline: [
      "Independent research agenda in geospatial AI",
      "Co-supervision with partner-lab researchers",
      "Mentorship of graduate students",
      "Publication and grant-writing support",
    ],
    sessions: [{ date: "2027-01-01", city: "Beijing", countryCode: "CN" }],
  },
  {
    id: "c-deg-pgdip",
    slug: "pgdip-gis-nairobi",
    title: "Postgraduate Diploma in Applied GIS — Nairobi",
    category: "GIS",
    track: "degree",
    level: "Other Postgraduate",
    mode: "hybrid",
    duration: "1 year",
    priceUSD: 1200,
    countries: ["KE"],
    funding: "Partially Funded",
    fundingBreakdown: {
      airfare: false,
      accommodation: false,
      meals: false,
      localTransport: false,
      pocketMoney: false,
    },
    eligibility: ["Bachelor's degree in any field", "Working professionals welcome"],
    applicationDeadline: "Illustrative — indicative intake: Feb and Aug",
    organizerContact: {
      name: "Grace Muthoni",
      role: "Academic Coordinator, Nairobi Office",
      email: "grace.muthoni@wgih.org",
      phone: "+254 20 555 0103",
    },
    description:
      "An illustrative partially-funded postgraduate diploma for working professionals transitioning into applied GIS roles, delivered in a hybrid format from Nairobi. Fees shown are indicative — confirm current tuition and funding with WGIH.",
    outline: [
      "GIS fundamentals and spatial databases",
      "Applied remote sensing for East Africa",
      "Capstone: a local land-use project",
    ],
    sessions: [{ date: "2027-02-01", city: "Nairobi", countryCode: "KE" }],
  },
  {
    id: "c-deg-free",
    slug: "free-intro-gis-mooc",
    title: "Introduction to GIS — Free Open Enrollment",
    category: "GIS",
    track: "degree",
    level: "Other Postgraduate",
    mode: "online",
    duration: "4 weeks (self-paced)",
    priceUSD: 0,
    countries: [],
    funding: "Free Participation",
    eligibility: ["Open to all — no prior qualification required"],
    applicationDeadline: "Rolling — open enrollment year-round",
    description:
      "A free, open-enrollment introductory course on GIS concepts, intended as an on-ramp toward WGIH's funded degree and professional pathways. No application needed.",
    outline: [
      "What is GIS and why it matters",
      "Reading and interpreting maps",
      "Hands-on with free desktop GIS tools",
      "Where to go next: degree & professional pathways",
    ],
    sessions: [{ date: "2026-11-01", city: "Online", countryCode: "INT" }],
  },
];

const lorem = (topic: string) =>
  `${topic} — full story. Geospatial professionals around the world are paying close attention as this development unfolds. Experts say the implications for mapping, surveying and location intelligence are significant.\n\nWGIH analysts note that the trend reflects a broader shift in how spatial data is collected, processed and shared. Training demand in this area has grown steadily across our seven country networks.\n\nWe will continue to follow this story and publish updates as more details become available.`;

export const news: Article[] = [
  {
    id: "n1",
    slug: "sentinel-2c-operational",
    title: "Sentinel-2C Now Fully Operational, Boosting Global Land Monitoring",
    category: "Remote Sensing",
    featured: true,
    excerpt:
      "The third Sentinel-2 satellite reaches full operational capacity, improving revisit times for agriculture and land-cover mapping.",
    content: lorem("Sentinel-2C reaches full operations"),
    author: "WGIH Newsroom",
    date: "2026-10-14",
    tags: ["Copernicus", "Satellites"],
    readingTime: 4,
  },
  {
    id: "n2",
    slug: "qgis-4-release",
    title: "QGIS 4.0 Released with Revamped 3D Engine",
    category: "GIS",
    excerpt:
      "The open-source GIS community celebrates a major milestone with faster rendering and a modernized interface.",
    content: lorem("QGIS 4.0 release"),
    author: "WGIH Newsroom",
    date: "2026-10-13",
    tags: ["QGIS", "Open Source"],
    readingTime: 5,
  },
  {
    id: "n3",
    slug: "galileo-high-accuracy",
    title: "Galileo High Accuracy Service Reaches New Precision Milestone",
    category: "GNSS",
    excerpt:
      "Free decimeter-level positioning is now available across Europe and expanding globally.",
    content: lorem("Galileo HAS milestone"),
    author: "WGIH Newsroom",
    date: "2026-10-13",
    tags: ["Galileo", "Positioning"],
    readingTime: 3,
  },
  {
    id: "n4",
    slug: "drone-rules-africa",
    title: "Several African Nations Harmonize Drone Mapping Regulations",
    category: "Drones",
    countryCode: "KE",
    excerpt:
      "A new regional framework simplifies cross-border UAV survey operations for licensed operators.",
    content: lorem("African drone regulation harmonization"),
    author: "WGIH Newsroom",
    date: "2026-10-12",
    tags: ["UAV", "Regulation"],
    readingTime: 4,
  },
  {
    id: "n5",
    slug: "un-ggim-2026",
    title: "UN-GGIM 2026 Summit Announces Geospatial Skills Initiative",
    category: "Events",
    excerpt:
      "The United Nations committee on geospatial information management launches a global training programme.",
    content: lorem("UN-GGIM 2026 summit"),
    author: "WGIH Newsroom",
    date: "2026-10-11",
    tags: ["UN-GGIM", "Summit"],
    readingTime: 4,
  },
  {
    id: "n6",
    slug: "lidar-market-growth",
    title: "LiDAR Market Projected to Double by 2030",
    category: "Industry",
    excerpt:
      "Analysts point to autonomous vehicles, forestry and smart cities as the main growth drivers.",
    content: lorem("LiDAR market growth"),
    author: "WGIH Newsroom",
    date: "2026-10-10",
    tags: ["LiDAR", "Market"],
    readingTime: 3,
  },
  {
    id: "n7",
    slug: "osm-100m",
    title: "OpenStreetMap Passes 100 Million Mapped Buildings in Africa",
    category: "GIS",
    countryCode: "NG",
    excerpt: "Volunteer mappers and AI-assisted tools accelerate coverage of the continent.",
    content: lorem("OSM Africa milestone"),
    author: "WGIH Newsroom",
    date: "2026-10-09",
    tags: ["OpenStreetMap", "Africa"],
    readingTime: 4,
  },
  {
    id: "n8",
    slug: "beidou-agriculture",
    title: "BeiDou-Guided Precision Agriculture Expands Across Asia",
    category: "GNSS",
    countryCode: "CN",
    excerpt:
      "Centimeter-level tractor guidance is cutting fuel and fertilizer costs for thousands of farms.",
    content: lorem("BeiDou precision agriculture"),
    author: "WGIH Newsroom",
    date: "2026-10-08",
    tags: ["BeiDou", "Agriculture"],
    readingTime: 4,
  },
];

export const blog: Article[] = [
  {
    id: "b1",
    slug: "choosing-first-gis",
    title: "Choosing Your First GIS: QGIS vs ArcGIS in 2026",
    category: "Guide",
    excerpt:
      "A practical comparison for students and professionals starting their geospatial journey.",
    content: lorem("QGIS vs ArcGIS comparison"),
    author: "Dr. Amara Chen",
    date: "2026-10-12",
    tags: ["QGIS", "ArcGIS", "Careers"],
    readingTime: 8,
  },
  {
    id: "b2",
    slug: "ndvi-beyond-green",
    title: "NDVI Is Not Enough: Better Vegetation Indices for Drylands",
    category: "Tutorial",
    excerpt: "Why the classic index fails in sparse vegetation, and what to use instead.",
    content: lorem("Vegetation indices for drylands"),
    author: "Prof. David Ochieng",
    date: "2026-10-10",
    tags: ["Remote Sensing", "NDVI"],
    readingTime: 6,
  },
  {
    id: "b3",
    slug: "crs-nightmares",
    title: "Coordinate Reference Systems: A Survival Guide",
    category: "Explainer",
    excerpt: "EPSG codes, datums and projections explained without the headaches.",
    content: lorem("CRS survival guide"),
    author: "Li Wei",
    date: "2026-10-07",
    tags: ["CRS", "Fundamentals"],
    readingTime: 7,
  },
  {
    id: "b4",
    slug: "drone-career",
    title: "From Hobby Pilot to Mapping Professional: A Career Path",
    category: "Careers",
    excerpt: "How drone mapping certifications translate into surveying and inspection careers.",
    content: lorem("Drone mapping career path"),
    author: "Sarah Johnson",
    date: "2026-10-05",
    tags: ["Drones", "Careers"],
    readingTime: 5,
  },
  {
    id: "b5",
    slug: "geopandas-tips",
    title: "10 GeoPandas Tricks That Will Save You Hours",
    category: "Tutorial",
    excerpt:
      "Spatial joins, sindex, dissolve patterns and performance tips for Python geospatial work.",
    content: lorem("GeoPandas tips"),
    author: "Dr. Amara Chen",
    date: "2026-10-02",
    tags: ["Python", "GeoPandas"],
    readingTime: 9,
  },
];

export const testimonials = [
  {
    name: "Mary Wanjiru",
    role: "Surveyor, Nairobi",
    text: "The GNSS course transformed how our field team works. Our local agent arranged everything — even equipment rental.",
  },
  {
    name: "Chen Hao",
    role: "GIS Analyst, Beijing",
    text: "世界地信之家的培训非常专业。The QGIS fundamentals course gave me the confidence to lead projects at work.",
  },
  {
    name: "Ahmed Al Rashid",
    role: "Urban Planner, Dubai",
    text: "Excellent remote sensing training. The instructors connected theory to real municipal projects in our region.",
  },
  {
    name: "Emma Wilson",
    role: "Environmental Consultant, London",
    text: "WGIH's Earth Engine course was the best online training I've taken — practical, current, and well supported.",
  },
];

export const stats = [
  { label: "Country Offices", value: 14, suffix: "" },
  { label: "Partner Companies", value: 180, suffix: "+" },
  { label: "Products Listed", value: 520, suffix: "+" },
  { label: "Deals Facilitated", value: 95, suffix: "+" },
];

// ===================================================================
// Business & cooperation data (representatives, marketplace, partners)
// ===================================================================

/** Seeded demo photo — stable across reloads. Real assets drop in later. */
export const photo = (seed: string, w = 600, h = 400) =>
  `https://picsum.photos/seed/wgih-${seed}/${w}/${h}`;

// Attach demo imagery to existing news/blog so cards and galleries render.
news.forEach((a) => {
  if (!a.image) a.image = photo(`news-${a.id}`, 800, 500);
  if (!a.images) a.images = [a.image, photo(`news-${a.id}-b`, 800, 500)];
});
blog.forEach((a) => {
  if (!a.image) a.image = photo(`blog-${a.id}`, 800, 500);
});

export interface Representative {
  id: string;
  name: string;
  nameZh?: string;
  position: string;
  countryCode: string;
  city: string;
  photo: string;
  email: string;
  phone: string;
  whatsapp: string;
  languages: string[];
  bio: string;
  achievements: string[];
  projectsCompleted: { title: string; summary: string }[];
  projectsOngoing: { title: string; summary: string }[];
  partnerships: string[];
  cooperation: string[];
  // approximate map position in % (left/top) over the stylized world map
  map: { x: number; y: number };
  /** Cultural events hosted or supported by this country office. */
  culturalEvents?: { title: string; date: string }[];
  /** Training and capacity-building activities run locally. */
  trainingActivities?: string[];
  /** Reports and publications from this office (illustrative links). */
  publications?: { title: string; url: string }[];
}

export const representatives: Representative[] = [
  {
    id: "rep-cn",
    name: "Dr. Zhang Wei",
    nameZh: "张伟",
    position: "Global Headquarters Director",
    countryCode: "CN",
    city: "Beijing",
    photo: photo("rep-cn", 400, 400),
    email: "zhang.wei@wgih.org",
    phone: "+86 10 5555 0100",
    whatsapp: "+8613800000001",
    languages: ["Chinese", "English"],
    bio: "Dr. Zhang leads WGIH's global headquarters, coordinating the 14 country offices and driving international cooperation between Chinese industry and overseas partners.",
    achievements: [
      "Established 14 country representative offices",
      "Signed 40+ cooperation agreements",
      "Hosted the annual WGIH Geospatial & Industry Forum in Beijing",
    ],
    projectsCompleted: [
      {
        title: "China–Africa Geospatial Corridor",
        summary:
          "Connected Chinese GIS manufacturers with surveying authorities in 5 African nations.",
      },
    ],
    projectsOngoing: [
      {
        title: "Belt & Road Spatial Data Platform",
        summary:
          "A shared platform promoting Chinese satellite and mapping services across partner countries.",
      },
    ],
    partnerships: [
      "Chinese Academy of Surveying & Mapping",
      "BeiDou Navigation Office",
      "National Remote Sensing Center",
    ],
    cooperation: [
      "Technology transfer",
      "Joint ventures in smart-city GIS",
      "Equipment export partnerships",
    ],
    map: { x: 77, y: 42 },
    culturalEvents: [
      { title: "WGIH Lunar New Year Partner Reception", date: "2027-02-14" },
      { title: "Beijing Geospatial Heritage Exhibition", date: "2026-11-28" },
    ],
    trainingActivities: [
      "Hosts the annual Beijing cohorts of GIS Fundamentals and Remote Sensing courses",
      "Coordinates visiting-scholar placements for trainees from partner countries",
    ],
    publications: [{ title: "WGIH Global Network Annual Report (illustrative)", url: "/news" }],
  },
  {
    id: "rep-ke",
    name: "Grace Muthoni",
    position: "Country Representative — Kenya",
    countryCode: "KE",
    city: "Nairobi",
    photo: photo("rep-ke", 400, 400),
    email: "grace.muthoni@wgih.org",
    phone: "+254 20 555 0103",
    whatsapp: "+254722555103",
    languages: ["English", "Swahili"],
    bio: "Grace represents WGIH across East Africa, linking Chinese manufacturers with agricultural, surveying and renewable-energy buyers in the region.",
    achievements: [
      "Introduced Chinese solar equipment to 30+ Kenyan cooperatives",
      "Organized the Nairobi Geo-Industry Expo",
    ],
    projectsCompleted: [
      {
        title: "Rift Valley Solar Rollout",
        summary:
          "Facilitated supply of Chinese solar panels and inverters to rural electrification projects.",
      },
    ],
    projectsOngoing: [
      {
        title: "Agri-Machinery Buyer Network",
        summary: "Connecting Kenyan farms with Chinese tractor and irrigation manufacturers.",
      },
    ],
    partnerships: ["Kenya National Chamber of Commerce", "University of Nairobi — Geomatics"],
    cooperation: [
      "Agricultural equipment import",
      "Solar & renewable energy",
      "Surveying technology",
    ],
    map: { x: 56, y: 58 },
    culturalEvents: [
      { title: "Nairobi China–Africa Friendship Day", date: "2026-12-06" },
      { title: "East Africa Geospatial Careers Fair", date: "2027-03-20" },
    ],
    trainingActivities: [
      "Runs the Nairobi postgraduate diploma in Applied GIS",
      "Delivers drone-mapping and GNSS field courses for regional surveyors",
    ],
    publications: [{ title: "East Africa Geo-Industry Briefing (illustrative)", url: "/news" }],
  },
  {
    id: "rep-ng",
    name: "Chinedu Okafor",
    position: "Country Representative — Nigeria",
    countryCode: "NG",
    city: "Lagos",
    photo: photo("rep-ng", 400, 400),
    email: "chinedu.okafor@wgih.org",
    phone: "+234 1 555 0104",
    whatsapp: "+2348035550104",
    languages: ["English", "Yoruba"],
    bio: "Chinedu drives WGIH's West Africa business connections, with a focus on automotive, machinery and spare-parts trade.",
    achievements: [
      "Established EV charging pilot in Lagos",
      "Linked 50+ importers with Chinese factories",
    ],
    projectsCompleted: [
      {
        title: "Lagos EV Pilot",
        summary: "Deployed Chinese EV chargers at three commercial sites.",
      },
    ],
    projectsOngoing: [
      {
        title: "Auto Spare-Parts Hub",
        summary: "Building a verified supplier network for Chinese automotive parts.",
      },
    ],
    partnerships: ["Lagos Chamber of Commerce", "Nigerian Automobile Dealers Association"],
    cooperation: ["Electric vehicles", "Automotive spare parts", "Industrial machinery"],
    map: { x: 48, y: 54 },
    culturalEvents: [{ title: "Lagos China Trade & Culture Week", date: "2027-01-22" }],
    trainingActivities: [
      "Supports GNSS surveying training for Lagos-based engineering firms",
      "Runs orientation sessions for auto-parts importers new to the Chinese market",
    ],
    publications: [{ title: "West Africa Automotive Trade Note (illustrative)", url: "/news" }],
  },
  {
    id: "rep-ae",
    name: "Fatima Al Mansoori",
    position: "Country Representative — UAE",
    countryCode: "AE",
    city: "Dubai",
    photo: photo("rep-ae", 400, 400),
    email: "fatima.almansoori@wgih.org",
    phone: "+971 4 555 0105",
    whatsapp: "+971505550105",
    languages: ["Arabic", "English"],
    bio: "Fatima manages WGIH's Gulf operations, positioning Dubai as a re-export gateway for Chinese technology and renewable energy products.",
    achievements: [
      "Set up the Gulf Trade & Investment desk",
      "Facilitated 3 joint-venture signings",
    ],
    projectsCompleted: [
      {
        title: "Smart-City Mapping Deal",
        summary: "Connected a Chinese GIS firm with a Dubai municipal authority.",
      },
    ],
    projectsOngoing: [
      {
        title: "Gulf Renewable Energy JV",
        summary: "Structuring a solar-manufacturing joint venture with Chinese partners.",
      },
    ],
    partnerships: ["Dubai Chamber of Commerce", "Masdar City innovation hub"],
    cooperation: ["Renewable energy", "GIS & smart city", "Trade & re-export"],
    map: { x: 62, y: 47 },
    culturalEvents: [{ title: "Dubai Gulf–China Business Mixer", date: "2027-02-02" }],
    trainingActivities: [
      "Hosts remote-sensing and drone LiDAR sessions at the Dubai training center",
      "Coordinates study visits for Gulf municipal GIS teams",
    ],
    publications: [{ title: "Gulf Trade & Investment Desk Update (illustrative)", url: "/news" }],
  },
  {
    id: "rep-gb",
    name: "Oliver Bennett",
    position: "Country Representative — United Kingdom",
    countryCode: "GB",
    city: "London",
    photo: photo("rep-gb", 400, 400),
    email: "oliver.bennett@wgih.org",
    phone: "+44 20 5555 0106",
    whatsapp: "+447705550106",
    languages: ["English"],
    bio: "Oliver leads WGIH's European business development, focusing on geospatial technology and clean-energy investment flows.",
    achievements: [
      "Opened the London investment liaison office",
      "Hosted UK–China Geo-Tech roundtable",
    ],
    projectsCompleted: [
      {
        title: "EO Data Partnership",
        summary: "Linked a UK analytics startup with Chinese satellite data providers.",
      },
    ],
    projectsOngoing: [
      {
        title: "Green-Tech Investment Bridge",
        summary: "Matching UK investors with Chinese renewable manufacturers.",
      },
    ],
    partnerships: ["Royal Geographical Society", "UK-China Business Council"],
    cooperation: ["Investment matchmaking", "Geospatial software", "Clean technology"],
    map: { x: 46, y: 34 },
    culturalEvents: [{ title: "UK–China Geo-Tech Roundtable Reception", date: "2027-01-15" }],
    trainingActivities: [
      "Delivers the Advanced ArcGIS Pro program from the London office",
      "Runs investor-readiness briefings for clean-tech co-investment matchmaking",
    ],
    publications: [{ title: "Europe Investment Bridge Bulletin (illustrative)", url: "/news" }],
  },
  {
    id: "rep-us",
    name: "Sarah Johnson",
    position: "Country Representative — United States",
    countryCode: "US",
    city: "Denver",
    photo: photo("rep-us", 400, 400),
    email: "sarah.johnson@wgih.org",
    phone: "+1 303 555 0107",
    whatsapp: "+13035550107",
    languages: ["English", "Spanish"],
    bio: "Sarah coordinates WGIH's North America office, supporting technology partnerships and product sourcing.",
    achievements: [
      "Built a 60-company buyer directory",
      "Ran the Denver GeoBusiness meetup series",
    ],
    projectsCompleted: [
      {
        title: "Drone Hardware Sourcing",
        summary: "Connected US surveying firms with Chinese UAV manufacturers.",
      },
    ],
    projectsOngoing: [
      {
        title: "Agri-Tech Exchange",
        summary: "Facilitating precision-agriculture equipment sourcing.",
      },
    ],
    partnerships: ["GIS Certification Institute", "Colorado Trade Office"],
    cooperation: ["UAV & drones", "Precision agriculture", "GIS software"],
    map: { x: 20, y: 40 },
    culturalEvents: [{ title: "Denver GeoBusiness Meetup — Autumn Social", date: "2026-12-11" }],
    trainingActivities: [
      "Hosts Advanced ArcGIS Pro and GNSS RTK sessions for North America",
      "Runs supplier-sourcing briefings for surveying and precision-ag buyers",
    ],
    publications: [{ title: "North America Sourcing Directory (illustrative)", url: "/news" }],
  },
  {
    id: "rep-au",
    name: "Jack Thompson",
    position: "Country Representative — Australia",
    countryCode: "AU",
    city: "Sydney",
    photo: photo("rep-au", 400, 400),
    email: "jack.thompson@wgih.org",
    phone: "+61 2 5555 0108",
    whatsapp: "+61415550108",
    languages: ["English"],
    bio: "Jack manages WGIH's Oceania office, bridging Chinese mining, machinery and renewable suppliers with Australian industry.",
    achievements: [
      "Signed 2 mining-equipment supply agreements",
      "Launched the Sydney clean-energy buyer forum",
    ],
    projectsCompleted: [
      {
        title: "Mining Machinery Supply",
        summary: "Sourced Chinese heavy machinery for a Queensland operator.",
      },
    ],
    projectsOngoing: [
      {
        title: "Rooftop Solar Program",
        summary: "Connecting installers with Chinese panel manufacturers.",
      },
    ],
    partnerships: ["Austrade regional desk", "University of Sydney — Geosciences"],
    cooperation: ["Mining machinery", "Solar energy", "Spatial analytics"],
    map: { x: 83, y: 72 },
    culturalEvents: [{ title: "Sydney Clean-Energy Buyer Forum Social", date: "2027-02-18" }],
    trainingActivities: [
      "Delivers drone mapping and photogrammetry sessions for Oceania surveyors",
      "Coordinates mining-machinery operator training with Chinese suppliers",
    ],
    publications: [{ title: "Oceania Mining & Energy Brief (illustrative)", url: "/news" }],
  },
  {
    id: "rep-et",
    name: "Abel Tesfaye",
    position: "Country Representative — Ethiopia",
    countryCode: "ET",
    city: "Addis Ababa",
    photo: photo("rep-et", 400, 400),
    email: "abel.tesfaye@wgih.org",
    phone: "+251 11 555 0109",
    whatsapp: "+251911550109",
    languages: ["Amharic", "English"],
    bio: "Abel develops WGIH's Horn of Africa cooperation, with a focus on agricultural mechanization and infrastructure mapping.",
    achievements: [
      "Introduced Chinese irrigation systems to 20 farms",
      "Supported the national geospatial survey program",
    ],
    projectsCompleted: [
      {
        title: "Agri-Mechanization Pilot",
        summary: "Delivered Chinese tractors and tillers to cooperative farms.",
      },
    ],
    projectsOngoing: [
      {
        title: "Infrastructure Mapping",
        summary: "Supplying GNSS and drone survey equipment for road projects.",
      },
    ],
    partnerships: ["Ethiopian Geospatial Institute", "Addis Ababa Chamber of Commerce"],
    cooperation: ["Agricultural machinery", "Survey equipment", "Infrastructure"],
    map: { x: 57, y: 53 },
    culturalEvents: [{ title: "Addis Ababa Harvest & Trade Festival", date: "2026-12-20" }],
    trainingActivities: [
      "Supports the national geospatial survey program with GNSS training",
      "Runs agri-mechanization operator training alongside equipment deliveries",
    ],
    publications: [
      { title: "Horn of Africa Infrastructure Mapping Note (illustrative)", url: "/news" },
    ],
  },
  {
    id: "rep-eg",
    name: "Omar Hassan",
    position: "Country Representative — Egypt",
    countryCode: "EG",
    city: "Cairo",
    photo: photo("rep-eg", 400, 400),
    email: "omar.hassan@wgih.org",
    phone: "+20 2 555 0110",
    whatsapp: "+201005550110",
    languages: ["Arabic", "English"],
    bio: "Omar leads WGIH's North Africa desk, promoting renewable energy and construction machinery cooperation.",
    achievements: ["Facilitated a solar-farm equipment deal", "Built a 40-importer network"],
    projectsCompleted: [
      {
        title: "Desert Solar Supply",
        summary: "Sourced Chinese PV modules for a utility-scale project.",
      },
    ],
    projectsOngoing: [
      {
        title: "Construction Machinery Hub",
        summary: "Connecting contractors with Chinese equipment makers.",
      },
    ],
    partnerships: ["Federation of Egyptian Industries", "Cairo University — Engineering"],
    cooperation: ["Solar energy", "Construction machinery", "Spare parts"],
    map: { x: 55, y: 45 },
    culturalEvents: [{ title: "Cairo China Trade & Culture Evening", date: "2027-01-08" }],
    trainingActivities: [
      "Co-hosts seminars with Cairo University Engineering on solar deployment",
      "Runs construction-machinery operator orientation for new importers",
    ],
    publications: [
      { title: "North Africa Solar & Construction Note (illustrative)", url: "/news" },
    ],
  },
  {
    id: "rep-pk",
    name: "Imran Khan",
    position: "Country Representative — Pakistan",
    countryCode: "PK",
    city: "Islamabad",
    photo: photo("rep-pk", 400, 400),
    email: "imran.khan@wgih.org",
    phone: "+92 51 555 0111",
    whatsapp: "+923005550111",
    languages: ["Urdu", "English"],
    bio: "Imran manages WGIH's South Asia cooperation under the China–Pakistan economic corridor framework.",
    achievements: [
      "Linked 25 firms to Chinese suppliers",
      "Organized the Islamabad Industry Connect expo",
    ],
    projectsCompleted: [
      {
        title: "CPEC Equipment Supply",
        summary: "Facilitated machinery sourcing for corridor projects.",
      },
    ],
    projectsOngoing: [
      {
        title: "EV Charging Rollout",
        summary: "Piloting Chinese EV charging stations in major cities.",
      },
    ],
    partnerships: ["CPEC Authority", "Lahore Chamber of Commerce"],
    cooperation: ["EV charging", "Industrial machinery", "Energy"],
    map: { x: 66, y: 44 },
    culturalEvents: [
      { title: "Islamabad Industry Connect Expo — Culture Night", date: "2027-02-25" },
    ],
    trainingActivities: [
      "Delivers GNSS surveying training for CPEC corridor engineering teams",
      "Runs EV-charging technician onboarding for pilot city deployments",
    ],
    publications: [{ title: "CPEC Equipment & Mobility Update (illustrative)", url: "/news" }],
  },
  {
    id: "rep-br",
    name: "Lucas Almeida",
    position: "Country Representative — Brazil",
    countryCode: "BR",
    city: "São Paulo",
    photo: photo("rep-br", 400, 400),
    email: "lucas.almeida@wgih.org",
    phone: "+55 11 5555 0112",
    whatsapp: "+5511955550112",
    languages: ["Portuguese", "English"],
    bio: "Lucas develops WGIH's South America operations, focusing on agriculture, EVs and renewable energy.",
    achievements: ["Opened the São Paulo trade desk", "Facilitated 2 agri-equipment deals"],
    projectsCompleted: [
      { title: "Agri-Equipment Import", summary: "Sourced Chinese harvesters for soy producers." },
    ],
    projectsOngoing: [
      { title: "EV Fleet Program", summary: "Connecting fleet operators with Chinese EV makers." },
    ],
    partnerships: ["São Paulo Federation of Industries", "ApexBrasil"],
    cooperation: ["Electric vehicles", "Agricultural machinery", "Renewables"],
    map: { x: 32, y: 65 },
    culturalEvents: [{ title: "São Paulo China–Brazil Trade Fair", date: "2027-03-05" }],
    trainingActivities: [
      "Runs agri-equipment operator training for soy-sector cooperatives",
      "Supports EV fleet-management onboarding for pilot operators",
    ],
    publications: [
      { title: "South America Agri-Tech Exchange Brief (illustrative)", url: "/news" },
    ],
  },
  {
    id: "rep-id",
    name: "Siti Rahayu",
    position: "Country Representative — Indonesia",
    countryCode: "ID",
    city: "Jakarta",
    photo: photo("rep-id", 400, 400),
    email: "siti.rahayu@wgih.org",
    phone: "+62 21 555 0113",
    whatsapp: "+6281155550113",
    languages: ["Indonesian", "English"],
    bio: "Siti leads WGIH's Southeast Asia cooperation, with strong demand for electronics, solar and machinery.",
    achievements: ["Built a 35-company buyer club", "Hosted the Jakarta Green Energy forum"],
    projectsCompleted: [
      {
        title: "Island Solar Supply",
        summary: "Delivered Chinese off-grid solar kits to remote islands.",
      },
    ],
    projectsOngoing: [
      {
        title: "Electronics Sourcing",
        summary: "Connecting distributors with Chinese electronics factories.",
      },
    ],
    partnerships: ["Indonesian Chamber of Commerce (KADIN)", "University of Indonesia"],
    cooperation: ["Solar energy", "Electronics", "Machinery"],
    map: { x: 78, y: 60 },
    culturalEvents: [
      { title: "Jakarta Green Energy Forum — Cultural Evening", date: "2027-01-29" },
    ],
    trainingActivities: [
      "Runs off-grid solar installer training for island-electrification teams",
      "Coordinates electronics-distribution onboarding for new partners",
    ],
    publications: [
      { title: "Southeast Asia Island Electrification Report (illustrative)", url: "/news" },
    ],
  },
  {
    id: "rep-za",
    name: "Thabo Nkosi",
    position: "Country Representative — South Africa",
    countryCode: "ZA",
    city: "Johannesburg",
    photo: photo("rep-za", 400, 400),
    email: "thabo.nkosi@wgih.org",
    phone: "+27 11 555 0114",
    whatsapp: "+2782555114",
    languages: ["English", "Zulu"],
    bio: "Thabo manages WGIH's Southern Africa desk, bridging mining, energy and automotive trade with Chinese industry.",
    achievements: ["Signed a mining-equipment MoU", "Launched the Johannesburg trade mixer"],
    projectsCompleted: [
      {
        title: "Mining Supply Deal",
        summary: "Sourced Chinese processing equipment for a mining group.",
      },
    ],
    projectsOngoing: [
      {
        title: "EV & Charging Study",
        summary: "Assessing EV charging rollout with Chinese partners.",
      },
    ],
    partnerships: ["South African Chamber of Commerce", "University of the Witwatersrand"],
    cooperation: ["Mining machinery", "EV charging", "Automotive"],
    map: { x: 54, y: 72 },
    culturalEvents: [{ title: "Johannesburg Trade Mixer — Culture & Cuisine", date: "2027-02-10" }],
    trainingActivities: [
      "Runs mining-equipment operator and maintenance training",
      "Supports EV-charging feasibility workshops with Chinese partners",
    ],
    publications: [
      { title: "Southern Africa Mining Equipment Brief (illustrative)", url: "/news" },
    ],
  },
  {
    id: "rep-de",
    name: "Anna Müller",
    position: "Country Representative — Germany",
    countryCode: "DE",
    city: "Berlin",
    photo: photo("rep-de", 400, 400),
    email: "anna.mueller@wgih.org",
    phone: "+49 30 5555 0115",
    whatsapp: "+4915155550115",
    languages: ["German", "English"],
    bio: "Anna leads WGIH's Central Europe office, focusing on high-tech partnerships, automotive and clean-energy investment.",
    achievements: [
      "Opened the Berlin innovation liaison",
      "Facilitated a battery-tech partnership",
    ],
    projectsCompleted: [
      {
        title: "Battery Tech Link",
        summary: "Connected a German automaker with Chinese battery suppliers.",
      },
    ],
    projectsOngoing: [
      {
        title: "Clean-Energy Investment",
        summary: "Matching German investors with Chinese renewable firms.",
      },
    ],
    partnerships: ["German Chamber of Industry (DIHK)", "Fraunhofer collaboration network"],
    cooperation: ["Automotive & batteries", "Clean energy", "Advanced manufacturing"],
    map: { x: 49, y: 33 },
    culturalEvents: [{ title: "Berlin Innovation Liaison — Autumn Reception", date: "2026-12-04" }],
    trainingActivities: [
      "Hosts joint R&D exchange sessions with Fraunhofer collaboration network",
      "Runs battery-technology briefings for automotive partnership prospects",
    ],
    publications: [
      { title: "Central Europe Advanced Manufacturing Note (illustrative)", url: "/news" },
    ],
  },
];

// ---- Promotional sponsors (paid advertising placements) ----
export interface Sponsor {
  id: string;
  name: string;
  nameZh?: string;
  tagline: string;
  category: string;
  color: string; // brand tile color
  link: string; // internal company page or external url
  featured?: boolean;
}

export const sponsors: Sponsor[] = [
  {
    id: "sp1",
    name: "SunDragon Solar",
    nameZh: "太阳龙",
    tagline: "Tier-1 solar panels & inverters",
    category: "Renewable Energy",
    color: "#f59e0b",
    link: "/marketplace/co-sundragon",
    featured: true,
  },
  {
    id: "sp2",
    name: "GeoSphere Tech",
    nameZh: "地球科技",
    tagline: "GNSS receivers & GIS software",
    category: "Geospatial",
    color: "#0ea5e9",
    link: "/marketplace/co-geosphere",
    featured: true,
  },
  {
    id: "sp3",
    name: "DragonDrive EV",
    nameZh: "龙驱动",
    tagline: "Electric vehicles & charging",
    category: "Automotive",
    color: "#10b981",
    link: "/marketplace/co-dragondrive",
    featured: true,
  },
  {
    id: "sp4",
    name: "GreatWall Machinery",
    nameZh: "长城机械",
    tagline: "Agricultural & industrial machines",
    category: "Machinery",
    color: "#ef4444",
    link: "/marketplace/co-greatwall",
    featured: true,
  },
  {
    id: "sp5",
    name: "VoltCharge Networks",
    nameZh: "伏充网络",
    tagline: "Smart EV charging stations",
    category: "EV Charging",
    color: "#8b5cf6",
    link: "/marketplace/co-voltcharge",
    featured: true,
  },
  {
    id: "sp6",
    name: "SkyMap UAV",
    nameZh: "天图无人机",
    tagline: "Survey & mapping drones",
    category: "Geospatial",
    color: "#06b6d4",
    link: "/marketplace/co-skymap",
    featured: true,
  },
];

// ---- Marketplace: categories, companies and products ----
export interface ProductCategory {
  id: string;
  name: string;
  nameZh: string;
  icon: string; // lucide icon name
  blurb: string;
}

export const productCategories: ProductCategory[] = [
  {
    id: "ev",
    name: "Cars & Electric Vehicles",
    nameZh: "汽车与电动车",
    icon: "Car",
    blurb: "Electric cars, buses and commercial EVs from leading Chinese makers.",
  },
  {
    id: "machinery",
    name: "Agricultural & Industrial Machinery",
    nameZh: "农业与工业机械",
    icon: "Tractor",
    blurb: "Tractors, harvesters, construction and factory equipment.",
  },
  {
    id: "gis",
    name: "GIS & Geospatial Products",
    nameZh: "地理信息产品",
    icon: "Satellite",
    blurb: "GNSS receivers, survey drones, mapping software and sensors.",
  },
  {
    id: "solar",
    name: "Solar & Renewable Energy",
    nameZh: "太阳能与可再生能源",
    icon: "Sun",
    blurb: "PV panels, inverters, batteries and off-grid energy kits.",
  },
  {
    id: "charging",
    name: "EV Charging Stations",
    nameZh: "电动车充电站",
    icon: "Plug",
    blurb: "AC/DC chargers and smart charging network hardware.",
  },
  {
    id: "parts",
    name: "Automotive Spare Parts",
    nameZh: "汽车配件",
    icon: "Wrench",
    blurb: "OEM and aftermarket parts for cars, trucks and machinery.",
  },
  {
    id: "electronics",
    name: "Electronics & Others",
    nameZh: "电子产品及其他",
    icon: "Cpu",
    blurb: "Industrial electronics, components and smart devices.",
  },
];

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  photos: string[];
  description: string;
  specs: { label: string; value: string }[];
}

export interface Company {
  id: string;
  name: string;
  nameZh: string;
  categoryId: string;
  logoColor: string;
  city: string;
  founded: string;
  description: string;
  cover: string;
  verified: boolean;
  products: Product[];
  /** Factory & manufacturer detail-page fields (illustrative). */
  factoryPhotos?: string[];
  productionCapacity?: string;
  machinery?: string[];
  certifications?: string[];
  exportMarkets?: string[]; // country codes
  videoUrl?: string;
  /** Private factory contact, revealed via the information-access unlock. */
  contact?: { name: string; role: string; email: string; phone: string };
}

export const companies: Company[] = [
  {
    id: "co-dragondrive",
    name: "DragonDrive EV",
    nameZh: "龙驱动新能源",
    categoryId: "ev",
    logoColor: "#10b981",
    city: "Shenzhen",
    founded: "2015",
    description:
      "A fast-growing manufacturer of electric cars, buses and light commercial vehicles, exporting to over 30 countries.",
    cover: photo("co-dragondrive", 1000, 400),
    verified: true,
    products: [
      {
        id: "p-dd-1",
        name: "DragonDrive D5 Sedan",
        categoryId: "ev",
        photos: [photo("p-dd-1a"), photo("p-dd-1b"), photo("p-dd-1c")],
        description:
          "Mid-size electric sedan with a 500 km range, fast-charging and advanced driver assistance.",
        specs: [
          { label: "Range", value: "500 km (CLTC)" },
          { label: "Battery", value: "64 kWh LFP" },
          { label: "Charging", value: "30–80% in 28 min" },
          { label: "Seats", value: "5" },
        ],
      },
      {
        id: "p-dd-2",
        name: "DragonDrive eBus 12m",
        categoryId: "ev",
        photos: [photo("p-dd-2a"), photo("p-dd-2b")],
        description: "12-meter electric city bus designed for public transport fleets.",
        specs: [
          { label: "Range", value: "300 km" },
          { label: "Capacity", value: "90 passengers" },
          { label: "Battery", value: "350 kWh" },
        ],
      },
      {
        id: "p-dd-3",
        name: "DragonDrive V2 Van",
        categoryId: "ev",
        photos: [photo("p-dd-3a"), photo("p-dd-3b")],
        description: "Electric cargo van for last-mile delivery.",
        specs: [
          { label: "Range", value: "280 km" },
          { label: "Payload", value: "1,200 kg" },
          { label: "Volume", value: "6.5 m³" },
        ],
      },
    ],
  },
  {
    id: "co-greatwall",
    name: "GreatWall Machinery",
    nameZh: "长城机械",
    categoryId: "machinery",
    logoColor: "#ef4444",
    city: "Zhengzhou",
    founded: "2003",
    description:
      "Manufacturer of agricultural and industrial machinery, from tractors to construction equipment.",
    cover: photo("co-greatwall", 1000, 400),
    verified: true,
    products: [
      {
        id: "p-gw-1",
        name: "GW-904 Tractor",
        categoryId: "machinery",
        photos: [photo("p-gw-1a"), photo("p-gw-1b")],
        description: "90 HP 4WD agricultural tractor suited for medium and large farms.",
        specs: [
          { label: "Power", value: "90 HP" },
          { label: "Drive", value: "4WD" },
          { label: "Transmission", value: "16+8 shuttle" },
        ],
      },
      {
        id: "p-gw-2",
        name: "GW Combine Harvester",
        categoryId: "machinery",
        photos: [photo("p-gw-2a"), photo("p-gw-2b")],
        description: "Grain combine harvester for wheat, rice and corn.",
        specs: [
          { label: "Cutting width", value: "3.0 m" },
          { label: "Grain tank", value: "2,500 L" },
        ],
      },
      {
        id: "p-gw-3",
        name: "GW Mini Excavator",
        categoryId: "machinery",
        photos: [photo("p-gw-3a"), photo("p-gw-3b")],
        description: "Compact 3.5-ton excavator for construction and landscaping.",
        specs: [
          { label: "Weight", value: "3.5 t" },
          { label: "Dig depth", value: "3.2 m" },
        ],
      },
    ],
  },
  {
    id: "co-geosphere",
    name: "GeoSphere Tech",
    nameZh: "地球科技",
    categoryId: "gis",
    logoColor: "#0ea5e9",
    city: "Wuhan",
    founded: "2010",
    description:
      "Geospatial technology firm making GNSS receivers, total stations and GIS/mapping software.",
    cover: photo("co-geosphere", 1000, 400),
    verified: true,
    products: [
      {
        id: "p-gs-1",
        name: "GeoSphere RTK Receiver G7",
        categoryId: "gis",
        photos: [photo("p-gs-1a"), photo("p-gs-1b")],
        description: "Multi-constellation GNSS RTK receiver with centimeter accuracy.",
        specs: [
          { label: "Channels", value: "1,408" },
          { label: "Accuracy", value: "8 mm + 1 ppm" },
          { label: "Constellations", value: "GPS/BeiDou/Galileo/GLONASS" },
        ],
      },
      {
        id: "p-gs-2",
        name: "GeoSphere Total Station T2",
        categoryId: "gis",
        photos: [photo("p-gs-2a"), photo("p-gs-2b")],
        description: "2-second precision total station for surveying.",
        specs: [
          { label: "Accuracy", value: '2"' },
          { label: "Range", value: "5 km (prism)" },
        ],
      },
      {
        id: "p-gs-3",
        name: "GeoSphere GIS Cloud",
        categoryId: "gis",
        photos: [photo("p-gs-3a"), photo("p-gs-3b")],
        description: "Web GIS platform for data management, mapping and spatial analysis.",
        specs: [
          { label: "Deployment", value: "Cloud / on-premise" },
          { label: "Formats", value: "Shapefile, GeoJSON, WMS/WMTS" },
        ],
      },
    ],
  },
  {
    id: "co-skymap",
    name: "SkyMap UAV",
    nameZh: "天图无人机",
    categoryId: "gis",
    logoColor: "#06b6d4",
    city: "Chengdu",
    founded: "2016",
    description:
      "Survey and mapping drone manufacturer serving surveying, agriculture and inspection markets.",
    cover: photo("co-skymap", 1000, 400),
    verified: true,
    products: [
      {
        id: "p-sm-1",
        name: "SkyMap S400 Survey Drone",
        categoryId: "gis",
        photos: [photo("p-sm-1a"), photo("p-sm-1b")],
        description: "Fixed-wing mapping drone with 90-minute endurance.",
        specs: [
          { label: "Endurance", value: "90 min" },
          { label: "Coverage", value: "800 ha / flight" },
          { label: "Camera", value: "61 MP" },
        ],
      },
      {
        id: "p-sm-2",
        name: "SkyMap L1 LiDAR Drone",
        categoryId: "gis",
        photos: [photo("p-sm-2a"), photo("p-sm-2b")],
        description: "Multirotor LiDAR drone for corridor and forestry mapping.",
        specs: [
          { label: "Sensor", value: "Integrated LiDAR" },
          { label: "Accuracy", value: "±3 cm" },
        ],
      },
    ],
  },
  {
    id: "co-sundragon",
    name: "SunDragon Solar",
    nameZh: "太阳龙新能源",
    categoryId: "solar",
    logoColor: "#f59e0b",
    city: "Hefei",
    founded: "2008",
    description:
      "Tier-1 solar manufacturer producing PV panels, inverters and energy storage systems.",
    cover: photo("co-sundragon", 1000, 400),
    verified: true,
    products: [
      {
        id: "p-sd-1",
        name: "SunDragon 580W Bifacial Panel",
        categoryId: "solar",
        photos: [photo("p-sd-1a"), photo("p-sd-1b")],
        description: "High-efficiency bifacial monocrystalline PV module.",
        specs: [
          { label: "Power", value: "580 W" },
          { label: "Efficiency", value: "22.5%" },
          { label: "Warranty", value: "30 years" },
        ],
      },
      {
        id: "p-sd-2",
        name: "SunDragon Hybrid Inverter 10kW",
        categoryId: "solar",
        photos: [photo("p-sd-2a"), photo("p-sd-2b")],
        description: "Hybrid solar inverter with battery support.",
        specs: [
          { label: "Output", value: "10 kW" },
          { label: "MPPT", value: "Dual" },
        ],
      },
      {
        id: "p-sd-3",
        name: "SunDragon PowerWall 10kWh",
        categoryId: "solar",
        photos: [photo("p-sd-3a"), photo("p-sd-3b")],
        description: "LFP home energy storage battery.",
        specs: [
          { label: "Capacity", value: "10 kWh" },
          { label: "Chemistry", value: "LiFePO₄" },
          { label: "Cycles", value: "6,000+" },
        ],
      },
    ],
  },
  {
    id: "co-voltcharge",
    name: "VoltCharge Networks",
    nameZh: "伏充网络",
    categoryId: "charging",
    logoColor: "#8b5cf6",
    city: "Hangzhou",
    founded: "2018",
    description: "Smart EV charging hardware and network management for public and fleet charging.",
    cover: photo("co-voltcharge", 1000, 400),
    verified: true,
    products: [
      {
        id: "p-vc-1",
        name: "VoltCharge DC Fast Charger 120kW",
        categoryId: "charging",
        photos: [photo("p-vc-1a"), photo("p-vc-1b")],
        description: "Dual-gun DC fast charger for public stations.",
        specs: [
          { label: "Power", value: "120 kW" },
          { label: "Connectors", value: "CCS2 / GB/T" },
          { label: "Protection", value: "IP54" },
        ],
      },
      {
        id: "p-vc-2",
        name: "VoltCharge AC Wallbox 22kW",
        categoryId: "charging",
        photos: [photo("p-vc-2a"), photo("p-vc-2b")],
        description: "Smart AC wallbox for homes and workplaces.",
        specs: [
          { label: "Power", value: "22 kW" },
          { label: "Connectivity", value: "4G / Wi-Fi / OCPP" },
        ],
      },
    ],
  },
  {
    id: "co-autoparts",
    name: "EastWind Auto Parts",
    nameZh: "东风配件",
    categoryId: "parts",
    logoColor: "#64748b",
    city: "Shiyan",
    founded: "2001",
    description:
      "OEM and aftermarket automotive spare parts for passenger cars, trucks and machinery.",
    cover: photo("co-autoparts", 1000, 400),
    verified: true,
    products: [
      {
        id: "p-ap-1",
        name: "Brake Pad Set (Universal Range)",
        categoryId: "parts",
        photos: [photo("p-ap-1a"), photo("p-ap-1b")],
        description: "Ceramic brake pads covering 200+ vehicle models.",
        specs: [
          { label: "Material", value: "Ceramic" },
          { label: "Coverage", value: "200+ models" },
        ],
      },
      {
        id: "p-ap-2",
        name: "Suspension Kit",
        categoryId: "parts",
        photos: [photo("p-ap-2a"), photo("p-ap-2b")],
        description: "Complete suspension kit for light commercial vehicles.",
        specs: [{ label: "Includes", value: "Shocks, springs, bushings" }],
      },
    ],
  },
  {
    id: "co-electron",
    name: "BrightCore Electronics",
    nameZh: "明芯电子",
    categoryId: "electronics",
    logoColor: "#3b82f6",
    city: "Dongguan",
    founded: "2012",
    description: "Industrial electronics, IoT modules and smart devices for OEM and distribution.",
    cover: photo("co-electron", 1000, 400),
    verified: true,
    products: [
      {
        id: "p-el-1",
        name: "BrightCore IoT Gateway",
        categoryId: "electronics",
        photos: [photo("p-el-1a"), photo("p-el-1b")],
        description: "Industrial IoT gateway with 4G/LoRa connectivity.",
        specs: [
          { label: "Connectivity", value: "4G / LoRa / Ethernet" },
          { label: "Protocols", value: "Modbus, MQTT" },
        ],
      },
      {
        id: "p-el-2",
        name: "BrightCore Smart Meter",
        categoryId: "electronics",
        photos: [photo("p-el-2a"), photo("p-el-2b")],
        description: "Smart energy meter for buildings and solar systems.",
        specs: [
          { label: "Phases", value: "Single / 3-phase" },
          { label: "Comms", value: "RS485 / Wi-Fi" },
        ],
      },
    ],
  },
];

export function getCompanyById(id: string) {
  return companies.find((c) => c.id === id);
}

// Attach illustrative factory / manufacturer detail data to companies that
// don't already specify it, so manufacturer detail pages render in full.
const capacityByCategory: Record<string, string> = {
  ev: "120,000 vehicles / year",
  machinery: "15,000 units / year",
  gis: "80,000 instruments / year",
  solar: "3 GW of modules / year",
  charging: "60,000 chargers / year",
  parts: "20M parts / year",
  electronics: "5M units / year",
};
const machineryByCategory: Record<string, string[]> = {
  ev: ["Robotic body-welding line", "Battery pack assembly", "End-of-line test track"],
  machinery: ["CNC machining centers", "Robotic welding cells", "Paint & assembly line"],
  gis: ["SMT electronics lines", "Precision calibration lab", "Environmental test chambers"],
  solar: ["Cell stringers", "Lamination lines", "EL/flash testers"],
  charging: ["SMT assembly", "Power-module burn-in", "IP-rating test rigs"],
  parts: ["Forging presses", "CNC lines", "Coordinate measuring machines"],
  electronics: ["SMT pick-and-place", "Reflow ovens", "Automated optical inspection"],
};
const certsCommon = ["ISO 9001", "ISO 14001", "CE"];
const certsByCategory: Record<string, string[]> = {
  ev: [...certsCommon, "IATF 16949"],
  machinery: [...certsCommon, "EAC"],
  gis: [...certsCommon, "FCC"],
  solar: [...certsCommon, "IEC 61215", "TÜV"],
  charging: [...certsCommon, "OCPP 1.6/2.0"],
  parts: [...certsCommon, "IATF 16949"],
  electronics: [...certsCommon, "RoHS", "FCC"],
};
companies.forEach((c) => {
  if (!c.factoryPhotos)
    c.factoryPhotos = [
      photo(`${c.id}-factory-1`, 800, 500),
      photo(`${c.id}-factory-2`, 800, 500),
      photo(`${c.id}-factory-3`, 800, 500),
    ];
  if (!c.productionCapacity)
    c.productionCapacity = capacityByCategory[c.categoryId] ?? "Large-scale production";
  if (!c.machinery)
    c.machinery = machineryByCategory[c.categoryId] ?? ["Automated production lines"];
  if (!c.certifications) c.certifications = certsByCategory[c.categoryId] ?? certsCommon;
  if (!c.exportMarkets) c.exportMarkets = ["KE", "NG", "AE", "BR", "ID", "ZA"];
  if (!c.contact)
    c.contact = {
      name: "Export Sales Department",
      role: `${c.name} · International Trade`,
      email: `export@${c.id.replace(/^co-/, "")}.example.cn`,
      phone: "+86 400 000 0000",
    };
});

// ---- Partners & collaborators ----
export interface Partner {
  id: string;
  name: string;
  type: "Company" | "University" | "Factory" | "Research" | "Institution";
  /** Named category per the Our Partners directory spec. */
  tier: "Strategic" | "Government" | "Academic" | "Technology" | "Manufacturing" | "International";
  country: string;
  color: string;
  blurb?: string;
  cooperation?: string[];
}

export const partners: Partner[] = [
  {
    id: "pt1",
    name: "Chinese Academy of Surveying & Mapping",
    type: "Research",
    tier: "Strategic",
    country: "🇨🇳",
    color: "#ef4444",
    blurb:
      "WGIH's founding technical partner for national surveying standards and training content.",
    cooperation: ["Curriculum development", "Standards alignment"],
  },
  {
    id: "pt2",
    name: "BeiDou Navigation Office",
    type: "Institution",
    tier: "Government",
    country: "🇨🇳",
    color: "#f59e0b",
    blurb: "Supports GNSS training content and positioning-accuracy initiatives.",
    cooperation: ["GNSS training", "Positioning accuracy programs"],
  },
  {
    id: "pt3",
    name: "Wuhan University",
    type: "University",
    tier: "Academic",
    country: "🇨🇳",
    color: "#0ea5e9",
    blurb: "Academic partner for geomatics degree pathways and joint research.",
    cooperation: ["Degree program hosting", "Joint research"],
  },
  {
    id: "pt4",
    name: "Tsinghua Geomatics Lab",
    type: "Research",
    tier: "Academic",
    country: "🇨🇳",
    color: "#8b5cf6",
    blurb: "Research collaboration on geospatial AI and remote-sensing methods.",
    cooperation: ["Geospatial AI research", "Postdoctoral fellowships"],
  },
  {
    id: "pt5",
    name: "University of Nairobi",
    type: "University",
    tier: "Academic",
    country: "🇰🇪",
    color: "#10b981",
    blurb: "Hosts WGIH's East Africa postgraduate diploma and local research links.",
    cooperation: ["Postgraduate diploma hosting", "Local research"],
  },
  {
    id: "pt6",
    name: "Lagos Chamber of Commerce",
    type: "Institution",
    tier: "Government",
    country: "🇳🇬",
    color: "#22c55e",
    blurb: "Facilitates trade introductions and regulatory navigation in Nigeria.",
    cooperation: ["Trade facilitation", "Regulatory guidance"],
  },
  {
    id: "pt7",
    name: "Dubai Chamber of Commerce",
    type: "Institution",
    tier: "Government",
    country: "🇦🇪",
    color: "#eab308",
    blurb: "Supports Gulf trade and re-export partnerships for WGIH companies.",
    cooperation: ["Gulf trade desk", "Re-export partnerships"],
  },
  {
    id: "pt8",
    name: "Royal Geographical Society",
    type: "Institution",
    tier: "International",
    country: "🇬🇧",
    color: "#3b82f6",
    blurb: "International cooperation on geospatial education and public outreach.",
    cooperation: ["Education outreach", "International cooperation"],
  },
  {
    id: "pt9",
    name: "GIS Certification Institute",
    type: "Institution",
    tier: "International",
    country: "🇺🇸",
    color: "#06b6d4",
    blurb: "Certification pathway recognition for WGIH professional programs.",
    cooperation: ["Professional certification recognition"],
  },
  {
    id: "pt10",
    name: "University of Sydney",
    type: "University",
    tier: "Academic",
    country: "🇦🇺",
    color: "#14b8a6",
    blurb: "Academic exchange and Oceania research partnerships.",
    cooperation: ["Academic exchange", "Research partnerships"],
  },
  {
    id: "pt11",
    name: "Fraunhofer Institute",
    type: "Research",
    tier: "Technology",
    country: "🇩🇪",
    color: "#64748b",
    blurb: "Technology collaboration on advanced manufacturing and sensing R&D.",
    cooperation: ["Advanced manufacturing R&D", "Sensor technology"],
  },
  {
    id: "pt12",
    name: "Cairo University",
    type: "University",
    tier: "Academic",
    country: "🇪🇬",
    color: "#f97316",
    blurb: "North Africa academic partner for engineering and geospatial programs.",
    cooperation: ["Academic exchange", "Joint seminars"],
  },
  {
    id: "pt13",
    name: "CPEC Authority",
    type: "Institution",
    tier: "Government",
    country: "🇵🇰",
    color: "#16a34a",
    blurb: "Coordinates corridor infrastructure cooperation under CPEC.",
    cooperation: ["Infrastructure cooperation", "Equipment sourcing"],
  },
  {
    id: "pt14",
    name: "ApexBrasil",
    type: "Institution",
    tier: "Government",
    country: "🇧🇷",
    color: "#facc15",
    blurb: "Brazilian trade promotion agency supporting WGIH market entry.",
    cooperation: ["Trade promotion", "Market entry support"],
  },
  {
    id: "pt15",
    name: "SunDragon Solar Factory",
    type: "Factory",
    tier: "Manufacturing",
    country: "🇨🇳",
    color: "#f59e0b",
    blurb: "Tier-1 solar manufacturing partner for panels and storage systems.",
    cooperation: ["Manufacturing partnership", "Export distribution"],
  },
  {
    id: "pt16",
    name: "GreatWall Machinery Works",
    type: "Factory",
    tier: "Manufacturing",
    country: "🇨🇳",
    color: "#dc2626",
    blurb: "Agricultural and industrial machinery manufacturing partner.",
    cooperation: ["Manufacturing partnership", "Localization JVs"],
  },
  {
    id: "pt17",
    name: "KADIN Indonesia",
    type: "Institution",
    tier: "Government",
    country: "🇮🇩",
    color: "#0891b2",
    blurb: "Indonesian chamber of commerce supporting market access.",
    cooperation: ["Market access", "Trade facilitation"],
  },
  {
    id: "pt18",
    name: "University of the Witwatersrand",
    type: "University",
    tier: "Academic",
    country: "🇿🇦",
    color: "#7c3aed",
    blurb: "Southern Africa academic partner for mining-geospatial research.",
    cooperation: ["Mining geospatial research", "Academic exchange"],
  },
];

// ---- Business & investment opportunities ----
export interface Opportunity {
  id: string;
  type: "Joint Venture" | "Investment" | "Partner Wanted" | "Distribution";
  title: string;
  countryCode: string;
  sector: string;
  summary: string;
  featured?: boolean;
  /** Long-form description shown on the detail page (illustrative). */
  description?: string;
  /** What the project or partnership concretely needs. */
  projectRequirements?: string[];
  /** The kind of partner, dealer or investor being sought. */
  desiredPartnerProfile?: string[];
  /** Investment framing — rendered for Investment & Joint Venture types. */
  investmentExpectations?: {
    range?: string;
    structure?: string;
    returnExpectations?: string;
    timeline?: string;
  };
  /** Areas of cooperation on offer. */
  cooperationOpportunities?: string[];
  /** Illustrative lead contact, revealed via the information-access unlock. */
  contact?: { name: string; role: string; email: string; phone: string };
}

export const opportunities: Opportunity[] = [
  {
    id: "op1",
    type: "Joint Venture",
    title: "Solar panel assembly plant JV",
    countryCode: "KE",
    sector: "Renewable Energy",
    featured: true,
    summary:
      "Chinese Tier-1 solar manufacturer seeks a local partner to establish an assembly plant serving East Africa.",
    description:
      "A Tier-1 Chinese solar manufacturer is seeking a Kenyan joint-venture partner to establish a panel-assembly plant near Nairobi, serving the wider East African Community market. The Chinese party brings module technology, production lines and technical staff; the local partner contributes land, regulatory navigation, workforce and regional sales channels. This is an illustrative opportunity — confirm current terms with WGIH.",
    projectRequirements: [
      "Industrial land or serviced plot of 2–4 hectares near Nairobi",
      "Local company registration and EPZ/manufacturing licensing",
      "Access to grid power and logistics corridor to Mombasa port",
      "Local workforce of 80–120 for assembly and QA",
    ],
    desiredPartnerProfile: [
      "Established local industrial or energy company",
      "Experience with government and utility procurement",
      "Ability to co-invest equity and manage local operations",
      "Clean regulatory and financial standing",
    ],
    investmentExpectations: {
      range: "US$6–10M total project cost",
      structure: "51% local / 49% Chinese equity joint venture",
      returnExpectations: "Target payback 4–6 years on regional panel sales",
      timeline: "Plant commissioning within 12–18 months of signing",
    },
    cooperationOpportunities: [
      "Technology transfer and operator training",
      "Shared regional distribution network",
      "After-sales and warranty service centre",
    ],
    contact: {
      name: "Grace Muthoni",
      role: "WGIH Country Representative — Kenya",
      email: "grace.muthoni@wgih.org",
      phone: "+254 20 555 0103",
    },
  },
  {
    id: "op2",
    type: "Investment",
    title: "EV charging network investment",
    countryCode: "NG",
    sector: "EV Charging",
    featured: true,
    summary:
      "Investors sought for a nationwide EV charging rollout, partnering with a Chinese charging-hardware maker.",
    description:
      "A project company is seeking investors for a phased rollout of EV charging stations across Nigeria's major cities, built on hardware from a Chinese charging-network manufacturer. The opportunity pairs capital with proven charging technology and an operations partner. Illustrative figures — verify with WGIH before committing.",
    projectRequirements: [
      "Phase-1 deployment of 120 DC fast-charging points in Lagos and Abuja",
      "Site agreements with malls, fuel retailers and fleet depots",
      "Grid connection and backup power provisioning",
      "Network management and billing platform (OCPP)",
    ],
    desiredPartnerProfile: [
      "Infrastructure or impact investors",
      "Appetite for 5–7 year horizon in emerging mobility",
      "Optional: local fleet or real-estate strategic co-investor",
    ],
    investmentExpectations: {
      range: "US$4M Phase-1 equity + debt",
      structure: "SPV with staged capital calls per deployment phase",
      returnExpectations: "Blended IRR 14–18% (illustrative)",
      timeline: "Phase 1 live within 10 months",
    },
    cooperationOpportunities: [
      "Exclusive hardware supply and maintenance agreement",
      "Co-branding with a Chinese charging network",
      "Expansion rights to additional Nigerian states",
    ],
    contact: {
      name: "Chinedu Okafor",
      role: "WGIH Country Representative — Nigeria",
      email: "chinedu.okafor@wgih.org",
      phone: "+234 1 555 0104",
    },
  },
  {
    id: "op3",
    type: "Partner Wanted",
    title: "Distributor for GNSS equipment",
    countryCode: "BR",
    sector: "Geospatial",
    summary:
      "Chinese GNSS manufacturer looking for an established surveying-equipment distributor in South America.",
    description:
      "A Chinese GNSS and surveying-instrument manufacturer is appointing an authorized distributor for Brazil and neighbouring markets. The manufacturer offers dealer pricing, demo units, technical training and marketing support. Illustrative terms — confirm with WGIH.",
    projectRequirements: [
      "Existing surveying / geospatial equipment sales channel",
      "Technical support and calibration capability",
      "Import and tax-handling experience for instruments",
      "Minimum annual purchase commitment (negotiable)",
    ],
    desiredPartnerProfile: [
      "Established surveying-equipment distributor or reseller",
      "Nationwide or multi-state reach in Brazil",
      "After-sales service team and demo capacity",
    ],
    cooperationOpportunities: [
      "Authorized dealer pricing and territory rights",
      "Product and RTK workflow training",
      "Joint marketing at regional surveying expos",
    ],
    contact: {
      name: "Lucas Almeida",
      role: "WGIH Country Representative — Brazil",
      email: "lucas.almeida@wgih.org",
      phone: "+55 11 5555 0112",
    },
  },
  {
    id: "op4",
    type: "Joint Venture",
    title: "Agri-machinery localization",
    countryCode: "ET",
    sector: "Machinery",
    summary:
      "Tractor manufacturer offers a joint venture to localize assembly and after-sales service.",
    description:
      "A Chinese tractor and agricultural-machinery manufacturer proposes a joint venture to localize assembly, parts stocking and after-sales service in Ethiopia, supporting the national agricultural-mechanization agenda. Illustrative opportunity — confirm with WGIH.",
    projectRequirements: [
      "Assembly workshop and parts warehouse near Addis Ababa",
      "Trained service technicians and mobile support units",
      "Dealer sub-network across major farming regions",
    ],
    desiredPartnerProfile: [
      "Agricultural distributor, cooperative union or industrial group",
      "Rural dealer relationships",
      "Ability to co-invest in assembly and service capacity",
    ],
    investmentExpectations: {
      range: "US$3–5M total project cost",
      structure: "Majority-local equity joint venture",
      returnExpectations: "Volume-driven margins on units + parts + service",
      timeline: "Assembly operational within 12 months",
    },
    cooperationOpportunities: [
      "CKD/SKD assembly technology transfer",
      "Operator and mechanic training programs",
      "Government mechanization-tender participation",
    ],
    contact: {
      name: "Abel Tesfaye",
      role: "WGIH Country Representative — Ethiopia",
      email: "abel.tesfaye@wgih.org",
      phone: "+251 11 555 0109",
    },
  },
  {
    id: "op5",
    type: "Investment",
    title: "Renewable manufacturing fund",
    countryCode: "GB",
    sector: "Clean Energy",
    summary:
      "Investment vehicle matching European capital with Chinese renewable-energy manufacturers.",
    description:
      "A UK-based investment vehicle is being assembled to match European capital with Chinese renewable-energy manufacturers expanding into Western markets. The fund targets module, inverter and storage producers with localization plans. Illustrative structure — verify with WGIH.",
    projectRequirements: [
      "Deal pipeline of Chinese renewable manufacturers",
      "Due-diligence and compliance framework",
      "Local manufacturing or warehousing expansion plans",
    ],
    desiredPartnerProfile: [
      "Institutional and family-office investors",
      "ESG / clean-energy mandate",
      "Long-horizon growth capital",
    ],
    investmentExpectations: {
      range: "£20M target first close",
      structure: "Closed-end fund, 8-year term",
      returnExpectations: "Target net IRR 12–16% (illustrative)",
      timeline: "First close within 9 months",
    },
    cooperationOpportunities: [
      "Co-investment alongside strategic partners",
      "Board and operational value-add",
      "Access to Chinese manufacturer deal flow via WGIH",
    ],
    contact: {
      name: "Oliver Bennett",
      role: "WGIH Country Representative — United Kingdom",
      email: "oliver.bennett@wgih.org",
      phone: "+44 20 5555 0106",
    },
  },
  {
    id: "op6",
    type: "Distribution",
    title: "Auto spare-parts re-export hub",
    countryCode: "AE",
    sector: "Automotive",
    featured: true,
    summary:
      "Re-export distribution partnership for Chinese automotive parts across the Gulf and Africa.",
    description:
      "A Chinese automotive spare-parts manufacturer seeks a Dubai-based distribution partner to run a re-export hub serving the Gulf and African markets, leveraging Jebel Ali free-zone logistics. Illustrative terms — confirm with WGIH.",
    projectRequirements: [
      "Free-zone warehousing and inventory financing",
      "Re-export logistics across Gulf and East/West Africa",
      "Catalogue and parts-lookup system for 200+ models",
    ],
    desiredPartnerProfile: [
      "Established auto-parts trader or logistics company",
      "Free-zone presence (JAFZA or similar)",
      "Regional reseller network",
    ],
    cooperationOpportunities: [
      "Exclusive regional distribution rights",
      "Consignment stock and credit terms",
      "Private-label parts program",
    ],
    contact: {
      name: "Fatima Al Mansoori",
      role: "WGIH Country Representative — UAE",
      email: "fatima.almansoori@wgih.org",
      phone: "+971 4 555 0105",
    },
  },
  {
    id: "op7",
    type: "Partner Wanted",
    title: "Smart-city GIS integrator",
    countryCode: "AE",
    sector: "GIS",
    summary:
      "Chinese GIS firm seeks a system-integration partner for municipal smart-city projects.",
    description:
      "A Chinese GIS and smart-city software firm is seeking a Gulf system-integration partner to deliver municipal mapping, utilities and urban-planning platforms. The firm provides the platform, APIs and engineering support; the partner leads local delivery and government relationships. Illustrative opportunity — confirm with WGIH.",
    projectRequirements: [
      "Local system-integration and delivery team",
      "Government and municipal client relationships",
      "Data-hosting and compliance within the UAE",
    ],
    desiredPartnerProfile: [
      "IT / GIS system integrator",
      "Public-sector project track record",
      "Pre-sales and solution-architecture capability",
    ],
    cooperationOpportunities: [
      "Platform reseller and implementation rights",
      "Joint bids on municipal smart-city tenders",
      "Local R&D and support centre",
    ],
    contact: {
      name: "Fatima Al Mansoori",
      role: "WGIH Country Representative — UAE",
      email: "fatima.almansoori@wgih.org",
      phone: "+971 4 555 0105",
    },
  },
  {
    id: "op8",
    type: "Joint Venture",
    title: "Battery technology partnership",
    countryCode: "DE",
    sector: "Automotive",
    summary:
      "Battery supplier seeks a technology and manufacturing joint venture with a European automaker.",
    description:
      "A Chinese battery-cell supplier is seeking a technology and manufacturing joint venture with a European automaker or tier-1 supplier to localize cell and pack production. Illustrative framing — verify current terms with WGIH.",
    projectRequirements: [
      "Site for gigafactory-scale cell or pack assembly",
      "Automotive-grade quality systems (IATF 16949)",
      "Skilled engineering and production workforce",
    ],
    desiredPartnerProfile: [
      "European automaker or tier-1 supplier",
      "EV platform volume commitments",
      "Co-investment and offtake capacity",
    ],
    investmentExpectations: {
      range: "€150M+ phased project (illustrative)",
      structure: "Technology-licensing + manufacturing JV",
      returnExpectations: "Secured offtake-driven returns",
      timeline: "Pilot line within 18–24 months",
    },
    cooperationOpportunities: [
      "Cell chemistry and pack-design transfer",
      "Joint R&D on next-gen chemistries",
      "Localized supply chain development",
    ],
    contact: {
      name: "Anna Müller",
      role: "WGIH Country Representative — Germany",
      email: "anna.mueller@wgih.org",
      phone: "+49 30 5555 0115",
    },
  },
  {
    id: "op9",
    type: "Investment",
    title: "Off-grid solar for islands",
    countryCode: "ID",
    sector: "Renewable Energy",
    summary:
      "Funding sought to deploy Chinese off-grid solar kits across remote Indonesian islands.",
    description:
      "Funding is sought to deploy Chinese off-grid solar-plus-storage kits to electrify remote Indonesian island communities, under a pay-as-you-go or concession model. Illustrative opportunity — confirm with WGIH.",
    projectRequirements: [
      "Phase-1 deployment across 15 island communities",
      "Local installation and maintenance network",
      "PAYG metering and mobile-money collection",
    ],
    desiredPartnerProfile: [
      "Impact / development-finance investors",
      "Rural-electrification experience preferred",
      "Patient capital with social-return mandate",
    ],
    investmentExpectations: {
      range: "US$2.5M Phase-1",
      structure: "Blended finance (grant + equity + concessional debt)",
      returnExpectations: "Modest financial + high social return",
      timeline: "Phase 1 within 12 months",
    },
    cooperationOpportunities: [
      "Equipment supply and warranty",
      "Local jobs and technician training",
      "Scale-up rights to further island clusters",
    ],
    contact: {
      name: "Siti Rahayu",
      role: "WGIH Country Representative — Indonesia",
      email: "siti.rahayu@wgih.org",
      phone: "+62 21 555 0113",
    },
  },
  {
    id: "op10",
    type: "Partner Wanted",
    title: "Mining equipment reseller",
    countryCode: "ZA",
    sector: "Machinery",
    summary:
      "Chinese heavy-machinery maker looking for a mining-sector reseller in Southern Africa.",
    description:
      "A Chinese heavy-machinery manufacturer is appointing a reseller for mining and processing equipment across Southern Africa, with dealer pricing, parts stocking and field-service support. Illustrative terms — confirm with WGIH.",
    projectRequirements: [
      "Established mining-sector sales relationships",
      "Field-service and parts-stocking capability",
      "Finance or leasing options for buyers",
    ],
    desiredPartnerProfile: [
      "Mining-equipment dealer or industrial distributor",
      "Regional reach across Southern Africa",
      "Technical service workshops",
    ],
    cooperationOpportunities: [
      "Authorized reseller territory rights",
      "Demo fleet and operator training",
      "Parts and consumables supply agreement",
    ],
    contact: {
      name: "Thabo Nkosi",
      role: "WGIH Country Representative — South Africa",
      email: "thabo.nkosi@wgih.org",
      phone: "+27 11 555 0114",
    },
  },
];

export function getOpportunityById(id: string) {
  return opportunities.find((o) => o.id === id);
}

// ---- Featured company of the month ----
export const companyOfMonth = {
  companyId: "co-sundragon",
  month: "November 2026",
  highlight:
    "SunDragon Solar is our featured manufacturer this month for its 580W bifacial panels now powering electrification projects across three continents through WGIH partners.",
};

// ===================================================================
// Homepage design data — hero slides, core services, pulse news,
// events, multimedia gallery, featured Chinese brands
// ===================================================================

// ---- Hero slider ----
export interface HeroSlide {
  id: string;
  title: string; // full headline
  highlight: string; // substring of title rendered in accent/gold
  subtitle: string;
  ctaLabel: string;
  ctaTo: string;
  image: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "hs1",
    title: "Global Geospatial for a Smarter World",
    highlight: "Smarter World",
    subtitle: "Innovation • Cooperation • Shared Prosperity",
    ctaLabel: "Explore Our Solutions",
    ctaTo: "/marketplace",
    image: photo("hero-satellite", 1600, 800),
  },
  {
    id: "hs2",
    title: "Connecting the World through Geospatial Technology",
    highlight: "Geospatial Technology",
    subtitle: "14 country offices • Worldwide collaboration",
    ctaLabel: "Our Global Network",
    ctaTo: "/representatives",
    image: photo("hero-earth-night", 1600, 800),
  },
  {
    id: "hs3",
    title: "Empowering Chinese Manufacturers Worldwide",
    highlight: "Chinese Manufacturers",
    subtitle: "Trade • Investment • Joint Ventures",
    ctaLabel: "Browse Marketplace",
    ctaTo: "/marketplace",
    image: photo("hero-network-globe", 1600, 800),
  },
];

// ---- Core services (6 cards) ----
export interface CoreService {
  id: string;
  icon: string; // lucide icon name
  title: string;
  tagline: string;
  buttonLabel: string;
  to: string;
  color: string; // button + icon accent (hex)
}

export const coreServices: CoreService[] = [
  {
    id: "svc-space",
    icon: "Satellite",
    title: "Space & Geospatial Solutions",
    tagline: "From space to society",
    buttonLabel: "Learn More",
    to: "/solutions",
    color: "#2563eb",
  },
  {
    id: "svc-business",
    icon: "Building2",
    title: "Business & Opportunities",
    tagline: "Connect with China",
    buttonLabel: "Explore",
    to: "/business",
    color: "#1d4ed8",
  },
  {
    id: "svc-marketplace",
    icon: "ShoppingCart",
    title: "Marketplace",
    tagline: "Products & Suppliers",
    buttonLabel: "Browse",
    to: "/business",
    color: "#0ea5e9",
  },
  {
    id: "svc-training",
    icon: "GraduationCap",
    title: "Academy & Training",
    tagline: "Learn • Grow • Excel",
    buttonLabel: "Apply Now",
    to: "/training",
    color: "#2563eb",
  },
  {
    id: "svc-projects",
    icon: "Handshake",
    title: "Projects & Partnerships",
    tagline: "Build Together",
    buttonLabel: "Partner",
    to: "/business",
    color: "#1d4ed8",
  },
  {
    id: "svc-offices",
    icon: "Globe2",
    title: "Country Offices",
    tagline: "Global Network",
    buttonLabel: "Explore",
    to: "/representatives",
    color: "#0ea5e9",
  },
];

// ---- Pulse News Today (side panel) ----
export interface PulseNewsItem {
  id: string;
  date: string; // display date e.g. "Nov 12 2026"
  title: string;
  image: string;
  slug: string;
}

export const pulseNews: PulseNewsItem[] = [
  {
    id: "pn1",
    date: "Nov 12 2026",
    title: "International Geospatial Conference Opens in Beijing",
    image: photo("pulse-beijing", 200, 160),
    slug: "un-ggim-2026",
  },
  {
    id: "pn2",
    date: "Nov 10 2026",
    title: "New Satellite Ground Station Commissioned",
    image: photo("pulse-groundstation", 200, 160),
    slug: "sentinel-2c-operational",
  },
  {
    id: "pn3",
    date: "Nov 08 2026",
    title: "Global Partners Explore New Opportunities",
    image: photo("pulse-partners", 200, 160),
    slug: "lidar-market-growth",
  },
  {
    id: "pn4",
    date: "Nov 05 2026",
    title: "BeiDou Precision Agriculture Expands Across Asia",
    image: photo("pulse-beidou", 200, 160),
    slug: "beidou-agriculture",
  },
  {
    id: "pn5",
    date: "Nov 02 2026",
    title: "QGIS 4.0 Released with Revamped 3D Engine",
    image: photo("pulse-qgis", 200, 160),
    slug: "qgis-4-release",
  },
];

// ---- Featured event banner (below pulse news) ----
export const featuredEvent = {
  title: "WGIH 2026 International Summit",
  location: "Beijing, China",
  dateRange: "Nov. 20–22, 2026",
  image: photo("event-summit-hall", 600, 300),
  to: "/news",
};

// ---- Latest events (homepage strip + News & Events upcoming/completed) ----
export interface EventItem {
  id: string;
  title: string;
  location: string;
  countryCode?: string;
  day: string; // e.g. "20-22"
  monthYear: string; // e.g. "NOV 2026"
  image: string;
  to: string;
  completed?: boolean;
}

export const latestEvents: EventItem[] = [
  {
    id: "ev1",
    title: "WGIH 2026 International Summit",
    location: "Beijing, China",
    countryCode: "CN",
    day: "20-22",
    monthYear: "NOV 2026",
    image: photo("latest-summit", 400, 300),
    to: "/news",
  },
  {
    id: "ev2",
    title: "Africa Geo-Industry Expo",
    location: "Nairobi, Kenya",
    countryCode: "KE",
    day: "05",
    monthYear: "DEC 2026",
    image: photo("latest-nairobi", 400, 300),
    to: "/news",
  },
  {
    id: "ev3",
    title: "Gulf Trade & Investment Forum",
    location: "Dubai, UAE",
    countryCode: "AE",
    day: "14",
    monthYear: "DEC 2026",
    image: photo("latest-dubai", 400, 300),
    to: "/news",
  },
  {
    id: "ev4",
    title: "WGIH Geospatial & Industry Forum",
    location: "Beijing, China",
    countryCode: "CN",
    day: "03-05",
    monthYear: "SEP 2026",
    image: photo("latest-forum", 400, 300),
    to: "/news",
    completed: true,
  },
  {
    id: "ev5",
    title: "Nairobi Geo-Industry Expo",
    location: "Nairobi, Kenya",
    countryCode: "KE",
    day: "18",
    monthYear: "AUG 2026",
    image: photo("latest-nairobi-expo", 400, 300),
    to: "/news",
    completed: true,
  },
];

// ---- Multimedia gallery (photos + video previews) ----
export interface GalleryItem {
  id: string;
  type: "photo" | "video";
  image: string;
  title: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    type: "photo",
    image: photo("gallery-dish", 300, 220),
    title: "Satellite ground dish",
  },
  { id: "g2", type: "video", image: photo("gallery-launch", 300, 220), title: "Launch highlights" },
  { id: "g3", type: "photo", image: photo("gallery-forum", 300, 220), title: "WGIH forum" },
  { id: "g4", type: "video", image: photo("gallery-field", 300, 220), title: "Field survey" },
];

// ---- Featured Chinese companies (logo cards, premium strip) ----
export interface FeaturedBrand {
  id: string;
  name: string;
  color: string;
  to: string;
}

export const featuredBrands: FeaturedBrand[] = [
  { id: "fb1", name: "HUAWEI", color: "#e4002b", to: "/marketplace" },
  { id: "fb2", name: "DJI", color: "#111827", to: "/marketplace" },
  { id: "fb3", name: "CATL", color: "#1e3a8a", to: "/marketplace" },
  { id: "fb4", name: "SANY", color: "#dc2626", to: "/marketplace" },
];

// ---- Homepage partner logos (carousel strip) ----
export interface PartnerLogo {
  id: string;
  name: string;
  color: string;
}

export const partnerLogos: PartnerLogo[] = [
  { id: "pl1", name: "ESA", color: "#003247" },
  { id: "pl2", name: "AIRBUS", color: "#00205b" },
  { id: "pl3", name: "HUAWEI", color: "#e4002b" },
  { id: "pl4", name: "Tencent", color: "#0ea5e9" },
  { id: "pl5", name: "CASC", color: "#1e3a8a" },
  { id: "pl6", name: "DJI", color: "#111827" },
  { id: "pl7", name: "CATL", color: "#1d4ed8" },
];
