import Loading from "@/components/common/Loading";
import { useAchievement, useCalculateAchievement } from "@/hooks/useAchievement";
import { useEffect } from "react";
import { FlameAnimation } from "./components/FlameAnimation";

const StreakDay = () => {
  const { data: achievements, isLoading: isAchievementLoading } = useAchievement();
  const { mutate: calculateAchievements, isPending: isCalculateAchievementsPending } = useCalculateAchievement();

  useEffect(() => {
    calculateAchievements();
  }, []);

  const streakDay = achievements?.find((achievement) => achievement.achievementType === "STREAK_DAYS");
  const streakDayValue = streakDay?.achievementValue ?? 0;
  const oldStreak = streakDayValue ? streakDayValue - 1 : 0;
  const completedStreakDay = achievements?.find((achievement) => achievement.achievementType === "LESSON_COMPLETED");
  const completedStreakDayValue = completedStreakDay?.achievementValue ?? 0;

  if (isAchievementLoading || isCalculateAchievementsPending) return (
    <div className="flex justify-center items-center h-screen">
      <Loading />
    </div>
  );

  return (
    <div>
      <FlameAnimation oldStreak={oldStreak} newStreak={streakDayValue} cardCount={completedStreakDayValue} />
    </div>
  );
};

export default StreakDay;