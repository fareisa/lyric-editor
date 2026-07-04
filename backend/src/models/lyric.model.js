export function createLyricLine({
  timestamp = null,
  original = "",
  romaji = null,
  translation = null,
  metadata = {}
}) {
  return {
    timestamp,
    original,
    romaji,
    translation,
    metadata
  };
}