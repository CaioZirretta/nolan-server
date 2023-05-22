import { LoginRequest, LoginResponse } from "./LoginSchema";
import { prisma } from "../../../prisma";
import { NolanError } from "../../error/NolanError";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import { createToken } from "../../infra/JwtToken";
import { UserSchema } from "./UserSchema";


export class UserRepository {
    async login(loginInfo: LoginRequest): Promise<LoginResponse> {
        let result: User;

        try {
            result = await this.findUser(loginInfo.username);

            const passwordMatch: boolean = await bcrypt.compare(loginInfo.password, result.password);

            if (!passwordMatch) {
                throw new NolanError("Password incorrect");
            }

            const token: string = createToken({
                iss: "nolan",
                sub: result.id
            });

            return { token };

        } catch (error: any) {
            throw error;
        }
    }

    async findUser(username: string): Promise<User> {
        const result: User | null = await prisma.user.findFirst({
            where: {
                user: username,
            }
        });

        if (!result) throw new NolanError("User not found");

        return result;
    }

    async create(user: UserSchema): Promise<void> {
        const result: User | null = await prisma.user.findFirst({
            where: {
                user: user.user,
            }
        });

        if (result) throw new NolanError("User already registered");

        const saltRounds: number = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(user.password, salt);


        await prisma.user.create({
            data: {
                user: user.user,
                password: hashPassword,
                createdAt: user.createdAt,
            }
        });
    }
}
