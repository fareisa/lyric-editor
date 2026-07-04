import dotenv from "dotenv";

dotenv.config();

export default {

	port:
		Number(process.env.PORT) || 3000,

	musicDir:
		process.env.MUSIC_DIR,

	lrclibBaseUrl:
		process.env.LRCLIB_BASE_URL ??
		"https://lrclib.net"

};