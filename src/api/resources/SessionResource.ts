import { Request, Response } from "express";
import { SessionRepository } from "../infra/session/SessionRepository";
import { SessionService } from "../domain/session/SessionService";
import {
    CreateSessionSchema,
    DeleteSessionSchema, FindSessionByMovieNameSchema, FindSessionByRoomSchema,
    FindSessionSchema, NewReservationSchema,
    UpdateSessionSchema
} from "../domain/session/SessionSchema";

const repository: SessionRepository = new SessionRepository();
const service: SessionService = new SessionService(repository);

export class SessionResource {
    static async search(req: Request, res: Response): Promise<Response>{
        if(req.query.id){
            return SessionResource.searchById(req, res);
        }

        return SessionResource.list(req, res);
    }

    static async list(req: Request, res: Response): Promise<Response> {
        if(req.query.id) {
            return SessionResource.searchById(req, res);
        }

        return service.list(req, res);
    }

    static async searchById(req: Request, res: Response): Promise<Response> {
        try {
            FindSessionSchema.parse({ id: req.query.id });
        } catch (error) {
            return res.status(400).send({ message: error });
        }
        return service.searchById(req, res);
    }

    static async searchByRoom(req: Request, res: Response): Promise<Response> {
        try {
            FindSessionByRoomSchema.parse({ roomNumber: parseInt(req.query.roomNumber as string) });
        } catch (error) {
            return res.status(400).send({ message: error });
        }
        return service.searchByRoom(req, res);
    }

    static async searchByMovieName(req: Request, res: Response): Promise<Response> {
        try {
            FindSessionByMovieNameSchema.parse({ movieName: req.query.movieName });
        } catch (error) {
            return res.status(400).send({ message: error });
        }
        return service.searchByMovieName(req, res);
    }

    static async create(req: Request, res: Response): Promise<Response> {
        try {
            CreateSessionSchema.parse(req.body);
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }
        return service.create(req, res);
    }

    static async newReservation(req: Request, res: Response): Promise<Response> {
        try {
            NewReservationSchema.parse(req.body);
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }
        return service.newReservation(req, res);
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
            DeleteSessionSchema.parse({ id: req.query.id });
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }
        return service.delete(req, res);
    }
}
