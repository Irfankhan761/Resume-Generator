// components/CVPreviews.tsx
import { PersonalInfoPreview } from "./PreviewComponents/PersonInfoView";
import { EducationPreview } from "./PreviewComponents/EducationView";
import type { CVData } from "./types";

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
      </div>
    </div>
  );
};
