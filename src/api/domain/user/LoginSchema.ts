import { z } from "zod";

export type LoginRequest = z.infer<typeof LoginRequestSchema>

export const LoginRequestSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export type LoginResponse =  {
    token: string,
}
