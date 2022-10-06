import { Movie } from "@prisma/client";
import { Request, Response } from "express";
import { MovieService } from "../MovieService";

export class MovieServiceImpl implements MovieService {
	async list(req: Request, res: Response): Promise<Movie[]> {
		return new Promise<Movie[]>(() => {});
	}
	async searchById(req: Request, res: Response): Promise<Movie> {
		return new Promise<Movie>(() => {});
	}
	async add(req: Request, res: Response): Promise<any> {
		return null;
	}
	async update(req: Request, res: Response): Promise<any> {
		return null;
	}
	async delete(req: Request, res: Response): Promise<any> {
		return null;
	}
}
