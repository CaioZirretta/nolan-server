import { roomRoutes } from "./RoomRoutes";
import { movieRoutes } from "./MovieRoutes";

export const router = (server: any) => {
	server.use(movieRoutes);
	server.use(roomRoutes);
};
