import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";
import { Sidebar } from "../Sidebar";

export const AdminLayout = () => {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 min-h-0 md:flex hidden">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto lg:ml-[280px] md:ml-[72px] bg-white pb-20 md:pb-4">
          <Outlet />
        </main>
      </div>
      <div className="md:hidden block bg-white p-4">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-sm text-red-500">{t("common.mobile")}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
