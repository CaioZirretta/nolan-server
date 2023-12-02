import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ErrorMessage } from "../error/ErrorMessage";
import { NolanError } from "../error/NolanError";
import { ErrorCode } from "../error/ErrorCode";

dotenv.config();
const secretKey: string = process.env.SECRET_KEY!;

export function authenticationFilter(req: Request, res: Response, next: NextFunction): Response | void {
	const customerOrigin = [process.env.CUSTOMER_ORIGIN]

	const origin = req.headers.origin;

	if(origin && customerOrigin.includes(origin)) {
		return next();
	}

	if (!req.headers.authorization) {
		return res.status(400).send(new NolanError(ErrorMessage.MISSING_AUTH, ErrorCode.MISSING_AUTH_CODE));
	}

	const token: string = req.headers.authorization.split(" ")[1];

	if (!token) {
		return res.status(401).send(new NolanError(ErrorMessage.NOT_AUTHENTICATED, ErrorCode.NOT_AUTHENTICATED_CODE));
	}

	jwt.verify(token, secretKey, (err: any) => {
		if (err) {
			return res.status(403).send({ message: err });
		}
		next();
	});
}
