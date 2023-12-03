import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ErrorMessage } from "../error/ErrorMessage";
import { NolanError } from "../error/NolanError";
import { ErrorCode } from "../error/ErrorCode";

dotenv.config();
const secretKey: string = process.env.SECRET_KEY!;

export function authenticationFilterLevel0(req: Request, res: Response, next: NextFunction): Response | void {
    authenticationFilter(req, res, next);
}

export function authenticationFilterLevel1(req: Request, res: Response, next: NextFunction): Response | void {
    authenticationFilter(req, res, next, 1);
}

export function authenticationFilterLevel2(req: Request, res: Response, next: NextFunction): Response | void {
    authenticationFilter(req, res, next, 2);
}

function authenticationFilter(req: Request, res: Response, next: NextFunction, requiredAccess: number = 0): Response | void {
    const customerOrigin = [process.env.CUSTOMER_ORIGIN];

    const origin = req.headers.origin;

    if (origin && customerOrigin.includes(origin)) {
        return next();
    }

    if (!req.headers.authorization) {
        return res.status(400).send(new NolanError(ErrorMessage.MISSING_AUTH, ErrorCode.MISSING_AUTH_CODE));
    }

    const token: string = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).send(new NolanError(ErrorMessage.NOT_AUTHENTICATED, ErrorCode.NOT_AUTHENTICATED_CODE));
    }

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err || !checkPrivileges(decoded.accessLevel, requiredAccess)) {
            return res.status(403).send({ message: err });
        }
        next();
    });
}

function checkPrivileges(accessLevel: number, requiredLevel: number = 0): boolean {
    return accessLevel >= requiredLevel;
}
