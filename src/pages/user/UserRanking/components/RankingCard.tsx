import { Card, CardContent } from "@/components/ui/card";
import { UserCardCount, UserStreak } from "@/dataHelper/user.dataHelper";
import { BookOpen, Flame } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { formatMonth } from "../helper";
import { RankingList } from "./RankingList";

interface RankingCardProps {
  data: UserStreak[] | UserCardCount[];
  type: "streak" | "cards";
  isLoading: boolean;
}

export const RankingCard: React.FC<RankingCardProps> = ({
  data,
  type,
  isLoading,
}) => {
  const { t } = useTranslation();
  const isStreakData = type === "streak";
  const cardData = data as UserCardCount[];

  return (
    <Card className="overflow-hidden">
      <div
        className={`${
          isStreakData
            ? "bg-gradient-to-r from-orange-500 to-red-600"
            : "bg-gradient-to-r from-blue-500 to-purple-600"
        } py-4 px-6`}
      >
        <h2 className="text-white text-xl font-bold flex items-center gap-2">
          {isStreakData ? (
            <Flame className="h-6 w-6" />
          ) : (
            <BookOpen className="h-6 w-6" />
          )}
          {isStreakData
            ? t('userRanking.mostStreak')
            : `${t('userRanking.topCards')} - ${
                cardData.length > 0 ? formatMonth(cardData[0].month) : ""
              }`}
        </h2>
        <p className="text-white/80 text-sm">
          {isStreakData
            ? t('userRanking.streakDescription')
            : t('userRanking.cardsDescription')}
        </p>
      </div>
      <CardContent className="p-0">
        <RankingList data={data} type={type} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};
