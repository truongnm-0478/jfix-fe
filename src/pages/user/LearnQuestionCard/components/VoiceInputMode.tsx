import { Content } from "@/dataHelper/study.dataHelper";
import { Mic, MicOff, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

interface VoiceInputModeProps {
  data: Content;
  isRecording: boolean;
  stopRecording: () => void;
  startRecording: () => void;
  recordedAudio: string | null;
  isProcessingSpeech: boolean;
  userAnswer: string;
}

export const VoiceInputMode = ({
  data,
  isRecording,
  stopRecording,
  startRecording,
  recordedAudio,
  isProcessingSpeech,
  userAnswer,
}: VoiceInputModeProps) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{t("learn_question.voice")}</h3>
      <div className="mb-3 p-3 bg-green-50 rounded">
        <p className="text-gray-700">{t("learn_question.hint")}: {data.sampleAnswerVietnamese}</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessingSpeech}
          className={`p-4 rounded-full ${
            isRecording
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed`}
          aria-label={isRecording ? t("learn_question.stop_recording") : t("learn_question.start_recording")}
        >
          {isRecording ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
        </button>

        {recordedAudio && !isProcessingSpeech && !isRecording && (
          <button
            onClick={startRecording}
            className="p-4 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-colors"
            aria-label={t("learn_question.record_again")}
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        )}

        <span className="text-gray-600">
          {isProcessingSpeech 
            ? t("record.processing")
            : isRecording 
              ? t("record.recording") 
              : t("record.record")}
        </span>
      </div>

      {/* Hiển thị kết quả speech-to-text */}
      {userAnswer && !isRecording && !isProcessingSpeech && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {t("learn_question.speech_result")}:
          </h4>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-800">{userAnswer}</p>
          </div>
        </div>
      )}

      {isProcessingSpeech && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-500"></div>
        </div>
      )}
    </div>
  );
};
