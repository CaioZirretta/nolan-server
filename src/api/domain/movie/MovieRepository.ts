import { Movie } from "@prisma/client";

export interface MovieRepository {
	list: () => Promise<Movie[]>;
	searchById: (id: string) => Promise<Movie | null>;
	add: (movie: Movie) => Promise<any>;
	update: (id: string) => Promise<any>;
	delete: (id: string) => Promise<any>;
}
