import { LoginRequest, LoginResponse } from "../../domain/user/LoginSchema";
import { prisma } from "../../../prisma";
import { NolanError } from "../../error/NolanError";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import { createToken } from "../JwtToken";
import { CreateUserType } from "../../domain/user/UserSchema";
import { Message } from "../../error/Message";


export class UserRepository {
    async login(loginInfo: LoginRequest): Promise<LoginResponse> {
        let result: User;

        try {
            result = await this.findUser(loginInfo.username);

            const passwordMatch: boolean = await bcrypt.compare(loginInfo.password, result.password);

            if (!passwordMatch) {
                throw new NolanError(Message.PASSWORD_INCORRECT);
            }

            const token: string = createToken({
                id: result.id,
                accessLevel: result.accessLevel,
            });

            return { token };

        } catch (error: any) {
            if (error instanceof NolanError) {
                throw error;
            } else {
                throw new NolanError(Message.UNKNOWN_ERROR);
            }
        }
    }

    async findUser(username: string): Promise<User> {
        const result: User | null = await prisma.user.findFirst({
            where: {
                user: username,
            }
        });

        if (!result) throw new NolanError(Message.USER_NOT_FOUND);

        return result;
    }

    async create(user: CreateUserType): Promise<void> {
        const result: User | null = await prisma.user.findFirst({
            where: {
                user: user.username,
            }
        });

        if (result) throw new NolanError(Message.USER_ALREADY_REGISTERED);

        const saltRounds: number = 10;
        const salt: string = await bcrypt.genSalt(saltRounds);
        const hashPassword: string = await bcrypt.hash(user.password, salt);

        await prisma.user.create({
            data: {
                user: user.username,
                password: hashPassword,
                accessLevel: user.accessLevel,
                createdAt: user.createdAt ?? new Date().toISOString(),
            }
        });
    }
}
