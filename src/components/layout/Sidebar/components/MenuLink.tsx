import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MenuItem } from "../type";

export const MenuLink = forwardRef<
  HTMLAnchorElement,
  { item: MenuItem; isActive: boolean }
>(({ item, isActive }, ref) => {
  const { t } = useTranslation();
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
        "lg:text-sm text-xs"
      )}
    >
      <Icon className="h-[18px] w-[18px] stroke-[2.5px] transform-none transition-transform" />
      <span
        className={cn(
          "font-medium transform-none transition-none whitespace-nowrap",
          "lg:block hidden"
        )}
      >
        {t(item.label)}
      </span>
    </Link>
  );
});