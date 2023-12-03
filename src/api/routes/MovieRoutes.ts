import { MovieResource } from '../resources/MovieResource';
import { Router } from "express";
import { authenticationFilterLevel0 } from "../infra/AuthenticationFilter";

export const movieRoutes = Router();

const baseUrl = "/movie";

movieRoutes.get(baseUrl, authenticationFilterLevel0, MovieResource.search);
movieRoutes.get(baseUrl + "/idName", authenticationFilterLevel0, MovieResource.listIdName);
movieRoutes.post(baseUrl, authenticationFilterLevel0, MovieResource.create);
movieRoutes.put(baseUrl, authenticationFilterLevel0, MovieResource.update);
movieRoutes.delete(baseUrl + "/:id", authenticationFilterLevel0, MovieResource.delete);
