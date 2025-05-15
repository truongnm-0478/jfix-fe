import { connectors, particles, patterns, verbStems } from "./constant";

export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Hàm để phân tách câu thành từ
export const splitIntoWords = (sentence: string): string[] => {
  return splitJapaneseSentence(sentence);
};

// Hàm kiểm tra gốc động từ
const isVerbStem = (word: string): boolean => {
  return verbStems.some((stem: string) => word.endsWith(stem));
};

// Hàm phân tách câu tiếng Nhật thành các đơn vị có nghĩa
export const splitJapaneseSentence = (sentence: string): string[] => {
  const cleanedSentence = sentence.trim();

  // Bước 1: Đánh dấu các pattern cần giữ nguyên
  let processedSentence = cleanedSentence;
  const placeholders: { [key: string]: string } = {};
  let placeholderCount = 0;

  patterns.forEach((pattern) => {
    processedSentence = processedSentence.replace(pattern, (match) => {
      const placeholder = `__PLACEHOLDER_${placeholderCount}__`;
      placeholders[placeholder] = match;
      placeholderCount++;
      return placeholder;
    });
  });

  // Bước 2: Tách câu dựa trên các quy tắc
  const words: string[] = [];
  let currentWord = "";
  let i = 0;

  while (i < processedSentence.length) {
    const char = processedSentence[i];

    // Kiểm tra placeholder
    if (processedSentence.slice(i).startsWith("__PLACEHOLDER_")) {
      if (currentWord) {
        words.push(currentWord);
        currentWord = "";
      }
      const placeholderMatch = processedSentence
        .slice(i)
        .match(/__PLACEHOLDER_\d+__/);
      if (placeholderMatch) {
        const placeholder = placeholderMatch[0];
        words.push(placeholders[placeholder]);
        i += placeholder.length;
        continue;
      }
    }

    // Kiểm tra dấu câu
    if ("。、！？".includes(char)) {
      if (currentWord) {
        words.push(currentWord);
        currentWord = "";
      }
      words.push(char);
      i++;
      continue;
    }

    // Kiểm tra trợ từ
    if (particles.includes(char)) {
      if (currentWord) {
        words.push(currentWord + char);
        currentWord = "";
      } else {
        words.push(char);
      }
      i++;
      continue;
    }

    // Kiểm tra từ nối
    let foundConnector = false;
    for (const connector of connectors) {
      if (processedSentence.slice(i).startsWith(connector)) {
        if (currentWord) {
          words.push(currentWord);
          currentWord = "";
        }
        words.push(connector);
        i += connector.length;
        foundConnector = true;
        break;
      }
    }

    if (foundConnector) continue;

    // Xử lý chuyển đổi giữa các loại ký tự
    const nextChar = processedSentence[i + 1] || "";
    const isKanji = /[\u4e00-\u9faf]/.test(char);
    const isHiragana = /[\u3040-\u309f]/.test(char);
    const isKatakana = /[\u30a0-\u30ff]/.test(char);
    const isNextKanji = /[\u4e00-\u9faf]/.test(nextChar);
    const isNextHiragana = /[\u3040-\u309f]/.test(nextChar);
    const isNextKatakana = /[\u30a0-\u30ff]/.test(nextChar);

    currentWord += char;

    // Quy tắc tách từ
    if (i < processedSentence.length - 1) {
      // Tách khi chuyển từ Kanji sang Hiragana (trừ trường hợp động từ)
      if (isKanji && isNextHiragana && !isVerbStem(currentWord)) {
        const nextFewChars = processedSentence.slice(i + 1, i + 4);
        if (
          !nextFewChars.match(
            /^(る|う|く|ぐ|す|つ|ぬ|ぶ|む|ます|ました|ません|ない|た|て|って|んだ|んで)/
          )
        ) {
          words.push(currentWord);
          currentWord = "";
        }
      }

      // Tách khi chuyển từ Katakana sang loại ký tự khác
      if (isKatakana && !isNextKatakana) {
        words.push(currentWord);
        currentWord = "";
      }

      // Tách khi chuyển từ Hiragana sang Kanji/Katakana
      if (isHiragana && (isNextKanji || isNextKatakana)) {
        if (!particles.includes(currentWord)) {
          words.push(currentWord);
          currentWord = "";
        }
      }
    }

    i++;
  }

  // Thêm từ cuối cùng nếu có
  if (currentWord) {
    words.push(currentWord);
  }

  // Bước 3: Gộp lại các từ có liên quan
  const finalWords: string[] = [];
  i = 0;

  while (i < words.length) {
    const word = words[i];

    // Gộp số với đơn vị
    if (/^[0-9０-９]+$/.test(word) && i + 1 < words.length) {
      const nextWord = words[i + 1];
      if (/^(時|分|年|月|日|つ|人|個|本|枚|円|歳|階|回|度|番)/.test(nextWord)) {
        finalWords.push(word + nextWord);
        i += 2;
        continue;
      }
    }

    // Gộp các cấu trúc ngữ pháp
    if (word.endsWith("て") && i + 1 < words.length) {
      const nextWord = words[i + 1];
      if (
        [
          "いる",
          "いた",
          "ある",
          "あった",
          "ください",
          "いない",
          "いなかった",
          "みる",
          "みた",
          "しまう",
          "しまった",
        ].includes(nextWord)
      ) {
        finalWords.push(word + nextWord);
        i += 2;
        continue;
      }
    }

    finalWords.push(word);
    i++;
  }

  return finalWords.filter((word) => word.trim() !== "");
};

export const removePunctuation = (text: string): string => {
  return text
    .replace(/[*。、！？.,!?()[\]{}"'`、。〃〄々〆〇〈〉《》「」『』【】〒〓〔〕〖〗〘〙〚〛〜〝〞〟〠〡〢〣〤〥〦〧〨〩〪〭〮〯〫〬〰〱〲〳〴〵〶〷〸〹〺〻〼〽〾〿]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
};