export interface Character {
  char: string;
  romaji: string;
  sound: string;
  components?: string[];
}

export interface StrokeGuide {
  strokes: number;
  guide: string;
}

export interface StrokeGuides {
  [key: string]: {
    [key: string]: StrokeGuide;
  };
}

export type AlphabetTab = 'hiragana' | 'katakana';
export type SubTab = 'basic' | 'dakuon' | 'handakuon' | 'yoon'; 