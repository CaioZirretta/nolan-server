import { Request, Response } from "express";
import { LoginRequestSchema } from "../domain/user/LoginSchema";
import { UserService } from "../domain/user/UserService";
import { UserRepository } from "../infra/user/UserRepository";
import { CreateUserSchema } from "../domain/user/UserSchema";

const repository: UserRepository = new UserRepository();
const service: UserService = new UserService(repository);

export class UserResource {
    static async login(req: Request, res: Response): Promise<Response> {
        try {
            LoginRequestSchema.parse(req.body);
        } catch (err: any) {
            return res.status(400).send({ message: err });
        }

        return service.login(req, res);
    }

    static async create(req: Request, res: Response): Promise<Response> {
        try {
            CreateUserSchema.parse(req.body);
        } catch (err: any) {
            return res.status(400).send({ message: err });
        }
        return service.create(req, res);
    }
}
