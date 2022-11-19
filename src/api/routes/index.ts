import { roomRoutes } from "./RoomRoutes";
import { movieRoutes } from "./MovieRoutes";
import { sessionRoutes } from "./SessionRoutes";

export const router = (server: any) => {
	server.use(movieRoutes);
	server.use(roomRoutes);
	server.use(sessionRoutes)
};
