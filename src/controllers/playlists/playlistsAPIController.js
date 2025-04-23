import usersController from './usersController.js';

async function getAll(req, res) {
    try {
        const role = req.session.user?.role;
        const id = req.session.user?.user_id;
        const users = await usersController.getAll(id, role);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}

async function getByID(req, res) {
    try {
        const id = req.params.id;
        const user = await usersController.getByID(id);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}

async function create(req, res) {
    try {
        const data = {
            ...req.body
        };
        const result = await usersController.create(data);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}

async function edit(req, res) {
    try {
        const id = req.params.id;
        const result = await usersController.edit(id, req.body);
        res.json(result);
    } catch (error) {
        console.error(error);
        if (error.statusCode) {
            res.status(error.statusCode).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Server Error" });
        }
    }
}

async function remove(req, res) {
    try {
        const id = req.params.id;
        await usersController.remove(id);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Server Error" });
    }
}

export default {
    getAll,
    getByID,
    create,
    edit,
    remove
};
