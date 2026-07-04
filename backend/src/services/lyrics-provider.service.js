import lrclibProvider from "../providers/lyrics/lrclib.provider.js";

class LyricsProviderService {
  async fetch(song) {
    return await lrclibProvider.search(song);
  }
}

export default new LyricsProviderService();