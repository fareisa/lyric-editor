import lrclibProvider from "../providers/lyrics/lrclib.provider.js";

class FetchService {
  async fetch(song) {
    return await lrclibProvider.fetch(song);
  }
}

export default new FetchService();