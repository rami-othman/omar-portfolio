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
  conceptKeywords: string[];
  coverImage: string;
  drawings: string[];
  renders: string[];
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
    conceptKeywords: ["Threshold", "Filtered light", "Inner garden"],
    coverImage: "",
    drawings: ["Ground floor plan", "Longitudinal section"],
    renders: ["Courtyard atmosphere", "Street elevation"],
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
    conceptKeywords: ["Collective space", "Topography", "Repair"],
    coverImage: "",
    drawings: ["Site plan", "Programmatic section"],
    renders: ["Public terrace", "Exhibition hall"],
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
    conceptKeywords: ["Horizon", "Promenade", "Civic room"],
    coverImage: "",
    drawings: ["Exploded axonometric", "Cross section"],
    renders: ["Reading room", "Coastal approach"],
  },
];
