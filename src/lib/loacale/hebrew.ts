// Hebrew Unicode range: \u0590-\u05FF
const HEBREW_REGEX = /[\u0590-\u05FF]/;

export function isHebrew(text: string) {
  return HEBREW_REGEX.test(text);
}

export function isPrimarilyHebrew(text: string) {
  // Remove spaces and punctuation
  const cleanText = text.replace(/\s+|[.,/#!$%&*;:{}=\-_`~()]/g, '');
  if (cleanText.length === 0) return false;

  // Count Hebrew characters
  const hebrewChars = cleanText.match(HEBREW_REGEX) || [];
  const hebrewRatio = hebrewChars.length / cleanText.length;

  // Consider it Hebrew if more than 50% of the characters are Hebrew
  return hebrewRatio > 0.5;
}

export function extractHebrewText(text: string): string {
  // Regular expression to match Hebrew characters
  const hebrewRegex = /[\u0590-\u05FF\u200f\u200e]/g;
  const hebrewTextMatches = text.match(hebrewRegex);
  return hebrewTextMatches ? hebrewTextMatches.join('') : '';
}

export function removeNonAlphanumeric(text: string): string {
  return text.replace(/[^\w\s]/g, '');
}

export function extractBusinessNameFromDescription(description: string): string {
  // The regex pattern is now simplified to remove unnecessary escapes
  const pattern = /^(.+?)\s*\d{2}\/\d{2}\/\d{2,4}\s*.*$/;
  const match = description.match(pattern);
  return match ? match[1].trim() : description;
}
