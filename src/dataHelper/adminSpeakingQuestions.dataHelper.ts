export interface SpeakingQuestionQueryParams {
  keyword?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: string;
  level?: string;
}

export interface AdminSpeakingQuestionResponse {
  data: AdminSpeakingQuestion[];
  totalRecords: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
}

export interface AdminSpeakingQuestion {
  id: number;
  japaneseText?: string;
  vietnameseText?: string;
  level?: string;
  sampleAnswerJapanese?: string;
  sampleAnswerVietnamese?: string;
  audioUrl?: string;
  createDate?: string;
  createBy?: string;
  updateDate?: string | null;
  updateBy?: string | null;
  deleteDate?: string | null;
  deleteBy?: string | null;
}