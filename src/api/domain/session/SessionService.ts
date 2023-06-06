import { SessionRepository } from "../../infra/session/SessionRepository";
import { Request, Response } from "express";
import { Session } from "@prisma/client";

export class SessionService {
    constructor(private repository: SessionRepository){}

    async list(req: Request, res: Response): Promise<Response> {
        let result: Session[];

        try {
            result = await this.repository.list();
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);
    }

    async searchById(req: Request, res: Response): Promise<Response> {
        let result: Session;

        try {
            result = await this.repository.searchById(req.params.id);
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);
    }

    async searchByRoom(req: Request, res: Response): Promise<Response> {
        let result: Session[];

        try {
            result = await this.repository.searchByRoom(req.body);
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { roomNumber, sits, time, movieId } = req.body;

        let result: Session;

        try {
            result = await this.repository.create({
                roomNumber,
                sits,
                time,
                movieId
            });
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(201).send(result);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id, roomNumber, sits, time, movieId } = req.body;

        let result: Session;

        try {
            result = await this.repository.update({
                id,
                roomNumber,
                sits,
                time,
                movieId
            });
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        let result: Session;

        try {
            result = await this.repository.delete(req.params.id);
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);
    }
}
