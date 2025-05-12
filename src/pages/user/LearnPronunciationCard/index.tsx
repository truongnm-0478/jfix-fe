import Loading from "@/components/common/Loading";
import { ROUTERS } from "@/constant";
import { Content, SpeechToTextResponse, StudyRequest } from "@/dataHelper/study.dataHelper";
import { useSentence } from "@/hooks/useSentence";
import { studyApi } from "@/services/api/studyApi";
import { audioBlobToBase64 } from "@/utils/audioUtils";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./components/Card";

const LearnPronunciationCard = () => {
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState<Content | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [speechToTextResult, setSpeechToTextResult] = useState<SpeechToTextResponse | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isRentryRecorded, setIsRentryRecorded] = useState(false);

  const { data: sentenceData, isLoading: sentenceLoading } = useSentence();
  const allCards = useMemo(() => sentenceData?.flatMap((item) => item.cards) ?? [], [sentenceData]);

  const { mutate: reviewPronunciation } = useMutation({
    mutationFn: (data: StudyRequest) =>
      studyApi.reviewPronunciation(data),
    onSuccess: (response) => {
      const newCards: Content[] = response?.flatMap((item: any) => item.cards) ?? [];
      if (newCards.length > 0) {
        setCurrentCard(newCards[0]);
        setCardIndex(0);
      } else {
        navigate(ROUTERS.STREAK_DAY);
      }
    },
  });

  useEffect(() => {
    if (allCards.length > 0) {
      setCurrentCard(allCards[cardIndex]);
    }
  }, [allCards, cardIndex]);

  useEffect(() => {
    if (allCards.length === 0 && !sentenceLoading) {
      navigate(ROUTERS.STREAK_DAY);
    }
  }, [allCards, sentenceLoading, navigate]);

  const mutation = useMutation({
    mutationFn: async (audioBlob: Blob) => {
      const base64Audio = await audioBlobToBase64(audioBlob);
      return studyApi.speechToText({
        audio_data: base64Audio,
        user_romaji: currentCard?.japaneseText ?? "",
        language: "ja-JP",
      });
    },
    onSuccess: (response) => setSpeechToTextResult(response),
    onError: () => setSpeechToTextResult(null),
    onSettled: () => setIsSending(false), 
  });

  const handleSendAudio = () => {
    if (!audioBlob) return;
    setIsSending(true);
    setSpeechToTextResult(null);
    mutation.mutate(audioBlob);
  };

  const handleNextCard = (value: number) => {
    reviewPronunciation({
      id: currentCard?.id ?? 0,
      performance: value,
      userInput: speechToTextResult?.text ?? "",
      correctAnswer: currentCard?.japaneseText ?? "",
      feedbackProvided: "",
    });
    setSpeechToTextResult(null);
    setAudioBlob(null);
    setIsSending(false);
    setIsRecording(false);
    setIsRentryRecorded(true);
  };

  if (sentenceLoading) return <Loading />;

  return (
    <Card
      currentCard={currentCard}
      isSending={isSending}
      speechToTextResult={speechToTextResult}
      setAudioBlob={setAudioBlob}
      audioBlob={audioBlob}
      handleSendAudio={handleSendAudio}
      onNextCard={handleNextCard}
      isRecording={isRecording}
      setIsRecording={setIsRecording}
      isRentryRecorded={isRentryRecorded}
    />
  );
};

export default LearnPronunciationCard;
