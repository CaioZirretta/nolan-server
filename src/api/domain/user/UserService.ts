import { Request, Response } from "express";
import { LoginRequest, LoginResponse } from "./LoginSchema";
import { UserRepository } from "../../infra/user/UserRepository";
import { Message } from "../Message";

export class UserService {
    constructor(private repository: UserRepository) {
    }

    async login(req: Request, res: Response): Promise<Response> {
        const { username, password }: LoginRequest = req.body;
        let result: LoginResponse;

        try {
            result = await this.repository.login({ username, password });
        } catch (error: any) {
            return res.status(404).send({ message: error });
        }

        return res.status(200).send(result);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { username, password, accessLevel, createdAt } = req.body;
        try {
            await this.repository.create({ username, password, accessLevel, createdAt });
        } catch (err: any) {
            return res.status(400).send({ message: err });
        }

        return res.status(200).send({ message: Message.OPERATION_SUCCEEDED });
    }

}
