export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  github: string;
  summary: string;
}

export interface Education {
  current: any;
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  link?: string;
}

export interface Skill {
  id: string;
  category: string;
  skills: {
    name: string;
    level: number; // Skill level represented as a percentage
  }[];
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
}

export interface CVData {
  personalInfo: PersonalInfo;
  education: Education[];
  projects: Project[];
  skills: Skill[];
  workExperience: WorkExperience[];
}

export type CVSection =
  | "Personal Info"
  | "Education"
  | "Work Experience"
  | "Projects"
  | "Skills";
