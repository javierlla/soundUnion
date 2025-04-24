import playlistsController from './playlistsController.js';

async function getAll(req, res) {
    try {
        const userId = req.user?.user_id;
        const playlists = await playlistsController.getAll(userId);
        res.json(playlists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}

async function getByID(req, res) {
    try {
        const id = req.params.id;
        const playlist = await playlistsController.getByID(id);
        res.json(playlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}

async function create(req, res) {
    try {
        const data = req.body;
        const userId = req.user?.user_id;
        const result = await playlistsController.create(data, userId);
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}

async function edit(req, res) {
    try {
        const id = req.params.id;
        const result = await playlistsController.edit(id, req.body);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
}

async function remove(req, res) {
    try {
        const id = req.params.id;
        await playlistsController.remove(id);
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
