import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import config from "../config/env.js";

import { scanDirectory } from "../utils/scanner.js";
import { readMetadata } from "../utils/metadata.js";

function createSongId(fullPath) {
	const relative = path.relative(
		config.musicDir,
		fullPath
	);

	return createHash("sha1")
		.update(relative)
		.digest("hex");
}

class SongService {

	#songs = new Map();
	#cache = [];

	async refresh() {
		this.#songs.clear();
		this.#cache = [];

		const files =
		await scanDirectory(
			config.musicDir
		);

		for (const file of files) {
			const metadata =
			await readMetadata(
				file.fullPath
			);

			const id =
			createSongId(
				file.fullPath
			);

			const lyricPath =
			path.join(
				path.dirname(file.fullPath),
				`${file.basename}.lrc`
			);

			const hasLyrics =
			fs.existsSync(
				lyricPath
			);

			this.#songs.set(id, {
				id,
				fullPath: file.fullPath,
				lyricPath,
				title:
					metadata.title ??
					file.basename,
				artist:
					metadata.artist ??
					"Unknown Artist",
				album:
					metadata.album ??
					"Unknown Album",
				duration:
					metadata.duration,
				hasLyrics
			});

			this.#cache.push({
				id,
				title:
				metadata.title ??
				file.basename,
				artist:
				metadata.artist ??
				"Unknown Artist",
				album:
				metadata.album ??
				"Unknown Album",
				duration:
				metadata.duration,
				hasLyrics
			});

		}

	console.log(
		`Loaded ${this.#cache.length} songs`
	);

	}

	list() {
		return this.#cache;
	}

	get(id) {
		return this.#songs.get(id);
	}
}

export default new SongService();