import Loading from "@/components/common/Loading";
import { ROUTERS } from "@/constant";
import { Content, StudyRequest } from "@/dataHelper/study.dataHelper";
import { useCalculateAchievement } from "@/hooks/useAchievement";
import { useListening } from "@/hooks/useListening";
import { studyApi } from "@/services/api/studyApi";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { JapaneseListeningExercise } from "./components/JapaneseListeningExercise";

const LearnListeningCard = () => {
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState<Content | null>(null);
  const [cardIndex, setCardIndex] = useState(0);

  const { paragraphData, paragraphLoading } = useListening();
  const allCards = useMemo(() => paragraphData?.flatMap((item) => item.cards) ?? [], [paragraphData]);
  const { mutate: calculateAchievements } = useCalculateAchievement();

  const { mutate: reviewListening } = useMutation({
    mutationFn: (data: StudyRequest) =>
      studyApi.reviewListening(data),
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
    if (allCards.length === 0 && !paragraphLoading) {
      navigate(ROUTERS.STREAK_DAY);
    }
  }, [allCards, paragraphLoading, navigate]);

  useEffect(() => {
    return () => {
      calculateAchievements();
    };
  }, []);

  const handleReview = (result: {
    correctCount: number;
    correctText: string;
    userText: string;
  }) => {
    if (!currentCard) return;
  
    const performanceMap = [0, 1, 1, 2, 3];
    const performance = performanceMap[result.correctCount] ?? 0;
  
    reviewListening({
      id: currentCard.id,
      performance,
      userInput: result.userText,
      correctAnswer: result.correctText,
      feedbackProvided: ""
    });
  };

  if (paragraphLoading) return <Loading />

  return (
    <div className="xl:py-8 py-4 xl:px-2 px-4 mb-20 md:mb-0">
      <div className="xl:px-5 px-0 grid grid-cols-1 gap-8">
          {currentCard && 
            <JapaneseListeningExercise 
              currentCard={currentCard} 
              handleNext={handleReview}
            />
          }
      </div>
    </div>
  );
}

export default LearnListeningCard;