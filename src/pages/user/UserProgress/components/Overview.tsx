import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, BookOpen, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";

interface OverviewProps {
  totalCards: number;
  completionPercentage: number;
  streakDays: number;
  achievementValue: number;
  errorRate: {
    correct: number;
    incorrect: number;
    errorRate: number;
  };
}

export const Overview = ({
  totalCards,
  completionPercentage,
  streakDays,
  errorRate,
}: OverviewProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2 text-primary">
            <div className="flex items-center p-2 bg-primary/10 rounded-full">
              <BookOpen className="h-5 w-5" />
            </div>
            {t("userProgress.totalCards")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-700">{totalCards}</div>
          <Progress value={completionPercentage} className="mt-2" />
          <p className="text-sm text-gray-500 mt-1">
          {t("userProgress.completed")}: {completionPercentage}%
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2 text-orange-500">
            <div className="flex items-center p-2 bg-orange-100 rounded-full">
              <Calendar className="h-5 w-5" />
            </div>
            {t("userProgress.streakDays")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-700">{streakDays}</div>
          <p className="text-sm text-gray-500 mt-1">{t("userProgress.streakDays")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2 text-pink-500">
            <div className="flex items-center p-2 bg-pink-100 rounded-full">
              <Award className="h-5 w-5" />
            </div>
            {t("userProgress.accuracy")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-slate-700">
            {((1 - errorRate.errorRate) * 100).toFixed(2)}%
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <div className="flex items-center justify-between text-sm">
              <span>{t("userProgress.correct")}:</span>
              <span>{errorRate.correct}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>{t("userProgress.incorrect")}:</span>
              <span>{errorRate.incorrect}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
