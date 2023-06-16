import { z } from 'zod';

export const FindSessionSchema = z.object({
    id: z.string(),
});

export type FindSessionType = z.infer<typeof FindSessionSchema>

export const FindSessionByRoomSchema = z.object({
    roomNumber: z.number(),
})

export type FindSessionByRoom = z.infer<typeof FindSessionByRoomSchema>

export const CreateSessionSchema = z.object({
    roomNumber: z.number(),
    sits: z.string().array(),
    time: z.coerce.date().min(new Date(new Date().getTime() - (30000))),
    movieId: z.string(),
    movieName: z.string(),
});

export type CreateSessionType = z.infer<typeof CreateSessionSchema>;

export const UpdateSessionSchema = z.object({
    id: z.string(),
    roomNumber: z.number(),
    sits: z.string().array(),
    time: z.coerce.date().min(new Date(new Date().getTime() - (60 * 60 * 1000))),
    movieId: z.string(),
    movieName: z.string(),
});

export type UpdateSessionType = z.infer<typeof UpdateSessionSchema>;

export const DeleteSessionSchema = z.object({ id: z.string() });

export type DeleteSessionType = z.infer<typeof DeleteSessionSchema>;
