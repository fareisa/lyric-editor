import Fastify from "fastify";
import config from "./config/env.js";
import errorHandler from "./plugins/error-handler.js";
import songsRoutes from "./routes/songs.routes.js";

const app = Fastify({

  logger: {
    level: config.logLevel,

    transport:
      process.env.NODE_ENV !== "production"
        ? {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "SYS:standard",
              ignore: "pid,hostname"
            }
          }
        : undefined
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