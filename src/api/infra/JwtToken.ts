import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secretKey: string = process.env.SECRET_KEY!;

export function createToken(payload: Object, secret: string = secretKey, expiresIn: string = "1d"): string {
    return jwt.sign(payload, secret, { expiresIn });
}
