export interface Achievement {
  achievementType: string;
  achievementDate: string;
  achievementValue: number;
}

export interface AchievementHeatmap {
  date: string;
  count: number;
}

export interface AchievementErrorRate {
  correct: number;
  incorrect: number;
  errorRate: number;
}

export interface AchievementErrorImprovement {
  date: string;
  errorCount: number;
}

export interface AchievementCardsByDifficulty {
  difficulty: string;
  count: number;
}