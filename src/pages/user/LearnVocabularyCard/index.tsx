import Loading from "@/components/common/Loading";
import { DifficultyButtons } from "@/components/learn/DifficultyButtons";
import { ROUTERS } from "@/constant";
import { Content } from "@/dataHelper/study.dataHelper";
import { useCalculateAchievement } from "@/hooks/useAchievement";
import { useVocabulary } from "@/hooks/useVocabulary";
import { studyApi } from "@/services/api/studyApi";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./components/Card";
import { Header } from "./components/Header";

const LearnVocabularyCard = () => {
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState<Content | null>(null);
  const [cardIndex, setCardIndex] = useState(0);

  const { data: vocabularyData, isLoading: vocabularyLoading } = useVocabulary();
  const allCards = useMemo(() => vocabularyData?.flatMap((item) => item.cards) ?? [], [vocabularyData]);
  const { mutate: calculateAchievements } = useCalculateAchievement();

  const { mutate: reviewVocabulary } = useMutation({
    mutationFn: (data: { id: number; performance: number }) =>
      studyApi.reviewVocabulary(data),
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
    if (allCards.length === 0 && !vocabularyLoading) {
      navigate(ROUTERS.STREAK_DAY);
    }
  }, [allCards, vocabularyLoading, navigate]);

  useEffect(() => {
    return () => {
      calculateAchievements();
    };
  }, []);

  const handleReview = (difficulty: number) => {
    if (!currentCard) return;
    reviewVocabulary({ id: currentCard.id, performance: difficulty });
  };

  if (vocabularyLoading) return <Loading />

  return (
    <div className="xl:pb-8 pb-4 xl:px-2 px-4">
      <Header cardId={currentCard?.cardId ?? 0} />

      <div className="xl:px-5 px-0 grid grid-cols-1 md:gap-8 gap-0">
        <div className="pb-8 md:pb-0">
          {currentCard && <Card currentCard={currentCard} />}
        </div>  
        <div className="pb-20 md:pb-0">
          <DifficultyButtons onSelect={handleReview} />
        </div>
      </div>
    </div>
  );
}

export default LearnVocabularyCard;