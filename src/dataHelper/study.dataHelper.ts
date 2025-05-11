import { ReactNode } from 'react';

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
  sampleAnswerJapaneseFurigana: string | null;
  japaneseTextFurigana: string | null;
}

export type DifficultyLevel = 'again' | 'hard' | 'good' | 'easy';

export interface ReviewInfo {
  cardId: number | string;
  difficulty: DifficultyLevel;
}

export interface CardFaceProps {
  children: ReactNode;
  className?: string;
}

export interface FlashcardProps {
  id: number | string;
  frontContent?: ReactNode;
  backContent?: ReactNode;
  children?: ReactNode;
  onFlip?: (isFlipped: boolean) => void;
  isFlipped?: boolean;
  className?: string;
}