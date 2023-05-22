import { Request, Response } from "express";
import { LoginRequest, LoginResponse } from "./LoginSchema";
import { UserRepository } from "./UserRepository";
import { NolanError } from "../../error/NolanError";

export class UserService {
    constructor(private repository: UserRepository) {
    }

    async login(req: Request, res: Response): Promise<Response> {
        const { username, password }: LoginRequest = req.body;
        let result: LoginResponse;

        try {
            result = await this.repository.login({ username, password });
        } catch (error: any) {
            return res.status(404).send({ error: error });
        }

        return res.status(200).send(result);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { user, password, createdAt } = req.body;
        try{
            await this.repository.create({ user, password, createdAt });
        } catch (err: any){
            return res.status(400).send({ error: err })
        }

        return res.status(200).send();
    }

}
