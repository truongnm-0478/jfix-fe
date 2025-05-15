import { Shuffle } from "lucide-react";
import { useTranslation } from "react-i18next";

interface WordSortModeProps {
  selectedWords: string[];
  handleWordSelect: (word: string, fromShuffled: boolean) => void;
  resetArrangement: () => void;
  shuffledWords: string[];
}

export const WordSortMode = ({
  selectedWords,
  handleWordSelect,
  resetArrangement,
  shuffledWords,
}: WordSortModeProps) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{t("learn_question.arrange")}</h3>

      <div className="mb-4 p-3 min-h-12 rounded border border-1 border-gray-400 border-dashed">
        <div className="flex flex-wrap gap-2">
          {selectedWords.map((word, index) => (
            <button
              key={index}
              onClick={() => handleWordSelect(word, false)}
              className="px-3 py-1 bg-primary text-white rounded hover:bg-primary/80 transition-colors"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-50 rounded">
        <div className="flex flex-wrap gap-2">
          {shuffledWords.map((word, index) => (
            <button
              key={index}
              onClick={() => handleWordSelect(word, true)}
              className="px-3 py-1 bg-[#f1f1f1] text-gray-800 rounded hover:bg-gray-300 transition-colors"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={resetArrangement}
        className="flex items-center gap-2 px-4 py-2 bg-slate-500 text-white rounded hover:bg-gray-600 transition-colors"
      >
        <Shuffle className="w-4 h-4" />
        {t("learn_question.reset")}
      </button>
    </div>
  );
};
