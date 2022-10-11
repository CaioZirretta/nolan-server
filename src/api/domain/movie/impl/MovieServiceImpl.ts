import { MovieRepository } from "./../MovieRepository";
import { Request, Response } from "express";
import { MovieService } from "../MovieService";

export class MovieServiceImpl implements MovieService {
	constructor(private repository: MovieRepository) {}

	async list(req: Request, res: Response): Promise<any> {
		return res.status(200).send(await this.repository.list());
	}

	async searchById(req: Request, res: Response): Promise<any> {
		let result;

		try {
			result = await this.repository.searchById(req.params.id);
		} catch (e: any) {
			return res.status(400).send({ message: e.message });
		}

		return res.status(200).send(result);
	}

	async add(req: Request, res: Response): Promise<any> {
		const {id, name, synopsis, synopsis_expanded, banner, createdAt} = req.body;

		let result;

		try {
			result = await this.repository.add({
				id,
				name,
				synopsis,
				synopsis_expanded,
				banner,
				createdAt,
				updatedAt: new Date(),
			});
		} catch (e: any) {
			return res.status(400).send({ message: e.message });
		}

		return res.status(201).send(result);
	}

	async update(req: Request, res: Response): Promise<any> {
		let result;

		try {
			// result = await this.repository.update();
		} catch (e: any) {
			return res.status(400).send({ message: e.message });
		}
		// return res.status(200).send(this.repository.update());
	}

	async delete(req: Request, res: Response): Promise<any> {
		let result;

		try {
			result = await this.repository.delete(req.params.id);
		} catch (e: any) {
			return res.status(400).send({ message: e.message });
		}

		return res.status(200).send(this.repository.delete(req.params.id));
	}
}
