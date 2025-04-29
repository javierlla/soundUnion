
import Song from '../../models/songs.js';
import {  } from "../../utils/errors.js";

async function getAll() {
    try {
        const songs = await Song.findAll();
        return songs;
    } catch (error) {
        throw new Error("Error al obtener canciones");
    }
}
  
async function getByID(id) {
    try {
        const song = await Song.findByPk(id);
        if (!song) {
            throw new Error("Canción no encontrada");
        }
        return song;
    } catch (error) {
        throw new Error(`Error al obtener la canción con ID ${id}`);
    }
}

async function edit(id, data) {
    try {
        const song = await Song.findByPk(id);
        if (!song) {
            throw new Error("Canción no encontrada");
        }

        if (data.name && data.name.trim() === "") {
            throw new Error("El nombre de la canción no puede estar vacío");
        }

        const result = await Song.update(data, {
            where: {
                song_id: id
            }
        });

        return result;
    } catch (error) {
        throw new Error(`Error al actualizar la canción con ID ${id}: ${error.message}`);
    }
}

async function create(data) {
    try {
        if (!data.name || data.name.trim() === "") {
            throw new Error("El nombre de la canción es obligatorio");
        }

        const newSong = await Song.create({
            name: data.name.trim(),
            artist: data.artist?.trim() || null,
            category: data.category?.trim() || null
        });

        return newSong;
    } catch (error) {
        throw new Error(`Error al crear la canción: ${error.message}`);
    }
}


export default {
    getAll,
    getByID,
    edit,
    create 
};