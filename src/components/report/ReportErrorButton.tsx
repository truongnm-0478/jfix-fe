import { useCreateReport } from "@/hooks/useReport";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { ReportModal } from "./ReportModal";

interface ReportErrorButtonProps {
  cardId: number;
  textColor?: string;
  hoverBgColor?: string;
}

export const ReportErrorButton = ({ cardId, textColor = "text-slate-500", hoverBgColor = "bg-[#f0f0f0]" }: ReportErrorButtonProps) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: createReport, isSuccess } = useCreateReport();

  const handleReportError = () => {
    setIsModalOpen(true);
  };

  const handleConfirmReport = (content: string) => {
    createReport({
      cardId,
      content,
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t("report.reportSuccess"));
    }
  }, [isSuccess, t]);

  return (
    <>
      <div
        onClick={handleReportError}
        className={`cursor-pointer rounded-full p-2 ${textColor} hover:${hoverBgColor}`} >
        <AlertCircle className="w-6 h-6" />
      </div>
      
      <ReportModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmReport}
        title={t("report.reportError")}
      />
    </>
  );
};