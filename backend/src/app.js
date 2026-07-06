import Fastify from "fastify";
import config from "./config/env.js";
import errorHandler from "./plugins/error-handler.js";
import songsRoutes from "./routes/songs.routes.js";

const app = Fastify({

  logger: {
    level: config.logLevel
  }

});

app.get("/api/health", async () => {
  return {
    status: "ok"
  };
});

await app.register(errorHandler);

await app.register(
  songsRoutes,
  {
    prefix: "/api"
  }
);

export default app;