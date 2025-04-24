import Playlist from "../../models/Playlists.js";
import User from "../../models/users.js";
import Song from "../../models/songs.js";
import {  } from "../../utils/errors.js";

import User from "../../models/users.js";

// Obtener todos los usuarios
async function getAll() {
    const users = await User.findAll();  // Obtén todos los usuarios
    return users;
}

// Obtener un usuario por su ID
async function getByID(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return user;
}

// Crear un nuevo usuario
async function create(data) {
    const newUser = await User.create(data);
    return newUser;
}

// Editar un usuario
async function edit(id, data) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.update(data);  // Actualiza los datos del usuario
    return user;
}

// Eliminar un usuario
async function remove(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.destroy();  // Elimina al usuario
}

export default {
    getAll,
    getByID,
    create,
    edit,
    remove
};
