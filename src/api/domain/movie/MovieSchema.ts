import { z } from "zod";

// Inserir belas mensagens de erro dentro do string() com um objeto {}

export const FindMovieSchema = z.object({
    id: z.string(),
});

export type FindMovieType = z.infer<typeof FindMovieSchema>

export const CreateMovieSchema = z.object({
    name: z.string().max(36),
    synopsis: z.string(),
    synopsis_expanded: z.string(),
    banner: z.string(),
});

export type CreateMovieType = z.infer<typeof CreateMovieSchema>

export const UpdateMovieSchema = z.object({
    name: z.string().max(36),
    synopsis: z.string(),
    synopsis_expanded: z.string(),
    banner: z.string(),
});

// O id serve para procurar o filme e depois alterá-lo
export type UpdateMovieType = {
    id: string,
    name: string
    synopsis: string
    synopsis_expanded: string
    banner: string
};

