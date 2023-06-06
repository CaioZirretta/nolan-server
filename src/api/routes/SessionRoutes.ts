import { Router } from "express";
import { SessionResource } from "../resources/SessionResource";
import { authenticationFilter } from "../infra/AuthenticationFilter";

export const sessionRoutes = Router();

const baseUrl = "/session";

sessionRoutes.get(baseUrl, authenticationFilter, SessionResource.list);
sessionRoutes.get(baseUrl + "/:id", authenticationFilter, SessionResource.searchById);
sessionRoutes.get(baseUrl + "/room/:roomNumber", authenticationFilter, SessionResource.searchByRoom);
sessionRoutes.post(baseUrl, authenticationFilter, SessionResource.create);
sessionRoutes.put(baseUrl, authenticationFilter, SessionResource.update);
sessionRoutes.delete(baseUrl + "/:id", authenticationFilter, SessionResource.delete);
