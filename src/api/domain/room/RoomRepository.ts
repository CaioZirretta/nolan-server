import { Room } from "@prisma/client";

export interface RoomRepository {
	list: () => Promise<Room[]>;
	searchById: (id: string) => Promise<Room>;
	add: (movie: Room) => Promise<any>;
	update: (movie: Room) => Promise<any>;
	delete: (id: string) => Promise<any>;
}
