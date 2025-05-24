import { ReportErrorButton } from "@/components/report/ReportErrorButton";
import { ROUTERS } from "@/constant";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Header = ({ cardId }: { cardId: number }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center gap-4 border-b mb-4 py-3">
        <div>
          <span className="text-lg font-bold text-slate-600 xl:pl-4">{t("learn.vocab")}</span>
        </div>
      <div className="flex items-center gap-1">
        <ReportErrorButton cardId={cardId} />
        <div
          className="cursor-pointer hover:bg-[#f0f0f0] rounded-full p-2"
          onClick={() => navigate(ROUTERS.LEARN_VOCABULARY)}>
          <X className="w-6 h-6 text-slate-500" />
        </div>
      </div>
    </div>
  );
};