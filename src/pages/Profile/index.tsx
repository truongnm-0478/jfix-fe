import { useState } from "react";
import { ChangePassword } from "./components/ChangePassword";
import { MenuSetting } from "./components/MenuSetting";
import { UpdateProfile } from "./components/UpdateProfile";
import { UserProfile } from "./components/UserProfile";

export const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <UserProfile />;
      case "update":
        return <UpdateProfile />;
      case "password":
        return <ChangePassword />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="min-h-screen md:py-8 py-12 xl:px-2 px-4">
      <div className="xl:px-5 px-0 grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4 order-1 xl:order-2 flex flex-col gap-4">
          <MenuSetting activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="xl:col-span-8 order-2 xl:order-1 pb-8 md:pb-0">
          <div className="lg:col-span-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;