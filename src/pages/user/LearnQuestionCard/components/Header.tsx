import { ReportErrorButton } from "@/components/report/ReportErrorButton";
import { Content } from "@/dataHelper/study.dataHelper";
import { useTranslation } from "react-i18next";
import { StudyMode } from "../constant";
import { StudyModeSelector } from "./StudyModeSelector";

interface HeaderProps {
  mode: StudyMode;
  data: Content;
  onModeChange: (mode: StudyMode) => void;
  currentMode: StudyMode;
}

export const Header = ({ mode, data, onModeChange, currentMode }: HeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 mx-2 gap-4">
      <div className="w-full md:w-auto">
        <h2 className="text-2xl font-semibold mb-2 md:mb-3 text-gray-800">
          {t("learn_question.title_learning")}
        </h2>
        <div className="flex flex-wrap gap-2">
          <p className="text-sm text-gray-600 bg-blue-100 text-blue-700 rounded-full px-3 py-1">
            {t(`learn_question.${mode}_description`)}
          </p>
          <p className="text-sm bg-green-100 text-green-700 rounded-full px-3 py-1">
            {t("learn_question.level")}: {data.level}
          </p>
        </div>
      </div>
      <div className="w-full md:w-auto flex items-center gap-2">
        <StudyModeSelector
          currentMode={currentMode}
          onModeChange={onModeChange}
        />
        <ReportErrorButton
          cardId={data.cardId}
        />
      </div>
    </div>
  );
};

