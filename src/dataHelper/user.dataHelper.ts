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

export type UpdateProfile = {
  name: string;
  email: string;
  phone: string;
  avatar?: File | string | null;
};

export interface UserStreak {
  id: number;
  name: string;
  avatar: string | null;
  streak: number;
  email: string;
  username: string;
}

export interface UserCardCount {
  id: number;
  name: string;
  avatar: string | null;
  email: string;
  username: string;
  month: string;
  cardCount: number;
}