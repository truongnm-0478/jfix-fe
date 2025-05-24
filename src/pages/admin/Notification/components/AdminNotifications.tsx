// AdminNotifications.tsx
import Loading from "@/components/common/Loading";
import { toast } from "@/components/ui/sonner";
import { useMarkAsRead, useReport, useReportUnread } from "@/hooks/useReport";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { NotificationTabs } from "./NotificationTabs";
import { ReportCard } from "./ReportCard";
import { ReportFilterButtons } from "./ReportFilterButtons";

export const AdminNotifications = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "all";
  const [filterType, setFilterType] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: reportsData, isLoading: isLoadingReports } = useReport();
  const { data: reportsUnreadData, isLoading: isLoadingUnread } = useReportUnread();
  const { mutate: markAsRead } = useMarkAsRead();

  const handleMarkAsRead = useCallback(
    (reportId: number) => {
      markAsRead(reportId, {
        onSuccess: () => {
          toast.success(t("notification.markAsReadSuccess"));
          queryClient.invalidateQueries({ queryKey: ["report"] });
        },
        onError: () => {
          toast.error(t("notification.markAsReadError"));
        },
      });
    },
    [markAsRead, queryClient]
  );

  const reports = useMemo(() => {
    const data = tab === "unread" ? reportsUnreadData?.data : reportsData?.data;
    return filterType ? data?.filter((r) => r.itemType === filterType) : data;
  }, [tab, reportsData, reportsUnreadData, filterType]);

  if (isLoadingReports || isLoadingUnread) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loading message={t("notification.loading")} />
      </div>
    );
  }

  return (
    <div className="py-4 px-0">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">{t("notification.title")}</h1>
          <p className="text-muted-foreground font-light">{t("notification.description")}</p>
        </div>
        <NotificationTabs />
      </div>

      <ReportFilterButtons selectedType={filterType} onSelectType={setFilterType} />

        <div>
          {reports?.length ? (
            reports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onMarkAsRead={handleMarkAsRead}
              />
            ))
          ) : (
            <div className="flex h-40 items-center justify-center text-muted-foreground border rounded-sm border-slate-200">
              {t("notification.noReports")}
            </div>
          )}
        </div>
    </div>
  );
};