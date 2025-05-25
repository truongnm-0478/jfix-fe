import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ROUTERS } from "@/constant";
import { LearningGoalResponse } from "@/dataHelper/learningGoal.dataHelper";
import { useLearningGoal } from "@/hooks/useAchievement";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { SidebarMenuItem } from "./components/MenuItem";
import { SettingsMenu } from "./components/SettingsMenu";
import { MENU_ITEMS } from "./constant";
import { MenuItem } from "./type";

export const Sidebar = () => {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const { data: learningGoalData } = useLearningGoal();
  const learningGoal: LearningGoalResponse | null = learningGoalData?.data ?? null;
  const isLearningGoal = learningGoal?.targetLevel !== "FREE";

  const userRole = user?.role?.toUpperCase() || "";
  const isAdmin = userRole === "ADMIN";

  const menuItems: MenuItem[] = MENU_ITEMS;

  const adminMenuItems = menuItems.filter(item => item.roles && item.roles.includes("ADMIN"));
  const userMenuItems = menuItems.filter(item => item.roles && item.roles.includes("USER"));
  const userNoLearningGoalMenuItems = userMenuItems.filter(item => item.path !== ROUTERS.LEARN );
  const userLearningGoalMenuItems = userMenuItems.filter(item => item.path !== ROUTERS.LEARNING_RESOURCES);

  const filteredMenuItems = isAdmin
    ? adminMenuItems
    : isLearningGoal
      ? userLearningGoalMenuItems
      : userNoLearningGoalMenuItems;
  
  const filteredMenuItemsMobile = filteredMenuItems.filter(item => item.mobile);

  return (
    <TooltipProvider>
      <div className="border-r border-gray-100">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-0 z-40 h-screen bg-white transition-all duration-300",
            isAdmin ? "" : "hidden",
            "md:flex md:flex-col",
            "lg:w-[280px] w-[72px]"
          )}
        >
          {/* Logo Section */}
          <div className="flex h-[72px] items-center px-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
                <img
                  src="/app/images/logo/jfix_white.svg"
                  alt="G-EASY"
                  className="h-8 w-8"
                />
              </div>
              <div className={cn("flex-col lg:flex hidden")}>
                <span className="text-lg font-bold text-primary transform-none transition-none">
                  J-Fixer
                </span>
                <span className="text-xs font-medium text-gray-500 transform-none transition-none">
                  {t("sidebar.description")}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-1 flex-col justify-between py-6">
            <div className="space-y-1 px-3">
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.path} item={item} />
              ))}
            </div>

            {/* Settings at bottom */}
            <div className="px-3 lg:block flex justify-center">
              <div className="lg:block block">
                <div className="lg:hidden block">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SettingsMenu />
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-primary text-white border border-gray-100 shadow-sm"
                    >
                      <p className="text-sm font-medium">
                        {t("sidebar.settings")}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="lg:block hidden">
                  <SettingsMenu />
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Mobile Bottom Navigation */}
        {!isAdmin && (
          <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white shadow-sm md:hidden">
            <div className="flex h-[72px] items-center justify-around">
              {filteredMenuItemsMobile.map((item) => {
                const Icon = item.icon;
                const isActive = useLocation().pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex flex-col items-center gap-1.5 px-3 py-2 transition-colors select-none relative",
                      "hover:text-primary hover:bg-primary-5 rounded-2xl",
                      isActive ? "text-primary rounded-2xl" : "text-[#707EAE]",
                      "min-w-[72px]"
                    )}
                  >
                    <Icon className="h-[18px] w-[18px] stroke-[2.5px] transform-none transition-transform" />
                    <span className="transform-none transition-none whitespace-nowrap text-[10px] font-medium">
                      {t(item.label)}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </TooltipProvider>
  );
};