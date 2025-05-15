import { Card } from "@/components/ui/card";
import { Content } from "@/dataHelper/study.dataHelper";
import { Volume2 } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface QuestionProps {
  data: Content;
  playQuestionAudio: () => void;
  isPlayingAudio: boolean;
}

export const Question = ({
  data,
  playQuestionAudio,
  isPlayingAudio,
}: QuestionProps) => {
  const { t } = useTranslation();

  // Auto-play audio when component mounts or data changes
  useEffect(() => {
    if (data) {
      playQuestionAudio();
    }
  }, [data]);

  return (
    <Card className="mb-6 p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-primary">{t("learn_question.question")}</h3>
        <button
          onClick={playQuestionAudio}
          disabled={isPlayingAudio}
          className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 transition-colors"
        >
          <Volume2
            className={`w-5 h-5 ${
              isPlayingAudio ? "text-indigo-500" : "text-indigo-700"
            }`}
          />
        </button>
      </div>
      <p
        className="text-lg text-gray-800 mb-1"
        dangerouslySetInnerHTML={{
          __html: data?.japaneseTextFurigana || data?.japaneseText || "",
        }}
      />
      <p className="text-gray-600 italic">{data?.vietnameseText}</p>
    </Card>
  );
};
