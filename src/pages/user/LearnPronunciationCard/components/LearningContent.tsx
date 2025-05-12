import { Content } from "@/dataHelper/study.dataHelper";
import { handlePlayAudioUrl } from "@/utils/audioUtils";
import { t } from "i18next";
import { Volume2 } from "lucide-react";
import { useRef, useState } from "react";

interface CardProps {
  currentCard: Content;
}

export const LearningContent = ({ currentCard }: CardProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isFuriganaVisible, setIsFuriganaVisible] = useState(false);
  const [isMeaningVisible, setIsMeaningVisible] = useState(false);

  const handleToggleFurigana = () => setIsFuriganaVisible(!isFuriganaVisible);
  const handleToggleMeaning = () => setIsMeaningVisible(!isMeaningVisible);

  return (
    <div className="w-full flex flex-col items-center space-y-2 py-2">
      {currentCard?.audioUrl && (
        <button
          type="button"
          onClick={() => handlePlayAudioUrl(currentCard.audioUrl, audioRef)}
          className="w-16 h-16 flex items-center justify-center bg-indigo-100 hover:bg-indigo-200 rounded-full transition-all shadow-md"
        >
          <Volume2 className="w-8 h-8 text-indigo-700" />
        </button>
      )}

      <div className="w-full p-6 flex flex-col items-center">
        <div className="text-gray-900 text-xl font-medium text-center leading-relaxed mb-4 h-10 flex items-end justify-center">
          {isFuriganaVisible ? (
            <div
              className="xl:text-2xl text-lg"
              dangerouslySetInnerHTML={{
                __html: currentCard?.japaneseTextFurigana || "",
              }}
            />
          ) : (
            <div
              className="xl:text-2xl text-lg"
              dangerouslySetInnerHTML={{
                __html: currentCard?.japaneseText || "",
              }}
            />
          )}
        </div>

        <div className="w-full flex flex-col items-center h-20 border border-dashed border-slate-300 rounded-lg justify-center">
          {isMeaningVisible && (
            <div className="text-gray-700 bg-gray-50 px-4 py-2 rounded xl:text-lg text-base font-light text-primary">
              {currentCard?.vietnameseText}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <button
          type="button"
          className="w-40 text-sm px-6 py-2 rounded-lg font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-500 text-white"
          onClick={handleToggleFurigana}
        >
          {isFuriganaVisible
            ? t("learn_pronunciation.hide_furigana")
            : t("learn_pronunciation.show_furigana")}
        </button>

        <button
          type="button"
          className="w-40 text-sm px-6 py-2 rounded-lg font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 bg-pink-500 text-white"
          onClick={handleToggleMeaning}
        >
          {isMeaningVisible
            ? t("learn_pronunciation.hide_meaning")
            : t("learn_pronunciation.show_meaning")}
        </button>
      </div>

      {currentCard?.audioUrl && (
        <audio ref={audioRef} src={currentCard.audioUrl} preload="none" />
      )}
    </div>
  );
};

export default LearningContent;
