import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

export const NotificationTabs = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "all";

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  return (
    <Tabs value={tab} onValueChange={handleTabChange} className="mb-4">
      <TabsList>
        <TabsTrigger value="unread">{t("notification.unread")}</TabsTrigger>
        <TabsTrigger value="all">{t("notification.all")}</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
