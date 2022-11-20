import { Request, Response } from "express";

export interface RoomService {
	list: (req: Request, res: Response) => Promise<any>;
	searchById: (req: Request, res: Response) => Promise<any>;
	add: (req: Request, res: Response) => Promise<any>;
	update: (req: Request, res: Response) => Promise<any>;
	delete: (req: Request, res: Response) => Promise<any>;
}