import { Router } from "express";
import { UserResource } from "../resources/UserResource";

export const userRoutes: Router = Router()

const userUrl: string = "/user"
const loginUrl: string = "/login"

userRoutes.post(userUrl, UserResource.create)
userRoutes.post(loginUrl, UserResource.login)
