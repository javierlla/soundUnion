import Playlist from "../../models/playlists.js";
import Song from "../../models/songs.js";
import User from "../../models/users.js";
import  sequelize  from "../../config/db.js";

async function getAll(req, res) {
    try {
        console.log("DEBUG 1 - Llegó a la ruta");
        
        const playlists = await Playlist.findAll({
            where: { user_id: req.session.user.user_id }
        });

        console.log("DEBUG 2 - Playlists encontradas:", playlists);

        res.render("playlist/list", {
            playlists: playlists || [],
            user: req.session.user
        });
    } catch (error) {
        console.error("ERROR:", error);
        res.render("playlist/list", { 
            error: "Error al cargar",
            playlists: [],
            user: req.session.user
        });
    }
}

async function getByID(req, res) {
    try {
        const playlist = await Playlist.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'Creator',
                    attributes: ['user_id', 'name', 'email']
                },
                {
                    model: Song,
                    through: { attributes: [] }
                }
            ]
        });

        if (!playlist) {
            return res.status(404).render("layout", { error: "Playlist no encontrada" });
        }

        res.render("playlist/show", { 
            playlist,
            creator: playlist.Creator 
        });
    } catch (error) {
        console.error(error);
        res.status(500).redirect("/playlists");
    }
}

async function create(req, res) {
    try {
        const { name, description, isPublic } = req.body;
        const userId = req.session.user?.user_id;

        if (!name?.trim()) {
            return res.status(400).redirect("/playlists/create?error=Nombre+requerido");
        }

        await Playlist.create({
            name: name.trim(),
            description: description?.trim() || null,
            isPublic: isPublic === 'on',
            user_id: userId
        });

        res.redirect("/playlists");
    } catch (error) {
        console.error(error);
        res.status(500).redirect("/playlists/create?error=Error+del+servidor");
    }
}

async function addSongForm(req, res) {
    try {
        const playlist = await Playlist.findByPk(req.params.id);
        const songs = await Song.findAll();

        res.render("playlist/add", {
            playlist,
            songs,
            currentSongIds: []
        });
    } catch (error) {
        console.error(error);
        res.status(500).redirect(`/playlists/${req.params.id}`);
    }
}

async function addSong(req, res) {
    try {
        await sequelize.models.songs_playlists.findOrCreate({
            where: {
                playlist_id: req.params.id,
                song_id: req.body.songId
            }
        });
        res.redirect(`/playlists/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).redirect(`/playlists/${req.params.id}/add?error=Error+al+añadir`);
    }
}

async function removeSong(req, res) {
    try {
        await sequelize.models.songs_playlists.destroy({
            where: {
                playlist_id: req.params.id,
                song_id: req.params.songId
            }
        });
        res.redirect(`/playlists/${req.params.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).redirect(`/playlists/${req.params.id}?error=Error+al+eliminar`);
    }
}

async function editForm(req, res) {
    try {
        const playlist = await Playlist.findByPk(req.params.id);
        if (!playlist) return res.redirect("/playlists");
        
        res.render("playlist/edit", { playlist });
    } catch (error) {
        console.error(error);
        res.status(500).redirect("/playlists");
    }
}

async function edit(req, res) {
    try {
        const { name, description, isPublic } = req.body;
        await Playlist.update(
            {
                name,
                description,
                isPublic: isPublic === 'on'
            },
            {
                where: { playlist_id: req.params.id }
            }
        );
        res.redirect(`/playlists/${req.params.id}`);
    } catch (error) {
        console.error('Error al editar:', error);
        res.redirect(`/playlists/${req.params.id}/edit?error=Error+al+guardar`);
    }
}

async function createForm(req, res) {
    try {
        res.render("playlist/create");
    } catch (error) {
        console.error(error);
        res.status(500).redirect("/playlists");
    }
}

export default {
    getAll,
    getByID,
    create,
    edit,
    editForm,
    createForm,
    addSong,
    removeSong,
    addSongForm
};