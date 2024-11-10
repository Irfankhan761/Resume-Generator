// components/preview/PersonalInfoPreview.tsx
import type { PersonalInfo } from "../types";

interface PersonalInfoPreviewProps {
  data: PersonalInfo;
}

export const PersonalInfoPreview = ({ data }: PersonalInfoPreviewProps) => {
  return (
    <div className="space-y-2 p-4 border-b">
      <h1 className="text-3xl font-bold text-gray-900">{data.fullName}</h1>
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <span>{data.email}</span>
        <span>{data.phone}</span>
        <span>{data.address}</span>
        {data.linkedIn && (
          <a
            href={data.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            LinkedIn
          </a>
        )}
        {data.website && (
          <a
            href={data.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600"
          >
            Website
          </a>
        )}
      </div>
      <p className="text-gray-700 mt-4">{data.summary}</p>
    </div>
  );
};
