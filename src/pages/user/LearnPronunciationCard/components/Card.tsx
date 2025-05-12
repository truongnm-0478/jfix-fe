import { toast } from "@/components/ui/sonner";
import { Content, SpeechToTextResponse } from "@/dataHelper/study.dataHelper";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LearningContent } from "./LearningContent";
import { RecordButtonGroup } from "./RecordButtonGroup";
import { SpeechToTextResult } from "./SpeechToTextResult";

interface CardProps {
  currentCard: Content | null;
  handleSendAudio: () => void;
  isSending: boolean;
  speechToTextResult: SpeechToTextResponse | null;
  setAudioBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
  audioBlob: Blob | null;
  onNextCard: (value: number) => void;
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  isRentryRecorded: boolean;
}

const Card = ({
  currentCard,
  handleSendAudio,
  isSending,
  setAudioBlob,
  onNextCard,
  speechToTextResult,
  isRecording,
  setIsRecording,
  isRentryRecorded,
}: CardProps) => {
  const { t } = useTranslation();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const [isRecorded, setIsRecorded] = useState(false);
  const [recordingStopped, setRecordingStopped] = useState(false);

  const handleStartRecording = async () => {
    setIsRecorded(false);
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
      setAudioUrl(null);
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setAudioChunks([]);
      recorder.ondataavailable = (event: BlobEvent) => {
        setAudioChunks((prev) => [...prev, event.data]);
      };
      recorder.onstop = () => {};
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      toast.error(t("learn_pronunciation.cannot_access_microphone"));
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setRecordingStopped(true);
    }
  };

  const handleRetryRecording = () => {
    setAudioChunks([]);
    setAudioUrl(null);
    setIsRecorded(false);
  };

  useEffect(() => {
    if (recordingStopped && audioChunks.length > 0) {
      const blob = new Blob(audioChunks, { type: "audio/webm" });
      if (blob.size > 0) {
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        audioUrlRef.current = url;
        setAudioBlob(blob);
        setIsRecorded(true);
      } else {
        toast.error(t("learn_pronunciation.no_audio_data"));
      }
      setAudioChunks([]);
      setRecordingStopped(false);
    }
  }, [recordingStopped, audioChunks, setAudioBlob]);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    action: () => void
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      action();
    }
  };

  const handleNextCard = (value: number) => {
    onNextCard(value);
  };

  useEffect(() => {
    if (isRentryRecorded) {
      handleRetryRecording();
    }
  }, [isRentryRecorded, currentCard]);

  return (
    <div className="xl:py-8 py-4 xl:px-2 px-0 w-full flex justify-center">
      <div className="xl:px-5 px-0 w-full flex flex-col items-center gap-8">
        <div className="flex flex-col items-center justify-center gap-4 w-full rounded-2xl border border-gray-200 p-4 border-b-4">
          {currentCard && <LearningContent currentCard={currentCard} />}
          {!isSending && (
            <>
              <RecordButtonGroup
                isRecording={isRecording}
                isRecorded={isRecorded}
                isSending={isSending}
                onStart={handleStartRecording}
                onStop={handleStopRecording}
                onRetry={handleRetryRecording}
                onSend={handleSendAudio}
                handleKeyDown={handleKeyDown}
              />
              {audioUrl && (
                <audio controls className="mt-4 w-full">
                  <source src={audioUrl} type="audio/webm" />
                  {t("learn_pronunciation.browser_not_support")}
                </audio>
              )}
            </>
          )}
        </div>
        <SpeechToTextResult
          speechToTextResult={speechToTextResult}
          isSending={isSending}
          onNextCard={handleNextCard}
        />
      </div>
    </div>
  );
};

export default Card;
