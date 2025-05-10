export interface StudyContentData {
  type: string;
  skill: string | null;
  deckName: string;
  cards: Content[];
}

export interface Content {
  id: number;
  cardId: number;
  type: string;
  skill: string | null;
  reviewDate: Date;
  repetition: number;
  intervals: number;
  easinessFactor: number;
  performance: number | null;
  word: string;
  meaning: string;
  reading: string;
  example: string | null;
  exampleMeaning: string;
  level: string;
  structure: string | null;
  usage: string | null;
  romaji: string | null;
  topic: string | null;
  sampleAnswerJapanese: string | null;
  sampleAnswerVietnamese: string | null;
  guidelines: string | null;
  questions: string | null;
  explanation: string | null;
  notes: string | null;
  audioUrl: string;
  vietnameseText: string | null;
  japaneseText: string | null;
  mistakeHistory: string | null;
}