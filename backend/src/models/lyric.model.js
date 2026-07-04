export function createLyricLine({
  time = null,
  original = "",
  romaji = null,
  translation = null
}) {
  return {
    time,
    original,
    romaji,
    translation
  };
}