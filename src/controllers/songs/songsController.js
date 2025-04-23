/* import  Song from '../../models/Songs.js';
import {  } from "../../utils/errors.js";


async function getAll(){

    const songs = await Song.findAll();
   
    return songs;

}
  
async function getByID(id){

    const song = await Song.findByPk(id);

    return song;

}

async function edit(id, data){ // suponemos que los datos que vamos a pasar a la función estan en el formato correcto

    if (data.name){
        
    }

    const result = await Song.update(
        data,
        {
            where:{
                song_id: id
            }
        }
    );

    return result;

}

export default{
    getAll,
    getByID,
    edit
} */

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

export default {
    getAll,
    getByID,
    edit
};
