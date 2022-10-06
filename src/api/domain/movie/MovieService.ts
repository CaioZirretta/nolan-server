import { Request, Response } from "express";
import { Movie } from "@prisma/client";

export interface MovieService {
	list: (req: Request, res: Response) => Promise<Movie[]>;
	searchById: (req: Request, res: Response) => Promise<Movie | null>;
	add: (req: Request, res: Response) => Promise<any>;
	update: (req: Request, res: Response) => Promise<any>;
	delete: (req: Request, res: Response) => Promise<any>;
}
