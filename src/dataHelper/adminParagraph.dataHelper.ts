export interface AdminParagraph {
  id: number;
  japaneseText: string;
  vietnameseText: string;
  level: string;
  topic: string;
  createDate?: string;
  updateDate?: string;
  audioUrl?: string;
  status?: string;
}

export interface ParagraphQueryParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: string;
  keyword?: string;
  level?: string;
  status?: string;
}

export interface AdminParagraphResponse {
  data: AdminParagraph[];
  totalRecords: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
}

export interface AdminParagraphDetail {
  id: number;
  japaneseText: string;
  vietnameseText: string;
  level: string;
  topic: string;
  audioUrl?: string;
  createDate?: string;
  createBy?: string;
  updateDate?: string | null;
  updateBy?: string | null;
  deleteDate?: string | null;
  deleteBy?: string | null;
}

export interface AdminParagraphCreate {
  japaneseText: string;
  vietnameseText: string;
  level: string;
  topic: string;
  audio: File | null;
}