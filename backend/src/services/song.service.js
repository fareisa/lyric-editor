import { scanDirectory } from "../utils/scanner.js";
import config from "../config/env.js";

class SongService {

    async list() {
        return await scanDirectory(config.musicDir);
    }

}

export default new SongService();
