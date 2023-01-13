import { z } from "zod";

export const FindMovieSchema = z.object({
    id: z.string(),
});

export type FindMovieType = {
    id: string;
};

export const CreateMovieSchema = z.object({
    name: z.string(),
    synopsis: z.string(),
    synopsis_expanded: z.string(),
    banner: z.string(),
});

export type CreateMovieType = {
    name: string,
    synopsis: string,
    synopsis_expanded: string,
    banner: string,
};

export const UpdateMovieSchema = z.object({
    name: z.string().optional(),
    synopsis: z.string().optional(),
    synopsis_expanded: z.string(),
    banner: z.string().optional(),
});

export type UpdateMovieType = {
    id: string,
    name: string
    synopsis: string
    synopsis_expanded: string
    banner: string
};