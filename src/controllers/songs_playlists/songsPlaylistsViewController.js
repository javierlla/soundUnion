import playlistSongsController from './playlistSongsController.js';

async function add(req, res) {
    try {
        const { playlistId, songId } = req.body;
        await playlistSongsController.addSong(playlistId, songId);
        res.redirect("/playlist/" + playlistId);
    } catch (error) {
        res.render("layout", { error: error.message });
    }
}

async function remove(req, res) {
    try {
        const { playlistId, songId } = req.body;
        await playlistSongsController.removeSong(playlistId, songId);
        res.redirect("/playlist/" + playlistId);
    } catch (error) {
        res.render("layout", { error: error.message });
    }
}

export default {
    add,
    remove
};
