import { RoomRepository } from "../infra/room/RoomRepository";
import { RoomService } from "../domain/room/RoomService";
import { Request, Response } from "express";
import { CreateRoomSchema, DeleteRoomSchema, FindRoomSchema, UpdateRoomSchema } from "../domain/room/RoomSchema";

const repository: RoomRepository = new RoomRepository();
const service: RoomService = new RoomService(repository);

export class RoomResource {
    static async list(req: Request, res: Response) {
        return service.list(req, res);
    }

    static async searchById(req: Request, res: Response) {
        try {
            FindRoomSchema.parse({ id: req.params.id });
        } catch (error) {
            return res.status(400).send({ message: error});
        }
        return service.searchById(req, res);
    }

    static async create(req: Request, res: Response) {
        try {
            CreateRoomSchema.parse({ number: req.body.number });
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }
        return service.create(req, res);
    }

    static async update(req: Request, res: Response) {
        try {
            UpdateRoomSchema.parse(req.body);
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }

        return service.update(req, res);
    }

    static async delete(req: Request, res: Response) {
        try {
            DeleteRoomSchema.parse({ id: req.params.id })
        } catch (error: any) {
            return res.status(400).send({message: error})
        }
        return service.delete(req, res);
    }
}
