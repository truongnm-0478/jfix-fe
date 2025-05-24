import { ReportErrorButton } from "@/components/report/ReportErrorButton";
import { Content } from "@/dataHelper/study.dataHelper";
import { useTranslation } from "react-i18next";
import { AudioPlayer } from "./AudioPlayer";
import { FillInTheBlanks } from "./FillInTheBlanks";

interface JapaneseListeningExerciseProps {
  currentCard: Content;
  handleNext: (result: {
    correctCount: number;
    correctText: string;
    userText: string;
  }) => void;
}

export const JapaneseListeningExercise = ({ currentCard, handleNext }: JapaneseListeningExerciseProps) => {
  const {
    audioUrl,
    japaneseTextFurigana,
    vietnameseText,
    topic,
    level,
    id
  } = currentCard;
  const { t } = useTranslation();

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{t("learnListeningCard.title")}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              {t("learnListeningCard.level")}: {level}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
              {t("learnListeningCard.topic")}: {topic}
            </span>
          </div>
        </div>
        <ReportErrorButton
          cardId={currentCard.cardId}
        />
      </div>

      <AudioPlayer
        key={`audio-${id}-${audioUrl}`}
        audioUrl={audioUrl} 
        title={t("learnListeningCard.listenAndFillInTheBlank")}
      />

      <FillInTheBlanks 
        key={`fill-${id}-${japaneseTextFurigana}`}
        japaneseText={japaneseTextFurigana ?? ""}
        vietnameseText={vietnameseText ?? ""}
        onNext={handleNext}
      />
    </div>
  );
};