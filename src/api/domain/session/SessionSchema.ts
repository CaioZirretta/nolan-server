import { z } from 'zod';

export const FindSessionSchema = z.object({
    id: z.string(),
});

export type FindSessionTypeType = z.infer<typeof FindSessionSchema>

export const FindSessionByRoomSchema = z.object({
    roomNumber: z.number(),
})

export type FindSessionByRoomType = z.infer<typeof FindSessionByRoomSchema>

export const FindSessionByMovieNameSchema = z.object({
    movieName: z.string(),
})

export type FindSessionByMovieNameType = z.infer<typeof FindSessionByMovieNameSchema>

export const CreateSessionSchema = z.object({
    roomNumber: z.number(),
    sits: z.string().array(),
    time: z.coerce.date().min(new Date(new Date().getTime() - (30000))),
    movieId: z.string(),
    movieName: z.string(),
});

export type CreateSessionType = z.infer<typeof CreateSessionSchema>;

export const NewReservationSchema = z.object({
    sessionId: z.string(),
    sits: z.string().array(),
})

export type NewReservationType = z.infer<typeof NewReservationSchema>;

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

export type UpdateSessionMovieNameType = { movieId: string, movieName: string };
