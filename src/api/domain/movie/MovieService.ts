import { Request, Response } from "express";
import { Movie } from "@prisma/client";

export interface MovieService {
	list: (req: Request, res: Response) => Promise<any>;
	searchById: (req: Request, res: Response) => Promise<any>;
	add: (req: Request, res: Response) => Promise<any>;
	update: (req: Request, res: Response) => Promise<any>;
	delete: (req: Request, res: Response) => Promise<any>;
}
