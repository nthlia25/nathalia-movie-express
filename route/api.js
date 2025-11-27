import express from "express";
import * as moviesController from "../controller/moviesController.js";
import * as userController from "../controller/userController.js";
import { authenticateTokenMiddleware } from "../middlewares/authenticateTokenMiddleware.js";

const api = express.Router()

api.post("/signin", userController.signIn)
api.post("/signup", userController.signUp)

// api.get("/movies", moviesController.listMovie)
// api.post("/movies", moviesController.createNewMovie)
// api.put("/movies/:id", moviesController.updateMovie)
// api.delete("/movies/:id", moviesController.deleteMovie)

api.get("/movies", authenticateTokenMiddleware, moviesController.listMovie)
api.post("/movies", authenticateTokenMiddleware, moviesController.createNewMovie)
api.put("/movies/:id", authenticateTokenMiddleware, moviesController.updateMovie)
api.delete("/movies/:id", authenticateTokenMiddleware, moviesController.deleteMovie)

export default api;