import { Movie } from "@prisma/client";
import { prisma } from "../../../../prisma";
import { MovieRepository } from "../MovieRepository";

export class MovieRepositoryImpl implements MovieRepository {
	async list(): Promise<Movie[]> {
		return await prisma.movie.findMany();
	}
	async searchById(id: string): Promise<Movie> {
		const result = await prisma.movie.findUnique({
			where: { id },
		});
		return result ?? ({} as Movie);
	}
	async add({ id, name, synopsis, synopsis_expanded, banner, createdAt, updatedAt }: Movie): Promise<any> {
		await prisma.movie.create({
			data: {
				id,
				name,
				synopsis,
				synopsis_expanded,
				banner,
				createdAt,
				updatedAt,
			},
		});
		return;
	}
	async update({ id, name, synopsis, synopsis_expanded, banner, createdAt, updatedAt }: Movie): Promise<any> {
		return;
	}
	async delete(id: string): Promise<any> {
		return;
	}
}
