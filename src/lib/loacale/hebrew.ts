// Hebrew Unicode range: \u0590-\u05FF
const HEBREW_REGEX = /[\u0590-\u05FF]/;

export function isHebrew(text: string) {
  return HEBREW_REGEX.test(text);
}

export function isPrimarilyHebrew(text: string) {
  // Remove spaces and punctuation
  const cleanText = text.replace(/\s+|[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
  if (cleanText.length === 0) return false;

  // Count Hebrew characters
  const hebrewChars = cleanText.match(HEBREW_REGEX) || [];
  const hebrewRatio = hebrewChars.length / cleanText.length;

  // Consider it Hebrew if more than 50% of the characters are Hebrew
  return hebrewRatio > 0.5;
}
