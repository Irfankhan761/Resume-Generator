// components/CVForms.tsx
import { PersonalInfoForm } from "./FormComponents/PersonalInfoForm";
import { EducationForm } from "./FormComponents/EducationalForm";
import type { CVData } from "./types";
import { WorkExperienceForm } from "./FormComponents/WorkExperienceForm";
import { ProjectForm } from "./FormComponents/ProjectsForm";

interface CVFormsProps {
  data: CVData;
  onChange: (data: CVData) => void;
  activeSection: string;
}

export const CVForms = ({ data, onChange, activeSection }: CVFormsProps) => {
  const handlePersonalInfoChange = (personalInfo: CVData["personalInfo"]) => {
    onChange({ ...data, personalInfo });
  };

  const handleEducationChange = (education: CVData["education"]) => {
    onChange({ ...data, education });
  };
  const handleExperienceChange = (workExperience: CVData["workExperience"]) => {
    onChange({ ...data, workExperience });
  };
  const handleProjectChange = (projects: CVData["projects"]) => {
    onChange({ ...data, projects });
  };

  return (
    <div className="h-full overflow-y-auto">
      {activeSection === "Personal Info" && (
        <PersonalInfoForm
          data={data.personalInfo}
          onChange={handlePersonalInfoChange}
        />
      )}
      {activeSection === "Education" && (
        <EducationForm data={data.education} onChange={handleEducationChange} />
      )}
      {activeSection === "Work Experience" && (
        <WorkExperienceForm
          data={data.workExperience}
          onChange={handleExperienceChange}
        />
      )}

      {activeSection === "Projects" && (
        <ProjectForm data={data.projects} onChange={handleProjectChange} />
      )}
    </div>
  );
};
