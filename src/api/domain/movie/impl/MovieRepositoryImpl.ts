import { Movie } from "@prisma/client";
import { prisma } from "../../../../prisma";
import { MovieRepository } from "../MovieRepository";

export class MovieRepositoryImpl implements MovieRepository {
	async list(): Promise<Movie[]> {
		return await prisma.movie.findMany();
	}
	async searchById(id: string): Promise<Movie | null> {
		return await prisma.movie.findUnique({
			where: { id },
		});
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
	async update(id: string): Promise<any> {
		return;
	}
	async delete(id: string): Promise<any> {
		return;
	}
}
