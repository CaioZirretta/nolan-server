import { Room } from "@prisma/client";
import { BaseCrudRepository } from "../BaseCrudRepository";

export interface RoomRepository extends BaseCrudRepository<Room> {
	list: () => Promise<Room[]>;
	searchById: (id: string) => Promise<Room>;
	create: (room: Room) => Promise<Room>;
	update: (room: Room) => Promise<Room>;
	delete: (id: string) => Promise<Room>;
}
