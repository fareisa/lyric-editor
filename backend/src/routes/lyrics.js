import songService from "../services/song.service.js";
import lyricService from "../services/lyric.service.js";

export default async function (app) {

	app.get(
		"/songs/:id/lyrics",

		async (request, reply) => {
			const { id } = request.params;
			const song = songService.get(id);

			if (!song) {
				return reply.code(404).send({
				message: "Song not found"
				});
			}

			const lyrics =
				await lyricService.load(song);

			if (lyrics === null) {
				return reply.code(404).send({
				message: "Lyrics not found"
				});
			}

			return {
				lyrics
			};
		}
	);

	app.put(
		"/songs/:id/lyrics",
		{
			schema: {
				body: {
					type: "object",
					required: [
						"lyrics"
					],
					properties: {
						lyrics: {
							type: "string"
						}
					}
				}      
			}

		},

		async (request, reply) => {
			const { id } =
			request.params;
			const song =
			songService.get(id);

			if (!song) {
				return reply.code(404).send({
					message: "Song not found"
				});
			}
			await lyricService.save(
				song,
				request.body.lyrics
			);
			return {
				message: "Saved"
			};
		}
	);
}