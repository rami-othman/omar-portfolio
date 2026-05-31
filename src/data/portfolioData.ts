export interface ProfileInfo {
  name: string;
  title: string;
  statement: string;
  biography: string[];
  location: string;
  availability: string;
}

export interface CVEntry {
  period: string;
  title: string;
  organization: string;
  location: string;
  detail?: string;
}

export interface CVInfo {
  education: CVEntry[];
  experience: CVEntry[];
  recognition: CVEntry[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  city: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  year: string;
  type: string;
  location: string;
  role: string;
  description: string;
  conceptStatement: string;
  conceptKeywords: string[];
  designProcessSteps: string[];
  coverImage: ProjectImageAsset;
  conceptImages: ProjectImageAsset[];
  drawings: ProjectImageAsset[];
  renders: ProjectImageAsset[];
  credits?: string;
  notes?: string;
}

export interface ProjectImageAsset {
  src: string;
  caption: string;
  alt?: string;
}

export interface PortfolioContentsItem {
  id: string;
  number: string;
  label: string;
  page: string;
  href: string;
  kind: "section" | "project";
}

export const profile: ProfileInfo = {
  name: "Omar",
  title: "Architectural Designer",
  statement: "Architecture shaped by context, restraint, and the life between walls.",
  biography: [
    "Omar is an architectural designer interested in spaces that feel inevitable: grounded in their setting, attentive to material, and generous in how they are inhabited.",
    "His work moves between research, representation, and built form. Each project begins with a precise reading of place and develops through plans, sections, models, and atmosphere.",
  ],
  location: "Damascus, Syria",
  availability: "Available for selected collaborations",
};

export const cv: CVInfo = {
  education: [
    {
      period: "2019-2024",
      title: "Bachelor of Architecture",
      organization: "University Name",
      location: "City, Country",
      detail: "Graduation project with distinction",
    },
    {
      period: "2023",
      title: "Urban Research Workshop",
      organization: "Studio / Institution",
      location: "City, Country",
    },
  ],
  experience: [
    {
      period: "2024-Present",
      title: "Junior Architect",
      organization: "Architecture Studio",
      location: "City, Country",
      detail: "Concept design, visual communication, and project development",
    },
    {
      period: "2023-2024",
      title: "Architectural Intern",
      organization: "Design Practice",
      location: "City, Country",
      detail: "Research, drafting, modeling, and competition support",
    },
  ],
  recognition: [
    {
      period: "2024",
      title: "Graduation Project Nomination",
      organization: "Annual Architecture Exhibition",
      location: "City, Country",
    },
    {
      period: "2023",
      title: "Selected Student Work",
      organization: "Faculty Review",
      location: "City, Country",
    },
  ],
};

export const skills = [
  "Architectural Concept Design",
  "Spatial Planning",
  "Design Development",
  "Architectural Representation",
  "Physical Modeling",
  "Research & Analysis",
];

export const software = [
  "AutoCAD",
  "Revit",
  "SketchUp",
  "Rhino",
  "Lumion",
  "Adobe Photoshop",
  "Adobe InDesign",
];

export const contact: ContactInfo = {
  email: "omar.architecture@example.com",
  phone: "+963 000 000 000",
  city: "Damascus, Syria",
  links: [
    { label: "Behance", href: "https://www.behance.net/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
};

export const projects: Project[] = [
  {
    id: "courtyard-house",
    number: "01",
    title: "Courtyard House",
    year: "2024",
    type: "Residential",
    location: "Damascus, Syria",
    role: "Concept Design / Visualization",
    description:
      "A contemporary domestic study organized around a shaded interior court. Thickened thresholds, filtered light, and a quiet material palette create a measured transition from city to sanctuary.",
    conceptStatement:
      "The proposal begins with a protected interior void. Rooms gather around this quiet center, using shade, framed views, and measured thresholds to soften the movement between shared and private life.",
    conceptKeywords: ["Threshold", "Filtered light", "Inner garden"],
    designProcessSteps: [
      "Read the site as a sequence from street to interior refuge.",
      "Use the courtyard to organize light, air, and daily circulation.",
      "Refine openings and material transitions around moments of pause.",
    ],
    coverImage: { src: "", caption: "Main view" },
    conceptImages: [
      { src: "", caption: "Courtyard massing study" },
      { src: "", caption: "Threshold sequence" },
    ],
    drawings: [
      { src: "", caption: "Ground floor plan" },
      { src: "", caption: "Longitudinal section" },
    ],
    renders: [
      { src: "", caption: "Courtyard atmosphere" },
      { src: "", caption: "Street elevation" },
    ],
    credits: "Placeholder credits / Individual study",
  },
  {
    id: "cultural-ground",
    number: "02",
    title: "Cultural Ground",
    year: "2023",
    type: "Cultural Center",
    location: "Aleppo, Syria",
    role: "Academic Project / Individual",
    description:
      "A civic landscape that gathers workshops, exhibition rooms, and public terraces around a sequence of planted voids. The building reads as an extension of the ground rather than an isolated object.",
    conceptStatement:
      "The project treats the cultural center as a piece of civic ground. Courtyards, ramps, and terraces form a porous public route that supports informal gathering as much as programmed activity.",
    conceptKeywords: ["Collective space", "Topography", "Repair"],
    designProcessSteps: [
      "Map existing movement patterns and potential gathering edges.",
      "Carve planted voids into a continuous public ground plane.",
      "Distribute program around shaded paths and shared terraces.",
    ],
    coverImage: { src: "", caption: "Main view" },
    conceptImages: [
      { src: "", caption: "Public ground diagram" },
      { src: "", caption: "Courtyard sequence study" },
    ],
    drawings: [
      { src: "", caption: "Site plan" },
      { src: "", caption: "Programmatic section" },
    ],
    renders: [
      { src: "", caption: "Public terrace" },
      { src: "", caption: "Exhibition hall" },
    ],
    credits: "Placeholder credits / Academic study",
  },
  {
    id: "edge-library",
    number: "03",
    title: "Edge Library",
    year: "2023",
    type: "Public Library",
    location: "Latakia, Syria",
    role: "Competition Entry / Team",
    description:
      "A compact library at the meeting point of city and coast. Reading spaces climb through the section as a connected interior promenade, framing changing relationships to water, horizon, and sky.",
    conceptStatement:
      "A stepped reading promenade connects the city edge to the horizon. The library is composed as a sequence of rooms and overlooks, allowing the coast to remain present throughout the interior.",
    conceptKeywords: ["Horizon", "Promenade", "Civic room"],
    designProcessSteps: [
      "Frame the coastal edge as a changing sequence of views.",
      "Connect reading rooms through a gradual sectional promenade.",
      "Shape quiet civic rooms around daylight and orientation.",
    ],
    coverImage: { src: "", caption: "Main view" },
    conceptImages: [
      { src: "", caption: "Sectional promenade" },
      { src: "", caption: "Horizon framing study" },
    ],
    drawings: [
      { src: "", caption: "Exploded axonometric" },
      { src: "", caption: "Cross section" },
    ],
    renders: [
      { src: "", caption: "Reading room" },
      { src: "", caption: "Coastal approach" },
    ],
    credits: "Placeholder credits / Team competition entry",
  },
];

export const portfolioContents: PortfolioContentsItem[] = [
  {
    id: "profile",
    number: "01",
    label: "Profile / About",
    page: "04",
    href: "#profile",
    kind: "section",
  },
  {
    id: "cv",
    number: "02",
    label: "Curriculum Vitae",
    page: "06",
    href: "#cv",
    kind: "section",
  },
  {
    id: "works",
    number: "03",
    label: "Selected Works",
    page: "08",
    href: "#works",
    kind: "section",
  },
  ...projects.map((project, index) => ({
    id: `project-${project.id}`,
    number: String(index + 4).padStart(2, "0"),
    label: project.title,
    page: String(10 + index * 8).padStart(2, "0"),
    href: `#project-${project.id}`,
    kind: "project" as const,
  })),
  {
    id: "contact",
    number: String(projects.length + 4).padStart(2, "0"),
    label: "Contact",
    page: String(10 + projects.length * 8).padStart(2, "0"),
    href: "#contact",
    kind: "section",
  },
];
