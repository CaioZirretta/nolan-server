import { z } from "zod";

export const GlobalParameterSchema = z.object({
    name: z.string(),
    value: z.string()
});

export type GlobalParameter = z.infer<typeof GlobalParameterSchema>;
