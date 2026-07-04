import axios from "axios";

class LrcLibProvider {
	async fetch(song) {
			const response = await axios.get(
				"https://lrclib.net/api/search",
				{
					params: {
						artist_name: song.artist,
						track_name: song.title
					}
				}
			);

		if (response.data.length === 0) {
			return null;
		}

		const lyric = response.data[0];

		return {
			artist: lyric.artistName,
			title: lyric.trackName,
			syncedLyrics: lyric.syncedLyrics,
			plainLyrics: lyric.plainLyrics
		};
	}
}

export default new LrcLibProvider();