import { Card } from "@/components/ui/card";
import { VocabularyItem } from "@/dataHelper/study.dataHelper";
import { getColorByLevel } from "@/utils/lessonUtils";
import { Volume2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const VocabularyCard: React.FC<{ item: VocabularyItem }> = ({
  item,
}) => {
  const { t } = useTranslation();
  const playAudio = () => {
    const audio = new Audio(item.audio);
    audio.play().catch((e) => console.log("Audio play failed:", e));
  };

  return (
    <Card className="bg-white p-6 hover:border-primary/10 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{item.word}</h3>
            {item.reading !== "N/A" && (
              <span className="text-sm text-gray-600">({item.reading})</span>
            )}
            <span className={`${getColorByLevel(item.level)} px-3 py-1 rounded text-xs font-semibold`}>
              {item.level}
            </span>
          </div>
          <p className="text-primary font-semibold mb-2">{item.meaning}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>
              {t("common.chapter")} {item.chapter}
            </span>
            <span>•</span>
            <span>
              {t("common.section")} {item.section}
            </span>
          </div>
        </div>
        <button
          onClick={playAudio}
          className="text-primary hover:text-primary/80 transition-colors p-2 hover:bg-primary/10 rounded-full"
          title={t("common.play_audio")}
        >
          <Volume2 size={20} />
        </button>
      </div>

      {(item.exampleWithoutReading || item.exampleWithReading) && (
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-700 mb-2">
            {t("learn_vocabulary.example")}:
          </h4>
          <div className="bg-gray-50 rounded-lg p-3">
            {item.exampleWithoutReading && (
              <p className="text-lg mb-2 font-medium">
                {item.exampleWithoutReading}
              </p>
            )}
            {item.exampleMeaning && (
              <p className="text-gray-600 text-sm">{item.exampleMeaning}</p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
