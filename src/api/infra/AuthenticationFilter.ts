import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
const secretKey: string = process.env.SECRET_KEY!;

export function authenticationFilter(req: Request, res: Response, next: NextFunction): Response | void {
    // Separar o 'Bearer' do token em si
    const token = req.headers.authorization!.split(" ")[1];

    if (!token) {
        return res.status(401).send({ error: "Subject not authenticated" });
    }

    jwt.verify(token, secretKey, (err: any) => {
        if (err) {
            return res.status(403).send({ error: err });
        }
        next();
    });
}
