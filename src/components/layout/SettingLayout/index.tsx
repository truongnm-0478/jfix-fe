import { Outlet } from "react-router";
import { MenuSetting } from "../MenuSetting";
import { Sidebar } from "../Sidebar";

export const SettingLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-white">
          <div className="min-h-screen py-8 xl:px-2 px-4">
            <div className="xl:px-5 px-0 grid grid-cols-1 xl:grid-cols-12 gap-8">
              <div className="xl:col-span-4 order-1 xl:order-2 flex flex-col gap-4">
                <MenuSetting />
              </div>
              <div className="xl:col-span-8 order-2 xl:order-1 pb-8 md:pb-0">
              <Outlet />
            </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingLayout;
