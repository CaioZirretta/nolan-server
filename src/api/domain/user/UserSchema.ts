import { z } from "zod";
import { ErrorMessage } from "../../error/ErrorMessage";

export type CreateUserType = z.infer<typeof CreateUserSchema>

export const CreateUserSchema = z.object({
    username: z.string(),
    password: z.string(),
    createdAt: z.string().refine(value => !isNaN(Date.parse(value)), ErrorMessage.DATE_ISO_REQUIRED),
});

