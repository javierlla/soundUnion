import Playlist from "../../models/Playlists.js";
import Song from "../../models/songs.js";

// Añadir una canción a una playlist
async function addSong(playlistId, songId) {
    const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId);

    if (!playlist || !song) throw new Error("Playlist or Song not found");

    await playlist.addSong(song); // Sequelize: relación belongsToMany
}

// Eliminar una canción de una playlist
async function removeSong(playlistId, songId) {
    const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId);

    if (!playlist || !song) throw new Error("Playlist or Song not found");

    await playlist.removeSong(song); // Sequelize: relación belongsToMany
}

// Obtener todas las canciones de una playlist
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
