import { Card, CardContent } from "@/components/ui/card";
import { UserCardCount, UserStreak } from "@/dataHelper/user.dataHelper";
import { BookOpen, Crown, Flame } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

interface StatsCardProps {
  streakData: UserStreak[];
  cardCountData: UserCardCount[];
}

export const StatsCard: React.FC<StatsCardProps> = ({
  streakData,
  cardCountData,
}) => {
  const { t } = useTranslation();
  return (
    <Card className="border-none rounded-xl overflow-hidden bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <Flame className="h-8 w-8 text-yellow-300 mb-2" />
            <h3 className="text-xl font-bold">
              {streakData.length > 0 ? streakData[0].streak : 0}
            </h3>
            <p className="text-white/80">{t('userRanking.mostStreak')}</p>
          </div>

          <div className="flex flex-col items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <BookOpen className="h-8 w-8 text-yellow-300 mb-2" />
            <h3 className="text-xl font-bold">
              {cardCountData.length > 0 ? cardCountData[0].cardCount : 0}
            </h3>
            <p className="text-white/80">{t('userRanking.mostCards')}</p>
          </div>

          <div className="flex flex-col items-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
            <Crown className="h-8 w-8 text-yellow-300 mb-2" />
            <h3 className="text-xl font-bold">
              {cardCountData.length > 0 ? cardCountData[0].name : ""}
            </h3>
            <p className="text-white/80">{t('userRanking.topUser')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
