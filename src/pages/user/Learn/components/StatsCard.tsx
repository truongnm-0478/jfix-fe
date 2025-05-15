import { Progress } from "@/components/ui/progress";
import { UserStats } from "@/dataHelper/user.dataHelper";
import { BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { STATS } from "../constant";

export const StatsCard = ({ userStats }: { userStats: UserStats | null }) => {
  const { t } = useTranslation();

  const keyMap: Record<string, keyof UserStats> = {
    vocabulary: "vocabulary",
    grammar: "grammar",
    sentence: "sentence",
    paragraph: "paragraph",
    speaking_question: "speaking_question",
    free_talk_topic: "free_talk_topic",
  };

  const getStatData = (stat: string) => {
    const key = keyMap[stat] || stat;
    return userStats?.[key] ?? { learnedCount: 0, totalCount: 0 };
  };

  return (
    <div className="rounded-2xl p-6 mb-6 flex flex-col items-center bg-white border border-gray-200 border-b-4">
      <div className="flex items-center mb-4 w-full">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mr-3">
          <BarChart3 className="w-6 h-6 text-blue-500" />
        </div>
        <h3 className="text-xl font-extrabold text-blue-700">{t("learn.stats.title")}</h3>
      </div>
      <div className="w-full">
        {STATS.map((stat, idx) => {
          const { learnedCount, totalCount } = getStatData(stat.value);
          const percent =
            totalCount > 0 ? (learnedCount / totalCount) * 100 : 0;
          return (
            <div
              key={stat.label + idx}
              className={`mb-4 items-center ${
                idx < STATS.length - 1 ? "border-b border-gray-200 pb-1" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <span className="text-gray-700 text-sm">{t(stat.label)}</span>
                </div>
                <span className="text-sm text-[#777777]">
                  {learnedCount}/{totalCount}
                </span>
              </div>
              <Progress
                value={percent}
                className="h-3 bg-[#e5e5e5] rounded-full transition-all duration-300"
                indicatorClassName={`${stat.bg} rounded-full transition-all duration-300`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
