import { Router } from "express";
import { RoomResource } from "../resources/RoomResource";
import { authenticationFilter } from "../infra/AuthenticationFilter";

export const roomRoutes = Router();

const baseUrl = "/room";

roomRoutes.get(baseUrl, authenticationFilter, RoomResource.search);
roomRoutes.get(baseUrl + "/sessions", authenticationFilter, RoomResource.listWithSessions);
roomRoutes.get(baseUrl + "/sessions/:number", authenticationFilter, RoomResource.listWithSessionsByRoomNumber);

roomRoutes.post(baseUrl, authenticationFilter, RoomResource.create);
roomRoutes.put(baseUrl, authenticationFilter, RoomResource.update);
roomRoutes.delete(baseUrl, authenticationFilter, RoomResource.delete);
