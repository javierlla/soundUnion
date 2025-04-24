import playlistSongsController from './playlistSongsController.js';

async function add(req, res) {
    try {
        const { playlistId, songId } = req.body;
        await playlistSongsController.addSong(playlistId, songId);
        res.status(200).json({ message: "Song added to playlist" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function remove(req, res) {
    try {
        const { playlistId, songId } = req.body;
        await playlistSongsController.removeSong(playlistId, songId);
        res.status(200).json({ message: "Song removed from playlist" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export default {
    add,
    remove
};
