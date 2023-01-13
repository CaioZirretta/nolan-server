import { MovieController } from '../controller/MovieController';
import { Router } from "express";

export const movieRoutes = Router();

const baseUrl = "/movie";

movieRoutes.get(baseUrl, MovieController.list);
movieRoutes.get(baseUrl + "/:id", MovieController.searchById);
movieRoutes.post(baseUrl, MovieController.create);
movieRoutes.patch(baseUrl + "/:id", MovieController.update);
movieRoutes.delete(baseUrl + "/:id", MovieController.delete);