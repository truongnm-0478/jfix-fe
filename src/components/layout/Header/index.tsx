import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { toast } from "@/components/ui/sonner";
import { ROUTERS } from "@/constant";
import { authApi } from "@/services/api/authApi";
import useLanguage from "@/store/useLanguage";
import { useUserStore } from "@/store/useUserStore";
import { getRefreshToken, setLanguageStorage } from "@/utils/storage";
import { useMutation } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

const languageOptions = [
  { value: "en", label: "English", flag: "/app/images/front/flag-en.svg" },
  { value: "ja", label: "日本語", flag: "/app/images/front/flag-jp.svg" },
  { value: "vi", label: "Tiếng Việt", flag: "/app/images/front/flag-vi.svg" },
];

export const Header = () => {
  const { t } = useTranslation();
  const { lang, setLanguage } = useLanguage();
  const { i18n } = useTranslation();
  const { logout, isAuthenticated } = useUserStore();


  const user = {
    username: "jfix",
    email: "jfix@example.com",
    avatar: "/app/images/avatars/default-avatar.png",
  };

  const navigate = useNavigate();
  const currentUser = user;

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language);
    setLanguageStorage(language);
  };

  const mutation = useMutation({
    mutationFn: (refreshToken: string) => authApi.logout(refreshToken),
    onSuccess: () => {
      logout();
      navigate(ROUTERS.LOGIN);
      toast.success(t("header.logout.success"));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLogout = () => {
    mutation.mutate(getRefreshToken() ?? "");
  };

  // Updated notifications with user avatars and better formatting
  const notifications = [
    {
      id: 1,
      message: "mentioned you in comment in a thread Project List.",
      time: "2 min ago",
    },
    {
      id: 2,
      message: "created a new goal in the design and development.",
      time: "30 min ago",
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4 md:space-x-8">
            <Link
              to={ROUTERS.HOME}
              className="flex items-center space-x-2 text-2xl font-bold text-primary-30 hover:font-inter hover:text-2xl hover:font-bold"
            >
              <img
                src="/app/images/logo/jfix_white.svg"
                alt="Logo"
                className="w-10 h-10 object-contain rounded-lg"
              />
              <span>JFixer</span>
            </Link>
          </div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Notifications Menu */}
              <Menubar className="bg-white border-none shadow-none p-0 active:bg-white">
                <MenubarMenu>
                  <MenubarTrigger className="h-8 sm:h-9 p-2 bg-white hover:bg-transparent focus:bg-transparent active:bg-transparent data-[state=open]:bg-transparent">
                    <div className="relative">
                      <Bell
                        className="w-6 h-6 text-[#707070] fill-curren hover:text-primary-30"
                        style={{ fill: "currentColor" }}
                      />
                      {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
                      )}
                    </div>
                  </MenubarTrigger>
                  <MenubarContent className="w-96 p-2 mr-1">
                    <MenubarItem disabled className="font-medium text-sm">
                      {t("header.notifications")}
                    </MenubarItem>
                    <MenubarSeparator />
                    {notifications.length > 0 ? (
                      <div className="max-h-80 overflow-auto">
                        {notifications.map((notification) => (
                          <MenubarItem
                            key={notification.id}
                            className="cursor-pointer p-3 hover:bg-gray-50"
                          >
                            <div className="flex items-start gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage
                                  src={"/app/images/avatars/default-avatar.png"}
                                />
                              </Avatar>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                  <span className="text-sm text-gray-600">
                                    {notification.message}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-400 mt-1">
                                  {notification.time}
                                </span>
                              </div>
                            </div>
                          </MenubarItem>
                        ))}
                      </div>
                    ) : (
                      <MenubarItem disabled className="text-sm text-gray-500">
                        {t("header.noNotifications")}
                      </MenubarItem>
                    )}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>

              {/* User Menu */}
              <Menubar className="bg-white border-none shadow-none p-0 active:bg-white">
                <MenubarMenu>
                  <MenubarTrigger className="h-8 sm:h-9 p-2 bg-white hover:bg-transparent focus:bg-transparent active:bg-transparent data-[state=open]:bg-transparent">
                    <Avatar>
                      <AvatarImage
                        src={
                          currentUser.avatar ||
                          "/app/images/avatars/default-avatar.png"
                        }
                      />
                      <AvatarFallback>
                        {currentUser.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </MenubarTrigger>
                  <MenubarContent className="w-64 p-2 mr-1">
                    <>
                      <MenubarItem>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={
                                currentUser.avatar ||
                                "/app/images/avatars/default-avatar.png"
                              }
                            />
                            <AvatarFallback>
                              {currentUser.username.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="overflow-hidden">
                            <p className="font-medium text-sm truncate">
                              {currentUser.username}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {currentUser.email}
                            </p>
                          </div>
                        </div>
                      </MenubarItem>
                      <MenubarSeparator />
                    </>
                    <MenubarItem onClick={() => navigate(ROUTERS.USER_PROFILE)}>
                      {t("header.profile")}
                    </MenubarItem>
                    <MenubarItem
                      onClick={() => navigate(ROUTERS.USER_SETTINGS)}
                    >
                      {t("header.settings")}
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                      <MenubarSubTrigger className="text-sm">
                        {t("header.language")}
                      </MenubarSubTrigger>
                      <MenubarSubContent className="flex flex-col gap-1">
                        {languageOptions.map((option) => (
                          <MenubarItem
                            key={option.value}
                            onClick={() => handleLanguageChange(option.value)}
                            className={
                              lang === option.value
                                ? "bg-accent text-accent-foreground font-normal"
                                : ""
                            }
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={option.flag}
                                alt={option.value}
                                className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm shadow-sm"
                              />
                              <span className="font-medium">
                                {t(`header.languages.${option.value}`)}
                              </span>
                            </div>
                          </MenubarItem>
                        ))}
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem
                      onClick={handleLogout}
                      className="text-destructive font-medium"
                    >
                      {t("header.logout")}
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          ) : (
            <Link to={ROUTERS.LOGIN} className="rounded-full">
                <Button className="rounded-full">
                  {t("header.login")}
                </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
