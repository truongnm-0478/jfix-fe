import Loading from "@/components/common/Loading";
import { DifficultyButtons } from "@/components/learn/DifficultyButtons";
import { ROUTERS } from "@/constant";
import { Content } from "@/dataHelper/study.dataHelper";
import { useCalculateAchievement } from "@/hooks/useAchievement";
import { useGrammar } from "@/hooks/useGrammar";
import { studyApi } from "@/services/api/studyApi";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./components/Card";

const LearnGrammarCard = () => {
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState<Content | null>(null);
  const [cardIndex, setCardIndex] = useState(0);

  const { data: grammarData, isLoading: grammarLoading } = useGrammar();
  const allCards = useMemo(() => grammarData?.flatMap((item) => item.cards) ?? [], [grammarData]);
  const { mutate: calculateAchievements } = useCalculateAchievement();

  const { mutate: reviewGrammar } = useMutation({
    mutationFn: (data: { id: number; performance: number }) =>
      studyApi.reviewGrammar(data),
    onSuccess: (response) => {
      console.log("response", response);
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
    if (allCards.length === 0 && !grammarLoading) {
      navigate(ROUTERS.STREAK_DAY);
    }
  }, [allCards, grammarLoading, navigate]);

  useEffect(() => {
    return () => {
      calculateAchievements();
    };
  }, []);

  const handleReview = (difficulty: number) => {
    if (!currentCard) return;
    reviewGrammar({ id: currentCard.id, performance: difficulty });
  };

  if (grammarLoading) return <Loading />

  return (
    <div className="xl:py-8 py-4 xl:px-2 px-4">
      <div className="xl:px-5 px-0 grid grid-cols-1 gap-8">
        <div className="pb-8 md:pb-0">
          {currentCard && <Card currentCard={currentCard} />}
        </div>
        <div className="pb-10 md:pb-0">
          <DifficultyButtons onSelect={handleReview} />
        </div>
      </div>
    </div>
  );
}

export default LearnGrammarCard;
