export interface ExerciseSegment {
  text: string;
  punctuation: string;
  canBeBlanked: boolean;
  startPosition: number;
  endPosition: number;
}

export interface BlankSegment {
  type: 'blank';
  answer: string;
  punctuation: string;
  userAnswer: string;
  isCorrect: boolean | null;
  position: number;
}

export interface TextSegment {
  type: 'text';
  text: string;
  punctuation: string;
  position: number;
}

export type ExerciseItem = BlankSegment | TextSegment;

export interface SavedExerciseState {
  blankPositions: number[];
  userAnswers: string[];
}

export const extractTextFromFurigana = (furiganaText: string): string => {
  return furiganaText.replace(/<ruby>([^<]*)<rt>[^<]*<\/rt><\/ruby>/g, '$1');
};

export const createFillInTheBlank = (
  originalText: string,
  savedState?: SavedExerciseState
): { exercise: ExerciseItem[], blankPositions: number[] } => {
  // Define Japanese particles to split on
  const particles = ['は', 'に', 'を', 'が', 'で', 'と', 'から', 'まで', 'へ'];
  const punctuations = ['。', '、', '！', '？'];
  
  // Create segments based on particles and punctuation
  const segments = [];
  let currentPosition = 0;
  const textLength = originalText.length;
  
  while (currentPosition < textLength) {
    let nextBreakPosition = textLength;
    let breakType = '';
    
    // Find the next particle or punctuation
    for (const particle of particles) {
      const particlePos = originalText.indexOf(particle, currentPosition);
      if (particlePos !== -1 && particlePos < nextBreakPosition) {
        nextBreakPosition = particlePos;
        breakType = 'particle';
      }
    }
    
    for (const punct of punctuations) {
      const punctPos = originalText.indexOf(punct, currentPosition);
      if (punctPos !== -1 && punctPos < nextBreakPosition) {
        nextBreakPosition = punctPos;
        breakType = 'punctuation';
      }
    }
    
    // Extract the segment
    if (nextBreakPosition > currentPosition) {
      const segmentText = originalText.substring(currentPosition, nextBreakPosition);
      
      if (segmentText.trim()) {
        // Check if we should include the particle/punctuation with the segment
        let includedChar = '';
        if (breakType === 'particle' && nextBreakPosition < textLength) {
          includedChar = originalText[nextBreakPosition];
          currentPosition = nextBreakPosition + 1;
        } else if (breakType === 'punctuation') {
          currentPosition = nextBreakPosition;
        } else {
          currentPosition = nextBreakPosition;
        }
        
        segments.push({
          text: segmentText,
          punctuation: includedChar,
          canBeBlanked: true,
          startPosition: currentPosition - segmentText.length - includedChar.length,
          endPosition: currentPosition
        });
      } else {
        currentPosition++;
      }
    } else {
      currentPosition++;
    }
    
    // Handle punctuation as a separate segment if needed
    if (breakType === 'punctuation' && nextBreakPosition < textLength) {
      const punct = originalText[nextBreakPosition];
      if (segments.length > 0 && !segments[segments.length - 1].punctuation) {
        segments[segments.length - 1].punctuation = punct;
      }
      currentPosition = nextBreakPosition + 1;
    }
  }
  
  // Filter out segments that are too short or just particles
  const blankableSegments = segments.filter(seg => {
    const cleanText = seg.text.trim();
    return cleanText.length > 1 && !particles.includes(cleanText);
  });

  let selectedIndices: number[] = [];
  
  if (savedState?.blankPositions) {
    // Use saved blank positions
    selectedIndices = savedState.blankPositions;
  } else {
    // Select random segments to blank (max 4)
    const blanksNeeded = Math.min(4, blankableSegments.length);
    
    // Choose segments with some distribution across the text
    const segmentGroups = Math.ceil(blankableSegments.length / blanksNeeded);
    
    for (let i = 0; i < blanksNeeded; i++) {
      const groupStart = i * segmentGroups;
      const groupEnd = Math.min(groupStart + segmentGroups, blankableSegments.length);
      
      if (groupStart < blankableSegments.length) {
        const randomIndex = Math.floor(Math.random() * (groupEnd - groupStart)) + groupStart;
        selectedIndices.push(randomIndex);
      }
    }
  }

  // Create exercise with blanks
  const exercise: ExerciseItem[] = [];
  
  segments.forEach((segment, index) => {
    const blankableIndex = blankableSegments.indexOf(segment);
    const isBlank = blankableIndex !== -1 && selectedIndices.includes(blankableIndex);
    
    if (isBlank) {
      exercise.push({
        type: 'blank',
        answer: segment.text,
        punctuation: segment.punctuation,
        userAnswer: savedState?.userAnswers?.[selectedIndices.indexOf(blankableIndex)] || '',
        isCorrect: null,
        position: index
      });
    } else {
      exercise.push({
        type: 'text',
        text: segment.text,
        punctuation: segment.punctuation,
        position: index
      });
    }
  });
  
  return { exercise, blankPositions: selectedIndices };
};