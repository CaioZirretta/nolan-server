import { Room } from "@prisma/client";
import { BaseCrudRepository } from "../BaseCrudRepository";
import { prisma } from "../../../prisma";
import { NolanError } from "../../error/NolanError";
import { ErrorMessage } from "../../error/ErrorMessage";
import { UpdateRoomType } from "../../domain/room/RoomSchema";
import { ErrorCode } from "../../error/ErrorCode";

export class RoomRepository implements BaseCrudRepository<Room> {
    async list(): Promise<Room[]> {
        const result: Room[] = await prisma.room.findMany({ orderBy: { createdAt: 'asc' } });

        return result;
    }

    async searchById(id: string): Promise<Room> {
        const result: Room | null = await prisma.room.findUnique({ where: { id } });

        if (!result) {
            throw new NolanError(ErrorMessage.ROOM_NOT_FOUND, ErrorCode.ROOM_NOT_FOUND_CODE);
        }

        return result;
    }

    async searchByNumber(number: number): Promise<Room> {
        const result: Room | null = await prisma.room.findUnique({ where: { number } });

        if (!result) {
            throw new NolanError(ErrorMessage.ROOM_NOT_FOUND, ErrorCode.ROOM_NOT_FOUND_CODE);
        }

        return result;
    }

    async create(number: number): Promise<Room> {
        const result: Room | null = await prisma.room.findUnique({ where: { number } });

        if (result) {
            throw new NolanError(ErrorMessage.ROOM_ALREADY_EXISTS, ErrorCode.ROOM_ALREADY_EXISTS_CODE);
        }

        return prisma.room.create({
            data: {
                number,
            }
        });
    }

    async update({ id, number }: UpdateRoomType): Promise<Room> {
        const result: Room | null = await prisma.room.update({
            where: { id },
            data: {
                number,
                updatedAt: new Date()
            },
        });

        if (!result) {
            throw new NolanError(ErrorMessage.ROOM_NOT_FOUND, ErrorCode.ROOM_NOT_FOUND_CODE);
        }

        return result;
    }

    async delete(id: string): Promise<Room> {
        const result: Room = await prisma.room.delete({ where: { id } });

        if (!result) {
            throw new NolanError(ErrorMessage.ROOM_NOT_FOUND, ErrorCode.ROOM_NOT_FOUND_CODE);
        }

        return result;
    }
}
