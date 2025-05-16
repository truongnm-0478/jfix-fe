import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ROUTERS } from "@/constant";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { Bell, Book, BookOpen, Home, ListTodo, LucideIcon, Settings, SquareKanban, User2, Users } from "lucide-react";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { SettingsMenu } from "./components";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
  roles?: string[];
}

const MenuLink = forwardRef<HTMLAnchorElement, { item: MenuItem; isActive: boolean }>(({ item, isActive }, ref) => {
  const Icon = item.icon;
  return (
    <Link
      ref={ref}
      to={item.path}
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors select-none relative",
        "hover:bg-primary/5 hover:text-primary",
        isActive 
          ? "bg-primary text-white before:absolute before:right-0 before:top-0 before:h-full before:w-1 before:rounded-l-xl before:bg-primary-light" 
          : "text-[#707EAE]",
        "lg:text-sm md:text-xs"
      )}
    >
      <Icon className="h-[18px] w-[18px] stroke-[2.5px] transform-none transition-transform" />
      <span className={cn(
        "font-medium transform-none transition-none whitespace-nowrap",
        "lg:block md:hidden"
      )}>{item.label}</span>
    </Link>
  );
});

const MenuItem = ({ item }: { item: MenuItem }) => {
  const isActive = useLocation().pathname.startsWith(item.path);
  const { user } = useUserStore();

  // Nếu item có roles và vai trò của người dùng không nằm trong roles, không hiển thị
  if (item.roles && user?.role && !item.roles.includes(user.role)) {
    return null;
  }

  return (
    <div className="lg:block md:block">
      <div className="lg:hidden md:block">
        <Tooltip>
          <TooltipTrigger asChild>
            <MenuLink item={item} isActive={isActive} />
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-primary text-white border border-gray-100 shadow-sm">
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="lg:block md:hidden">
        <MenuLink item={item} isActive={isActive} />
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const { t } = useTranslation();
  const { user } = useUserStore();

  // Kiểm tra vai trò người dùng, chuyển thành chữ hoa để so sánh
  const userRole = user?.role?.toUpperCase() || "";
  const isAdmin = userRole === "ADMIN";

  const menuItems: MenuItem[] = [
    { icon: Home, label: t("sidebar.home"), path: ROUTERS.HOME },
    { icon: Bell, label: t("sidebar.notifications"), path: ROUTERS.NOTIFICATIONS },
    { icon: Book, label: t("sidebar.study"), path: ROUTERS.LEARN },
    { icon: ListTodo, label: t("sidebar.progress"), path: ROUTERS.PROGRESS },
    { icon: User2, label: t("sidebar.profile"), path: ROUTERS.USER_PROFILE },
    {
      icon: SquareKanban,
      label: t("sidebar.dashboard"),
      path: ROUTERS.ADMIN_DASHBOARD,
      roles: ["ADMIN"]
    },
    {
      icon: Users,
      label: t("sidebar.userManagement"),
      path: ROUTERS.ADMIN_USERS,
      roles: ["ADMIN"]
    },
    {
      icon: Settings,
      label: t("sidebar.adminSettings"),
      path: ROUTERS.ADMIN_SETTINGS,
      roles: ["ADMIN"]
    },
    {
      icon: BookOpen,
      label: t("sidebar.lessonManagement"),
      path: ROUTERS.ADMIN_LESSONS,
      roles: ["ADMIN"]
    }
  ];

  const filteredMenuItems = isAdmin
    ? menuItems.filter(item => item.roles && item.roles.includes("ADMIN"))
    : menuItems.filter(item => !item.roles);

  return (
    <TooltipProvider>
      <div className="border-r border-gray-100">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-0 z-40 h-screen bg-white transition-all duration-300",
            "hidden md:flex md:flex-col",
            "lg:w-[280px] md:w-[72px]"
          )}
        >
          {/* Logo Section */}
          <div className="flex h-[72px] items-center px-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
                <img src="/app/images/logo/jfix_white.svg" alt="G-EASY" className="h-8 w-8" />
              </div>
              <div className={cn(
                "flex-col lg:flex md:hidden"
              )}>
                <span className="text-lg font-bold text-primary transform-none transition-none">J-Fixer</span>
                <span className="text-xs font-medium text-gray-500 transform-none transition-none">{t("sidebar.description")}</span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-1 flex-col justify-between py-6">
            <div className="space-y-1 px-3">
              {filteredMenuItems.map((item) => (
                <MenuItem key={item.path} item={item} />
              ))}
            </div>

            {/* Settings at bottom */}
            <div className="px-3 lg:block md:flex md:justify-center">
              <div className="lg:block md:block">
                <div className="lg:hidden md:block">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SettingsMenu />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-primary text-white border border-gray-100 shadow-sm">
                      <p className="text-sm font-medium">{t("sidebar.settings")}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="lg:block md:hidden">
                  <SettingsMenu />
                </div>
              </div>
            </div>
          </nav>
        </aside>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-100 bg-white shadow-sm md:hidden">
          <div className="flex h-[72px] items-center justify-around">
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = useLocation().pathname.startsWith(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center gap-1.5 px-3 py-2 transition-colors select-none relative",
                    "hover:text-primary hover:bg-primary-5 rounded-2xl",
                    isActive
                      ? "text-primary rounded-2xl"
                      : "text-[#707EAE]",
                    "min-w-[72px]"
                  )}
                >
                  <Icon className="h-[18px] w-[18px] stroke-[2.5px] transform-none transition-transform" />
                  <span className="transform-none transition-none whitespace-nowrap text-[10px] font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </TooltipProvider>
  );
};