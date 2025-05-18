export interface VocabularyQueryParams {
  keyword?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: string;
  level?: string;
  section?: number;
  chapter?: number;
}

export interface AdminVocabularyResponse {
  data: AdminVocabulary[];
  totalRecords: number;
  totalPages: number;
  nextPage: number | null;
  previousPage: number | null;
}

export interface AdminVocabulary {
  id: number;
  word: string;
  reading: string;
  meaning: string;
  exampleWithReading: string;
  exampleWithoutReading: string;
  exampleMeaning: string;
  audio: string;
  level: string;
  chapter: string;
  section: string;
  createDate: string;
  createBy: string;
  updateDate: string;
  updateBy: string;
  deleteDate: string;
  deleteBy: string;
}

export interface VocabularyDetail {
  id: number;
  word: string;
  reading?: string;
  meaning?: string;
  exampleWithReading?: string;
  exampleWithoutReading?: string;
  exampleMeaning?: string;
  audio?: string;
  level?: string;
  chapter?: string;
  section?: string;
  createDate?: string;
  createBy?: string;
  updateDate?: string;
  updateBy?: string;
  deleteDate?: string;
  deleteBy?: string;
}

export interface VocabularyCreate {
  word?: string;
  reading?: string;
  meaning?: string;
  exampleWithoutReading?: string;
  exampleMeaning?: string;
  audio?: string | null;
  audioFile?: File | null;
  level?: string;
  chapter?: string;
  section?: string;
}