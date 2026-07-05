import transformProfiles from "../constants/transform-profile.js";

export function serializeLrc(lines, profile = "original") {
  const output = transformProfiles[profile];

  if (!output) {
    throw new Error(`Unknown profile: ${profile}`);
  }

  const result = [];

  for (const line of lines) {
    for (const field of output) {

      if (field === "legacy") {
        const lyric = [
          line.original,
          line.translation
        ]
          .filter(Boolean)
          .join("_BREAK_");

        result.push(
          `[${line.timestamp}]${lyric}`
        );

        continue;
      }

      const value = line[field];

      if (!value) {
        continue;
      }

      result.push(
        `[${line.timestamp}]${value}`
      );
    }
  }

  return result.join("\n");
}