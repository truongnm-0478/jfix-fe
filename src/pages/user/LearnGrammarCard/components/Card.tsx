import { Back, Flashcard, Front } from "@/components/learn/Flashcard";
import { Content } from "@/dataHelper/study.dataHelper";
import { useEffect, useState } from "react";

interface CardProps {
  currentCard: Content;
}

export default function Card({ currentCard }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
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
              {currentCard?.structure}
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
              <h1 className="md:text-5xl text-3xl font-bold mb-2">
                {currentCard?.structure}
                {currentCard?.romaji && (
                  <div className="text-base text-indigo-600 font-medium mb-1">
                    {currentCard.romaji}
                  </div>
                )}
              </h1>
              <div className="mt-3 text-base md:text-lg text-gray-700 pl-3 italic font-light text-primary">
                {currentCard?.meaning || ""}
              </div>
              <div className="mt-3 text-base md:text-lg text-gray-700 pl-3 italic font-light">
                {currentCard?.usage || ""}
              </div>
              <div
                className="mt-3 text-base md:text-lg text-gray-700 pl-3"
                dangerouslySetInnerHTML={{
                  __html: currentCard?.japaneseTextFurigana || "",
                }}
              ></div>
            </div>
            <div className="mt-3 text-base md:text-lg text-gray-700 pl-3 italic text-slate-500">
              {currentCard?.exampleMeaning || ""}
            </div>
          </div>
        </Back>
      </Flashcard>
    </div>
  );
}
