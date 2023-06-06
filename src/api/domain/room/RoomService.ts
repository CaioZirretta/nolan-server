import { Request, Response } from "express";
import { RoomRepository } from "../../infra/room/RoomRepository";
import { Movie, Room } from "@prisma/client";

export class RoomService {
    constructor(private repository: RoomRepository) {
    }

    async list(req: Request, res: Response): Promise<Response> {
        let result: Room[];

        try {
            result = await this.repository.list();
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);
    }

    async searchById(req: Request, res: Response): Promise<Response> {
        let result: Room;

        try {
            result = await this.repository.searchById(req.params.id);
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { number } = req.body;

        let result: Room;

        try {
            result = await this.repository.create(number);
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id, number } = req.body;

        let result: Room;

        try {
            result = await this.repository.update({
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
            result = await this.repository.delete(req.params.id);
        } catch (error: any) {
            return res.status(400).send({ error });
        }

        return res.status(200).send(result);
    }
}
