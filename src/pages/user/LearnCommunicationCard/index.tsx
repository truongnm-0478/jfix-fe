import Loading from "@/components/common/Loading";
import { ROUTERS } from "@/constant";
import { FreeTalkResponse } from "@/dataHelper/ai.dataHelper";
import { Message } from "@/dataHelper/communication.dateHelper";
import { Content } from "@/dataHelper/study.dataHelper";
import { useCalculateAchievement } from "@/hooks/useAchievement";
import { useCommunication, useFreeTalk, useSpeechToText } from "@/hooks/useCommunication";
import { studyApi } from "@/services/api/studyApi";
import { useUserStore } from "@/store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import JapaneseChat from "./components/JapaneseChat";

const LearnCommunicationCard = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [currentCard, setCurrentCard] = useState<Content | null>(null);
  const [aiMessage, setAiMessage] = useState<FreeTalkResponse | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [speechToText, setSpeechToText] = useState<string | null>(null);

  const { freeTalkTopicData, freeTalkTopicLoading } = useCommunication();
  const allCards = useMemo(() => freeTalkTopicData?.flatMap((item) => item.cards) ?? [], [freeTalkTopicData]);
  const { mutate: calculateAchievements } = useCalculateAchievement();
  const { freeTalk } = useFreeTalk();
  const { convertSpeechToText } = useSpeechToText();

  const { mutate: reviewCommunication } = useMutation({
    mutationFn: (data: { id: number; performance: number }) =>
      studyApi.reviewCommunication(data),
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
    if (allCards.length === 0 && !freeTalkTopicLoading) {
      navigate(ROUTERS.STREAK_DAY);
    }
  }, [allCards, freeTalkTopicLoading, navigate]);

  useEffect(() => {
    return () => {
      calculateAchievements();
    };
  }, []);

  const handleReview = (difficulty: number) => {
    if (!currentCard) return;
    reviewCommunication({ id: currentCard.id, performance: difficulty });
  };

  const handleSpeechToText = async (audioBlob: Blob) => {
    try {
      setIsLoading(true);
      const text = await convertSpeechToText(audioBlob);
      setSpeechToText(text);
    } catch (error) {
      console.error('Error in speech to text conversion:', error);
      setSpeechToText(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (message: Message) => {
    setIsLoading(true);
    freeTalk({ 
      user_id: user?.id || 0,
      theme: currentCard?.japaneseText || '',
      level: currentCard?.level || '',
      user_input: message.user_input || ''
    }, {
      onSuccess: (response) => {
        setAiMessage(response);
        setIsLoading(false);
      },
      onError: () => setIsLoading(false)
    });
  };

  const handleEndConversation = () => {
    if (!currentCard) return;
    setIsCompleted(true);
    handleReview(2);
  };

  const handleNextConversation = () => {
    if (!currentCard) return;
    setIsCompleted(false);
  };

  if (freeTalkTopicLoading) return <Loading />

  return (
      <>
        {currentCard && <JapaneseChat 
          onSpeechToText={handleSpeechToText}
          onSendMessage={handleSendMessage}
          onEndConversation={handleEndConversation}
          currentTopic={currentCard || null}
          aiMessage={aiMessage}
          isLoading={isLoading}
          isCompleted={isCompleted}
          speechToText={speechToText}
          onNextConversation={handleNextConversation}
        />}
      </>
  );
}

export default LearnCommunicationCard;