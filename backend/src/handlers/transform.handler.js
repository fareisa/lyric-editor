import transformService from "../services/transform.service.js";

export async function transformLyrics(req, res) {
  const result =
    await transformService.transform(
      req.params.id,
      req.body
    );
  res.send(result);
}