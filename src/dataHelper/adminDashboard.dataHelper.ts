export interface SummaryDashboard {
  cardPercentChange: number;
  totalUsers: number;
  newUsersThisMonth: number;
  sentenceCount: number;
  prevMonthNewUsers: number;
  totalLessons: number;
  vocabularyCount: number;
  averageCardsPerUserThisMonth: number;
  grammarCount: number;
  freeTalkTopicCount: number;
  speakingQuestionCount: number;
  prevMonthAverageCardsPerUser: number;
  paragraphCount: number;
  userPercentChange: number;
}

export interface StatsDailyActiveUsers {
  date: string;
  activeUsers: number;
}

export interface QuestionTypeDistribution {
  SPEAKING_QUESTION: number;
  GRAMMAR: number;
  VOCABULARY: number;
  PARAGRAPH: number;
  SENTENCE: number;
  FREE_TALK_TOPIC: number;
}

export interface StatsRecentUsers {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string;
  createDate: string;
}
