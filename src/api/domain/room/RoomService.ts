import { Request, Response } from "express";
import { RoomRepository } from "../../infra/room/RoomRepository";
import { Movie, Room, Session } from "@prisma/client";
import { RoomWithSession } from "./RoomSchema";
import { SessionRepository } from "../../infra/session/SessionRepository";
import { NolanError } from "../../error/NolanError";
import { ErrorMessage } from "../../error/ErrorMessage";

export class RoomService {
    constructor(private roomRepository: RoomRepository,
                private sessionRepository: SessionRepository) {
    }

    async list(req: Request, res: Response): Promise<Response> {
        let result: Room[] = await this.roomRepository.list();

        return res.status(200).send(result);
    }

    async searchById(req: Request, res: Response): Promise<Response> {
        let result: Room;

        try {
            result = await this.roomRepository.searchById(req.params.id);
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);
    }

    async listWithSessions(req: Request, res: Response): Promise<Response> {
        let rooms: Room[];
        let sessions: Session[];

        try {
            rooms = await this.roomRepository.list();
            sessions = await this.sessionRepository.list();
        } catch (error: any) {
            return res.status(404).send({ error });
        }

        let roomWithSessions: RoomWithSession[] = rooms.map((room: Room) => {
            return {
                id: room.id,
                number: room.number,
                createdAt: room.createdAt,
                updatedAt: room.updatedAt,
                sessions: sessions.filter(session => session.roomNumber === room.number),
            };
        });

        return res.status(200).send(roomWithSessions);
    }

    async listWithSessionsByRoomNumber(req: Request, res: Response): Promise<Response> {
        const roomNumber: number = parseInt(req.params.number);
        let room: Room = {} as Room;
        let sessions: Session[] = [];

        try {
            room = await this.roomRepository.searchByNumber(roomNumber);
            sessions = await this.sessionRepository.searchByRoom(roomNumber);
        } catch (error: any) {
            res.status(404).send({ error });
        }

        let roomWithSessions: RoomWithSession = {
            id: room.id,
            number: room.number,
            createdAt: room.createdAt,
            updatedAt: room.updatedAt,
            sessions: sessions
        };

        return res.status(200).send(roomWithSessions);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { number } = req.body;

        let result: Room;

        try {
            result = await this.roomRepository.create(number);
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id, number } = req.body;

        let result: Room;

        try {
            result = await this.roomRepository.update({
                id,
                number,
            });
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        let result: Room;

        try {
            result = await this.roomRepository.delete(req.params.id);
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);
    }


}
