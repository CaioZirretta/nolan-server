import { Router } from "express";
import { UserResource } from "../resources/UserResource";

export const userRoutes = Router()

const userUrl = "/user"
const loginUrl = "/login"

userRoutes.post(userUrl, UserResource.create)
userRoutes.post(loginUrl, UserResource.login)
