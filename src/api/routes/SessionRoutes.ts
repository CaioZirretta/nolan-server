import { Router } from "express";
import { SessionResource } from "../resources/SessionResource";
import { authenticationFilterLevel0 } from "../infra/AuthenticationFilter";

export const sessionRoutes: Router = Router();

const baseUrl: string = "/session";

sessionRoutes.get(baseUrl, authenticationFilterLevel0, SessionResource.search);
sessionRoutes.get(baseUrl + "/room/", authenticationFilterLevel0, SessionResource.searchByRoom);
sessionRoutes.get(baseUrl + "/movie/", authenticationFilterLevel0, SessionResource.searchByMovieName);
sessionRoutes.post(baseUrl, authenticationFilterLevel0, SessionResource.create);
sessionRoutes.post(baseUrl + "/reservation", authenticationFilterLevel0, SessionResource.newReservation);
sessionRoutes.put(baseUrl, authenticationFilterLevel0, SessionResource.update);
sessionRoutes.delete(baseUrl, authenticationFilterLevel0, SessionResource.delete);


