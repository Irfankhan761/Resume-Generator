// components/Sidebar.tsx
import { CVSection } from "./types";

interface SidebarProps {
  activeSection: CVSection;
  onSectionChange: (section: CVSection) => void; // Updated type
}

export const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const sections: CVSection[] = [
    "Personal Info",
    "Education",
    "Work Experience",
    "Projects",
    "Skills",
  ];

  return (
    <div className="w-64 bg-white rounded-lg shadow p-4">
      <nav className="space-y-2">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => onSectionChange(section)}
            className={`w-full text-left px-4 py-2 rounded transition-colors
              ${
                activeSection === section
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
          >
            {section}
          </button>
        ))}
      </nav>
    </div>
  );
};
