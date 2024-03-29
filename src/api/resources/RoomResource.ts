import { RoomRepository } from "../infra/room/RoomRepository";
import { RoomService } from "../domain/room/RoomService";
import { Request, Response } from "express";
import {
    CreateRoomSchema,
    DeleteRoomSchema,
    FindRoomSchema,
    ListWithSessionsByIdSchema,
    UpdateRoomSchema
} from "../domain/room/RoomSchema";
import { SessionRepository } from "../infra/session/SessionRepository";

const sessionRepository: SessionRepository = new SessionRepository();
const roomRepository: RoomRepository = new RoomRepository();
const service: RoomService = new RoomService(roomRepository, sessionRepository);

export class RoomResource {
    static async search(req: Request, res: Response): Promise<Response> {
        if (req.query.id) {
            return RoomResource.searchById(req, res);
        }

        return RoomResource.list(req, res);
    }

    static async list(req: Request, res: Response): Promise<Response> {
        return service.list(req, res);
    }

    static async searchById(req: Request, res: Response): Promise<Response> {
        try {
            FindRoomSchema.parse({ id: req.query.id });
        } catch (error) {
            return res.status(400).send({ message: error });
        }
        return service.searchById(req, res);
    }

    static async listWithSessions(req: Request, res: Response): Promise<Response> {
        return service.listWithSessions(req, res);
    }

    static async listWithSessionsByRoomNumber(req: Request, res: Response) {
        try {
            ListWithSessionsByIdSchema.parse({ number: req.params.number });
        } catch (error) {
            return res.status(400).send({ message: error });
        }

        return service.listWithSessionsByRoomNumber(req, res);
    }

    static async create(req: Request, res: Response): Promise<Response> {
        try {
            CreateRoomSchema.parse({ number: req.body.number });
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }
        return service.create(req, res);
    }

    static async update(req: Request, res: Response): Promise<Response> {
        try {
            UpdateRoomSchema.parse(req.body);
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }

        return service.update(req, res);
    }

    static async delete(req: Request, res: Response): Promise<Response> {
        try {
            DeleteRoomSchema.parse({ id: req.query.id });
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }
        return service.delete(req, res);
    }
}
