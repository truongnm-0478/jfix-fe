import { LucideIcon } from "lucide-react";

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
  roles?: string[];
  mobile?: boolean;
  isLearningGoal?: boolean;
}
