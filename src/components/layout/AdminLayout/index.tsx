import { Outlet } from "react-router";
import { Sidebar } from "../Sidebar";
export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto lg:ml-[280px] md:ml-[72px] bg-white pb-20 md:pb-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
