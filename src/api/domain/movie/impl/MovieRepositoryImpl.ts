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
	async add(): Promise<any> {
		return;
	}
	async update(): Promise<any> {
		return;
	}
	async delete(): Promise<any> {
		return;
	}
}
