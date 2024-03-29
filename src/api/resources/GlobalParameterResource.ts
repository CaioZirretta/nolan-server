import { MovieRepository } from "../infra/movie/MovieRepository";
import { MovieService } from "../domain/movie/MovieService";
import { Request, Response } from "express";
import { CreateMovieSchema, DeleteMovieSchema, FindMovieSchema, UpdateMovieSchema } from "../domain/movie/MovieSchema";

// const repository: MovieRepository = new MovieRepository();
// const service: MovieService = new MovieService(repository);

export class GlobalParameterResource {
    static async search(request: Request, response: Response): Promise<Response>{
        return new Promise<Response>(()=>{});
    }

    static async list(req: Request, res: Response): Promise<Response> {
        return new Promise<Response>(()=>{});
    }
}
