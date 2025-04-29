import { Router } from "express";
import playlistsAPIController from "../../controllers/playlists/playlistsAPIController.js";
import songsAPIController from "../../controllers/songs/songsAPIController.js";
import usersAPIController from "../../controllers/users/usersAPIController.js";
import songsPlaylistsAPIController from "../../controllers/songs_playlists/songsPlaylistsAPIController.js";
import isAuthenticated from "../../middleware/authMiddleware.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Welcome to the API world");
});

// Rutas para playlists
router.get("/playlists", isAuthenticated, playlistsAPIController.getAll); 
router.get("/playlists/:id", isAuthenticated, playlistsAPIController.getByID); 
router.post("/playlists", isAuthenticated, playlistsAPIController.create);  
router.put("/playlists/:id", isAuthenticated, playlistsAPIController.edit); 
router.delete("/playlists/:id", isAuthenticated, playlistsAPIController.remove);  

// Rutas para canciones
router.get("/songs", isAuthenticated, songsAPIController.getAll);  
router.get("/songs/:id", isAuthenticated, songsAPIController.getByID);  
router.post("/songs", isAuthenticated, songsAPIController.create);  
router.put("/songs/:id", isAuthenticated, songsAPIController.edit);  
router.delete("/songs/:id", isAuthenticated, songsAPIController.remove);

// Rutas para usuarios
router.get("/users", isAuthenticated, usersAPIController.getAll); 
router.get("/users/:id", isAuthenticated, usersAPIController.getByID); 
router.post("/users", usersAPIController.create);  
router.put("/users/:id", isAuthenticated, usersAPIController.edit); 
router.delete("/users/:id", isAuthenticated, usersAPIController.remove); 


router.post("/playlists/:playlistId/songs/:songId", isAuthenticated, songsPlaylistsAPIController.add); 
router.delete("/playlists/:playlistId/songs/:songId", isAuthenticated, songsPlaylistsAPIController.remove);  

export default router;
