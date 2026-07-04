import Fastify from "fastify";

import lyricsRoute from "./routes/lyrics.js";
import songsRoute from "./routes/songs.js";

const app = Fastify({
  logger: true,
});

app.get("/api/health", async () => {
  return {
    status: "ok",
  };
});

app.register(lyricsRoute, {
  prefix: "/api"
});

app.register(songsRoute, {
  prefix: "/api"
});

export default app;
