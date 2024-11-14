// components/CVPreviews.tsx
import { PersonalInfoPreview } from "./PreviewComponents/PersonInfoView";
import { EducationPreview } from "./PreviewComponents/EducationView";
import type { CVData } from "./types";
import { WorkExperiencePreview } from "./PreviewComponents/WorkExperienceView";
import { ProjectPreview } from "./PreviewComponents/ProjectsView";
import { SkillPreview } from "./PreviewComponents/SkillsView";

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
