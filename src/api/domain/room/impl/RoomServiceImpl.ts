import { RoomRepository } from "../RoomRepository";
import { Request, Response } from "express";
import { RoomService } from "../RoomService";
import { Room } from "@prisma/client";

export class MovieServiceImpl implements RoomService {
    constructor(private repository: RoomRepository) {}

    async list(req: Request, res: Response): Promise<Response> {
        let result: Room[];

        try {
            result = await this.repository.list();
        } catch (err: any) {
            return res.status(400).send({ error: err });
        }

        return res.status(200).send(result);
    }

    async searchById(req: Request, res: Response): Promise<Response> {
        let result: Room;

        try {
            result = await this.repository.searchById(req.params.id);
        } catch (err: any) {
            return res.status(400).send({ error: err });
        }

        return res.status(200).send(result);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { number, sits } = req.body;

        let result: Room;

        try {
            let room = await this.repository.searchById(id);
            result = await this.repository.create({
                number,
                sits,
                createdAt: room.createdAt,
                updatedAt: new Date(),
            });
        } catch (err: any) {
            return res.status(400).send({ error: err });
        }

        return res.status(201).send(result);
    }

    async update(req: Request, res: Response): Promise<Response> {
        let result: Room;

        try {
            // result = await this.repository.update();
        } catch (e: any) {
            return res.status(400).send({ message: e.message });
        }
        // return res.status(200).send(this.repository.update());
    }

    async delete(req: Request, res: Response): Promise<Response> {
        let result: Room;

        try {
            result = await this.repository.delete(req.params.id);
        } catch (e: any) {
            return res.status(400).send({ message: e.message });
        }

        return res.status(200).send(this.repository.delete(req.params.id));
    }
}
