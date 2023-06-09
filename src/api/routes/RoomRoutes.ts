import { Router } from "express";
import { RoomResource } from "../resources/RoomResource";
import { authenticationFilter } from "../infra/AuthenticationFilter";

export const roomRoutes = Router();

const baseUrl = "/room";

roomRoutes.get(baseUrl, authenticationFilter, RoomResource.list);
roomRoutes.get(baseUrl + "/sessions", authenticationFilter, RoomResource.listWithSessions);
roomRoutes.get(baseUrl + "/sessions/:id", authenticationFilter, RoomResource.listWithSessionsByRoomId);
roomRoutes.get(baseUrl + "/:id", authenticationFilter, RoomResource.searchById);

roomRoutes.post(baseUrl, authenticationFilter, RoomResource.create);
roomRoutes.put(baseUrl, authenticationFilter, RoomResource.update);
roomRoutes.delete(baseUrl + "/:id", authenticationFilter, RoomResource.delete);
