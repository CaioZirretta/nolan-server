import { z } from "zod";
import { Message } from "../../error/Message";

export type CreateUserType = z.infer<typeof CreateUserSchema>

export const CreateUserSchema = z.object({
    username: z.string(),
    password: z.string(),
    accessLevel: z.number(),
    createdAt: z.string().refine(value => !isNaN(Date.parse(value)), Message.DATE_ISO_REQUIRED).optional(),
});

