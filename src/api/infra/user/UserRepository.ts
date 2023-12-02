import { LoginRequest, LoginResponse } from "../../domain/user/LoginSchema";
import { prisma } from "../../../prisma";
import { NolanError } from "../../error/NolanError";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import { createToken } from "../JwtToken";
import { CreateUserType } from "../../domain/user/UserSchema";
import { ErrorMessage } from "../../error/ErrorMessage";
import { ErrorCode } from "../../error/ErrorCode";


export class UserRepository {
    async login(loginInfo: LoginRequest): Promise<LoginResponse> {
        let result: User;

        try {
            result = await this.findUser(loginInfo.username);

            const passwordMatch: boolean = await bcrypt.compare(loginInfo.password, result.password);

            if (!passwordMatch) {
                throw new NolanError(ErrorMessage.PASSWORD_INCORRECT, ErrorCode.PASSWORD_INCORRECT_CODE);
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
                throw new NolanError(ErrorMessage.UNKNOWN_ERROR);
            }
        }
    }

    async findUser(username: string): Promise<User> {
        const result: User | null = await prisma.user.findFirst({
            where: {
                user: username,
            }
        });

        if (!result) throw new NolanError(ErrorMessage.USER_NOT_FOUND, ErrorCode.USER_NOT_FOUND_CODE);

        return result;
    }

    async create(user: CreateUserType): Promise<void> {
        const result: User | null = await prisma.user.findFirst({
            where: {
                user: user.username,
            }
        });

        if (result) throw new NolanError(ErrorMessage.USER_ALREADY_REGISTERED, ErrorCode.USER_ALREADY_REGISTERED_CODE);

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
