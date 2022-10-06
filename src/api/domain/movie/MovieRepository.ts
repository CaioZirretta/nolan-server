import { Movie } from "@prisma/client";

export interface MovieCreateData {

}

export interface MovieRepository {
	list: () => Promise<Movie[]>;
	searchById: (id: string) => Promise<Movie | null>;
	add: () => Promise<any>;
	update: () => Promise<any>;
	delete: () => Promise<any>;
}
