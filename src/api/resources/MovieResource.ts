import { MovieRepository } from "../infra/movie/MovieRepository";
import { MovieService } from "../domain/movie/MovieService";
import { Request, Response } from "express";
import { CreateMovieSchema, FindMovieSchema, UpdateMovieSchema } from "../domain/movie/MovieSchema";

const repository: MovieRepository = new MovieRepository();
const service: MovieService = new MovieService(repository);

export class MovieResource {
    static async list(req: Request, res: Response) {
        return service.list(req, res);
    }

    static async searchById(req: Request, res: Response) {
        try {
            FindMovieSchema.parse({ id: req.params.id });
        } catch (err) {
            return res.status(400).send({ error: err });
        }
        return service.searchById(req, res);
    }

    static async create(req: Request, res: Response) {
        try {
            CreateMovieSchema.parse(req.body);
        } catch (err: any) {
            return res.status(400).send({ error: err.issues });
        }
        return service.create(req, res);
    }

    static async update(req: Request, res: Response) {
        try {
            UpdateMovieSchema.parse(req.body);
        } catch (err: any) {
            return res.status(400).send({ error: err.issues });
        }

        return service.update(req, res);
    }

    static async delete(req: Request, res: Response) {
        return service.delete(req, res);
    }
}
