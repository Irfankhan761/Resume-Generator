// components/preview/EducationPreview.tsx
import type { Education } from "../types";

interface EducationPreviewProps {
  data: Education[];
}

export const EducationPreview = ({ data }: EducationPreviewProps) => {
  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold text-gray-900">Education</h2>
      {data.map((edu) => (
        <div key={edu.id} className="space-y-2">
          <div className="flex justify-between">
            <h3 className="font-semibold">{edu.institution}</h3>
            <span className="text-gray-600">
              {new Date(edu.startDate).getFullYear()} -{" "}
              {new Date(edu.endDate).getFullYear()}
            </span>
          </div>
          <p className="text-gray-800">
            {edu.degree} in {edu.field}
          </p>
          {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
        </div>
      ))}
    </div>
  );
};

// Similar structure for other preview components...
