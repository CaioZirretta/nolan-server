import { prisma } from "../../../prisma";
import { Movie } from "@prisma/client";
import { NolanError } from "../../error/NolanError";
import { ErrorMessage } from "../../error/ErrorMessage";
import { CreateMovieType, UpdateMovieType } from "../../domain/movie/MovieSchema";
import { BaseCrudRepository } from "../BaseCrudRepository";

export class MovieRepository implements BaseCrudRepository<Movie> {
    async list(): Promise<Movie[]> {
        const result: Movie[] = await prisma.movie.findMany();

        if (result.length === 0) {
            throw new NolanError(ErrorMessage.MOVIES_NOT_FOUND);
        }

        return result;
    }

    async searchById(id: string): Promise<Movie> {
        const result: Movie | null = await prisma.movie.findUnique({ where: { id } });

        if (!result) {
            throw new NolanError(ErrorMessage.MOVIE_NOT_FOUND);
        }

        return result;
    }

    async create({ name, synopsis, synopsis_expanded, banner }: CreateMovieType): Promise<Movie> {
        return prisma.movie.create({
            data: {
                name,
                synopsis,
                synopsis_expanded,
                banner,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        });
    }

    async update({ id, name, synopsis, synopsis_expanded, banner }: UpdateMovieType): Promise<Movie> {
        const result: Movie = await prisma.movie.update({
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

        if (!result) {
            throw new NolanError(ErrorMessage.MOVIE_NOT_FOUND);
        }

        return result;
    }

    async delete(id: string): Promise<Movie> {
        const result: Movie = await prisma.movie.delete({ where: { id } });

        if (!result) {
            throw new NolanError(ErrorMessage.MOVIE_NOT_FOUND);
        }

        return result;
    }
}