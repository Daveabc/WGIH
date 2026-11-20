import { photo } from "@/data/mock";

export interface Solution {
  id: string;
  slug: string;
  name: string;
  icon: string; // lucide icon name
  category: string;
  heroImage: string;
  summary: string;
  challenge: string;
  workflow: string[];
  dataRequirements: string[];
  softwareCapabilities: string[];
  hardware: string[];
  outputs: string[];
}

export const solutions: Solution[] = [
  {
    id: "sol-survey",
    slug: "surveying-mapping",
    name: "Surveying & Mapping",
    icon: "Ruler",
    category: "Core Geospatial",
    heroImage: photo("sol-survey", 1200, 600),
    summary:
      "High-accuracy ground, aerial and satellite surveying for cadastral and engineering projects.",
    challenge:
      "Governments and engineering firms need accurate, up-to-date spatial baselines for land records, infrastructure design and legal boundaries, but traditional ground surveys are slow and costly to maintain at scale.",
    workflow: [
      "Define survey extent and accuracy requirements",
      "Establish GNSS control points and base stations",
      "Capture data via RTK, total station and/or drone photogrammetry",
      "Process point clouds and adjust to national datum",
      "Produce cadastral or topographic deliverables",
      "Quality-check against control points and deliver to client",
    ],
    dataRequirements: [
      "National geodetic reference frame / datum parameters",
      "Existing cadastral or topographic baseline (if any)",
      "Site access permissions and control-point locations",
    ],
    softwareCapabilities: [
      "GNSS post-processing and network adjustment",
      "Photogrammetry and point-cloud processing",
      "CAD/GIS integration for deliverable production",
    ],
    hardware: [
      "Multi-constellation GNSS RTK receivers",
      "Total stations",
      "Mapping-grade survey drones",
    ],
    outputs: [
      "Georeferenced topographic and cadastral maps",
      "Digital terrain models (DTM)",
      "Survey control reports",
    ],
  },
  {
    id: "sol-disaster",
    slug: "disaster-monitoring-early-warning",
    name: "Disaster Monitoring & Early Warning",
    icon: "AlertTriangle",
    category: "Resilience",
    heroImage: photo("sol-disaster", 1200, 600),
    summary:
      "Satellite and sensor-based monitoring for flood, landslide, drought and seismic risk.",
    challenge:
      "Disaster-prone regions need timely, wide-area monitoring to issue warnings before floods, landslides or droughts cause loss of life and livelihoods, but ground-sensor networks alone can't cover large or remote areas.",
    workflow: [
      "Identify hazard zones and historical event data",
      "Integrate satellite (SAR, optical) and in-situ sensor feeds",
      "Run hazard models and anomaly detection",
      "Trigger alert thresholds and notification workflows",
      "Validate with field teams and update models post-event",
    ],
    dataRequirements: [
      "Historical hazard and event records",
      "Digital elevation models (DEM)",
      "Near-real-time satellite SAR/optical imagery",
      "Rainfall and hydrological sensor data (where available)",
    ],
    softwareCapabilities: [
      "SAR change detection and flood extent mapping",
      "Hydrological and landslide-susceptibility modeling",
      "Alert dashboard and notification integration",
    ],
    hardware: [
      "Ground-based rainfall and water-level sensors",
      "Communication gateways for remote sites",
    ],
    outputs: [
      "Flood/landslide risk maps",
      "Early-warning alert bulletins",
      "Post-event damage assessment maps",
    ],
  },
  {
    id: "sol-agri",
    slug: "precision-agriculture",
    name: "Precision Agriculture",
    icon: "Wheat",
    category: "Agriculture",
    heroImage: photo("sol-agri", 1200, 600),
    summary:
      "Satellite and drone-driven crop monitoring, variable-rate inputs and yield forecasting.",
    challenge:
      "Farms and agribusinesses need to optimize fertilizer, water and pesticide use while forecasting yields, but uniform field management wastes inputs and misses early signs of crop stress.",
    workflow: [
      "Define field boundaries and crop calendar",
      "Capture multispectral imagery (satellite or drone)",
      "Calculate vegetation indices (NDVI, EVI) over the season",
      "Generate variable-rate application maps",
      "Monitor yield outcomes and refine the model",
    ],
    dataRequirements: [
      "Field boundary polygons",
      "Multispectral/NDVI imagery time-series",
      "Soil and historical yield data (where available)",
    ],
    softwareCapabilities: [
      "Vegetation index calculation and crop-health analytics",
      "Variable-rate prescription-map generation",
      "Yield prediction modeling",
    ],
    hardware: [
      "Multispectral drones",
      "GNSS-guided tractors / RTK guidance",
      "Soil moisture sensors",
    ],
    outputs: [
      "Crop-health and stress maps",
      "Variable-rate application prescriptions",
      "Yield forecast reports",
    ],
  },
  {
    id: "sol-mining",
    slug: "mining-mineral-resources",
    name: "Mining & Mineral Resources",
    icon: "Mountain",
    category: "Resources",
    heroImage: photo("sol-mining", 1200, 600),
    summary:
      "Geospatial exploration, pit mapping and environmental compliance for mining operations.",
    challenge:
      "Mining operators need accurate volumetric, geological and environmental data to plan extraction, manage stockpiles and meet compliance obligations, often across difficult terrain.",
    workflow: [
      "Acquire geological and satellite exploration data",
      "Fly drone/LiDAR surveys of pits and stockpiles",
      "Generate volumetric and geological models",
      "Monitor slope stability and environmental indicators",
      "Report compliance metrics to regulators",
    ],
    dataRequirements: [
      "Geological survey and exploration drilling data",
      "LiDAR or photogrammetric pit surveys",
      "Environmental baseline data (water, vegetation)",
    ],
    softwareCapabilities: [
      "Volumetric and stockpile calculation",
      "Geological modeling and resource estimation",
      "Slope-stability and subsidence monitoring",
    ],
    hardware: ["LiDAR survey drones", "Ground-based radar for slope monitoring"],
    outputs: [
      "Pit and stockpile volumetric reports",
      "Geological resource models",
      "Environmental compliance maps",
    ],
  },
  {
    id: "sol-smartcity",
    slug: "smart-cities-urban-planning",
    name: "Smart Cities & Urban Planning",
    icon: "Building2",
    category: "Urban",
    heroImage: photo("sol-smartcity", 1200, 600),
    summary:
      "3D city models, zoning analytics and infrastructure planning for growing urban centers.",
    challenge:
      "Rapidly urbanizing cities need integrated spatial data to plan zoning, utilities and transport, but legacy 2D maps can't support the 3D and real-time analysis modern smart-city initiatives require.",
    workflow: [
      "Capture oblique aerial/drone imagery of the city",
      "Build 3D building and infrastructure models",
      "Integrate zoning, utility and transport layers",
      "Run growth and land-use scenario analysis",
      "Publish a web GIS portal for planners and the public",
    ],
    dataRequirements: [
      "Cadastral and zoning datasets",
      "Oblique aerial or drone imagery",
      "Utility network records",
    ],
    softwareCapabilities: [
      "3D city modeling and digital-twin platforms",
      "Zoning and land-use scenario analytics",
      "Web GIS portal publishing",
    ],
    hardware: ["Oblique-camera survey aircraft/drones", "LiDAR scanners"],
    outputs: [
      "3D city digital twin",
      "Zoning and growth-scenario maps",
      "Public-facing planning portal",
    ],
  },
  {
    id: "sol-env",
    slug: "environmental-forest-monitoring",
    name: "Environmental & Forest Monitoring",
    icon: "Trees",
    category: "Environment",
    heroImage: photo("sol-env", 1200, 600),
    summary: "Deforestation tracking, biodiversity mapping and carbon-stock estimation.",
    challenge:
      "Forest agencies and conservation groups must detect illegal logging and track ecosystem health over vast, often inaccessible areas, where manual patrols cannot provide timely or complete coverage.",
    workflow: [
      "Define forest extent and baseline canopy data",
      "Run automated deforestation-alert detection on satellite imagery",
      "Dispatch field verification for high-confidence alerts",
      "Estimate biomass and carbon stock",
      "Report to regulators and conservation partners",
    ],
    dataRequirements: [
      "Historical forest-cover baseline",
      "Multi-temporal satellite imagery (optical + SAR)",
      "Species and biodiversity survey records",
    ],
    softwareCapabilities: [
      "Automated change/deforestation detection",
      "Biomass and carbon-stock estimation",
      "Biodiversity habitat mapping",
    ],
    hardware: ["Acoustic/camera trap sensors", "Survey drones for canopy sampling"],
    outputs: [
      "Deforestation alert reports",
      "Carbon-stock estimation maps",
      "Biodiversity habitat maps",
    ],
  },
  {
    id: "sol-water",
    slug: "water-resources",
    name: "Water Resources",
    icon: "Droplets",
    category: "Resources",
    heroImage: photo("sol-water", 1200, 600),
    summary: "Watershed mapping, reservoir monitoring and irrigation-efficiency analytics.",
    challenge:
      "Water authorities need to track reservoir levels, watershed health and irrigation efficiency across basins, but manual gauging networks are sparse and slow to update.",
    workflow: [
      "Delineate watershed and basin boundaries",
      "Integrate satellite-derived reservoir and soil-moisture data",
      "Model water balance and irrigation demand",
      "Monitor water-quality indicators remotely",
      "Report basin-level status to stakeholders",
    ],
    dataRequirements: [
      "Digital elevation model for watershed delineation",
      "Satellite reservoir / surface-water extent data",
      "Irrigation-scheme boundaries and crop-water demand data",
    ],
    softwareCapabilities: [
      "Watershed delineation and hydrological modeling",
      "Reservoir-level time-series analytics",
      "Irrigation-efficiency dashboards",
    ],
    hardware: ["Water-level and flow sensors", "Water-quality monitoring buoys"],
    outputs: [
      "Watershed and basin maps",
      "Reservoir-level trend reports",
      "Irrigation-efficiency dashboards",
    ],
  },
  {
    id: "sol-transport",
    slug: "transport-logistics",
    name: "Transport & Logistics",
    icon: "Truck",
    category: "Infrastructure",
    heroImage: photo("sol-transport", 1200, 600),
    summary: "Route optimization, fleet tracking and transport-corridor infrastructure mapping.",
    challenge:
      "Logistics operators and transport authorities need accurate road-network data and real-time fleet visibility to cut costs and plan corridor investments, but many regions lack reliable digital road data.",
    workflow: [
      "Map and classify the road/rail network",
      "Integrate GNSS fleet-tracking data",
      "Model route optimization and corridor demand",
      "Identify infrastructure bottlenecks and risks",
      "Report network condition to planners",
    ],
    dataRequirements: [
      "Road/rail network geometry and condition data",
      "Fleet GNSS tracking feeds",
      "Freight/traffic volume data",
    ],
    softwareCapabilities: [
      "Route optimization and network analysis",
      "Fleet-tracking dashboards",
      "Corridor demand modeling",
    ],
    hardware: ["Vehicle GNSS trackers", "Roadside traffic sensors"],
    outputs: [
      "Road-network condition maps",
      "Optimized route plans",
      "Corridor investment reports",
    ],
  },
  {
    id: "sol-energy",
    slug: "energy-utilities",
    name: "Energy & Utilities",
    icon: "Zap",
    category: "Infrastructure",
    heroImage: photo("sol-energy", 1200, 600),
    summary: "Grid asset mapping, renewable-site assessment and utility network management.",
    challenge:
      "Utilities need precise asset inventories and renewable-site assessments to plan grid expansion and clean-energy projects, but many networks still rely on outdated paper or disconnected records.",
    workflow: [
      "Survey and geolocate grid assets (poles, substations, lines)",
      "Assess renewable-energy site suitability (solar/wind resource)",
      "Build a GIS-based asset management system",
      "Model outage and maintenance scheduling",
      "Report asset condition and expansion priorities",
    ],
    dataRequirements: [
      "Grid asset inventory and as-built drawings",
      "Solar irradiance / wind-resource datasets",
      "Outage and maintenance history",
    ],
    softwareCapabilities: [
      "GIS-based asset management",
      "Renewable-site suitability analysis",
      "Outage and maintenance scheduling tools",
    ],
    hardware: [
      "Drone inspection platforms for lines and substations",
      "GNSS asset-tagging devices",
    ],
    outputs: [
      "Grid asset maps",
      "Renewable-site suitability reports",
      "Maintenance scheduling plans",
    ],
  },
  {
    id: "sol-construction",
    slug: "construction-infrastructure",
    name: "Construction & Infrastructure",
    icon: "HardHat",
    category: "Infrastructure",
    heroImage: photo("sol-construction", 1200, 600),
    summary: "BIM-integrated site surveying, progress monitoring and as-built verification.",
    challenge:
      "Construction projects need continuous progress tracking against design to control costs and schedule, but manual site inspections are slow and often miss discrepancies until late in the build.",
    workflow: [
      "Establish site control and baseline survey",
      "Capture periodic drone/LiDAR progress scans",
      "Compare as-built point clouds against BIM design",
      "Flag discrepancies for correction",
      "Deliver final as-built verification package",
    ],
    dataRequirements: ["BIM design model", "Site control survey", "Periodic drone/LiDAR capture"],
    softwareCapabilities: [
      "BIM-to-point-cloud comparison",
      "Progress-tracking dashboards",
      "As-built verification reporting",
    ],
    hardware: ["Survey-grade drones", "Terrestrial laser scanners"],
    outputs: [
      "Progress-tracking reports",
      "As-built verification models",
      "Discrepancy flag reports",
    ],
  },
  {
    id: "sol-coastal",
    slug: "coastal-marine-monitoring",
    name: "Coastal & Marine Monitoring",
    icon: "Waves",
    category: "Environment",
    heroImage: photo("sol-coastal", 1200, 600),
    summary: "Shoreline change detection, bathymetry and marine-habitat mapping.",
    challenge:
      "Coastal authorities need to track erosion, bathymetric change and marine-habitat health to protect communities and ecosystems, but underwater and shoreline data is costly to collect at scale.",
    workflow: [
      "Establish shoreline and bathymetric baseline",
      "Acquire satellite-derived bathymetry and shoreline imagery",
      "Detect shoreline change over time",
      "Map marine-habitat extent (reefs, mangroves, seagrass)",
      "Report risk zones to coastal planners",
    ],
    dataRequirements: [
      "Historical shoreline and bathymetric baseline",
      "Multi-temporal coastal satellite imagery",
      "Marine-habitat survey data",
    ],
    softwareCapabilities: [
      "Satellite-derived bathymetry processing",
      "Shoreline change-detection analytics",
      "Marine-habitat mapping",
    ],
    hardware: ["Multibeam sonar survey vessels", "Coastal monitoring buoys"],
    outputs: ["Shoreline change maps", "Bathymetric charts", "Marine-habitat extent maps"],
  },
  {
    id: "sol-land",
    slug: "land-administration",
    name: "Land Administration",
    icon: "ScrollText",
    category: "Governance",
    heroImage: photo("sol-land", 1200, 600),
    summary: "Digital cadastre, land-titling systems and tenure-security mapping.",
    challenge:
      "Many regions lack a complete, accessible digital land registry, slowing titling, taxation and dispute resolution and leaving tenure insecure for landholders.",
    workflow: [
      "Survey and digitize existing parcel boundaries",
      "Resolve overlaps and gaps against legal records",
      "Build a digital cadastral database",
      "Issue or update land titles",
      "Deploy a public parcel-lookup portal",
    ],
    dataRequirements: [
      "Existing paper/legal land records",
      "Parcel boundary survey data",
      "Ownership and tenure records",
    ],
    softwareCapabilities: [
      "Cadastral database management",
      "Title registration workflow systems",
      "Public parcel-lookup web portals",
    ],
    hardware: ["GNSS RTK survey kits", "Mobile boundary-adjudication tablets"],
    outputs: ["Digital cadastral maps", "Land title records", "Tenure-security reports"],
  },
  {
    id: "sol-telecom",
    slug: "telecommunications",
    name: "Telecommunications",
    icon: "Signal",
    category: "Infrastructure",
    heroImage: photo("sol-telecom", 1200, 600),
    summary: "Network coverage planning, tower-site mapping and connectivity-gap analysis.",
    challenge:
      "Telecom operators need precise coverage and demand modeling to plan tower placement and close connectivity gaps, especially in rural and underserved regions.",
    workflow: [
      "Map existing tower and fiber infrastructure",
      "Model terrain-aware coverage and signal propagation",
      "Identify connectivity gaps against population data",
      "Prioritize new site locations",
      "Validate coverage post-deployment",
    ],
    dataRequirements: [
      "Existing tower/fiber infrastructure inventory",
      "Digital elevation and land-cover data",
      "Population and demand density data",
    ],
    softwareCapabilities: [
      "Signal propagation and coverage modeling",
      "Connectivity-gap analysis",
      "Site-prioritization tools",
    ],
    hardware: ["Drive-test / signal-survey equipment", "GNSS site-location devices"],
    outputs: ["Coverage maps", "Connectivity-gap reports", "Site-prioritization plans"],
  },
  {
    id: "sol-natres",
    slug: "natural-resources",
    name: "Natural Resources",
    icon: "Leaf",
    category: "Resources",
    heroImage: photo("sol-natres", 1200, 600),
    summary: "Multi-resource inventory, land-cover classification and sustainable-use planning.",
    challenge:
      "Resource agencies need an integrated view of land cover, vegetation and natural-resource stock to plan sustainable use, balancing development with conservation.",
    workflow: [
      "Classify land cover and vegetation from satellite imagery",
      "Inventory natural-resource stock (forest, water, minerals)",
      "Model sustainable-use scenarios",
      "Monitor resource change over time",
      "Report to resource-planning agencies",
    ],
    dataRequirements: [
      "Multi-temporal satellite land-cover imagery",
      "Resource inventory and field survey data",
      "Administrative and protected-area boundaries",
    ],
    softwareCapabilities: [
      "Land-cover classification",
      "Resource-inventory and stock modeling",
      "Sustainable-use scenario analysis",
    ],
    hardware: ["Field survey GNSS devices", "Multispectral survey drones"],
    outputs: [
      "Land-cover classification maps",
      "Resource-inventory reports",
      "Sustainable-use plans",
    ],
  },
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
