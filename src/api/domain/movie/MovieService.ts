import { Request, Response } from "express";

export interface MovieService {
    list: (req: Request, res: Response) => Promise<any>;
    searchById: (req: Request, res: Response) => Promise<any>;
    create: (req: Request, res: Response) => Promise<any>;
    update: (req: Request, res: Response) => Promise<any>;
    delete: (req: Request, res: Response) => Promise<any>;
}
