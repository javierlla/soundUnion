import Playlist from "../../models/Playlists.js";
import User from "../../models/users.js";
import Song from "../../models/songs.js";
import {  } from "../../utils/errors.js";

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
    const result = await Playlist.create({
        ...data,
        user_id: userId
    });
    return result;
}


async function edit(id, data) {
    const result = await Playlist.update(data, {
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
