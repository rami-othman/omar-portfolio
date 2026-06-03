export interface ProfileInfo {
  name: string;
  title: string;
  statement: string;
  biography: string[];
  location: string;
  availability: string;
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
  coverOrientation: "landscape" | "portrait";
  coverObjectPosition?: string;
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
  orientation?: "landscape" | "portrait" | "square";
  layout?: "full" | "half";
}

export type ProjectGalleryKey = "renders" | "drawings" | "conceptImages";

export const profile: ProfileInfo = {
  name: "Omar",
  title: "Architecture Engineer",
  statement:
    "Interior architecture and visualization shaped by atmosphere, material clarity, and precise spatial composition.",
  biography: [
    "Omar is an architecture engineer focused on interior concepts, visual atmosphere, and spaces that feel composed, practical, and carefully detailed.",
    "His work moves between concept development, technical understanding, and visualization. Each study develops through material choices, lighting, proportion, and clear spatial storytelling.",
  ],
  location: "Damascus, Syria",
  availability: "Available for selected collaborations",
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
    id: "kitchen-interior",
    number: "01",
    title: "Kitchen Interior Study",
    year: "2024",
    type: "Interior Design",
    location: "Damascus, Syria",
    role: "Interior Concept / Visualization",
    description:
      "A residential kitchen study with a warm material palette, wood cabinetry, concealed lighting, and compact spatial planning shaped for a refined daily-use interior.",
    conceptStatement:
      "The study balances practical circulation with a calm visual rhythm, using warm wood, integrated lighting, and clean storage lines to make a compact kitchen feel composed and generous.",
    conceptKeywords: ["Wood", "Concealed light", "Compact plan"],
    designProcessSteps: [
      "Organize storage, preparation, and movement into a clear residential workflow.",
      "Use warm cabinetry and quiet surfaces to create visual continuity.",
      "Refine lighting positions to support both function and atmosphere.",
    ],
    coverImage: {
      src: "/projects/kitchen-interior/cover.png",
      caption: "Kitchen interior render",
      alt: "Warm residential kitchen interior with wood cabinetry and concealed lighting",
      orientation: "landscape",
      layout: "full",
    },
    coverOrientation: "landscape",
    coverObjectPosition: "50% 54%",
    // Add future assets here, for example:
    // renders: [{ src: "/projects/kitchen-interior/render-01.png", caption: "...", orientation: "landscape", layout: "full" }]
    conceptImages: [],
    drawings: [],
    renders: [],
    credits: "Interior study / Visualization",
  },
  {
    id: "bathroom-interior",
    number: "02",
    title: "Bathroom Interior Study",
    year: "2024",
    type: "Interior Visualization",
    location: "Damascus, Syria",
    role: "Material Study / Visualization",
    description:
      "A luxury bathroom visualization focused on stone surfaces, warm lighting, custom mirrors, and a quiet material atmosphere with high-end residential character.",
    conceptStatement:
      "The composition uses reflective surfaces, soft illumination, and a restrained stone palette to create a bathroom atmosphere that feels calm, precise, and tactile.",
    conceptKeywords: ["Stone", "Mirror", "Warm light"],
    designProcessSteps: [
      "Set a balanced vanity composition around mirror, basin, and light.",
      "Develop a material palette with stone texture and warm highlights.",
      "Frame the render to emphasize depth, reflection, and surface quality.",
    ],
    coverImage: {
      src: "/projects/bathroom-interior/cover.png",
      caption: "Bathroom interior render",
      alt: "Luxury bathroom interior visualization with stone surfaces and warm lighting",
      orientation: "portrait",
      layout: "full",
    },
    coverOrientation: "portrait",
    coverObjectPosition: "52% 42%",
    // Add future assets here, for example:
    // drawings: [{ src: "/projects/bathroom-interior/plan-01.png", caption: "...", orientation: "landscape", layout: "full" }]
    conceptImages: [],
    drawings: [],
    renders: [],
    credits: "Interior study / Visualization",
  },
  {
    id: "dining-interior",
    number: "03",
    title: "Dining Interior Study",
    year: "2024",
    type: "Interior Architecture",
    location: "Damascus, Syria",
    role: "Interior Concept / Visualization",
    description:
      "A refined dining room study organized around symmetry, layered lighting, wall treatments, display shelving, and a polished high-end interior composition.",
    conceptStatement:
      "The dining space is composed as a formal interior scene, using lighting, shelving, and wall articulation to create a balanced atmosphere for gathering.",
    conceptKeywords: ["Symmetry", "Display", "Dining"],
    designProcessSteps: [
      "Build the room around a centered dining composition and clear sightlines.",
      "Use wall treatments and shelving to create depth behind the table.",
      "Layer ceiling and accent lighting to support a refined evening atmosphere.",
    ],
    coverImage: {
      src: "/projects/dining-interior/cover.png",
      caption: "Dining interior render",
      alt: "Refined dining room interior with lighting, display shelving, and wall treatments",
      orientation: "landscape",
      layout: "full",
    },
    coverOrientation: "landscape",
    coverObjectPosition: "50% 50%",
    // Add future assets here, for example:
    // conceptImages: [{ src: "/projects/dining-interior/detail-01.png", caption: "...", orientation: "square", layout: "half" }]
    conceptImages: [],
    drawings: [],
    renders: [],
    credits: "Interior study / Visualization",
  },
];

export function getProjectById(projectId: string | undefined) {
  return projects.find((project) => project.id === projectId);
}

export function getAdjacentProjects(projectId: string) {
  const currentIndex = projects.findIndex((project) => project.id === projectId);

  if (currentIndex < 0) {
    return { previousProject: undefined, nextProject: undefined };
  }

  return {
    previousProject:
      projects[(currentIndex - 1 + projects.length) % projects.length],
    nextProject: projects[(currentIndex + 1) % projects.length],
  };
}
