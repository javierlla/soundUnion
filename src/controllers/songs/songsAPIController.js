import songController from "./songsController.js";

async function getAll(req, res) {
    try {
        const songs = await songController.getAll();
        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}

async function getByID(req, res) {
    try {
        const id = req.params.id;
        const song = await songController.getByID(id);
        res.json(song);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}
async function create(req, res) {
    try {
        const newSong = await songController.create(req.body);
        res.status(201).json(newSong);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}


async function edit(req, res) {
    try {
        const id = req.params.id;
        const result = await songController.edit(id, req.body);
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

const remove = async (req, res) => {
    res.status(403).json({ message: "Deleting songs is not allowed" }); 
  };
  

export default {
    getAll,
    getByID,
    edit,
    remove,
    create
};
