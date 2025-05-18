export interface GrammarQueryParams {
  keyword?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: string;
  level?: string;
}

export interface AdminGrammarResponse {
  data: AdminGrammar[];
  totalRecords: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
}

export interface AdminGrammar {
  id: number;
  romaji?: string;
  structure?: string;
  usage?: string;
  meaning?: string;
  example?: string;
  exampleMeaning?: string;
  level?: string;
  createDate?: string;
  createBy?: string;
  updateDate?: string | null;
  updateBy?: string | null;
  deleteDate?: string | null;
  deleteBy?: string | null;
}

export interface GrammarCreate {
  romaji?: string;
  structure?: string;
  usage?: string;
  meaning?: string;
  example?: string;
  exampleMeaning?: string;
  level?: string;
}

export interface GrammarDetail {
  id: number;
  romaji?: string;
  structure?: string;
  usage?: string;
  meaning?: string;
  example?: string;
  exampleMeaning?: string;
  level?: string;
  createDate?: string;
  createBy?: string;
  updateDate?: string | null;
  updateBy?: string | null;
  deleteDate?: string | null;
  deleteBy?: string | null;
}