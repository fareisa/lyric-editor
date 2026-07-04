import dotenv from "dotenv";

dotenv.config();

export default {
  port: Number(process.env.PORT) || 3000,
  musicDir: process.env.MUSIC_DIR || "/music",
};
