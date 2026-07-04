import songService from "../services/song.service.js";

export default async function (app) {
    app.get("/songs", async () => {
        return await songService.list();
    });
}
