import { MovieRepository } from "../infra/movie/MovieRepository";
import { MovieService } from "../domain/movie/MovieService";
import { Request, Response } from "express";
import { CreateMovieSchema, DeleteMovieSchema, FindMovieSchema, UpdateMovieSchema } from "../domain/movie/MovieSchema";
import { SessionRepository } from "../infra/session/SessionRepository";

const movieRepository: MovieRepository = new MovieRepository();
const sessionRepository: SessionRepository = new SessionRepository();
const service: MovieService = new MovieService(movieRepository, sessionRepository);

export class MovieResource {
    static async search(req: Request, res: Response): Promise<Response> {
        if (req.query.id) {
            return MovieResource.searchById(req, res);
        }

        return MovieResource.list(req, res);
    }

    static async list(req: Request, res: Response): Promise<Response> {
        return service.list(req, res);
    }

    static async listIdName(req: Request, res: Response): Promise<Response> {
        return service.listIdName(req, res);
    }

    static async searchById(req: Request, res: Response): Promise<Response> {


        try {
            FindMovieSchema.parse({ id: req.query.id });
        } catch (error) {
            return res.status(400).send({ message: error });
        }
        return service.searchById(req, res);
    }

    static async create(req: Request, res: Response): Promise<Response> {
        try {
            CreateMovieSchema.parse(req.body);
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }
        return service.create(req, res);
    }

    static async update(req: Request, res: Response): Promise<Response> {
        try {
            UpdateMovieSchema.parse(req.body);
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }

        return service.update(req, res);
    }

    static async delete(req: Request, res: Response): Promise<Response> {
        try {
            DeleteMovieSchema.parse({ id: req.query.id });
        } catch (error: any) {
            return res.status(400).send({ message: error });
        }
        return service.delete(req, res);
    }
}
