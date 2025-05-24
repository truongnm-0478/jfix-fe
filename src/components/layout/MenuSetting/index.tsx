import { Card } from "@/components/ui/card";
import { ROUTERS } from "@/constant";
import { useUserStore } from "@/store/useUserStore";
import { BookOpen, Edit, Lock, UserCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const MenuSetting = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();
  const userRole = user?.role?.toUpperCase() || "";
  const isAdmin = userRole === "ADMIN";

  const userMenuItems = [
    {
      id: "profile",
      label: t("profile.tabs.userProfile"),
      icon: <UserCircle className="w-5 h-5" />,
      path: ROUTERS.USER_SETTING + "/" + ROUTERS.USER_PROFILE,
    },
    {
      id: "update",
      label: t("profile.tabs.updateInfo"),
      icon: <Edit className="w-5 h-5" />,
      path: ROUTERS.USER_SETTING + "/" + ROUTERS.UPDATE_PROFILE,
    },
    {
      id: "password",
      label: t("profile.tabs.changePassword"),
      icon: <Lock className="w-5 h-5" />,
      path: ROUTERS.USER_SETTING + "/" + ROUTERS.CHANGE_PASSWORD,
    },
    {
      id: "learning-goal",
      label: t("profile.tabs.learningGoal"),
      icon: <BookOpen className="w-5 h-5" />,
      path: ROUTERS.USER_SETTING + "/" + ROUTERS.UPDATE_LEARNING_GOAL,
    },
  ];

  const menuAdminItems = [
    {
      id: "profile",
      label: t("profile.tabs.userProfile"),
      icon: <UserCircle className="w-5 h-5" />,
      path: ROUTERS.ADMIN_USER_SETTING + "/" + ROUTERS.USER_PROFILE,
    },
    {
      id: "update",
      label: t("profile.tabs.updateInfo"),
      icon: <Edit className="w-5 h-5" />,
      path: ROUTERS.ADMIN_USER_SETTING + "/" + ROUTERS.UPDATE_PROFILE,
    },
    {
      id: "password",
      label: t("profile.tabs.changePassword"),
      icon: <Lock className="w-5 h-5" />,
      path: ROUTERS.ADMIN_USER_SETTING + "/" + ROUTERS.CHANGE_PASSWORD,
    }
  ];

  const menuItems = isAdmin ? menuAdminItems : userMenuItems;

  return (
    <Card className="bg-white overflow-hidden">
      <div className="flex flex-col">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              className={`flex items-center text-sm gap-3 p-4 text-left transition-colors border-b border-gray-100 hover:bg-primary/10 hover:text-primary/70 ${
                isActive ? "bg-primary text-white font-medium" : "text-slate-500"
              }`}
              onClick={() => navigate(item.path)}
            >
              <span className={isActive ? "hover:text-primary" : "hover:text-primary/70"}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>
    </Card>
  );
};
