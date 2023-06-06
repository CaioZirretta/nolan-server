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

    async searchByNumber(number: number): Promise<Room> {
        const result: Room | null = await prisma.room.findUnique({ where: { number } });

        if (!result) {
            throw new NolanError(ErrorMessage.ROOM_NOT_FOUND);
        }

        return result;
    }

    async create(number: number): Promise<Room> {
        const result: Room | null = await prisma.room.findUnique({ where: { number } });

        if(result){
            throw new NolanError(ErrorMessage.ROOM_ALREADY_EXISTS);
        }
        return prisma.room.create({
            data: {
                number,
                updatedAt: new Date(),
                createdAt: new Date()
            }
        });
    }

    async update({ id, number }: UpdateRoomType): Promise<Room> {
        const result: Room | null =  await prisma.room.update({
            where: { id },
            data: {
                number,
                updatedAt: new Date()
            },
        });

        if(!result){
            throw new NolanError(ErrorMessage.ROOM_NOT_FOUND);
        }

        return result;
    }

    async delete(id: string): Promise<Room> {
        const result: Room = await prisma.room.delete({ where: { id } });

        if (!result) {
            throw new NolanError(ErrorMessage.ROOM_NOT_FOUND);
        }

        return result;
    }
}
