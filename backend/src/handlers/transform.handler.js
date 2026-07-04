import transformService from "../services/transform.service.js";

export async function transformLyrics(request) {

  return await transformService.transform(
    request.params.id,
    request.body
  );

}