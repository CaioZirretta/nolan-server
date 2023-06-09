import { Request, Response } from "express";
import { LoginRequest, LoginRequestSchema, LoginResponse } from "../domain/user/LoginSchema";
import { UserService } from "../domain/user/UserService";
import { UserRepository } from "../infra/user/UserRepository";
import { TypedRequest } from "../domain/TypedRequest";
import { CreateUserSchema } from "../domain/user/UserSchema";

const repository = new UserRepository();
const service = new UserService(repository);

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
