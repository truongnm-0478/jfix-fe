export interface SentenceQueryParams {
  keyword?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: string;
  level?: string;
}

export interface AdminSentenceResponse {
  data: AdminSentence[];
  totalRecords: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
}

export interface AdminSentence {
  id: number;
  japaneseText: string;
  vietnameseText: string;
  level: string;
  audioUrl?: string;
  createDate?: string;
  createBy?: string;
  updateDate?: string | null;
  updateBy?: string | null;
  deleteDate?: string | null;
  deleteBy?: string | null;
}

export interface AdminSentenceDetail extends AdminSentence {}

export interface AdminSentenceCreate {
  japaneseText: string;
  vietnameseText: string;
  level: string;
  audio: File | null;
  audioFile?: File | null;
  audioUrl?: string | null;
}