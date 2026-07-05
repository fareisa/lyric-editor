import transformProfiles from "../constants/transform-profile.js";

export function serializeLrc(lines, profile) {

  const config = transformProfiles[profile];

  // if (!config) {
  //   throw new Error(
  //     `Unknown profile: ${profile}`
  //   );
  // }

  const result = [];

  if (config.serializer === "legacy") {

    for (const line of lines) {

      const lyric = config.output
        .map(field => line[field])
        .filter(Boolean)
        .join("_BREAK_");

      result.push(
        `[${line.timestamp}]${lyric}`
      );

    }

    return result.join("\n");

  }

  for (const line of lines) {

    for (const field of config.output) {

      if (!line[field]) {
        continue;
      }

      result.push(
        `[${line.timestamp}]${line[field]}`
      );
    }
  }

  return result.join("\n");

}