import { Movie } from "@prisma/client";

export interface MovieRepository {
	list: () => Promise<Movie[]>;
	searchById: (id: string) => Promise<Movie>;
	add: (movie: Movie) => Promise<any>;
	update: (movie: Movie) => Promise<any>;
	delete: (id: string) => Promise<any>;
}
