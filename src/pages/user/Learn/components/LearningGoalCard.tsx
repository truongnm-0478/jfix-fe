import { Calendar, Target, Trophy } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

export type LearningGoalCardProps = {
  targetDate: string;
  targetLevel: string;
};

const LearningGoalCard: React.FC<LearningGoalCardProps> = ({
  targetDate,
  targetLevel,
}) => {
  const { t } = useTranslation();
  return (
    <div className="rounded-2xl p-6 mb-6 flex flex-col items-center bg-white border border-gray-200 border-b-4">
      <div className="flex items-center mb-4 w-full">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mr-4">
          <Trophy className="w-8 h-8 text-yellow-500" />
        </div>
        <h3 className="text-xl font-extrabold text-yellow-700">{t("learn.learningGoal.title")}</h3>
      </div>
      <div className="w-full space-y-4 text-sm">
        <div className="flex items-center">
          <Target className="w-5 h-5 text-blue-500 mr-2" />
          <span className="text-gray-700 mr-2">{t("learn.learningGoal.targetLevel")}:</span>
          <span className="text-blue-700 font-bold">{targetLevel}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-gray-700 mr-2">{t("learn.learningGoal.targetDate")}:</span>
          <span className="text-green-700 font-bold">{targetDate || "Chưa đặt"}</span>
        </div>
      </div>
    </div>
  );
};

export default LearningGoalCard;
