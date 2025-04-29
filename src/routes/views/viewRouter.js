import { Router } from "express";
import authRouter from "./authRouter.js"; 
import playlistsViewController from "../../controllers/playlists/playlistsViewController.js";
import songsViewController from "../../controllers/songs/songsViewController.js";
import usersViewController from "../../controllers/users/usersViewController.js";
import isAuthenticated from "../../middleware/authMiddleware.js";

const router = Router();

// Playlists
router.get("/playlists", isAuthenticated, playlistsViewController.getAll);
router.get("/playlists/create", isAuthenticated, playlistsViewController.createForm);
router.post("/playlists", isAuthenticated, playlistsViewController.create);
router.get("/playlists/:id", isAuthenticated, playlistsViewController.getByID);
router.get("/playlists/:id/edit", isAuthenticated, playlistsViewController.editForm);
router.post("/playlists/:id", isAuthenticated, playlistsViewController.edit);
router.get("/playlists/:id/add", isAuthenticated, playlistsViewController.addSongForm);
router.post("/playlists/:id/add-song", isAuthenticated, playlistsViewController.addSong);
router.post("/playlists/:id/remove-song/:songId", isAuthenticated, playlistsViewController.removeSong); // Cambiado para incluir songId en la ruta

// Songs
router.get("/songs", isAuthenticated, songsViewController.getAll);
router.get("/songs/create", isAuthenticated, songsViewController.createForm);
router.post("/songs", isAuthenticated, songsViewController.create);
router.get("/songs/:id", isAuthenticated, songsViewController.getByID);

// Users
router.get("/users", isAuthenticated, usersViewController.getAll);
router.get("/users/:id", isAuthenticated, usersViewController.getByID);
router.get("/users/:id/edit", isAuthenticated, usersViewController.editForm);
router.post("/users/:id", isAuthenticated, usersViewController.edit);


router.get("/home", isAuthenticated, (req, res) => {
    res.render("home/userHome", { user: req.session.user });
});

router.get("/", (req, res) => {
    req.session.user ? res.redirect("/home") : res.redirect("/login");
});

router.use("/", authRouter);

export default router;