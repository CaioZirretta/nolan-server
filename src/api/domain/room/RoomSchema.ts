import { z } from "zod";
import { Room, Session } from "@prisma/client";

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

export const ListWithSessionsByIdSchema = z.object({
    number: z.number(),
});

export type ListWithSessionsById = z.infer<typeof ListWithSessionsByIdSchema>

export type RoomWithSession = Room & {
    sessions: Session[]
};


