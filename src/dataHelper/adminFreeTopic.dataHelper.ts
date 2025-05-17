export interface FreeTopicQueryParams {
  keyword?: string;
  page?: number;
  size?: number;
  sortDir?: string;
  level?: string;
}

export interface AdminFreeTopicResponse {
  data: AdminFreeTopic[];
  totalRecords: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
}

export interface AdminFreeTopic {
  id: number;
  japaneseText?: string;
  vietnameseText?: string;
  level?: string;
  conversationPrompt?: string;
  sampleAnswerVietnamese?: string;
  audioUrl?: string;
  createDate?: string;
  createBy?: string;
  updateDate?: string | null;
  updateBy?: string | null;
  deleteDate?: string | null;
  deleteBy?: string | null;
}