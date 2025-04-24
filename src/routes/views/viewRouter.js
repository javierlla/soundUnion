import { Router } from "express";
import authRouter from "./authRouter.js"; 
import playlistsViewController from "../../controllers/playlists/playlistsViewController.js";
import songsViewController from "../../controllers/songs/songsViewController.js";
import usersViewController from "../../controllers/users/usersViewController.js";
import isAuthenticated from "../../middleware/authMiddleware.js";

const router = Router();

// Rutas de las playlists
router.get("/playlists", isAuthenticated, playlistsViewController.getAll);  // Mostrar todas las playlists
router.get("/playlists/:id", isAuthenticated, playlistsViewController.getByID);  // Mostrar playlist por ID
router.get("/playlists/:id/edit", isAuthenticated, playlistsViewController.editForm);  // Formulario para editar playlist
router.post("/playlists/:id", isAuthenticated, playlistsViewController.edit);  // Editar playlist

// Rutas para las canciones
router.get("/songs", isAuthenticated, songsViewController.getAll);  // Mostrar todas las canciones
router.get("/songs/:id", isAuthenticated, songsViewController.getByID);  // Mostrar canción por ID

// Rutas de los usuarios
router.get("/users", isAuthenticated, usersViewController.getAll);  // Mostrar todos los usuarios
router.get("/users/:id", isAuthenticated, usersViewController.getByID);  // Mostrar usuario por ID
router.get("/users/:id/edit", isAuthenticated, usersViewController.editForm);  // Formulario de edición de usuario
router.post("/users/:id", isAuthenticated, usersViewController.edit);  // Editar usuario

// Página de inicio
router.get("/home", isAuthenticated, (req, res) => {
    res.render("userHome", { user: req.session.user });
});

// Página principal, redirige a home si ya está autenticado
router.get("/", (req, res) => {
    if (req.session.user) {
        return res.redirect("/home");
    } else {
        return res.redirect("/login");
    }
});


router.use("/", authRouter);

export default router;
