import { PersonalInfoPreview } from './preview-components/personal-info-view';
import { EducationPreview } from './preview-components/education-view';
import type { CVData } from '../types/types';
import { WorkExperiencePreview } from './preview-components/work-experience-view';
import { ProjectPreview } from './preview-components/projects-view';
import { SkillPreview } from './preview-components/skills-view';

interface CVPreviewsProps {
  data: CVData;
}

export const CVPreviews = ({ data }: CVPreviewsProps) => {
  return (
    <div className="h-full overflow-y-auto bg-white shadow-lg max-w-2xl mx-auto my-8 p-8">
      <div className="space-y-6">
        <PersonalInfoPreview data={data.personalInfo} />
        {data.education.length > 0 && (
          <EducationPreview data={data.education} />
        )}
        {data.workExperience.length > 0 && (
          <WorkExperiencePreview data={data.workExperience} />
        )}
        {data.projects.length > 0 && <ProjectPreview data={data.projects} />}
        {data.skills.length > 0 && <SkillPreview data={data.skills} />}
      </div>
    </div>
  );
};
