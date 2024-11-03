export interface PersonalInfo {
  id: string;
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  profileSummary: string;
}

export interface WorkExperienceItem {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
  achievements: string[];
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  link: string;
  description: string;
  technologies: string[];
}

export interface CVData {
  id: string;
  personalInfo: PersonalInfo;
  workExperience: WorkExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
}

export type CVSection =
  | "personalInfo"
  | "workExperience"
  | "education"
  | "skills"
  | "projects";
