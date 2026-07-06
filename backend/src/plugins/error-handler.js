export default async function (app) {

  app.setErrorHandler((error, request, reply) => {

    request.log.error(
      {
        err: error,
        method: request.method,
        url: request.url
      },
      "Request failed"
    );

    const status =
      error.statusCode ?? 500;

    return reply
      .code(status)
      .send({
        error:
          status >= 500
            ? "Internal Server Error"
            : error.message
      });

  });

}