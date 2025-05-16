import { Mic, MicOff } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  isRecording: boolean;
  isRecorded: boolean;
  isSending: boolean;
  onStart: () => void;
  onStop: () => void;
  onRetry: () => void;
  onSend: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>, action: () => void) => void;
};

export const RecordButtonGroup = ({
  isRecording,
  isRecorded,
  isSending,
  onStart,
  onStop,
  onRetry,
  onSend,
  handleKeyDown,
}: Props) => {
  const { t } = useTranslation();
  return (
    <>
      {!isRecording && !isRecorded && (
        <>
          <button
            type="button"
            className="w-12 h-12 text-sm rounded-full font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center"
            tabIndex={0}
            onClick={onStart}
            onKeyDown={(e) => handleKeyDown(e, onStart)}
            disabled={isSending}
          >
            <Mic className="w-6 h-6" />
          </button>
          {t("learn_pronunciation.start_recording")}
        </>
      )}
      {isRecording && (
        <>
          <button
            type="button"
            className="w-12 h-12 text-sm rounded-full font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 bg-red-500 text-white flex items-center justify-center"
            tabIndex={0}
            onClick={onStop}
            onKeyDown={(e) => handleKeyDown(e, onStop)}
            disabled={isSending}
          >
            <MicOff className="w-6 h-6" />
          </button>
          {t("learn_pronunciation.stop_recording")}
        </>
      )}
      {isRecorded && !isRecording && (
        <div className="flex flex-wrap gap-4 w-full justify-center">
          <button
            type="button"
            className="w-40 text-sm px-6 py-2 rounded-lg font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 bg-yellow-400 text-white hover:bg-yellow-500"
            tabIndex={0}
            onClick={onRetry}
            onKeyDown={(e) => handleKeyDown(e, onRetry)}
            disabled={isSending}
          >
            {t("learn_pronunciation.retry_recording")}
          </button>
          <button
            type="button"
            className="w-40 text-sm px-6 py-2 rounded-lg font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 bg-green-600 text-white hover:bg-green-700"
            aria-label="Gửi ghi âm"
            tabIndex={0}
            onClick={onSend}
            onKeyDown={(e) => handleKeyDown(e, onSend)}
            disabled={isSending}
          >
            {t("learn_pronunciation.send_recording")}
          </button>
        </div>
      )}
    </>
  );
};
