import app from "./app.js";
import config from "./config/env.js";
import songService from "./services/song.service.js";

async function start() {

  try {

    await songService.refresh();

    await app.listen({
      host: "0.0.0.0",
      port: config.port
    });

    console.log(
      `Server running on ${config.port}`
    );

  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

}

start();
