export interface AdminParagraph {
  id: number;
  japaneseText: string;
  vietnameseText: string;
  level: string;
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