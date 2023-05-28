import { LoginRequest, LoginResponse } from "../../domain/user/LoginSchema";
import { prisma } from "../../../prisma";
import { NolanError } from "../../error/NolanError";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import { createToken } from "../JwtToken";
import { CreateUserType } from "../../domain/user/UserSchema";
import { ErrorMessage } from "../../error/ErrorMessage";


export class UserRepository {
    async login(loginInfo: LoginRequest): Promise<LoginResponse> {
        let result: User;

        try {
            result = await this.findUser(loginInfo.username);

            const passwordMatch: boolean = await bcrypt.compare(loginInfo.password, result.password);

            if (!passwordMatch) {
                throw new NolanError(ErrorMessage.PASSWORD_INCORRECT);
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

        if (!result) throw new NolanError(ErrorMessage.USER_NOT_FOUND);

        return result;
    }

    async create(user: CreateUserType): Promise<void> {
        const result: User | null = await prisma.user.findFirst({
            where: {
                user: user.username,
            }
        });

        if (result) throw new NolanError(ErrorMessage.USER_ALREADY_REGISTERED);

        const saltRounds: number = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(user.password, salt);


        await prisma.user.create({
            data: {
                user: user.username,
                password: hashPassword,
                createdAt: user.createdAt,
            }
        });
    }
}
