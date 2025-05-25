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
  japaneseTextRomaji: string | null;
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

export interface SpeechToTextResponse {
  hiraApi: string;
  match: boolean;
  accuracy: number;
  text: string;
  hiraUser: string;
  status: string;
  wrongJapanese?: WrongJapanese[] | null;
}

export interface WrongJapanese {
  apiEnd: number;
  userStart: number;
  apiStart: number;
  userEnd: number;
  api: string;
  user: string;
}

export interface SpeechToTextRequest {
  audio_data: string;
  user_romaji: string;
  language: string;
}

export interface StudyRequest {
  id: number;
  performance: number;
  userInput: string | undefined;
  correctAnswer: string | undefined;
  feedbackProvided: string | undefined;
}

export interface ExerciseListeningData {
  audioUrl: string;
  japaneseTextFurigana: string;
  vietnameseText: string;
  topic: string;
  level: string;
}

export interface VocabularyItem {
  id: number;
  word: string;
  reading: string;
  meaning: string;
  exampleWithReading: string | null;
  exampleWithoutReading: string | null;
  exampleMeaning: string | null;
  audio: string;
  level: string;
  chapter: string;
  section: string;
}

export interface GrammarItem {
  id: number;
  romaji: string;
  structure: string;
  usage: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
  level: string;
}

export type PageType = 'grammar' | 'vocabulary';
