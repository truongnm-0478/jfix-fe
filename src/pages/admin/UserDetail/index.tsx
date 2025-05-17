import Loading from "@/components/common/Loading";
import ConfirmDialog from "@/components/ui/dialog";
import { useAdminUserById, useLockUser, useUnlockUser } from "@/hooks/useAdminUser";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import UserInfo from "./components/UserInfo";
const UserDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading } = useAdminUserById(id || "");
  const { mutate: lockUser } = useLockUser();
  const { mutate: unlockUser } = useUnlockUser();

  const handleToggleLock = (id: number, currentStatus: boolean) => {
    if (currentStatus) {
      unlockUser(id.toString());
    } else {
      lockUser(id.toString());
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col mb-4 py-4">
        <h1 className="text-2xl font-bold text-primary">
          {t("adminUsers.userManagement")}
        </h1>
        <p className="text-muted-foreground font-light">
          {t("adminUsers.manageUserDetail")}
        </p>
      </div>
      <UserInfo user={data?.data} onToggleLock={() => setIsOpen(true)} />
      <ConfirmDialog
        title={data?.data?.deleted ? t("adminUsers.unlockUser") : t("adminUsers.lockUser")}
        description={`${t("adminUsers.confirm")} ${data?.data?.deleted ? t("adminUsers.unlockUser").toLowerCase() : t("adminUsers.lockUser").toLowerCase()} ${t("adminUsers.user").toLowerCase()} ${data?.data?.username}?`}
        onConfirm={() => handleToggleLock(data?.data?.id || 0, data?.data?.deleted || false)}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        confirmText={data?.data?.deleted ? t("adminUsers.unlockUser") : t("adminUsers.lockUser")}
        confirmVariant={data?.data?.deleted ? "default" : "destructive"}
      />
    </div>
  );
};

export default UserDetail;