import { MovieServiceImpl } from './../domain/movie/impl/MovieServiceImpl';
import { Request, Response } from "express";

movieService = new MovieServiceImpl();
export class MovieController {

	static async list(req: Request, res: Response) {
		return movieService.list();
	}
	static async searchById(req: Request, res: Response) {
		return movieService.;
	}
	static async add(req: Request, res: Response) {
		return movieService.;
	}
	static async update(req: Request, res: Response) {
		return movieService.;
	}
	static async delete(req: Request, res: Response) {
		return movieService.;
	}
}
