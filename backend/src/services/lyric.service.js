import fs from "node:fs/promises";

class LyricService {
	async load(song) {
		try {
			return await fs.readFile(
				song.lyricPath,
				"utf8"
			);
		} catch {
		return null;
		}
	}
	
	async save(song, lyrics) {
		await fs.writeFile(
			song.lyricPath,
			lyrics,
			"utf8"
		);
	}
	
}    
export default new LyricService();