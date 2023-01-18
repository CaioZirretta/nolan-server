import { Room } from "@prisma/client";
import { ItemRepository } from "../ItemRepository";

export interface RoomRepository extends ItemRepository<Room> {
	list: () => Promise<Room[]>;
	searchById: (id: string) => Promise<Room>;
	create: (room: Room) => Promise<Room>;
	update: (room: Room) => Promise<Room>;
	delete: (id: string) => Promise<Room>;
}
