import { Request, Response } from "express";
import { SessionRepository } from "../infra/session/SessionRepository";
import { SessionService } from "../domain/session/SessionService";
import {
    CreateSessionSchema,
    DeleteSessionSchema, FindSessionByRoomSchema,
    FindSessionSchema,
    UpdateSessionSchema
} from "../domain/session/SessionSchema";

const repository: SessionRepository = new SessionRepository();
const service: SessionService = new SessionService(repository);

export class SessionResource {
    static async list(req: Request, res: Response) {
        return service.list(req, res);
    }

    static async searchById(req: Request, res: Response) {
        try {
            FindSessionSchema.parse({ id: req.params.id });
        } catch (error) {
            return res.status(400).send({ message: error });
        }
        return service.searchById(req, res);
    }

    static async searchByRoom(req: Request, res: Response): Promise<Response> {
        try {
            FindSessionByRoomSchema.parse({ roomNumber: parseInt(req.params.roomNumber) });
        } catch (error) {
            return res.status(400).send({ message: error });
        }
        return service.searchByRoom(req, res);
    }

    static async create(req: Request, res: Response): Promise<Response> {
        try {
            CreateSessionSchema.parse(req.body);
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }
        return service.create(req, res);
    }

    static async update(req: Request, res: Response): Promise<Response> {
        try {
            UpdateSessionSchema.parse(req.body);
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }

        return service.update(req, res);
    }

    static async delete(req: Request, res: Response): Promise<Response> {
        try {
            DeleteSessionSchema.parse({ id: req.params.id });
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }
        return service.delete(req, res);
    }
}
