import dotenv from "dotenv";

dotenv.config();

export default {

	port:
		process.env.BACKEND_PORT ?? "3000",

	host: 
		process.env.BACKEND_HOST ?? "127.0.0.1",

	musicDir:
		process.env.MUSIC_DIR ?? "/music",

	lrclibBaseUrl:
		process.env.LRCLIB_BASE_URL ??
		"https://lrclib.net",

  logLevel:
    process.env.LOG_LEVEL ?? "info"

};