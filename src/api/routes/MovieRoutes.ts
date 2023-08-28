import { MovieResource } from '../resources/MovieResource';
import { Router } from "express";
import { authenticationFilter } from "../infra/AuthenticationFilter";

export const movieRoutes = Router();

const baseUrl = "/movie";

movieRoutes.get(baseUrl, authenticationFilter, MovieResource.search);
movieRoutes.get(baseUrl + "/idName", authenticationFilter, MovieResource.listIdName);
movieRoutes.post(baseUrl, authenticationFilter, MovieResource.create);
movieRoutes.put(baseUrl, authenticationFilter, MovieResource.update);
movieRoutes.delete(baseUrl + "/:id", authenticationFilter, MovieResource.delete);
