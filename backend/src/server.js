import app from "./app.js";
import config from "./config/env.js";

async function start() {
  try {
    await app.listen({
      port: config.port,
      host: "0.0.0.0",
    });

    console.log(`🚀 Server running on port ${config.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
