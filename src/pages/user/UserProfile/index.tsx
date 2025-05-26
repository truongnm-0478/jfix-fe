import Loading from "@/components/common/Loading";
import { Card, CardContent } from "@/components/ui/card";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Shield, User } from "lucide-react";
import { useTranslation } from "react-i18next";

export const UserProfile = () => {
  const { t } = useTranslation();
  const { data: userData, isLoading, error } = useUserProfile();
  const user = userData?.data;

  if (isLoading) {
    return <Loading message={t("profile.loading")} />;
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error instanceof Error
          ? error.message
          : t("profile.errors.fetchFailed")}
      </div>
    );
  }

  return (
    <Card className="overflow-hidden relative">
      <img src="/app/images/bg/cat-foot.png" alt="cat" className="w-12 md:w-20 h-auto absolute right-5 top-5" />
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <User size={40} className="text-gray-400" />
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-slate-700">{user?.name}</h3>
            <p className="text-md text-slate-500 mb-4">@{user?.username}</p>

            <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Shield size={14} />
              <span>{user?.role}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6">
          <div className="border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-gray-500 mb-2">
                {t("profile.fields.username")}
              </h4>
            </div>
            <p className="text-gray-900">{user?.username}</p>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-gray-500 mb-2">
                {t("profile.fields.name")}
              </h4>
            </div>
            <p className="text-gray-900">{user?.name}</p>
          </div>

          <div className="border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-gray-500">
                {t("profile.fields.email")}
              </h4>
            </div>
            <p className="text-gray-900 mt-1">{user?.email}</p>
          </div>

          <div className="pb-2">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-gray-500">
                {t("profile.fields.phone")}
              </h4>
            </div>
            <p className="text-gray-900 mt-1">
              {user?.phone || t("profile.notProvided")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
