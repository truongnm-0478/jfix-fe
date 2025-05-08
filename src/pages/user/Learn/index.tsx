import Loading from "@/components/common/Loading";
import { LearningGoalResponse } from "@/dataHelper/learningGoal.dataHelper";
import { UserStats } from "@/dataHelper/user.dataHelper";
import { learningGoalApi } from "@/services/api/learningGoalApi";
import { userApi } from "@/services/api/userApi";
import { capitalizeAll } from "@/utils/stringUtils";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { FeatureCard } from "./components/FeatureCard";
import LearningGoalCard from "./components/LearningGoalCard";
import { StatsCard } from "./components/StatsCard";
import WelcomeBackCard from "./components/WelcomeBackCard";
import { LEARN_CARDS } from "./contant";

const Learn = () => {
  const { t } = useTranslation();

  const { data: userStatsData, isLoading: userStatsLoading } = useQuery({
    queryKey: ["userStats"],
    queryFn: () => userApi.getUserStats(),
  });

  const { data: learningGoalData, isLoading: learningGoalLoading } = useQuery({
    queryKey: ["learningGoal"],
    queryFn: () => learningGoalApi.getLearningGoal(),
  });

  const userStats: UserStats | null = userStatsData?.data ?? null;
  const learningGoal: LearningGoalResponse | null = learningGoalData?.data ?? null;

  if (userStatsLoading || learningGoalLoading) return <Loading />;
  
  return (
    <div className="min-h-screen py-8 px-2">
      <div className="px-5 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
        <WelcomeBackCard />
        <h2 className="font-extrabold text-2xl mb-6 text-center lg:text-left">
          {capitalizeAll(t("learn.title"))}
        </h2>
        {LEARN_CARDS.map((card, idx) => (
          <FeatureCard key={card.title + idx} {...card} />
        ))}
      </div>
      <div className="lg:col-span-4 pb-3">
        <StatsCard userStats={userStats} />
        <LearningGoalCard
          targetDate={learningGoal?.targetDate ?? ""}
          targetLevel={learningGoal?.targetLevel ?? ""}
        />
      </div>
    </div>
  </div>
  );
};

export default Learn;
