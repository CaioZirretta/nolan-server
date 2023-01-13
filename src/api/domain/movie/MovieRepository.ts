import { Movie } from "@prisma/client";
import { CreateMovieType, UpdateMovieType } from "./MovieSchema";

export interface MovieRepository {
	list: () => Promise<Movie[]>;
	searchById: (id: string) => Promise<any>;
	create: (movie: CreateMovieType) => Promise<any>;
	update: (movie: UpdateMovieType) => Promise<any>;
	delete: (id: string) => Promise<any>;
}
