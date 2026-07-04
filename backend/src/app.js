import Fastify from "fastify";

import songsRoute from "./routes/songs.js";

const app = Fastify({
  logger: true,
});

app.get("/api/health", async () => {
  return {
    status: "ok",
  };
});

app.register(songsRoute, {
  prefix: "/api"
});

export default app;
