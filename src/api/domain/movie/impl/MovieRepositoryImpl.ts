import { prisma } from "../../../../prisma";
import { Movie } from "@prisma/client";
import { MovieRepository } from "../MovieRepository";
import { NolanError } from "../../../error/NolanError";
import { ErrorMessage } from "../../../error/ErrorMessage";
import { CreateMovieType, UpdateMovieType } from "../MovieSchema";

export class MovieRepositoryImpl implements MovieRepository {
    async list(): Promise<Movie[]> {
        const result: Movie[] = await prisma.movie.findMany();

        if (result.length === 0) {
            throw new NolanError(ErrorMessage.MOVIES_NOT_FOUND);
        }

        return result;
    }

    async searchById(id: string): Promise<Movie> {
        const result: Movie | null = await prisma.movie.findUnique({
            where: { id },
        });

        if (!result) throw new NolanError(ErrorMessage.MOVIE_NOT_FOUND);

        return result;
    }

    async create({ name, synopsis, synopsis_expanded, banner }: CreateMovieType): Promise<Movie> {
        return prisma.movie.create({
            data: {
                name,
                synopsis,
                synopsis_expanded,
                banner,
            },
        });
    }

    async update({ id, name, synopsis, synopsis_expanded, banner }: UpdateMovieType): Promise<Movie> {
        return prisma.movie.update({
            where: {
                id,
            },
            data: {
                name,
                synopsis,
                synopsis_expanded,
                banner,
                updatedAt: new Date(),
            },
        });
    }

    async delete(id: string): Promise<Movie> {
        const result: Movie = await prisma.movie.delete({
            where: {
                id,
            },
        });

        if (!result) throw new NolanError(ErrorMessage.MOVIE_NOT_FOUND);

        return result;
    }
}
