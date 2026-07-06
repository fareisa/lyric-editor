import dotenv from "dotenv";

dotenv.config();

export default {

	port:
		process.env.PORT ?? "3000",

	host: 
		process.env.HOST ?? "0.0.0.0",

	musicDir:
		process.env.MUSIC_DIR ?? "/music",

	lrclibBaseUrl:
		process.env.LRCLIB_BASE_URL ??
		"https://lrclib.net",

  logLevel:
    process.env.LOG_LEVEL ?? "info"

};