import Loading from "@/components/common/Loading";
import { LearningGoalResponse } from "@/dataHelper/learningGoal.dataHelper";
import { UserStats } from "@/dataHelper/user.dataHelper";
import { useAllAchievement, useLearningGoal, useUserStats } from "@/hooks/useAchievement";
import { useTranslation } from "react-i18next";
import LearningGoalCard from "../Learn/components/LearningGoalCard";
import { StatsCard } from "../Learn/components/StatsCard";
import { DistributionPieChart } from "./components/DistributionPieChart";
import { Heatmap } from "./components/Heatmap";
import { LearningPerformanceChart } from "./components/LearningPerformanceChart";
import { Overview } from "./components/Overview";
import { chartConfig } from "./constant";

const UserProgress = () => {
  const { t } = useTranslation();
  
  const { data, isLoading, error } = useAllAchievement();
  const { data: userStatsData, isLoading: userStatsLoading } = useUserStats();
  const { data: learningGoalData, isLoading: learningGoalLoading } = useLearningGoal();

  const getAchievementValue = (type: string) => {
    if (!data?.achievements) return 0;
    const achievement = data.achievements.find(
      (a) => a.achievementType === type
    );
    return achievement ? achievement.achievementValue : 0;
  };

  if (isLoading || userStatsLoading || learningGoalLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-red-500">
          {t("userProgress.error")}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const {
    heatmapData,
    errorRateData,
    errorImprovement,
    totalCards,
    cardsByDifficulty,
  } = data;

  const totalAllCards = cardsByDifficulty.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const completionPercentage =
    totalAllCards > 0 ? Math.round((totalCards / totalAllCards) * 100) : 0;

  const userStats: UserStats | null = userStatsData?.data ?? null;
  const learningGoal: LearningGoalResponse | null =
    learningGoalData?.data ?? null;

  return (
    <div className="min-h-screen md:py-8 py-12 xl:px-2 px-4">
      <div className="xl:px-5 px-0 grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4 order-1 xl:order-2 flex flex-col gap-1">
          <StatsCard userStats={userStats} />
          <LearningGoalCard
            targetDate={learningGoal?.targetDate ?? ""}
            targetLevel={learningGoal?.targetLevel ?? ""}
          />
          <DistributionPieChart
            cardsByDifficulty={cardsByDifficulty}
            chartConfig={chartConfig}
            totalAllCards={totalAllCards}
          />
        </div>
        <div className="xl:col-span-8 order-2 xl:order-1 pb-8 md:pb-0">
          <div className="lg:col-span-8">
            <Overview
              totalCards={totalCards}
              completionPercentage={completionPercentage}
              streakDays={getAchievementValue("STREAK_DAYS")}
              achievementValue={getAchievementValue("LESSON_COMPLETED")}
              errorRate={errorRateData}
            />
            <div className="grid grid-cols-1 gap-4 mb-6">
              <LearningPerformanceChart 
                cardsOverTime={heatmapData} 
                errorImprovement={errorImprovement}
                chartConfig={chartConfig} 
              />
            </div>
            <Heatmap heatmapData={heatmapData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProgress;
