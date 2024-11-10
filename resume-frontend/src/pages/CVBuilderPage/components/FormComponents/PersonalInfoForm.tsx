// components/forms/PersonalInfoForm.tsx (Updated with validation)
import { useState } from "react";
import type { PersonalInfo } from "../types";

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

interface ValidationErrors {
  [key: string]: string;
}

export const PersonalInfoForm = ({ data, onChange }: PersonalInfoFormProps) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !value
          ? "Email is required"
          : !emailRegex.test(value)
          ? "Invalid email format"
          : "";
      case "phone":
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        return !value
          ? "Phone is required"
          : !phoneRegex.test(value)
          ? "Invalid phone format"
          : "";
      case "fullName":
        return !value
          ? "Full name is required"
          : value.length < 2
          ? "Name is too short"
          : "";
      case "summary":
        return !value
          ? "Summary is required"
          : value.length < 50
          ? "Summary should be at least 50 characters"
          : "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Validate the field
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    // Update the data
    onChange({
      ...data,
      [name]: value,
    });
  };

  const inputClass = (fieldName: string) => `
    input input-bordered w-full
    ${errors[fieldName] ? "border-red-500" : ""}
  `;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="Full Name *"
            className={inputClass("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email *"
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="Phone *"
            className={inputClass("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <input
          type="text"
          name="address"
          value={data.address}
          onChange={handleChange}
          placeholder="Address"
          className="input input-bordered w-full"
        />

        <input
          type="url"
          name="linkedIn"
          value={data.linkedIn}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="input input-bordered w-full"
        />

        <input
          type="url"
          name="website"
          value={data.website}
          onChange={handleChange}
          placeholder="Personal Website"
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <textarea
          name="summary"
          value={data.summary}
          onChange={handleChange}
          placeholder="Professional Summary *"
          className={`textarea textarea-bordered w-full h-32 ${
            errors.summary ? "border-red-500" : ""
          }`}
        />
        {errors.summary && (
          <p className="text-red-500 text-sm mt-1">{errors.summary}</p>
        )}
      </div>
    </div>
  );
};
