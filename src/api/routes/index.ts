import { roomRoutes } from "./RoomRoutes";
import { movieRoutes } from "./MovieRoutes";
import { sessionRoutes } from "./SessionRoutes";
import { Express } from "express";
import { userRoutes } from "./UserRoutes";

export const router = (server: Express) => {
    server.use(movieRoutes);
    server.use(roomRoutes);
    server.use(sessionRoutes);
    server.use(userRoutes);
};
