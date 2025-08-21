import { useCallback } from 'react';
import { PersonalInfoForm } from './forms/personal-info/personal-info-form';
import { EducationForm } from './forms/education-info/educational-form';
import type { CVData } from '../types/types';
import { WorkExperienceForm } from './forms/work-experience-info/work-experience-form';
import { ProjectForm } from './forms/project-info/project-form';
import { SkillForm } from './forms/skills-info/skills-form';

interface CVFormsProps {
  data: CVData;
  onChange: (data: CVData) => void;
  activeSection: string;
}

export const CVForms = ({ data, onChange, activeSection }: CVFormsProps) => {
  const handlePersonalInfoChange = useCallback(
    (personalInfo: CVData['personalInfo']) => {
      onChange({ ...data, personalInfo });
    },
    [data, onChange]
  );

  const handleEducationChange = useCallback(
    (education: CVData['education']) => {
      onChange({ ...data, education });
    },
    [data, onChange]
  );

  const handleExperienceChange = useCallback(
    (workExperience: CVData['workExperience']) => {
      onChange({ ...data, workExperience });
    },
    [data, onChange]
  );

  const handleProjectChange = useCallback(
    (projects: CVData['projects']) => {
      onChange({ ...data, projects });
    },
    [data, onChange]
  );

  const handleSkillChange = useCallback(
    (skills: CVData['skills']) => {
      onChange({ ...data, skills });
    },
    [data, onChange]
  );

  return (
    <div className="h-full overflow-y-auto">
      {activeSection === 'Personal Info' && (
        <PersonalInfoForm
          data={data.personalInfo}
          onChange={handlePersonalInfoChange}
        />
      )}
      {activeSection === 'Education' && (
        <EducationForm onChange={handleEducationChange} />
      )}

      {activeSection === 'Work Experience' && (
        <WorkExperienceForm onChange={handleExperienceChange} />
      )}

      {activeSection === 'Projects' && (
        <ProjectForm onChange={handleProjectChange} />
      )}

      {activeSection === 'Skills' && <SkillForm onChange={handleSkillChange} />}
    </div>
  );
};
