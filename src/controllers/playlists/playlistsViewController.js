import playlistsController from './playlistsController.js';

async function getAll(req, res) {
    try {
        const role = req.session.user?.role;
        const id = req.session.user?.user_id;
        const playlists = await playlistsController.getAll(id, role);

        res.render("playlist/list", { playlists, role });

    } catch (error) {
        console.error(error);
        res.render("layout", { error: "Internal Server Error" });
    }
}

async function getByID(req, res) {
    try {
        const id = req.params.id;
        const playlist = await playlistsController.getByID(id);

        if (!playlist) {
            return res.render("layout", { error: "There is no playlist for that ID" });
        }

        res.render("playlist/show", { playlist });

    } catch (error) {
        console.error(error);
        res.render("layout", { error: "Internal Server Error" });
    }
}

async function editForm(req, res) {
    try {
        const id = req.params.id;
        const playlist = await playlistsController.getByID(id);

        if (!playlist) {
            return res.redirect("/playlist");
        }

        res.render("playlist/edit", { playlist });

    } catch (error) {
        console.error(error);
        res.render("layout", { error: "Internal Server Error" });
    }
}

async function edit(req, res) {
    const id = req.params.id;

    try {
        const result = await playlistsController.edit(id, req.body);
        res.redirect("/playlist/" + id);

    } catch (error) {
        if (error.statusCode) {
            res.redirect(`/playlist/${id}/edit?error=` + error.message);
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
