import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserStore } from "@/store/useUserStore";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { MenuItem } from "../type";
import { MenuLink } from "./MenuLink";

  export const SidebarMenuItem = ({ item }: { item: MenuItem }) => {
    const { t } = useTranslation();
    const isActive = useLocation().pathname.startsWith(item.path);
    const { user } = useUserStore();

    if (item.roles && user?.role && !item.roles.includes(user.role)) {
      return null;
    }

    return (
      <div className="lg:block block">
        <div className="lg:hidden block">
          <Tooltip>
            <TooltipTrigger asChild>
              <MenuLink item={item} isActive={isActive} />
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-primary text-white border border-gray-100 shadow-sm"
            >
              <p>{t(item.label)}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="lg:block hidden">
          <MenuLink item={item} isActive={isActive} />
        </div>
      </div>
    );
  };
