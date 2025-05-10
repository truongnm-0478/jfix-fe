import { Content } from "@/dataHelper/study.dataHelper";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type GrammarCardProps = {
  content: Content;
  onToggleFavorite?: () => void;
  onPlayAudio?: () => void;
};

const GrammarCard: React.FC<GrammarCardProps> = ({ content }) => {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isUsageVisible, setIsUsageVisible] = useState<boolean>(false);

  const formatDialogueExample = (text: string) => {
    if (!text) return null;

    if (text.includes(" / ")) {
      const parts = text.split(" / ");

      return parts.map((part, index) => (
        <React.Fragment key={index}>
          {index > 0 && <div className="mt-2"></div>}
          <div>{part}</div>
        </React.Fragment>
      ));
    }

    return text;
  };

  const formatUsage = (text: string) => {
    if (!text) return null;

    const sentences = [];
    let currentSentence = "";
    let i = 0;

    while (i < text.length) {
      currentSentence += text[i];

      if (
        (text[i] === "…" || (text[i] === "." && text[i + 1] === "." && text[i + 2] === ".")) &&
        i + 1 < text.length
      ) {
        if (text[i] === ".") {
          currentSentence += ".."; 
          i += 3;
        } else {
          i++;
        }
        continue;
      }

      if (text[i] === "." && i + 1 < text.length && /[A-Z]/.test(text[i + 1])) {
        sentences.push(currentSentence);
        currentSentence = "";
        i++;
        continue;
      }

      i++;
    }

    if (currentSentence) {
      sentences.push(currentSentence);
    }

    return sentences.map((sentence, index) => (
      <React.Fragment key={index}>
        <span>- </span>
        {sentence}
        {index < sentences.length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // Toggle usage section on click
  const handleCardClick = () => {
    setIsUsageVisible((prev) => !prev);
  };

  // Handle keyboard interaction (Enter or Space)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsUsageVisible((prev) => !prev);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 border-b-4 mb-5 overflow-hidden shadow-sm hover:shadow transition-shadow duration-300 cursor-pointer">
      <div
        className="flex flex-col md:flex-row items-stretch"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={handleKeyDown}
        role="button"
        aria-expanded={isUsageVisible}
        aria-label="Toggle usage information"
      >
        {/* Left section: Word, Reading, Example */}
        <div className="flex-1 flex flex-col justify-center p-5 bg-slate-50 border-b md:border-b-0 md:border-r border-gray-100">
          {content.romaji && (
            <div className="text-sm text-indigo-600 font-medium mb-1">{content.romaji}</div>
          )}
          <div className="text-xl md:text-2xl font-semibold text-gray-900">
            {content.structure}
          </div>
          {content.example && (
            <div className="mt-3 text-sm text-gray-700 border-l-2 border-indigo-200 pl-3">
              {content.example}
            </div>
          )}
        </div>

        {/* Right section: Meaning, Example Meaning, Audio button */}
        <div className="flex-1 flex flex-col p-5">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="font-medium text-gray-800 md:text-2xl">{content.meaning}</div>
              {content.exampleMeaning && (
                <div className="mt-3 text-sm text-gray-600 border-l-2 border-gray-200 pl-3">
                  {formatDialogueExample(content.exampleMeaning)}
                </div>
              )}
            </div>
          </div>

          {content.audioUrl && (
            <audio ref={audioRef} src={content.audioUrl} preload="none" />
          )}
        </div>
      </div>
      {/* Usage section */}
      {isUsageVisible && content.usage && (
        <div className="w-full p-5 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            <span className="font-bold text-gray-800">{t("learn_grammar.usage")}: </span> <br/>
            {formatUsage(content.usage)}
          </div>
        </div>
      )}
    </div>
  );
};

export default GrammarCard;