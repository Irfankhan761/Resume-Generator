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
  id: string;
  degreeTitle: string;
  institute?: string;
  majors?: string;
  city?: string;
  gpaValue?: string;
  gpaType?: 'gpa' | 'percentage';

  // New/Updated Fields
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
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
    level: number;
  }[];
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string | null;
  endDate: string | null;
  currentlyWorking: boolean;
  description: string[];
}

export interface CVData {
  personalInfo: PersonalInfo;
  education: Education[];
  projects: Project[];
  skills: Skill[];
  workExperience: WorkExperience[];
}

export type CVSection =
  | 'Personal Info'
  | 'Education'
  | 'Work Experience'
  | 'Projects'
  | 'Skills';
