import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/sonner";
import { ROUTERS } from "@/constant";
import { cn } from "@/lib/utils";
import { authApi } from "@/services/api/authApi";
import useLanguage from "@/store/useLanguage";
import { useUserStore } from "@/store/useUserStore";
import { getRefreshToken, setLanguageStorage } from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import { Download, LogOut } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LANGUAGE_OPTIONS } from "../constant";
import { SettingsButton } from "./SettingsButton";

export const SettingsMenu = forwardRef<HTMLButtonElement>((props, ref) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { lang, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const { logout } = useUserStore();

  const languageOptions = LANGUAGE_OPTIONS;

  useEffect(() => {
    const handleResize = () => {
      if (open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  const mutation = useMutation({
    mutationFn: (refreshToken: string) => authApi.logout(refreshToken),
    onSuccess: () => {
      logout();
      navigate(ROUTERS.LOGIN);
      toast.success(t("header.logout.success"));
    },
    onError: () => {
      logout();
      navigate(ROUTERS.LOGIN);
    },
  });

  const handleLogout = () => {
    mutation.mutate(getRefreshToken() ?? "");
  };

  const handleCheckUpdate = () => {
    window.location.reload();
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    setOpen(false);
    setLanguageStorage(newLang);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <SettingsButton ref={ref} {...props} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white border border-gray-100 shadow-sm ml-4">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-sm">
            {t("header.language")}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="flex flex-col gap-1">
            {languageOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleLanguageChange(option.value)}
                className={cn(
                  "flex items-center gap-2 cursor-pointer",
                  lang === option.value
                    ? "bg-accent text-accent-foreground font-normal"
                    : ""
                )}
              >
                <img
                  src={option.flag}
                  alt={option.value}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm shadow-sm"
                />
                <span className="font-medium">
                  {t(`header.languages.${option.value}`)}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleCheckUpdate}
        >
          <Download className="h-4 w-4" />
          <span className="font-medium">{t("sidebar.checkUpdate")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer text-red-500 hover:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium">{t("sidebar.logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});