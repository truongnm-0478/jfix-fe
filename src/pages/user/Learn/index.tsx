import Loading from "@/components/common/Loading";
import { LearningGoalResponse } from "@/dataHelper/learningGoal.dataHelper";
import { UserStats } from "@/dataHelper/user.dataHelper";
import { learningGoalApi } from "@/services/api/learningGoalApi";
import { userApi } from "@/services/api/userApi";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { FeatureCard } from "./components/FeatureCard";
import LearningGoalCard from "./components/LearningGoalCard";
import { StatsCard } from "./components/StatsCard";
import WelcomeBackCard from "./components/WelcomeBackCard";
import { LEARN_CARDS } from "./constant";

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
  const learningGoal: LearningGoalResponse | null =
    learningGoalData?.data ?? null;

  if (userStatsLoading || learningGoalLoading) return <Loading />;

  return (
    <div className="min-h-screen xl:py-8 py-4 xl:px-2 px-0">
      <div className="xl:px-5 px-0 grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4 order-1 xl:order-2 flex flex-col gap-4">
          <StatsCard userStats={userStats} />
          <LearningGoalCard
            targetDate={learningGoal?.targetDate ?? ""}
            targetLevel={learningGoal?.targetLevel ?? ""}
          />
        </div>
        <div className="xl:col-span-8 order-2 xl:order-1 pb-8 md:pb-0">
          <div className="lg:col-span-8">
            <WelcomeBackCard />
          </div>
          <h2 className="font-extrabold text-2xl mb-6 text-center lg:text-left">
            {t("learn_grammar.title")}
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {LEARN_CARDS.map((card, idx) => (
              <FeatureCard key={card.title + idx} {...card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
