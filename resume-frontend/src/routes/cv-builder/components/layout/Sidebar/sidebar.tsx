import { CVSection } from '../../../types/types';
import { BottomNavBar } from './bottom-bar';
import { DesktopSidebar } from './desktop-sidebar';

export interface SidebarProps {
  activeSection: CVSection;
  onSectionChange: (section: CVSection) => void;
  collapsed: boolean;
  className?: string;
}

export const Sidebar = (props: SidebarProps) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <BottomNavBar {...props} />
    </>
  );
};
