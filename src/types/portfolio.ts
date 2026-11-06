export type ProjectCategory = 'All' | 'AI' | 'Data' | 'Climate' | 'Full-stack';

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  screenshots?: string[];
  lilyStyle: 'blooming' | 'tiger' | 'waterlily' | 'stargazer' | 'calla' | 'classic';
  featured?: boolean;
  order: number;
}

export type ExperienceCategory = 'All' | 'Tech' | 'Development';

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  impactHeadline: string;
  bullets: string[];
  linkUrl?: string;
  linkText?: string;
  tags: ('Tech' | 'Development')[];
  isVolunteer?: boolean;
  order: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  details?: string;
  order: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer?: string;
  year?: string;
  order: number;
}

export interface Achievement {
  id: string;
  title: string;
  organization?: string;
  year?: string;
  description?: string;
  order: number;
}

export interface SkillGroup {
  id: string;
  category: string;
  items: string[];
  order: number;
}

export interface PortfolioSettings {
  heroTitle: string;
  heroTagline: string;
  heroIntro: string;
  quote: string;
  openToBadge: string;
  aboutText: string;
  photoUrl: string;
  techResumeUrl?: string;
  devResumeUrl?: string;
  email: string;
  linkedinUrl: string;
  githubUrl?: string;
  spokenLanguages: string;
  statProjectsCount?: string;
  statCountriesTracked?: string;
  statCaseStudies?: string;
  statUNEntities?: string;
}
