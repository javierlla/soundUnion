import songController from './songsController.js';

async function getAll(req, res) {
    try {
        const songs = await songController.getAll();
        const role = req.session.user?.role;
    
        res.render("song/list", { songs, role });

    } catch (error) {
        console.error(error);
        res.render("layout", { error: "Internal Server Error" }); // Vamos a la vista de layout y le mostramos el error
    }
}

async function getByID(req, res) {
    try {
        const id = req.params.id;
        const song = await songController.getByID(id);

        if (!song) {
            return res.render("layout", { error: "There is no song for that ID" });
        }

        res.render("song/show", { song }); // La ruta de render es a partir de la carpeta views, no la del router
        
    } catch (error) {
        console.error(error);
        res.render("layout", { error: "Internal Server Error" }); // Vamos a la vista de layout y le mostramos el error
    }
}

async function editForm(req, res) {
    try {
        const id = req.params.id;
        const song = await songController.getByID(id);

        if (!song) {
            return res.redirect("/song");
        }

        res.render("song/edit", { song });
        
    } catch (error) {
        console.error(error);
        res.render("layout", { error: "Internal Server Error" }); // Vamos a la vista de layout y le mostramos el error
    }
}

async function edit(req, res) {
    const id = req.params.id;

    try {
        const result = await songController.edit(id, req.body);
        res.redirect("/song/" + id);
        
    } catch (error) {
        if (error.statusCode) {
            res.redirect(`/song/${id}/edit?error=` + error.message);
        } else {
            res.render("layout", { error: "Internal Server Error" });
        }
    }
}

export default {
    getAll,
    getByID,
    edit,
    editForm
};
