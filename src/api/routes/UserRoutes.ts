import { Router } from "express";
import { UserResource } from "../resources/UserResource";
import { authenticationFilter } from "../infra/AuthenticationFilter";

export const userRoutes = Router()

const userUrl = "/user"
const loginUrl = "/login"

userRoutes.post(userUrl, authenticationFilter, UserResource.create)
userRoutes.post(loginUrl, UserResource.login)
