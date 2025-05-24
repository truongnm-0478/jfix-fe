import { Button } from '@/components/ui/button';
import { Download, RefreshCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DashboardHeaderProps {
  userName: string;
  onExportPDF: () => void;
  onRefresh: () => void;
}

export const DashboardHeader = ({
  userName,
  onExportPDF,
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
    <div className="mb-6 bg-white py-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            {t("adminDashboard.hello", { userName })}
          </h1>
          <p className="text-muted-foreground font-light">{formattedDate}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600"
            onClick={onRefresh}
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            {t("adminDashboard.refresh")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600"
            onClick={onExportPDF}
          >
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>
    </div>
  );
}; 