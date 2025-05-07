export type LearningGoal = {
  targetLevel: string;
  description: string;
  dailyMinutes: number;
  dailyVocabTarget: number;
  targetDate: string;
};

export type LearningGoalResponse = {
  id: number;
  userId: number;
  targetLevel: string;
  description: string;
  dailyMinutes: number;
  dailyVocabTarget: number;
  targetDate: string;
  createDate: string;
  createBy: string;
  updateDate: string | null;
  updateBy: string | null;
};