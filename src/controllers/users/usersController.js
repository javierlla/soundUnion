import User from "../../models/users.js";
import {  } from "../../utils/errors.js";


async function getAll() {
    const users = await User.findAll();  
    return users;
}


async function getByID(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    return user;
}


async function create(data) {
    const newUser = await User.create(data);
    return newUser;
}


async function edit(id, data) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.update(data); 
    return user;
}


async function remove(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");
    await user.destroy(); 
}

export default {
    getAll,
    getByID,
    create,
    edit,
    remove
};
