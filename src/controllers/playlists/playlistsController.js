import Playlist from "../../models/playlists.js";
import User from "../../models/users.js";
import Song from "../../models/songs.js";

async function getAll(user_id = null) {
    const filter = { include: [User, Song] };
    if (user_id) {
        filter.where = { user_id };
    }
    const playlists = await Playlist.findAll(filter);
    return playlists;
}

async function getByID(id) {
    const playlist = await Playlist.findByPk(id, {
        include: [User, Song]
    });
    return playlist;
}

async function create(data, userId) {
    const { name, description, isPublic } = data;

    if (!name || name.trim() === '') {
        throw new Error("El nombre de la playlist es obligatorio");
    }

    const isPublicValue = isPublic === 'on' ? 1 : 0;

    try {
        const result = await Playlist.create({
            name,
            description: description || null, 
            isPublic: isPublicValue,
            user_id: userId
        });
        return result;
    } catch (error) {
        console.error('Error al crear la playlist:', error);
        throw error;
    }
}

async function edit(id, data) {
    const { name, description } = data;
    const result = await Playlist.update({ name, description }, {
        where: {
            playlist_id: id
        }
    });
    return result;
}

async function remove(id) {
    const playlist = await Playlist.findByPk(id);
    if (!playlist) throw new Error("Playlist no encontrada");
    await playlist.destroy();
}

export default {
    getAll,
    getByID,
    create,
    edit,
    remove
};
