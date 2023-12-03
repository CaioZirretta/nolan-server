import { NextFunction, Request, Response, Router } from "express";
import { UserResource } from "../resources/UserResource";
import { authenticationFilterLevel0, authenticationFilterLevel2 } from "../infra/AuthenticationFilter";

export const userRoutes: Router = Router();

const userUrl: string = "/user";
const userAccessUrl: string = userUrl + "/access";
const loginUrl: string = "/login";

userRoutes.post(userUrl, authenticationFilterLevel2, UserResource.create);
userRoutes.post(loginUrl, UserResource.login);
userRoutes.post(userAccessUrl, authenticationFilterLevel2, UserResource.alterPrivileges);
