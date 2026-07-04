import Fastify from "fastify";

import errorHandler from "./plugins/error-handler.js";
import songsRoutes from "./routes/songs.routes.js";

const app = Fastify({
  logger: true,
});

app.get("/api/health", async () => {
  return {
    status: "ok",
  };
});

await app.register(errorHandler);

await app.register(songsRoutes,{
    prefix:"/api"
});

export default app;
