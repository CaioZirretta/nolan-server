import { Request, Response } from "express";
import { LoginResponse } from "../domain/user/LoginSchema";
import { UserService } from "../domain/user/UserService";
import { UserRepository } from "../domain/user/UserRepository";

const repository = new UserRepository();
const service = new UserService(repository);

export class UserResource {
    static async login(req: Request, res: Response) {
        return service.login(req, res);
    }

    static async create(req: Request, res: Response) {
        return service.create(req, res);
    }
}
