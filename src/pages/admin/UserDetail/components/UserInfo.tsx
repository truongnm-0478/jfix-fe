import Avatar from "@/components/common/Avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AdminUser } from "@/dataHelper/adminUser.dataHelper";
import { formatDate } from "@/utils/dateUtils";
import { ArrowLeft, Lock, Unlock } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type UserInfoProps = {
  user: AdminUser | undefined;
  onToggleLock: (id: number, currentStatus: boolean) => void;
};

const UserInfo: React.FC<UserInfoProps> = ({ user, onToggleLock }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const labelClass = "text-base text-gray-500 font-semibold text-end";
  const valueClass = "text-base font-medium";

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" className="text-primary bg-white border-primary font-semibold hover:bg-primary/10 hover:text-primary" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2 text-primary" />
          {t("common.back")}
        </Button>

        <Button
          className={`${user?.deleted ? "bg-green-500 text-white hover:bg-green-600" : "bg-rose-500 text-white hover:bg-rose-600"}`}
          variant={user?.deleted ? "destructive" : "default"}
          onClick={() => onToggleLock(user?.id || 0, user?.deleted || false)}
        >
          {user?.deleted ? (
            <>
              <Unlock className="w-4 h-4 mr-2" />
              {t("adminUsers.unlockUser")}
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              {t("adminUsers.lockUser")}
            </>
          )}
        </Button>
      </div>

      <Card>
        <CardContent className="p-6 space-y-0">
          <div className="grid grid-cols-12 gap-4 border-b border-blue-100 py-4">
            <p className={labelClass + " col-span-3"}>{t("adminUsers.name")}</p>
            <p className={valueClass + " col-span-9"}>{user?.name}</p>
          </div>

          <div className="grid grid-cols-12 gap-4 border-b border-blue-100 py-4">
            <p className={labelClass + " col-span-3"}>{t("adminUsers.status")}</p>
            <p className={valueClass + " col-span-9"}>
              <span className={`rounded-md px-2 py-1 text-sm font-semibold text-center min-w-[100px] ${user?.deleted ? "bg-rose-50 text-rose-500" : "bg-green-50 text-green-500"}`}>
                {user?.deleted ? t("adminUsers.deleted") : t("adminUsers.active")}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 border-b border-blue-100 py-4">
            <p className={labelClass + " col-span-3"}>{t("adminUsers.username")}</p>
            <p className={valueClass + " col-span-9"}>{user?.username}</p>
          </div>

          <div className="grid grid-cols-12 gap-4 border-b border-blue-100 py-4">
            <p className={labelClass + " col-span-3"}>{t("adminUsers.email")}</p>
            <p className={valueClass + " col-span-9 text-blue-500 underline"}>{user?.email}</p>
          </div>

          <div className="grid grid-cols-12 gap-4 border-b border-blue-100 py-4">
            <p className={labelClass + " col-span-3"}>{t("adminUsers.phone")}</p>
            <p className={valueClass + " col-span-9"}>{user?.phone}</p>
          </div>

          <div className="grid grid-cols-12 gap-4 border-b border-blue-100 py-4">
            <p className={labelClass + " col-span-3"}>{t("adminUsers.role")}</p>
            <p className={valueClass + " col-span-9"}>
              <span className={`rounded-md px-2 py-1 text-sm font-semibold text-center inline-block ${user?.role === "ADMIN" ? "bg-blue-50 text-blue-500" : "bg-cyan-50 text-cyan-500"}`}>
                {t(`adminUsers.${user?.role?.toLowerCase()}`)}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 border-b border-blue-100 py-4">
            <p className={labelClass + " col-span-3"}>{t("adminUsers.createDate")}</p>
            <p className={valueClass + " col-span-9"}>
              {formatDate(user?.createDate || "")} {t("adminUsers.by")} <span className="text-blue-500">{user?.createBy}</span>
            </p>
          </div>

          <div className="grid grid-cols-12 gap-4 border-b border-blue-100 py-4">
            <p className={labelClass + " col-span-3"}>{t("adminUsers.updateDate")}</p>
            <p className={valueClass + " col-span-9"}>
              {formatDate(user?.updateDate || "")} {t("adminUsers.by")} <span className="text-blue-500">{user?.updateBy}</span>
            </p>
          </div>

          {user?.deleted && user?.deleteDate && (
            <div className="grid grid-cols-12 gap-4 py-4">
              <p className={labelClass + " col-span-3"}>{t("adminUsers.lockedAt")}</p>
              <p className={valueClass + " col-span-9"}>
                {formatDate(user?.deleteDate || "")} {t("adminUsers.by")} <span className="text-blue-500">{user?.deleteBy}</span>
              </p>
            </div>
          )}
          <div className="grid grid-cols-12 gap-4 py-4">
            <p className={labelClass + " col-span-3"}>{t("adminUsers.avatar")}</p>
            <div className="col-span-9 flex items-center">
              <Avatar name={user?.name || ""} avatar={user?.avatar || ""} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserInfo;