import { roomRoutes } from "./RoomRoutes";
import { movieRoutes } from "./MovieRoutes";
import { sessionRoutes } from "./SessionRoutes";
import { Express } from "express";
import { userRoutes } from "./UserRoutes";
import { globalParameterRoutes } from "./GlobalParameterRoutes";

export const router = (server: Express) => {
    server.use(movieRoutes);
    server.use(roomRoutes);
    server.use(sessionRoutes);
    server.use(userRoutes);
    server.use(globalParameterRoutes);
};
