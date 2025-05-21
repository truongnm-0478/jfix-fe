import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

export const SettingsButton = forwardRef<HTMLButtonElement>((props, ref) => {
  const { t } = useTranslation();
  return (
    <button
      ref={ref}
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors select-none relative w-full",
        "hover:bg-primary/5 hover:text-primary",
        "text-[#707EAE]",
        "lg:text-sm md:text-xs"
      )}
      {...props}
    >
      <Settings className="h-[18px] w-[18px] stroke-[2.5px] transform-none transition-transform" />
      <span
        className={cn(
          "font-medium transform-none transition-none whitespace-nowrap",
          "lg:block md:hidden"
        )}
      >
        {t("sidebar.settings")}
      </span>
    </button>
  );
});
