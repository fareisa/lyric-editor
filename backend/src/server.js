import app from "./app.js";

import config from "./config/env.js";

import songService from "./services/song.service.js";

async function start() {

  try {

    const songs =
      await songService.refresh();

    await app.listen({
      host: config.host,
      port: config.port
    });

    app.log.info(
      {
        host: config.host,
        port: config.port,
        songs
      },
      "Server started"
    );

  } catch (err) {

    app.log.fatal(
      err,
      "Failed to start server"
    );

    process.exit(1);

  }

}

start();