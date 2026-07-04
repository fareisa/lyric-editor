import Fastify from "fastify";

const app = Fastify({
  logger: true,
});

app.get("/api/health", async () => {
  return {
    status: "ok",
  };
});

export default app;
