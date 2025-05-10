import { Content } from "@/dataHelper/study.dataHelper";
import { handlePlayAudioUrl } from "@/utils/audioUtils";
import { Volume2 } from "lucide-react";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
type CommunicationCardProps = {
  content: Content;
  onToggleFavorite?: () => void;
  onPlayAudio?: () => void;
};

const CommunicationCard: React.FC<CommunicationCardProps> = ({ content }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl border border-gray-200 border-b-4 mb-5 overflow-hidden shadow-sm hover:shadow transition-shadow duration-300 cursor-pointer">
      <div
        className="flex flex-col md:flex-row items-stretch"
        tabIndex={0}
        role="button"
        aria-label="Toggle usage information"
      >
        <div className="flex-1 flex flex-col p-5">
          <div className="text-sm text-gray-600 mb-2 font-bold text-primary">
            {t("learn_communication.topic")}
          </div>
          <div className="flex items-start">
            <div className="flex-1">
              <div
                className="font-medium text-gray-800 md:text-xl"
                dangerouslySetInnerHTML={{
                  __html:
                    content.japaneseTextFurigana || content.japaneseText || "",
                }}
              ></div>
              {content.vietnameseText && (
                <div className="mt-3 text-sm text-gray-600 border-l-2 border-gray-200 pl-3 text-md">
                  {content.vietnameseText}
                </div>
              )}
            </div>

            {content.audioUrl && (
              <button
                type="button"
                onClick={() => handlePlayAudioUrl(content.audioUrl, audioRef)}
                tabIndex={0}
                className="flex-shrink-0 p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors duration-200"
              >
                <Volume2 className="w-5 h-5 text-indigo-600" />
              </button>
            )}
          </div>

          {content.audioUrl && (
            <audio ref={audioRef} src={content.audioUrl} preload="none" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunicationCard;
