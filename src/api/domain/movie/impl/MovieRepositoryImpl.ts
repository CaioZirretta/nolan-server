import { ErrorCode } from "./../../../error/ErrorCode";
import { ErrorMessages } from "./../../../error/ErrorMessage";
import { NolanError } from "../../../error/NolanError";
import { Movie } from "@prisma/client";
import { prisma } from "../../../../prisma";
import { MovieRepository } from "../MovieRepository";

export class MovieRepositoryImpl implements MovieRepository {
	async list(): Promise<Movie[]> {
		const result: Movie[] = await prisma.movie.findMany();

		if (result.length === 0) throw new NolanError(ErrorMessages.MOVIES_NOT_FOUND, ErrorCode.NL_S_001);

		return result;
	}

	async searchById(id: string): Promise<Movie> {
		const result = await prisma.movie.findUnique({
			where: { id },
		});

		return result ?? ({} as Movie);
	}

	// TODO receber vários filmes
	async add({ id, name, synopsis, synopsis_expanded, banner, createdAt, updatedAt }: Movie): Promise<any> {
		const result = await prisma.movie.create({
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
		return result;
	}

	async update({ id, name, synopsis, synopsis_expanded, banner, createdAt, updatedAt }: Movie): Promise<any> {
		const result = await prisma.movie.update({
			where: {
				id,
			},
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
		return result;
	}

	async delete(id: string): Promise<any> {
		const result = await prisma.movie.delete({
			where: {
				id,
			},
		});
		return result;
	}
}
