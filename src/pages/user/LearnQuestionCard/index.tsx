import Loading from "@/components/common/Loading";
import { ROUTERS } from "@/constant";
import { Content, StudyRequest } from "@/dataHelper/study.dataHelper";
import { useCalculateAchievement } from "@/hooks/useAchievement";
import { useQuestion } from "@/hooks/useQuestion";
import { studyApi } from "@/services/api/studyApi";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JapaneseLearningCard } from "./components/JapaneseLearningCard";
const LearnQuestionCard = () => {
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState<Content | null>(null);
  const [cardIndex, setCardIndex] = useState(0);

  const { questionData, questionLoading } = useQuestion();
  const allCards = useMemo(() => questionData?.flatMap((item) => item.cards) ?? [], [questionData]);
  const { mutate: calculateAchievements } = useCalculateAchievement();

  const { mutate: reviewQuestion } = useMutation({
    mutationFn: (data: StudyRequest) =>
      studyApi.reviewQuestion(data),
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
    if (allCards.length === 0 && !questionLoading) {
      navigate(ROUTERS.STREAK_DAY);
    }
  }, [allCards, questionLoading, navigate]);

  useEffect(() => {
    return () => {
      calculateAchievements();
    };
  }, []);

  const handleReview = (difficulty: number, userAnswer: string, correctAnswer: string) => {
    if (!currentCard) return;
    reviewQuestion({ 
      id: currentCard.id,
      performance: difficulty,
      userInput: difficulty === 1 ? userAnswer : undefined,
      correctAnswer: difficulty === 1 ? correctAnswer : undefined,
      feedbackProvided: difficulty === 1 ? "" : undefined,
    });
  };

  if (questionLoading) return <Loading />
  return (
    <div className="xl:py-8 p-4 xl:px-2 px-4 md:mb-0 mb-10">
      <div className="xl:px-5 px-0 grid grid-cols-1 gap-8">
        {currentCard && <JapaneseLearningCard data={currentCard} onReview={handleReview} />}
      </div>
    </div>
  );
};

export default LearnQuestionCard;

