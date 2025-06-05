import { Character } from "./types";

export const getGojuuonTable = (data: Character[]) => {
  const basicChars = data.slice(0, 46);
  const gojuuonMatrix: (Character | null)[][] = Array(10).fill(null).map(() => Array(5).fill(null));

  for (let i = 0; i < 5; i++) {
    gojuuonMatrix[0][i] = basicChars[i];
  }

  let currentIndex = 5;
  for (let row = 1; row < 9; row++) {
    for (let col = 0; col < 5; col++) {
      if (row === 7) {
        if (col === 0 || col === 2 || col === 4) {
          gojuuonMatrix[row][col] = basicChars[currentIndex++];
        }
      } else {
        gojuuonMatrix[row][col] = basicChars[currentIndex++];
      }
    }
  }

  gojuuonMatrix[8][0] = basicChars[currentIndex++];
  gojuuonMatrix[8][4] = basicChars[currentIndex++];
  gojuuonMatrix[9][0] = basicChars[currentIndex];

  return gojuuonMatrix;
};

export const getDakuonTable = (data: Character[]) => {
  const dakuonChars = data.slice(46, 66);
  const dakuonMatrix: (Character | null)[][] = Array(4).fill(null).map(() => Array(5).fill(null));
  let currentIndex = 0;

  for (let i = 0; i < 5; i++) dakuonMatrix[0][i] = dakuonChars[currentIndex++];
  for (let i = 0; i < 5; i++) dakuonMatrix[1][i] = dakuonChars[currentIndex++];
  for (let i = 0; i < 5; i++) dakuonMatrix[2][i] = dakuonChars[currentIndex++];
  for (let i = 0; i < 5; i++) dakuonMatrix[3][i] = dakuonChars[currentIndex++];

  return dakuonMatrix;
};

export const getHandakuonTable = (data: Character[]) => {
  const handakuonChars = data.slice(66, 71);
  const handakuonMatrix: (Character | null)[][] = Array(1).fill(null).map(() => Array(5).fill(null));

  for (let i = 0; i < 5; i++) {
    handakuonMatrix[0][i] = handakuonChars[i];
  }

  return handakuonMatrix;
};

export const getYoonTable = (data: Character[]) => {
  const yoonChars = data.slice(71);
  const yoonMatrix: (Character | null)[][] = Array(9).fill(null).map(() => Array(3).fill(null));
  let currentIndex = 0;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 3; col++) {
      yoonMatrix[row][col] = yoonChars[currentIndex++];
    }
  }

  return yoonMatrix;
};