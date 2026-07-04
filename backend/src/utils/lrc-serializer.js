export function serializeLrc(lines, output) {

  const result = [];

  for (const line of lines) {
    for (const field of output) {
      if (!line[field])
        continue;
      result.push(
        `[${line.timestamp}]${line[field]}`
      );
    }
  }
  
  return result.join("\n");
}