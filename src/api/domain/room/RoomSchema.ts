import { z } from "zod";

export const FindRoomSchema = z.object({
    id: z.string(),
});

export type FindRoomType = z.infer<typeof FindRoomSchema>

export const CreateRoomSchema = z.object({
    number: z.number().min(1),
});

export type CreateRoomType = z.infer<typeof CreateRoomSchema>

export const UpdateRoomSchema = z.object({
    number: z.number().min(1),
});

export type UpdateRoomType = {
    id: string,
    number: number,
}


