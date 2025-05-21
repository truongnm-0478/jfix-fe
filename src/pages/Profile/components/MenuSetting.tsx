import { Card } from "@/components/ui/card";
import { Edit, Lock, UserCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export const MenuSetting = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const { t } = useTranslation();

  const menuItems = [
    {
      id: "profile",
      label: t("profile.tabs.userProfile"),
      icon: <UserCircle className="w-5 h-5" />,
    },
    {
      id: "update",
      label: t("profile.tabs.updateInfo"),
      icon: <Edit className="w-5 h-5" />,
    },
    {
      id: "password",
      label: t("profile.tabs.changePassword"),
      icon: <Lock className="w-5 h-5" />,
    },
  ];

  return (
    <Card className="bg-white overflow-hidden">
      <div className="flex flex-col">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center text-sm gap-3 p-4 text-left transition-colors border-b border-gray-100 hover:bg-primary/10 hover:text-primary/70 ${
              activeTab === item.id
                ? "bg-primary text-white font-medium"
                : "text-slate-500"
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className={activeTab === item.id ? " hover:text-primary" : "hover:text-primary/70"}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default MenuSetting;