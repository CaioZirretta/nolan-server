import { SessionRepository } from "../../infra/session/SessionRepository";
import { Request, Response } from "express";
import { Session } from "@prisma/client";
import { formatDateSecAndMilSecToZero } from "../../utils/DateUtils";

export class SessionService {
    constructor(private repository: SessionRepository) {
    }

    async list(req: Request, res: Response): Promise<Response> {
        let result: Session[] = await this.repository.list();

        return res.status(200).send(result);
    }

    async searchById(req: Request, res: Response): Promise<Response> {
        let result: Session;
        const id: string = req.query.id! as string;

        try {
            result = await this.repository.searchById(id);
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

    async searchByMovieName(req: Request, res: Response): Promise<Response> {
        let result: Session[];

        const { movieName } = req.query;

        try {
            result = await this.repository.searchByMovieName(movieName as string);
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);

    }

    async create(req: Request, res: Response): Promise<Response> {
        const { roomNumber, sits, time, movieId, movieName } = req.body;

        let result: Session;

        try {
            this.validateTime(time);

            result = await this.repository.create({
                roomNumber,
                sits,
                time: formatDateSecAndMilSecToZero(time),
                movieId,
                movieName
            });
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(201).send(result);
    }

    async newReservation(req: Request, res: Response): Promise<Response> {
        const { sessionId, sits } = req.body;

        let result: Session;

        try {
            result = await this.repository.newReservation({
                sessionId,
                sits,
            });
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(201).send(result);
    }

    async update(req: Request, res: Response): Promise<Response> {
        let { id, roomNumber, sits, time, movieId, movieName } = req.body;

        let result: Session;

        try {
            time = this.validateTime(time);

            result = await this.repository.update({
                id,
                roomNumber,
                sits,
                time,
                movieId,
                movieName
            });
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        let result: Session;

        const { id } = req.query

        try {
            result = await this.repository.delete(id as string);
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);
    }

    validateTime(time: string): string {
        return new Date(time).toISOString();
    }
}
