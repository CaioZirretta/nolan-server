import { Router } from "express";
import { SessionResource } from "../resources/SessionResource";
import { authenticationFilter } from "../infra/AuthenticationFilter";

export const sessionRoutes = Router();

const baseUrl = "/session";

// TODO padronizar o req.query nos outros domínios
// Mudar também as requisições no front

sessionRoutes.get(baseUrl, authenticationFilter, SessionResource.list);
sessionRoutes.get(baseUrl + "/room/", authenticationFilter, SessionResource.searchByRoom);
sessionRoutes.get(baseUrl + "/movie/", authenticationFilter, SessionResource.searchByMovieName);
sessionRoutes.post(baseUrl, authenticationFilter, SessionResource.create);
sessionRoutes.post(baseUrl + "/reservation", authenticationFilter, SessionResource.newReservation)
sessionRoutes.put(baseUrl, authenticationFilter, SessionResource.update);
sessionRoutes.delete(baseUrl, authenticationFilter, SessionResource.delete);
