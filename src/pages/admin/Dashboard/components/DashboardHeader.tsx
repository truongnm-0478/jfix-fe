import { Button } from '@/components/ui/button';
import { DownloadIcon, RefreshCwIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type DashboardHeaderProps = {
  userName: string;
  onExportData: () => void;
  onRefresh: () => void;
};

export const DashboardHeader = ({
  userName,
  onExportData,
  onRefresh,
}: DashboardHeaderProps) => {
  const { t } = useTranslation();
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(today);

  return (
    <div className="flex mb-4 py-4 gap-2 items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-primary">
          {t("adminDashboard.hello", { userName })}
        </h1>
        <p className="text-muted-foreground font-light">{formattedDate}</p>
      </div>
      <div className="flex gap-2">
      <Button
        onClick={onRefresh}
        className="flex items-center gap-1" 
      >
        <RefreshCwIcon className="h-4 w-4 mr-2" />
        {t("adminDashboard.refresh")}
      </Button>
      <Button
        onClick={onExportData}
        className="flex items-center gap-1" 
      >
        <DownloadIcon className="h-4 w-4 mr-2" />
        {t("adminDashboard.exportData")}
      </Button>
      </div>
    </div>
  );
}; 