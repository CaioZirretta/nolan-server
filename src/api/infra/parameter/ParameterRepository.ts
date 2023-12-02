import { GlobalParameter } from "@prisma/client";
import { prisma } from "../../../prisma";
import { NolanError } from "../../error/NolanError";
import { Message } from "../../error/Message";
import { GlobalParameterType } from "../../domain/parameter/GlobalParameterSchema";

export class ParameterRepository {
    async list(): Promise<GlobalParameter[]> {
        const result: GlobalParameter[] = await prisma.globalParameter.findMany();
        return result;
    }

    async findByName(name: string): Promise<GlobalParameter> {
        const result: GlobalParameter | null = await prisma.globalParameter.findUnique({ where: { name } });

        if (!result) {
            throw new NolanError(Message.GLOBALPARAMETER_NOT_FOUND);
        }

        return result;
    }

    async create(parameter: GlobalParameterType): Promise<GlobalParameter> {
        const result: GlobalParameter | null = await prisma.globalParameter.findUnique({ where: { name: parameter.name } });

        if (result) {
            throw new NolanError(Message.GLOBALPARAMETER_ALREADY_EXISTS);
        }

        return prisma.globalParameter.create({ data: parameter });
    }

    async update(parameter: GlobalParameterType): Promise<GlobalParameter> {
        const result: GlobalParameter | null = await prisma.globalParameter.findUnique({ where: { name: parameter.name } });

        if (!result) {
            throw new NolanError(Message.GLOBALPARAMETER_NOT_FOUND);
        }

        return prisma.globalParameter.update({ where: { name: parameter.name }, data: parameter });
    }
}
