export type UserStats = {
  sentence: {
    learnedCount: number;
    totalCount: number;
  };
  paragraph: {
    learnedCount: number;
    totalCount: number;
  };
  vocabulary: {
    learnedCount: number;
    totalCount: number;
  };
  grammar: {
    learnedCount: number;
    totalCount: number;
  };
  speaking_question: {
    learnedCount: number;
    totalCount: number;
  };
  free_talk_topic: {
    learnedCount: number;
    totalCount: number;
  };
};

export type UserDetail = {
  id: number;
  username: string;
  role: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string | null;
  refreshToken?: string | null;
  accessToken?: string | null;
};