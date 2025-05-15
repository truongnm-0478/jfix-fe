import { Content } from "@/dataHelper/study.dataHelper";
import { useTranslation } from "react-i18next";

interface TextInputModeProps {
  data: Content;
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
}

export const TextInputMode = ({
  data,
  userAnswer,
  setUserAnswer,
}: TextInputModeProps) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">
        {t("learn_question.input")}
      </h3>
      <div className="mb-3 p-3 bg-green-50 rounded">
        <p className="text-gray-700">{t("learn_question.hint")}: {data.sampleAnswerVietnamese}</p>
      </div>
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        className="w-full px-4 py-2 border border-1 border-gray-300 rounded focus:border-primary focus:outline-none"
        placeholder={t("learn_question.input")}
      />
    </div>
  );
};
