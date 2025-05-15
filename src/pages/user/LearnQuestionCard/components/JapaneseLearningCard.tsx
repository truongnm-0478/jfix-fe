import { Content } from '@/dataHelper/study.dataHelper';
import { useSpeechToText } from '@/hooks/useCommunication';
import { useStudyMode } from '@/hooks/useQuestion';
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { StudyModes } from '../constant';
import { removePunctuation, shuffleArray, splitIntoWords } from "../helper";
import { FeedBack } from './FeedBack';
import { Header } from './Header';
import { Question } from './Question';
import { TextInputMode } from './TextInputMode';
import { VoiceInputMode } from './VoiceInputMode';
import { WordSortMode } from './WordSortMode';

interface JapaneseLearningCardProps {
  data: Content;
  onReview: (difficulty: number, userAnswer: string, correctAnswer: string) => void;
}

export const JapaneseLearningCard: React.FC<JapaneseLearningCardProps> = ({ data, onReview }) => {
  const { t } = useTranslation();
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isProcessingSpeech, setIsProcessingSpeech] = useState(false);

  const { convertSpeechToText } = useSpeechToText();
  const { mode, setMode } = useStudyMode();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Khởi tạo từ để sắp xếp khi mode là arrange
  useEffect(() => {
    if (mode === StudyModes.ARRANGE) {
      const words = splitIntoWords(data.sampleAnswerJapanese || "");
      setShuffledWords(shuffleArray(words));
    }
  }, [data.sampleAnswerJapanese, mode]);

  // Reset state khi đổi mode
  useEffect(() => {
    setUserAnswer("");
    setSelectedWords([]);
    setRecordedAudio(null);
    setFeedback(null);
    if (mode === StudyModes.ARRANGE) {
      const words = splitIntoWords(data.sampleAnswerJapanese || "");
      setShuffledWords(shuffleArray(words));
    }
  }, [mode, data.sampleAnswerJapanese]);

  // Phát audio câu hỏi
  const playQuestionAudio = () => {
    setIsPlayingAudio(true);
    audioRef.current = new Audio(data.audioUrl);
    audioRef.current.onended = () => setIsPlayingAudio(false);
    audioRef.current.play();
  };

  // Xử lý sắp xếp từ
  const handleWordSelect = (word: string, fromShuffled: boolean) => {
    if (fromShuffled) {
      setSelectedWords([...selectedWords, word]);
      setShuffledWords(shuffledWords.filter((w) => w !== word));
    } else {
      setShuffledWords([...shuffledWords, word]);
      setSelectedWords(selectedWords.filter((w) => w !== word));
    }
  };

  // Xử lý reset sắp xếp
  const resetArrangement = () => {
    const words = splitIntoWords(data.sampleAnswerJapanese || "");
    setShuffledWords(shuffleArray(words));
    setSelectedWords([]);
    setFeedback(null);
  };

  // Bắt đầu ghi âm
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        setIsProcessingSpeech(true);
        try {
          const speechText = await convertSpeechToText(audioBlob);
          setUserAnswer(speechText);
        } catch (error) {
          console.error("Speech to text error:", error);
          setFeedback({ 
            correct: false, 
            message: t("learn_question.error_speech_to_text") 
          });
        } finally {
          setIsProcessingSpeech(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setFeedback(null);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setFeedback({ correct: false, message: t("learn_question.access_denied_microphone") });
    }
  };

  // Dừng ghi âm
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  // Kiểm tra câu trả lời
  const checkAnswer = () => {
    let isCorrect = false;
    let message = "";
    const sampleAnswer = data.sampleAnswerJapanese || "";

    switch (mode) {
      case StudyModes.ARRANGE:
        const arrangedAnswer = selectedWords.join("");
        const cleanArranged = removePunctuation(arrangedAnswer);
        const cleanSampleArranged = removePunctuation(sampleAnswer);
        isCorrect = cleanArranged === cleanSampleArranged;
        message = isCorrect
          ? t("learn_question.correct")
          : t("learn_question.incorrect");
        break;

      case StudyModes.INPUT:
        const cleanInput = removePunctuation(userAnswer.trim());
        const cleanSampleInput = removePunctuation(sampleAnswer);
        isCorrect = cleanInput === cleanSampleInput;
        message = isCorrect
          ? t("learn_question.correct")
          : t("learn_question.incorrect");
        break;

      case StudyModes.RECORD:
        if (isProcessingSpeech) {
          message = t("learn_question.processing");
          return;
        }
        const cleanRecord = removePunctuation(userAnswer.trim());
        const cleanSampleRecord = removePunctuation(sampleAnswer);
        isCorrect = cleanRecord === cleanSampleRecord;
        message = isCorrect
          ? t("learn_question.correct")
          : t("learn_question.incorrect");
        break;
    }

    setFeedback({ correct: isCorrect, message });
  };

  return (
    <div className="rounded-lg">
      {/* Header */}
      <Header
        mode={mode}
        data={data}
        currentMode={mode}
        onModeChange={setMode}
      />

      {/* Câu hỏi */}
      <Question
        data={data}
        playQuestionAudio={playQuestionAudio}
        isPlayingAudio={isPlayingAudio}
      />

      {/* Chế độ sắp xếp từ */}
      {mode === StudyModes.ARRANGE && (
        <WordSortMode
          selectedWords={selectedWords}
          handleWordSelect={handleWordSelect}
          resetArrangement={resetArrangement}
          shuffledWords={shuffledWords}
        />
      )}

      {/* Chế độ nhập câu trả lời */}
      {mode === StudyModes.INPUT && (
        <TextInputMode
          data={data}
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
        />
      )}

      {/* Chế độ ghi âm */}
      {mode === StudyModes.RECORD && (
        <VoiceInputMode
          isRecording={isRecording}
          stopRecording={stopRecording}
          startRecording={startRecording}
          recordedAudio={recordedAudio}
          isProcessingSpeech={isProcessingSpeech}
          userAnswer={userAnswer}
          data={data}
        />
      )}

      {/* Nút kiểm tra */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex rounded-md" role="group">
          <button
            onClick={checkAnswer}
            disabled={
              (mode === StudyModes.ARRANGE && selectedWords.length === 0) ||
              (mode === StudyModes.INPUT && userAnswer.trim() === "") ||
              (mode === StudyModes.RECORD &&
                (!userAnswer || isProcessingSpeech))
            }
            className="px-6 py-2 bg-green-500 text-white border-green-600 rounded-l-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {t("learn_question.check")}
          </button>
          <button
            disabled={!feedback}
            onClick={() => onReview(feedback?.correct ? 2 : 1, userAnswer, data.sampleAnswerJapanese || "")}
            className="px-6 py-2 bg-blue-500 text-white border-blue-600 rounded-r-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {t("learn_question.evaluate")}
          </button>
        </div>
      </div>

      {/* Feedback */}
      {feedback && <FeedBack feedback={feedback} data={data} />}
    </div>
  );
};
