import { MovieRepository } from "../../infra/movie/MovieRepository";
import { Request, Response } from "express";
import { Movie } from "@prisma/client";
import { ErrorMessage } from "../../error/ErrorMessage";

export class MovieService {
    constructor(private repository: MovieRepository) {
    }

    async list(req: Request, res: Response): Promise<Response> {
        let result: Movie[];

        try {
            result = await this.repository.list();
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }

        return res.status(200).send(result);
    }

    async searchById(req: Request, res: Response): Promise<Response> {
        let result: Movie;

        try {
            result = await this.repository.searchById(req.params.id);
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }

        return res.status(200).send(result);
    }

    async create(req: Request, res: Response): Promise<Response> {
        const { name, synopsis, synopsis_expanded, banner } = req.body;

        let result: Movie;

        try {
            result = await this.repository.create({
                name,
                synopsis,
                synopsis_expanded,
                banner,
            });
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }

        return res.status(201).send(result);
    }

    async update(req: Request, res: Response): Promise<Response> {
        const { id, name, synopsis, synopsis_expanded, banner } = req.body;

        let result: Movie;

        try {
            result = await this.repository.update({
                id,
                name,
                synopsis,
                synopsis_expanded,
                banner,
            });
        } catch (e: any) {
            return res.status(400).send({ message: e.message });
        }

        return res.status(200).send(result);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        let result: Movie;

        try {
            result = await this.repository.delete(req.params.id);
        } catch (e: any) {
            return res.status(400).send({ message: e.message });
        }

        return res.status(200).send(result);
    }
}
