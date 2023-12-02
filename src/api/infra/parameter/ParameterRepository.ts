import { GlobalParameter } from "@prisma/client";
import { prisma } from "../../../prisma";
import { NolanError } from "../../error/NolanError";
import { ErrorMessage } from "../../error/ErrorMessage";
import { GlobalParameterType } from "../../domain/parameter/GlobalParameterSchema";
import { ErrorCode } from "../../error/ErrorCode";

export class ParameterRepository {
    async list(): Promise<GlobalParameter[]> {
        const result: GlobalParameter[] = await prisma.globalParameter.findMany();
        return result;
    }

    async findByName(name: string): Promise<GlobalParameter> {
        const result: GlobalParameter | null = await prisma.globalParameter.findUnique({ where: { name } });

        if (!result) {
            throw new NolanError(ErrorMessage.GLOBALPARAMETER_NOT_FOUND, ErrorCode.GLOBALPARAMETER_NOT_FOUND_CODE);
        }

        return result;
    }

    async create(parameter: GlobalParameterType): Promise<GlobalParameter> {
        const result: GlobalParameter | null = await prisma.globalParameter.findUnique({ where: { name: parameter.name } });

        if (result) {
            throw new NolanError(ErrorMessage.GLOBALPARAMETER_ALREADY_EXISTS, ErrorCode.GLOBALPARAMETER_ALREADY_EXISTS_CODE);
        }

        return prisma.globalParameter.create({ data: parameter });
    }

    async update(parameter: GlobalParameterType): Promise<GlobalParameter> {
        const result: GlobalParameter | null = await prisma.globalParameter.findUnique({ where: { name: parameter.name } });

        if (!result) {
            throw new NolanError(ErrorMessage.GLOBALPARAMETER_NOT_FOUND, ErrorCode.GLOBALPARAMETER_NOT_FOUND_CODE);
        }

        return prisma.globalParameter.update({ where: { name: parameter.name }, data: parameter });
    }
}
