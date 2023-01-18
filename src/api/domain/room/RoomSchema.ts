import { z } from "zod";

const sitsSchema = z.object(
    {
        a: z.object(
            {
                1: z.boolean(),
                2: z.boolean(),
                3: z.boolean(),
                4: z.boolean(),
                5: z.boolean(),
                6: z.boolean(),
                7: z.boolean(),
                8: z.boolean(),
                9: z.boolean(),
                10: z.boolean()
            }),
        b: z.object(
            {
                1: z.boolean(),
                2: z.boolean(),
                3: z.boolean(),
                4: z.boolean(),
                5: z.boolean(),
                6: z.boolean(),
                7: z.boolean(),
                8: z.boolean(),
                9: z.boolean(),
                10: z.boolean()
            }),
        c: z.object(
            {
                1: z.boolean(),
                2: z.boolean(),
                3: z.boolean(),
                4: z.boolean(),
                5: z.boolean(),
                6: z.boolean(),
                7: z.boolean(),
                8: z.boolean(),
                9: z.boolean(),
                10: z.boolean()
            }),
        d: z.object(
            {
                1: z.boolean(),
                2: z.boolean(),
                3: z.boolean(),
                4: z.boolean(),
                5: z.boolean(),
                6: z.boolean(),
                7: z.boolean(),
                8: z.boolean(),
                9: z.boolean(),
                10: z.boolean()
            }),
        e: z.object(
            {
                1: z.boolean(),
                2: z.boolean(),
                3: z.boolean(),
                4: z.boolean(),
                5: z.boolean(),
                6: z.boolean(),
                7: z.boolean(),
                8: z.boolean(),
                9: z.boolean(),
                10: z.boolean()
            }),
        f: z.object(
            {
                1: z.boolean(),
                2: z.boolean(),
                3: z.boolean(),
                4: z.boolean(),
                5: z.boolean(),
                6: z.boolean(),
                7: z.boolean(),
                8: z.boolean(),
                9: z.boolean(),
                10: z.boolean()
            }),
        g: z.object(
            {
                1: z.boolean(),
                2: z.boolean(),
                3: z.boolean(),
                4: z.boolean(),
                5: z.boolean(),
                6: z.boolean(),
                7: z.boolean(),
                8: z.boolean(),
                9: z.boolean(),
                10: z.boolean()
            }),
        h: z.object(
            {
                1: z.boolean(),
                2: z.boolean(),
                3: z.boolean(),
                4: z.boolean(),
                5: z.boolean(),
                6: z.boolean(),
                7: z.boolean(),
                8: z.boolean(),
                9: z.boolean(),
                10: z.boolean()
            }),

    }
);

export const FindRoomSchema = z.object({
    id: z.string(),
});

export type FindRoomType = z.infer<typeof FindRoomSchema>

export const CreateRoomSchema = z.object({
    number: z.number().min(1),
    sits: sitsSchema,
});

export type CreateRoomType = z.infer<typeof CreateRoomSchema>

export const UpdateRoomSchema = z.object({
    number: z.number().min(1),
    sits: sitsSchema,
});

export type UpdateRoomType = z.infer<typeof UpdateRoomSchema>


