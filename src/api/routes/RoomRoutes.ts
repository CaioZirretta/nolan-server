import { Router } from "express";
import { RoomResource } from "../resources/RoomResource";
import { authenticationFilterLevel0 } from "../infra/AuthenticationFilter";

export const roomRoutes = Router();

const baseUrl = "/room";

roomRoutes.get(baseUrl, authenticationFilterLevel0, RoomResource.search);
roomRoutes.get(baseUrl + "/sessions", authenticationFilterLevel0, RoomResource.listWithSessions);
roomRoutes.get(baseUrl + "/sessions/:number", authenticationFilterLevel0, RoomResource.listWithSessionsByRoomNumber);

roomRoutes.post(baseUrl, authenticationFilterLevel0, RoomResource.create);
roomRoutes.put(baseUrl, authenticationFilterLevel0, RoomResource.update);
roomRoutes.delete(baseUrl, authenticationFilterLevel0, RoomResource.delete);
