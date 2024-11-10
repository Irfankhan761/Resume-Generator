// components/forms/EducationForm.tsx (Updated with validation)
import { useState } from "react";
import type { Education } from "../types";

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

interface ValidationErrors {
  [key: string]: {
    [key: string]: string;
  };
}

export const EducationForm = ({ data, onChange }: EducationFormProps) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "institution":
        return !value ? "Institution is required" : "";
      case "degree":
        return !value ? "Degree is required" : "";
      case "field":
        return !value ? "Field of study is required" : "";
      case "startDate":
        return !value ? "Start date is required" : "";
      case "endDate":
        return !value ? "End date is required" : "";
      default:
        return "";
    }
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    };
    onChange([...data, newEducation]);
  };

  const updateEducation = (id: string, field: string, value: string) => {
    // Validate the field
    const error = validateField(field, value);
    setErrors((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: error,
      },
    }));

    // Update the data
    onChange(
      data.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  const removeEducation = (id: string) => {
    // Remove errors for this education entry
    const newErrors = { ...errors };
    delete newErrors[id];
    setErrors(newErrors);

    // Remove the education entry
    onChange(data.filter((edu) => edu.id !== id));
  };

  const inputClass = (id: string, fieldName: string) => `
    input input-bordered w-full
    ${errors[id]?.[fieldName] ? "border-red-500" : ""}
  `;

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Education</h2>
        <button onClick={addEducation} className="btn btn-primary">
          Add Education
        </button>
      </div>

      {data.map((edu) => (
        <div key={edu.id} className="border p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) =>
                  updateEducation(edu.id, "institution", e.target.value)
                }
                placeholder="Institution *"
                className={inputClass(edu.id, "institution")}
              />
              {errors[edu.id]?.institution && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[edu.id].institution}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) =>
                  updateEducation(edu.id, "degree", e.target.value)
                }
                placeholder="Degree *"
                className={inputClass(edu.id, "degree")}
              />
              {errors[edu.id]?.degree && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[edu.id].degree}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                value={edu.field}
                onChange={(e) =>
                  updateEducation(edu.id, "field", e.target.value)
                }
                placeholder="Field of Study *"
                className={inputClass(edu.id, "field")}
              />
              {errors[edu.id]?.field && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[edu.id].field}
                </p>
              )}
            </div>

            <input
              type="text"
              value={edu.gpa || ""}
              onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)}
              placeholder="GPA (optional)"
              className="input input-bordered w-full"
            />

            <div>
              <input
                type="date"
                value={edu.startDate}
                onChange={(e) =>
                  updateEducation(edu.id, "startDate", e.target.value)
                }
                className={inputClass(edu.id, "startDate")}
              />
              {errors[edu.id]?.startDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[edu.id].startDate}
                </p>
              )}
            </div>

            <div>
              <input
                type="date"
                value={edu.endDate}
                onChange={(e) =>
                  updateEducation(edu.id, "endDate", e.target.value)
                }
                className={inputClass(edu.id, "endDate")}
              />
              {errors[edu.id]?.endDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[edu.id].endDate}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => removeEducation(edu.id)}
            className="btn btn-error btn-sm mt-4"
          >
            Remove Education
          </button>
        </div>
      ))}
    </div>
  );
};
