import { FieldValidation } from './../../../utils/FieldValidation';
import { MovieRepository } from "./../MovieRepository";
import { Request, Response } from "express";
import { MovieService } from "../MovieService";
import { Movie } from "@prisma/client";

export class MovieServiceImpl implements MovieService {
	constructor(private repository: MovieRepository, private FieldValidation: FieldValidation) {}

	async list(req: Request, res: Response): Promise<any> {
		let result: Movie[];

		try {
			result = await this.repository.list();
		} catch (err: any) {
			return res.status(400).send({ error: err });
		}

		return res.status(200).send(result);
	}

	async searchById(req: Request, res: Response): Promise<any> {
		let result: Movie;

		try {
			FieldValidation.string(req.params.id);
			result = await this.repository.searchById(req.params.id);
		} catch (err: any) {
			return res.status(400).send({ error: err });
		}

		return res.status(200).send(result);
	}

	async add(req: Request, res: Response): Promise<any> {
		const { id, name, synopsis, synopsis_expanded, banner, createdAt } = req.body;

		let result: Movie;

		try {
			result = await this.repository.add({ id, name, synopsis, synopsis_expanded, banner, createdAt, updatedAt: new Date() });
		} catch (err: any) {
			return res.status(400).send({ error: err });
		}

		return res.status(201).send(result);
	}

	async update(req: Request, res: Response): Promise<any> {
		const { id, name, synopsis, synopsis_expanded, banner, createdAt } = req.body;
		let result: Movie;

		try {
			result = await this.repository.update({ id, name, synopsis, synopsis_expanded, banner, createdAt, updatedAt: new Date() });
		} catch (e: any) {
			return res.status(400).send({ message: e.message });
		}
		return res.status(200).send(result);
	}

	async delete(req: Request, res: Response): Promise<any> {
		let result: Movie;

		try {
			result = await this.repository.delete(req.params.id);
		} catch (e: any) {
			return res.status(400).send({ message: e.message });
		}

		return res.status(200).send(result);
	}
}
