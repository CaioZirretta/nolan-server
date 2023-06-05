import { Movie, Room } from "@prisma/client";
import { BaseCrudRepository } from "../BaseCrudRepository";
import { prisma } from "../../../prisma";
import { NolanError } from "../../error/NolanError";
import { ErrorMessage } from "../../error/ErrorMessage";
import { CreateRoomType, UpdateRoomType } from "../../domain/room/RoomSchema";

export class RoomRepository implements BaseCrudRepository<Room> {
    async list(): Promise<Room[]> {
        const result: Room[] = await prisma.room.findMany();

        if (result.length === 0) {
            throw new NolanError(ErrorMessage.ROOMS_NOT_FOUND);
        }

        return result;
    }

    async searchById(id: string): Promise<Room> {
        const result: Room | null = await prisma.room.findUnique({ where: { id } });

        if (!result) {
            throw new NolanError(ErrorMessage.ROOM_NOT_FOUND);
        }

        return result;
    }

    async create({ number }: CreateRoomType): Promise<Room> {
        return prisma.room.create({ data: { number } });
    }

    async update({ id, number }: UpdateRoomType): Promise<Room> {
        return prisma.room.update({
            where: { id },
            data: { number }
        });
    }

    async delete(id: string): Promise<Room> {
        const result: Room = await prisma.room.delete({ where: { id } });

        if (!result) {
            throw new NolanError(ErrorMessage.ROOM_NOT_FOUND);
        }

        return result;
    }
}
