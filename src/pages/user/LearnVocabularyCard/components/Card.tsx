import { Back, Flashcard, Front } from "@/components/learn/Flashcard";
import { Button } from "@/components/ui/button";
import { Content } from "@/dataHelper/study.dataHelper";
import { handlePlayAudioUrl } from "@/utils/audioUtils";
import { Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface CardProps {
  currentCard: Content;
}

export default function Card({ currentCard }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useTranslation();

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsFlipped(false);
  }, [currentCard]);

  const handleFlip = (newFlippedState: boolean) => {
    setIsFlipped(newFlippedState);
  };

  return (
    <div className="w-full h-[calc(100vh-250px)] md:h-[calc(100vh-180px)] mx-auto">
      <Flashcard
        id={1}
        onFlip={handleFlip}
        isFlipped={isFlipped}
        className="w-full h-full"
      >
        <Front>
          <div className="text-center">
            <h1 className="md:text-5xl text-3xl font-bold mb-2">
              {currentCard?.word}
            </h1>
            {currentCard?.example && (
              <div className="mt-3 text-base md:text-lg text-gray-700 border-l-2 border-indigo-200 pl-3">
                {currentCard.example}
              </div>
            )}
          </div>
        </Front>
        <Back>
          <div className="position-relative text-center">
            <div className="text-black">
              <div className="flex flex-col gap-2">
              {currentCard?.reading && (
                <div className="text-sm text-indigo-600 font-medium mb-1">
                  {currentCard.reading}
                </div>
              )}
              <h1 className="md:text-5xl text-3xl font-bold mb-2">
                {currentCard?.word}
              </h1>
              <h1 className="md:text-2xl text-xl font-bold mb-2">
                <span className="text-indigo-600">{t("common.meaning")}: </span>
                {currentCard?.meaning}
              </h1>
              </div>
              <div
                className="mt-3 text-base md:text-lg text-gray-700 pl-3"
                dangerouslySetInnerHTML={{
                  __html: currentCard?.japaneseTextFurigana || "",
                }}
              ></div>
              <div className="mt-3 text-base md:text-lg text-gray-700 pl-3 italic">
                {currentCard?.exampleMeaning || ""}
              </div>
            </div>
            <Button
              type="button"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handlePlayAudioUrl(currentCard?.audioUrl ?? "", audioRef);
              }}
              tabIndex={0}
              className="flex-shrink-0 p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors duration-200 mt-5"
            >
              <Volume2 className="w-5 h-5 text-indigo-600" />
            </Button>
            {currentCard?.audioUrl && (
              <audio ref={audioRef} src={currentCard.audioUrl} preload="none" />
            )}
          </div>
        </Back>
      </Flashcard>
    </div>
  );
}
