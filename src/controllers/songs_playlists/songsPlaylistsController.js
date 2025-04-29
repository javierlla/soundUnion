import Playlist from "../../models/playlists.js";
import Song from "../../models/songs.js";

async function addSong(playlistId, songId) {
    const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId);

    if (!playlist || !song) throw new Error("Playlist or Song not found");

    await playlist.addSong(song); 
}

async function removeSong(playlistId, songId) {
    const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId);

    if (!playlist || !song) throw new Error("Playlist or Song not found");

    await playlist.removeSong(song); 
}

async function getSongsInPlaylist(playlistId) {
    const playlist = await Playlist.findByPk(playlistId, {
        include: [Song],
    });

    if (!playlist) throw new Error("Playlist not found");

    return playlist.Songs;
}

export default {
    addSong,
    removeSong,
    getSongsInPlaylist
};
