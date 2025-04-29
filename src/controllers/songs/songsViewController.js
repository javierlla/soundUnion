import songsController from './songsController.js';

async function getAll(req, res) {
    try {
        const songs = await songsController.getAll();
        console.log("Canciones:", songs); 
        res.render("song/list", { songs });

    } catch (error) {
        console.error(error);
        res.render("layout", { error: "Internal Server Error" });
    }
}

async function getByID(req, res) {
    try {
        const id = req.params.id;
        const song = await songsController.getByID(id);

        if (!song) {
            return res.render("layout", { error: "There is no song for that ID" });
        }

        res.render("song/show", { song });

    } catch (error) {
        console.error(error);
        res.render("layout", { error: "Internal Server Error" });
    }
}

async function createForm(req, res) {
    try {
        res.render("song/create"); 
    } catch (error) {
        console.error(error);
        res.render("layout", { error: "Internal Server Error" });
    }
}

async function create(req, res) {
    try {
        const { name, artist, category } = req.body;
        
        if (!name?.trim()) {
            return res.redirect("/songs/create?error=Nombre+requerido");
        }

        await songsController.create({ name, artist, category });
        res.redirect("/songs"); 
    } catch (error) {
        console.error(error);
        res.redirect("/songs/create?error=" + encodeURIComponent(error.message));
    }
}


export default {
    getAll,
    getByID,
    createForm,
    create
};
