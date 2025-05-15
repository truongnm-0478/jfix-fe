import { MessageProps } from "@/dataHelper/communication.dateHelper";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AudioPlayer } from "./AudioPlayer";

export const MessageDisplay = ({
  message,
}: {
  message: MessageProps["message"];
}) => {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const isBot = message.sender === "bot";
  const [isVisibleVocabulary, setIsVisibleVocabulary] = useState(false);
  const [isShowMessage, setIsShowMessage] = useState(false);

  useEffect(() => {
    if (isBot && !message.audio) {
      setIsShowMessage(true);
    }
  }, [isBot, message.audio]);

  // Auto-play audio when bot message is received
  useEffect(() => {
    if (isBot && message.audio && audioRef.current) {
      const playAudio = async () => {
        try {
          audioRef.current!.src = `data:audio/mp3;base64,${message.audio}`;
          await audioRef.current!.play();
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      };
      playAudio();
    }
  }, [isBot, message.audio]);

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-4`}>
      <div
        className={`max-w-md px-4 py-2 rounded-2xl ${
          isBot ? "bg-slate-100 text-slate-800" : "bg-primary text-white"
        }`}
      >
        <p className="text-sm font-bold mb-1">
          {isBot ? "AI-sensei" : "あなた"}
        </p>

        {!isBot && (
          <p className="text-base">{message.text}</p>
        )}

        {isBot && isShowMessage ? (
          <p className="text-base">{message.text}</p>
        ) : (
          isBot && (
            <button
              onClick={() => setIsShowMessage(!isShowMessage)}
              className="text-md font-bold"
          >
              {t("learn_communication.show_message")}
            </button>
          )
        )}

        <div className="flex justify-between items-center">
          <div>
            {isBot && message.vocabulary && message.vocabulary.length > 0 && (
              <button
                onClick={() => setIsVisibleVocabulary(!isVisibleVocabulary)}
                className="text-xs text-primary hover:text-primary/80 font-bold"
              >
                {isVisibleVocabulary
                  ? t("learn_communication.hide_vocabulary")
                  : t("learn_communication.show_vocabulary")}
              </button>
            )}
          </div>
        </div>

        {/* Show correction if exists and has error */}
        {isBot && message.correction?.hasError && (
          <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm font-bold text-yellow-800 mb-1">
              {t("learn_communication.correction")}:{" "}
            </p>
            <p className="text-sm text-yellow-700">
              <span className="line-through">
                {message.correction.original}
              </span>
              <span className="mx-2">→</span>
              <span className="font-medium">
                {message.correction.suggestion}
              </span>
            </p>
            <p className="text-sm text-yellow-600 mt-1">
              {message.correction.explanation}
            </p>
          </div>
        )}

        {/* Show vocabulary if exists */}
        {isBot &&
          message.vocabulary &&
          message.vocabulary.length > 0 &&
          isVisibleVocabulary && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-bold text-blue-800 mb-2">
                {t("learn_communication.new_vocabulary")}:
              </p>
              <div className="space-y-2">
                {message.vocabulary.map((item, index) => (
                  <div key={index} className="text-sm">
                    <span className="font-medium text-primary">
                      {item.word}
                    </span>
                    <span className="text-primary mx-2">({item.reading})</span>
                    <span className="text-primary">- {item.meaning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Hidden audio element for auto-play and manual player for replay */}
        {isBot && message.audio && (
          <>
            <audio ref={audioRef} className="hidden" />
            <div className="mt-2">
              <AudioPlayer base64Audio={message.audio} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
