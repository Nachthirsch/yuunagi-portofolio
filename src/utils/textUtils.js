/**
 * Detects if text contains Japanese characters (Hiragana, Katakana, or Kanji)
 * @param {string} text - The text to check for Japanese characters
 * @returns {boolean} - True if Japanese characters are found
 */
export const containsJapaneseText = (text) => {
  if (!text) return false;
  // Regex to detect Hiragana, Katakana, and Kanji characters
  const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
  return japaneseRegex.test(text);
};
