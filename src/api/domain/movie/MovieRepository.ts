import { Movie } from "@prisma/client";
import { CreateMovieType, UpdateMovieType } from "./MovieSchema";
import { ItemRepository } from "../ItemRepository";

export interface MovieRepository extends ItemRepository<Movie>{
	list: () => Promise<Movie[]>;
	searchById: (id: string) => Promise<Movie>;
	create: (movie: CreateMovieType) => Promise<Movie>;
	update: (movie: UpdateMovieType) => Promise<Movie>;
	delete: (id: string) => Promise<Movie>;
}
