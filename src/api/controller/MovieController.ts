import { fieldValidation } from "./../utils/FieldValidation";
import { MovieRepository } from "./../domain/movie/MovieRepository";
import { MovieService } from "./../domain/movie/MovieService";
import { MovieServiceImpl } from "./../domain/movie/impl/MovieServiceImpl";
import { Request, Response } from "express";
import { MovieRepositoryImpl } from "../domain/movie/impl/MovieRepositoryImpl";

const repository: MovieRepository = new MovieRepositoryImpl();
const service: MovieService = new MovieServiceImpl(repository);

export class MovieController {
	static async list(req: Request, res: Response) {
		return service.list(req, res);
	}
	static async searchById(req: Request, res: Response) {
		return service.searchById(req, res);
	}
	static async add(req: Request, res: Response) {
		try {
			fieldValidation({
				fields: [
					{
						value: req.params.id,
						validation: "string",
					},
				],
			});
		} catch (err: any) {
			return res.status(400).send({ error: err });
		}
		// return service.add(req, res);
	}
	static async update(req: Request, res: Response) {
		return service.update(req, res);
	}
	static async delete(req: Request, res: Response) {
		return service.delete(req, res);
	}
}
