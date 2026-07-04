import * as mm from "music-metadata";

export async function readMetadata(file) {
    try {
        const metadata = await mm.parseFile(file);
        return {
            title:
                metadata.common.title,
            artist:
                metadata.common.artist,
            album:
                metadata.common.album,
            duration:
                Math.round(
                    metadata.format.duration || 0
                )
        };
    } catch {
        return {
            title: null,
            artist: null,
            album: null,
            duration: 0
        };
    }
}