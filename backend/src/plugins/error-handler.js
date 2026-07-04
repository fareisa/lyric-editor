export default async function (app) {

  app.setErrorHandler((error, request, reply) => {

    request.log.error(error);

    return reply
      .code(error.statusCode ?? 500)
      .send({
        error: error.message
      });

  });

}