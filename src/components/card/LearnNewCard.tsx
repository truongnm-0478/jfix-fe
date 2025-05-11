import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAchievement } from "@/hooks/useAchievement";
import React from "react";
import { useTranslation } from "react-i18next";

interface LearnButtonProps {
  onLearn: () => void;
}

const LearnNowCard: React.FC<LearnButtonProps> = ({ onLearn }) => {
  const { t } = useTranslation();
  const { data: achievements } = useAchievement();

  const streakDay = achievements?.find((achievement) => achievement.achievementType === "STREAK_DAYS");
  const streakDayValue = streakDay?.achievementValue;

  return (
    <Card className="p-4 flex flex-col gap-4 justify-center items-center">
      {streakDayValue && streakDayValue > 0 && (
        <div className="flex items-center justify-center">
          <span className="text-md font-semibold">{t("common.streak")}: &nbsp;
            <span className="text-xl font-bold text-orange-500">{streakDayValue} </span>
          </span>
          <img
            src="../app/images/icon/fire.png"
            alt="learn"
            className="w-8 h-8"
          />
        </div>
      )}
      <Button onClick={onLearn} className="w-full">{t("common.learn_now")}</Button>
    </Card>
  );
};

export default LearnNowCard;
