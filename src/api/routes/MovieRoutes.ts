import { Router } from "express";
import { MovieServiceImpl } from "../domain/movie/impl/MovieServiceImpl";

export const movieRoutes = Router();

const baseUrl = "/movie";

const service = new MovieServiceImpl();

movieRoutes.get(baseUrl, service.list);
movieRoutes.get(baseUrl + "/:id", service.searchById);
movieRoutes.post(baseUrl, service.add);
movieRoutes.patch(baseUrl + "/:id", service.update);
movieRoutes.delete(baseUrl + "/:id", service.delete);