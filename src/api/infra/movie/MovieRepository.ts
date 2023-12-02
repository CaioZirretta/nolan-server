import { prisma } from "../../../prisma";
import { Movie } from "@prisma/client";
import { NolanError } from "../../error/NolanError";
import { ErrorMessage } from "../../error/ErrorMessage";
import { CreateMovieType, MovieIdName, UpdateMovieType } from "../../domain/movie/MovieSchema";
import { BaseCrudRepository } from "../BaseCrudRepository";
import { ErrorCode } from "../../error/ErrorCode";

export class MovieRepository implements BaseCrudRepository<Movie> {
    async list(): Promise<Movie[]> {
        const result: Movie[] = await prisma.movie.findMany({ orderBy: { createdAt: 'asc' } });

        return result;
    }

    async listIdName(): Promise<MovieIdName[]> {
        const result: MovieIdName[] = await prisma.movie.findMany({
            select: {
                id: true,
                name: true,
            },
            orderBy: { createdAt: 'asc' }
        });

        return result;
    }

    async searchById(id: string): Promise<Movie> {
        const result: Movie | null = await prisma.movie.findUnique({ where: { id } });

        if (!result) {
            throw new NolanError(ErrorMessage.MOVIE_NOT_FOUND, ErrorCode.MOVIE_NOT_FOUND_CODE);
        }

        return result;
    }

    // TODO Testar depois
    // async create(movie: CreateMovieType): Promise<Movie> {
    //     return prisma.movie.create({
    //         data: movie,
    //     });
    // }

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
            throw new NolanError(ErrorMessage.MOVIE_NOT_FOUND, ErrorCode.MOVIE_NOT_FOUND_CODE);
        }

        return result;
    }

    async delete(id: string): Promise<Movie> {
        const result: Movie = await prisma.movie.delete({ where: { id } });

        if (!result) {
            throw new NolanError(ErrorMessage.MOVIE_NOT_FOUND, ErrorCode.MOVIE_NOT_FOUND_CODE);
        }

        return result;
    }
}
