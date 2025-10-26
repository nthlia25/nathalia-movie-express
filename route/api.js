import express from "express";
import * as moviesController from "../controller/moviesController.js";

const api = express.Router()

api.get("/movies", moviesController.listMovie)
api.post("/movies", moviesController.createNewMovie)
api.put("/movies/:id", moviesController.updateMovie)
api.delete("/movies/:id", moviesController.deleteMovie)

export default api