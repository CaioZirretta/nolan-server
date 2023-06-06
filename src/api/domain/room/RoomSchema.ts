import { z } from "zod";

export const FindRoomSchema = z.object({
    id: z.string(),
});

export type FindRoomType = z.infer<typeof FindRoomSchema>

export const CreateRoomSchema = z.object({
    number: z.number(),
});

export type CreateRoomType = z.infer<typeof CreateRoomSchema>

export const UpdateRoomSchema = z.object({
    id: z.string(),
    number: z.number(),
});

export type UpdateRoomType = z.infer<typeof UpdateRoomSchema>

export const DeleteRoomSchema = z.object({ id: z.string() });

export type DeleteRoomType = z.infer<typeof DeleteRoomSchema>


